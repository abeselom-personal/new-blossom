package dining

import (
	"encoding/json"
	"net/http"
	"strings"

	"github.com/newblossom/api/internal/response"
)

type Handler struct{ repo *Repository }

func NewHandler(repo *Repository) *Handler { return &Handler{repo: repo} }

// ── Venues ──

func (h *Handler) PublicListVenues(w http.ResponseWriter, r *http.Request) {
	locale := r.URL.Query().Get("locale")
	if locale == "" {
		locale = "en"
	}
	venues, err := h.repo.ListVenues(r.Context(), locale, true)
	if err != nil {
		response.Error(w, http.StatusInternalServerError, "failed to fetch venues")
		return
	}
	if venues == nil {
		venues = []Venue{}
	}
	response.Success(w, http.StatusOK, venues)
}

func (h *Handler) AdminListVenues(w http.ResponseWriter, r *http.Request) {
	venues, err := h.repo.ListVenues(r.Context(), "", false)
	if err != nil {
		response.Error(w, http.StatusInternalServerError, "failed to fetch venues")
		return
	}
	if venues == nil {
		venues = []Venue{}
	}
	response.Success(w, http.StatusOK, venues)
}

func (h *Handler) AdminCreateVenue(w http.ResponseWriter, r *http.Request) {
	var v Venue
	if err := json.NewDecoder(r.Body).Decode(&v); err != nil {
		response.Error(w, http.StatusBadRequest, "invalid request body")
		return
	}
	if v.Slug == "" {
		response.Error(w, http.StatusBadRequest, "slug is required")
		return
	}
	if err := h.repo.CreateVenue(r.Context(), &v); err != nil {
		if strings.Contains(err.Error(), "duplicate") {
			response.Error(w, http.StatusConflict, "slug already exists")
			return
		}
		response.Error(w, http.StatusInternalServerError, "failed to create venue")
		return
	}
	response.Success(w, http.StatusCreated, v)
}

func (h *Handler) AdminUpdateVenue(w http.ResponseWriter, r *http.Request) {
	var v Venue
	if err := json.NewDecoder(r.Body).Decode(&v); err != nil {
		response.Error(w, http.StatusBadRequest, "invalid request body")
		return
	}
	if v.ID == "" {
		response.Error(w, http.StatusBadRequest, "id is required")
		return
	}
	if err := h.repo.UpdateVenue(r.Context(), &v); err != nil {
		response.Error(w, http.StatusInternalServerError, "failed to update venue")
		return
	}
	response.Success(w, http.StatusOK, v)
}

func (h *Handler) AdminDeleteVenue(w http.ResponseWriter, r *http.Request) {
	id := r.URL.Query().Get("id")
	if id == "" {
		response.Error(w, http.StatusBadRequest, "id is required")
		return
	}
	if err := h.repo.DeleteVenue(r.Context(), id); err != nil {
		response.Error(w, http.StatusInternalServerError, "failed to delete venue")
		return
	}
	response.Success(w, http.StatusOK, map[string]string{"id": id})
}

// ── Menu Items ──

func (h *Handler) PublicListMenuItems(w http.ResponseWriter, r *http.Request) {
	locale := r.URL.Query().Get("locale")
	category := r.URL.Query().Get("category")
	if locale == "" {
		locale = "en"
	}
	items, err := h.repo.ListMenuItems(r.Context(), locale, category, true)
	if err != nil {
		response.Error(w, http.StatusInternalServerError, "failed to fetch menu items")
		return
	}
	if items == nil {
		items = []MenuItem{}
	}
	response.Success(w, http.StatusOK, items)
}

func (h *Handler) AdminListMenuItems(w http.ResponseWriter, r *http.Request) {
	items, err := h.repo.ListMenuItems(r.Context(), "", "", false)
	if err != nil {
		response.Error(w, http.StatusInternalServerError, "failed to fetch menu items")
		return
	}
	if items == nil {
		items = []MenuItem{}
	}
	response.Success(w, http.StatusOK, items)
}

func (h *Handler) AdminCreateMenuItem(w http.ResponseWriter, r *http.Request) {
	var m MenuItem
	if err := json.NewDecoder(r.Body).Decode(&m); err != nil {
		response.Error(w, http.StatusBadRequest, "invalid request body")
		return
	}
	if m.Category == "" {
		response.Error(w, http.StatusBadRequest, "category is required")
		return
	}
	if err := h.repo.CreateMenuItem(r.Context(), &m); err != nil {
		response.Error(w, http.StatusInternalServerError, "failed to create menu item")
		return
	}
	response.Success(w, http.StatusCreated, m)
}

func (h *Handler) AdminUpdateMenuItem(w http.ResponseWriter, r *http.Request) {
	var m MenuItem
	if err := json.NewDecoder(r.Body).Decode(&m); err != nil {
		response.Error(w, http.StatusBadRequest, "invalid request body")
		return
	}
	if m.ID == "" {
		response.Error(w, http.StatusBadRequest, "id is required")
		return
	}
	if err := h.repo.UpdateMenuItem(r.Context(), &m); err != nil {
		response.Error(w, http.StatusInternalServerError, "failed to update menu item")
		return
	}
	response.Success(w, http.StatusOK, m)
}

func (h *Handler) AdminDeleteMenuItem(w http.ResponseWriter, r *http.Request) {
	id := r.URL.Query().Get("id")
	if id == "" {
		response.Error(w, http.StatusBadRequest, "id is required")
		return
	}
	if err := h.repo.DeleteMenuItem(r.Context(), id); err != nil {
		response.Error(w, http.StatusInternalServerError, "failed to delete menu item")
		return
	}
	response.Success(w, http.StatusOK, map[string]string{"id": id})
}
