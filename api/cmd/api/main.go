package main

import (
	"context"
	"log/slog"
	"net/http"
	"os"
	"os/signal"
	"syscall"
	"time"

	"github.com/go-chi/chi/v5"
	chiMiddleware "github.com/go-chi/chi/v5/middleware"
	"github.com/go-chi/cors"

	"github.com/newblossom/api/internal/config"
	"github.com/newblossom/api/internal/database"
	"github.com/newblossom/api/internal/middleware"
	"github.com/newblossom/api/internal/modules/auth"
	"github.com/newblossom/api/internal/modules/bookings"
	"github.com/newblossom/api/internal/modules/dining"
	"github.com/newblossom/api/internal/modules/heritage"
	"github.com/newblossom/api/internal/modules/rooms"
	"github.com/newblossom/api/internal/modules/settings"
	"github.com/newblossom/api/internal/modules/spa"
	"github.com/newblossom/api/internal/modules/testimonials"
	"github.com/newblossom/api/internal/modules/wellness"
	"github.com/newblossom/api/internal/response"
)

func main() {
	logger := slog.New(slog.NewTextHandler(os.Stdout, &slog.HandlerOptions{
		Level: slog.LevelInfo,
	}))
	slog.SetDefault(logger)

	cfg, err := config.Load()
	if err != nil {
		slog.Error("config error", "err", err)
		os.Exit(1)
	}

	ctx := context.Background()

	// Database
	pool, err := database.NewPool(ctx, cfg)
	if err != nil {
		slog.Error("database error", "err", err)
		os.Exit(1)
	}
	defer pool.Close()

	// Auth module
	authRepo := auth.NewRepository(pool)
	tokenSvc := auth.NewTokenService(cfg.JWTSecret, cfg.JWTAccessExpiry, cfg.JWTRefreshExpiry)
	authSvc := auth.NewService(authRepo, tokenSvc)
	authHandler := auth.NewHandler(authSvc)

	// Ensure default admin has a real password
	if err := authSvc.EnsureDefaultAdmin(ctx, "admin@newblossomdiredawa.com", "admin123", "Admin"); err != nil {
		slog.Warn("failed to set default admin password", "err", err)
	}

	// Rooms module
	roomsRepo := rooms.NewRepository(pool)
	roomsHandler := rooms.NewHandler(roomsRepo)

	// Bookings module
	bookingsRepo := bookings.NewRepository(pool)
	bookingsHandler := bookings.NewHandler(bookingsRepo)

	// Settings module
	settingsRepo := settings.NewRepository(pool)
	settingsHandler := settings.NewHandler(settingsRepo)

	// Spa module
	spaRepo := spa.NewRepository(pool)
	spaHandler := spa.NewHandler(spaRepo)

	// Dining module
	diningRepo := dining.NewRepository(pool)
	diningHandler := dining.NewHandler(diningRepo)

	// Heritage module
	heritageRepo := heritage.NewRepository(pool)
	heritageHandler := heritage.NewHandler(heritageRepo)

	// Wellness module
	wellnessRepo := wellness.NewRepository(pool)
	wellnessHandler := wellness.NewHandler(wellnessRepo)

	// Testimonials module
	testimonialsRepo := testimonials.NewRepository(pool)
	testimonialsHandler := testimonials.NewHandler(testimonialsRepo)

	// Router
	r := chi.NewRouter()

	// Middleware
	r.Use(chiMiddleware.RequestID)
	r.Use(chiMiddleware.RealIP)
	r.Use(chiMiddleware.Logger)
	r.Use(chiMiddleware.Recoverer)
	r.Use(chiMiddleware.Timeout(30 * time.Second))
	r.Use(cors.Handler(cors.Options{
		AllowedOrigins:   parseCORSOrigins(cfg.CORSAllowedOrigins),
		AllowedMethods:   []string{"GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"},
		AllowedHeaders:   []string{"Accept", "Authorization", "Content-Type"},
		ExposedHeaders:   []string{"Link"},
		AllowCredentials: true,
		MaxAge:           300,
	}))

	// Health
	r.Get("/health", func(w http.ResponseWriter, r *http.Request) {
		response.JSON(w, http.StatusOK, map[string]string{"status": "ok", "service": "new-blossom-api"})
	})

	// ── Public API (no auth) ──
	r.Route("/api/v1", func(r chi.Router) {
		// Auth
		r.Post("/auth/login", authHandler.Login)
		r.Post("/auth/refresh", authHandler.Refresh)

		// Public content
		r.Get("/rooms", roomsHandler.PublicList)
		r.Get("/rooms/by-slug", roomsHandler.PublicGet)

		r.Get("/spa", spaHandler.PublicList)
		r.Get("/spa/by-slug", spaHandler.PublicGet)

		r.Get("/dining/venues", diningHandler.PublicListVenues)
		r.Get("/dining/menu", diningHandler.PublicListMenuItems)

		r.Get("/heritage", heritageHandler.PublicList)

		r.Get("/wellness", wellnessHandler.PublicList)

		r.Get("/testimonials", testimonialsHandler.PublicList)

		r.Get("/settings", settingsHandler.PublicList)

		// Public booking submission
		r.Post("/bookings", bookingsHandler.PublicCreate)
	})

	// ── Admin API (auth required) ──
	r.Route("/api/v1/admin", func(r chi.Router) {
		r.Use(middleware.JWTAuth(cfg.JWTSecret))

		// Auth - me
		r.Get("/me", authHandler.Me)

		// Rooms CRUD
		r.Get("/rooms", roomsHandler.AdminList)
		r.Get("/rooms/{id}", roomsHandler.AdminGet)
		r.Post("/rooms", roomsHandler.AdminCreate)
		r.Put("/rooms", roomsHandler.AdminUpdate)
		r.Delete("/rooms", roomsHandler.AdminDelete)

		// Spa CRUD
		r.Get("/spa", spaHandler.AdminList)
		r.Post("/spa", spaHandler.AdminCreate)
		r.Put("/spa", spaHandler.AdminUpdate)
		r.Delete("/spa", spaHandler.AdminDelete)

		// Dining venues CRUD
		r.Get("/dining/venues", diningHandler.AdminListVenues)
		r.Post("/dining/venues", diningHandler.AdminCreateVenue)
		r.Put("/dining/venues", diningHandler.AdminUpdateVenue)
		r.Delete("/dining/venues", diningHandler.AdminDeleteVenue)

		// Menu items CRUD
		r.Get("/dining/menu", diningHandler.AdminListMenuItems)
		r.Post("/dining/menu", diningHandler.AdminCreateMenuItem)
		r.Put("/dining/menu", diningHandler.AdminUpdateMenuItem)
		r.Delete("/dining/menu", diningHandler.AdminDeleteMenuItem)

		// Heritage CRUD
		r.Get("/heritage", heritageHandler.AdminList)
		r.Post("/heritage", heritageHandler.AdminCreate)
		r.Put("/heritage", heritageHandler.AdminUpdate)
		r.Delete("/heritage", heritageHandler.AdminDelete)

		// Wellness CRUD
		r.Get("/wellness", wellnessHandler.AdminList)
		r.Post("/wellness", wellnessHandler.AdminCreate)
		r.Put("/wellness", wellnessHandler.AdminUpdate)
		r.Delete("/wellness", wellnessHandler.AdminDelete)

		// Testimonials CRUD
		r.Get("/testimonials", testimonialsHandler.AdminList)
		r.Post("/testimonials", testimonialsHandler.AdminCreate)
		r.Put("/testimonials", testimonialsHandler.AdminUpdate)
		r.Delete("/testimonials", testimonialsHandler.AdminDelete)

		// Bookings management
		r.Get("/bookings", bookingsHandler.AdminList)
		r.Patch("/bookings/status", bookingsHandler.AdminUpdateStatus)

		// Settings CRUD
		r.Get("/settings", settingsHandler.AdminList)
		r.Put("/settings", settingsHandler.AdminUpsert)
		r.Delete("/settings", settingsHandler.AdminDelete)
	})

	// Server
	srv := &http.Server{
		Addr:         ":" + cfg.AppPort,
		Handler:      r,
		ReadTimeout:  15 * time.Second,
		WriteTimeout: 15 * time.Second,
		IdleTimeout:  60 * time.Second,
	}

	go func() {
		slog.Info("starting API server", "port", cfg.AppPort, "env", cfg.AppEnv)
		if err := srv.ListenAndServe(); err != nil && err != http.ErrServerClosed {
			slog.Error("server error", "err", err)
			os.Exit(1)
		}
	}()

	quit := make(chan os.Signal, 1)
	signal.Notify(quit, syscall.SIGINT, syscall.SIGTERM)
	<-quit

	slog.Info("shutting down...")
	shutdownCtx, cancel := context.WithTimeout(context.Background(), 10*time.Second)
	defer cancel()

	if err := srv.Shutdown(shutdownCtx); err != nil {
		slog.Error("forced shutdown", "err", err)
	}
	slog.Info("server stopped")
}

func parseCORSOrigins(s string) []string {
	if s == "" {
		return []string{"*"}
	}
	var origins []string
	for _, o := range splitComma(s) {
		origins = append(origins, o)
	}
	return origins
}

func splitComma(s string) []string {
	var parts []string
	current := ""
	for _, c := range s {
		if c == ',' {
			if current != "" {
				parts = append(parts, current)
				current = ""
			}
		} else {
			current += string(c)
		}
	}
	if current != "" {
		parts = append(parts, current)
	}
	return parts
}
