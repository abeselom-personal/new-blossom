package config

import (
	"fmt"
	"os"
	"strconv"
)

type Config struct {
	AppPort    string
	AppEnv     string
	AppName    string

	DBHost     string
	DBPort     string
	DBUser     string
	DBPassword string
	DBName     string
	DBSSLMode  string
	DBMaxConns int

	JWTSecret          string
	JWTAccessExpiry    string
	JWTRefreshExpiry   string

	MinioEndpoint  string
	MinioAccessKey string
	MinioSecretKey string
	MinioBucket    string
	MinioUseSSL    bool

	CORSAllowedOrigins string

	LogLevel  string
	LogFormat string
}

func Load() (*Config, error) {
	cfg := &Config{
		AppPort:    getEnv("APP_PORT", "8080"),
		AppEnv:     getEnv("APP_ENV", "development"),
		AppName:    getEnv("APP_NAME", "new-blossom-api"),

		DBHost:     getEnv("DB_HOST", "localhost"),
		DBPort:     getEnv("DB_PORT", "5432"),
		DBUser:     getEnv("DB_USER", "nb_admin"),
		DBPassword: getEnv("DB_PASSWORD", ""),
		DBName:     getEnv("DB_NAME", "new_blossom"),
		DBSSLMode:  getEnv("DB_SSLMODE", "disable"),
		DBMaxConns: getEnvInt("DB_MAX_CONNS", 25),

		JWTSecret:        getEnv("JWT_SECRET", ""),
		JWTAccessExpiry:  getEnv("JWT_ACCESS_EXPIRY", "15m"),
		JWTRefreshExpiry: getEnv("JWT_REFRESH_EXPIRY", "168h"),

		MinioEndpoint:  getEnv("MINIO_ENDPOINT", "localhost:9000"),
		MinioAccessKey: getEnv("MINIO_ACCESS_KEY", ""),
		MinioSecretKey: getEnv("MINIO_SECRET_KEY", ""),
		MinioBucket:    getEnv("MINIO_BUCKET", "new-blossom-images"),
		MinioUseSSL:    getEnvBool("MINIO_USE_SSL", false),

		CORSAllowedOrigins: getEnv("CORS_ALLOWED_ORIGINS", "http://localhost:3000"),

		LogLevel:  getEnv("LOG_LEVEL", "info"),
		LogFormat: getEnv("LOG_FORMAT", "text"),
	}

	if cfg.JWTSecret == "" {
		return nil, fmt.Errorf("JWT_SECRET is required")
	}
	if cfg.DBPassword == "" {
		return nil, fmt.Errorf("DB_PASSWORD is required")
	}

	return cfg, nil
}

func (c *Config) DSN() string {
	return fmt.Sprintf("postgres://%s:%s@%s:%s/%s?sslmode=%s",
		c.DBUser, c.DBPassword, c.DBHost, c.DBPort, c.DBName, c.DBSSLMode)
}

func getEnv(key, fallback string) string {
	if v := os.Getenv(key); v != "" {
		return v
	}
	return fallback
}

func getEnvInt(key string, fallback int) int {
	if v := os.Getenv(key); v != "" {
		if i, err := strconv.Atoi(v); err == nil {
			return i
		}
	}
	return fallback
}

func getEnvBool(key string, fallback bool) bool {
	if v := os.Getenv(key); v != "" {
		if b, err := strconv.ParseBool(v); err == nil {
			return b
		}
	}
	return fallback
}
