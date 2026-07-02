#!/usr/bin/env python3
"""
Background removal using flood-fill from corners + soft alpha blending.
Dark BG images: bento-phone-card, bento-carrier-notif, bento-broker-phone
Light BG images: bento-gauge
"""
from PIL import Image
import numpy as np
import sys, os

def flood_fill_mask(img_arr, seed_points, tolerance=30):
    """BFS flood fill from seed pixels to build a background mask."""
    h, w = img_arr.shape[:2]
    visited = np.zeros((h, w), dtype=bool)
    mask = np.zeros((h, w), dtype=bool)
    # Use the average color of seed pixels as the background color
    seed_colors = [img_arr[r, c, :3] for (r, c) in seed_points if 0 <= r < h and 0 <= c < w]
    bg_color = np.mean(seed_colors, axis=0)

    from collections import deque
    q = deque(seed_points)
    for pt in seed_points:
        r, c = pt
        if 0 <= r < h and 0 <= c < w and not visited[r, c]:
            visited[r, c] = True
            mask[r, c] = True

    while q:
        r, c = q.popleft()
        for dr, dc in [(-1,0),(1,0),(0,-1),(0,1)]:
            nr, nc = r+dr, c+dc
            if 0 <= nr < h and 0 <= nc < w and not visited[nr, nc]:
                visited[nr, nc] = True
                pixel = img_arr[nr, nc, :3].astype(float)
                dist = np.sqrt(np.sum((pixel - bg_color) ** 2))
                if dist <= tolerance:
                    mask[nr, nc] = True
                    q.append((nr, nc))
    return mask, bg_color

def soft_alpha_from_mask(mask, img_arr, bg_color, feather=8):
    """Create smooth alpha: 0 for background, 255 for foreground, soft at edges."""
    from scipy.ndimage import distance_transform_edt
    # distance from background region
    dist = distance_transform_edt(~mask)
    # distance from foreground region
    dist_from_fg = distance_transform_edt(mask)
    # Alpha: 0 at background, ramp up over feather pixels from edge
    alpha = np.clip(dist / feather, 0, 1) * 255
    return alpha.astype(np.uint8)

def simple_soft_alpha(mask, feather=8):
    """Simpler approach without scipy."""
    from PIL import ImageFilter
    mask_img = Image.fromarray((~mask * 255).astype(np.uint8), 'L')
    # Blur to get soft edges
    blurred = mask_img.filter(ImageFilter.GaussianBlur(radius=feather/2))
    blurred_arr = np.array(blurred)
    # Invert: 0=bg, 255=fg with soft edges
    alpha = 255 - blurred_arr
    return alpha

def remove_bg(path_in, path_out, is_dark_bg=True, tolerance=35, feather=6):
    img = Image.open(path_in).convert("RGBA")
    arr = np.array(img)
    h, w = arr.shape[:2]

    # Seed from corners + edges
    corner_pad = 3
    seeds = []
    for r in range(corner_pad):
        for c in range(corner_pad):
            seeds += [(r, c), (r, w-1-c), (h-1-r, c), (h-1-r, w-1-c)]
    # Add edge seeds
    for i in range(0, w, 10):
        seeds += [(0, i), (h-1, i)]
    for i in range(0, h, 10):
        seeds += [(i, 0), (i, w-1)]

    mask, bg_color = flood_fill_mask(arr, seeds, tolerance=tolerance)

    # Soft alpha from mask
    alpha = simple_soft_alpha(mask, feather=feather)

    # Combine with existing alpha (in case there's already transparency)
    existing_alpha = arr[:, :, 3]
    final_alpha = np.minimum(alpha, existing_alpha)

    result = arr.copy()
    result[:, :, 3] = final_alpha

    out_img = Image.fromarray(result, 'RGBA')
    out_img.save(path_out, 'PNG')
    print(f"Saved: {path_out} (bg color: {bg_color.astype(int)})")

if __name__ == "__main__":
    base = "/Users/apple/Desktop/Nelson/Laravel Website/nextjs-site/public"

    jobs = [
        ("bento-phone-card.png",    "bento-phone-card.png",    True,  40, 7),
        ("bento-carrier-notif.png", "bento-carrier-notif.png", True,  40, 7),
        ("bento-broker-phone.png",  "bento-broker-phone.png",  True,  40, 7),
        ("bento-gauge.png",         "bento-gauge.png",         False, 35, 6),
    ]

    for fname_in, fname_out, dark_bg, tol, feat in jobs:
        src = os.path.join(base, fname_in)
        # Backup originals first
        backup = src + ".bak"
        if not os.path.exists(backup):
            import shutil
            shutil.copy2(src, backup)
            print(f"Backed up: {backup}")
        dst = os.path.join(base, fname_out)
        remove_bg(src, dst, is_dark_bg=dark_bg, tolerance=tol, feather=feat)
