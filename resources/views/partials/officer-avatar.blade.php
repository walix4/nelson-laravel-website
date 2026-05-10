{{-- Reusable detailed officer avatar.
     Vars: $key (unique suffix for gradient IDs),
           $x, $y (svg-coord positions: 0..400 / 0..250),
           $name, $rating, $accent (gold|brand|blue), $labelSide (left|right) --}}
@php
    $accent = $accent ?? 'gold';
    $ringColor = match($accent) { 'brand' => 'brand-400', 'blue' => 'blue-400', default => 'gold-300' };
    $glowColor = match($accent) { 'brand' => 'brand-500/40', 'blue' => 'blue-500/40', default => 'gold-400/30' };
    $textColor = match($accent) { 'brand' => 'brand-300', 'blue' => 'blue-300', default => 'gold-300' };
    $labelSide = $labelSide ?? 'right';
    $rating = $rating ?? '4.9';
@endphp
<div class="absolute" style="left: calc({{ $x }}/400 * 100%); top: calc({{ $y }}/250 * 100%); transform: translate(-50%, -50%);">
    <div class="relative">
        <div class="absolute -inset-1 rounded-full bg-{{ $glowColor }} blur-md"></div>
        <div class="relative w-12 h-12 rounded-full ring-2 ring-{{ $ringColor }} ring-offset-2 ring-offset-[#0d1429] overflow-hidden bg-navy-800 shadow-lg">
            <svg viewBox="0 0 64 64" class="w-full h-full">
                <defs>
                    <radialGradient id="officerBg{{ $key }}" cx="50%" cy="35%" r="65%">
                        <stop offset="0%"  stop-color="#3a4870"/>
                        <stop offset="100%" stop-color="#0c1126"/>
                    </radialGradient>
                    <linearGradient id="officerSkin{{ $key }}" x1="0" x2="0" y1="0" y2="1">
                        <stop offset="0%"  stop-color="#f3d4b3"/>
                        <stop offset="60%" stop-color="#dcb189"/>
                        <stop offset="100%" stop-color="#a87a55"/>
                    </linearGradient>
                    <linearGradient id="officerCap{{ $key }}" x1="0" x2="0" y1="0" y2="1">
                        <stop offset="0%" stop-color="#3a4870"/>
                        <stop offset="100%" stop-color="#0c1126"/>
                    </linearGradient>
                    <linearGradient id="officerUni{{ $key }}" x1="0" x2="0" y1="0" y2="1">
                        <stop offset="0%" stop-color="#28335a"/>
                        <stop offset="100%" stop-color="#0c1126"/>
                    </linearGradient>
                    <radialGradient id="officerCheek{{ $key }}" cx="50%" cy="50%" r="50%">
                        <stop offset="0%" stop-color="rgba(220,130,110,.45)"/>
                        <stop offset="100%" stop-color="transparent"/>
                    </radialGradient>
                </defs>
                <rect width="64" height="64" fill="url(#officerBg{{ $key }})"/>
                <path d="M0 64 Q3 44 16 42 L48 42 Q61 44 64 64 Z" fill="url(#officerUni{{ $key }})"/>
                <rect x="5" y="46" width="6" height="2.5" rx=".4" fill="#f4c441"/>
                <rect x="53" y="46" width="6" height="2.5" rx=".4" fill="#f4c441"/>
                <path d="M22 42 Q27 46 32 50 Q37 46 42 42 L40 50 L24 50 Z" fill="#0a0e1f"/>
                <rect x="27" y="55" width="10" height="3" rx=".4" fill="#f4c441"/>
                <path d="M27.5 38 L27.5 45 Q32 47.5 36.5 45 L36.5 38 Z" fill="url(#officerSkin{{ $key }})"/>
                <path d="M27.5 39 Q32 41 36.5 39 L36.5 40.2 Q32 42.2 27.5 40.2 Z" fill="rgba(0,0,0,.18)"/>
                <ellipse cx="32" cy="29" rx="10.5" ry="12.5" fill="url(#officerSkin{{ $key }})"/>
                <ellipse cx="22" cy="29" rx="1.4" ry="2.4" fill="url(#officerSkin{{ $key }})"/>
                <ellipse cx="42" cy="29" rx="1.4" ry="2.4" fill="url(#officerSkin{{ $key }})"/>
                <ellipse cx="26" cy="32.5" rx="2.5" ry="1.4" fill="url(#officerCheek{{ $key }})"/>
                <ellipse cx="38" cy="32.5" rx="2.5" ry="1.4" fill="url(#officerCheek{{ $key }})"/>
                <path d="M22 24 Q32 21 42 24 Q42 28 38 28.5 L26 28.5 Q22 28 22 24 Z" fill="#3a2615"/>
                <path d="M19 24 Q32 28 45 24 L45 25.6 Q32 29 19 25.6 Z" fill="#070b1a"/>
                <path d="M19 24 Q19 13 32 11 Q45 13 45 24 Z" fill="url(#officerCap{{ $key }})"/>
                <ellipse cx="32" cy="14" rx="7" ry="1.5" fill="rgba(255,255,255,.12)"/>
                <rect x="20" y="22" width="24" height="2.4" fill="#070b1a"/>
                <g transform="translate(32 17)">
                    <path d="M0 -3.4 L1 -1.1 L3.4 -.6 L1.5 1 L2 3.4 L0 2.1 L-2 3.4 L-1.5 1 L-3.4 -.6 L-1 -1.1 Z" fill="#f4c441" stroke="#9a7a14" stroke-width=".3"/>
                </g>
                <path d="M25 25.5 Q27 25 29 25.5" stroke="#3a2615" stroke-width="1" fill="none" stroke-linecap="round"/>
                <path d="M35 25.5 Q37 25 39 25.5" stroke="#3a2615" stroke-width="1" fill="none" stroke-linecap="round"/>
                <ellipse cx="27.5" cy="29.5" rx="1.7" ry="1.9" fill="#fff"/>
                <ellipse cx="36.5" cy="29.5" rx="1.7" ry="1.9" fill="#fff"/>
                <circle cx="27.7" cy="29.7" r="1.15" fill="#3a4870"/>
                <circle cx="36.7" cy="29.7" r="1.15" fill="#3a4870"/>
                <circle cx="27.8" cy="29.8" r=".55" fill="#0c1126"/>
                <circle cx="36.8" cy="29.8" r=".55" fill="#0c1126"/>
                <circle cx="28.1" cy="29.2" r=".3" fill="#fff"/>
                <circle cx="37.1" cy="29.2" r=".3" fill="#fff"/>
                <path d="M32 30.5 Q31.4 33.6 32.6 33.6" stroke="rgba(120,75,45,.45)" stroke-width=".5" fill="none" stroke-linecap="round"/>
                <path d="M29 36.6 Q32 37.8 35 36.6" stroke="#6a3920" stroke-width=".9" fill="none" stroke-linecap="round"/>
            </svg>
        </div>
        <div class="absolute {{ $labelSide === 'left' ? 'right-full mr-2 text-right' : 'left-full ml-2' }} top-1/2 -translate-y-1/2 whitespace-nowrap">
            <p class="text-[10px] font-bold text-white leading-tight drop-shadow">{{ $name }}</p>
            <p class="text-[9px] text-{{ $textColor }} leading-tight drop-shadow">en route · ★ {{ $rating }}</p>
        </div>
    </div>
</div>
