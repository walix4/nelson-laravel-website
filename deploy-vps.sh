#!/bin/bash
# ── STEP 2: Deploy to live VPS ────────────────────────────────────────────────
# Usage: ./deploy-vps.sh
# Pushes local changes to auxilionetwork.com VPS

set -e
cd "$(dirname "$0")"

VPS="root@207.244.240.103"
VPS_DIR="/var/www/html/auxilionetwork_v2"
export SSHPASS="nelsonpk"

echo "▶  Uploading blade file..."
sshpass -e rsync -az --checksum -e "ssh -o StrictHostKeyChecking=no" \
  resources/views/home-1.blade.php \
  "$VPS:$VPS_DIR/resources/views/home-1.blade.php"

echo "▶  Uploading partials..."
sshpass -e rsync -az --checksum -e "ssh -o StrictHostKeyChecking=no" \
  resources/views/partials/hero-hands.blade.php \
  resources/views/partials/officer-avatar.blade.php \
  resources/views/partials/police-cruiser.blade.php \
  "$VPS:$VPS_DIR/resources/views/partials/"

echo "▶  Uploading build assets..."
sshpass -e rsync -az --checksum --delete -e "ssh -o StrictHostKeyChecking=no" \
  public/build/ \
  "$VPS:$VPS_DIR/public/build/"

echo "▶  Uploading images..."
sshpass -e rsync -az --checksum -e "ssh -o StrictHostKeyChecking=no" \
  public/images/ \
  "$VPS:$VPS_DIR/public/images/"

echo "▶  Fixing permissions..."
sshpass -e ssh -o StrictHostKeyChecking=no "$VPS" \
  "find $VPS_DIR/public/images -type f -exec chmod 644 {} \; && find $VPS_DIR/public/images -type d -exec chmod 755 {} \;"

echo "▶  Clearing view cache..."
sshpass -e ssh -o StrictHostKeyChecking=no "$VPS" \
  "cd $VPS_DIR && php artisan view:clear"

echo ""
echo "✓  Live at: https://auxilionetwork.com"
