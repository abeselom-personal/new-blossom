package bookings

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

type Booking struct {
	ID          string     `json:"id"`
	Type        string     `json:"type"`
	ReferenceID *string    `json:"reference_id"`
	GuestName   string     `json:"guest_name"`
	GuestEmail  string     `json:"guest_email"`
	GuestPhone  *string    `json:"guest_phone"`
	CheckIn     *time.Time `json:"check_in"`
	CheckOut    *time.Time `json:"check_out"`
	Adults      int        `json:"adults"`
	Children    int        `json:"children"`
	Notes       *string    `json:"notes"`
	Status      string     `json:"status"`
	CreatedAt   time.Time  `json:"created_at"`
	UpdatedAt   time.Time  `json:"updated_at"`
}

func (r *Repository) Create(ctx context.Context, b *Booking) error {
	return r.pool.QueryRow(ctx,
		`INSERT INTO bookings (type, reference_id, guest_name, guest_email, guest_phone, check_in, check_out, adults, children, notes, status)
		 VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, 'pending')
		 RETURNING id, status, created_at, updated_at`,
		b.Type, b.ReferenceID, b.GuestName, b.GuestEmail, b.GuestPhone,
		b.CheckIn, b.CheckOut, b.Adults, b.Children, b.Notes,
	).Scan(&b.ID, &b.Status, &b.CreatedAt, &b.UpdatedAt)
}

func (r *Repository) List(ctx context.Context, status string, limit, offset int) ([]Booking, int, error) {
	countQuery := `SELECT count(*) FROM bookings`
	listQuery := `SELECT id, type, reference_id, guest_name, guest_email, guest_phone, check_in, check_out, adults, children, notes, status, created_at, updated_at FROM bookings`
	args := []interface{}{}

	if status != "" {
		countQuery += ` WHERE status = $1`
		listQuery += ` WHERE status = $1`
		args = append(args, status)
	}

	var total int
	if err := r.pool.QueryRow(ctx, countQuery, args...).Scan(&total); err != nil {
		return nil, 0, err
	}

	argIdx := len(args) + 1
	listQuery += ` ORDER BY created_at DESC LIMIT $` + itoa(argIdx) + ` OFFSET $` + itoa(argIdx+1)
	args = append(args, limit, offset)

	rows, err := r.pool.Query(ctx, listQuery, args...)
	if err != nil {
		return nil, 0, err
	}
	defer rows.Close()

	var bookings []Booking
	for rows.Next() {
		var b Booking
		if err := rows.Scan(&b.ID, &b.Type, &b.ReferenceID, &b.GuestName, &b.GuestEmail, &b.GuestPhone, &b.CheckIn, &b.CheckOut, &b.Adults, &b.Children, &b.Notes, &b.Status, &b.CreatedAt, &b.UpdatedAt); err != nil {
			return nil, 0, err
		}
		bookings = append(bookings, b)
	}

	return bookings, total, nil
}

func (r *Repository) UpdateStatus(ctx context.Context, id, status string) error {
	_, err := r.pool.Exec(ctx, `UPDATE bookings SET status = $1 WHERE id = $2`, status, id)
	return err
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
