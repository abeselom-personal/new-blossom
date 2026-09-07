package auth

import (
	"encoding/json"
	"net/http"

	"github.com/newblossom/api/internal/middleware"
)

type Handler struct {
	svc *Service
}

func NewHandler(svc *Service) *Handler {
	return &Handler{svc: svc}
}

func (h *Handler) Login(w http.ResponseWriter, r *http.Request) {
	var input LoginInput
	if err := json.NewDecoder(r.Body).Decode(&input); err != nil {
		writeJSON(w, http.StatusBadRequest, map[string]string{"error": "invalid request body"})
		return
	}

	if input.Email == "" || input.Password == "" {
		writeJSON(w, http.StatusBadRequest, map[string]string{"error": "email and password are required"})
		return
	}

	result, err := h.svc.Login(r.Context(), input)
	if err != nil {
		writeJSON(w, http.StatusUnauthorized, map[string]string{"error": "invalid email or password"})
		return
	}

	writeJSON(w, http.StatusOK, map[string]interface{}{
		"success": true,
		"data":    result,
	})
}

func (h *Handler) Refresh(w http.ResponseWriter, r *http.Request) {
	var body struct {
		RefreshToken string `json:"refresh_token"`
	}
	if err := json.NewDecoder(r.Body).Decode(&body); err != nil {
		writeJSON(w, http.StatusBadRequest, map[string]string{"error": "invalid request body"})
		return
	}

	if body.RefreshToken == "" {
		writeJSON(w, http.StatusBadRequest, map[string]string{"error": "refresh_token is required"})
		return
	}

	// TODO: verify refresh token and issue new pair
	writeJSON(w, http.StatusOK, map[string]string{"message": "refresh not yet implemented"})
}

func (h *Handler) Me(w http.ResponseWriter, r *http.Request) {
	userID, _ := r.Context().Value(middleware.CtxUserID).(string)
	email, _ := r.Context().Value(middleware.CtxEmail).(string)
	role, _ := r.Context().Value(middleware.CtxRole).(string)

	writeJSON(w, http.StatusOK, map[string]interface{}{
		"success": true,
		"data": map[string]string{
			"id":    userID,
			"email": email,
			"role":  role,
		},
	})
}

func writeJSON(w http.ResponseWriter, status int, v interface{}) {
	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(status)
	json.NewEncoder(w).Encode(v)
}
