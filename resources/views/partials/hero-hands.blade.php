{{--
    Hero composition: white-glove hands cradling a phone showing the actual Auxilio
    User app — the real Map View / case-tracking screen pulled from Figma.
    Drop in a final hands+phone PNG by replacing this whole body with:
        <img src="/images/hero-hands.png" alt="Auxilio app in hand" class="w-full h-auto" />
--}}
<div class="relative w-full h-full">
    <svg viewBox="0 0 600 600" class="absolute inset-0 w-full h-full" aria-hidden="true">
        <defs>
            <linearGradient id="handFill" x1="0" x2="0" y1="0" y2="1">
                <stop offset="0%"  stop-color="#ffffff"/>
                <stop offset="55%" stop-color="#f3f5f9"/>
                <stop offset="100%" stop-color="#dde2ec"/>
            </linearGradient>
            <linearGradient id="handFill2" x1="1" x2="0" y1="0" y2="1">
                <stop offset="0%"  stop-color="#ffffff"/>
                <stop offset="55%" stop-color="#eef1f7"/>
                <stop offset="100%" stop-color="#cdd4e0"/>
            </linearGradient>
            <filter id="softShadow" x="-50%" y="-50%" width="200%" height="200%">
                <feGaussianBlur in="SourceAlpha" stdDeviation="10"/>
                <feOffset dx="0" dy="14"/>
                <feComponentTransfer><feFuncA type="linear" slope="0.18"/></feComponentTransfer>
                <feMerge><feMergeNode/><feMergeNode in="SourceGraphic"/></feMerge>
            </filter>
        </defs>

        {{-- Lower (cradling) hand --}}
        <g filter="url(#softShadow)">
            <path d="M70 470 C 60 360, 130 290, 220 290 L 360 290 C 460 290, 530 350, 540 460 C 545 510, 520 560, 470 575 L 170 575 C 110 575, 70 540, 70 470 Z" fill="url(#handFill)"/>
            <path d="M170 320 C 150 310, 130 320, 130 350 C 130 380, 150 400, 175 405 C 200 410, 220 395, 215 370 C 210 345, 195 328, 170 320 Z" fill="url(#handFill)"/>
            <path d="M250 555 C 270 545, 300 545, 320 555" stroke="#c5cdda" stroke-width="2" fill="none" opacity=".55" stroke-linecap="round"/>
            <path d="M340 555 C 360 545, 390 545, 410 555" stroke="#c5cdda" stroke-width="2" fill="none" opacity=".55" stroke-linecap="round"/>
        </g>

        {{-- Upper (pointing) hand --}}
        <g filter="url(#softShadow)">
            <path d="M85 80 C 60 110, 60 170, 100 200 C 130 222, 175 230, 215 218 L 245 256 C 260 275, 285 280, 300 268 C 312 258, 312 240, 296 224 L 260 192 L 240 165 C 215 130, 160 95, 130 78 C 110 68, 95 70, 85 80 Z" fill="url(#handFill2)"/>
            <path d="M150 175 C 175 195, 205 207, 235 207" stroke="#c5cdda" stroke-width="2" fill="none" opacity=".55" stroke-linecap="round"/>
        </g>
    </svg>

    {{-- Real app screenshot inside a phone frame --}}
    <div class="absolute left-1/2 top-1/2 -translate-x-[40%] -translate-y-1/2 w-[55%] aspect-[9/19] rounded-[40px] bg-navy-950 p-3 shadow-[0_30px_80px_-20px_rgba(12,17,38,.45)]">
        <div class="absolute top-5 left-1/2 -translate-x-1/2 w-24 h-6 rounded-full bg-navy-950 z-20"></div>
        <div class="relative w-full h-full rounded-[30px] overflow-hidden bg-white">
            <img src="/images/screen-map.png" alt="Auxilio User — live case tracking with distance, duration, and driving metrics over a Newark, NJ map" class="absolute inset-0 w-full h-full object-cover object-top" />
        </div>
    </div>
</div>
