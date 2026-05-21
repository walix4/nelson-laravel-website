#!/bin/bash
# ── STEP 1: GitHub Pages preview ──────────────────────────────────────────────
# Usage: ./deploy-preview.sh
# Renders the Laravel app locally and pushes to gh-pages for preview at:
# https://walix4.github.io/nelson-laravel-website/

set -e
cd "$(dirname "$0")"

echo "▶  Starting Laravel server..."
php artisan serve --port=8765 &>/tmp/laravel-serve.log &
SERVER_PID=$!
sleep 3

echo "▶  Rendering page..."
curl -s http://localhost:8765 \
  | sed 's|http://localhost:8765/build/|/nelson-laravel-website/build/|g' \
  | sed 's|http://localhost:8765/images/|/nelson-laravel-website/images/|g' \
  | sed 's|="/images/|="/nelson-laravel-website/images/|g' \
  | sed 's|="/favicon|="/nelson-laravel-website/favicon|g' \
  > /tmp/home-gh-pages.html

kill $SERVER_PID 2>/dev/null

echo "▶  Checking out gh-pages..."
WDIR=$(mktemp -d)
git worktree add "$WDIR" gh-pages

echo "▶  Copying assets..."
cp /tmp/home-gh-pages.html "$WDIR/index.html"
rsync -a --delete public/build/ "$WDIR/build/"
rsync -a public/images/ "$WDIR/images/"

echo "▶  Committing and pushing gh-pages..."
cd "$WDIR"
git add -A
git commit -m "Preview update: $(date '+%Y-%m-%d %H:%M')" || echo "Nothing changed."
git push origin gh-pages

cd - > /dev/null
git worktree remove "$WDIR"

echo ""
echo "✓  Preview live (wait ~1 min): https://walix4.github.io/nelson-laravel-website/"
