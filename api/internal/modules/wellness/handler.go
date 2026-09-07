package wellness

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
	retreats, err := h.repo.List(r.Context(), locale, true)
	if err != nil {
		response.Error(w, http.StatusInternalServerError, "failed to fetch retreats")
		return
	}
	if retreats == nil {
		retreats = []Retreat{}
	}
	response.Success(w, http.StatusOK, retreats)
}

func (h *Handler) AdminList(w http.ResponseWriter, r *http.Request) {
	retreats, err := h.repo.List(r.Context(), "", false)
	if err != nil {
		response.Error(w, http.StatusInternalServerError, "failed to fetch retreats")
		return
	}
	if retreats == nil {
		retreats = []Retreat{}
	}
	response.Success(w, http.StatusOK, retreats)
}

func (h *Handler) AdminCreate(w http.ResponseWriter, r *http.Request) {
	var ret Retreat
	if err := json.NewDecoder(r.Body).Decode(&ret); err != nil {
		response.Error(w, http.StatusBadRequest, "invalid request body")
		return
	}
	if ret.Slug == "" {
		response.Error(w, http.StatusBadRequest, "slug is required")
		return
	}
	if err := h.repo.Create(r.Context(), &ret); err != nil {
		if strings.Contains(err.Error(), "duplicate") {
			response.Error(w, http.StatusConflict, "slug already exists")
			return
		}
		response.Error(w, http.StatusInternalServerError, "failed to create retreat")
		return
	}
	response.Success(w, http.StatusCreated, ret)
}

func (h *Handler) AdminUpdate(w http.ResponseWriter, r *http.Request) {
	var ret Retreat
	if err := json.NewDecoder(r.Body).Decode(&ret); err != nil {
		response.Error(w, http.StatusBadRequest, "invalid request body")
		return
	}
	if ret.ID == "" {
		response.Error(w, http.StatusBadRequest, "id is required")
		return
	}
	if err := h.repo.Update(r.Context(), &ret); err != nil {
		response.Error(w, http.StatusInternalServerError, "failed to update retreat")
		return
	}
	response.Success(w, http.StatusOK, ret)
}

func (h *Handler) AdminDelete(w http.ResponseWriter, r *http.Request) {
	id := r.URL.Query().Get("id")
	if id == "" {
		response.Error(w, http.StatusBadRequest, "id is required")
		return
	}
	if err := h.repo.Delete(r.Context(), id); err != nil {
		response.Error(w, http.StatusInternalServerError, "failed to delete retreat")
		return
	}
	response.Success(w, http.StatusOK, map[string]string{"id": id})
}
