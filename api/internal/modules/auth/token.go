package auth

import (
	"time"

	"github.com/golang-jwt/jwt/v5"
)

type TokenService struct {
	secret        string
	accessExpiry  time.Duration
	refreshExpiry time.Duration
}

func NewTokenService(secret, accessExpiry, refreshExpiry string) *TokenService {
	ae, _ := time.ParseDuration(accessExpiry)
	re, _ := time.ParseDuration(refreshExpiry)
	if ae == 0 {
		ae = 15 * time.Minute
	}
	if re == 0 {
		re = 168 * time.Hour
	}
	return &TokenService{secret: secret, accessExpiry: ae, refreshExpiry: re}
}

type TokenPair struct {
	AccessToken  string `json:"access_token"`
	RefreshToken string `json:"refresh_token"`
	ExpiresAt    int64  `json:"expires_at"`
}

func (s *TokenService) Generate(userID, email, role string) (*TokenPair, error) {
	now := time.Now()

	accessClaims := jwt.MapClaims{
		"user_id": userID,
		"email":   email,
		"role":    role,
		"exp":     now.Add(s.accessExpiry).Unix(),
		"iat":     now.Unix(),
		"typ":     "access",
	}
	accessToken := jwt.NewWithClaims(jwt.SigningMethodHS256, accessClaims)
	accessStr, err := accessToken.SignedString([]byte(s.secret))
	if err != nil {
		return nil, err
	}

	refreshClaims := jwt.MapClaims{
		"user_id": userID,
		"exp":     now.Add(s.refreshExpiry).Unix(),
		"iat":     now.Unix(),
		"typ":     "refresh",
	}
	refreshToken := jwt.NewWithClaims(jwt.SigningMethodHS256, refreshClaims)
	refreshStr, err := refreshToken.SignedString([]byte(s.secret))
	if err != nil {
		return nil, err
	}

	return &TokenPair{
		AccessToken:  accessStr,
		RefreshToken: refreshStr,
		ExpiresAt:    now.Add(s.accessExpiry).Unix(),
	}, nil
}
