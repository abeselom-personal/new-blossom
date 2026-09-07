#!/usr/bin/env bash
# ─────────────────────────────────────────────────────────────
# New Blossom — Start / Build / Stop / Logs / Status
#
# Usage:
#   ./scripts/start.sh                  Start all (prod mode)
#   ./scripts/start.sh --dev            Start all (dev mode, hot reload)
#   ./scripts/start.sh -b               Build and start (prod)
#   ./scripts/start.sh -b --dev         Build and start (dev)
#   ./scripts/start.sh --dev web        Start only web in dev mode
#   ./scripts/start.sh -b --dev api     Build and start only api in dev
# ─────────────────────────────────────────────────────────────
set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
INFRA_DIR="$(dirname "$SCRIPT_DIR")"
PROJECT_ROOT="$(dirname "$INFRA_DIR")"
COMPOSE_FILE="$INFRA_DIR/docker-compose.yml"

# Colors
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
CYAN='\033[0;36m'
NC='\033[0m'

log()  { echo -e "${GREEN}[nb]${NC} $1"; }
warn() { echo -e "${YELLOW}[nb]${NC} $1"; }
err()  { echo -e "${RED}[nb]${NC} $1"; }

# Parse flags
BUILD=false
DEV=false
SERVICES=()

while [[ $# -gt 0 ]]; do
  case "$1" in
    -b|--build)
      BUILD=true
      shift
      ;;
    --dev)
      DEV=true
      shift
      ;;
    -h|--help)
      echo "Usage: $0 [--dev] [-b] [service ...]"
      echo ""
      echo "  --dev    Use dev compose (hot reload, volume mounts)"
      echo "  -b       Build images before starting"
      echo "  Services: web, api, minio (default: all)"
      exit 0
      ;;
    *)
      SERVICES+=("$1")
      shift
      ;;
  esac
done

# Default to all services
if [[ ${#SERVICES[@]} -eq 0 ]]; then
  SERVICES=(web api minio)
fi

# Build compose file list
COMPOSE_FILES=(-f "$COMPOSE_FILE")
if [[ "$DEV" == true ]]; then
  COMPOSE_FILES+=(-f "$INFRA_DIR/docker-compose.dev.yml")
  log "Mode: ${CYAN}development${NC} (hot reload, volume mounts)"
else
  log "Mode: ${CYAN}production${NC}"
fi

cd "$INFRA_DIR"

# Check .env exists
if [[ ! -f "$PROJECT_ROOT/.env" ]]; then
  warn ".env not found. Copying from .env.example — edit it before production use."
  cp "$PROJECT_ROOT/.env.example" "$PROJECT_ROOT/.env"
  warn "Edit $PROJECT_ROOT/.env with your PostgreSQL password and JWT secret."
fi

# Build if requested
if [[ "$BUILD" == true ]]; then
  log "Building images for: ${SERVICES[*]}"
  docker compose "${COMPOSE_FILES[@]}" build "${SERVICES[@]}"
fi

# Start
log "Starting: ${SERVICES[*]}"
docker compose "${COMPOSE_FILES[@]}" up -d "${SERVICES[@]}"

# Wait for health
log "Waiting for services to be ready..."
sleep 3

# Show status
echo ""
docker compose "${COMPOSE_FILES[@]}" ps
echo ""
log "Services started."
if [[ "$DEV" == true ]]; then
  log "Dev mode: edit source files and changes will hot-reload automatically."
  log "No rebuild needed — just refresh your browser."
fi
log "Frontend: http://localhost:3000"
log "API:      http://localhost:8080"
log "MinIO:    http://localhost:9001 (console)"
log ""
log "Logs:   ./scripts/logs.sh --dev [service]"
log "Stop:   ./scripts/stop.sh --dev [service]"
