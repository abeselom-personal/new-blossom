package testimonials

import (
	"encoding/json"
	"net/http"

	"github.com/newblossom/api/internal/response"
)

type Handler struct{ repo *Repository }

func NewHandler(repo *Repository) *Handler { return &Handler{repo: repo} }

func (h *Handler) PublicList(w http.ResponseWriter, r *http.Request) {
	locale := r.URL.Query().Get("locale")
	if locale == "" {
		locale = "en"
	}
	items, err := h.repo.List(r.Context(), locale, true)
	if err != nil {
		response.Error(w, http.StatusInternalServerError, "failed to fetch testimonials")
		return
	}
	if items == nil {
		items = []Testimonial{}
	}
	response.Success(w, http.StatusOK, items)
}

func (h *Handler) AdminList(w http.ResponseWriter, r *http.Request) {
	items, err := h.repo.List(r.Context(), "", false)
	if err != nil {
		response.Error(w, http.StatusInternalServerError, "failed to fetch testimonials")
		return
	}
	if items == nil {
		items = []Testimonial{}
	}
	response.Success(w, http.StatusOK, items)
}

func (h *Handler) AdminCreate(w http.ResponseWriter, r *http.Request) {
	var t Testimonial
	if err := json.NewDecoder(r.Body).Decode(&t); err != nil {
		response.Error(w, http.StatusBadRequest, "invalid request body")
		return
	}
	if t.Rating == 0 {
		t.Rating = 5
	}
	if err := h.repo.Create(r.Context(), &t); err != nil {
		response.Error(w, http.StatusInternalServerError, "failed to create testimonial")
		return
	}
	response.Success(w, http.StatusCreated, t)
}

func (h *Handler) AdminUpdate(w http.ResponseWriter, r *http.Request) {
	var t Testimonial
	if err := json.NewDecoder(r.Body).Decode(&t); err != nil {
		response.Error(w, http.StatusBadRequest, "invalid request body")
		return
	}
	if t.ID == "" {
		response.Error(w, http.StatusBadRequest, "id is required")
		return
	}
	if err := h.repo.Update(r.Context(), &t); err != nil {
		response.Error(w, http.StatusInternalServerError, "failed to update testimonial")
		return
	}
	response.Success(w, http.StatusOK, t)
}

func (h *Handler) AdminDelete(w http.ResponseWriter, r *http.Request) {
	id := r.URL.Query().Get("id")
	if id == "" {
		response.Error(w, http.StatusBadRequest, "id is required")
		return
	}
	if err := h.repo.Delete(r.Context(), id); err != nil {
		response.Error(w, http.StatusInternalServerError, "failed to delete testimonial")
		return
	}
	response.Success(w, http.StatusOK, map[string]string{"id": id})
}
