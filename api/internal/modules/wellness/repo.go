package wellness

import (
	"context"
	"encoding/json"
	"time"

	"github.com/jackc/pgx/v5/pgxpool"
)

type Repository struct{ pool *pgxpool.Pool }

func NewRepository(pool *pgxpool.Pool) *Repository { return &Repository{pool: pool} }

type Retreat struct {
	ID            string        `json:"id"`
	Slug          string        `json:"slug"`
	ImageURL      *string       `json:"image_url"`
	GalleryURLs   []string      `json:"gallery_urls"`
	DurationDays  int           `json:"duration_days"`
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
	Inclusions  []string `json:"inclusions"`
	Itinerary   []string `json:"itinerary"`
}

func (r *Repository) List(ctx context.Context, locale string, publishedOnly bool) ([]Retreat, error) {
	q := `SELECT id, slug, image_url, gallery_urls, duration_days, price, sort_order, is_published, created_at, updated_at FROM wellness_retreats`
	if publishedOnly {
		q += ` WHERE is_published = true`
	}
	q += ` ORDER BY sort_order, created_at`
	rows, err := r.pool.Query(ctx, q)
	if err != nil {
		return nil, err
	}
	defer rows.Close()
	var retreats []Retreat
	for rows.Next() {
		var ret Retreat
		var galleryJSON []byte
		if err := rows.Scan(&ret.ID, &ret.Slug, &ret.ImageURL, &galleryJSON, &ret.DurationDays, &ret.Price, &ret.SortOrder, &ret.IsPublished, &ret.CreatedAt, &ret.UpdatedAt); err != nil {
			return nil, err
		}
		json.Unmarshal(galleryJSON, &ret.GalleryURLs)
		if locale != "" {
			r.loadTranslations(ctx, &ret, locale)
		}
		retreats = append(retreats, ret)
	}
	return retreats, nil
}

func (r *Repository) Create(ctx context.Context, ret *Retreat) error {
	galleryJSON, _ := json.Marshal(ret.GalleryURLs)
	return r.pool.QueryRow(ctx,
		`INSERT INTO wellness_retreats (slug, image_url, gallery_urls, duration_days, price, sort_order, is_published)
		 VALUES ($1,$2,$3,$4,$5,$6,$7) RETURNING id, created_at, updated_at`,
		ret.Slug, ret.ImageURL, galleryJSON, ret.DurationDays, ret.Price, ret.SortOrder, ret.IsPublished,
	).Scan(&ret.ID, &ret.CreatedAt, &ret.UpdatedAt)
}

func (r *Repository) Update(ctx context.Context, ret *Retreat) error {
	galleryJSON, _ := json.Marshal(ret.GalleryURLs)
	_, err := r.pool.Exec(ctx,
		`UPDATE wellness_retreats SET slug=$1, image_url=$2, gallery_urls=$3, duration_days=$4, price=$5, sort_order=$6, is_published=$7 WHERE id=$8`,
		ret.Slug, ret.ImageURL, galleryJSON, ret.DurationDays, ret.Price, ret.SortOrder, ret.IsPublished, ret.ID,
	)
	return err
}

func (r *Repository) Delete(ctx context.Context, id string) error {
	_, err := r.pool.Exec(ctx, `DELETE FROM wellness_retreats WHERE id = $1`, id)
	return err
}

func (r *Repository) loadTranslations(ctx context.Context, ret *Retreat, locale string) {
	rows, err := r.pool.Query(ctx,
		`SELECT locale, name, description, inclusions, itinerary FROM wellness_retreat_translations WHERE wellness_retreat_id = $1 AND locale = $2`,
		ret.ID, locale,
	)
	if err != nil {
		return
	}
	defer rows.Close()
	for rows.Next() {
		var t Translation
		var inclusionsJSON, itineraryJSON []byte
		rows.Scan(&t.Locale, &t.Name, &t.Description, &inclusionsJSON, &itineraryJSON)
		json.Unmarshal(inclusionsJSON, &t.Inclusions)
		json.Unmarshal(itineraryJSON, &t.Itinerary)
		ret.Translations = append(ret.Translations, t)
	}
}
