package testimonials

import (
	"context"
	"time"

	"github.com/jackc/pgx/v5/pgxpool"
)

type Repository struct{ pool *pgxpool.Pool }

func NewRepository(pool *pgxpool.Pool) *Repository { return &Repository{pool: pool} }

type Testimonial struct {
	ID           string        `json:"id"`
	ImageURL     *string       `json:"image_url"`
	Rating       int           `json:"rating"`
	SortOrder    int           `json:"sort_order"`
	IsPublished  bool          `json:"is_published"`
	CreatedAt    time.Time     `json:"created_at"`
	UpdatedAt    time.Time     `json:"updated_at"`
	Translations []Translation `json:"translations,omitempty"`
}

type Translation struct {
	Locale          string  `json:"locale"`
	AuthorName      string  `json:"author_name"`
	AuthorLocation  *string `json:"author_location"`
	Quote           string  `json:"quote"`
}

func (r *Repository) List(ctx context.Context, locale string, publishedOnly bool) ([]Testimonial, error) {
	q := `SELECT id, image_url, rating, sort_order, is_published, created_at, updated_at FROM testimonials`
	if publishedOnly {
		q += ` WHERE is_published = true`
	}
	q += ` ORDER BY sort_order, created_at`
	rows, err := r.pool.Query(ctx, q)
	if err != nil {
		return nil, err
	}
	defer rows.Close()
	var items []Testimonial
	for rows.Next() {
		var t Testimonial
		if err := rows.Scan(&t.ID, &t.ImageURL, &t.Rating, &t.SortOrder, &t.IsPublished, &t.CreatedAt, &t.UpdatedAt); err != nil {
			return nil, err
		}
		if locale != "" {
			r.loadTranslations(ctx, &t, locale)
		}
		items = append(items, t)
	}
	return items, nil
}

func (r *Repository) Create(ctx context.Context, t *Testimonial) error {
	return r.pool.QueryRow(ctx,
		`INSERT INTO testimonials (image_url, rating, sort_order, is_published)
		 VALUES ($1,$2,$3,$4) RETURNING id, created_at, updated_at`,
		t.ImageURL, t.Rating, t.SortOrder, t.IsPublished,
	).Scan(&t.ID, &t.CreatedAt, &t.UpdatedAt)
}

func (r *Repository) Update(ctx context.Context, t *Testimonial) error {
	_, err := r.pool.Exec(ctx,
		`UPDATE testimonials SET image_url=$1, rating=$2, sort_order=$3, is_published=$4 WHERE id=$5`,
		t.ImageURL, t.Rating, t.SortOrder, t.IsPublished, t.ID,
	)
	return err
}

func (r *Repository) Delete(ctx context.Context, id string) error {
	_, err := r.pool.Exec(ctx, `DELETE FROM testimonials WHERE id = $1`, id)
	return err
}

func (r *Repository) loadTranslations(ctx context.Context, t *Testimonial, locale string) {
	rows, err := r.pool.Query(ctx,
		`SELECT locale, author_name, author_location, quote FROM testimonial_translations WHERE testimonial_id = $1 AND locale = $2`,
		t.ID, locale,
	)
	if err != nil {
		return
	}
	defer rows.Close()
	for rows.Next() {
		var tr Translation
		rows.Scan(&tr.Locale, &tr.AuthorName, &tr.AuthorLocation, &tr.Quote)
		t.Translations = append(t.Translations, tr)
	}
}
