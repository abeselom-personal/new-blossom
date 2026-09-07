package heritage

import (
	"context"
	"encoding/json"
	"time"

	"github.com/jackc/pgx/v5/pgxpool"
)

type Repository struct{ pool *pgxpool.Pool }

func NewRepository(pool *pgxpool.Pool) *Repository { return &Repository{pool: pool} }

type Tour struct {
	ID            string        `json:"id"`
	Slug          string        `json:"slug"`
	ImageURL      *string       `json:"image_url"`
	GalleryURLs   []string      `json:"gallery_urls"`
	DurationHours *int          `json:"duration_hours"`
	Price         *float64      `json:"price"`
	SortOrder     int           `json:"sort_order"`
	IsPublished   bool          `json:"is_published"`
	CreatedAt     time.Time     `json:"created_at"`
	UpdatedAt     time.Time     `json:"updated_at"`
	Translations  []Translation `json:"translations,omitempty"`
}

type Translation struct {
	Locale      string   `json:"locale"`
	Name        string   `json:"name"`
	Description string   `json:"description"`
	Highlights  []string `json:"highlights"`
}

func (r *Repository) List(ctx context.Context, locale string, publishedOnly bool) ([]Tour, error) {
	q := `SELECT id, slug, image_url, gallery_urls, duration_hours, price, sort_order, is_published, created_at, updated_at FROM heritage_tours`
	if publishedOnly {
		q += ` WHERE is_published = true`
	}
	q += ` ORDER BY sort_order, created_at`
	rows, err := r.pool.Query(ctx, q)
	if err != nil {
		return nil, err
	}
	defer rows.Close()
	var tours []Tour
	for rows.Next() {
		var t Tour
		var galleryJSON []byte
		if err := rows.Scan(&t.ID, &t.Slug, &t.ImageURL, &galleryJSON, &t.DurationHours, &t.Price, &t.SortOrder, &t.IsPublished, &t.CreatedAt, &t.UpdatedAt); err != nil {
			return nil, err
		}
		json.Unmarshal(galleryJSON, &t.GalleryURLs)
		if locale != "" {
			r.loadTranslations(ctx, &t, locale)
		}
		tours = append(tours, t)
	}
	return tours, nil
}

func (r *Repository) Create(ctx context.Context, t *Tour) error {
	galleryJSON, _ := json.Marshal(t.GalleryURLs)
	return r.pool.QueryRow(ctx,
		`INSERT INTO heritage_tours (slug, image_url, gallery_urls, duration_hours, price, sort_order, is_published)
		 VALUES ($1,$2,$3,$4,$5,$6,$7) RETURNING id, created_at, updated_at`,
		t.Slug, t.ImageURL, galleryJSON, t.DurationHours, t.Price, t.SortOrder, t.IsPublished,
	).Scan(&t.ID, &t.CreatedAt, &t.UpdatedAt)
}

func (r *Repository) Update(ctx context.Context, t *Tour) error {
	galleryJSON, _ := json.Marshal(t.GalleryURLs)
	_, err := r.pool.Exec(ctx,
		`UPDATE heritage_tours SET slug=$1, image_url=$2, gallery_urls=$3, duration_hours=$4, price=$5, sort_order=$6, is_published=$7 WHERE id=$8`,
		t.Slug, t.ImageURL, galleryJSON, t.DurationHours, t.Price, t.SortOrder, t.IsPublished, t.ID,
	)
	return err
}

func (r *Repository) Delete(ctx context.Context, id string) error {
	_, err := r.pool.Exec(ctx, `DELETE FROM heritage_tours WHERE id = $1`, id)
	return err
}

func (r *Repository) loadTranslations(ctx context.Context, t *Tour, locale string) {
	rows, err := r.pool.Query(ctx,
		`SELECT locale, name, description, highlights FROM heritage_tour_translations WHERE heritage_tour_id = $1 AND locale = $2`,
		t.ID, locale,
	)
	if err != nil {
		return
	}
	defer rows.Close()
	for rows.Next() {
		var tr Translation
		var highlightsJSON []byte
		rows.Scan(&tr.Locale, &tr.Name, &tr.Description, &highlightsJSON)
		json.Unmarshal(highlightsJSON, &tr.Highlights)
		t.Translations = append(t.Translations, tr)
	}
}
