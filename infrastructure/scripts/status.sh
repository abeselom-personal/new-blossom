#!/usr/bin/env bash
# ─────────────────────────────────────────────────────────────
# New Blossom — Show status of all services
# ─────────────────────────────────────────────────────────────
set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
INFRA_DIR="$(dirname "$SCRIPT_DIR")"
COMPOSE_FILE="$INFRA_DIR/docker-compose.yml"

cd "$INFRA_DIR"

echo "=== Docker Compose Status ==="
docker compose -f "$COMPOSE_FILE" ps -a
echo ""
echo "=== Port Mapping ==="
for port in 3000 8080 9000 9001; do
  result=$(ss -tlnp 2>/dev/null | grep ":$port " || true)
  if [[ -n "$result" ]]; then
    echo "  :$port  IN USE  → $result"
  else
    echo "  :$port  FREE"
  fi
done
echo ""
echo "=== Host PostgreSQL ==="
if pg_isready -h localhost -p 5432 >/dev/null 2>&1; then
  echo "  :5432  ACCEPTING CONNECTIONS"
else
  echo "  :5432  NOT REACHABLE"
fi
