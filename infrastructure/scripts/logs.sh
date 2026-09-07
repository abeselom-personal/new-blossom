#!/usr/bin/env bash
# ─────────────────────────────────────────────────────────────
# New Blossom — View logs
#
# Usage:
#   ./scripts/logs.sh                  Tail all (prod)
#   ./scripts/logs.sh --dev            Tail all (dev)
#   ./scripts/logs.sh --dev web        Follow web logs (dev)
#   ./scripts/logs.sh --last 50        Last 50 lines of all
# ─────────────────────────────────────────────────────────────
set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
INFRA_DIR="$(dirname "$SCRIPT_DIR")"
COMPOSE_FILE="$INFRA_DIR/docker-compose.yml"

FOLLOW="-f"
TAIL=""
DEV=false
SERVICES=()

while [[ $# -gt 0 ]]; do
  case "$1" in
    --dev) DEV=true; shift ;;
    -f|--follow) FOLLOW="-f"; shift ;;
    --no-follow) FOLLOW=""; shift ;;
    --last) FOLLOW=""; TAIL="--tail=$2"; shift 2 ;;
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

docker compose "${COMPOSE_FILES[@]}" logs $FOLLOW $TAIL "${SERVICES[@]}"
