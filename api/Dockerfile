FROM golang:1.24-alpine AS base

RUN apk add --no-cache git ca-certificates tzdata

# --- Builder ---
FROM base AS builder
WORKDIR /app

COPY go.mod ./
COPY go.sum* ./
RUN go mod download

COPY . .

RUN CGO_ENABLED=0 GOOS=linux go build -o /app/bin/api ./cmd/api

# --- Runner ---
FROM alpine:3.20 AS runner

RUN apk add --no-cache ca-certificates tzdata curl

WORKDIR /app

COPY --from=builder /app/bin/api /app/api
COPY --from=builder /app/migrations /app/migrations

RUN addgroup --system --gid 1001 appgroup
RUN adduser --system --uid 1001 appuser

USER appuser

EXPOSE 8080

HEALTHCHECK --interval=30s --timeout=5s --start-period=10s --retries=3 \
  CMD curl -f http://localhost:8080/health || exit 1

CMD ["/app/api"]
