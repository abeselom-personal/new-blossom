#!/usr/bin/env bash
# ─────────────────────────────────────────────────────────────
# New Blossom — Down (stop + remove containers + volumes)
#
# Usage:
#   ./scripts/down.sh              Stop and remove (prod)
#   ./scripts/down.sh --dev        Stop and remove (dev)
#   ./scripts/down.sh -v           Also remove volumes (MinIO data)
# ─────────────────────────────────────────────────────────────
set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
INFRA_DIR="$(dirname "$SCRIPT_DIR")"
COMPOSE_FILE="$INFRA_DIR/docker-compose.yml"

GREEN='\033[0;32m'
RED='\033[0;31m'
NC='\033[0m'
log()  { echo -e "${GREEN}[nb]${NC} $1"; }
warn() { echo -e "${RED}[nb]${NC} $1"; }

REMOVE_VOLUMES=false
DEV=false

for arg in "$@"; do
  case "$arg" in
    -v|--volumes) REMOVE_VOLUMES=true ;;
    --dev) DEV=true ;;
  esac
done

COMPOSE_FILES=(-f "$COMPOSE_FILE")
if [[ "$DEV" == true ]]; then
  COMPOSE_FILES+=(-f "$INFRA_DIR/docker-compose.dev.yml")
fi

cd "$INFRA_DIR"

if [[ "$REMOVE_VOLUMES" == true ]]; then
  warn "Removing containers AND volumes (MinIO data will be lost)."
  docker compose "${COMPOSE_FILES[@]}" down -v --remove-orphans
else
  log "Removing containers (keeping volumes)."
  docker compose "${COMPOSE_FILES[@]}" down --remove-orphans
fi

log "Done."
