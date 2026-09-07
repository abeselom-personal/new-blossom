package rooms

import (
	"context"
	"encoding/json"
	"time"

	"github.com/jackc/pgx/v5/pgxpool"
)

type Repository struct {
	pool *pgxpool.Pool
}

func NewRepository(pool *pgxpool.Pool) *Repository {
	return &Repository{pool: pool}
}

type Room struct {
	ID           string   `json:"id"`
	Slug         string   `json:"slug"`
	ImageURL     *string  `json:"image_url"`
	GalleryURLs  []string `json:"gallery_urls"`
	Price        *float64 `json:"price"`
	Capacity     int      `json:"capacity"`
	SizeSqm      *int     `json:"size_sqm"`
	BedType      *string  `json:"bed_type"`
	Amenities    []string `json:"amenities"`
	IsFeatured   bool     `json:"is_featured"`
	SortOrder    int      `json:"sort_order"`
	IsPublished  bool     `json:"is_published"`
	CreatedAt    time.Time `json:"created_at"`
	UpdatedAt    time.Time `json:"updated_at"`
	Translations []Translation `json:"translations,omitempty"`
}

type Translation struct {
	Locale      string   `json:"locale"`
	Name        string   `json:"name"`
	Description string   `json:"description"`
	Features    []string `json:"features"`
}

func (r *Repository) List(ctx context.Context, locale string, publishedOnly bool) ([]Room, error) {
	query := `SELECT id, slug, image_url, gallery_urls, price, capacity, size_sqm, bed_type, amenities, is_featured, sort_order, is_published, created_at, updated_at FROM rooms`
	if publishedOnly {
		query += ` WHERE is_published = true`
	}
	query += ` ORDER BY sort_order, created_at`

	rows, err := r.pool.Query(ctx, query)
	if err != nil {
		return nil, err
	}
	defer rows.Close()

	var rooms []Room
	for rows.Next() {
		var rm Room
		var galleryJSON, amenitiesJSON []byte
		err := rows.Scan(&rm.ID, &rm.Slug, &rm.ImageURL, &galleryJSON, &rm.Price, &rm.Capacity, &rm.SizeSqm, &rm.BedType, &amenitiesJSON, &rm.IsFeatured, &rm.SortOrder, &rm.IsPublished, &rm.CreatedAt, &rm.UpdatedAt)
		if err != nil {
			return nil, err
		}
		json.Unmarshal(galleryJSON, &rm.GalleryURLs)
		json.Unmarshal(amenitiesJSON, &rm.Amenities)
		rooms = append(rooms, rm)
	}

	if locale != "" {
		for i := range rooms {
			r.loadTranslations(ctx, &rooms[i], locale)
		}
	}

	return rooms, nil
}

func (r *Repository) GetByID(ctx context.Context, id string, locale string) (*Room, error) {
	rm := &Room{}
	var galleryJSON, amenitiesJSON []byte
	err := r.pool.QueryRow(ctx,
		`SELECT id, slug, image_url, gallery_urls, price, capacity, size_sqm, bed_type, amenities, is_featured, sort_order, is_published, created_at, updated_at FROM rooms WHERE id = $1`,
		id,
	).Scan(&rm.ID, &rm.Slug, &rm.ImageURL, &galleryJSON, &rm.Price, &rm.Capacity, &rm.SizeSqm, &rm.BedType, &amenitiesJSON, &rm.IsFeatured, &rm.SortOrder, &rm.IsPublished, &rm.CreatedAt, &rm.UpdatedAt)
	if err != nil {
		return nil, err
	}
	json.Unmarshal(galleryJSON, &rm.GalleryURLs)
	json.Unmarshal(amenitiesJSON, &rm.Amenities)
	if locale != "" {
		r.loadTranslations(ctx, rm, locale)
	}
	return rm, nil
}

func (r *Repository) GetBySlug(ctx context.Context, slug string, locale string) (*Room, error) {
	rm := &Room{}
	var galleryJSON, amenitiesJSON []byte
	err := r.pool.QueryRow(ctx,
		`SELECT id, slug, image_url, gallery_urls, price, capacity, size_sqm, bed_type, amenities, is_featured, sort_order, is_published, created_at, updated_at FROM rooms WHERE slug = $1`,
		slug,
	).Scan(&rm.ID, &rm.Slug, &rm.ImageURL, &galleryJSON, &rm.Price, &rm.Capacity, &rm.SizeSqm, &rm.BedType, &amenitiesJSON, &rm.IsFeatured, &rm.SortOrder, &rm.IsPublished, &rm.CreatedAt, &rm.UpdatedAt)
	if err != nil {
		return nil, err
	}
	json.Unmarshal(galleryJSON, &rm.GalleryURLs)
	json.Unmarshal(amenitiesJSON, &rm.Amenities)
	if locale != "" {
		r.loadTranslations(ctx, rm, locale)
	}
	return rm, nil
}

func (r *Repository) Create(ctx context.Context, rm *Room) error {
	galleryJSON, _ := json.Marshal(rm.GalleryURLs)
	amenitiesJSON, _ := json.Marshal(rm.Amenities)
	return r.pool.QueryRow(ctx,
		`INSERT INTO rooms (slug, image_url, gallery_urls, price, capacity, size_sqm, bed_type, amenities, is_featured, sort_order, is_published)
		 VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11) RETURNING id, created_at, updated_at`,
		rm.Slug, rm.ImageURL, galleryJSON, rm.Price, rm.Capacity, rm.SizeSqm, rm.BedType, amenitiesJSON, rm.IsFeatured, rm.SortOrder, rm.IsPublished,
	).Scan(&rm.ID, &rm.CreatedAt, &rm.UpdatedAt)
}

func (r *Repository) Update(ctx context.Context, rm *Room) error {
	galleryJSON, _ := json.Marshal(rm.GalleryURLs)
	amenitiesJSON, _ := json.Marshal(rm.Amenities)
	_, err := r.pool.Exec(ctx,
		`UPDATE rooms SET slug=$1, image_url=$2, gallery_urls=$3, price=$4, capacity=$5, size_sqm=$6, bed_type=$7, amenities=$8, is_featured=$9, sort_order=$10, is_published=$11 WHERE id=$12`,
		rm.Slug, rm.ImageURL, galleryJSON, rm.Price, rm.Capacity, rm.SizeSqm, rm.BedType, amenitiesJSON, rm.IsFeatured, rm.SortOrder, rm.IsPublished, rm.ID,
	)
	return err
}

func (r *Repository) Delete(ctx context.Context, id string) error {
	_, err := r.pool.Exec(ctx, `DELETE FROM rooms WHERE id = $1`, id)
	return err
}

func (r *Repository) loadTranslations(ctx context.Context, rm *Room, locale string) {
	rows, err := r.pool.Query(ctx,
		`SELECT locale, name, description, features FROM room_translations WHERE room_id = $1 AND locale = $2`,
		rm.ID, locale,
	)
	if err != nil {
		return
	}
	defer rows.Close()

	for rows.Next() {
		var t Translation
		var featuresJSON []byte
		rows.Scan(&t.Locale, &t.Name, &t.Description, &featuresJSON)
		json.Unmarshal(featuresJSON, &t.Features)
		rm.Translations = append(rm.Translations, t)
	}
}
