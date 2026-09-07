package dining

import (
	"context"
	"encoding/json"
	"time"

	"github.com/jackc/pgx/v5/pgxpool"
)

type Repository struct{ pool *pgxpool.Pool }

func NewRepository(pool *pgxpool.Pool) *Repository { return &Repository{pool: pool} }

// ── Dining Venues ──

type Venue struct {
	ID           string        `json:"id"`
	Slug         string        `json:"slug"`
	ImageURL     *string       `json:"image_url"`
	GalleryURLs  []string      `json:"gallery_urls"`
	Hours        *string       `json:"hours"`
	SortOrder    int           `json:"sort_order"`
	IsPublished  bool          `json:"is_published"`
	CreatedAt    time.Time     `json:"created_at"`
	UpdatedAt    time.Time     `json:"updated_at"`
	Translations []VenueTranslation `json:"translations,omitempty"`
}

type VenueTranslation struct {
	Locale      string `json:"locale"`
	Name        string `json:"name"`
	Description string `json:"description"`
}

func (r *Repository) ListVenues(ctx context.Context, locale string, publishedOnly bool) ([]Venue, error) {
	q := `SELECT id, slug, image_url, gallery_urls, hours, sort_order, is_published, created_at, updated_at FROM dining_venues`
	if publishedOnly {
		q += ` WHERE is_published = true`
	}
	q += ` ORDER BY sort_order, created_at`
	rows, err := r.pool.Query(ctx, q)
	if err != nil {
		return nil, err
	}
	defer rows.Close()
	var venues []Venue
	for rows.Next() {
		var v Venue
		var galleryJSON []byte
		if err := rows.Scan(&v.ID, &v.Slug, &v.ImageURL, &galleryJSON, &v.Hours, &v.SortOrder, &v.IsPublished, &v.CreatedAt, &v.UpdatedAt); err != nil {
			return nil, err
		}
		json.Unmarshal(galleryJSON, &v.GalleryURLs)
		if locale != "" {
			r.loadVenueTranslations(ctx, &v, locale)
		}
		venues = append(venues, v)
	}
	return venues, nil
}

func (r *Repository) CreateVenue(ctx context.Context, v *Venue) error {
	galleryJSON, _ := json.Marshal(v.GalleryURLs)
	return r.pool.QueryRow(ctx,
		`INSERT INTO dining_venues (slug, image_url, gallery_urls, hours, sort_order, is_published)
		 VALUES ($1,$2,$3,$4,$5,$6) RETURNING id, created_at, updated_at`,
		v.Slug, v.ImageURL, galleryJSON, v.Hours, v.SortOrder, v.IsPublished,
	).Scan(&v.ID, &v.CreatedAt, &v.UpdatedAt)
}

func (r *Repository) UpdateVenue(ctx context.Context, v *Venue) error {
	galleryJSON, _ := json.Marshal(v.GalleryURLs)
	_, err := r.pool.Exec(ctx,
		`UPDATE dining_venues SET slug=$1, image_url=$2, gallery_urls=$3, hours=$4, sort_order=$5, is_published=$6 WHERE id=$7`,
		v.Slug, v.ImageURL, galleryJSON, v.Hours, v.SortOrder, v.IsPublished, v.ID,
	)
	return err
}

func (r *Repository) DeleteVenue(ctx context.Context, id string) error {
	_, err := r.pool.Exec(ctx, `DELETE FROM dining_venues WHERE id = $1`, id)
	return err
}

func (r *Repository) loadVenueTranslations(ctx context.Context, v *Venue, locale string) {
	rows, err := r.pool.Query(ctx,
		`SELECT locale, name, description FROM dining_venue_translations WHERE dining_venue_id = $1 AND locale = $2`,
		v.ID, locale,
	)
	if err != nil {
		return
	}
	defer rows.Close()
	for rows.Next() {
		var t VenueTranslation
		rows.Scan(&t.Locale, &t.Name, &t.Description)
		v.Translations = append(v.Translations, t)
	}
}

// ── Menu Items ──

type MenuItem struct {
	ID           string            `json:"id"`
	VenueID      *string           `json:"venue_id"`
	Category     string            `json:"category"`
	ImageURL     *string           `json:"image_url"`
	Price        float64           `json:"price"`
	IsAvailable  bool              `json:"is_available"`
	SortOrder    int               `json:"sort_order"`
	IsPublished  bool              `json:"is_published"`
	CreatedAt    time.Time         `json:"created_at"`
	UpdatedAt    time.Time         `json:"updated_at"`
	Translations []MenuItemTranslation `json:"translations,omitempty"`
}

type MenuItemTranslation struct {
	Locale      string  `json:"locale"`
	Name        string  `json:"name"`
	Description *string `json:"description"`
}

func (r *Repository) ListMenuItems(ctx context.Context, locale, category string, publishedOnly bool) ([]MenuItem, error) {
	q := `SELECT id, venue_id, category, image_url, price, is_available, sort_order, is_published, created_at, updated_at FROM menu_items`
	args := []interface{}{}
	argIdx := 1
	if publishedOnly {
		q += ` WHERE is_published = true`
	}
	if category != "" {
		if publishedOnly {
			q += ` AND`
		} else {
			q += ` WHERE`
		}
		q += ` category = $` + itoa(argIdx)
		args = append(args, category)
		argIdx++
	}
	q += ` ORDER BY sort_order, created_at`
	rows, err := r.pool.Query(ctx, q, args...)
	if err != nil {
		return nil, err
	}
	defer rows.Close()
	var items []MenuItem
	for rows.Next() {
		var m MenuItem
		if err := rows.Scan(&m.ID, &m.VenueID, &m.Category, &m.ImageURL, &m.Price, &m.IsAvailable, &m.SortOrder, &m.IsPublished, &m.CreatedAt, &m.UpdatedAt); err != nil {
			return nil, err
		}
		if locale != "" {
			r.loadMenuItemTranslations(ctx, &m, locale)
		}
		items = append(items, m)
	}
	return items, nil
}

func (r *Repository) CreateMenuItem(ctx context.Context, m *MenuItem) error {
	return r.pool.QueryRow(ctx,
		`INSERT INTO menu_items (venue_id, category, image_url, price, is_available, sort_order, is_published)
		 VALUES ($1,$2,$3,$4,$5,$6,$7) RETURNING id, created_at, updated_at`,
		m.VenueID, m.Category, m.ImageURL, m.Price, m.IsAvailable, m.SortOrder, m.IsPublished,
	).Scan(&m.ID, &m.CreatedAt, &m.UpdatedAt)
}

func (r *Repository) UpdateMenuItem(ctx context.Context, m *MenuItem) error {
	_, err := r.pool.Exec(ctx,
		`UPDATE menu_items SET venue_id=$1, category=$2, image_url=$3, price=$4, is_available=$5, sort_order=$6, is_published=$7 WHERE id=$8`,
		m.VenueID, m.Category, m.ImageURL, m.Price, m.IsAvailable, m.SortOrder, m.IsPublished, m.ID,
	)
	return err
}

func (r *Repository) DeleteMenuItem(ctx context.Context, id string) error {
	_, err := r.pool.Exec(ctx, `DELETE FROM menu_items WHERE id = $1`, id)
	return err
}

func (r *Repository) loadMenuItemTranslations(ctx context.Context, m *MenuItem, locale string) {
	rows, err := r.pool.Query(ctx,
		`SELECT locale, name, description FROM menu_item_translations WHERE menu_item_id = $1 AND locale = $2`,
		m.ID, locale,
	)
	if err != nil {
		return
	}
	defer rows.Close()
	for rows.Next() {
		var t MenuItemTranslation
		rows.Scan(&t.Locale, &t.Name, &t.Description)
		m.Translations = append(m.Translations, t)
	}
}

func itoa(i int) string {
	if i == 0 {
		return "0"
	}
	var buf [20]byte
	pos := len(buf)
	for i > 0 {
		pos--
		buf[pos] = byte('0' + i%10)
		i /= 10
	}
	return string(buf[pos:])
}
