package settings

import (
	"encoding/json"
	"net/http"

	"github.com/newblossom/api/internal/response"
)

type Handler struct {
	repo *Repository
}

func NewHandler(repo *Repository) *Handler {
	return &Handler{repo: repo}
}

func (h *Handler) PublicList(w http.ResponseWriter, r *http.Request) {
	settings, err := h.repo.List(r.Context(), true)
	if err != nil {
		response.Error(w, http.StatusInternalServerError, "failed to fetch settings")
		return
	}
	if settings == nil {
		settings = []Setting{}
	}
	response.Success(w, http.StatusOK, settings)
}

func (h *Handler) AdminList(w http.ResponseWriter, r *http.Request) {
	settings, err := h.repo.List(r.Context(), false)
	if err != nil {
		response.Error(w, http.StatusInternalServerError, "failed to fetch settings")
		return
	}
	if settings == nil {
		settings = []Setting{}
	}
	response.Success(w, http.StatusOK, settings)
}

func (h *Handler) AdminUpsert(w http.ResponseWriter, r *http.Request) {
	var body struct {
		Key         string              `json:"key"`
		Type        string              `json:"type"`
		IsPublic    bool                `json:"is_public"`
		Translations []SettingTranslation `json:"translations"`
	}
	if err := json.NewDecoder(r.Body).Decode(&body); err != nil {
		response.Error(w, http.StatusBadRequest, "invalid request body")
		return
	}

	if body.Key == "" {
		response.Error(w, http.StatusBadRequest, "key is required")
		return
	}

	if body.Type == "" {
		body.Type = "text"
	}

	setting, err := h.repo.Upsert(r.Context(), body.Key, body.Type, body.IsPublic, body.Translations)
	if err != nil {
		response.Error(w, http.StatusInternalServerError, "failed to save setting")
		return
	}

	response.Success(w, http.StatusOK, setting)
}

func (h *Handler) AdminDelete(w http.ResponseWriter, r *http.Request) {
	key := r.URL.Query().Get("key")
	if key == "" {
		response.Error(w, http.StatusBadRequest, "key is required")
		return
	}

	if err := h.repo.Delete(r.Context(), key); err != nil {
		response.Error(w, http.StatusInternalServerError, "failed to delete setting")
		return
	}

	response.Success(w, http.StatusOK, map[string]string{"key": key})
}
