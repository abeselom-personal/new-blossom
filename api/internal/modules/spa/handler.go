package spa

import (
	"encoding/json"
	"net/http"
	"strings"

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
		response.Error(w, http.StatusInternalServerError, "failed to fetch spa services")
		return
	}
	if items == nil {
		items = []SpaService{}
	}
	response.Success(w, http.StatusOK, items)
}

func (h *Handler) PublicGet(w http.ResponseWriter, r *http.Request) {
	slug := r.URL.Query().Get("slug")
	locale := r.URL.Query().Get("locale")
	if locale == "" {
		locale = "en"
	}
	s, err := h.repo.GetBySlug(r.Context(), slug, locale)
	if err != nil {
		response.Error(w, http.StatusNotFound, "spa service not found")
		return
	}
	response.Success(w, http.StatusOK, s)
}

func (h *Handler) AdminList(w http.ResponseWriter, r *http.Request) {
	items, err := h.repo.List(r.Context(), "", false)
	if err != nil {
		response.Error(w, http.StatusInternalServerError, "failed to fetch spa services")
		return
	}
	if items == nil {
		items = []SpaService{}
	}
	response.Success(w, http.StatusOK, items)
}

func (h *Handler) AdminCreate(w http.ResponseWriter, r *http.Request) {
	var s SpaService
	if err := json.NewDecoder(r.Body).Decode(&s); err != nil {
		response.Error(w, http.StatusBadRequest, "invalid request body")
		return
	}
	if s.Slug == "" {
		response.Error(w, http.StatusBadRequest, "slug is required")
		return
	}
	if err := h.repo.Create(r.Context(), &s); err != nil {
		if strings.Contains(err.Error(), "duplicate") {
			response.Error(w, http.StatusConflict, "slug already exists")
			return
		}
		response.Error(w, http.StatusInternalServerError, "failed to create spa service")
		return
	}
	response.Success(w, http.StatusCreated, s)
}

func (h *Handler) AdminUpdate(w http.ResponseWriter, r *http.Request) {
	var s SpaService
	if err := json.NewDecoder(r.Body).Decode(&s); err != nil {
		response.Error(w, http.StatusBadRequest, "invalid request body")
		return
	}
	if s.ID == "" {
		response.Error(w, http.StatusBadRequest, "id is required")
		return
	}
	if err := h.repo.Update(r.Context(), &s); err != nil {
		response.Error(w, http.StatusInternalServerError, "failed to update spa service")
		return
	}
	response.Success(w, http.StatusOK, s)
}

func (h *Handler) AdminDelete(w http.ResponseWriter, r *http.Request) {
	id := r.URL.Query().Get("id")
	if id == "" {
		response.Error(w, http.StatusBadRequest, "id is required")
		return
	}
	if err := h.repo.Delete(r.Context(), id); err != nil {
		response.Error(w, http.StatusInternalServerError, "failed to delete spa service")
		return
	}
	response.Success(w, http.StatusOK, map[string]string{"id": id})
}
