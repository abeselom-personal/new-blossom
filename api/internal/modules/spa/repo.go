package spa

import (
	"context"
	"encoding/json"
	"time"

	"github.com/jackc/pgx/v5/pgxpool"
)

type Repository struct{ pool *pgxpool.Pool }

func NewRepository(pool *pgxpool.Pool) *Repository { return &Repository{pool: pool} }

type SpaService struct {
	ID            string     `json:"id"`
	Slug          string     `json:"slug"`
	ImageURL      *string    `json:"image_url"`
	GalleryURLs   []string   `json:"gallery_urls"`
	DurationMins  *int       `json:"duration_mins"`
	Price         *float64   `json:"price"`
	IsFeatured    bool       `json:"is_featured"`
	SortOrder     int        `json:"sort_order"`
	IsPublished   bool       `json:"is_published"`
	CreatedAt     time.Time  `json:"created_at"`
	UpdatedAt     time.Time  `json:"updated_at"`
	Translations  []Translation `json:"translations,omitempty"`
}

type Translation struct {
	Locale      string   `json:"locale"`
	Name        string   `json:"name"`
	Description string   `json:"description"`
	Benefits    []string `json:"benefits"`
}

func (r *Repository) List(ctx context.Context, locale string, publishedOnly bool) ([]SpaService, error) {
	q := `SELECT id, slug, image_url, gallery_urls, duration_mins, price, is_featured, sort_order, is_published, created_at, updated_at FROM spa_services`
	if publishedOnly {
		q += ` WHERE is_published = true`
	}
	q += ` ORDER BY sort_order, created_at`
	rows, err := r.pool.Query(ctx, q)
	if err != nil {
		return nil, err
	}
	defer rows.Close()
	var items []SpaService
	for rows.Next() {
		var s SpaService
		var galleryJSON []byte
		if err := rows.Scan(&s.ID, &s.Slug, &s.ImageURL, &galleryJSON, &s.DurationMins, &s.Price, &s.IsFeatured, &s.SortOrder, &s.IsPublished, &s.CreatedAt, &s.UpdatedAt); err != nil {
			return nil, err
		}
		json.Unmarshal(galleryJSON, &s.GalleryURLs)
		if locale != "" {
			r.loadTranslations(ctx, &s, locale)
		}
		items = append(items, s)
	}
	return items, nil
}

func (r *Repository) GetBySlug(ctx context.Context, slug, locale string) (*SpaService, error) {
	s := &SpaService{}
	var galleryJSON []byte
	err := r.pool.QueryRow(ctx,
		`SELECT id, slug, image_url, gallery_urls, duration_mins, price, is_featured, sort_order, is_published, created_at, updated_at FROM spa_services WHERE slug = $1`,
		slug,
	).Scan(&s.ID, &s.Slug, &s.ImageURL, &galleryJSON, &s.DurationMins, &s.Price, &s.IsFeatured, &s.SortOrder, &s.IsPublished, &s.CreatedAt, &s.UpdatedAt)
	if err != nil {
		return nil, err
	}
	json.Unmarshal(galleryJSON, &s.GalleryURLs)
	if locale != "" {
		r.loadTranslations(ctx, s, locale)
	}
	return s, nil
}

func (r *Repository) Create(ctx context.Context, s *SpaService) error {
	galleryJSON, _ := json.Marshal(s.GalleryURLs)
	return r.pool.QueryRow(ctx,
		`INSERT INTO spa_services (slug, image_url, gallery_urls, duration_mins, price, is_featured, sort_order, is_published)
		 VALUES ($1,$2,$3,$4,$5,$6,$7,$8) RETURNING id, created_at, updated_at`,
		s.Slug, s.ImageURL, galleryJSON, s.DurationMins, s.Price, s.IsFeatured, s.SortOrder, s.IsPublished,
	).Scan(&s.ID, &s.CreatedAt, &s.UpdatedAt)
}

func (r *Repository) Update(ctx context.Context, s *SpaService) error {
	galleryJSON, _ := json.Marshal(s.GalleryURLs)
	_, err := r.pool.Exec(ctx,
		`UPDATE spa_services SET slug=$1, image_url=$2, gallery_urls=$3, duration_mins=$4, price=$5, is_featured=$6, sort_order=$7, is_published=$8 WHERE id=$9`,
		s.Slug, s.ImageURL, galleryJSON, s.DurationMins, s.Price, s.IsFeatured, s.SortOrder, s.IsPublished, s.ID,
	)
	return err
}

func (r *Repository) Delete(ctx context.Context, id string) error {
	_, err := r.pool.Exec(ctx, `DELETE FROM spa_services WHERE id = $1`, id)
	return err
}

func (r *Repository) loadTranslations(ctx context.Context, s *SpaService, locale string) {
	rows, err := r.pool.Query(ctx,
		`SELECT locale, name, description, benefits FROM spa_service_translations WHERE spa_service_id = $1 AND locale = $2`,
		s.ID, locale,
	)
	if err != nil {
		return
	}
	defer rows.Close()
	for rows.Next() {
		var t Translation
		var benefitsJSON []byte
		rows.Scan(&t.Locale, &t.Name, &t.Description, &benefitsJSON)
		json.Unmarshal(benefitsJSON, &t.Benefits)
		s.Translations = append(s.Translations, t)
	}
}
