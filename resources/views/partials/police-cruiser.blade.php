{{-- Stylized top-down police cruiser, inspired by clean flat-illustration references.
     Vars: $mpath (id of path to animate along), $dur (e.g. "6s"), $scale (default 0.65) --}}
<g>
    <g transform="scale({{ $scale ?? '0.65' }})">

    {{-- Siren halos (alternating red / blue, soft-blurred) --}}
    <circle cx="0" cy="0" r="22" fill="rgba(228,67,82,.55)" filter="url(#bigGlow)">
        <animate attributeName="opacity" values=".85;0;.85" dur=".42s" repeatCount="indefinite"/>
    </circle>
    <circle cx="0" cy="0" r="22" fill="rgba(59,130,246,.55)" filter="url(#bigGlow)">
        <animate attributeName="opacity" values="0;.85;0" dur=".42s" repeatCount="indefinite"/>
    </circle>

    {{-- Soft drop shadow --}}
    <ellipse cx="0" cy="0" rx="14.5" ry="6.5" fill="rgba(0,0,0,.45)"/>

    {{-- Tires (peek above + below body) --}}
    <rect x="-9" y="-7.6" width="3.4" height="1.6" rx=".4" fill="#0a0a0a"/>
    <rect x="5.6" y="-7.6" width="3.4" height="1.6" rx=".4" fill="#0a0a0a"/>
    <rect x="-9" y="6"    width="3.4" height="1.6" rx=".4" fill="#0a0a0a"/>
    <rect x="5.6" y="6"    width="3.4" height="1.6" rx=".4" fill="#0a0a0a"/>

    {{-- Main body — navy interceptor silhouette with rounded rear and tapered nose --}}
    <path d="M -12.5 -6
             Q -14 -6  -14 -4
             L -14 4
             Q -14 6  -12.5 6
             L 6 6
             Q 9 6   11 5.5
             L 13   4
             Q 14   3   14 1.5
             L 14 -1.5
             Q 14 -3   13 -4
             L 11 -5.5
             Q 9 -6    6 -6 Z"
          fill="#1e2a52" stroke="#080d1d" stroke-width="0.45"/>

    {{-- Subtle hood highlight near nose --}}
    <path d="M 6 -5.5 L 12.5 -4.5 L 12.5 -2.4 L 6 -3 Z" fill="rgba(255,255,255,.07)"/>

    {{-- White livery panel (the classic 'police white' band running along the body) --}}
    <rect x="-7" y="-4.6" width="14" height="9.2" rx=".7" fill="#f4f6fb"/>
    {{-- Subtle shadow under door panel --}}
    <rect x="-7" y="4.2" width="14" height=".4" fill="rgba(0,0,0,.15)"/>

    {{-- Door split lines on white panel --}}
    <line x1="-1.5" y1="-4.6" x2="-1.5" y2="4.6" stroke="rgba(0,0,0,.18)" stroke-width=".3"/>
    <line x1="1.5"  y1="-4.6" x2="1.5"  y2="4.6" stroke="rgba(0,0,0,.18)" stroke-width=".3"/>

    {{-- Roof inset (the navy block in the center where the light bar mounts) --}}
    <rect x="-3.4" y="-3" width="6.8" height="6" rx=".7" fill="#1a2548"/>

    {{-- Light bar — red / white / blue, animated flash --}}
    <rect x="-3" y="-.9" width="2" height="1.8" fill="#e44352">
        <animate attributeName="fill-opacity" values="1;.25;1" dur=".42s" repeatCount="indefinite"/>
    </rect>
    <rect x="-1" y="-.9" width="2" height="1.8" fill="#ffffff">
        <animate attributeName="fill-opacity" values=".75;1;.75" dur=".42s" repeatCount="indefinite"/>
    </rect>
    <rect x="1" y="-.9" width="2" height="1.8" fill="#3b82f6">
        <animate attributeName="fill-opacity" values=".25;1;.25" dur=".42s" repeatCount="indefinite"/>
    </rect>

    {{-- Side mirrors --}}
    <path d="M -3.5 -7 L -1 -7 L -1.4 -6 L -3.5 -6 Z" fill="#1a2548"/>
    <path d="M -3.5  7 L -1  7 L -1.4  6 L -3.5  6 Z" fill="#1a2548"/>

    {{-- Front windshield (tinted, on the nose side) --}}
    <path d="M 5 -4.4 L 9 -3 L 9 3 L 5 4.4 Z" fill="#0c1126"/>
    <path d="M 5 -4.4 L 9 -3 L 9 -1.4 L 5 -2.4 Z" fill="rgba(160,200,240,.55)"/>

    {{-- Rear windshield (tinted, on the trunk side) --}}
    <path d="M -9 -3 L -5 -4.4 L -5 4.4 L -9 3 Z" fill="#0c1126"/>
    <path d="M -9 -3 L -5 -4.4 L -5 -2.4 L -9 -1.4 Z" fill="rgba(160,200,240,.45)"/>

    {{-- POLICE text on hood (front-right area, rotated so it reads vertically across the hood) --}}
    <text x="0" y=".55" text-anchor="middle" transform="translate(11.2 0) rotate(-90)"
          font-family="Inter, sans-serif" font-weight="900" font-size="1.7" fill="#fff" letter-spacing=".25">POLICE</text>
    {{-- POLICE text on rear deck --}}
    <text x="0" y=".55" text-anchor="middle" transform="translate(-11.2 0) rotate(90)"
          font-family="Inter, sans-serif" font-weight="900" font-size="1.7" fill="#fff" letter-spacing=".25">POLICE</text>

    {{-- Headlights (very bright, front edge) --}}
    <rect x="13.5" y="-4.2" width="1" height="1.6" rx=".25" fill="#fffce5"/>
    <rect x="13.5" y="2.6"  width="1" height="1.6" rx=".25" fill="#fffce5"/>

    {{-- Tail lights (rear edge, dim red) --}}
    <rect x="-14.2" y="-3.8" width="1.2" height="1.4" rx=".3" fill="#c81a1a"/>
    <rect x="-14.2" y="2.4"  width="1.2" height="1.4" rx=".3" fill="#c81a1a"/>

    </g>
    <animateMotion dur="{{ $dur ?? '6s' }}" repeatCount="indefinite" rotate="auto">
        <mpath href="#{{ $mpath ?? 'dispatchRoute' }}"/>
    </animateMotion>
</g>
