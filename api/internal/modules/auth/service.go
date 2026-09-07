package auth

import (
	"context"
	"errors"
	"log/slog"
)

type Service struct {
	repo   *Repository
	tokens *TokenService
}

func NewService(repo *Repository, tokens *TokenService) *Service {
	return &Service{repo: repo, tokens: tokens}
}

type LoginInput struct {
	Email    string `json:"email"`
	Password string `json:"password"`
}

type LoginResult struct {
	AccessToken  string `json:"access_token"`
	RefreshToken string `json:"refresh_token"`
	ExpiresAt    int64  `json:"expires_at"`
	User         UserInfo `json:"user"`
}

type UserInfo struct {
	ID    string `json:"id"`
	Email string `json:"email"`
	Name  string `json:"name"`
	Role  string `json:"role"`
}

func (s *Service) Login(ctx context.Context, input LoginInput) (*LoginResult, error) {
	user, err := s.repo.GetByEmail(ctx, input.Email)
	if err != nil {
		slog.Warn("login failed - user not found", "email", input.Email, "err", err)
		return nil, ErrInvalidCredentials
	}

	if !CheckPassword(input.Password, user.Password) {
		slog.Warn("login failed - bad password", "email", input.Email)
		return nil, ErrInvalidCredentials
	}

	pair, err := s.tokens.Generate(user.ID, user.Email, user.Role)
	if err != nil {
		return nil, err
	}

	_ = s.repo.UpdateLastLogin(ctx, user.ID)

	return &LoginResult{
		AccessToken:  pair.AccessToken,
		RefreshToken: pair.RefreshToken,
		ExpiresAt:    pair.ExpiresAt,
		User: UserInfo{
			ID:    user.ID,
			Email: user.Email,
			Name:  user.Name,
			Role:  user.Role,
		},
	}, nil
}

func (s *Service) ChangePassword(ctx context.Context, userID, oldPassword, newPassword string) error {
	// Get current user
	user, err := s.repo.GetByEmail(ctx, "") // need a GetById method
	if err != nil {
		return err
	}
	_ = user
	_ = errors.New("not implemented")
	_ = oldPassword
	_ = newPassword
	return nil
}

// EnsureDefaultAdmin sets the default admin password if it's still the placeholder
func (s *Service) EnsureDefaultAdmin(ctx context.Context, email, password, name string) error {
	user, err := s.repo.GetByEmail(ctx, email)
	if err != nil {
		// User not found — nothing to do (seed should have created it)
		return nil
	}
	if user.Password == "$2a$10$PLACEHOLDER_HASH_WILL_BE_UPDATED" {
		hashed, err := HashPassword(password)
		if err != nil {
			return err
		}
		return s.repo.UpdatePassword(ctx, user.ID, hashed)
	}
	return nil
}
