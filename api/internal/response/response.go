package response

import (
	"encoding/json"
	"net/http"
)

func JSON(w http.ResponseWriter, status int, v interface{}) {
	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(status)
	json.NewEncoder(w).Encode(v)
}

func Success(w http.ResponseWriter, status int, data interface{}) {
	JSON(w, status, map[string]interface{}{"success": true, "data": data})
}

func Error(w http.ResponseWriter, status int, msg string) {
	JSON(w, status, map[string]string{"error": msg})
}

func Paginated(w http.ResponseWriter, data interface{}, total, page, limit int) {
	JSON(w, http.StatusOK, map[string]interface{}{
		"success": true,
		"data":    data,
		"meta": map[string]int{
			"total": total,
			"page":  page,
			"limit": limit,
		},
	})
}
