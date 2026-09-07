package bookings

import (
	"encoding/json"
	"net/http"
	"strconv"
	"time"

	"github.com/newblossom/api/internal/response"
)

type Handler struct {
	repo *Repository
}

func NewHandler(repo *Repository) *Handler {
	return &Handler{repo: repo}
}

// PublicCreate — anyone can submit a booking inquiry
func (h *Handler) PublicCreate(w http.ResponseWriter, r *http.Request) {
	var input struct {
		Type        string  `json:"type"`
		ReferenceID *string `json:"reference_id"`
		GuestName   string  `json:"guest_name"`
		GuestEmail  string  `json:"guest_email"`
		GuestPhone  *string `json:"guest_phone"`
		CheckIn     *string `json:"check_in"`
		CheckOut    *string `json:"check_out"`
		Adults      int     `json:"adults"`
		Children    int     `json:"children"`
		Notes       *string `json:"notes"`
	}

	if err := json.NewDecoder(r.Body).Decode(&input); err != nil {
		response.Error(w, http.StatusBadRequest, "invalid request body")
		return
	}

	if input.GuestName == "" || input.GuestEmail == "" {
		response.Error(w, http.StatusBadRequest, "guest_name and guest_email are required")
		return
	}

	if input.Type == "" {
		input.Type = "stay"
	}
	if input.Adults == 0 {
		input.Adults = 1
	}

	b := &Booking{
		Type:        input.Type,
		ReferenceID: input.ReferenceID,
		GuestName:   input.GuestName,
		GuestEmail:  input.GuestEmail,
		GuestPhone:  input.GuestPhone,
		Adults:      input.Adults,
		Children:    input.Children,
		Notes:       input.Notes,
	}

	if input.CheckIn != nil && *input.CheckIn != "" {
		if t, err := time.Parse("2006-01-02", *input.CheckIn); err == nil {
			b.CheckIn = &t
		}
	}
	if input.CheckOut != nil && *input.CheckOut != "" {
		if t, err := time.Parse("2006-01-02", *input.CheckOut); err == nil {
			b.CheckOut = &t
		}
	}

	if err := h.repo.Create(r.Context(), b); err != nil {
		response.Error(w, http.StatusInternalServerError, "failed to create booking")
		return
	}

	response.Success(w, http.StatusCreated, b)
}

// AdminList — authenticated admins can list bookings
func (h *Handler) AdminList(w http.ResponseWriter, r *http.Request) {
	status := r.URL.Query().Get("status")
	page, _ := strconv.Atoi(r.URL.Query().Get("page"))
	limit, _ := strconv.Atoi(r.URL.Query().Get("limit"))

	if page < 1 {
		page = 1
	}
	if limit < 1 || limit > 100 {
		limit = 20
	}
	offset := (page - 1) * limit

	bookings, total, err := h.repo.List(r.Context(), status, limit, offset)
	if err != nil {
		response.Error(w, http.StatusInternalServerError, "failed to fetch bookings")
		return
	}

	if bookings == nil {
		bookings = []Booking{}
	}

	response.Paginated(w, bookings, total, page, limit)
}

// AdminUpdateStatus — admins can update booking status
func (h *Handler) AdminUpdateStatus(w http.ResponseWriter, r *http.Request) {
	var body struct {
		ID     string `json:"id"`
		Status string `json:"status"`
	}
	if err := json.NewDecoder(r.Body).Decode(&body); err != nil {
		response.Error(w, http.StatusBadRequest, "invalid request body")
		return
	}

	if body.ID == "" || body.Status == "" {
		response.Error(w, http.StatusBadRequest, "id and status are required")
		return
	}

	valid := map[string]bool{"pending": true, "confirmed": true, "cancelled": true, "completed": true}
	if !valid[body.Status] {
		response.Error(w, http.StatusBadRequest, "invalid status")
		return
	}

	if err := h.repo.UpdateStatus(r.Context(), body.ID, body.Status); err != nil {
		response.Error(w, http.StatusInternalServerError, "failed to update booking")
		return
	}

	response.Success(w, http.StatusOK, map[string]string{"id": body.ID, "status": body.Status})
}
