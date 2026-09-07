package rooms

import (
	"encoding/json"
	"net/http"
	"strings"

	"github.com/newblossom/api/internal/response"
)

type Handler struct {
	repo *Repository
}

func NewHandler(repo *Repository) *Handler {
	return &Handler{repo: repo}
}

func (h *Handler) PublicList(w http.ResponseWriter, r *http.Request) {
	locale := r.URL.Query().Get("locale")
	if locale == "" {
		locale = "en"
	}

	rooms, err := h.repo.List(r.Context(), locale, true)
	if err != nil {
		response.Error(w, http.StatusInternalServerError, "failed to fetch rooms")
		return
	}

	if rooms == nil {
		rooms = []Room{}
	}
	response.Success(w, http.StatusOK, rooms)
}

func (h *Handler) PublicGet(w http.ResponseWriter, r *http.Request) {
	slug := r.URL.Query().Get("slug")
	locale := r.URL.Query().Get("locale")
	if locale == "" {
		locale = "en"
	}

	rm, err := h.repo.GetBySlug(r.Context(), slug, locale)
	if err != nil {
		response.Error(w, http.StatusNotFound, "room not found")
		return
	}
	response.Success(w, http.StatusOK, rm)
}

func (h *Handler) AdminList(w http.ResponseWriter, r *http.Request) {
	rooms, err := h.repo.List(r.Context(), "", false)
	if err != nil {
		response.Error(w, http.StatusInternalServerError, "failed to fetch rooms")
		return
	}
	if rooms == nil {
		rooms = []Room{}
	}
	response.Success(w, http.StatusOK, rooms)
}

func (h *Handler) AdminGet(w http.ResponseWriter, r *http.Request) {
	id := r.URL.Query().Get("id")
	if id == "" {
		response.Error(w, http.StatusBadRequest, "id is required")
		return
	}

	rm, err := h.repo.GetByID(r.Context(), id, "")
	if err != nil {
		response.Error(w, http.StatusNotFound, "room not found")
		return
	}
	response.Success(w, http.StatusOK, rm)
}

func (h *Handler) AdminCreate(w http.ResponseWriter, r *http.Request) {
	var rm Room
	if err := json.NewDecoder(r.Body).Decode(&rm); err != nil {
		response.Error(w, http.StatusBadRequest, "invalid request body")
		return
	}

	if rm.Slug == "" {
		response.Error(w, http.StatusBadRequest, "slug is required")
		return
	}

	if err := h.repo.Create(r.Context(), &rm); err != nil {
		if strings.Contains(err.Error(), "duplicate") {
			response.Error(w, http.StatusConflict, "slug already exists")
			return
		}
		response.Error(w, http.StatusInternalServerError, "failed to create room")
		return
	}
	response.Success(w, http.StatusCreated, rm)
}

func (h *Handler) AdminUpdate(w http.ResponseWriter, r *http.Request) {
	var rm Room
	if err := json.NewDecoder(r.Body).Decode(&rm); err != nil {
		response.Error(w, http.StatusBadRequest, "invalid request body")
		return
	}

	if rm.ID == "" {
		response.Error(w, http.StatusBadRequest, "id is required")
		return
	}

	if err := h.repo.Update(r.Context(), &rm); err != nil {
		response.Error(w, http.StatusInternalServerError, "failed to update room")
		return
	}
	response.Success(w, http.StatusOK, rm)
}

func (h *Handler) AdminDelete(w http.ResponseWriter, r *http.Request) {
	id := r.URL.Query().Get("id")
	if id == "" {
		response.Error(w, http.StatusBadRequest, "id is required")
		return
	}

	if err := h.repo.Delete(r.Context(), id); err != nil {
		response.Error(w, http.StatusInternalServerError, "failed to delete room")
		return
	}
	response.Success(w, http.StatusOK, map[string]string{"id": id})
}
