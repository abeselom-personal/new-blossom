package settings

import (
	"context"
	"time"

	"github.com/jackc/pgx/v5/pgxpool"
)

type Repository struct {
	pool *pgxpool.Pool
}

func NewRepository(pool *pgxpool.Pool) *Repository {
	return &Repository{pool: pool}
}

type Setting struct {
	ID          string             `json:"id"`
	Key         string             `json:"key"`
	Type        string             `json:"type"`
	IsPublic    bool               `json:"is_public"`
	UpdatedAt   time.Time          `json:"updated_at"`
	Translations []SettingTranslation `json:"translations,omitempty"`
}

type SettingTranslation struct {
	Locale string `json:"locale"`
	Value  string `json:"value"`
}

func (r *Repository) List(ctx context.Context, publicOnly bool) ([]Setting, error) {
	query := `SELECT id, key, type, is_public, updated_at FROM site_settings`
	if publicOnly {
		query += ` WHERE is_public = true`
	}
	query += ` ORDER BY key`

	rows, err := r.pool.Query(ctx, query)
	if err != nil {
		return nil, err
	}
	defer rows.Close()

	var settings []Setting
	for rows.Next() {
		var s Setting
		if err := rows.Scan(&s.ID, &s.Key, &s.Type, &s.IsPublic, &s.UpdatedAt); err != nil {
			return nil, err
		}
		r.loadTranslations(ctx, &s)
		settings = append(settings, s)
	}
	return settings, nil
}

func (r *Repository) GetByKey(ctx context.Context, key string) (*Setting, error) {
	s := &Setting{}
	err := r.pool.QueryRow(ctx,
		`SELECT id, key, type, is_public, updated_at FROM site_settings WHERE key = $1`,
		key,
	).Scan(&s.ID, &s.Key, &s.Type, &s.IsPublic, &s.UpdatedAt)
	if err != nil {
		return nil, err
	}
	r.loadTranslations(ctx, s)
	return s, nil
}

func (r *Repository) Upsert(ctx context.Context, key, settingType string, isPublic bool, translations []SettingTranslation) (*Setting, error) {
	s := &Setting{}
	err := r.pool.QueryRow(ctx,
		`INSERT INTO site_settings (key, type, is_public)
		 VALUES ($1, $2, $3)
		 ON CONFLICT (key) DO UPDATE SET type = $2, is_public = $3
		 RETURNING id, key, type, is_public, updated_at`,
		key, settingType, isPublic,
	).Scan(&s.ID, &s.Key, &s.Type, &s.IsPublic, &s.UpdatedAt)
	if err != nil {
		return nil, err
	}

	// Upsert translations
	for _, t := range translations {
		_, err := r.pool.Exec(ctx,
			`INSERT INTO site_setting_translations (setting_id, locale, value)
			 VALUES ($1, $2, $3)
			 ON CONFLICT (setting_id, locale) DO UPDATE SET value = $3`,
			s.ID, t.Locale, t.Value,
		)
		if err != nil {
			return nil, err
		}
	}

	s.Translations = translations
	return s, nil
}

func (r *Repository) Delete(ctx context.Context, key string) error {
	_, err := r.pool.Exec(ctx, `DELETE FROM site_settings WHERE key = $1`, key)
	return err
}

func (r *Repository) loadTranslations(ctx context.Context, s *Setting) {
	rows, err := r.pool.Query(ctx,
		`SELECT locale, value FROM site_setting_translations WHERE setting_id = $1`,
		s.ID,
	)
	if err != nil {
		return
	}
	defer rows.Close()

	for rows.Next() {
		var t SettingTranslation
		rows.Scan(&t.Locale, &t.Value)
		s.Translations = append(s.Translations, t)
	}
}
