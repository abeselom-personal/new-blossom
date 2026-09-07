package auth

import (
	"context"
	"errors"
	"time"

	"github.com/jackc/pgx/v5/pgxpool"
	"golang.org/x/crypto/bcrypt"
)

type Repository struct {
	pool *pgxpool.Pool
}

func NewRepository(pool *pgxpool.Pool) *Repository {
	return &Repository{pool: pool}
}

type AdminUser struct {
	ID        string
	Email     string
	Password  string
	Name      string
	Role      string
	IsActive  bool
	LastLogin *time.Time
}

func (r *Repository) GetByEmail(ctx context.Context, email string) (*AdminUser, error) {
	u := &AdminUser{}
	err := r.pool.QueryRow(ctx,
		`SELECT id, email, password, name, role, is_active, last_login
		 FROM admin_users WHERE email = $1 AND is_active = true`,
		email,
	).Scan(&u.ID, &u.Email, &u.Password, &u.Name, &u.Role, &u.IsActive, &u.LastLogin)
	if err != nil {
		return nil, err
	}
	return u, nil
}

func (r *Repository) UpdateLastLogin(ctx context.Context, userID string) error {
	_, err := r.pool.Exec(ctx,
		`UPDATE admin_users SET last_login = now() WHERE id = $1`,
		userID,
	)
	return err
}

func (r *Repository) UpdatePassword(ctx context.Context, userID, hashedPassword string) error {
	_, err := r.pool.Exec(ctx,
		`UPDATE admin_users SET password = $1 WHERE id = $2`,
		hashedPassword, userID,
	)
	return err
}

func HashPassword(password string) (string, error) {
	bytes, err := bcrypt.GenerateFromPassword([]byte(password), bcrypt.DefaultCost)
	return string(bytes), err
}

func CheckPassword(password, hash string) bool {
	return bcrypt.CompareHashAndPassword([]byte(hash), []byte(password)) == nil
}

var ErrInvalidCredentials = errors.New("invalid credentials")
