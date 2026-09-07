#!/usr/bin/env bash
# ─────────────────────────────────────────────────────────────
# New Blossom — Stop running containers
#
# Usage:
#   ./scripts/stop.sh              Stop all (prod)
#   ./scripts/stop.sh --dev        Stop all (dev)
#   ./scripts/stop.sh web          Stop only web
#   ./scripts/stop.sh --dev api    Stop only api (dev)
# ─────────────────────────────────────────────────────────────
set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
INFRA_DIR="$(dirname "$SCRIPT_DIR")"
COMPOSE_FILE="$INFRA_DIR/docker-compose.yml"

GREEN='\033[0;32m'
NC='\033[0m'
log() { echo -e "${GREEN}[nb]${NC} $1"; }

DEV=false
SERVICES=()

while [[ $# -gt 0 ]]; do
  case "$1" in
    --dev) DEV=true; shift ;;
    *) SERVICES+=("$1"); shift ;;
  esac
done

if [[ ${#SERVICES[@]} -eq 0 ]]; then
  SERVICES=(web api minio)
fi

COMPOSE_FILES=(-f "$COMPOSE_FILE")
if [[ "$DEV" == true ]]; then
  COMPOSE_FILES+=(-f "$INFRA_DIR/docker-compose.dev.yml")
fi

cd "$INFRA_DIR"

log "Stopping: ${SERVICES[*]}"
docker compose "${COMPOSE_FILES[@]}" stop "${SERVICES[@]}"
echo ""
docker compose "${COMPOSE_FILES[@]}" ps -a
log "Stopped."
