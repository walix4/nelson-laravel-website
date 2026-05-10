{{-- Reusable detailed top-down police cruiser SVG group.
     Vars: $mpath (id of the path to animate along), $dur (animation duration, e.g. "6s") --}}
<g>
    {{-- Big red & blue siren glow halos (alternating, soft-blurred) --}}
    <circle cx="0" cy="0" r="28" fill="rgba(228,67,82,.55)" filter="url(#bigGlow)">
        <animate attributeName="opacity" values=".85;0;.85" dur=".42s" repeatCount="indefinite"/>
    </circle>
    <circle cx="0" cy="0" r="28" fill="rgba(59,130,246,.55)" filter="url(#bigGlow)">
        <animate attributeName="opacity" values="0;.85;0" dur=".42s" repeatCount="indefinite"/>
    </circle>

    {{-- Light beams projecting forward and back from the bar --}}
    <path d="M0 0 L34 -22 L34 22 Z" fill="rgba(228,67,82,.3)" filter="url(#glowR)">
        <animate attributeName="opacity" values=".6;0;.6" dur=".42s" repeatCount="indefinite"/>
    </path>
    <path d="M0 0 L-34 -22 L-34 22 Z" fill="rgba(59,130,246,.3)" filter="url(#glowR)">
        <animate attributeName="opacity" values="0;.6;0" dur=".42s" repeatCount="indefinite"/>
    </path>

    {{-- Headlight cone (forward, white) --}}
    <path d="M14 -4 L34 -10 L34 10 L14 4 Z" fill="rgba(255,250,200,.18)" filter="url(#glowR)"/>

    {{-- Soft underbody shadow --}}
    <ellipse cx="0" cy="2.8" rx="16" ry="5" fill="rgba(0,0,0,.5)"/>

    {{-- Wheels --}}
    <g><rect x="-10" y="-7.8" width="4" height="2.4" rx=".7" fill="#0a0a0a"/><rect x="-9.7" y="-7.4" width="3.4" height="1.6" rx=".3" fill="#2a2a2a"/></g>
    <g><rect x="6"   y="-7.8" width="4" height="2.4" rx=".7" fill="#0a0a0a"/><rect x="6.3"  y="-7.4" width="3.4" height="1.6" rx=".3" fill="#2a2a2a"/></g>
    <g><rect x="-10" y="5.4"  width="4" height="2.4" rx=".7" fill="#0a0a0a"/><rect x="-9.7" y="5.8"  width="3.4" height="1.6" rx=".3" fill="#2a2a2a"/></g>
    <g><rect x="6"   y="5.4"  width="4" height="2.4" rx=".7" fill="#0a0a0a"/><rect x="6.3"  y="5.8"  width="3.4" height="1.6" rx=".3" fill="#2a2a2a"/></g>

    {{-- Cruiser body --}}
    <path d="M-12.5 -6 Q-14 -6 -14 -4.5 L-14 4.5 Q-14 6 -12.5 6 L11.5 6 Q14 6 14 4 L14 -4 Q14 -6 11.5 -6 Z"
          fill="url(#carBody)" stroke="#1a2548" stroke-width="0.4"/>
    <path d="M5 -5.6 L13.5 -5.4 L13.5 -2 L5 -2.6 Z" fill="url(#hoodShine)" opacity=".7"/>
    <line x1="-3" y1="-6" x2="-3" y2="6" stroke="rgba(0,0,0,.18)" stroke-width=".35"/>
    <line x1="3"  y1="-6" x2="3"  y2="6" stroke="rgba(0,0,0,.18)" stroke-width=".35"/>
    <line x1="14" y1="0" x2="9" y2="0" stroke="rgba(0,0,0,.12)" stroke-width=".3"/>
    <rect x="2.5" y="-7"  width="2" height="1.4" rx=".4" fill="#1a2548"/>
    <rect x="2.5" y="5.6" width="2" height="1.4" rx=".4" fill="#1a2548"/>
    <path d="M3 -5 L8.5 -3.5 L8.5 3.5 L3 5 Z" fill="#1e3a5f"/>
    <path d="M3 -5 L8.5 -3.5 L8.5 -1.5 L3 -2 Z" fill="rgba(140,180,230,.45)"/>
    <path d="M-8.5 -3.5 L-3 -5 L-3 5 L-8.5 3.5 Z" fill="#1e3a5f"/>
    <path d="M-8.5 -3.5 L-3 -5 L-3 -3 L-8.5 -1.5 Z" fill="rgba(140,180,230,.4)"/>

    {{-- Police livery stripe --}}
    <rect x="-12" y="-1.4" width="24" height="2.8" fill="#0c1126"/>
    <text x="0" y=".7" text-anchor="middle" font-family="Inter, sans-serif" font-weight="900" font-size="1.9" fill="#fff" letter-spacing=".45">POLICE</text>

    {{-- Front headlights, grille, tail lights --}}
    <rect x="12.6" y="-4.8" width="1.6" height="1.8" rx=".4" fill="#fffce5"/>
    <rect x="12.6" y="3"    width="1.6" height="1.8" rx=".4" fill="#fffce5"/>
    <rect x="13" y="-1.5" width="1" height="3" rx=".2" fill="#0c1126"/>
    <rect x="-14" y="-4.8" width="1.2" height="1.8" rx=".3" fill="#a01818"/>
    <rect x="-14" y="3"    width="1.2" height="1.8" rx=".3" fill="#a01818"/>

    {{-- Light bar housing --}}
    <rect x="-4" y="-3.4" width="8" height="6.8" rx="1" fill="#0c1126" stroke="#1a2548" stroke-width=".25"/>

    {{-- Top row: red LEDs --}}
    <g>
        <circle cx="-2.6" cy="-2" r=".7" fill="#e44352" filter="url(#glowR)"><animate attributeName="fill-opacity" values="1;.2;.2;.2;1" dur=".4s" repeatCount="indefinite"/></circle>
        <circle cx="-.85" cy="-2" r=".7" fill="#e44352" filter="url(#glowR)"><animate attributeName="fill-opacity" values=".2;1;.2;.2;.2" dur=".4s" repeatCount="indefinite"/></circle>
        <circle cx=".85"  cy="-2" r=".7" fill="#e44352" filter="url(#glowR)"><animate attributeName="fill-opacity" values=".2;.2;1;.2;.2" dur=".4s" repeatCount="indefinite"/></circle>
        <circle cx="2.6"  cy="-2" r=".7" fill="#e44352" filter="url(#glowR)"><animate attributeName="fill-opacity" values=".2;.2;.2;1;.2" dur=".4s" repeatCount="indefinite"/></circle>
    </g>
    {{-- Center strobe --}}
    <rect x="-1" y=".1" width="2" height=".5" rx=".15" fill="#fff"><animate attributeName="fill-opacity" values="1;0;1;0;1" dur=".22s" repeatCount="indefinite"/></rect>
    {{-- Bottom row: blue LEDs --}}
    <g>
        <circle cx="-2.6" cy="2" r=".7" fill="#3b82f6" filter="url(#glowR)"><animate attributeName="fill-opacity" values=".2;.2;.2;1;.2" dur=".4s" repeatCount="indefinite"/></circle>
        <circle cx="-.85" cy="2" r=".7" fill="#3b82f6" filter="url(#glowR)"><animate attributeName="fill-opacity" values=".2;.2;1;.2;.2" dur=".4s" repeatCount="indefinite"/></circle>
        <circle cx=".85"  cy="2" r=".7" fill="#3b82f6" filter="url(#glowR)"><animate attributeName="fill-opacity" values=".2;1;.2;.2;.2" dur=".4s" repeatCount="indefinite"/></circle>
        <circle cx="2.6"  cy="2" r=".7" fill="#3b82f6" filter="url(#glowR)"><animate attributeName="fill-opacity" values="1;.2;.2;.2;1" dur=".4s" repeatCount="indefinite"/></circle>
    </g>

    <animateMotion dur="{{ $dur ?? '6s' }}" repeatCount="indefinite" rotate="auto">
        <mpath href="#{{ $mpath ?? 'dispatchRoute' }}"/>
    </animateMotion>
</g>
