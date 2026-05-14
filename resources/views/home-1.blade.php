<!DOCTYPE html>
<html lang="en" class="scroll-smooth">
<head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta name="description" content="Auxilio User — Real-time crime maps, registered sex-offender alerts, and one-tap emergency response. Designed for the safety of families, accessible for citizens." />
    <meta property="og:title" content="Auxilio User — Your Safety, Your Control" />
    <meta property="og:description" content="Designed for safety of the families, making it accessible for citizens." />
    <title>Auxilio User — Your Safety, Your Control</title>
    <link rel="icon" type="image/png" href="/images/auxilio-user.png" />
    <link rel="stylesheet" href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css" integrity="sha256-p4NxAoJBhIIN+hmNHrzRCf9tD/miZyoHS5obTRR9BMY=" crossorigin="" />
    @vite(['resources/css/app.css', 'resources/js/app.js'])
    <style>
        [data-nav].is-scrolled {
            box-shadow: 0 8px 24px -12px rgba(116, 25, 33, .45);
        }
        [data-menu-panel] { transform: translateY(-12px); opacity: 0; pointer-events: none; transition: .25s ease; }
        [data-menu-panel].is-open { transform: none; opacity: 1; pointer-events: auto; }
        .hero-bg { background: linear-gradient(180deg, #eef2f8 0%, #f4f6fb 50%, #ffffff 100%); }
        /* Inside the dispatch panel, force Leaflet's panes BELOW our SVG overlay + avatars
           (Leaflet's defaults go up to z:700 which would hide everything we layer on top). */
        #dispatch-leaflet .leaflet-pane,
        #dispatch-leaflet .leaflet-top,
        #dispatch-leaflet .leaflet-bottom { z-index: 1 !important; }
        .crime-marker { background:transparent !important; border:0 !important; }
        .crime-marker .pin { display:inline-flex; align-items:center; justify-content:center; min-width:28px; height:22px; padding:2px 6px; color:#fff; font-weight:800; font-size:11px; border-radius:6px; border:2px solid #fff; box-shadow:0 6px 14px rgba(0,0,0,.28); }
        .crime-marker .pin:hover { transform: translateY(-2px); }
        .leaflet-container { font-family: inherit; }
        #incident-modal { transition: opacity .25s ease; opacity: 0; }
        #incident-modal[data-open] { opacity: 1; }
        #incident-modal[data-open] .modal-panel { transform: translateX(0); }
        .modal-panel { transform: translateX(100%); transition: transform .45s cubic-bezier(.16,1,.3,1); }
    </style>
</head>
<body class="font-sans">

{{-- =======================================================================
     NAV
========================================================================--}}
<header data-nav style="background-color:#FB0606" class="fixed inset-x-0 top-0 z-50 text-white">
    <nav class="mx-auto flex h-[78px] max-w-7xl items-center px-5 sm:px-8">
        <div class="flex-1 flex items-center">
            <a href="#top" class="flex items-center gap-3 group">
                <span class="grid place-items-center h-11 w-11 rounded-md bg-white shadow-sm transition-transform group-hover:rotate-[-4deg]">
                    <img src="/images/auxilio-shield.png" alt="" class="h-9 w-auto" />
                </span>
                <img src="/images/auxilio-logo-white.png" alt="Auxilio" class="h-5 sm:h-6 w-auto" />
            </a>
        </div>

        <ul class="hidden md:flex items-center gap-6 lg:gap-7 text-sm font-medium text-white/90 shrink-0 whitespace-nowrap">
            <li><a data-route href="#/"                 class="nav-link hover:text-white transition">Home</a></li>
            <li><a data-route href="#/crime-map"        class="nav-link hover:text-white transition">Crime Map</a></li>
            <li><a data-route href="#/sex-offender-map" class="nav-link hover:text-white transition">Sex Offender Map</a></li>
            <li><a data-route href="#/how-it-works"     class="nav-link hover:text-white transition">How it works</a></li>
            <li><a data-route href="#/agent-app"        class="nav-link hover:text-white transition">Agent App</a></li>
            <li><a data-route href="#/citizen-app"      class="nav-link hover:text-white transition">Citizen App</a></li>
            <li><a data-route href="#/about"            class="nav-link hover:text-white transition">About us</a></li>
            <li><a data-route href="#/contact"          class="nav-link hover:text-white transition">Contact us</a></li>
        </ul>

        <div class="flex-1 flex items-center justify-end">
            <button data-menu-btn aria-expanded="false" aria-controls="mobile-menu" class="md:hidden relative w-10 h-10 grid place-items-center rounded-lg hover:bg-white/10 transition">
                <span class="sr-only">Toggle menu</span>
                <svg class="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M4 7h16M4 12h16M4 17h16" /></svg>
            </button>
        </div>
    </nav>

    <div id="mobile-menu" data-menu-panel class="md:hidden absolute inset-x-4 top-[72px] rounded-md bg-white border border-ink-100 shadow-xl p-6">
        <ul class="flex flex-col gap-4 text-base font-medium text-navy-800">
            <li><a data-route href="#/">Home</a></li>
            <li><a data-route href="#/crime-map">Crime Map</a></li>
            <li><a data-route href="#/sex-offender-map">Sex Offender Map</a></li>
            <li><a data-route href="#/how-it-works">How it works</a></li>
            <li><a data-route href="#/agent-app">Agent App</a></li>
            <li><a data-route href="#/citizen-app">Citizen App</a></li>
            <li><a data-route href="#/about">About us</a></li>
            <li><a data-route href="#/contact">Contact us</a></li>
        </ul>
    </div>
</header>

<main id="top" class="pt-[78px]">

{{-- ============================================================
     HOME VIEW — Nexagent-inspired (dark hero + multi-section)
============================================================--}}
<div data-view="home">

@php
    // Shared SVG path data — referenced by Solution, Features, Why-Choose, and Security sections.
    $icons = [
        'map'      => '<path stroke-linecap="round" stroke-linejoin="round" d="M9 6l-6 2v12l6-2 6 2 6-2V6l-6 2-6-2zM9 6v12m6-10v12"/>',
        'shield'   => '<path stroke-linecap="round" stroke-linejoin="round" d="M12 3l8 4v5c0 5-3.5 8.5-8 9-4.5-.5-8-4-8-9V7l8-4z"/><path stroke-linecap="round" stroke-linejoin="round" d="M9.5 12l2 2 3.5-4"/>',
        'bell'     => '<path stroke-linecap="round" stroke-linejoin="round" d="M15 17h5l-1.4-1.4A2 2 0 0118 14V11a6 6 0 10-12 0v3a2 2 0 01-.6 1.6L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"/>',
        'sos'      => '<circle cx="12" cy="12" r="9"/><path stroke-linecap="round" stroke-linejoin="round" d="M9 9l6 6m0-6l-6 6"/>',
        'feed'     => '<path stroke-linecap="round" stroke-linejoin="round" d="M4 4h16v4H4zM4 12h10v4H4zM4 20h7"/>',
        'location' => '<path stroke-linecap="round" stroke-linejoin="round" d="M12 22s8-7.5 8-13a8 8 0 10-16 0c0 5.5 8 13 8 13z"/><circle cx="12" cy="9" r="2.5"/>',
        'sketch'   => '<path stroke-linecap="round" stroke-linejoin="round" d="M4 20l4-1 11-11-3-3L5 16l-1 4z"/><path stroke-linecap="round" stroke-linejoin="round" d="M14 6l3 3"/>',
        'progress' => '<path stroke-linecap="round" stroke-linejoin="round" d="M21 12a9 9 0 11-9-9"/><path stroke-linecap="round" stroke-linejoin="round" d="M12 7v5l3 2"/>',
        'people'   => '<path stroke-linecap="round" stroke-linejoin="round" d="M16 11a4 4 0 10-8 0 4 4 0 008 0zM3 21a7 7 0 0118 0"/>',
    ];
@endphp

{{-- =======================================================================
     HERO — Nexagent-inspired LIGHT split (text left, dotted map + role tags right)
========================================================================--}}
<section class="relative overflow-hidden" style="background: linear-gradient(135deg, #f4f6fb 0%, #e9edf3 40%, #f1f3f7 70%, #f6f7fa 100%);">
    {{-- ambient soft glow blobs --}}
    <div class="pointer-events-none absolute inset-0 -z-0 overflow-hidden">
        <div class="absolute -top-40 -left-40 w-[640px] h-[640px] rounded-full blur-3xl opacity-60" style="background: radial-gradient(circle, rgba(26,37,72,.14) 0%, transparent 65%);"></div>
        <div class="absolute -bottom-40 -right-20 w-[600px] h-[600px] rounded-full blur-3xl opacity-60" style="background: radial-gradient(circle, rgba(251,6,6,.10) 0%, transparent 65%);"></div>
    </div>

    <div class="relative mx-auto max-w-7xl px-5 sm:px-8 pt-16 sm:pt-24 lg:pt-32 pb-20 sm:pb-28 lg:pb-36 grid lg:grid-cols-12 gap-10 lg:gap-16 items-center min-h-[88vh]">

        {{-- LEFT: copy + CTAs --}}
        <div class="lg:col-span-6">
            <p class="reveal inline-flex items-center gap-2 text-sm font-medium text-navy-900/70">
                <svg class="w-4 h-4" style="color:#FB0606;" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><path stroke-linecap="round" stroke-linejoin="round" d="M9 6v8a4 4 0 004 4h8m0 0l-4-4m4 4l-4 4"/></svg>
                World&rsquo;s 1<sup class="text-[0.65em] align-super">st</sup> personal safety platform.
            </p>

            <h1 class="reveal reveal-delay-1 mt-5 font-display font-extrabold tracking-tight text-navy-950 text-[46px] sm:text-6xl lg:text-[80px] leading-[1.02]">
                One Tap,<br/>
                <span style="color:#FB0606;">Total Safety</span>
            </h1>

            <p class="reveal reveal-delay-2 mt-6 max-w-xl text-base sm:text-lg text-navy-900/65 leading-relaxed">
                Your pocket-sized panic button, neighborhood watch and verified responder network — all in one. Built for families that refuse to wait for the news.
            </p>

            <div class="reveal reveal-delay-3 mt-9 flex items-center gap-4">
                <a href="#download" class="group relative inline-flex items-center justify-center rounded-xl text-white px-7 py-3.5 text-[15px] font-semibold shadow-[0_18px_38px_-12px_rgba(251,6,6,.55)] hover:-translate-y-0.5 transition" style="background:linear-gradient(135deg,#FB0606 0%,#c8202f 100%);">
                    Get Auxilio
                    <span class="pointer-events-none absolute -inset-px rounded-xl opacity-50 blur-md -z-10" style="background:#FB0606;"></span>
                </a>
                <a data-route href="#/how-it-works" class="group inline-flex items-center gap-1.5 text-[15px] font-semibold text-navy-950 hover:text-brand-600 transition">
                    Talk to Dispatch
                    <svg class="w-4 h-4 transition-transform group-hover:translate-x-0.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4"><path stroke-linecap="round" stroke-linejoin="round" d="M9 6l6 6-6 6"/></svg>
                </a>
            </div>
        </div>

        {{-- RIGHT: dotted world map with role cards positioned on continents --}}
        <div class="lg:col-span-6 relative">
            <div class="reveal reveal-right relative w-full max-w-[720px] mx-auto" style="aspect-ratio: 1.55 / 1;">

                {{-- ambient glow halo --}}
                <div class="absolute inset-0 -z-10 blur-3xl opacity-70" style="background:radial-gradient(ellipse at center, rgba(251,6,6,.14) 0%, rgba(26,37,72,.10) 45%, transparent 75%);"></div>

                {{-- DOTTED WORLD MAP --}}
                <div class="world-dotmap absolute inset-0" aria-hidden="true" style="background-size: 9px 9px;"></div>

                @php
                    // top/left % positioned to land on visible continents
                    $nodes = [
                        ['top'=>'34%','left'=>'18%','label'=>'Police Officer',   'icon'=>'M12 2l8 4v6c0 5-3.5 9-8 10-4.5-1-8-5-8-10V6l8-4z'],
                        ['top'=>'18%','left'=>'48%','label'=>'911 Dispatch',     'icon'=>'M15 17h5l-1.4-1.4A2 2 0 0118 14V11a6 6 0 10-12 0v3a2 2 0 01-.6 1.6L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9'],
                        ['top'=>'30%','left'=>'80%','label'=>'First Responder',  'icon'=>'M13 2L3 14h7l-1 8 10-12h-7l1-8z'],
                        ['top'=>'62%','left'=>'82%','label'=>'Super Agent',      'icon'=>'M16 11a4 4 0 10-8 0 4 4 0 008 0zM3 21a7 7 0 0118 0'],
                        ['top'=>'82%','left'=>'52%','label'=>'Trusted Contact',  'icon'=>'M21 12c0 4.418-4.03 8-9 8a9.86 9.86 0 01-4-.8L3 20l1.4-3.7A8.99 8.99 0 013 12c0-4.418 4.03-8 9-8s9 3.582 9 8z'],
                        ['top'=>'66%','left'=>'12%','label'=>'EMT',              'icon'=>'M5 13l4 4L19 7'],
                    ];
                @endphp

                {{-- Center Auxilio hub (flat, sits over the map) --}}
                <div class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20">
                    <div class="relative grid place-items-center w-16 h-16 rounded-full border-2 border-white shadow-[0_20px_40px_-12px_rgba(251,6,6,.5)]" style="background:linear-gradient(135deg,#fff 0%,#fef2f3 100%);">
                        <svg class="w-7 h-7" style="color:#FB0606;" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M12 2l8 4v6c0 5-3.5 9-8 10-4.5-1-8-5-8-10V6l8-4z"/>
                        </svg>
                        <span class="absolute inset-0 rounded-full map-pin" aria-hidden="true"></span>
                    </div>
                </div>

                {{-- Role node cards on continents --}}
                @foreach ($nodes as $i => $n)
                    <div class="absolute z-10 -translate-x-1/2 -translate-y-1/2 orbit-node" style="top:{{ $n['top'] }}; left:{{ $n['left'] }}; animation-delay:{{ $i * 0.5 }}s;">
                        <div class="orbit-node-card">
                            <span class="grid place-items-center shrink-0 w-8 h-8 rounded-lg text-white" style="background:linear-gradient(135deg,#FB0606,#c8202f);">
                                <svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="{{ $n['icon'] }}"/></svg>
                            </span>
                            <span class="text-xs font-bold text-navy-950">{{ $n['label'] }}</span>
                            <span class="relative inline-flex w-1.5 h-1.5 ml-1">
                                <span class="absolute inline-flex w-1.5 h-1.5 rounded-full opacity-75 animate-ping" style="background:#FB0606;"></span>
                                <span class="relative inline-flex w-1.5 h-1.5 rounded-full" style="background:#FB0606;"></span>
                            </span>
                        </div>
                    </div>
                @endforeach
            </div>
        </div>
    </div>
</section>

{{-- =======================================================================
     POLICE BADGE MARQUEE — moving bar of US PD insignia under hero
========================================================================--}}
<section class="relative bg-white border-y border-ink-100 py-12 overflow-hidden">
    <p class="text-center text-sm font-medium text-navy-900/65">
        Trusted alongside <span class="font-semibold" style="color:#FB0606;">law enforcement &amp; first responders</span> nationwide.
    </p>

    <div class="mt-8 relative">
        {{-- fade edges --}}
        <div class="pointer-events-none absolute inset-y-0 left-0 w-24 z-10" style="background:linear-gradient(90deg,#fff 10%,rgba(255,255,255,0));"></div>
        <div class="pointer-events-none absolute inset-y-0 right-0 w-24 z-10" style="background:linear-gradient(-90deg,#fff 10%,rgba(255,255,255,0));"></div>

        <div class="flex items-center gap-14 badge-marquee whitespace-nowrap">
            @php
                // Stylized US police agency badges — circular shield with department initials.
                // Real PD logos are licensed; these are designed insignia placeholders.
                $depts = [
                    ['name'=>'NYPD',       'sub'=>'New York City',  'color'=>'#1a3a8a'],
                    ['name'=>'LAPD',       'sub'=>'Los Angeles',    'color'=>'#0f3d6e'],
                    ['name'=>'CPD',        'sub'=>'Chicago',        'color'=>'#1e3a8a'],
                    ['name'=>'HPD',        'sub'=>'Houston',        'color'=>'#1a2548'],
                    ['name'=>'PPD',        'sub'=>'Philadelphia',   'color'=>'#0c4a6e'],
                    ['name'=>'PhxPD',      'sub'=>'Phoenix',        'color'=>'#7c2d12'],
                    ['name'=>'SAPD',       'sub'=>'San Antonio',    'color'=>'#14532d'],
                    ['name'=>'SDPD',       'sub'=>'San Diego',      'color'=>'#1e3a8a'],
                    ['name'=>'DPD',        'sub'=>'Dallas',         'color'=>'#1a2548'],
                    ['name'=>'BPD',        'sub'=>'Boston',         'color'=>'#0c4a6e'],
                    ['name'=>'NPD',        'sub'=>'Newark',         'color'=>'#FB0606'],
                    ['name'=>'NJSP',       'sub'=>'NJ State Police','color'=>'#1a2548'],
                    ['name'=>'FBI',        'sub'=>'Federal Bureau', 'color'=>'#0c1126'],
                    ['name'=>'USMS',       'sub'=>'US Marshals',    'color'=>'#1a3a8a'],
                    ['name'=>'CHP',        'sub'=>'California HP',  'color'=>'#7c2d12'],
                ];
                $depts = array_merge($depts, $depts);
            @endphp
            @foreach ($depts as $d)
                <div class="inline-flex items-center gap-3 shrink-0 grayscale hover:grayscale-0 transition opacity-80 hover:opacity-100">
                    {{-- badge SVG: police shield/star --}}
                    <span class="relative grid place-items-center w-12 h-12 shrink-0">
                        <svg viewBox="0 0 64 64" class="absolute inset-0 w-full h-full">
                            {{-- outer star (7-point) --}}
                            <path fill="{{ $d['color'] }}" d="M32 2 L37 14 L50 12 L46 25 L58 30 L46 37 L50 50 L37 48 L32 62 L27 48 L14 50 L18 37 L6 30 L18 25 L14 12 L27 14 Z" stroke="#fff" stroke-width="1.4"/>
                            {{-- inner shield --}}
                            <path fill="#fff" d="M32 16 L44 21 V32 C44 39 38 44 32 46 C26 44 20 39 20 32 V21 Z"/>
                            {{-- inner mark --}}
                            <path fill="{{ $d['color'] }}" d="M32 22 L40 26 V32 C40 36 36 40 32 41 C28 40 24 36 24 32 V26 Z"/>
                            {{-- center star --}}
                            <path fill="#fff" d="M32 27 L33.2 30 L36.4 30 L33.8 32 L34.8 35 L32 33.2 L29.2 35 L30.2 32 L27.6 30 L30.8 30 Z"/>
                        </svg>
                    </span>
                    <div class="flex flex-col">
                        <span class="font-display font-extrabold text-lg tracking-tight leading-none" style="color:{{ $d['color'] }};">{{ $d['name'] }}</span>
                        <span class="mt-1 text-[10px] uppercase tracking-[.18em] font-semibold text-ink-500">{{ $d['sub'] }}</span>
                    </div>
                </div>
            @endforeach
        </div>
    </div>
</section>

{{-- =======================================================================
     MISSION / ABOUT — 2-col copy + portrait grid
========================================================================--}}
<section class="relative py-24 lg:py-32 bg-white">
    <div class="mx-auto max-w-7xl px-5 sm:px-8 grid lg:grid-cols-12 gap-12 items-center">
        <div class="lg:col-span-6">
            <p class="reveal text-xs font-semibold uppercase tracking-[.2em] text-brand-600">About Auxilio</p>
            <h2 class="reveal reveal-delay-1 mt-4 font-display font-extrabold text-4xl sm:text-5xl lg:text-[56px] leading-[1.05] tracking-tight text-navy-900">
                We turn safety information into <span class="text-brand-600">decisive action.</span>
            </h2>
            <p class="reveal reveal-delay-2 mt-6 text-lg text-navy-700/80 leading-relaxed">
                Auxilio is the personal safety layer your phone has been missing. We unify live crime data, public registries, verified responders, and a one-tap Alert into a single experience — so families never have to refresh the news to know whether to keep the kids inside.
            </p>
            <div class="reveal reveal-delay-3 mt-8 grid grid-cols-2 gap-x-8 gap-y-5">
                <div class="flex items-start gap-3">
                    <span class="grid place-items-center shrink-0 w-9 h-9 rounded-md text-white" style="background:#1a2548;">
                        <svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7"/></svg>
                    </span>
                    <div>
                        <p class="text-sm font-semibold text-navy-900">Privacy-first by design</p>
                        <p class="text-sm text-ink-500 leading-relaxed">Your location stays with the people you authorize. Period.</p>
                    </div>
                </div>
                <div class="flex items-start gap-3">
                    <span class="grid place-items-center shrink-0 w-9 h-9 rounded-md text-white" style="background:#1a2548;">
                        <svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7"/></svg>
                    </span>
                    <div>
                        <p class="text-sm font-semibold text-navy-900">Verified responder network</p>
                        <p class="text-sm text-ink-500 leading-relaxed">Every Super Agent is background-checked &amp; trained.</p>
                    </div>
                </div>
                <div class="flex items-start gap-3">
                    <span class="grid place-items-center shrink-0 w-9 h-9 rounded-md text-white" style="background:#1a2548;">
                        <svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7"/></svg>
                    </span>
                    <div>
                        <p class="text-sm font-semibold text-navy-900">Always-on registries</p>
                        <p class="text-sm text-ink-500 leading-relaxed">Auto-refreshed offender data — no manual lookups.</p>
                    </div>
                </div>
                <div class="flex items-start gap-3">
                    <span class="grid place-items-center shrink-0 w-9 h-9 rounded-md text-white" style="background:#1a2548;">
                        <svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7"/></svg>
                    </span>
                    <div>
                        <p class="text-sm font-semibold text-navy-900">Built with families</p>
                        <p class="text-sm text-ink-500 leading-relaxed">Co-designed with parents, students, and neighborhoods.</p>
                    </div>
                </div>
            </div>
        </div>

        <div class="lg:col-span-6">
            <div class="reveal reveal-right grid grid-cols-2 gap-4">
                @php
                    $scenes = [
                        ['src'=>'/images/about/robbery.jpg',  'tag'=>'Robbery',          'meta'=>'Alert dispatched · 0:18s'],
                        ['src'=>'/images/about/break-in.jpg', 'tag'=>'Vehicle Break-in', 'meta'=>'Agent en-route · ETA 4m'],
                        ['src'=>'/images/about/roadside.jpg', 'tag'=>'Roadside Help',    'meta'=>'Verified responder · cleared'],
                        ['src'=>'/images/about/accident.jpg', 'tag'=>'Collision',       'meta'=>'EMT + PD notified · 0:09s'],
                    ];
                @endphp
                @foreach ($scenes as $i => $s)
                    <div class="group relative aspect-square rounded-2xl overflow-hidden shadow-xl {{ $i % 2 ? 'mt-10' : '' }}">
                        <img src="{{ $s['src'] }}" alt="{{ $s['tag'] }}" loading="lazy" class="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                        <div class="absolute inset-0 bg-gradient-to-t from-navy-950/85 via-navy-950/15 to-transparent"></div>
                        <span class="absolute top-3 left-3 inline-flex items-center gap-1.5 rounded-full text-white px-2.5 py-1 text-[10px] font-bold tracking-wider uppercase shadow-md" style="background:#FB0606;">
                            <span class="relative inline-flex w-1.5 h-1.5 rounded-full bg-white"></span>
                            {{ $s['tag'] }}
                        </span>
                        <div class="absolute bottom-3 left-3 right-3">
                            <p class="text-[11px] font-semibold uppercase tracking-[.14em] text-white/70">Auxilio resolved</p>
                            <p class="mt-0.5 text-sm font-bold text-white truncate">{{ $s['meta'] }}</p>
                        </div>
                    </div>
                @endforeach
            </div>
        </div>
    </div>
</section>

{{-- =======================================================================
     SOLUTION — 3-col on dark
========================================================================--}}
<section class="relative py-24 lg:py-32 overflow-hidden" style="background:#0c1126;">
    <div class="pointer-events-none absolute inset-0 -z-0 opacity-40">
        <div class="absolute -top-40 right-0 w-[600px] h-[600px] rounded-full blur-3xl" style="background:radial-gradient(circle,rgba(251,6,6,.30) 0%,transparent 65%);"></div>
        <div class="absolute -bottom-40 left-0 w-[500px] h-[500px] rounded-full blur-3xl" style="background:radial-gradient(circle,rgba(244,196,65,.18) 0%,transparent 65%);"></div>
    </div>
    <div class="relative mx-auto max-w-7xl px-5 sm:px-8">
        <div class="max-w-3xl">
            <p class="reveal text-xs font-semibold uppercase tracking-[.2em]" style="color:#f4c441;">The solution</p>
            <h2 class="reveal reveal-delay-1 mt-4 font-display font-extrabold text-4xl sm:text-5xl lg:text-[56px] leading-[1.05] tracking-tight text-white">
                Personal safety, <span style="background:linear-gradient(90deg,#FB0606,#f4c441); -webkit-background-clip:text; background-clip:text; color:transparent;">redefined.</span>
            </h2>
            <p class="reveal reveal-delay-2 mt-5 text-lg text-white/65 leading-relaxed">
                Three pillars. One pocket-sized companion. Auxilio replaces the patchwork of news apps, registries, and group-texts with a single coordinated response system.
            </p>
        </div>

        @php
            $solutions = [
                ['title'=>'End-to-end Alert','body'=>'One tap routes your location, identity, and situation to verified responders and trusted contacts simultaneously — no menus, no panic-typing.','icon'=>'sos','accent'=>'#FB0606'],
                ['title'=>'Intelligent screening','body'=>'Live crime maps and registry overlays filter the noise so you see only what matters within your geofence — color-coded, time-sorted, actionable.','icon'=>'shield','accent'=>'#FB0606'],
                ['title'=>'Data-driven decisions','body'=>'Case progress, agent ETAs, and resolution metrics — every interaction adds to a transparent record you can trust over time.','icon'=>'progress','accent'=>'#FB0606'],
            ];
        @endphp
        <div class="mt-14 stagger grid md:grid-cols-3 gap-5">
            @foreach ($solutions as $s)
                <article class="group relative rounded-2xl border border-white/10 p-8 transition hover:-translate-y-1" style="background:linear-gradient(180deg,rgba(255,255,255,.04) 0%,rgba(255,255,255,.01) 100%);">
                    <span class="grid place-items-center w-12 h-12 rounded-md" style="background:rgba(255,255,255,.06); color:{{ $s['accent'] }};">
                        <svg class="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8">
                            {!! $icons[$s['icon']] !!}
                        </svg>
                    </span>
                    <h3 class="mt-6 text-xl font-bold text-white">{{ $s['title'] }}</h3>
                    <p class="mt-2.5 text-white/60 leading-relaxed text-[15px]">{{ $s['body'] }}</p>
                    <a href="#download" class="mt-6 inline-flex items-center gap-1.5 text-sm font-semibold text-white hover:text-white transition">
                        Download Auxilio
                        <svg class="w-4 h-4 transition-transform group-hover:translate-x-0.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M5 12h14m0 0l-6-6m6 6l-6 6"/></svg>
                    </a>
                </article>
            @endforeach
        </div>
    </div>
</section>

{{-- =======================================================================
     FEATURES — Efficiency-Metrics card style: 4 big metric cards w/ AI hover
========================================================================--}}
<section id="features" class="relative py-24 lg:py-32 bg-white overflow-hidden">
    {{-- subtle ambient AI grid background --}}
    <div class="pointer-events-none absolute inset-0 opacity-[0.04]" style="background-image: linear-gradient(#0c1126 1px, transparent 1px), linear-gradient(90deg, #0c1126 1px, transparent 1px); background-size: 64px 64px; mask-image: radial-gradient(ellipse at center, #000 0%, transparent 75%);"></div>

    <div class="relative mx-auto max-w-7xl px-5 sm:px-8">
        <div class="max-w-3xl mx-auto text-center">
            <p class="reveal inline-flex items-center gap-2 text-sm font-medium text-navy-900/70">
                <span class="grid place-items-center w-5 h-5 rounded-full" style="background:#FB0606;">
                    <svg class="w-3 h-3 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4"><path stroke-linecap="round" stroke-linejoin="round" d="M12 3v3m0 12v3M3 12h3m12 0h3M5.6 5.6l2.1 2.1m8.6 8.6l2.1 2.1M5.6 18.4l2.1-2.1m8.6-8.6l2.1-2.1"/></svg>
                </span>
                Auxilio AI · Safety Metrics
            </p>
            <h2 class="reveal reveal-delay-1 mt-4 font-display font-extrabold text-4xl sm:text-5xl lg:text-[64px] leading-[1.02] tracking-tight text-navy-950">
                Efficiency Metrics
            </h2>
            <p class="reveal reveal-delay-2 mt-5 text-lg text-navy-900/65 leading-relaxed">
                At Auxilio, we harness real-time intelligence and verified responders to redefine personal safety.
            </p>
        </div>

        @php
            $metrics = [
                [
                    'big'    => '30s',
                    'label'  => 'Avg Alert Time',
                    'body'   => 'From incident to verified responder lock screen in under thirty seconds.',
                    'bg'     => '#fdf6d8',  // pastel yellow
                    'fg'     => '#FB0606',
                    'glyph'  => 'M13 2L3 14h7l-1 8 10-12h-7l1-8z',
                    'count'  => 'seconds',
                    'target' => 30,
                ],
                [
                    'big'    => '24/7',
                    'label'  => 'Verified Agents',
                    'body'   => 'Background-checked Super Agents on standby, ready to respond on your behalf.',
                    'bg'     => '#eef1f6',  // pastel gray
                    'fg'     => '#FB0606',
                    'glyph'  => 'M12 2l8 4v6c0 5-3.5 9-8 10-4.5-1-8-5-8-10V6l8-4z',
                    'count'  => 'schedule',
                    'target' => 24,
                ],
                [
                    'big'    => '1M+',
                    'label'  => 'Crimes Mapped',
                    'body'   => 'A live, AI-classified crime feed across 40+ states — refreshed as events come in.',
                    'bg'     => '#e7eeff',  // pastel blue
                    'fg'     => '#FB0606',
                    'glyph'  => 'M12 22s8-7.5 8-13a8 8 0 10-16 0c0 5.5 8 13 8 13z',
                    'count'  => 'millions',
                    'target' => 1000000,
                ],
                [
                    'big'    => '100%',
                    'label'  => 'Privacy by Design',
                    'body'   => 'End-to-end encrypted location sharing — opt-in, revocable, and never sold.',
                    'bg'     => '#f1f1f3',  // pastel neutral
                    'fg'     => '#FB0606',
                    'glyph'  => 'M6 10V8a6 6 0 1112 0v2M5 10h14v10H5z',
                    'count'  => 'percent',
                    'target' => 100,
                ],
            ];
        @endphp

        <div class="mt-14 stagger grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            @foreach ($metrics as $m)
                <article class="metric-card group relative rounded-3xl p-7 lg:p-8 overflow-hidden transition-all duration-500 hover:-translate-y-1.5 hover:shadow-[0_28px_60px_-18px_rgba(12,17,38,.22)]" style="background:{{ $m['bg'] }}; min-height:380px;">

                    {{-- AI sparkle — appears on hover --}}
                    <span class="absolute top-5 right-5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" aria-hidden="true">
                        <svg class="w-5 h-5 metric-sparkle" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" style="color:{{ $m['fg'] }};">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M12 3v4M12 17v4M3 12h4M17 12h4M5.6 5.6l2.8 2.8M15.6 15.6l2.8 2.8M5.6 18.4l2.8-2.8M15.6 8.4l2.8-2.8"/>
                        </svg>
                    </span>

                    {{-- soft hover glow --}}
                    <span class="pointer-events-none absolute -inset-12 rounded-full blur-3xl opacity-0 group-hover:opacity-60 transition-opacity duration-700" style="background:radial-gradient(circle, {{ $m['fg'] }}22 0%, transparent 60%);"></span>

                    <div class="relative h-full flex flex-col">
                        {{-- Big number — count-up on scroll into view --}}
                        <p class="font-display font-extrabold text-6xl lg:text-7xl tracking-tight leading-none transition-transform duration-500 group-hover:scale-[1.04] origin-left" style="color:{{ $m['fg'] }};" data-counter data-counter-format="{{ $m['count'] }}" data-counter-to="{{ $m['target'] }}" data-counter-final="{{ $m['big'] }}">
                            {{ $m['big'] }}
                        </p>
                        {{-- Label --}}
                        <h3 class="mt-3 font-display font-bold text-lg lg:text-xl tracking-tight text-navy-950">
                            {{ $m['label'] }}
                        </h3>

                        {{-- pulsing data line, AI feel --}}
                        <div class="mt-4 relative h-0.5 w-12 rounded-full overflow-hidden" style="background:rgba(12,17,38,.10);">
                            <span class="absolute inset-y-0 left-0 w-1/2 metric-pulse-line" style="background:{{ $m['fg'] }};"></span>
                        </div>

                        {{-- spacer --}}
                        <div class="flex-1"></div>

                        {{-- Description (bottom) --}}
                        <p class="mt-6 text-sm text-navy-900/65 leading-relaxed">
                            {{ $m['body'] }}
                        </p>

                        {{-- inline glyph that slides in on hover --}}
                        <div class="mt-5 flex items-center gap-2 text-xs font-semibold uppercase tracking-[.18em] opacity-60 group-hover:opacity-100 transition-all duration-500" style="color:{{ $m['fg'] }};">
                            <svg class="w-4 h-4 transition-transform duration-500 group-hover:rotate-[12deg]" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="{{ $m['glyph'] }}"/></svg>
                            <span class="transition-transform duration-500 group-hover:translate-x-1">Learn more</span>
                            <svg class="w-3.5 h-3.5 -ml-0.5 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4"><path stroke-linecap="round" stroke-linejoin="round" d="M5 12h14m0 0l-6-6m6 6l-6 6"/></svg>
                        </div>
                    </div>
                </article>
            @endforeach
        </div>
    </div>
</section>

{{-- =======================================================================
     PEOPLE SAFETY AI — How Auxilio AI solves crime & emergencies
========================================================================--}}
<section class="relative py-24 lg:py-32 bg-white overflow-hidden">
    <div class="pointer-events-none absolute inset-0 ai-grid-bg opacity-60"></div>

    <div class="relative mx-auto max-w-7xl px-5 sm:px-8 grid lg:grid-cols-12 gap-12 lg:gap-16 items-center">

        {{-- LEFT: copy --}}
        <div class="lg:col-span-5">
            <p class="reveal inline-flex items-center gap-2 text-sm font-medium text-navy-900/70">
                <span class="grid place-items-center w-5 h-5 rounded-full" style="background:#FB0606;">
                    <svg class="w-3 h-3 text-white" viewBox="0 0 24 24" fill="currentColor"><circle cx="12" cy="12" r="6"/></svg>
                </span>
                AI for People Safety
            </p>

            <h2 class="reveal reveal-delay-1 mt-4 font-display font-extrabold text-4xl sm:text-5xl lg:text-[56px] leading-[1.04] tracking-tight text-navy-950">
                Crime &amp; emergencies, <span style="color:#FB0606;">solved in real time.</span>
            </h2>

            <p class="reveal reveal-delay-2 mt-6 text-lg text-navy-900/65 leading-relaxed">
                Auxilio AI listens to live signals across your city — incident reports, registry updates, agent locations, panic Alerts — and stitches them into a single response in under thirty seconds. No more refreshing the news. No more guessing whether help is coming.
            </p>

            @php
                $aiSteps = [
                    ['n'=>'01','t'=>'Detect','d'=>'AI ingests reports, sensor data, and Alerts the moment they happen.'],
                    ['n'=>'02','t'=>'Classify','d'=>'Severity, category, and risk-zone are scored automatically — no triage delay.'],
                    ['n'=>'03','t'=>'Dispatch','d'=>'The closest verified Super Agent or 911 link is routed instantly.'],
                ];
            @endphp
            <ul class="reveal reveal-delay-3 mt-8 space-y-4">
                @foreach ($aiSteps as $step)
                    <li class="flex items-start gap-4">
                        <span class="grid place-items-center shrink-0 w-10 h-10 rounded-full text-xs font-bold text-white shadow-[0_8px_18px_-6px_rgba(251,6,6,.5)]" style="background:linear-gradient(135deg,#FB0606,#c8202f);">{{ $step['n'] }}</span>
                        <div class="pt-0.5">
                            <p class="font-display font-bold text-base text-navy-950">{{ $step['t'] }}</p>
                            <p class="mt-0.5 text-sm text-navy-900/65 leading-relaxed">{{ $step['d'] }}</p>
                        </div>
                    </li>
                @endforeach
            </ul>

            <a href="#download" class="reveal reveal-delay-4 mt-9 inline-flex items-center gap-2 rounded-xl text-white px-6 py-3 text-sm font-semibold shadow-[0_18px_38px_-12px_rgba(251,6,6,.5)] hover:-translate-y-0.5 transition" style="background:linear-gradient(135deg,#FB0606,#c8202f);">
                See it in action
                <svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4"><path stroke-linecap="round" stroke-linejoin="round" d="M5 12h14m0 0l-6-6m6 6l-6 6"/></svg>
            </a>
        </div>

        {{-- RIGHT: animated AI dashboard --}}
        <div class="lg:col-span-7 relative">
            <div class="reveal reveal-right relative rounded-3xl p-6 lg:p-8 shadow-[0_50px_120px_-40px_rgba(12,17,38,.35)] border border-ink-100 overflow-hidden" style="background:linear-gradient(180deg,#fafbff 0%,#ffffff 60%);">

                {{-- floating AI Powered chip — highlighted with white ring + glow halo --}}
                <div class="absolute -top-5 right-6 lg:right-10 z-30">
                    {{-- pulsing glow halo behind chip --}}
                    <span class="ai-chip-halo absolute inset-0 rounded-full blur-xl -z-10" aria-hidden="true" style="background:#FB0606;"></span>
                    <div class="ai-chip-float relative inline-flex items-center gap-2 rounded-full text-white px-5 py-2.5 text-sm font-bold ring-4 ring-white shadow-[0_22px_40px_-10px_rgba(251,6,6,.75)]" style="background:linear-gradient(135deg,#FB0606,#c8202f);">
                        <svg class="w-4 h-4 metric-sparkle" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4"><path stroke-linecap="round" stroke-linejoin="round" d="M12 3v3m0 12v3M3 12h3m12 0h3M5.6 5.6l2.1 2.1m8.6 8.6l2.1 2.1M5.6 18.4l2.1-2.1m8.6-8.6l2.1-2.1"/></svg>
                        AI Powered
                        <span class="relative flex w-2 h-2" aria-hidden="true">
                            <span class="absolute inline-flex w-2 h-2 rounded-full bg-white opacity-70 animate-ping"></span>
                            <span class="relative inline-flex w-2 h-2 rounded-full bg-white"></span>
                        </span>
                    </div>
                </div>

                {{-- header strip --}}
                <div class="flex items-center justify-between">
                    <div class="flex items-center gap-2 text-xs font-semibold uppercase tracking-[.16em] text-navy-900/55">
                        <span class="relative flex w-2 h-2">
                            <span class="absolute inline-flex w-2 h-2 rounded-full opacity-75 animate-ping" style="background:#FB0606;"></span>
                            <span class="relative inline-flex w-2 h-2 rounded-full" style="background:#FB0606;"></span>
                        </span>
                        Live Incident Stream
                    </div>
                    <span class="text-[10px] font-mono text-navy-900/45">NEWARK · SECTOR 4</span>
                </div>

                {{-- two-card row --}}
                <div class="mt-5 grid grid-cols-2 gap-4">
                    {{-- card A: bar chart --}}
                    <div class="rounded-2xl p-5 border border-ink-100 shadow-sm" style="background:#fff;">
                        <div class="flex items-center justify-between">
                            <span class="grid place-items-center w-8 h-8 rounded-md" style="background:#fef2f3;">
                                <svg class="w-4 h-4" style="color:#FB0606;" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M4 19V9M10 19V5M16 19v-7M22 19v-3"/></svg>
                            </span>
                            <svg class="w-3.5 h-3.5 text-navy-900/35" viewBox="0 0 24 24" fill="currentColor"><circle cx="5" cy="12" r="1.5"/><circle cx="12" cy="12" r="1.5"/><circle cx="19" cy="12" r="1.5"/></svg>
                        </div>
                        <p class="mt-4 font-display font-extrabold text-2xl tracking-tight text-navy-950">1,284</p>
                        <p class="text-xs text-navy-900/55">Alerts processed today</p>
                        <div class="mt-4 flex items-end gap-1.5 h-16">
                            @php $heights = [0.4,0.7,0.55,0.85,0.65,0.92,0.75,0.6,1,0.78]; @endphp
                            @foreach ($heights as $i => $h)
                                <span class="ai-bar block flex-1 rounded-t" style="background:#FB0606; height:{{ $h * 100 }}%; animation-delay:{{ $i * 0.18 }}s;"></span>
                            @endforeach
                        </div>
                    </div>

                    {{-- card B: ring progress --}}
                    <div class="rounded-2xl p-5 border border-ink-100 shadow-sm" style="background:#fff;">
                        <div class="flex items-center justify-between">
                            <span class="grid place-items-center w-8 h-8 rounded-md" style="background:#fef9e7;">
                                <svg class="w-4 h-4" style="color:#FB0606;" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M12 2l8 4v6c0 5-3.5 9-8 10-4.5-1-8-5-8-10V6l8-4z"/></svg>
                            </span>
                            <svg class="w-3.5 h-3.5 text-navy-900/35" viewBox="0 0 24 24" fill="currentColor"><circle cx="5" cy="12" r="1.5"/><circle cx="12" cy="12" r="1.5"/><circle cx="19" cy="12" r="1.5"/></svg>
                        </div>
                        <p class="mt-4 font-display font-extrabold text-2xl tracking-tight text-navy-950">98%</p>
                        <p class="text-xs text-navy-900/55">Cases auto-classified</p>
                        <div class="mt-3 grid place-items-center">
                            <svg viewBox="0 0 80 80" class="w-20 h-20 -rotate-90">
                                <circle cx="40" cy="40" r="34" fill="none" stroke="#f1f1f3" stroke-width="6"/>
                                <circle class="ai-ring-spin" cx="40" cy="40" r="34" fill="none" stroke="#FB0606" stroke-width="6" stroke-linecap="round"/>
                            </svg>
                        </div>
                    </div>
                </div>

                {{-- live incident feed (cycling) --}}
                <div class="mt-5 rounded-2xl p-4 border border-ink-100" style="background:#fbfcff;">
                    <p class="text-[10px] uppercase tracking-[.18em] font-semibold text-navy-900/50">AI-classified incidents</p>
                    <div class="relative mt-3 h-12 overflow-hidden">
                        @php
                            $incidents = [
                                ['tag'=>'ROBBERY',  'msg'=>'AI flagged: armed robbery, 870 Broadway',   'dot'=>'#FB0606'],
                                ['tag'=>'DOMESTIC', 'msg'=>'AI flagged: domestic disturbance, Sector 4', 'dot'=>'#FB0606'],
                                ['tag'=>'COLLISION','msg'=>'AI flagged: vehicle collision, EMT routed', 'dot'=>'#FB0606'],
                                ['tag'=>'BREAK-IN', 'msg'=>'AI flagged: vehicle break-in, agent en-route','dot'=>'#FB0606'],
                            ];
                        @endphp
                        @foreach ($incidents as $i => $inc)
                            <div class="ai-incident absolute inset-0 flex items-center gap-3" style="animation-delay:{{ $i * 3 }}s;">
                                <span class="grid place-items-center w-8 h-8 rounded-md text-white text-[10px] font-bold uppercase tracking-wider shrink-0" style="background:{{ $inc['dot'] }};">
                                    <svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><path stroke-linecap="round" stroke-linejoin="round" d="M12 9v3m0 4h.01M5 19h14l-7-14z"/></svg>
                                </span>
                                <div class="flex-1 min-w-0">
                                    <p class="text-[11px] uppercase font-bold tracking-wider" style="color:{{ $inc['dot'] }};">{{ $inc['tag'] }}</p>
                                    <p class="text-sm font-semibold text-navy-950 truncate">{{ $inc['msg'] }}</p>
                                </div>
                                <svg class="w-4 h-4 text-navy-900/30 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M9 5l7 7-7 7"/></svg>
                            </div>
                        @endforeach
                    </div>
                </div>

                {{-- bottom trust strip --}}
                <div class="mt-5 flex items-center justify-between text-[11px] font-semibold uppercase tracking-[.14em] text-navy-900/55">
                    <span class="inline-flex items-center gap-1.5">
                        <svg class="w-3.5 h-3.5" style="color:#FB0606;" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4"><path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7"/></svg>
                        Verified by 911 Dispatch
                    </span>
                    <span class="font-mono normal-case tracking-normal text-navy-900/45">v2.4 · model: aux-resp-3</span>
                </div>
            </div>
        </div>
    </div>
</section>

{{-- =======================================================================
     WHY CHOOSE — 4-col cards on light
========================================================================--}}
<section class="relative py-24 lg:py-32 overflow-hidden bg-white">
    <div class="pointer-events-none absolute inset-0 -z-0 opacity-50">
        <div class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1100px] h-[600px] rounded-full blur-3xl" style="background:radial-gradient(ellipse,rgba(251,6,6,.10) 0%,transparent 60%);"></div>
    </div>
    <div class="relative mx-auto max-w-7xl px-5 sm:px-8">
        <div class="max-w-3xl">
            <p class="reveal text-xs font-semibold uppercase tracking-[.2em]" style="color:#FB0606;">Why choose Auxilio?</p>
            <h2 class="reveal reveal-delay-1 mt-4 font-display font-extrabold text-4xl sm:text-5xl lg:text-[56px] leading-[1.05] tracking-tight text-navy-950">
                A safety stack designed to <span style="color:#FB0606;">act,</span> not just inform.
            </h2>
        </div>

        @php
            $whys = [
                ['title'=>'Real-time, not next-day','body'=>'Sub-30-second alerting from incident to your lock screen — beating local news by minutes.','icon'=>'bell'],
                ['title'=>'Verified network','body'=>'Every responder, agent, and registry update is verified — no anonymous &ldquo;tips&rdquo; clogging the feed.','icon'=>'shield'],
                ['title'=>'Private by default','body'=>'You choose who sees you. End-to-end location encryption with explicit, revocable sharing.','icon'=>'location'],
                ['title'=>'Always on, always free','body'=>'Core safety features — alerts, panic button, registry — are free forever. No paywall on emergencies.','icon'=>'sos'],
            ];
        @endphp
        <div class="mt-14 stagger grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            @foreach ($whys as $w)
                <article class="group relative rounded-2xl border border-ink-100 bg-white p-7 transition hover:-translate-y-1 hover:shadow-[0_28px_60px_-18px_rgba(12,17,38,.18)]">
                    <span class="grid place-items-center w-12 h-12 rounded-md text-white" style="background:linear-gradient(135deg,#FB0606,#c8202f);">
                        <svg class="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8">
                            {!! $icons[$w['icon']] !!}
                        </svg>
                    </span>
                    <h3 class="mt-5 text-lg font-bold text-navy-950">{{ $w['title'] }}</h3>
                    <p class="mt-2 text-sm text-navy-900/65 leading-relaxed">{!! $w['body'] !!}</p>
                    <a href="#download" class="mt-5 inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-[.14em] transition" style="color:#FB0606;">
                        Talk to Auxilio
                        <svg class="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><path stroke-linecap="round" stroke-linejoin="round" d="M5 12h14m0 0l-6-6m6 6l-6 6"/></svg>
                    </a>
                </article>
            @endforeach
        </div>
    </div>
</section>

{{-- =======================================================================
     IMPACT METRICS — big numbers on dark
========================================================================--}}
<section id="walkthrough" class="relative py-24 lg:py-28 overflow-hidden" style="background:#0c1126;">
    <div class="pointer-events-none absolute inset-0 opacity-30" style="background-image: linear-gradient(rgba(255,255,255,.04) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.04) 1px, transparent 1px); background-size: 80px 80px;"></div>
    <div class="relative mx-auto max-w-7xl px-5 sm:px-8">
        <div class="max-w-3xl mx-auto text-center">
            <p class="reveal text-xs font-semibold uppercase tracking-[.2em]" style="color:#f4c441;">Impact metrics</p>
            <h2 class="reveal reveal-delay-1 mt-4 font-display font-extrabold text-4xl sm:text-5xl lg:text-[56px] leading-[1.05] tracking-tight text-white">
                The numbers behind the network.
            </h2>
        </div>

        @php
            $stats = [
                ['count' => 1,   'suffix' => 'M+', 'label' => 'Crimes Mapped',     'sub' => 'Indexed across 40+ states'],
                ['count' => 850, 'suffix' => 'K',  'label' => 'Offenders Tracked', 'sub' => 'Auto-refreshed registries'],
                ['count' => 200, 'suffix' => 'K',  'label' => 'Families Protected','sub' => 'And growing every week'],
                ['count' => 30,  'suffix' => 's',  'label' => 'Avg. Alert Time',   'sub' => 'From incident to lock screen', 'prefix' => '<'],
            ];
        @endphp
        <div class="mt-14 stagger grid grid-cols-2 lg:grid-cols-4 gap-px rounded-2xl overflow-hidden border border-white/10" style="background:rgba(255,255,255,.06);">
            @foreach ($stats as $s)
                <div class="relative p-8 lg:p-10" style="background:#0c1126;">
                    <p class="font-display font-extrabold text-5xl lg:text-7xl tracking-tight text-white">
                        @if(!empty($s['prefix']))<span style="color:#FB0606;">{{ $s['prefix'] }}</span>@endif<span data-count="{{ $s['count'] }}" data-suffix="{{ $s['suffix'] }}" style="background:linear-gradient(180deg,#fff 30%,rgba(255,255,255,.55) 100%); -webkit-background-clip:text; background-clip:text; color:transparent;">0{{ $s['suffix'] }}</span>
                    </p>
                    <p class="mt-3 text-sm font-semibold uppercase tracking-[.18em] text-white/85">{{ $s['label'] }}</p>
                    <p class="mt-1.5 text-xs text-white/45">{{ $s['sub'] }}</p>
                </div>
            @endforeach
        </div>
    </div>
</section>

{{-- =======================================================================
     SECURITY & COMPLIANCE
========================================================================--}}
<section class="relative py-20 lg:py-24 bg-white border-y border-ink-100">
    <div class="mx-auto max-w-5xl px-5 sm:px-8 text-center">
        <p class="reveal text-xs font-semibold uppercase tracking-[.2em] text-brand-600">Security &amp; compliance</p>
        <h2 class="reveal reveal-delay-1 mt-4 font-display font-extrabold text-3xl sm:text-4xl lg:text-5xl tracking-tight text-navy-900">
            We adhere to global safety &amp; privacy standards.
        </h2>
        <p class="reveal reveal-delay-2 mt-5 text-base text-navy-700/80 leading-relaxed max-w-2xl mx-auto">
            Auxilio is engineered with enterprise-grade encryption, audited data handling, and explicit consent flows. Your safety data should never become someone else&rsquo;s product.
        </p>

        <div class="reveal reveal-delay-3 mt-10 flex flex-wrap items-center justify-center gap-x-12 gap-y-6">
            @php
                $badges = [
                    ['name'=>'SOC 2 Type II','icon'=>'shield'],
                    ['name'=>'GDPR &amp; CCPA','icon'=>'people'],
                    ['name'=>'HIPAA-Aligned','icon'=>'shield'],
                    ['name'=>'CJIS-Ready','icon'=>'shield'],
                    ['name'=>'E2E Encryption','icon'=>'shield'],
                ];
            @endphp
            @foreach ($badges as $b)
                <div class="flex items-center gap-2.5 px-5 py-3 rounded-full border border-ink-100 bg-ink-50/50">
                    <svg class="w-5 h-5 text-brand-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8">
                        {!! $icons[$b['icon']] !!}
                    </svg>
                    <span class="text-sm font-semibold text-navy-900">{!! $b['name'] !!}</span>
                </div>
            @endforeach
        </div>
    </div>
</section>

{{-- =======================================================================
     SCIENCE / TESTIMONIALS HYBRID — "Built on safety science"
========================================================================--}}
<section id="voices" class="relative py-24 lg:py-32 bg-ink-50/40">
    <div class="mx-auto max-w-7xl px-5 sm:px-8">
        <div class="max-w-3xl mx-auto text-center">
            <p class="reveal text-xs font-semibold uppercase tracking-[.2em] text-brand-600">Voices</p>
            <h2 class="reveal reveal-delay-1 mt-4 font-display font-extrabold text-4xl sm:text-5xl lg:text-[56px] leading-[1.05] tracking-tight text-navy-900">
                Built for parents. <span class="text-brand-600">Loved by them.</span>
            </h2>
        </div>

        @php
            $reviews = [
                ['name' => 'Sarah Mitchell', 'role' => 'Parent · Charlotte, NC',
                 'photo' => 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=160&h=160&fit=crop&q=80',
                 'body' => '&ldquo;I used to refresh the local news after every siren. Auxilio gives me the actual incident, on a map, the moment it happens — I know whether to keep the kids inside or carry on with our day.&rdquo;'],
                ['name' => 'David Chen',     'role' => 'Homeowner · Austin, TX',
                 'photo' => 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=160&h=160&fit=crop&q=80',
                 'body' => '&ldquo;We bought a house and the offender map showed me something the realtor didn&rsquo;t. That single feature has paid for the app a hundred times over — peace of mind I didn&rsquo;t realize I needed.&rdquo;'],
                ['name' => 'Renee Alvarez',  'role' => 'Parent · Denver, CO',
                 'photo' => 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=160&h=160&fit=crop&q=80',
                 'body' => '&ldquo;My daughter walks home from practice at dusk. The geofence alerts and silent SOS button mean she has a way to reach me, and the right people, the second something feels off.&rdquo;'],
            ];
        @endphp
        <div class="mt-14 stagger grid lg:grid-cols-3 gap-6">
            @foreach ($reviews as $r)
                <figure class="group relative flex flex-col rounded-2xl bg-white p-8 border border-ink-100 hover:-translate-y-1 hover:shadow-xl transition">
                    <svg class="w-10 h-10 text-brand-600/15" viewBox="0 0 24 24" fill="currentColor"><path d="M9 7H5a2 2 0 00-2 2v3a2 2 0 002 2h2v3l4-3v-7H9zm10 0h-4a2 2 0 00-2 2v3a2 2 0 002 2h2v3l4-3v-7h-2z"/></svg>
                    <blockquote class="mt-4 text-navy-800 leading-relaxed flex-1">{!! $r['body'] !!}</blockquote>
                    <figcaption class="mt-6 flex items-center gap-3 pt-6 border-t border-ink-100">
                        <img src="{{ $r['photo'] }}" alt="{{ $r['name'] }}" loading="lazy" class="w-11 h-11 rounded-full object-cover ring-2 ring-white shadow-sm" />
                        <div class="text-sm">
                            <p class="font-semibold text-navy-900">{{ $r['name'] }}</p>
                            <p class="text-ink-500">{{ $r['role'] }}</p>
                        </div>
                        <span class="ml-auto flex items-center gap-0.5">
                            @for ($s = 0; $s < 5; $s++)
                                <svg class="w-3.5 h-3.5 text-gold-400" viewBox="0 0 24 24" fill="currentColor"><path d="M12 .6l3.7 7.5 8.3 1.2-6 5.8 1.4 8.3L12 19l-7.4 4.4L6 15.1 0 9.3l8.3-1.2L12 .6z"/></svg>
                            @endfor
                        </span>
                    </figcaption>
                </figure>
            @endforeach
        </div>
    </div>
</section>

{{-- =======================================================================
     FAQ — interactive accordion w/ category icons + animated reveal
========================================================================--}}
<section class="relative py-24 lg:py-32 overflow-hidden" style="background:linear-gradient(180deg,#ffffff 0%,#fbfcff 50%,#ffffff 100%);">
    {{-- ambient brand glow --}}
    <div class="pointer-events-none absolute inset-0 -z-0 opacity-40">
        <div class="absolute top-1/3 -left-40 w-[520px] h-[520px] rounded-full blur-3xl" style="background:radial-gradient(circle,rgba(251,6,6,.10) 0%,transparent 65%);"></div>
        <div class="absolute -bottom-40 -right-40 w-[560px] h-[560px] rounded-full blur-3xl" style="background:radial-gradient(circle,rgba(244,196,65,.12) 0%,transparent 65%);"></div>
    </div>

    <div class="relative mx-auto max-w-5xl px-5 sm:px-8">

        <div class="text-center max-w-2xl mx-auto">
            <p class="reveal inline-flex items-center gap-2 text-sm font-medium text-navy-900/70">
                <span class="grid place-items-center w-5 h-5 rounded-full" style="background:#FB0606;">
                    <svg class="w-3 h-3 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4"><path stroke-linecap="round" stroke-linejoin="round" d="M9.5 9a2.5 2.5 0 115 0c0 1.5-2.5 1.8-2.5 3.5M12 17h.01"/></svg>
                </span>
                Frequently asked
            </p>
            <h2 class="reveal reveal-delay-1 mt-4 font-display font-extrabold text-4xl sm:text-5xl lg:text-[56px] leading-[1.04] tracking-tight text-navy-950">
                Everything you wanted to <span style="color:#FB0606;">ask.</span>
            </h2>
            <p class="reveal reveal-delay-2 mt-5 text-lg text-navy-900/65 leading-relaxed">
                Real answers from the team building Auxilio. Tap any question to expand — or use the filter to jump to a topic.
            </p>
        </div>

        {{-- Category filter chips --}}
        @php
            $faqCats = ['All','Pricing','Speed','Privacy','Network','Devices','Data'];
        @endphp
        <div class="reveal reveal-delay-3 mt-10 flex flex-wrap items-center justify-center gap-2" data-faq-filter>
            @foreach ($faqCats as $i => $c)
                <button type="button" data-faq-cat="{{ $c }}" class="faq-chip inline-flex items-center gap-1.5 rounded-full border border-ink-200 bg-white px-4 py-1.5 text-xs font-semibold uppercase tracking-[.14em] text-navy-900/70 hover:border-brand-300 hover:text-brand-600 transition {{ $i===0 ? 'is-active' : '' }}">
                    {{ $c }}
                </button>
            @endforeach
        </div>

        @php
            $faqs = [
                ['cat'=>'Pricing','icon'=>'M12 1v22M17 5H9.5a3.5 3.5 0 100 7h5a3.5 3.5 0 110 7H6','q'=>'Is Auxilio free to use?','a'=>'Yes — every core safety feature (alerts, SOS, registry, live crime map) is free forever. We never paywall an emergency. Premium plans add concierge agents, family routing, and advanced geofences for $4.99/mo.'],
                ['cat'=>'Speed','icon'=>'M13 2L3 14h7l-1 8 10-12h-7l1-8z','q'=>'How fast does an SOS reach a responder?','a'=>'Median time from tap to verified responder dispatch is under 30 seconds. Your location, identity, and situation are sent simultaneously to your authorized contacts and the closest available Super Agent.'],
                ['cat'=>'Privacy','icon'=>'M12 22s8-7.5 8-13a8 8 0 10-16 0c0 5.5 8 13 8 13z','q'=>'Who can see my location?','a'=>'Only the people you explicitly authorize. Sharing is opt-in, time-bound, and revocable in one tap. We do not sell, monetize, or share your location with anyone — including agencies — without your express consent.'],
                ['cat'=>'Data','icon'=>'M4 4h16v4H4zM4 12h10v4H4zM4 20h7','q'=>'Where does the offender data come from?','a'=>'We pull from the National Sex Offender Public Website (NSOPW) and individual state registries (e.g., Megan&rsquo;s Law). Data is auto-refreshed nightly; you don&rsquo;t do manual lookups.'],
                ['cat'=>'Network','icon'=>'M16 11a4 4 0 10-8 0 4 4 0 008 0zM3 21a7 7 0 0118 0','q'=>'Are Super Agents actually trained?','a'=>'Yes. Every Super Agent is background-checked, identity-verified, and trained in de-escalation, first response, and case handoff. Each has a public badge number you can verify in-app, and a 4.8+ rating threshold.'],
                ['cat'=>'Devices','icon'=>'M7 4h10a2 2 0 012 2v12a2 2 0 01-2 2H7a2 2 0 01-2-2V6a2 2 0 012-2zM12 18h.01','q'=>'What devices does Auxilio support?','a'=>'iOS 15+ and Android 10+. Companion experiences are available on Apple Watch and Wear OS for silent SOS without unlocking the phone. Web dashboard for family administrators on any modern browser.'],
                ['cat'=>'Privacy','icon'=>'M6 10V8a6 6 0 1112 0v2M5 10h14v10H5z','q'=>'Can I delete my data anytime?','a'=>'Yes. One tap in Settings → Account permanently deletes your profile, history, location traces, and any media you uploaded. We&rsquo;re GDPR &amp; CCPA compliant by default — even if you&rsquo;re not in the EU or California.'],
                ['cat'=>'Network','icon'=>'M12 3l8 4v5c0 5-3.5 8.5-8 9-4.5-.5-8-4-8-9V7l8-4z','q'=>'What if there&rsquo;s no agent near me?','a'=>'Auxilio always falls back to 911 dispatch via our verified Public Safety Answering Point (PSAP) bridge in supported regions. You&rsquo;re never left waiting — the system routes to whichever responder is fastest.'],
            ];
        @endphp

        <div class="mt-10 space-y-3" data-faq-list>
            @foreach ($faqs as $i => $f)
                <details data-faq data-faq-item="{{ $f['cat'] }}" class="faq-item group relative rounded-2xl border border-ink-100 bg-white overflow-hidden transition-all duration-300 hover:border-brand-300 hover:shadow-[0_18px_40px_-16px_rgba(251,6,6,.18)]" {{ $i===0 ? 'open' : '' }}>
                    {{-- left red accent bar slides in when open --}}
                    <span class="pointer-events-none absolute left-0 top-0 bottom-0 w-1 origin-top scale-y-0 group-open:scale-y-100 transition-transform duration-500" style="background:linear-gradient(180deg,#FB0606,#c8202f);"></span>

                    <summary class="flex items-center justify-between gap-5 cursor-pointer px-6 sm:px-8 py-5 list-none select-none">
                        {{-- left: number + category icon + question --}}
                        <div class="flex items-center gap-4 min-w-0">
                            <span class="relative hidden sm:grid place-items-center shrink-0 w-11 h-11 rounded-xl border border-ink-100 overflow-hidden transition-all duration-300 group-hover:border-brand-200 group-open:border-transparent" style="background:#fbfcff;">
                                {{-- red fill scoped to this badge only --}}
                                <span class="absolute inset-0 opacity-0 group-open:opacity-100 transition-opacity duration-300" style="background:linear-gradient(135deg,#FB0606,#c8202f);"></span>
                                <svg class="relative z-10 w-5 h-5 transition-colors duration-300 text-navy-900/55 group-open:!text-white group-hover:text-brand-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="{{ $f['icon'] }}"/></svg>
                            </span>
                            <div class="min-w-0">
                                <span class="block text-[10px] font-bold uppercase tracking-[.18em] text-navy-900/45 group-open:text-brand-600 transition-colors">
                                    Q{{ str_pad($i+1, 2, '0', STR_PAD_LEFT) }} · {{ $f['cat'] }}
                                </span>
                                <h3 class="mt-0.5 font-display font-bold text-navy-950 text-base sm:text-lg leading-snug">
                                    {{ $f['q'] }}
                                </h3>
                            </div>
                        </div>

                        {{-- expand icon: animated +/× — uses HEADER red #FB0606 when open --}}
                        <span class="relative grid place-items-center shrink-0 w-10 h-10 rounded-full border border-ink-100 overflow-hidden text-navy-900/70 transition-all duration-300 group-hover:border-brand-300 group-hover:text-brand-600 group-open:border-transparent group-open:!text-white" style="background:#fff;">
                            {{-- red fill scoped to this badge only --}}
                            <span class="absolute inset-0 opacity-0 group-open:opacity-100 transition-opacity duration-300" style="background:#FB0606;"></span>
                            <svg class="relative z-10 w-4 h-4 transition-transform duration-500 group-open:rotate-[225deg]" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.6"><path stroke-linecap="round" stroke-linejoin="round" d="M12 5v14M5 12h14"/></svg>
                        </span>
                    </summary>

                    <div class="faq-answer px-6 sm:px-8 pb-7 pt-1 pl-6 sm:pl-[5.25rem] text-navy-900/70 leading-relaxed text-[15px]">
                        <div class="border-t border-ink-100 pt-4">
                            {!! $f['a'] !!}
                            <div class="mt-4 flex items-center gap-2 text-xs font-semibold" style="color:#FB0606;">
                                <svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7"/></svg>
                                Verified by the Auxilio team
                            </div>
                        </div>
                    </div>
                </details>
            @endforeach
        </div>

        {{-- Still have questions? --}}
        <div class="reveal mt-10 flex flex-col sm:flex-row items-center justify-between gap-5 rounded-2xl border border-ink-100 bg-white p-6 sm:p-7 shadow-sm">
            <div class="flex items-center gap-4">
                <span class="grid place-items-center w-12 h-12 rounded-xl text-white shadow-[0_10px_22px_-8px_rgba(251,6,6,.55)]" style="background:linear-gradient(135deg,#FB0606,#c8202f);">
                    <svg class="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M21 12c0 4.418-4.03 8-9 8a9.86 9.86 0 01-4-.8L3 20l1.4-3.7A8.99 8.99 0 013 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"/></svg>
                </span>
                <div>
                    <p class="font-display font-bold text-navy-950">Still have questions?</p>
                    <p class="text-sm text-navy-900/60">Talk to a real human — we usually reply in under an hour.</p>
                </div>
            </div>
            <a data-route href="#/contact" class="inline-flex items-center gap-2 rounded-xl text-white px-5 py-3 text-sm font-semibold transition hover:-translate-y-0.5" style="background:linear-gradient(135deg,#FB0606,#c8202f);">
                Contact the team
                <svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4"><path stroke-linecap="round" stroke-linejoin="round" d="M5 12h14m0 0l-6-6m6 6l-6 6"/></svg>
            </a>
        </div>
    </div>
</section>

{{-- =======================================================================
     DOWNLOAD CTA — replaces in-page contact form
========================================================================--}}
<section id="download" class="relative py-24 lg:py-32 overflow-hidden">
    <div class="absolute inset-0 -z-10" style="background:linear-gradient(135deg,#06080b 0%,#0c1126 45%,#1a2548 100%);"></div>
    <div class="pointer-events-none absolute inset-0 -z-0 opacity-60">
        <div class="absolute -top-40 -left-32 w-[640px] h-[640px] rounded-full blur-3xl" style="background:radial-gradient(circle,rgba(251,6,6,.40) 0%,transparent 65%);"></div>
        <div class="absolute -bottom-40 -right-32 w-[680px] h-[680px] rounded-full blur-3xl" style="background:radial-gradient(circle,rgba(244,196,65,.25) 0%,transparent 65%);"></div>
    </div>

    <div class="relative mx-auto max-w-5xl px-5 sm:px-8 text-center">
        <p class="reveal text-xs font-semibold uppercase tracking-[.2em]" style="color:#f4c441;">Get Auxilio</p>
        <h2 class="reveal reveal-delay-1 mt-4 font-display font-extrabold text-4xl sm:text-5xl lg:text-[64px] leading-[1.05] tracking-tight text-white">
            A safer block <span style="background:linear-gradient(90deg,#FB0606,#f4c441); -webkit-background-clip:text; background-clip:text; color:transparent;">starts on your phone.</span>
        </h2>
        <p class="reveal reveal-delay-2 mt-5 mx-auto max-w-2xl text-lg text-white/75 leading-relaxed">
            Free to download. Available on iOS and Android. Set up in under five minutes — and let Auxilio do the watching while you live your life.
        </p>

        <div class="reveal reveal-delay-3 mt-9 flex flex-col sm:flex-row items-center justify-center gap-3">
            <a href="#" class="inline-flex shrink-0 transition hover:-translate-y-0.5 hover:opacity-95 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-500 rounded-lg"><img src="/images/app-store-badge.png" alt="Download on the App Store" class="h-12 sm:h-14 w-auto rounded-lg shadow-md" /></a>
            <a href="#" class="inline-flex shrink-0 transition hover:-translate-y-0.5 hover:opacity-95 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-500 rounded-lg"><img src="/images/google-play-badge.png" alt="Get it on Google Play" class="h-12 sm:h-14 w-auto rounded-lg shadow-md" /></a>
        </div>

        {{-- newsletter --}}
        <div class="reveal reveal-delay-4 mt-14 mx-auto max-w-xl rounded-2xl border border-white/10 p-6 lg:p-8" style="background:rgba(255,255,255,.04); backdrop-filter:blur(12px);">
            <p class="text-xs font-semibold uppercase tracking-[.18em]" style="color:#f4c441;">Stay updated</p>
            <h3 class="mt-2 font-display font-bold text-2xl text-white">Get the safety brief.</h3>
            <p class="mt-1.5 text-sm text-white/60">Monthly product updates, neighborhood safety tips, and registry changes. No spam, ever.</p>
            <form data-newsletter class="mt-5 flex flex-col sm:flex-row gap-2.5" onsubmit="event.preventDefault(); this.querySelector('[data-newsletter-status]').classList.remove('hidden');">
                <input type="email" required placeholder="you@household.com" class="flex-1 rounded-md border border-white/10 px-4 py-3 text-sm text-white placeholder:text-white/30 focus:outline-none focus:ring-2" style="background:#06080b;" />
                <button type="submit" class="inline-flex items-center justify-center gap-2 rounded-md text-white px-6 py-3 text-sm font-semibold whitespace-nowrap transition" style="background:linear-gradient(135deg,#FB0606,#c8202f);">
                    Subscribe
                </button>
            </form>
            <p data-newsletter-status class="hidden mt-3 text-sm text-emerald-300">Thanks — you&rsquo;re on the list. See you next month.</p>
        </div>

        <div class="reveal reveal-delay-5 mt-10 flex flex-wrap items-center justify-center gap-x-8 gap-y-4 text-sm text-white/65">
            <div class="flex items-center gap-2">
                <span class="grid place-items-center w-7 h-7 rounded-full" style="background:rgba(255,255,255,.08);">
                    <svg class="w-3.5 h-3.5" style="color:#f4c441;" viewBox="0 0 24 24" fill="currentColor"><path d="M12 .6l3.7 7.5 8.3 1.2-6 5.8 1.4 8.3L12 19l-7.4 4.4L6 15.1 0 9.3l8.3-1.2L12 .6z"/></svg>
                </span>
                <span><span class="font-semibold text-white">4.9</span> &middot; 12K+ ratings</span>
            </div>
            <div class="flex items-center gap-2">
                <span class="grid place-items-center w-7 h-7 rounded-full" style="background:rgba(255,255,255,.08);">
                    <svg class="w-3.5 h-3.5" style="color:#f4c441;" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M12 3l8 4v5c0 5-3.5 8.5-8 9-4.5-.5-8-4-8-9V7l8-4z"/></svg>
                </span>
                <span><span class="font-semibold text-white">200K+</span> families protected</span>
            </div>
            <div class="flex items-center gap-2">
                <span class="grid place-items-center w-7 h-7 rounded-full" style="background:rgba(255,255,255,.08);">
                    <svg class="w-3.5 h-3.5" style="color:#f4c441;" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7"/></svg>
                </span>
                <span><span class="font-semibold text-white">SOC 2</span> Type II certified</span>
            </div>
        </div>
    </div>
</section>

</div>{{-- /data-view=home --}}

{{-- ============================================================
     CRIME MAP VIEW — full-page map under fixed header
============================================================--}}
<div data-view="crime-map" class="hidden">
    <section class="relative w-full" style="height: calc(100vh - 78px);">
        <div id="auxilio-map" class="absolute inset-0 bg-ink-100"></div>

        {{-- Title chip (top-left) --}}
        <div class="absolute top-4 left-4 z-[500] flex items-center gap-2 rounded-full bg-white shadow-lg ring-1 ring-ink-100 pl-2 pr-4 py-1.5">
            <a data-route href="#/" class="grid place-items-center w-7 h-7 rounded-full bg-ink-100 hover:bg-ink-200 text-navy-900 transition" aria-label="Home">
                <svg class="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M15 19l-7-7 7-7"/></svg>
            </a>
            <span class="text-sm font-bold text-navy-900">Crime Map</span>
            <span class="text-xs text-ink-500 hidden sm:inline">· Newark, NJ</span>
        </div>

        {{-- Live status (top-right) --}}
        <div class="absolute top-4 right-4 z-[500] inline-flex items-center gap-2 rounded-full bg-white shadow-lg ring-1 ring-ink-100 px-3 py-1.5">
            <span class="relative inline-flex w-2 h-2 rounded-full bg-emerald-500 pulse-dot text-emerald-500"></span>
            <span class="text-xs font-semibold tracking-wider uppercase text-navy-900">Live · 15 reports</span>
        </div>

        {{-- Legend (bottom) --}}
        <div class="absolute bottom-4 left-4 right-4 z-[500] flex justify-center pointer-events-none">
            <div class="pointer-events-auto inline-flex flex-wrap gap-2 rounded-md bg-white/95 backdrop-blur shadow-lg ring-1 ring-ink-100 p-2">
                <span class="inline-flex items-center gap-1.5 rounded-full bg-amber-100 text-amber-800 text-xs font-bold px-2.5 py-1"><span class="w-2 h-2 rounded-full bg-amber-500"></span> SC</span>
                <span class="inline-flex items-center gap-1.5 rounded-full bg-orange-100 text-orange-800 text-xs font-bold px-2.5 py-1"><span class="w-2 h-2 rounded-full bg-orange-500"></span> RC</span>
                <span class="inline-flex items-center gap-1.5 rounded-full bg-red-100 text-red-800 text-xs font-bold px-2.5 py-1"><span class="w-2 h-2 rounded-full bg-red-600"></span> H</span>
                <span class="inline-flex items-center gap-1.5 rounded-full bg-blue-100 text-blue-800 text-xs font-bold px-2.5 py-1"><span class="w-2 h-2 rounded-full bg-blue-500"></span> PV</span>
                <span class="inline-flex items-center gap-1.5 rounded-full bg-emerald-100 text-emerald-800 text-xs font-bold px-2.5 py-1"><span class="w-2 h-2 rounded-full bg-emerald-500"></span> O</span>
            </div>
        </div>
    </section>
</div>

{{-- ============================================================
     SEX OFFENDER MAP VIEW — full-page map under fixed header
============================================================--}}
<div data-view="sex-offender-map" class="hidden">
    <section class="relative w-full" style="height: calc(100vh - 78px);">
        <div id="auxilio-so-map" class="absolute inset-0 bg-ink-100"></div>

        <div class="absolute top-4 left-4 z-[500] flex items-center gap-2 rounded-full bg-white shadow-lg ring-1 ring-ink-100 pl-2 pr-4 py-1.5">
            <a data-route href="#/" class="grid place-items-center w-7 h-7 rounded-full bg-ink-100 hover:bg-ink-200 text-navy-900 transition" aria-label="Home">
                <svg class="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M15 19l-7-7 7-7"/></svg>
            </a>
            <span class="text-sm font-bold text-navy-900">Sex Offender Map</span>
        </div>

        <div class="absolute top-4 right-4 z-[500] inline-flex items-center gap-2 rounded-full bg-white shadow-lg ring-1 ring-ink-100 px-3 py-1.5">
            <span class="relative inline-flex w-2 h-2 rounded-full bg-blue-500 pulse-dot text-blue-500"></span>
            <span class="text-xs font-semibold tracking-wider uppercase text-navy-900">12 registered</span>
        </div>

        <div class="absolute bottom-4 left-4 right-4 z-[500] flex justify-center pointer-events-none">
            <div class="pointer-events-auto inline-flex items-center gap-2 rounded-md bg-white/95 backdrop-blur shadow-lg ring-1 ring-ink-100 px-3 py-2">
                <span class="inline-flex items-center gap-1.5 text-xs font-bold text-blue-700"><span class="w-2.5 h-2.5 rounded-full bg-blue-500"></span> Registered Sex Offender</span>
                <span class="text-ink-300">·</span>
                <span class="text-xs text-ink-500">State Registry</span>
            </div>
        </div>
    </section>
</div>

{{-- ============================================================
     HOW IT WORKS VIEW
============================================================--}}
<div data-view="how-it-works" class="hidden">
    {{-- =======================================================================
         REPORT FLOW — 5-step capture (moved from home)
    ========================================================================--}}
    <section id="how" class="relative overflow-hidden bg-white">
        @php
            $flow = [
                ['n' => '01', 'tag' => 'Categorize', 'title' => 'Pick the urgency &amp; category.',                          'body' => 'Choose Urgent or Regular, then tap the type — Sexual Crimes, Robbery, Physical Violence, or Homicide. Auxilio routes the priority for you.', 'img' => '/images/screen-categorize.png', 'pills' => ['Urgent','Regular'], 'chips' => ['Sexual Crimes','Robbery','Physical Violence','Homicide']],
                ['n' => '02', 'tag' => 'Describe',   'title' => 'Capture the suspect — guided.',                            'body' => 'Step-through dropdowns for Race, Age, Hair, Height, Weight, Build, Teeth, Face Color and more. Skip what you don\'t know — Auxilio fills in the rest.', 'img' => '/images/screen-suspect.png', 'chips' => ['Race','Age','Hair','Height','Weight','Build','Face Color']],
                ['n' => '03', 'tag' => 'Vehicle',    'title' => 'Add vehicle details if you saw one.',                       'body' => 'Car, motorcycle, e-scooter — whatever was involved. License plate, make, model, color, body style. Skip cleanly if it doesn\'t apply.', 'img' => '/images/screen-vehicle.png', 'chips' => ['Type','License Plate','Make','Model','Color','Body Style']],
                ['n' => '04', 'tag' => 'Evidence',   'title' => 'Drop in evidence on the spot.',                             'body' => 'Record video, capture audio, or upload up to six photos. Add a description in your own words — everything is encrypted on send.', 'img' => '/images/screen-evidence.png', 'chips' => ['Record Video','Record Audio','Upload Photos','Description']],
                ['n' => '05', 'tag' => 'Sketch',     'title' => 'Build a suspect sketch.', 'body' => 'Tap through guided options for body, skin, hair, face, eyes and accessories. Auxilio composes a recognizable sketch in under a minute and ships it with the report.', 'img' => '/images/screen-sketch.png', 'chips' => ['Body','Skin','Hair','Facial Hair','Eyes','Nose','Jaw','Face','Head Wear','Glasses']],
            ];
        @endphp

        @foreach ($flow as $i => $f)
            @php
                $reverse = $i % 2 === 1;
                $isDark  = $i % 2 === 1;     // step 2 & 4 are dark, 1/3/5 are white
                $rowBg   = $isDark ? 'bg-navy-950 text-white' : 'bg-white text-navy-900';
                $numCol  = $isDark ? 'text-brand-400' : 'text-brand-600';
                $tagPill = $isDark ? 'bg-brand-600/20 border border-brand-500/40 text-brand-200' : 'bg-brand-50 border border-brand-200 text-brand-700';
                $bodyCol = $isDark ? 'text-navy-200/80' : 'text-navy-700/80';
                $chipCol = $isDark ? 'bg-white/5 border border-white/10 text-white/80' : 'bg-ink-50 border border-ink-200 text-navy-700';
                $phoneShadow = $isDark ? 'shadow-[0_40px_80px_-20px_rgba(0,0,0,.6)]' : 'shadow-[0_30px_60px_-20px_rgba(12,17,38,.35)]';
                $titleAccent = $isDark ? 'text-gold-400' : 'text-brand-600';
            @endphp

            <div class="relative {{ $rowBg }} overflow-hidden">
                @if ($isDark)
                    <div class="pointer-events-none absolute inset-0 -z-0 opacity-30">
                        <div class="absolute top-1/4 -left-32 w-[420px] h-[420px] rounded-full bg-brand-600/30 blur-3xl"></div>
                        <div class="absolute bottom-0 -right-32 w-[400px] h-[400px] rounded-full bg-gold-500/20 blur-3xl"></div>
                    </div>
                @endif

                <div class="relative mx-auto max-w-7xl px-5 sm:px-8 py-16 lg:py-24">
                    <article class="grid lg:grid-cols-12 gap-10 items-center">
                        <div class="lg:col-span-5 {{ $reverse ? 'lg:order-2' : '' }} reveal {{ $reverse ? 'reveal-right' : 'reveal-left' }}">
                            <div class="relative mx-auto max-w-[280px] lg:max-w-[320px] aspect-[9/19] rounded-[44px] bg-navy-900 p-3 {{ $phoneShadow }} ring-1 ring-white/5">
                                <div class="absolute top-5 left-1/2 -translate-x-1/2 w-24 h-6 rounded-full bg-navy-900 z-20"></div>
                                <div class="relative w-full h-full rounded-[32px] overflow-hidden bg-white">
                                    <img src="{{ $f['img'] }}" alt="{{ $f['title'] }}" loading="lazy" class="absolute inset-0 w-full h-full object-cover object-top" />
                                </div>
                                <div class="absolute -inset-4 -z-10 rounded-[60px] bg-gradient-to-tr from-brand-600/40 via-transparent to-gold-400/20 blur-2xl"></div>
                            </div>
                        </div>

                        <div class="lg:col-span-7 {{ $reverse ? 'lg:order-1 lg:pr-12' : 'lg:pl-8' }} reveal {{ $reverse ? 'reveal-left' : 'reveal-right' }}">
                            <div class="flex items-center gap-3 {{ $numCol }}">
                                <span class="font-display text-5xl lg:text-6xl tracking-tight font-extrabold">{{ $f['n'] }}</span>
                                <span class="text-[11px] font-bold uppercase tracking-[.22em] rounded-full {{ $tagPill }} px-3 py-1">{{ $f['tag'] }}</span>
                            </div>
                            <h3 class="mt-3 font-display font-extrabold text-3xl sm:text-4xl lg:text-5xl tracking-tight">{!! str_replace('sketch', '<span class="'.$titleAccent.'">sketch</span>', $f['title']) !!}</h3>
                            <p class="mt-4 text-lg {{ $bodyCol }} leading-relaxed max-w-xl">{{ $f['body'] }}</p>

                            @if (!empty($f['pills']))
                                <div class="mt-6 inline-flex rounded-full {{ $isDark ? 'bg-white/5 border border-white/10' : 'bg-ink-50 border border-ink-200' }} p-1">
                                    <span class="px-4 py-1.5 rounded-full bg-brand-600 text-white text-xs font-semibold">{{ $f['pills'][0] }}</span>
                                    <span class="px-4 py-1.5 rounded-full {{ $isDark ? 'text-white/60' : 'text-navy-700/60' }} text-xs font-medium">{{ $f['pills'][1] }}</span>
                                </div>
                            @endif

                            <div class="mt-5 flex flex-wrap gap-2">
                                @foreach ($f['chips'] as $chip)
                                    <span class="text-xs font-medium {{ $chipCol }} rounded-full px-3 py-1.5">{{ $chip }}</span>
                                @endforeach
                            </div>
                        </div>
                    </article>
                </div>
            </div>
        @endforeach
    </section>

    {{-- Submit Emergency CTA — bridges 5-step to dispatch --}}
    <section class="relative bg-navy-950 overflow-hidden">
        <div class="absolute inset-0 -z-0 opacity-30 pointer-events-none">
            <div class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[720px] h-[720px] rounded-full bg-brand-600/30 blur-3xl"></div>
            <div class="absolute top-10 right-1/4 w-[280px] h-[280px] rounded-full bg-gold-500/20 blur-3xl"></div>
        </div>
        <div class="relative mx-auto max-w-3xl px-5 sm:px-8 text-center text-white" style="padding-top:8rem; padding-bottom:8rem;">
            <span class="reveal inline-flex items-center gap-2 rounded-full bg-emerald-500/15 border border-emerald-400/30 px-4 py-2 text-[11px] font-bold uppercase tracking-[.2em] text-emerald-300">
                <span class="grid place-items-center w-5 h-5 rounded-full bg-emerald-400/30 text-emerald-200 shrink-0">
                    <svg class="w-3 h-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3"><path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7"/></svg>
                </span>
                Report complete · 5 of 5
            </span>

            {{-- 5 completed step indicators --}}
            @php
                $done = [
                    ['n' => '01', 'label' => 'Categorize'],
                    ['n' => '02', 'label' => 'Describe'],
                    ['n' => '03', 'label' => 'Vehicle'],
                    ['n' => '04', 'label' => 'Evidence'],
                    ['n' => '05', 'label' => 'Sketch'],
                ];
            @endphp
            <ol class="reveal reveal-delay-1 mt-10 stagger flex items-start justify-center">
                @foreach ($done as $i => $d)
                    @if ($i > 0)
                        <li class="flex-shrink-0 w-8 sm:w-14 lg:w-20 mx-1 sm:mx-2" style="padding-top: 26px;" aria-hidden="true">
                            <span class="block w-full h-0.5 bg-emerald-400/70"></span>
                        </li>
                    @endif
                    <li class="flex flex-col items-center w-16 sm:w-20 shrink-0">
                        <span class="relative grid place-items-center w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-emerald-500/15 ring-2 ring-emerald-400 text-emerald-300">
                            <svg class="w-5 h-5 sm:w-6 sm:h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3"><path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7"/></svg>
                            <span class="absolute -inset-1 rounded-full bg-emerald-400/25 blur-md -z-10"></span>
                        </span>
                        <span class="mt-3 text-[11px] font-bold uppercase tracking-[.18em] text-white/85 leading-none">{{ $d['n'] }}</span>
                        <span class="mt-1 text-[11px] text-white/55 leading-none">{{ $d['label'] }}</span>
                    </li>
                @endforeach
            </ol>

            <h3 class="reveal reveal-delay-2 mt-12 font-display font-extrabold text-3xl sm:text-4xl lg:text-5xl tracking-tight leading-[1.15]">
                All <span class="text-gold-400">5 steps</span> complete.<br class="hidden sm:block"/>
                <span class="text-white/85">Ready to dispatch.</span>
            </h3>
            <p class="reveal reveal-delay-3 mt-5 text-base sm:text-lg text-navy-200/80 max-w-xl mx-auto leading-relaxed">
                Hit the button to lock the report, encrypt it, and dispatch a verified Super Agent in your radius — instantly.
            </p>
            <div class="reveal reveal-delay-4 mt-10">
                <a href="#dispatch" data-show-dispatch class="submit-emergency group inline-flex items-center gap-3 rounded-md text-white font-bold uppercase tracking-[.18em] text-base px-10 py-5">
                    <svg class="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4"><path stroke-linecap="round" stroke-linejoin="round" d="M12 9v3m0 4h.01M5.07 19h13.86c1.54 0 2.5-1.67 1.73-3L13.73 4a2 2 0 00-3.46 0L3.34 16c-.77 1.33.19 3 1.73 3z"/></svg>
                    Submit Emergency
                    <svg class="w-5 h-5 transition-transform group-hover:translate-x-1" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4"><path stroke-linecap="round" stroke-linejoin="round" d="M5 12h14m0 0l-6-6m6 6l-6 6"/></svg>
                </a>
            </div>
            <p class="reveal reveal-delay-5 mt-5 text-xs text-white/50 flex items-center justify-center gap-2">
                <span class="inline-block w-1.5 h-1.5 rounded-full bg-brand-400 animate-pulse"></span>
                Tap to lock the report and dispatch instantly
            </p>
        </div>
    </section>

    {{-- =======================================================================
         LIVE AGENT DISPATCH (moved from home — fires after Submit Emergency)
    ========================================================================--}}
        <section id="dispatch" data-dispatch-section class="hidden relative py-24 lg:py-32 bg-navy-950 text-white overflow-hidden">
        <div class="pointer-events-none absolute inset-0 -z-0 opacity-30">
            <div class="absolute top-0 left-1/4 w-[480px] h-[480px] rounded-full bg-brand-600/40 blur-3xl"></div>
            <div class="absolute bottom-0 right-1/4 w-[420px] h-[420px] rounded-full bg-gold-500/30 blur-3xl"></div>
        </div>

        <div class="relative mx-auto max-w-7xl px-5 sm:px-8">
            {{-- Compact intro centered above the map --}}
            <div class="text-center max-w-2xl mx-auto">
                <p class="reveal text-xs font-semibold uppercase tracking-[.2em] text-brand-400">Live Agent Dispatch</p>
                <h2 class="reveal reveal-delay-1 mt-3 font-display font-extrabold text-3xl sm:text-4xl lg:text-5xl tracking-tight">
                    Multiple agents, <span class="text-gold-400">closing in</span>.
                </h2>
                <p class="reveal reveal-delay-2 mt-4 text-base sm:text-lg text-navy-200/80">
                    The closest verified Super Agents auto-dispatch from every direction. You sit in the middle — they converge.
                </p>
            </div>

            {{-- Big centered live dispatch panel --}}
            <div class="reveal reveal-delay-3 mt-12 max-w-5xl mx-auto">
                <div data-dispatch data-dispatch-start="35" class="relative rounded-[28px] border border-white/10 bg-white/[0.04] backdrop-blur p-6 lg:p-8 shadow-[0_40px_80px_-20px_rgba(0,0,0,.6)] overflow-hidden">
                    <div class="absolute -inset-px rounded-[28px] bg-gradient-to-tr from-brand-600/20 via-transparent to-gold-400/20 -z-10"></div>

                    {{-- Header --}}
                    <div class="flex items-center justify-between">
                        <div class="dispatch-pulse inline-flex items-center gap-2.5 rounded-full bg-brand-600/20 border border-brand-500/40 px-3 py-1.5">
                            <span class="relative inline-flex w-2 h-2 rounded-full bg-brand-400 pulse-dot text-brand-400"></span>
                            <span class="text-[11px] font-bold uppercase tracking-[.2em] text-brand-200">Dispatching</span>
                        </div>
                        <span class="text-[11px] font-mono text-white/50">AUX.DISPATCH · UNIT 04</span>
                    </div>

                    {{-- Live map: real Newark base (CartoDB Positron) with SVG overlay for routes + cruisers --}}
                    <div class="relative mt-6 aspect-[16/10] rounded-md border border-white/10 bg-ink-100 overflow-hidden">
                        <div id="dispatch-leaflet" class="absolute inset-0 w-full h-full"></div>
                        <svg viewBox="0 0 400 250" class="absolute inset-0 w-full h-full pointer-events-none z-10" aria-hidden="true" preserveAspectRatio="xMidYMid slice">
                            <defs>
                                <pattern id="dispatchGrid" width="40" height="40" patternUnits="userSpaceOnUse">
                                    <path d="M40 0H0V40" stroke="rgba(255,255,255,.04)" stroke-width="1" fill="none"/>
                                </pattern>
                                <linearGradient id="routeStroke" x1="0" x2="1">
                                    <stop offset="0%"  stop-color="#f4c441"/>
                                    <stop offset="100%" stop-color="#e44352"/>
                                </linearGradient>
                                <linearGradient id="bgFade" x1="0" x2="0" y1="0" y2="1">
                                    <stop offset="0%"  stop-color="#0e1b3d"/>
                                    <stop offset="100%" stop-color="#0a1428"/>
                                </linearGradient>
                                <radialGradient id="vignette" cx="50%" cy="55%" r="80%">
                                    <stop offset="60%" stop-color="rgba(0,0,0,0)"/>
                                    <stop offset="100%" stop-color="rgba(0,0,0,.65)"/>
                                </radialGradient>
                                <filter id="glowR" x="-50%" y="-50%" width="200%" height="200%">
                                    <feGaussianBlur stdDeviation="3"/>
                                </filter>
                                <filter id="bigGlow" x="-100%" y="-100%" width="300%" height="300%">
                                    <feGaussianBlur stdDeviation="6"/>
                                </filter>
                                <linearGradient id="carBody" x1="0" y1="-1" x2="0" y2="1">
                                    <stop offset="0%"  stop-color="#ffffff"/>
                                    <stop offset="50%" stop-color="#e8edf2"/>
                                    <stop offset="100%" stop-color="#aab3bf"/>
                                </linearGradient>
                                <linearGradient id="hoodShine" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="0%"  stop-color="rgba(255,255,255,.6)"/>
                                    <stop offset="100%" stop-color="rgba(255,255,255,0)"/>
                                </linearGradient>
                            </defs>

                            {{-- (Base map, water, parks, streets and area labels are now provided by the Leaflet layer beneath.) --}}

                            {{-- 6 multi-segment street-grid routes (ride-hailing style) — each officer takes a different path with right-angle turns --}}
                            @php
                                $routes = [
                                    // Multi-segment grid routes (ride-hailing style) for the diagonal officers; cardinal officers come straight.
                                    ['id'=>'dispatchRoute',  'd'=>'M 60 40 L 195 40 Q 200 40 200 45 L 200 125',                                                       'sc'=>'url(#routeStroke)',   'gc'=>'rgba(244,196,65,.22)'],  // Marcus  (NW): right then down
                                    ['id'=>'dispatchRoute2', 'd'=>'M 340 40 L 340 75 Q 340 80 335 80 L 265 80 Q 260 80 260 85 L 260 120 Q 260 125 255 125 L 200 125', 'sc'=>'rgba(228,67,82,.7)',  'gc'=>'rgba(228,67,82,.18)'],   // Diaz    (NE): block detour
                                    ['id'=>'dispatchRoute3', 'd'=>'M 380 125 L 380 160 Q 380 165 375 165 L 255 165 Q 250 165 250 160 L 250 130 Q 250 125 245 125 L 200 125', 'sc'=>'rgba(59,130,246,.7)', 'gc'=>'rgba(59,130,246,.18)'],  // Holland (E): south block detour
                                    ['id'=>'dispatchRoute4', 'd'=>'M 340 210 L 340 175 Q 340 170 335 170 L 265 170 Q 260 170 260 165 L 260 130 Q 260 125 255 125 L 200 125','sc'=>'rgba(244,196,65,.7)','gc'=>'rgba(244,196,65,.18)'], // Pierce  (SE): up then left
                                    ['id'=>'dispatchRoute5', 'd'=>'M 60 210 L 60 130 Q 60 125 65 125 L 200 125',                                                      'sc'=>'rgba(228,67,82,.7)',  'gc'=>'rgba(228,67,82,.18)'],   // Pollock (SW): up then right
                                    ['id'=>'dispatchRoute6', 'd'=>'M 20 125 L 20 90 Q 20 85 25 85 L 145 85 Q 150 85 150 90 L 150 120 Q 150 125 155 125 L 200 125', 'sc'=>'rgba(59,130,246,.7)', 'gc'=>'rgba(59,130,246,.18)'],  // Mosley  (W): north block detour
                                    ['id'=>'dispatchRoute7', 'd'=>'M 200 235 L 200 125',                                                                              'sc'=>'rgba(244,196,65,.7)', 'gc'=>'rgba(244,196,65,.18)'],  // Reyes   (S):  straight
                                ];
                            @endphp
                            @foreach ($routes as $r)
                                <path d="{{ $r['d'] }}" stroke="{{ $r['gc'] }}" stroke-width="3.5" fill="none" stroke-linecap="round" filter="url(#glowR)"/>
                                <path id="{{ $r['id'] }}" d="{{ $r['d'] }}" stroke="{{ $r['sc'] }}" stroke-width="1.6" fill="none" stroke-linecap="round" stroke-dasharray="3 4" class="route-march"/>
                            @endforeach

                            {{-- 6 detailed police cruisers (one per officer), scaled down a bit for the busier map --}}
                            @include('partials.police-cruiser', ['mpath'=>'dispatchRoute',  'dur'=>'5.5s', 'scale'=>'0.55'])
                            @include('partials.police-cruiser', ['mpath'=>'dispatchRoute2', 'dur'=>'6s',   'scale'=>'0.55'])
                            @include('partials.police-cruiser', ['mpath'=>'dispatchRoute3', 'dur'=>'6.5s', 'scale'=>'0.55'])
                            @include('partials.police-cruiser', ['mpath'=>'dispatchRoute4', 'dur'=>'7s',   'scale'=>'0.55'])
                            @include('partials.police-cruiser', ['mpath'=>'dispatchRoute5', 'dur'=>'7.5s', 'scale'=>'0.55'])
                            @include('partials.police-cruiser', ['mpath'=>'dispatchRoute6', 'dur'=>'8s',   'scale'=>'0.55'])
                            @include('partials.police-cruiser', ['mpath'=>'dispatchRoute7', 'dur'=>'6.8s', 'scale'=>'0.55'])


                            {{-- victim destination — pulsing red halo at center (200,125), avatar overlay sits on top --}}
                            <g transform="translate(200 125)">
                                <circle r="26" fill="rgba(228,67,82,.18)">
                                    <animate attributeName="r" values="26;36;26" dur="2.4s" repeatCount="indefinite"/>
                                    <animate attributeName="opacity" values=".7;.15;.7" dur="2.4s" repeatCount="indefinite"/>
                                </circle>
                                <circle r="18" fill="rgba(228,67,82,.22)">
                                    <animate attributeName="opacity" values=".25;.55;.25" dur="2.4s" repeatCount="indefinite"/>
                                </circle>
                            </g>

                        </svg>

                        {{-- 6 named officer avatars at the perimeter, converging on the victim at center --}}
                        @include('partials.officer-avatar', ['key' => 'M', 'x' => 60,  'y' => 40,  'name' => 'Officer Marcus',  'rating' => '4.9', 'accent' => 'gold',  'labelSide' => 'right'])
                        @include('partials.officer-avatar', ['key' => 'D', 'x' => 340, 'y' => 40,  'name' => 'Officer Diaz',    'rating' => '4.7', 'accent' => 'brand', 'labelSide' => 'left'])
                        @include('partials.officer-avatar', ['key' => 'H', 'x' => 380, 'y' => 125, 'name' => 'Officer Holland', 'rating' => '4.8', 'accent' => 'blue',  'labelSide' => 'left'])
                        @include('partials.officer-avatar', ['key' => 'I', 'x' => 340, 'y' => 210, 'name' => 'Officer Pierce',  'rating' => '4.6', 'accent' => 'gold',  'labelSide' => 'left'])
                        @include('partials.officer-avatar', ['key' => 'P', 'x' => 60,  'y' => 210, 'name' => 'Officer Pollock', 'rating' => '4.8', 'accent' => 'brand', 'labelSide' => 'right'])
                        @include('partials.officer-avatar', ['key' => 'O', 'x' => 20,  'y' => 125, 'name' => 'Officer Mosley',  'rating' => '4.7', 'accent' => 'blue',  'labelSide' => 'right'])
                        @include('partials.officer-avatar', ['key' => 'R', 'x' => 200, 'y' => 235, 'name' => 'Officer Reyes',   'rating' => '4.8', 'accent' => 'gold',  'labelSide' => 'right'])

                        {{-- Victim avatar — at the map center, ringed in red --}}
                        <div class="absolute z-20" style="left: 50%; top: 50%; transform: translate(-50%, -50%);">
                            <div class="relative">
                                <div class="absolute -inset-2 rounded-full bg-brand-500/50 blur-md animate-pulse"></div>
                                <div class="relative w-14 h-14 rounded-full ring-[3px] ring-brand-500 ring-offset-2 ring-offset-[#0d1429] overflow-hidden bg-navy-800 shadow-lg shadow-brand-600/40">
                                    <img src="/images/victim-avatar.png" alt="Victim" class="w-full h-full object-cover" loading="lazy" />
                                </div>
                                <div class="absolute -bottom-7 left-1/2 -translate-x-1/2 whitespace-nowrap text-center">
                                    <p class="text-[11px] font-bold text-white leading-tight drop-shadow">You</p>
                                    <p class="text-[9px] text-brand-300 leading-tight drop-shadow">awaiting agent</p>
                                </div>
                            </div>
                        </div>

                        {{-- Sonar rings on user destination --}}
                        <div class="absolute" style="left: 50%; top: 50%; transform: translate(-50%, -50%);">
                            <span class="sonar"></span>
                            <span class="sonar sonar-2"></span>
                            <span class="sonar sonar-3"></span>
                        </div>

                        {{-- Live ETA pill --}}
                        <div class="absolute top-3 left-3 inline-flex items-center gap-2 rounded-full bg-navy-950/80 backdrop-blur border border-white/10 px-3 py-1.5">
                            <svg class="w-3.5 h-3.5 text-gold-300" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4"><path stroke-linecap="round" stroke-linejoin="round" d="M12 8v4l3 2"/><circle cx="12" cy="12" r="9"/></svg>
                            <span class="text-[11px] font-semibold tracking-wider text-white">ETA <span data-dispatch-count>35</span>s</span>
                        </div>
                        <div class="absolute top-3 right-3 inline-flex items-center gap-1.5 rounded-full bg-emerald-500/15 backdrop-blur border border-emerald-300/30 px-3 py-1.5">
                            <span class="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
                            <span class="text-[11px] font-semibold tracking-wider text-emerald-200">Agent locked</span>
                        </div>
                    </div>

                    {{-- Live status feed (cycling messages) --}}
                    <div class="mt-5 rounded-md border border-white/10 bg-white/[0.03] px-4 py-3">
                        <div class="feed text-[13px] text-white/85" style="--feed-duration:8s;">
                            <div><span class="grid place-items-center w-6 h-6 rounded-full bg-brand-600/30 text-brand-300"><svg class="w-3 h-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4"><path stroke-linecap="round" stroke-linejoin="round" d="M12 22s8-7.5 8-13a8 8 0 10-16 0c0 5.5 8 13 8 13z"/></svg></span><span><b>Locating you</b> · GPS lock acquired</span></div>
                            <div><span class="grid place-items-center w-6 h-6 rounded-full bg-gold-400/25 text-gold-300"><svg class="w-3 h-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4"><circle cx="11" cy="11" r="7"/><path stroke-linecap="round" d="M20 20l-3-3"/></svg></span><span><b>Searching agents</b> · 12 nearby in 1.2 mi</span></div>
                            <div><span class="grid place-items-center w-6 h-6 rounded-full bg-emerald-400/25 text-emerald-300"><svg class="w-3 h-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.6"><path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7"/></svg></span><span><b>Agent locked</b> · Officer Marcus, ★ 4.9</span></div>
                            <div><span class="grid place-items-center w-6 h-6 rounded-full bg-brand-600/30 text-brand-300"><svg class="w-3 h-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4"><path stroke-linecap="round" stroke-linejoin="round" d="M5 12h14m0 0l-6-6m6 6l-6 6"/></svg></span><span><b>Dispatching now</b> · 4.2 mi · 35s ETA</span></div>
                        </div>
                    </div>

                    {{-- Countdown + summary row --}}
                    <div class="mt-5 grid grid-cols-1 sm:grid-cols-2 gap-4 items-center">
                        <div class="flex items-center gap-4">
                            <div class="relative w-24 h-24 shrink-0">
                                <svg class="w-full h-full -rotate-90" viewBox="0 0 100 100" aria-hidden="true">
                                    <circle cx="50" cy="50" r="44" stroke="rgba(255,255,255,.08)" stroke-width="8" fill="none"/>
                                    <circle cx="50" cy="50" r="44" stroke="url(#countdownGrad)" stroke-width="8" fill="none" stroke-linecap="round" pathLength="276" class="ring-deplete" />
                                    <defs>
                                        <linearGradient id="countdownGrad" x1="0" x2="1" y1="0" y2="1">
                                            <stop offset="0%" stop-color="#f4c441"/>
                                            <stop offset="100%" stop-color="#e44352"/>
                                        </linearGradient>
                                    </defs>
                                </svg>
                                <div class="absolute inset-0 grid place-items-center text-center">
                                    <div>
                                        <p class="font-display text-2xl font-semibold tracking-tight"><span data-dispatch-count>35</span></p>
                                        <p class="text-[9px] uppercase tracking-[.18em] text-white/60">seconds</p>
                                    </div>
                                </div>
                            </div>
                            <div>
                                <p class="text-[10px] uppercase tracking-[.18em] text-white/50 font-semibold">Case</p>
                                <p class="text-sm font-semibold mt-0.5">Gender Violence</p>
                                <p class="text-[11px] text-white/60 mt-0.5">Altagracia St #14 · Alcarrizos</p>
                            </div>
                        </div>
                        <div class="grid grid-cols-2 gap-2">
                            @foreach ([['Distance','4.2 mi'], ['Duration','4 m'], ['Driving','4 m'], ['Walking','12 m']] as $m)
                                <div class="rounded-xl bg-white/[0.04] border border-white/10 p-2.5">
                                    <p class="text-[9px] uppercase tracking-[.18em] text-white/50">{{ $m[0] }}</p>
                                    <p class="text-xs font-semibold mt-0.5">{{ $m[1] }}</p>
                                </div>
                            @endforeach
                        </div>
                    </div>

                    {{-- Agents joining (slide-in) --}}
                    <div class="mt-5 rounded-md border border-brand-500/30 bg-brand-600/10 px-4 py-3 flex items-center justify-between">
                        <div>
                            <p class="text-[10px] uppercase tracking-[.18em] text-brand-300 font-semibold">Agents in assistance</p>
                            <p class="text-sm font-semibold mt-0.5">3 nearby · +10 backing up</p>
                        </div>
                        <div class="flex -space-x-2">
                            @php
                                $agentImgs = [
                                    'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=80&h=80&fit=crop&q=80',
                                    'https://images.unsplash.com/photo-1573497019418-b400bb3ab074?w=80&h=80&fit=crop&q=80',
                                    'https://images.unsplash.com/photo-1531427186611-ecfd6d936c79?w=80&h=80&fit=crop&q=80',
                                    'https://images.unsplash.com/photo-1521119989659-a83eee488004?w=80&h=80&fit=crop&q=80',
                                ];
                            @endphp
                            @foreach ($agentImgs as $i => $img)
                                <span class="agent-pop w-9 h-9 rounded-full ring-2 ring-navy-950 overflow-hidden bg-white/10" style="animation-delay: {{ ($i + 1) * 0.25 }}s">
                                    <img src="{{ $img }}" alt="" loading="lazy" class="w-full h-full object-cover" />
                                </span>
                            @endforeach
                            <span class="agent-pop w-9 h-9 rounded-full ring-2 ring-navy-950 bg-white/10 grid place-items-center text-[10px] font-bold text-white" style="animation-delay: 1.25s">+10</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>

</div>

{{-- ============================================================
     AGENT APP VIEW
============================================================--}}
<div data-view="agent-app" class="hidden">
    {{-- ========== HERO ========== --}}
    <section class="relative overflow-hidden hero-bg">
        <div class="pointer-events-none absolute inset-0 -z-10">
            <div class="absolute -top-32 left-1/4 w-[520px] h-[520px] rounded-full bg-navy-100/60 blur-3xl"></div>
            <div class="absolute bottom-0 right-0 w-[420px] h-[420px] rounded-full bg-brand-100/40 blur-3xl"></div>
        </div>
        <div class="mx-auto max-w-7xl px-5 sm:px-8 py-16 lg:py-24">
            <div class="reveal flex items-center gap-2 text-xs font-mono uppercase tracking-[.2em] text-ink-500">
                <a data-route href="#/" class="hover:text-brand-600 transition">Home</a><span>›</span><span class="text-navy-900">Agent App</span>
            </div>
            <div class="mt-3 grid lg:grid-cols-12 gap-10 items-center">
                <div class="lg:col-span-7">
                    <span class="reveal reveal-delay-1 inline-flex items-center gap-2 rounded-full bg-brand-50 text-brand-700 text-xs font-bold uppercase tracking-wider px-3 py-1.5">
                        <span class="relative flex w-1.5 h-1.5">
                            <span class="absolute inset-0 rounded-full bg-brand-600 animate-ping opacity-70"></span>
                            <span class="relative w-1.5 h-1.5 rounded-full bg-brand-600"></span>
                        </span>
                        Auxilio Agente · iOS & Android
                    </span>
                    <h1 class="reveal reveal-delay-2 mt-4 font-display font-extrabold text-4xl sm:text-5xl lg:text-6xl tracking-tight text-navy-900">
                        The badge in <br/>
                        <span class="text-brand-600">your pocket.</span>
                    </h1>
                    <p class="reveal reveal-delay-3 mt-4 text-lg text-navy-700/80 max-w-xl">
                        Auxilio Agente turns every officer into a node in the dispatch network. Accept emergencies in one tap, navigate live to the incident, and capture everything that matters — straight from the field.
                    </p>
                    <div class="reveal reveal-delay-4 mt-8 flex flex-wrap items-center gap-3">
                        <a href="#" class="inline-flex shrink-0 transition hover:-translate-y-0.5 hover:opacity-95 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-500 rounded-lg"><img src="/images/app-store-badge.png" alt="Download on the App Store" class="h-12 sm:h-14 w-auto rounded-lg shadow-md" /></a>
                        <a href="#" class="inline-flex shrink-0 transition hover:-translate-y-0.5 hover:opacity-95 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-500 rounded-lg"><img src="/images/google-play-badge.png" alt="Get it on Google Play" class="h-12 sm:h-14 w-auto rounded-lg shadow-md" /></a>
                    </div>
                    <dl class="reveal reveal-delay-4 mt-10 grid grid-cols-2 sm:grid-cols-4 gap-x-6 gap-y-5 max-w-xl">
                        @foreach ([
                            ['v'=>'1-tap','l'=>'accept dispatch'],
                            ['v'=>'Live','l'=>'turn-by-turn'],
                            ['v'=>'Encrypted','l'=>'officer channel'],
                            ['v'=>'Offline','l'=>'incident capture'],
                        ] as $s)
                            <div>
                                <dt class="font-display text-2xl font-bold tracking-tight text-navy-900">{{ $s['v'] }}</dt>
                                <dd class="mt-1 font-mono text-[10.5px] uppercase tracking-[.18em] text-ink-500">{{ $s['l'] }}</dd>
                            </div>
                        @endforeach
                    </dl>

                    {{-- Social proof block --}}
                    <div class="reveal reveal-delay-4 mt-10 max-w-xl">
                        <div class="flex items-center gap-4">
                            <div class="flex items-center -space-x-3 shrink-0">
                                <img src="/images/officer-1.jpg" alt="" class="w-10 h-10 rounded-full ring-2 ring-white object-cover" />
                                <img src="/images/officer-2.jpg" alt="" class="w-10 h-10 rounded-full ring-2 ring-white object-cover" />
                                <img src="/images/officer-3.jpg" alt="" class="w-10 h-10 rounded-full ring-2 ring-white object-cover" />
                                <img src="/images/officer-4.jpg" alt="" class="w-10 h-10 rounded-full ring-2 ring-white object-cover" />
                                <span class="w-10 h-10 grid place-items-center rounded-full ring-2 ring-white bg-emerald-500 text-white font-display font-bold text-[11px]">5K</span>
                            </div>
                            <p class="font-display text-base font-semibold text-navy-900">5,000+ Verified Officers</p>
                        </div>
                        <p class="mt-3 text-sm text-navy-700/75 leading-relaxed max-w-md">
                            Over 5,000 sworn officers across 30+ departments are answering faster — thanks to Auxilio Agente.
                        </p>
                    </div>
                </div>
                <div class="reveal reveal-right lg:col-span-5">
                    <div class="relative mx-auto max-w-md">
                        {{-- Soft brand-tinted panel with subtle grid pattern --}}
                        <div class="relative rounded-[28px] overflow-hidden aspect-[4/5] shadow-[0_30px_80px_-20px_rgba(251,6,6,.18)] ring-1 ring-brand-100/60"
                             style="background:
                                radial-gradient(circle at 30% 20%, rgba(251,6,6,.06), transparent 55%),
                                linear-gradient(160deg, #fff5f5 0%, #fdecec 60%, #fff 100%);">
                            <div class="absolute inset-0 pointer-events-none opacity-50"
                                 style="background-image:
                                    linear-gradient(rgba(251,6,6,.06) 1px, transparent 1px),
                                    linear-gradient(90deg, rgba(251,6,6,.06) 1px, transparent 1px);
                                    background-size: 36px 36px;
                                    mask-image: radial-gradient(circle at 50% 40%, black, transparent 75%);"></div>

                            {{-- Officer image, bottom-anchored like Fundix --}}
                            <img src="/images/officer-hero.jpg" alt="Auxilio Officer" class="absolute inset-x-0 bottom-0 mx-auto w-[92%] h-[92%] object-cover object-top rounded-[20px] shadow-2xl" />
                        </div>

                        {{-- Small checkmark badge (like Fundix green check) --}}
                        <span class="absolute -left-3 top-12 flex w-11 h-11 items-center justify-center rounded-full bg-white shadow-xl ring-1 ring-emerald-100 z-10">
                            <span class="flex w-7 h-7 items-center justify-center rounded-full bg-emerald-500 text-white">
                                <svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3"><path stroke-linecap="round" stroke-linejoin="round" d="M5 12l5 5L20 7"/></svg>
                            </span>
                        </span>

                        {{-- NEW DISPATCH card — upper left --}}
                        <div class="hidden md:flex notif-card absolute -left-10 top-24 items-center gap-3 rounded-2xl bg-white px-4 py-3 shadow-2xl ring-1 ring-ink-100 z-10" style="min-width:220px;">
                            <span class="flex w-10 h-10 items-center justify-center rounded-full bg-red-600 text-white shrink-0">
                                <svg class="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4"><path stroke-linecap="round" stroke-linejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z"/></svg>
                            </span>
                            <div class="leading-tight">
                                <div class="font-mono text-[10px] uppercase tracking-[.18em] text-red-600 font-bold">NEW DISPATCH</div>
                                <div class="font-display text-[14px] font-bold text-navy-900 mt-0.5">Break-in · 0.4mi</div>
                            </div>
                        </div>

                        {{-- ACCEPTED card — middle right --}}
                        <div class="hidden md:flex notif-card-2 absolute -right-6 top-1/3 items-center gap-3 rounded-2xl bg-white px-4 py-3 shadow-2xl ring-1 ring-ink-100 z-10" style="min-width:200px;">
                            <span class="flex w-10 h-10 items-center justify-center rounded-full bg-emerald-100 text-emerald-700 shrink-0">
                                <svg class="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4"><path stroke-linecap="round" stroke-linejoin="round" d="M9 12l2 2 4-4"/></svg>
                            </span>
                            <div class="leading-tight">
                                <div class="font-mono text-[10px] uppercase tracking-[.18em] text-emerald-700 font-bold">ACCEPTED</div>
                                <div class="font-display text-[14px] font-bold text-navy-900 mt-0.5">ETA 2 min 14 sec</div>
                            </div>
                        </div>

                        {{-- 3 BACKUP card — bottom left, dark style --}}
                        <div class="hidden md:flex notif-card-3 absolute -left-6 bottom-10 items-center gap-3 rounded-2xl bg-navy-900 text-white px-4 py-3 shadow-2xl ring-1 ring-white/10 z-10" style="min-width:200px;">
                            <span class="flex w-10 h-10 items-center justify-center rounded-full bg-gold-400 text-navy-900 shrink-0">
                                <svg class="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4"><path stroke-linecap="round" stroke-linejoin="round" d="M17.657 16.657L13.414 20.9a2 2 0 01-2.828 0l-4.243-4.243a8 8 0 1111.314 0zM15 11a3 3 0 11-6 0 3 3 0 016 0z"/></svg>
                            </span>
                            <div class="leading-tight">
                                <div class="font-mono text-[10px] uppercase tracking-[.18em] text-gold-400 font-bold">3 BACKUP</div>
                                <div class="font-display text-[14px] font-bold mt-0.5">closing in</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>

    {{-- ========== REAL-WORLD SCENARIOS ========== --}}
    <section class="relative bg-white">
        <div class="mx-auto max-w-7xl px-5 sm:px-8 py-20 lg:py-28">
            <div class="text-center max-w-2xl mx-auto">
                <p class="reveal text-xs font-mono uppercase tracking-[.2em] text-brand-600">Built for what officers actually face</p>
                <h2 class="reveal reveal-delay-1 mt-4 font-display font-extrabold text-3xl sm:text-4xl lg:text-5xl tracking-tight text-navy-900">
                    Every call. Every shift. <span class="text-brand-600">One app.</span>
                </h2>
                <p class="reveal reveal-delay-2 mt-5 text-navy-700/80 leading-relaxed">
                    From a midnight break-in to a freeway pile-up — Auxilio Agente brings the same context, the same speed, and the same chain-of-evidence to every scenario.
                </p>
            </div>
            <div class="reveal stagger mt-12 grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
                @foreach ([
                    ['img'=>'/images/about/break-in.jpg','tag'=>'01 · NIGHT','title'=>'Break-in','desc'=>'Silent dispatch · evidence capture · neighbor alerts in one flow.'],
                    ['img'=>'/images/about/accident.jpg','tag'=>'02 · DAY','title'=>'Collision','desc'=>'Plate OCR, scene photos, witness statements pre-fill the report.'],
                    ['img'=>'/images/about/robbery.jpg','tag'=>'03 · URGENT','title'=>'Armed robbery','desc'=>'Cohort pings 5km · backup ETA visible · pursuit-mode locked.'],
                    ['img'=>'/images/about/roadside.jpg','tag'=>'04 · ASSIST','title'=>'Roadside','desc'=>'Citizen-flagged help → nearest officer routed in under 30s.'],
                ] as $sc)
                    <article class="scenario-card group relative rounded-md overflow-hidden bg-navy-900 text-white shadow-lg ring-1 ring-ink-100">
                        <div class="relative h-56 sm:h-64 overflow-hidden">
                            <img src="{{ $sc['img'] }}" alt="{{ $sc['title'] }}" class="absolute inset-0 w-full h-full object-cover" />
                            <div class="absolute inset-0 bg-gradient-to-t from-navy-950/95 via-navy-950/40 to-transparent"></div>
                            <span class="absolute top-3 left-3 rounded-md bg-red-600 text-white text-[9.5px] font-mono uppercase tracking-[.18em] px-2 py-0.5 shadow-lg">{{ $sc['tag'] }}</span>
                        </div>
                        <div class="p-5">
                            <h3 class="font-display text-xl font-bold text-white">{{ $sc['title'] }}</h3>
                            <p class="mt-1.5 text-[13px] text-navy-200/90 leading-relaxed">{{ $sc['desc'] }}</p>
                        </div>
                    </article>
                @endforeach
            </div>
        </div>
    </section>

    {{-- ========== ONBOARDING CAROUSEL ========== --}}
    <section class="relative bg-navy-50">
        <div class="mx-auto max-w-7xl px-5 sm:px-8 py-20 lg:py-28">
            <div class="text-center max-w-2xl mx-auto">
                <p class="reveal text-xs font-mono uppercase tracking-[.2em] text-brand-600">From box to badge</p>
                <h2 class="reveal reveal-delay-1 mt-4 font-display font-extrabold text-3xl sm:text-4xl lg:text-5xl tracking-tight text-navy-900">Onboarding takes <span class="text-brand-600">90 seconds.</span></h2>
                <p class="reveal reveal-delay-2 mt-5 text-navy-700/80 leading-relaxed">Four screens. No paperwork. Officers are dispatch-ready before their first shift starts.</p>
            </div>
            <div class="reveal mt-12" data-agent-carousel>
                <div class="grid lg:grid-cols-12 gap-10 items-center">
                    <div class="lg:col-span-5">
                        <div class="relative mx-auto max-w-[280px]">
                            <span class="phone-halo"></span>
                            <div class="phone-mock relative aspect-[9/19] rounded-[40px] bg-navy-950 p-3 shadow-[0_30px_80px_-20px_rgba(12,17,38,.5)]">
                                <div class="absolute top-5 left-1/2 -translate-x-1/2 w-20 h-5 rounded-full bg-navy-950 z-20"></div>
                                <div class="relative w-full h-full rounded-[30px] overflow-hidden bg-white">
                                    <img data-onboard-img src="/images/screen-companion.png" alt="Onboarding step" class="absolute inset-0 w-full h-full object-cover object-top transition-opacity duration-300" />
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="lg:col-span-7">
                        <ul data-onboard-slides class="space-y-3">
                            @foreach ([
                                ['n'=>'01','h'=>'Your personal safety companion','b'=>'Real-time alerts, emergency support, and peace of mind at your fingertips.'],
                                ['n'=>'02','h'=>'Track and share your location','b'=>"Let your loved ones or security agents monitor your location to ensure you're always safe."],
                                ['n'=>'03','h'=>'Quick SOS for instant help','b'=>"Alert trusted agents or emergency responders with just a tap whenever you're in danger."],
                                ['n'=>'04','h'=>'Stay coordinated in the field','b'=>"A verified responder network at the officer's fingertips, with full incident context built in."],
                            ] as $i => $s)
                                <li data-onboard-slide="{{ $i }}" @if($i===0) data-active class="cursor-pointer rounded-md border-2 border-brand-200 bg-white p-5 lg:p-6 shadow-lg transition" @else class="cursor-pointer rounded-md border-2 border-ink-100 bg-white p-5 lg:p-6 shadow-sm hover:border-brand-200 hover:shadow-md transition" @endif>
                                    <div class="flex items-center gap-4">
                                        <span class="flex w-10 h-10 shrink-0 items-center justify-center rounded-full {{ $i===0 ? 'bg-red-600 text-white' : 'bg-navy-100 text-navy-700' }} font-display font-bold">{{ $s['n'] }}</span>
                                        <div><h3 class="font-display text-lg font-bold text-navy-900">{{ $s['h'] }}</h3><p class="mt-1 text-sm text-navy-700/80">{{ $s['b'] }}</p></div>
                                    </div>
                                </li>
                            @endforeach
                        </ul>
                        <div class="mt-6 flex items-center gap-4">
                            <button type="button" data-onboard-prev class="flex w-10 h-10 items-center justify-center rounded-md border border-ink-100 bg-white text-navy-900 hover:border-brand-300 hover:text-brand-600 transition" aria-label="Previous"><svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M15 19l-7-7 7-7"/></svg></button>
                            <button type="button" data-onboard-next class="flex w-10 h-10 items-center justify-center rounded-md border border-ink-100 bg-white text-navy-900 hover:border-brand-300 hover:text-brand-600 transition" aria-label="Next"><svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M9 5l7 7-7 7"/></svg></button>
                            <div class="flex items-center gap-1.5 ml-2">
                                @for ($i = 0; $i < 4; $i++)
                                    <span data-onboard-dot="{{ $i }}" class="w-2 h-2 rounded-full {{ $i===0 ? 'bg-red-600' : 'bg-navy-200' }} transition cursor-pointer"></span>
                                @endfor
                            </div>
                            <span data-onboard-counter class="ml-auto font-mono text-[11px] uppercase tracking-[.18em] text-ink-500">01 / 04</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>

    {{-- ========== DISPATCH ACCEPTANCE ========== --}}
    <section class="relative bg-white">
        <div class="mx-auto max-w-7xl px-5 sm:px-8 py-20 lg:py-28">
            <div class="grid lg:grid-cols-12 gap-12 items-start">
                <div class="lg:col-span-5 lg:sticky lg:top-28">
                    <p class="reveal text-xs font-mono uppercase tracking-[.2em] text-brand-600">01 · Accept emergency</p>
                    <h2 class="reveal reveal-delay-1 mt-4 font-display font-extrabold text-3xl sm:text-4xl lg:text-5xl tracking-tight text-navy-900">
                        From SOS to <span class="text-brand-600">accepted</span> in a single tap.
                    </h2>
                    <p class="reveal reveal-delay-2 mt-5 text-navy-700/80 leading-relaxed">
                        Officers don't scroll through queues. The closest, best-matched responders see the same card at the same time — and the first tap wins the call. No radio round-trip, no paper log, no lag.
                    </p>
                    <div class="reveal reveal-delay-3 mt-6 flex flex-wrap gap-2">
                        @foreach (['Urgent','Violence','Sexual','Robbery','Hostage','Pursuit'] as $i => $tag)
                            <span class="rounded-md px-2.5 py-1 text-[11px] font-bold uppercase tracking-wide {{ $i === 0 ? 'bg-red-600 text-white' : 'bg-navy-900 text-white' }}">{{ $tag }}</span>
                        @endforeach
                    </div>
                </div>

                <div class="lg:col-span-7">
                    <ol class="relative space-y-4">
                        <span class="absolute left-[27px] top-4 bottom-4 w-px bg-gradient-to-b from-brand-300 via-ink-100 to-transparent"></span>
                        @foreach ([
                            ['t'=>'T+0.0s','h'=>'Push lands','b'=>'Encrypted dispatch packet arrives — the phone vibrates whether the screen is locked or not.'],
                            ['t'=>'T+0.4s','h'=>'Context attached','b'=>'Victim photo, address, distance, ETA, and a 1-min acceptance window appear on the lock screen.'],
                            ['t'=>'T+1.2s','h'=>'Threat tags','b'=>'AI-classified tags — Urgent, Violence, Sexual, Robbery — load before the officer even unlocks.'],
                            ['t'=>'T+1 tap','h'=>'Accept Emergency','b'=>'One thumb. Channel opens, route locks, the cohort sees the officer is on the move.'],
                        ] as $row)
                            <li class="reveal relative flex gap-4 rounded-md border border-ink-100 bg-white p-5 lg:p-6 shadow-sm hover:shadow-lg transition">
                                <span class="flex w-[54px] h-[54px] shrink-0 items-center justify-center rounded-xl bg-brand-50 ring-1 ring-brand-100">
                                    <svg class="w-5 h-5 text-brand-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7"/></svg>
                                </span>
                                <div class="min-w-0">
                                    <div class="flex items-center gap-3">
                                        <span class="font-mono text-[10.5px] uppercase tracking-[.2em] text-brand-600">{{ $row['t'] }}</span>
                                        <span class="h-px flex-1 bg-ink-100"></span>
                                    </div>
                                    <h3 class="mt-1.5 font-display text-lg font-bold text-navy-900">{{ $row['h'] }}</h3>
                                    <p class="mt-1 text-sm text-navy-700/80 leading-relaxed">{{ $row['b'] }}</p>
                                </div>
                            </li>
                        @endforeach
                    </ol>
                    <div class="reveal mt-6 flex items-center gap-3 rounded-md border border-emerald-200 bg-emerald-50 px-5 py-4">
                        <span class="flex w-9 h-9 items-center justify-center rounded-full bg-emerald-100 ring-1 ring-emerald-300">
                            <svg class="w-4 h-4 text-emerald-700" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7"/></svg>
                        </span>
                        <div>
                            <div class="font-mono text-[10.5px] uppercase tracking-[.18em] text-emerald-700">Officer Arrived</div>
                            <div class="font-display text-[15px] font-semibold text-navy-900">Auto-confirmed via geofence · Family network notified</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>

    {{-- ========== TURN-BY-TURN ========== --}}
    <section class="relative bg-navy-50">
        <div class="mx-auto max-w-7xl px-5 sm:px-8 py-20 lg:py-28">
            <div class="grid lg:grid-cols-12 gap-12 items-center">
                <div class="order-2 lg:order-1 lg:col-span-5">
                    <div class="reveal relative mx-auto max-w-[280px]">
                        <span class="phone-halo"></span>
                        <div class="phone-mock relative aspect-[9/19] rounded-[40px] bg-navy-950 p-3 shadow-[0_30px_80px_-20px_rgba(12,17,38,.45)]">
                            <div class="absolute top-5 left-1/2 -translate-x-1/2 w-20 h-5 rounded-full bg-navy-950 z-20"></div>
                            <div class="relative w-full h-full rounded-[30px] overflow-hidden bg-white">
                                <img src="/images/screen-route-map.jpg" alt="Auxilio Agente — Route navigation" class="absolute inset-0 w-full h-full object-cover object-top" />
                            </div>
                        </div>
                    </div>
                </div>
                <div class="order-1 lg:order-2 lg:col-span-7">
                    <p class="reveal text-xs font-mono uppercase tracking-[.2em] text-brand-600">02 · Navigate live</p>
                    <h2 class="reveal reveal-delay-1 mt-4 font-display font-extrabold text-3xl sm:text-4xl lg:text-5xl tracking-tight text-navy-900">
                        Turn-by-turn routing, <span class="text-navy-700">cohort-aware</span> the whole way.
                    </h2>
                    <p class="reveal reveal-delay-2 mt-5 text-navy-700/80 leading-relaxed max-w-xl">
                        The map doesn't just show the incident — it shows every other Auxilio officer converging on it. One-tap call to the victim, dispatch, partner, or supervisor lives on the right rail.
                    </p>
                    <div class="reveal reveal-delay-3 mt-8 grid grid-cols-2 gap-3 max-w-lg">
                        @foreach ([
                            ['l'=>'Distance','v'=>'4.2m','i'=>'M3 12h18M3 12l4-4M3 12l4 4'],
                            ['l'=>'Duration','v'=>'4.2m','i'=>'M12 6v6l4 2M12 21a9 9 0 100-18 9 9 0 000 18z'],
                            ['l'=>'Driving','v'=>'4.2m','i'=>'M5 17a2 2 0 100-4 2 2 0 000 4zm14 0a2 2 0 100-4 2 2 0 000 4zM3 13l1.5-5a2 2 0 012-1.5h11a2 2 0 012 1.5L21 13M3 13h18'],
                            ['l'=>'Walking','v'=>'4.2m','i'=>'M13 4a2 2 0 11-4 0 2 2 0 014 0zM10 22l2-7-3-2 1-5 4 2 3 4'],
                        ] as $m)
                            <div class="flex items-center gap-3 rounded-md border border-ink-100 bg-white px-4 py-3 shadow-sm">
                                <span class="flex w-9 h-9 items-center justify-center rounded-lg bg-navy-900 text-white">
                                    <svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="{{ $m['i'] }}"/></svg>
                                </span>
                                <div>
                                    <div class="font-mono text-[10px] uppercase tracking-[.18em] text-ink-500">{{ $m['l'] }}</div>
                                    <div class="font-display text-lg font-bold text-navy-900">{{ $m['v'] }}</div>
                                </div>
                            </div>
                        @endforeach
                    </div>
                    <ul class="reveal reveal-delay-4 mt-8 space-y-3 text-sm text-navy-700">
                        @foreach ([
                            'Real-time bearing of every responding officer on the same map.',
                            'Right-rail quick actions: re-center, escalate, suspect intel, encrypted call.',
                            'Auto-mute non-critical notifications once a dispatch is accepted.',
                        ] as $bullet)
                            <li class="flex items-start gap-2.5">
                                <span class="mt-2 w-1.5 h-1.5 shrink-0 rounded-full bg-brand-600"></span>
                                <span>{{ $bullet }}</span>
                            </li>
                        @endforeach
                    </ul>
                </div>
            </div>
        </div>
    </section>

    {{-- ========== LIVE COHORT MAP ========== --}}
    <section class="relative bg-white">
        <div class="mx-auto max-w-7xl px-5 sm:px-8 py-20 lg:py-28">
            <div class="grid lg:grid-cols-12 gap-12 items-center">
                <div class="lg:col-span-5">
                    <p class="reveal text-xs font-mono uppercase tracking-[.2em] text-brand-600">Live cohort map</p>
                    <h2 class="reveal reveal-delay-1 mt-4 font-display font-extrabold text-3xl sm:text-4xl lg:text-5xl tracking-tight text-navy-900">See every responder in a <span class="text-brand-600">5km radius</span> in real time.</h2>
                    <p class="reveal reveal-delay-2 mt-5 text-navy-700/80 leading-relaxed">Auxilio sweeps the area every 3 seconds. Squad clusters (SC) and rapid-response cars (RC) surface on a single live canvas — the officer always knows who's nearest, who's free, and who can back them up.</p>
                    <div class="reveal reveal-delay-3 mt-6 grid grid-cols-2 gap-3">
                        <div class="rounded-md border border-ink-100 bg-white p-4 shadow-sm">
                            <div class="flex items-center gap-2"><span class="w-2.5 h-2.5 rounded-full bg-yellow-500 ring-2 ring-yellow-200"></span><span class="font-display text-sm font-bold text-navy-900">SC · Squad cluster</span></div>
                            <p class="mt-1 text-[12.5px] text-navy-700/80">Two or more officers stationed within 200m of each other.</p>
                        </div>
                        <div class="rounded-md border border-ink-100 bg-white p-4 shadow-sm">
                            <div class="flex items-center gap-2"><span class="w-2.5 h-2.5 rounded-full bg-red-500 ring-2 ring-red-200"></span><span class="font-display text-sm font-bold text-navy-900">RC · Rapid response</span></div>
                            <p class="mt-1 text-[12.5px] text-navy-700/80">Mobile units in active pursuit or on-call.</p>
                        </div>
                    </div>
                </div>
                <div class="lg:col-span-7">
                    <div class="reveal relative">
                        <span class="phone-halo"></span>
                        <div class="phone-mock-right relative mx-auto max-w-[420px] aspect-[9/19] rounded-[40px] bg-navy-950 p-3 shadow-[0_30px_80px_-20px_rgba(12,17,38,.5)]">
                            <div class="absolute top-5 left-1/2 -translate-x-1/2 w-20 h-5 rounded-full bg-navy-950 z-20"></div>
                            <div class="relative w-full h-full rounded-[30px] overflow-hidden bg-white">
                                <img src="/images/screen-assigning.png" alt="Auxilio Agente — Multi-agent cohort map" class="absolute inset-0 w-full h-full object-cover object-top" />
                            </div>
                        </div>
                        <div class="hidden md:flex absolute -left-4 top-20 items-center gap-3 rounded-md border border-ink-100 bg-white px-4 py-2.5 shadow-lg">
                            <span class="flex w-8 h-8 items-center justify-center rounded-full bg-brand-50 text-brand-600"><svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/></svg></span>
                            <div><div class="font-mono text-[9.5px] uppercase tracking-[.18em] text-ink-500">Cohort</div><div class="font-display text-sm font-bold text-navy-900">8 active in 5km</div></div>
                        </div>
                        <div class="hidden md:flex absolute -right-4 bottom-32 items-center gap-3 rounded-md border border-ink-100 bg-white px-4 py-2.5 shadow-lg">
                            <span class="flex w-8 h-8 items-center justify-center rounded-full bg-emerald-50 text-emerald-600"><svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/></svg></span>
                            <div><div class="font-mono text-[9.5px] uppercase tracking-[.18em] text-ink-500">Avg accept</div><div class="font-display text-sm font-bold text-navy-900">1.2 sec</div></div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>

    {{-- ========== FIELD NETWORK ========== --}}
    <section class="relative bg-navy-50">
        <div class="mx-auto max-w-7xl px-5 sm:px-8 py-20 lg:py-28">
            <div class="text-center max-w-2xl mx-auto">
                <p class="reveal text-xs font-mono uppercase tracking-[.2em] text-brand-600">03 · Field network</p>
                <h2 class="reveal reveal-delay-1 mt-4 font-display font-extrabold text-3xl sm:text-4xl lg:text-5xl tracking-tight text-navy-900">
                    Every officer is a <span class="text-brand-600">node</span>, not a number.
                </h2>
                <p class="reveal reveal-delay-2 mt-5 text-navy-700/80 leading-relaxed">
                    Auxilio Agente isn't a radio. It's a peer-to-peer mesh of badged responders, their networks, and the people who depend on them.
                </p>
            </div>

            <div class="mt-12 grid lg:grid-cols-12 gap-10 items-center">
                <div class="lg:col-span-5">
                    <div class="reveal relative mx-auto max-w-[280px]">
                        <span class="phone-halo"></span>
                        <div class="phone-mock relative aspect-[9/19] rounded-[40px] bg-navy-950 p-3 shadow-[0_30px_80px_-20px_rgba(12,17,38,.45)]">
                            <div class="absolute top-5 left-1/2 -translate-x-1/2 w-20 h-5 rounded-full bg-navy-950 z-20"></div>
                            <div class="relative w-full h-full rounded-[30px] overflow-hidden bg-white">
                                <img src="/images/screen-my-network.jpg" alt="Auxilio Agente — My Network" class="absolute inset-0 w-full h-full object-cover object-top" />
                            </div>
                        </div>
                    </div>
                </div>
                <div class="lg:col-span-7 grid gap-4">
                    @foreach ([
                        ['t'=>'Trusted networks','b'=>'Officers build their own circles — partners, supervisors, family, squad — and choose who sees their status, location, and shift.'],
                        ['t'=>'Cohort awareness','b'=>'Every officer within a 5km radius of an active call appears on the map with bearing, ETA, and badge tier.'],
                        ['t'=>'Encrypted chat','b'=>'Channel-isolated messaging keyed to incident IDs. Closes automatically when the call is resolved.'],
                    ] as $f)
                        <div class="reveal flex items-start gap-4 rounded-md border border-ink-100 bg-white p-5 lg:p-6 shadow-sm hover:shadow-lg transition">
                            <span class="flex w-11 h-11 shrink-0 items-center justify-center rounded-xl bg-brand-50 ring-1 ring-brand-100">
                                <svg class="w-5 h-5 text-brand-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M17 20h5v-2a4 4 0 00-3-3.87M9 20H4v-2a4 4 0 013-3.87m6-3.13a4 4 0 100-8 4 4 0 000 8z"/></svg>
                            </span>
                            <div>
                                <h3 class="font-display text-lg font-bold text-navy-900">{{ $f['t'] }}</h3>
                                <p class="mt-1.5 text-sm text-navy-700/80 leading-relaxed">{{ $f['b'] }}</p>
                            </div>
                        </div>
                    @endforeach
                    <div class="reveal mt-2 flex items-center gap-3 rounded-md border border-ink-100 bg-navy-50 px-5 py-4">
                        <div class="flex -space-x-2">
                            @for ($i = 0; $i < 3; $i++)
                                <span class="flex w-8 h-8 items-center justify-center rounded-full bg-gradient-to-br from-navy-700 to-navy-900 ring-2 ring-white text-[10px] font-bold text-white">SC</span>
                            @endfor
                        </div>
                        <div class="text-sm text-navy-700">
                            <span class="font-bold text-navy-900">12 squads · 1,023 contacts</span> — built from the officer's existing roster, not a vendor's.
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>

    {{-- ========== INCIDENT CAPTURE ========== --}}
    <section class="relative bg-white">
        <div class="mx-auto max-w-7xl px-5 sm:px-8 py-20 lg:py-28">
            <div class="grid lg:grid-cols-12 gap-12 items-center">
                <div class="lg:col-span-7">
                    <p class="reveal text-xs font-mono uppercase tracking-[.2em] text-brand-600">04 · Incident capture</p>
                    <h2 class="reveal reveal-delay-1 mt-4 font-display font-extrabold text-3xl sm:text-4xl lg:text-5xl tracking-tight text-navy-900">
                        The report writes itself — <span class="text-brand-600">on scene.</span>
                    </h2>
                    <p class="reveal reveal-delay-2 mt-5 text-navy-700/80 leading-relaxed max-w-xl">
                        Plate, make, model, year, color. Three angles of the vehicle. Suspect tags applied at dispatch. Auxilio Agente captures it all in the field and pre-fills the incident report before the officer leaves the scene.
                    </p>
                    <div class="reveal reveal-delay-3 mt-8 grid sm:grid-cols-3 gap-3">
                        @foreach ([
                            ['t'=>'3-angle vehicle capture','b'=>'Front, side, back — auto-aligned and stamped with GPS + time.'],
                            ['t'=>'Plate OCR','b'=>'Reads plates from camera, validates against AB-7368 format.'],
                            ['t'=>'Auto-report','b'=>'Tags + vehicle + route + audio log compile into one submission.'],
                        ] as $f)
                            <div class="rounded-md border border-ink-100 bg-white p-4 shadow-sm">
                                <span class="flex w-9 h-9 items-center justify-center rounded-lg bg-brand-50 ring-1 ring-brand-100">
                                    <svg class="w-4 h-4 text-brand-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M3 9a2 2 0 012-2h2l2-2h6l2 2h2a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9zm9 4a3 3 0 100 6 3 3 0 000-6z"/></svg>
                                </span>
                                <div class="mt-3 font-display text-[15px] font-bold text-navy-900">{{ $f['t'] }}</div>
                                <p class="mt-1 text-[13px] text-navy-700/80 leading-relaxed">{{ $f['b'] }}</p>
                            </div>
                        @endforeach
                    </div>
                </div>
                <div class="lg:col-span-5">
                    <div class="reveal relative mx-auto max-w-[280px]">
                        <span class="phone-halo"></span>
                        <div class="phone-mock-right relative aspect-[9/19] rounded-[40px] bg-navy-950 p-3 shadow-[0_30px_80px_-20px_rgba(12,17,38,.45)]">
                            <div class="absolute top-5 left-1/2 -translate-x-1/2 w-20 h-5 rounded-full bg-navy-950 z-20"></div>
                            <div class="relative w-full h-full rounded-[30px] overflow-hidden bg-white">
                                <img src="/images/screen-vehicle-details.jpg" alt="Auxilio Agente — Vehicle details" class="absolute inset-0 w-full h-full object-cover object-top" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>

    {{-- ========== OFFICER CONTROL ========== --}}
    <section class="relative bg-navy-50">
        <div class="mx-auto max-w-7xl px-5 sm:px-8 py-20 lg:py-28">
            <div class="grid lg:grid-cols-12 gap-12 items-center">
                <div class="lg:col-span-5">
                    <div class="reveal relative mx-auto max-w-[280px]">
                        <span class="phone-halo"></span>
                        <div class="phone-mock relative aspect-[9/19] rounded-[40px] bg-navy-950 p-3 shadow-[0_30px_80px_-20px_rgba(12,17,38,.45)]">
                            <div class="absolute top-5 left-1/2 -translate-x-1/2 w-20 h-5 rounded-full bg-navy-950 z-20"></div>
                            <div class="relative w-full h-full rounded-[30px] overflow-hidden bg-white">
                                <img src="/images/screen-drawer.jpg" alt="Auxilio Agente — Officer drawer" class="absolute inset-0 w-full h-full object-cover object-top" />
                            </div>
                        </div>
                    </div>
                </div>
                <div class="lg:col-span-7">
                    <p class="reveal text-xs font-mono uppercase tracking-[.2em] text-brand-600">05 · Officer control</p>
                    <h2 class="reveal reveal-delay-1 mt-4 font-display font-extrabold text-3xl sm:text-4xl lg:text-5xl tracking-tight text-navy-900">
                        One drawer. <span class="text-navy-700">Every shift function.</span>
                    </h2>
                    <p class="reveal reveal-delay-2 mt-5 text-navy-700/80 leading-relaxed max-w-xl">
                        Dashboard, chat, history, contacts, networks, support — Auxilio Agente collapses every admin surface a working officer needs into a single drawer.
                    </p>
                    <div class="reveal reveal-delay-3 mt-8 grid grid-cols-2 sm:grid-cols-4 gap-3">
                        @foreach (['Dashboard','Profile','Chat','History','Network','Contact','Setting','Help'] as $item)
                            <div class="group flex flex-col items-start gap-3 rounded-md border border-ink-100 bg-white p-4 shadow-sm hover:border-brand-200 hover:shadow-lg transition">
                                <span class="flex w-9 h-9 items-center justify-center rounded-lg bg-navy-900 text-white group-hover:bg-brand-600 transition-colors">
                                    <svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0h6"/></svg>
                                </span>
                                <div class="font-display text-sm font-bold text-navy-900">{{ $item }}</div>
                            </div>
                        @endforeach
                    </div>
                </div>
            </div>
        </div>
    </section>

    {{-- ========== A SHIFT UNFOLDS — TIMELINE ========== --}}
    <section class="relative bg-white">
        <div class="mx-auto max-w-7xl px-5 sm:px-8 py-20 lg:py-28">
            <div class="text-center max-w-2xl mx-auto">
                <p class="reveal text-xs font-mono uppercase tracking-[.2em] text-brand-600">A shift unfolds</p>
                <h2 class="reveal reveal-delay-1 mt-4 font-display font-extrabold text-3xl sm:text-4xl lg:text-5xl tracking-tight text-navy-900">
                    From <span class="text-brand-600">06:00</span> to <span class="text-navy-700">06:00.</span>
                </h2>
                <p class="reveal reveal-delay-2 mt-5 text-navy-700/80 leading-relaxed">
                    Twelve hours on the road. Twelve hours where Auxilio Agente carries the dispatch radio, the field notebook, the camera, the supervisor, and the safety net — in one badge-thin app.
                </p>
            </div>

            <div class="mt-14 relative">
                <span class="hidden lg:block absolute left-0 right-0 top-[140px] h-px bg-gradient-to-r from-transparent via-brand-300 to-transparent"></span>
                <div class="reveal stagger grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
                    @foreach ([
                        ['t'=>'06:00','sub'=>'Roll call','img'=>'/images/scene-dispatch.jpg','title'=>'Suit up','desc'=>'Daily briefing auto-syncs to the officer&rsquo;s feed. Hot zones, BOLO photos, and shift partner pinned to the top.'],
                        ['t'=>'10:42','sub'=>'Patrol','img'=>'/images/scene-traffic.jpg','title'=>'Traffic stop','desc'=>'Plate OCR runs on lift. Driver record, registration status, and prior contacts pre-loaded before the officer steps out.'],
                        ['t'=>'14:18','sub'=>'Dispatch','img'=>'/images/scene-patrol.jpg','title'=>'Active call','desc'=>'Cohort radar pings 5km. Closest officer accepts in 1.2s. Family network gets a safety ping in parallel.'],
                        ['t'=>'22:55','sub'=>'Night beat','img'=>'/images/scene-night.jpg','title'=>'Wrap &amp; review','desc'=>'Reports auto-compile from the day&rsquo;s captures. Supervisor sign-off, eSig, archived — before clock-out.'],
                    ] as $i => $step)
                        <article class="relative rounded-md overflow-hidden bg-white border border-ink-100 shadow-md hover:shadow-2xl transition-shadow">
                            <div class="relative h-44 overflow-hidden">
                                <img src="{{ $step['img'] }}" alt="{{ $step['title'] }}" class="absolute inset-0 w-full h-full object-cover" />
                                <div class="absolute inset-0 bg-gradient-to-t from-navy-950/80 via-navy-950/20 to-transparent"></div>
                                <div class="absolute top-3 left-3 inline-flex items-center gap-2 rounded-md bg-navy-950/85 backdrop-blur px-2.5 py-1">
                                    <span class="font-mono text-[10px] uppercase tracking-[.2em] text-brand-300 font-bold">{{ $step['t'] }}</span>
                                    <span class="w-px h-2.5 bg-white/30"></span>
                                    <span class="font-mono text-[10px] uppercase tracking-[.18em] text-white/85">{{ $step['sub'] }}</span>
                                </div>
                            </div>
                            <div class="hidden lg:flex absolute -top-3 left-1/2 -translate-x-1/2 w-6 h-6 items-center justify-center rounded-full bg-white shadow-md ring-2 ring-brand-200 z-10">
                                <span class="timeline-dot block w-2.5 h-2.5 rounded-full bg-brand-600"></span>
                            </div>
                            <div class="p-5">
                                <h3 class="font-display text-lg font-bold text-navy-900">{{ $step['title'] }}</h3>
                                <p class="mt-1.5 text-[13px] text-navy-700/80 leading-relaxed">{!! $step['desc'] !!}</p>
                            </div>
                        </article>
                    @endforeach
                </div>
            </div>
        </div>
    </section>

    {{-- ========== OFFICER TESTIMONIALS ========== --}}
    <section class="relative bg-navy-50">
        <div class="mx-auto max-w-7xl px-5 sm:px-8 py-20 lg:py-28">
            <div class="grid lg:grid-cols-12 gap-12 items-end">
                <div class="lg:col-span-5">
                    <p class="reveal text-xs font-mono uppercase tracking-[.2em] text-brand-600">In their own words</p>
                    <h2 class="reveal reveal-delay-1 mt-4 font-display font-extrabold text-3xl sm:text-4xl lg:text-5xl tracking-tight text-navy-900">
                        Officers who use it <br/><span class="text-brand-600">won&rsquo;t go back.</span>
                    </h2>
                    <p class="reveal reveal-delay-2 mt-5 text-navy-700/80 leading-relaxed">
                        Auxilio Agente is in active rotation across multiple departments — from precinct beat patrol to highway response. Here&rsquo;s what the badges that carry it every shift have to say.
                    </p>
                </div>
                <div class="lg:col-span-7">
                    <div class="reveal stagger grid sm:grid-cols-2 gap-5">
                        @foreach ([
                            ['img'=>'/images/officer-1.jpg','name'=>'Ofc. M. Ramos','rank'=>'Beat patrol · 8 yrs','quote'=>'I used to lose 5 minutes per call just on radio confirmations. Now I tap once and the squad already knows where I am.','accent'=>'#FB0606'],
                            ['img'=>'/images/officer-2.jpg','name'=>'Sgt. D. Patel','rank'=>'Squad supervisor · 12 yrs','quote'=>'The cohort map changed how I deploy backup. I can see who&rsquo;s actually free instead of guessing from chatter.','accent'=>'#1d4ed8'],
                            ['img'=>'/images/officer-3.jpg','name'=>'Cpl. A. Nguyen','rank'=>'Highway response · 6 yrs','quote'=>'Plate OCR + auto-report cut my paperwork in half. I finish a shift and the reports are done.','accent'=>'#FB0606'],
                            ['img'=>'/images/officer-4.jpg','name'=>'Ofc. L. Coleman','rank'=>'Community policing · 4 yrs','quote'=>'My family used to worry every shift. Now they get a single safe-arrival ping when I clock in. That&rsquo;s priceless.','accent'=>'#0c1126'],
                        ] as $q)
                            <figure class="group relative rounded-md bg-white border border-ink-100 p-6 shadow-sm hover:shadow-xl transition">
                                <svg class="absolute top-5 right-5 w-8 h-8 text-brand-100" viewBox="0 0 32 32" fill="currentColor"><path d="M9 8c-3.3 0-6 2.7-6 6v10h10V14H6c0-1.7 1.3-3 3-3V8zm14 0c-3.3 0-6 2.7-6 6v10h10V14h-7c0-1.7 1.3-3 3-3V8z"/></svg>
                                <blockquote class="font-display text-[15px] leading-relaxed text-navy-800 relative">
                                    &ldquo;{{ $q['quote'] }}&rdquo;
                                </blockquote>
                                <figcaption class="mt-5 flex items-center gap-3 pt-4 border-t border-ink-100">
                                    <span class="block w-11 h-11 rounded-full overflow-hidden ring-2" style="--tw-ring-color:{{ $q['accent'] }};box-shadow:0 0 0 2px {{ $q['accent'] }}">
                                        <img src="{{ $q['img'] }}" alt="{{ $q['name'] }}" class="w-full h-full object-cover" />
                                    </span>
                                    <div>
                                        <div class="font-display text-sm font-bold text-navy-900">{{ $q['name'] }}</div>
                                        <div class="mt-0.5 font-mono text-[10px] uppercase tracking-[.18em] text-ink-500">{{ $q['rank'] }}</div>
                                    </div>
                                </figcaption>
                            </figure>
                        @endforeach
                    </div>
                </div>
            </div>
        </div>
    </section>

    {{-- ========== STATS ========== --}}
    <section class="relative bg-white">
        <div class="mx-auto max-w-7xl px-5 sm:px-8 py-20 lg:py-28">
            <div class="text-center max-w-2xl mx-auto">
                <p class="reveal text-xs font-mono uppercase tracking-[.2em] text-brand-600">By the numbers</p>
                <h2 class="reveal reveal-delay-1 mt-4 font-display font-extrabold text-3xl sm:text-4xl lg:text-5xl tracking-tight text-navy-900">12,400 officers. <span class="text-brand-600">One protocol.</span></h2>
            </div>
            <div class="reveal mt-12 grid sm:grid-cols-2 lg:grid-cols-4 gap-4" data-agent-stats>
                @foreach ([
                    ['icon'=>'M17 20h5v-2a4 4 0 00-3-3.87M9 20H4v-2a4 4 0 013-3.87m6-3.13a4 4 0 100-8 4 4 0 000 8z','to'=>'12400','decimals'=>'0','suffix'=>'+','label'=>'Officers on platform'],
                    ['icon'=>'M12 6v6l4 2m6-2a10 10 0 11-20 0 10 10 0 0120 0z','to'=>'12','decimals'=>'1','suffix'=>'s','label'=>'Avg accept time'],
                    ['icon'=>'M17.657 16.657L13.414 20.9a2 2 0 01-2.828 0l-4.243-4.243a8 8 0 1111.314 0zM15 11a3 3 0 11-6 0 3 3 0 016 0z','to'=>'5','decimals'=>'0','suffix'=>'km','label'=>'Cohort radius'],
                    ['icon'=>'M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z','to'=>'998','decimals'=>'2','suffix'=>'%','label'=>'Channel uptime'],
                ] as $s)
                    <div class="rounded-md border border-ink-100 bg-white p-6 shadow-sm hover:shadow-lg transition group">
                        <span class="flex w-10 h-10 items-center justify-center rounded-lg bg-brand-50 text-brand-600 group-hover:bg-brand-100 transition"><svg class="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="{{ $s['icon'] }}"/></svg></span>
                        <div class="mt-5 font-display text-4xl font-extrabold tracking-tight text-navy-900"><span data-stat-num data-stat-to="{{ $s['to'] }}" data-stat-decimals="{{ $s['decimals'] }}">0</span><span class="text-brand-600">{{ $s['suffix'] }}</span></div>
                        <div class="mt-1 font-mono text-[10.5px] uppercase tracking-[.18em] text-ink-500">{{ $s['label'] }}</div>
                    </div>
                @endforeach
            </div>
        </div>
    </section>

    {{-- ========== CTA ========== --}}
    <section class="relative">
        <div class="mx-auto max-w-7xl px-5 sm:px-8 py-20 lg:py-28">
            <div class="reveal rounded-md bg-gradient-to-br from-navy-950 to-navy-900 text-white p-8 lg:p-14 text-center overflow-hidden relative">
                <div class="pointer-events-none absolute inset-0 -z-0">
                    <div class="absolute left-1/2 top-1/2 w-[680px] h-[680px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-brand-500/15 blur-3xl"></div>
                </div>
                <div class="relative z-10">
                    <span class="inline-flex items-center gap-2 rounded-md border border-brand-400/30 bg-brand-500/10 px-3 py-1.5 text-[11px] font-mono uppercase tracking-[.2em] text-brand-300">
                        <span class="relative flex w-1.5 h-1.5">
                            <span class="absolute inset-0 rounded-full bg-brand-400 animate-ping opacity-70"></span>
                            <span class="relative w-1.5 h-1.5 rounded-full bg-brand-400"></span>
                        </span>
                        Available now · iOS 16+ · Android 13+
                    </span>
                    <h2 class="mt-6 font-display font-extrabold text-3xl sm:text-4xl lg:text-5xl">
                        Put Auxilio Agente on <span class="text-brand-400">every badge.</span>
                    </h2>
                    <p class="mt-4 max-w-xl mx-auto text-navy-200/90">Government-vetted distribution. Department-wide rollout in under 48 hours. Single sign-on against your existing officer roster.</p>
                    <div class="mt-8 flex flex-wrap items-center justify-center gap-3">
                        <a href="#" class="inline-flex shrink-0 transition hover:-translate-y-0.5 hover:opacity-95 rounded-lg">
                            <img src="/images/app-store-badge.png" alt="Download on the App Store" class="h-12 w-auto rounded-lg shadow-md" />
                        </a>
                        <a href="#" class="inline-flex shrink-0 transition hover:-translate-y-0.5 hover:opacity-95 rounded-lg">
                            <img src="/images/google-play-badge.png" alt="Get it on Google Play" class="h-12 w-auto rounded-lg shadow-md" />
                        </a>
                        <a data-route href="#/contact" class="inline-flex items-center gap-2 rounded-md border border-white/20 text-white hover:bg-white/10 px-5 py-3 text-sm font-semibold transition">
                            Department rollout
                            <svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M5 12h14m0 0l-6-6m6 6l-6 6"/></svg>
                        </a>
                    </div>
                    <div class="mt-10 flex flex-wrap items-center justify-center gap-x-8 gap-y-3 font-mono text-[10.5px] uppercase tracking-[.18em] text-navy-300">
                        <span>SOC 2 Type II</span>
                        <span class="w-1 h-1 rounded-full bg-navy-500"></span>
                        <span>CJIS Compliant</span>
                        <span class="w-1 h-1 rounded-full bg-navy-500"></span>
                        <span>AES-256 Channel</span>
                        <span class="w-1 h-1 rounded-full bg-navy-500"></span>
                        <span>Zero-trust Auth</span>
                    </div>
                </div>
            </div>
        </div>
    </section>

    <script>
    (function(){
        // Header color: navy on /agent-app, brand red elsewhere
        var navEl = document.querySelector('header[data-nav]');
        var RED = '#FB0606';
        var NAVY = '#0c1126';
        function setNav() {
            if (!navEl) return;
            var isAgent = (location.hash || '#/').indexOf('#/agent-app') === 0;
            navEl.style.backgroundColor = isAgent ? NAVY : RED;
        }
        setNav();
        window.addEventListener('hashchange', setNav);

        var car = document.querySelector('[data-agent-carousel]');
        if (car) {
            var imgs = ['/images/screen-companion.png','/images/screen-location.png','/images/screen-sos.png','/images/screen-map.png'];
            var img = car.querySelector('[data-onboard-img]');
            var slides = car.querySelectorAll('[data-onboard-slide]');
            var dots = car.querySelectorAll('[data-onboard-dot]');
            var counter = car.querySelector('[data-onboard-counter]');
            var prev = car.querySelector('[data-onboard-prev]');
            var next = car.querySelector('[data-onboard-next]');
            var i = 0;
            function go(n) {
                i = (n + slides.length) % slides.length;
                if (img) { img.style.opacity = '0'; setTimeout(function(){ img.src = imgs[i]; img.style.opacity = '1'; }, 150); }
                slides.forEach(function(s, idx){
                    if (idx === i) {
                        s.setAttribute('data-active','');
                        s.className = 'cursor-pointer rounded-md border-2 border-brand-200 bg-white p-5 lg:p-6 shadow-lg transition';
                        var badge = s.querySelector('span'); if (badge) badge.className = 'flex w-10 h-10 shrink-0 items-center justify-center rounded-full bg-red-600 text-white font-display font-bold';
                    } else {
                        s.removeAttribute('data-active');
                        s.className = 'cursor-pointer rounded-md border-2 border-ink-100 bg-white p-5 lg:p-6 shadow-sm hover:border-brand-200 hover:shadow-md transition';
                        var badge2 = s.querySelector('span'); if (badge2) badge2.className = 'flex w-10 h-10 shrink-0 items-center justify-center rounded-full bg-navy-100 text-navy-700 font-display font-bold';
                    }
                });
                dots.forEach(function(d, idx){ d.className = idx === i ? 'w-2 h-2 rounded-full bg-red-600 transition cursor-pointer' : 'w-2 h-2 rounded-full bg-navy-200 transition cursor-pointer'; });
                if (counter) counter.textContent = String(i+1).padStart(2,'0') + ' / ' + String(slides.length).padStart(2,'0');
            }
            slides.forEach(function(s){ s.addEventListener('click', function(){ go(parseInt(s.getAttribute('data-onboard-slide'),10)); }); });
            dots.forEach(function(d){ d.addEventListener('click', function(){ go(parseInt(d.getAttribute('data-onboard-dot'),10)); }); });
            if (prev) prev.addEventListener('click', function(){ go(i-1); });
            if (next) next.addEventListener('click', function(){ go(i+1); });
            setInterval(function(){
                var view = document.querySelector('[data-view="agent-app"]');
                if (view && !view.classList.contains('hidden') && document.visibilityState === 'visible') go(i+1);
            }, 5000);
        }
        var stats = document.querySelector('[data-agent-stats]');
        if (stats) {
            var nums = stats.querySelectorAll('[data-stat-num]');
            var animated = false;
            function animate() {
                if (animated) return;
                animated = true;
                nums.forEach(function(el){
                    var to = parseFloat(el.getAttribute('data-stat-to'));
                    var decimals = parseInt(el.getAttribute('data-stat-decimals') || '0', 10);
                    var duration = 1400, start = performance.now();
                    function tick(now) {
                        var t = Math.min((now - start) / duration, 1);
                        var eased = 1 - Math.pow(1 - t, 3);
                        var val = to * eased;
                        el.textContent = decimals > 0 ? val.toFixed(decimals) : Math.round(val).toLocaleString();
                        if (t < 1) requestAnimationFrame(tick);
                    }
                    requestAnimationFrame(tick);
                });
            }
            if ('IntersectionObserver' in window) {
                var io = new IntersectionObserver(function(entries){
                    entries.forEach(function(e){ if (e.isIntersecting) { animate(); io.disconnect(); } });
                }, { threshold: 0.3 });
                io.observe(stats);
            } else animate();
            window.addEventListener('hashchange', function(){
                if (location.hash === '#/agent-app') { animated = false; setTimeout(animate, 200); }
            });
        }
    })();
    </script>
</div>

{{-- ============================================================
     CITIZEN APP VIEW
============================================================--}}
<div data-view="citizen-app" class="hidden">
    <style>
        /* ============ CITIZEN PAGE — premium, emotional, family-focused ============ */

        [data-view="citizen-app"] {
            --c-red: #FB0606;
            --c-red-deep: #b80505;
            --c-navy: #0a1224;
            --c-navy-soft: #131c36;
            --c-warm: #f7f3ee;
            --c-amber: #f5c844;
        }

        /* ---- HERO (light, family-warm) ---- */
        [data-view="citizen-app"] .citizen-hero {
            background:
                radial-gradient(900px 600px at 12% 18%, rgba(251,6,6,.10), transparent 60%),
                radial-gradient(700px 500px at 88% 25%, rgba(245,200,68,.12), transparent 55%),
                radial-gradient(700px 500px at 50% 100%, rgba(70,130,255,.08), transparent 60%),
                linear-gradient(180deg, #f7f3ee 0%, #fbf8f3 50%, #ffffff 100%);
        }
        [data-view="citizen-app"] .citizen-hero::before {
            content:""; position:absolute; inset:0; pointer-events:none; opacity:.4;
            background-image:
                linear-gradient(rgba(15,20,40,.06) 1px, transparent 1px),
                linear-gradient(90deg, rgba(15,20,40,.06) 1px, transparent 1px);
            background-size: 56px 56px;
            mask-image: radial-gradient(circle at 50% 40%, black, transparent 75%);
        }
        [data-view="citizen-app"] .citizen-hero::after {
            content:""; position:absolute; inset:0; pointer-events:none;
            background:
                radial-gradient(2px 2px at 20% 30%, rgba(251,6,6,.18) 0, transparent 50%),
                radial-gradient(1px 1px at 80% 60%, rgba(245,200,68,.30) 0, transparent 50%),
                radial-gradient(1.5px 1.5px at 60% 20%, rgba(251,6,6,.20) 0, transparent 50%),
                radial-gradient(1px 1px at 35% 75%, rgba(70,130,255,.18) 0, transparent 50%),
                radial-gradient(1.5px 1.5px at 90% 35%, rgba(245,200,68,.22) 0, transparent 50%);
            background-size: 100% 100%;
            animation: starsTwinkle 6s ease-in-out infinite alternate;
        }
        @keyframes starsTwinkle { from { opacity:.35 } to { opacity:.85 } }

        /* ---- gradient-shift CTA / hero accents ---- */
        [data-view="citizen-app"] .moving-gradient {
            background: linear-gradient(120deg, #FB0606 0%, #ff5b3c 25%, #FB0606 50%, #ff8a4a 75%, #FB0606 100%);
            background-size: 250% 100%;
            animation: gradShift 8s ease-in-out infinite;
        }
        @keyframes gradShift { 0%,100% { background-position: 0% 50%; } 50% { background-position: 100% 50%; } }

        /* ---- pulse rings ---- */
        [data-view="citizen-app"] .ring-pulse {
            position:absolute; inset:0; border-radius:9999px;
            border:2px solid rgba(251,6,6,.55);
            animation: ringPulse 2.4s ease-out infinite;
        }
        [data-view="citizen-app"] .ring-pulse.delay-1 { animation-delay:.6s; }
        [data-view="citizen-app"] .ring-pulse.delay-2 { animation-delay:1.2s; }
        @keyframes ringPulse {
            0%   { transform: scale(1);   opacity:.8; }
            70%  { transform: scale(2.2); opacity:0; }
            100% { transform: scale(2.2); opacity:0; }
        }

        /* ---- floating cards ---- */
        [data-view="citizen-app"] .float-card  { animation: floatY 6s ease-in-out infinite; }
        [data-view="citizen-app"] .float-card.delay-1 { animation-delay:.8s; }
        [data-view="citizen-app"] .float-card.delay-2 { animation-delay:1.6s; }
        [data-view="citizen-app"] .float-slow  { animation: floatY 8s ease-in-out infinite; }
        @keyframes floatY {
            0%,100% { transform: translateY(0); }
            50%     { transform: translateY(-12px); }
        }

        /* ---- floating shapes (emergency-themed deco) ---- */
        [data-view="citizen-app"] .deco-shape {
            position:absolute; border-radius:9999px; pointer-events:none; opacity:.55;
            background: radial-gradient(circle, rgba(251,6,6,.35) 0%, rgba(251,6,6,0) 70%);
            filter: blur(8px);
            animation: floatY 9s ease-in-out infinite;
        }

        /* ---- bento dark cards ---- */
        [data-view="citizen-app"] .bento-dark {
            background: linear-gradient(160deg, #0d1b2a 0%, #08111f 100%);
        }
        [data-view="citizen-app"] .bento-dark::before {
            content:""; position:absolute; inset:0; opacity:.16; pointer-events:none;
            background-image: radial-gradient(rgba(255,255,255,.6) 1px, transparent 1px);
            background-size: 18px 18px;
        }

        /* ---- counter ---- */
        [data-view="citizen-app"] .citizen-counter { font-variant-numeric: tabular-nums; }

        /* ---- FAQ ---- */
        [data-view="citizen-app"] [data-faq-item][data-open] [data-faq-icon] { transform: rotate(180deg); }
        [data-view="citizen-app"] [data-faq-item] [data-faq-body] {
            max-height: 0; opacity: 0; overflow: hidden;
            transition: max-height .35s ease, opacity .3s ease, padding .3s ease;
        }
        [data-view="citizen-app"] [data-faq-item][data-open] [data-faq-body] {
            max-height: 480px; opacity: 1;
        }

        /* ---- scenario hover lift ---- */
        [data-view="citizen-app"] .scenario-tile { transition: transform .45s cubic-bezier(.22,1,.36,1), box-shadow .45s; }
        [data-view="citizen-app"] .scenario-tile:hover { transform: translateY(-6px); }

        /* ---- marquee ---- */
        [data-view="citizen-app"] .marquee-track {
            display:flex; gap:1.25rem; width:max-content; animation: marquee 38s linear infinite;
        }
        @keyframes marquee {
            from { transform: translateX(0); }
            to   { transform: translateX(-50%); }
        }

        /* ---- step indicator gradient ---- */
        [data-view="citizen-app"] .step-line {
            background: linear-gradient(180deg, #10b981 0%, #10b981 var(--p,0%), #e5e7eb var(--p,0%) 100%);
        }

        /* ---- emergency types gallery (auto-rotating) ---- */
        [data-view="citizen-app"] .em-big-card {
            position: relative;
            transition: transform .6s cubic-bezier(.22,1,.36,1), box-shadow .6s;
            isolation: isolate;
        }
        [data-view="citizen-app"] .em-big-card:hover { transform: translateY(-6px); box-shadow: 0 40px 70px -28px rgba(0,0,0,.45); }
        [data-view="citizen-app"] .em-big-card .em-inner { position: relative; aspect-ratio: 4/5; overflow: hidden; }
        [data-view="citizen-app"] .em-big-card .em-img { transition: transform 1.4s cubic-bezier(.22,1,.36,1), filter .6s; }
        [data-view="citizen-app"] .em-big-card:hover .em-img { transform: scale(1.07); filter: saturate(1.15); }
        [data-view="citizen-app"] .em-big-card .em-icon-chip { transition: transform .45s cubic-bezier(.22,1,.36,1); }
        [data-view="citizen-app"] .em-big-card:hover .em-icon-chip { transform: rotate(-6deg) scale(1.06); }
        /* fade transition between rotations */
        [data-view="citizen-app"] [data-em-slot] { transition: opacity .55s ease; }
        [data-view="citizen-app"] [data-em-slot].em-fade-out { opacity: 0; }
        /* dot active state */
        [data-view="citizen-app"] [data-em-page].is-active { background: var(--c-red); transform: scale(1.4); }
        [data-view="citizen-app"] [data-em-page] { transition: background .25s ease, transform .25s ease; }
        /* rich illustration backgrounds for cards without an image */
        [data-view="citizen-app"] .em-illust-bg::before {
            content:""; position:absolute; inset:0; opacity:.35;
            background-image:
              radial-gradient(circle at 25% 25%, rgba(255,255,255,.45) 1px, transparent 1.5px),
              radial-gradient(circle at 75% 60%, rgba(255,255,255,.35) 1px, transparent 1.5px);
            background-size: 32px 32px;
        }
        [data-view="citizen-app"] .em-illust-bg::after {
            content:""; position:absolute; inset:-30%;
            background:
              radial-gradient(circle at 20% 20%, rgba(255,255,255,.18), transparent 45%),
              radial-gradient(circle at 80% 80%, rgba(255,255,255,.10), transparent 45%);
            pointer-events:none;
        }

        /* ---- stagger reveal helper ---- */
        [data-view="citizen-app"] .stagger-in > * { opacity:0; transform: translateY(28px); transition: opacity .7s ease, transform .7s cubic-bezier(.22,1,.36,1); }
        [data-view="citizen-app"] .stagger-in.is-in > * { opacity:1; transform: none; }
        [data-view="citizen-app"] .stagger-in.is-in > *:nth-child(1) { transition-delay: .04s; }
        [data-view="citizen-app"] .stagger-in.is-in > *:nth-child(2) { transition-delay: .12s; }
        [data-view="citizen-app"] .stagger-in.is-in > *:nth-child(3) { transition-delay: .2s; }
        [data-view="citizen-app"] .stagger-in.is-in > *:nth-child(4) { transition-delay: .28s; }
        [data-view="citizen-app"] .stagger-in.is-in > *:nth-child(5) { transition-delay: .36s; }
        [data-view="citizen-app"] .stagger-in.is-in > *:nth-child(6) { transition-delay: .44s; }
        [data-view="citizen-app"] .stagger-in.is-in > *:nth-child(7) { transition-delay: .52s; }
        [data-view="citizen-app"] .stagger-in.is-in > *:nth-child(8) { transition-delay: .6s; }
        [data-view="citizen-app"] .stagger-in.is-in > *:nth-child(9) { transition-delay: .68s; }
        [data-view="citizen-app"] .stagger-in.is-in > *:nth-child(10) { transition-delay: .76s; }

        /* ---- gentle fade-up for storytelling sections ---- */
        [data-view="citizen-app"] .fade-up { opacity:0; transform: translateY(34px); transition: opacity .9s ease, transform .9s cubic-bezier(.22,1,.36,1); }
        [data-view="citizen-app"] .fade-up.is-in { opacity:1; transform:none; }

        /* ---- gradient text ---- */
        [data-view="citizen-app"] .grad-red {
            background: linear-gradient(120deg, #FB0606 0%, #ff5b3c 50%, #f5c844 100%);
            -webkit-background-clip: text; background-clip: text; color: transparent;
        }

        /* ---- glassmorph card ---- */
        [data-view="citizen-app"] .glass {
            background: rgba(255,255,255,.08);
            backdrop-filter: blur(14px);
            -webkit-backdrop-filter: blur(14px);
            border: 1px solid rgba(255,255,255,.18);
        }
        [data-view="citizen-app"] .glass-light {
            background: rgba(255,255,255,.65);
            backdrop-filter: blur(14px);
            -webkit-backdrop-filter: blur(14px);
            border: 1px solid rgba(255,255,255,.6);
        }

        /* ---- pulse beacon ---- */
        [data-view="citizen-app"] .beacon {
            position:relative; display:inline-flex; width:10px; height:10px; border-radius:9999px;
            background:#10b981;
        }
        [data-view="citizen-app"] .beacon::before {
            content:""; position:absolute; inset:-6px; border-radius:9999px;
            border:2px solid rgba(16,185,129,.5); animation: beaconPulse 1.8s ease-out infinite;
        }
        @keyframes beaconPulse {
            0% { transform:scale(.6); opacity:1; }
            80%, 100% { transform:scale(2); opacity:0; }
        }

        /* ---- soft tilt for image frames ---- */
        [data-view="citizen-app"] .tilt-l { transform: rotate(-2deg); }
        [data-view="citizen-app"] .tilt-r { transform: rotate(2deg); }

        /* ---- shadow utility ---- */
        [data-view="citizen-app"] .lush-shadow { box-shadow: 0 40px 80px -30px rgba(15,20,40,.4), 0 12px 30px -15px rgba(251,6,6,.18); }

        /* ---- alert dot bouncing ---- */
        [data-view="citizen-app"] .alert-bounce { animation: bounceY 2.4s ease-in-out infinite; }
        @keyframes bounceY {
            0%,100% { transform: translateY(0); }
            50%     { transform: translateY(-6px); }
        }

        /* ---- prefers-reduced-motion ---- */
        @media (prefers-reduced-motion: reduce) {
            [data-view="citizen-app"] *,
            [data-view="citizen-app"] *::before,
            [data-view="citizen-app"] *::after {
                animation: none !important;
                transition-duration: .001ms !important;
            }
        }
    </style>

    {{-- ========== HERO — light, emotional, family-focused ========== --}}
    <section class="citizen-hero relative overflow-hidden text-navy-900">
        {{-- ambient floating shapes (warm, soft on light bg) --}}
        <span class="deco-shape" style="top:8%;  left:6%;  width:120px; height:120px; background:radial-gradient(circle, rgba(251,6,6,.18) 0%, transparent 70%); opacity:.6;"></span>
        <span class="deco-shape" style="top:62%; left:3%;  width:80px;  height:80px;  background:radial-gradient(circle, rgba(245,200,68,.32) 0%, transparent 70%); animation-delay:1.2s;"></span>
        <span class="deco-shape" style="top:18%; right:5%; width:140px; height:140px; background:radial-gradient(circle, rgba(70,130,255,.22) 0%, transparent 70%); animation-delay:2.4s;"></span>
        <span class="deco-shape" style="bottom:8%; right:18%; width:100px; height:100px; background:radial-gradient(circle, rgba(251,6,6,.16) 0%, transparent 70%); animation-delay:3.6s;"></span>

        <div class="relative mx-auto max-w-7xl px-5 sm:px-8 py-16 lg:py-24">
            <div class="grid lg:grid-cols-12 gap-10 lg:gap-14 items-center">
                <div class="lg:col-span-6">
                    <span class="reveal reveal-delay-1 inline-flex items-center gap-2 rounded-full bg-brand-50 ring-1 ring-brand-100 text-brand-700 text-xs font-bold uppercase tracking-wider px-3 py-1.5">
                        <span class="relative flex w-1.5 h-1.5">
                            <span class="absolute inset-0 rounded-full bg-brand-600 animate-ping opacity-70"></span>
                            <span class="relative w-1.5 h-1.5 rounded-full bg-brand-600"></span>
                        </span>
                        Auxilio Citizen · iOS &amp; Android · Free for families
                    </span>
                    <h1 class="reveal reveal-delay-2 mt-5 font-display font-extrabold text-4xl sm:text-5xl lg:text-[64px] xl:text-[72px] leading-[1.02] tracking-tight text-navy-900">
                        Protect the people<br/>
                        <span class="grad-red">you love most.</span>
                    </h1>
                    <p class="reveal reveal-delay-3 mt-6 text-lg text-navy-700/80 max-w-xl leading-relaxed">
                        From a child's walk home, to a parent's late-night drive, to a sudden emergency in the kitchen — Auxilio puts real, verified help one tap away. Built for families. Trusted by communities.
                    </p>
                    <div class="reveal reveal-delay-4 mt-8 flex flex-wrap items-center gap-3">
                        <a href="#" class="inline-flex shrink-0 transition hover:-translate-y-0.5 hover:opacity-95 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-500 rounded-lg"><img src="/images/app-store-badge.png" alt="Download on the App Store" class="h-12 sm:h-14 w-auto rounded-lg shadow-md" /></a>
                        <a href="#" class="inline-flex shrink-0 transition hover:-translate-y-0.5 hover:opacity-95 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-500 rounded-lg"><img src="/images/google-play-badge.png" alt="Get it on Google Play" class="h-12 sm:h-14 w-auto rounded-lg shadow-md" /></a>
                    </div>
                    <dl class="reveal reveal-delay-4 mt-10 grid grid-cols-2 sm:grid-cols-4 gap-x-6 gap-y-5 max-w-xl">
                        @foreach ([
                            ['v'=>'1-tap','l'=>'SOS to dispatch'],
                            ['v'=>'24/7','l'=>'family monitoring'],
                            ['v'=>'Live','l'=>'safety alerts'],
                            ['v'=>'Free','l'=>'forever for families'],
                        ] as $s)
                            <div>
                                <dt class="font-display text-2xl font-bold tracking-tight text-navy-900">{{ $s['v'] }}</dt>
                                <dd class="mt-1 font-mono text-[10.5px] uppercase tracking-[.18em] text-ink-500">{{ $s['l'] }}</dd>
                            </div>
                        @endforeach
                    </dl>

                    {{-- Social proof block --}}
                    <div class="reveal reveal-delay-4 mt-10 max-w-xl">
                        <div class="flex items-center gap-4">
                            <div class="flex items-center -space-x-3 shrink-0">
                                <img src="/images/officer-1.jpg" alt="" class="w-10 h-10 rounded-full ring-2 ring-white object-cover" />
                                <img src="/images/officer-2.jpg" alt="" class="w-10 h-10 rounded-full ring-2 ring-white object-cover" />
                                <img src="/images/officer-3.jpg" alt="" class="w-10 h-10 rounded-full ring-2 ring-white object-cover" />
                                <img src="/images/officer-4.jpg" alt="" class="w-10 h-10 rounded-full ring-2 ring-white object-cover" />
                                <span class="w-10 h-10 grid place-items-center rounded-full ring-2 ring-white bg-emerald-500 text-white font-display font-bold text-[11px]">5K</span>
                            </div>
                            <p class="font-display text-base font-semibold text-navy-900">5,000+ Verified Officers</p>
                        </div>
                        <p class="mt-3 text-sm text-navy-700/75 leading-relaxed max-w-md">
                            Over 5,000 sworn officers across 30+ departments are answering faster — thanks to Auxilio Agente.
                        </p>
                    </div>
                </div>

                {{-- Hero collage: real FAMILY illustrations + floating live cards --}}
                <div class="reveal reveal-right lg:col-span-6">
                    <div class="relative mx-auto max-w-xl">
                        {{-- ambient warm glow --}}
                        <span class="absolute -inset-10 rounded-[44px] blur-3xl bg-red-500/15 pointer-events-none"></span>
                        <span class="absolute -bottom-10 -left-6 w-48 h-48 rounded-full blur-3xl bg-amber-300/30 pointer-events-none"></span>

                        {{-- main FAMILY illustration (3D family on peach gradient) --}}
                        <div class="relative rounded-[32px] overflow-hidden aspect-[4/5] ring-1 ring-ink-100 lush-shadow float-slow bg-gradient-to-br from-amber-50 via-rose-50 to-amber-100">
                            <img src="/images/citizen/cartoon-family-3d.jpg" alt="A family safely connected with Auxilio" class="absolute inset-0 w-full h-full object-cover" />
                            <div class="absolute inset-0 bg-gradient-to-t from-navy-950/65 via-navy-950/0 to-transparent"></div>

                            {{-- glass status bar --}}
                            <div class="absolute inset-x-4 bottom-4 glass rounded-2xl px-4 py-3 flex items-center gap-3 text-white">
                                <span class="flex w-10 h-10 items-center justify-center rounded-full bg-emerald-500 text-white shadow-lg" style="box-shadow:0 10px 24px -8px rgba(16,185,129,.45)">
                                    <svg class="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.6"><path stroke-linecap="round" stroke-linejoin="round" d="M5 12l5 5L20 7"/></svg>
                                </span>
                                <div class="leading-tight">
                                    <div class="font-mono text-[10px] uppercase tracking-[.18em] text-white/80">Family circle</div>
                                    <div class="font-display text-sm font-bold">4 of 4 protected · Live</div>
                                </div>
                                <span class="ml-auto beacon"></span>
                            </div>
                        </div>

                        {{-- pulsing ALERT ring badge --}}
                        <div class="hidden md:flex absolute -left-7 top-1/3 items-center justify-center w-20 h-20 rounded-full bg-red-600 text-white shadow-2xl ring-4 ring-red-100 z-10">
                            <span class="ring-pulse"></span>
                            <span class="ring-pulse delay-1"></span>
                            <span class="ring-pulse delay-2"></span>
                            <span class="font-display font-extrabold text-[11px] tracking-wider">ALERT</span>
                        </div>

                        {{-- ALERT card — top right --}}
                        <div class="hidden md:flex float-card absolute -right-6 top-8 items-center gap-3 rounded-2xl bg-white px-4 py-3 shadow-2xl ring-1 ring-ink-100 z-10" style="min-width:230px;">
                            <span class="flex w-11 h-11 items-center justify-center rounded-full bg-red-600 text-white shrink-0">
                                <svg class="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4"><path stroke-linecap="round" stroke-linejoin="round" d="M12 9v3.75M2.7 16.13c-.87 1.5.22 3.37 1.95 3.37h14.7c1.73 0 2.82-1.87 1.95-3.37L13.95 3.38c-.87-1.5-3.03-1.5-3.9 0L2.7 16.13z"/></svg>
                            </span>
                            <div class="leading-tight">
                                <div class="font-mono text-[10px] uppercase tracking-[.18em] text-red-600 font-bold">SAFETY ALERT · 0.3 mi</div>
                                <div class="font-display text-[14px] font-bold text-navy-900 mt-0.5">Maya is home safely</div>
                            </div>
                        </div>

                        {{-- RESPONDER card — middle right --}}
                        <div class="hidden md:flex float-card delay-2 absolute -right-12 top-1/2 items-center gap-3 rounded-2xl bg-navy-900 text-white px-4 py-3 shadow-2xl ring-1 ring-white/10 z-10" style="min-width:235px;">
                            <span class="flex w-11 h-11 items-center justify-center rounded-full bg-emerald-400 text-navy-900 shrink-0">
                                <svg class="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4"><path stroke-linecap="round" stroke-linejoin="round" d="M9 12l2 2 4-4"/></svg>
                            </span>
                            <div class="leading-tight">
                                <div class="font-mono text-[10px] uppercase tracking-[.18em] text-emerald-400 font-bold">RESPONDER · 90s</div>
                                <div class="font-display text-[14px] font-bold mt-0.5">Help is on the way</div>
                            </div>
                        </div>

                        {{-- HEARTBEAT mini card — bottom-left, kept well inside image bounds --}}
                        <div class="hidden lg:flex float-card delay-1 absolute -left-10 bottom-28 items-center gap-3 rounded-2xl bg-white px-4 py-3 z-10 text-navy-900 shadow-2xl ring-1 ring-ink-100" style="min-width:200px;">
                            <span class="flex w-10 h-10 items-center justify-center rounded-full bg-rose-500 text-white shrink-0 alert-bounce">
                                <svg class="w-5 h-5" viewBox="0 0 24 24" fill="currentColor"><path d="M12 21s-7-4.35-7-10a5 5 0 019-3 5 5 0 019 3c0 5.65-7 10-7 10z"/></svg>
                            </span>
                            <div class="leading-tight">
                                <div class="font-mono text-[10px] uppercase tracking-[.18em] text-rose-600 font-bold">Family pulse</div>
                                <div class="font-display text-[13px] font-bold">All vitals · normal</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {{-- Trust marquee — extra top space to clear floating cards above --}}
            <div class="reveal mt-32 lg:mt-40 overflow-hidden relative z-0">
                <p class="text-center text-[10.5px] font-mono uppercase tracking-[.28em] text-ink-500 mb-5">Trusted by neighborhoods · families · school districts</p>
                <div class="relative">
                    <div class="marquee-track">
                        @foreach (['Newark PD','Hudson County','Safer Schools NJ','BlockWatch','Bergen Family Trust','Auxilio Network','Newark PD','Hudson County','Safer Schools NJ','BlockWatch','Bergen Family Trust','Auxilio Network'] as $logo)
                            <span class="font-display font-bold text-lg text-navy-900/40 whitespace-nowrap px-6 py-2 rounded-md ring-1 ring-ink-100 bg-white/70">{{ $logo }}</span>
                        @endforeach
                    </div>
                </div>
            </div>
        </div>

        {{-- soft bottom transition into next section --}}
        <div class="absolute inset-x-0 -bottom-px h-24 pointer-events-none" style="background:linear-gradient(180deg, transparent 0%, #ffffff 100%);"></div>
    </section>

    {{-- ========== REAL-LIFE SCENARIOS ========== --}}
    <section class="relative bg-white">
        <div class="mx-auto max-w-7xl px-5 sm:px-8 py-20 lg:py-28">
            <div class="grid lg:grid-cols-12 gap-10 items-end mb-12">
                <div class="lg:col-span-7">
                    <p class="reveal text-xs font-mono uppercase tracking-[.2em] text-brand-600">Built for real life</p>
                    <h2 class="reveal reveal-delay-1 mt-3 font-display font-extrabold text-3xl sm:text-4xl lg:text-5xl tracking-tight text-navy-900">
                        The situations no one wants <span class="text-brand-600">to face alone.</span>
                    </h2>
                </div>
                <div class="lg:col-span-5">
                    <p class="reveal reveal-delay-2 text-navy-700/80 leading-relaxed">
                        Auxilio Citizen is calibrated for the moments that matter most — a suspicious follower at night, a medical emergency at home, or a frightened call from a child on the way back from school.
                    </p>
                </div>
            </div>

            <div class="reveal stagger grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
                @foreach ([
                    ['img'=>'/images/citizen/warning-lamp.jpg',  'tag'=>'01 · STREET',  'title'=>'Walking home at night',      'desc'=>'Auto-share live location with family. Auxilio listens for trouble and pre-arms SOS.'],
                    ['img'=>'/images/citizen/theft-prep.jpg',    'tag'=>'02 · ALERT',   'title'=>'Pickpocket / theft',         'desc'=>'Silent SOS, location lock, and instant officer dispatch — without lifting the phone.'],
                    ['img'=>'/images/citizen/emergency-room.jpg','tag'=>'03 · MEDICAL', 'title'=>'Sudden medical emergency',   'desc'=>'One tap routes paramedics + your saved medical info ahead, so the team is ready on arrival.'],
                    ['img'=>'/images/citizen/threat-wall.jpg',   'tag'=>'04 · ASSAULT', 'title'=>'Domestic threat',            'desc'=>'A discreet panic gesture sends help and quietly records context — even when you can\'t talk.'],
                ] as $sc)
                    <article class="scenario-tile group relative rounded-md overflow-hidden bg-navy-900 text-white shadow-lg ring-1 ring-ink-100">
                        <div class="relative h-60 sm:h-72 overflow-hidden">
                            <img src="{{ $sc['img'] }}" alt="{{ $sc['title'] }}" class="absolute inset-0 w-full h-full object-cover transition duration-500 group-hover:scale-105" />
                            <div class="absolute inset-0 bg-gradient-to-t from-navy-950/95 via-navy-950/40 to-transparent"></div>
                            <span class="absolute top-3 left-3 rounded-md bg-red-600 text-white text-[9.5px] font-mono uppercase tracking-[.18em] px-2 py-0.5 shadow-lg">{{ $sc['tag'] }}</span>
                        </div>
                        <div class="p-5">
                            <h3 class="font-display text-xl font-bold text-white">{{ $sc['title'] }}</h3>
                            <p class="mt-1.5 text-[13px] text-navy-200/90 leading-relaxed">{{ $sc['desc'] }}</p>
                        </div>
                    </article>
                @endforeach
            </div>
        </div>
    </section>


    {{-- ========== TRUST / STATS — cinematic responder + family ========== --}}
    <section class="relative" style="background:linear-gradient(180deg,#f7f3ee 0%, #fbfaf7 100%);">
        <div class="mx-auto max-w-7xl px-5 sm:px-8 py-20 lg:py-28">
            <div class="reveal rounded-[32px] bg-white shadow-2xl ring-1 ring-ink-100 p-6 sm:p-10 lg:p-14 overflow-hidden relative">
                <span class="absolute -top-24 -right-24 w-80 h-80 rounded-full bg-red-600/8 blur-3xl pointer-events-none"></span>
                <span class="absolute -bottom-24 -left-24 w-80 h-80 rounded-full bg-amber-300/15 blur-3xl pointer-events-none"></span>

                <div class="relative grid lg:grid-cols-12 gap-10 lg:gap-14 items-center">
                    <div class="lg:col-span-5">
                        <div class="relative">
                            {{-- main FAMILY photo --}}
                            <div class="relative rounded-[24px] overflow-hidden aspect-[4/5] shadow-2xl ring-1 ring-ink-100 bg-gradient-to-br from-amber-50 via-rose-50 to-amber-100">
                                <img src="/images/citizen/family-safe.jpg" alt="Family protected by Auxilio" class="absolute inset-0 w-full h-full object-cover" />
                                <div class="absolute inset-0 bg-gradient-to-t from-navy-950/55 via-transparent to-transparent"></div>
                                <span class="absolute top-4 left-4 inline-flex items-center gap-2 rounded-full bg-white/95 backdrop-blur px-3 py-1 text-[10.5px] font-mono uppercase tracking-[.18em] text-navy-900 ring-1 ring-white/60 shadow">
                                    <span class="beacon"></span>
                                    Family circle · live
                                </span>
                                <div class="absolute inset-x-4 bottom-4 glass rounded-2xl px-4 py-3 text-white">
                                    <div class="flex items-center gap-3">
                                        <span class="flex w-10 h-10 items-center justify-center rounded-full bg-emerald-500 text-white shrink-0 shadow-lg" style="box-shadow:0 10px 24px -8px rgba(16,185,129,.45)">
                                            <svg class="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4"><path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7"/></svg>
                                        </span>
                                        <div class="leading-tight">
                                            <div class="font-display text-sm font-bold">All 4 family members protected</div>
                                            <div class="font-mono text-[10px] uppercase tracking-[.18em] text-white/70">Mom · Dad · Maya · Leo · home safe</div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {{-- secondary thumbnail: real family photo --}}
                            <div class="hidden md:block absolute -bottom-8 -right-8 w-40 rounded-2xl overflow-hidden ring-2 ring-white shadow-xl tilt-r bg-white">
                                <div class="relative aspect-[4/5]">
                                    <img src="/images/citizen/family-hugging.jpg" alt="Family ready and connected" class="absolute inset-0 w-full h-full object-cover" />
                                    <div class="absolute inset-0 bg-gradient-to-t from-navy-950/55 via-transparent to-transparent"></div>
                                    <span class="absolute bottom-2 left-2 right-2 text-center text-[9.5px] font-mono uppercase tracking-[.16em] text-white">Always together</span>
                                </div>
                            </div>
                            {{-- small accent badge top-left --}}
                            <div class="hidden md:flex absolute -top-5 -left-5 w-36 rounded-2xl bg-white p-3 shadow-xl ring-1 ring-ink-100 items-center gap-2 tilt-l">
                                <span class="flex w-9 h-9 items-center justify-center rounded-full bg-rose-50 text-rose-600 shrink-0">
                                    <svg class="w-5 h-5" viewBox="0 0 24 24" fill="currentColor"><path d="M12 21s-7-4.35-7-10a5 5 0 019-3 5 5 0 019 3c0 5.65-7 10-7 10z"/></svg>
                                </span>
                                <div class="leading-tight">
                                    <div class="font-mono text-[9px] uppercase tracking-[.15em] text-rose-600 font-bold">Loved by</div>
                                    <div class="font-display text-[12px] font-bold text-navy-900">500K+ families</div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="lg:col-span-7">
                        <p class="reveal text-xs font-mono uppercase tracking-[.2em] text-brand-600">Trusted by families nationwide</p>
                        <h2 class="reveal reveal-delay-1 mt-3 font-display font-extrabold text-3xl sm:text-4xl lg:text-5xl leading-[1.05] tracking-tight text-navy-900">
                            Real people. Real responders. <span class="grad-red">Real help — fast.</span>
                        </h2>
                        <p class="reveal reveal-delay-2 mt-5 text-navy-700/80 leading-relaxed max-w-xl">
                            Auxilio is the safety companion families count on every day. From your child's walk home to your parents' late-night drive — we keep you connected, informed, and one tap away from real, accountable help.
                        </p>
                        <div class="reveal reveal-delay-3 mt-7 flex flex-wrap items-center gap-3">
                            <a data-route href="#/about" class="inline-flex items-center gap-2 rounded-full border-2 border-brand-500 text-brand-600 hover:bg-brand-50 px-6 py-2.5 text-sm font-semibold transition">
                                About Auxilio
                                <svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M5 12h14M13 5l7 7-7 7"/></svg>
                            </a>
                            <a href="#emergency-types" class="inline-flex items-center gap-2 rounded-full bg-navy-900 hover:bg-navy-800 text-white px-6 py-2.5 text-sm font-semibold transition shadow-lg">
                                See emergencies we cover
                                <svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M12 5v14m0 0l-6-6m6 6l6-6"/></svg>
                            </a>
                        </div>

                        <dl data-citizen-stats class="mt-10 grid grid-cols-2 gap-x-10 gap-y-8">
                            @foreach ([
                                ['v'=>500,'suffix'=>'K+','l'=>'Families Protected Daily'],
                                ['v'=>98, 'suffix'=>'%', 'l'=>'Faster Family Response'],
                                ['v'=>30, 'suffix'=>'+','l'=>'Cities Live Today'],
                                ['v'=>24, 'suffix'=>'/7','l'=>'Dedicated Emergency Desk'],
                            ] as $s)
                                <div>
                                    <dt class="font-display text-4xl sm:text-5xl font-extrabold tracking-tight text-navy-900 citizen-counter">
                                        <span data-stat-num data-stat-to="{{ $s['v'] }}">0</span><span class="text-brand-600">{{ $s['suffix'] }}</span>
                                    </dt>
                                    <dd class="mt-2 text-sm text-navy-700/80">{{ $s['l'] }}</dd>
                                </div>
                            @endforeach
                        </dl>
                    </div>
                </div>
            </div>
        </div>
    </section>

    {{-- ========== EMERGENCY TYPES — auto-rotating 3-card gallery ========== --}}
    <section id="emergency-types" class="relative overflow-hidden" style="background:linear-gradient(180deg,#fbfaf7 0%, #ffffff 100%);">
        {{-- soft ambient shapes --}}
        <span class="absolute -top-32 left-1/4 w-[420px] h-[420px] rounded-full bg-red-500/10 blur-3xl pointer-events-none"></span>
        <span class="absolute top-1/2 -right-20 w-[360px] h-[360px] rounded-full bg-amber-300/15 blur-3xl pointer-events-none"></span>

        <div class="relative mx-auto max-w-7xl px-5 sm:px-8 py-20 lg:py-28">
            <div class="grid lg:grid-cols-12 gap-10 items-end mb-12">
                <div class="lg:col-span-7">
                    <p class="reveal text-xs font-mono uppercase tracking-[.2em] text-brand-600">Every emergency. Every family. Every time.</p>
                    <h2 class="reveal reveal-delay-1 mt-3 font-display font-extrabold text-3xl sm:text-4xl lg:text-5xl leading-[1.05] tracking-tight text-navy-900">
                        When the unthinkable happens, <br/>
                        <span class="grad-red">help is already moving.</span>
                    </h2>
                </div>
                <div class="lg:col-span-5">
                    <p class="reveal reveal-delay-2 text-navy-700/80 leading-relaxed">
                        Auxilio is built for the moments you hope you'll never face — and ready for the ones you do. From a sudden medical scare to a missing child, our network mobilizes in seconds, with the right responders for the right emergency.
                    </p>
                </div>
            </div>

            {{-- LIVE indicator + page label --}}
            <div class="reveal flex items-center justify-between mb-6 gap-4 flex-wrap">
                <div class="inline-flex items-center gap-3 rounded-full bg-white px-4 py-2 ring-1 ring-ink-100 shadow-sm">
                    <span class="beacon"></span>
                    <span class="font-mono text-[11px] uppercase tracking-[.18em] text-navy-900 font-bold">Live emergency feed</span>
                    <span class="text-ink-400">·</span>
                    <span data-em-page-label class="font-mono text-[11px] uppercase tracking-[.18em] text-brand-600 font-bold">Page 1 of 4</span>
                </div>
                <div class="flex items-center gap-2">
                    <button type="button" data-em-prev class="flex w-9 h-9 items-center justify-center rounded-full bg-white ring-1 ring-ink-100 text-navy-900 hover:ring-brand-300 hover:text-brand-600 transition" aria-label="Previous">
                        <svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M15 19l-7-7 7-7"/></svg>
                    </button>
                    <button type="button" data-em-next class="flex w-9 h-9 items-center justify-center rounded-full bg-red-600 text-white hover:bg-red-700 transition shadow-md" aria-label="Next">
                        <svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M9 5l7 7-7 7"/></svg>
                    </button>
                </div>
            </div>

            {{-- The 3-slot gallery --}}
            <div data-em-gallery class="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
                <article data-em-slot="0" class="em-big-card lush-shadow ring-1 ring-ink-100 rounded-[24px] overflow-hidden bg-white"></article>
                <article data-em-slot="1" class="em-big-card lush-shadow ring-1 ring-ink-100 rounded-[24px] overflow-hidden bg-white"></article>
                <article data-em-slot="2" class="em-big-card lush-shadow ring-1 ring-ink-100 rounded-[24px] overflow-hidden bg-white"></article>
            </div>

            {{-- progress bar + dots --}}
            <div class="reveal mt-8 flex items-center gap-5">
                <div class="flex-1 h-1 rounded-full bg-ink-100 overflow-hidden">
                    <span data-em-progress class="block h-full w-0 bg-gradient-to-r from-red-500 via-orange-500 to-amber-400 transition-[width] duration-100 ease-linear"></span>
                </div>
                <div class="flex items-center gap-1.5" data-em-dots>
                    @for ($p = 0; $p < 4; $p++)
                        <button type="button" data-em-page="{{ $p }}" class="block w-2.5 h-2.5 rounded-full bg-ink-200 hover:bg-brand-300 transition" aria-label="Page {{ $p + 1 }}"></button>
                    @endfor
                </div>
            </div>

            {{-- inline CTA strip --}}
            <div class="reveal mt-14 rounded-3xl glass-light ring-1 ring-ink-100 p-6 sm:p-8 flex flex-col sm:flex-row items-center gap-5 sm:gap-8 lush-shadow">
                <div class="flex items-center gap-4 flex-1">
                    <span class="flex w-14 h-14 items-center justify-center rounded-2xl bg-red-600 text-white shadow-lg" style="box-shadow:0 14px 30px -10px rgba(251,6,6,.45)">
                        <svg class="w-7 h-7" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="9"/><path stroke-linecap="round" stroke-linejoin="round" d="M9 9l6 6m0-6l-6 6"/></svg>
                    </span>
                    <div>
                        <p class="font-display text-xl sm:text-2xl font-extrabold text-navy-900">Your family's safety net is one tap away.</p>
                        <p class="mt-1 text-sm text-navy-700/80">Free for citizens. Live in 30+ cities. No credit card.</p>
                    </div>
                </div>
                <a href="#" class="moving-gradient inline-flex items-center gap-2 rounded-full text-white px-6 py-3 text-sm font-semibold shadow-lg transition hover:-translate-y-0.5">
                    Get Auxilio Free
                    <svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M5 12h14M13 5l7 7-7 7"/></svg>
                </a>
            </div>
        </div>

        {{-- Emergency data (consumed by JS at bottom of citizen view) --}}
        <script type="application/json" data-em-data>
[
{"key":"medical","title":"Medical Emergency","desc":"Heart attack, stroke, allergic reaction — paramedics dispatched with your medical info pre-loaded.","img":"/images/citizen/emergency-room.jpg","tone":"#FB0606","tone2":"#7c0606","icon":"M12 21s-7-4.35-7-10a5 5 0 019-3 5 5 0 019 3c0 5.65-7 10-7 10z"},
{"key":"fire","title":"Fire Emergency","desc":"Smoke, gas leak, kitchen fire — fire teams alerted instantly with your floor plan and exits.","img":"/images/citizen/em-fire.jpg","tone":"#f97316","tone2":"#9a1a1a","icon":"M12 2c1 4 5 5 5 10a5 5 0 11-10 0c0-3 2-3 2-7 1 1 2 2 3 2 0-2-1-3 0-5z"},
{"key":"theft","title":"Theft or Robbery","desc":"Silent SOS sends location, recording, and verified responders — without alerting the attacker.","img":"/images/about/robbery.jpg","tone":"#dc2626","tone2":"#7f1d1d","icon":"M12 1l9 4v6c0 5-3.5 9.5-9 11-5.5-1.5-9-6-9-11V5l9-4z"},
{"key":"missing-child","title":"Missing Child","desc":"Last-known location, photo, and AMBER-style alerts pushed to nearby Auxilio members within seconds.","img":"/images/citizen/child-distress.jpg","tone":"#f59e0b","tone2":"#7c2d12","icon":"M12 12a4 4 0 100-8 4 4 0 000 8zM4 22a8 8 0 0116 0"},
{"key":"accident","title":"Road Accident","desc":"Crash detection auto-summons help, shares location, and alerts your family circle the instant it happens.","img":"/images/about/accident.jpg","tone":"#ef4444","tone2":"#7f1d1d","icon":"M3 17h18l-2-7H5l-2 7zm2-3h14M7 17v2m10-2v2"},
{"key":"home-intrusion","title":"Home Intrusion","desc":"Door, window, or motion triggers — silent dispatch with live audio to verified responders.","img":"/images/about/break-in.jpg","tone":"#1a2548","tone2":"#0a1224","icon":"M3 12l9-9 9 9M5 10v10h14V10"},
{"key":"natural-disaster","title":"Natural Disaster","desc":"Storms, floods, quakes — proactive alerts with shelter locations and family check-ins.","img":"/images/citizen/em-disaster.jpg","tone":"#0891b2","tone2":"#0c4a6e","icon":"M3 14a4 4 0 014-4h1a5 5 0 019.9-1.5A4.5 4.5 0 0119 17H5a3 3 0 01-2-3z"},
{"key":"women-safety","title":"Women Safety","desc":"Discreet panic gesture, live tracking, and trauma-informed responders — no questions asked.","img":"/images/citizen/abused-woman.jpg","tone":"#ec4899","tone2":"#831843","icon":"M12 2a4 4 0 014 4v2a4 4 0 11-8 0V6a4 4 0 014-4zM6 22a6 6 0 0112 0"},
{"key":"elderly","title":"Elderly Emergency","desc":"Fall detection, missed meds, wandering alerts — calm, dignified response designed for seniors.","img":"/images/citizen/em-elderly.jpg","tone":"#8b5cf6","tone2":"#3730a3","icon":"M12 6V2m0 4a4 4 0 100 8 4 4 0 000-8zm-7 16l3-7 4 1 4-1 3 7"},
{"key":"sos","title":"General SOS","desc":"Anything you can’t name in the moment. One tap reaches a real human in under 30 seconds.","img":"/images/citizen/warning-lamp.jpg","tone":"#FB0606","tone2":"#5a0606","icon":"M9 9l6 6m0-6l-6 6"}
]
        </script>
    </section>

    {{-- ========== STORYTELLING — Protect Your Loved Ones ========== --}}
    <section class="relative overflow-hidden bg-white">
        <span class="absolute -top-24 -left-24 w-[420px] h-[420px] rounded-full bg-rose-300/15 blur-3xl pointer-events-none"></span>

        <div class="relative mx-auto max-w-7xl px-5 sm:px-8 py-20 lg:py-28">
            <div class="grid lg:grid-cols-12 gap-12 lg:gap-16 items-center">
                <div class="lg:col-span-6 fade-up">
                    <div class="relative max-w-md mx-auto lg:mx-0">
                        <span class="absolute -inset-6 rounded-[40px] blur-3xl bg-red-500/15 pointer-events-none"></span>
                        <div class="relative rounded-[28px] overflow-hidden aspect-[4/5] ring-1 ring-ink-100 lush-shadow">
                            <img src="/images/citizen/family-hugging.jpg" alt="Family inside a safe home" class="absolute inset-0 w-full h-full object-cover" />
                            <div class="absolute inset-0 bg-gradient-to-t from-navy-950/55 via-transparent to-transparent"></div>
                            <span class="absolute top-4 left-4 inline-flex items-center gap-2 rounded-full bg-white/95 backdrop-blur px-3 py-1 text-[10.5px] font-mono uppercase tracking-[.18em] text-navy-900 ring-1 ring-white/60 shadow">
                                <span class="beacon"></span>
                                Family circle · 4 of 4
                            </span>
                        </div>
                        {{-- floating stat card --}}
                        <div class="hidden md:flex float-card absolute -right-8 top-12 items-center gap-3 rounded-2xl bg-white px-4 py-3 shadow-2xl ring-1 ring-ink-100" style="min-width:210px;">
                            <span class="flex w-11 h-11 items-center justify-center rounded-full bg-emerald-100 text-emerald-700">
                                <svg class="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4"><path stroke-linecap="round" stroke-linejoin="round" d="M12 8v4l3 2M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
                            </span>
                            <div class="leading-tight">
                                <div class="font-mono text-[10px] uppercase tracking-[.18em] text-emerald-700 font-bold">CHECK-IN</div>
                                <div class="font-display text-[14px] font-bold text-navy-900">Maya · safe at school</div>
                            </div>
                        </div>
                        <div class="hidden md:flex float-card delay-2 absolute -left-10 -bottom-8 items-center gap-3 rounded-2xl bg-navy-900 text-white px-4 py-3 shadow-2xl ring-1 ring-white/10" style="min-width:215px;">
                            <span class="flex w-11 h-11 items-center justify-center rounded-full bg-amber-400 text-navy-900">
                                <svg class="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4"><path stroke-linecap="round" stroke-linejoin="round" d="M12 21s-7-4.35-7-10a5 5 0 019-3 5 5 0 019 3c0 5.65-7 10-7 10z"/></svg>
                            </span>
                            <div class="leading-tight">
                                <div class="font-mono text-[10px] uppercase tracking-[.18em] text-amber-300 font-bold">PROTECTED</div>
                                <div class="font-display text-[14px] font-bold">Mom · Dad · Maya · Leo</div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="lg:col-span-6 fade-up">
                    <p class="text-xs font-mono uppercase tracking-[.2em] text-brand-600">Protect your loved ones</p>
                    <h2 class="mt-3 font-display font-extrabold text-3xl sm:text-4xl lg:text-5xl leading-[1.05] tracking-tight text-navy-900">
                        The people you love, <span class="grad-red">always within reach.</span>
                    </h2>
                    <p class="mt-5 text-navy-700/80 leading-relaxed max-w-xl">
                        Build a private family circle in seconds. Share location only when you choose. Auxilio quietly checks in, listens for trouble, and brings everyone home — without ever feeling like surveillance.
                    </p>
                    <ul class="mt-7 space-y-4 max-w-xl">
                        @foreach ([
                            ['t'=>'Live family circle','b'=>'Add up to 12 people. Toggle visibility per person, per day.'],
                            ['t'=>'Auto check-ins','b'=>'Scheduled "I\'m home safe" pings — no manual texts.'],
                            ['t'=>'Trusted contacts only','b'=>'You decide who hears the SOS. Default is your circle + dispatch.'],
                        ] as $li)
                            <li class="flex gap-4">
                                <span class="grid place-items-center w-10 h-10 rounded-full bg-red-50 text-red-600 ring-1 ring-red-100 shrink-0">
                                    <svg class="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4"><path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7"/></svg>
                                </span>
                                <div>
                                    <p class="font-display font-bold text-navy-900">{{ $li['t'] }}</p>
                                    <p class="text-sm text-navy-700/80 leading-relaxed">{{ $li['b'] }}</p>
                                </div>
                            </li>
                        @endforeach
                    </ul>
                </div>
            </div>
        </div>
    </section>

    {{-- ========== STORYTELLING — Emergency Help in Seconds (dark, dramatic) ========== --}}
    <section class="relative overflow-hidden text-white" style="background:linear-gradient(160deg,#0a1224 0%, #131c36 60%, #07101f 100%);">
        <span class="absolute -top-32 -right-20 w-[520px] h-[520px] rounded-full bg-red-600/25 blur-3xl pointer-events-none"></span>
        <span class="absolute -bottom-32 -left-20 w-[440px] h-[440px] rounded-full bg-amber-400/15 blur-3xl pointer-events-none"></span>
        <div class="absolute inset-0 opacity-30 pointer-events-none"
             style="background-image:
                linear-gradient(rgba(255,255,255,.05) 1px, transparent 1px),
                linear-gradient(90deg, rgba(255,255,255,.05) 1px, transparent 1px);
                background-size: 56px 56px;
                mask-image: radial-gradient(circle at 50% 50%, black, transparent 70%);"></div>

        <div class="relative mx-auto max-w-7xl px-5 sm:px-8 py-20 lg:py-28">
            <div class="grid lg:grid-cols-12 gap-12 lg:gap-16 items-center">
                <div class="lg:col-span-6 lg:order-2 fade-up">
                    <div class="relative max-w-md mx-auto lg:mx-0">
                        <span class="absolute -inset-8 rounded-[40px] blur-3xl bg-red-600/40 pointer-events-none"></span>
                        <div class="relative rounded-[28px] overflow-hidden aspect-[4/5] ring-1 ring-white/15 lush-shadow">
                            <img src="/images/citizen/emergency-room.jpg" alt="Paramedics responding fast" class="absolute inset-0 w-full h-full object-cover" />
                            <div class="absolute inset-0 bg-gradient-to-t from-navy-950/80 via-navy-950/20 to-navy-950/30"></div>
                            <div class="absolute inset-x-4 top-4 glass rounded-2xl px-4 py-3 flex items-center gap-3">
                                <span class="flex w-10 h-10 items-center justify-center rounded-full bg-red-600 text-white shrink-0 alert-bounce">
                                    <svg class="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.6"><path stroke-linecap="round" stroke-linejoin="round" d="M12 9v3.75M12 17h.01M2.7 16.13c-.87 1.5.22 3.37 1.95 3.37h14.7c1.73 0 2.82-1.87 1.95-3.37L13.95 3.38c-.87-1.5-3.03-1.5-3.9 0L2.7 16.13z"/></svg>
                                </span>
                                <div class="leading-tight">
                                    <div class="font-mono text-[10px] uppercase tracking-[.18em] text-red-300 font-bold">SOS · 00:08</div>
                                    <div class="font-display text-sm font-bold">Paramedics dispatched</div>
                                </div>
                                <span class="ml-auto beacon" style="background:#FB0606;"></span>
                            </div>
                        </div>

                        {{-- countdown timer card --}}
                        <div class="hidden md:block float-slow absolute -left-10 bottom-10 rounded-2xl bg-white/95 backdrop-blur px-5 py-4 ring-1 ring-white/40 shadow-2xl">
                            <div class="font-mono text-[10px] uppercase tracking-[.18em] text-red-600 font-bold">RESPONSE TIME</div>
                            <div class="mt-1 font-display text-3xl font-extrabold text-navy-900 citizen-counter">3:42</div>
                            <div class="mt-1 text-[11px] text-navy-700/70">average · Newark Metro</div>
                        </div>
                    </div>
                </div>

                <div class="lg:col-span-6 lg:order-1 fade-up">
                    <p class="text-xs font-mono uppercase tracking-[.2em] text-red-400">Emergency help in seconds</p>
                    <h2 class="mt-3 font-display font-extrabold text-3xl sm:text-4xl lg:text-5xl leading-[1.05] tracking-tight">
                        From <span class="grad-red">tap to dispatch</span> in under 8 seconds.
                    </h2>
                    <p class="mt-5 text-white/75 leading-relaxed max-w-xl">
                        Auxilio collapses the seconds that matter. One press hands the closest verified responder your name, location, family contacts, and any medical details you've chosen to share — before you've even let go of the button.
                    </p>

                    <div class="mt-8 grid sm:grid-cols-3 gap-4 max-w-xl">
                        @foreach ([
                            ['v'=>'8s','l'=>'Tap to dispatch'],
                            ['v'=>'3:42','l'=>'Avg. arrival'],
                            ['v'=>'24/7','l'=>'Live human desk'],
                        ] as $t)
                            <div class="rounded-2xl glass p-5">
                                <div class="font-display text-3xl font-extrabold">{{ $t['v'] }}</div>
                                <div class="mt-1 font-mono text-[10px] uppercase tracking-[.18em] text-white/55">{{ $t['l'] }}</div>
                            </div>
                        @endforeach
                    </div>

                    <a href="#" class="mt-8 inline-flex items-center gap-2 moving-gradient text-white rounded-full px-6 py-3 text-sm font-semibold shadow-2xl transition hover:-translate-y-0.5" style="box-shadow:0 22px 50px -12px rgba(251,6,6,.55)">
                        Try the SOS demo
                        <svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M5 12h14M13 5l7 7-7 7"/></svg>
                    </a>
                </div>
            </div>
        </div>
    </section>

    {{-- ========== BENTO FEATURES ========== --}}
    <section class="relative bg-white">
        <div class="mx-auto max-w-7xl px-5 sm:px-8 py-20 lg:py-28">
            <div class="text-center max-w-2xl mx-auto">
                <p class="reveal text-xs font-mono uppercase tracking-[.2em] text-brand-600">What you get</p>
                <h2 class="reveal reveal-delay-1 mt-4 font-display font-extrabold text-3xl sm:text-4xl lg:text-5xl tracking-tight text-navy-900">
                    A safety suite that fits in <span class="text-brand-600">your pocket.</span>
                </h2>
                <p class="reveal reveal-delay-2 mt-5 text-navy-700/80 leading-relaxed">
                    Everything you need to stay aware, stay connected, and call help when you need it — without juggling five apps.
                </p>
            </div>

            <div class="reveal mt-14 grid lg:grid-cols-3 gap-5">
                {{-- Column 1 — two stacked dark cards --}}
                <div class="space-y-5">
                    <article class="bento-dark relative overflow-hidden rounded-[22px] p-7 text-white min-h-[360px] flex flex-col">
                        <div class="relative">
                            <h3 class="font-display text-2xl font-bold leading-tight">One-Tap SOS<br/>to Real Responders</h3>
                            <p class="mt-3 text-sm text-white/65 leading-relaxed">Press once. We route to the closest verified agent, share your live location, and stay on the line until help arrives.</p>
                        </div>
                        <div class="relative mt-auto pt-6 flex items-end justify-center">
                            <div class="relative flex items-center justify-center w-20 h-20 rounded-full bg-red-600 text-white shadow-2xl">
                                <span class="ring-pulse"></span>
                                <span class="ring-pulse delay-1"></span>
                                <span class="font-display font-extrabold tracking-wider">SOS</span>
                            </div>
                        </div>
                    </article>

                    <article class="bento-dark relative overflow-hidden rounded-[22px] p-7 text-white min-h-[300px] flex flex-col">
                        <div class="relative">
                            <h3 class="font-display text-2xl font-bold leading-tight">Real-Time Crime Map</h3>
                            <p class="mt-3 text-sm text-white/65 leading-relaxed">Heat-mapped incidents around your home, school, and route — refreshed every few seconds.</p>
                        </div>
                        <div class="relative mt-auto pt-6">
                            <div class="rounded-md bg-white/5 ring-1 ring-white/10 p-4 backdrop-blur">
                                <div class="flex items-center justify-between text-[10.5px] font-mono uppercase tracking-[.18em] text-white/50">
                                    <span>Newark · Live</span>
                                    <span class="text-red-400">▲ 12 today</span>
                                </div>
                                <div class="mt-3 flex items-end gap-1.5 h-12">
                                    @foreach ([20,40,28,55,72,48,90,62,75,55,68,82] as $h)
                                        <span class="flex-1 rounded-sm bg-gradient-to-t from-red-600 to-red-400/70" style="height: {{ $h }}%;"></span>
                                    @endforeach
                                </div>
                            </div>
                        </div>
                    </article>
                </div>

                {{-- Column 2 — center large white card (Encrypted) + small bottom dark --}}
                <div class="space-y-5">
                    <article class="relative overflow-hidden rounded-[22px] bg-white ring-1 ring-ink-100 shadow-md p-7 min-h-[420px] flex flex-col">
                        <span class="flex w-12 h-12 items-center justify-center rounded-full bg-emerald-100 text-emerald-700 ring-4 ring-emerald-50">
                            <svg class="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M12 3l8 4v5c0 5-3.5 8.5-8 9-4.5-.5-8-4-8-9V7l8-4z"/><path stroke-linecap="round" stroke-linejoin="round" d="M9.5 12l2 2 3.5-4"/></svg>
                        </span>
                        <h3 class="mt-5 font-display text-2xl font-bold text-navy-900 leading-tight">Encrypted, Anonymous Reporting</h3>
                        <p class="mt-3 text-[14.5px] text-navy-700/80 leading-relaxed">Report suspicious activity or share a tip — fully end-to-end encrypted. No phone number required, no identity revealed unless you choose to share.</p>
                        <div class="mt-auto pt-6">
                            <div class="relative rounded-md overflow-hidden ring-1 ring-ink-100">
                                <img src="/images/citizen/hacker.jpg" alt="Encrypted reporting" class="w-full h-44 object-cover" />
                                <div class="absolute inset-0 bg-gradient-to-t from-emerald-950/80 via-emerald-950/30 to-transparent"></div>
                                <div class="absolute bottom-2 left-2 right-2 flex items-center justify-between text-white text-[11px] font-mono uppercase tracking-[.16em]">
                                    <span class="rounded-md bg-emerald-500/90 px-2 py-0.5 text-emerald-950 font-bold">End-to-end</span>
                                    <span>AES-256</span>
                                </div>
                            </div>
                        </div>
                    </article>

                    <article class="bento-dark relative overflow-hidden rounded-[22px] p-7 text-white min-h-[240px] flex flex-col">
                        <div class="relative flex items-center justify-between">
                            <h3 class="font-display text-xl font-bold leading-tight">Join 500K+<br/>Safe Citizens</h3>
                            <div class="flex -space-x-3">
                                <img class="w-9 h-9 rounded-full ring-2 ring-navy-950 object-cover" src="/images/officer-1.jpg" alt="" />
                                <img class="w-9 h-9 rounded-full ring-2 ring-navy-950 object-cover" src="/images/officer-2.jpg" alt="" />
                                <img class="w-9 h-9 rounded-full ring-2 ring-navy-950 object-cover" src="/images/officer-3.jpg" alt="" />
                                <span class="w-9 h-9 grid place-items-center rounded-full ring-2 ring-navy-950 bg-emerald-500 text-navy-950 font-display font-bold text-[11px]">500K</span>
                            </div>
                        </div>
                        <p class="relative mt-3 text-sm text-white/65 leading-relaxed">A growing network of neighbors, families, and verified responders looking out for one another.</p>
                        <div class="relative mt-auto pt-5 flex flex-wrap gap-2">
                            <span class="rounded-full bg-white/[.07] ring-1 ring-white/10 px-3 py-1 text-[11px] font-mono uppercase tracking-[.16em] text-white/70">$0 Citizen Plan</span>
                            <span class="rounded-full bg-white/[.07] ring-1 ring-white/10 px-3 py-1 text-[11px] font-mono uppercase tracking-[.16em] text-white/70">30+ Cities</span>
                        </div>
                    </article>
                </div>

                {{-- Column 3 — big white card with offender map preview --}}
                <div class="space-y-5">
                    <article class="relative overflow-hidden rounded-[22px] bg-white ring-1 ring-ink-100 shadow-md p-7 min-h-[420px] flex flex-col">
                        <span class="flex w-12 h-12 items-center justify-center rounded-full bg-amber-100 text-amber-700 ring-4 ring-amber-50">
                            <svg class="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M12 22s8-7.5 8-13a8 8 0 10-16 0c0 5.5 8 13 8 13z"/><circle cx="12" cy="9" r="2.5"/></svg>
                        </span>
                        <h3 class="mt-5 font-display text-2xl font-bold text-navy-900 leading-tight">Registered Offender Alerts</h3>
                        <p class="mt-3 text-[14.5px] text-navy-700/80 leading-relaxed">Auxilio cross-references public registries so you'll know — quietly, accurately — which addresses to be aware of along your daily route.</p>
                        <a data-route href="#/sex-offender-map" class="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-brand-600 hover:text-brand-700 transition group">
                            View live map
                            <svg class="w-4 h-4 transition group-hover:translate-x-0.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M5 12h14M13 5l7 7-7 7"/></svg>
                        </a>
                        <div class="mt-auto pt-5">
                            <div class="relative rounded-md overflow-hidden ring-1 ring-ink-100">
                                <img src="/images/scene-patrol.jpg" alt="Offender map preview" class="w-full h-40 object-cover" />
                                <div class="absolute inset-0 bg-gradient-to-t from-navy-950/60 via-transparent to-transparent"></div>
                                <div class="absolute bottom-2 left-2 right-2 flex items-center justify-between text-white text-[11px] font-mono uppercase tracking-[.16em]">
                                    <span class="rounded-md bg-amber-500/90 px-2 py-0.5 text-navy-950 font-bold">7 nearby</span>
                                    <span>2 mi radius</span>
                                </div>
                            </div>
                        </div>
                    </article>

                    <article class="relative overflow-hidden rounded-[22px] bg-gradient-to-br from-brand-600 to-red-700 text-white p-7 min-h-[240px] flex flex-col">
                        <div class="absolute -right-12 -bottom-12 w-56 h-56 rounded-full bg-white/10 pointer-events-none"></div>
                        <span class="flex w-11 h-11 items-center justify-center rounded-full bg-white/15 ring-1 ring-white/25">
                            <svg class="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M3 12h2l3-9 4 18 3-9h6"/></svg>
                        </span>
                        <h3 class="mt-4 font-display text-2xl font-bold leading-tight">AI Safety Insights</h3>
                        <p class="mt-3 text-sm text-white/85 leading-relaxed">Personalized risk forecasts for your routes, work hours, and child's school zone — quietly powered, never creepy.</p>
                    </article>
                </div>
            </div>
        </div>
    </section>

    {{-- ========== 4-STEP ONBOARDING ========== --}}
    <section class="relative bg-ink-50">
        <div class="mx-auto max-w-7xl px-5 sm:px-8 py-20 lg:py-28">
            <div class="text-center max-w-2xl mx-auto">
                <p class="reveal text-xs font-mono uppercase tracking-[.2em] text-brand-600">Get protected fast</p>
                <h2 class="reveal reveal-delay-1 mt-4 font-display font-extrabold text-3xl sm:text-4xl lg:text-5xl tracking-tight text-navy-900">
                    Set up your safety net in <span class="text-brand-600">four easy steps.</span>
                </h2>
                <p class="reveal reveal-delay-2 mt-5 text-navy-700/80 leading-relaxed">
                    Most citizens are fully onboarded — verified, connected, alert-ready — in under two minutes.
                </p>
            </div>

            <div class="reveal mt-14 grid lg:grid-cols-12 gap-12 items-start">
                <div class="lg:col-span-5">
                    <div class="relative mx-auto max-w-md lg:sticky lg:top-28">
                        <span class="absolute -inset-6 rounded-[36px] blur-3xl bg-brand-100/60 pointer-events-none"></span>
                        <div class="relative rounded-[28px] overflow-hidden aspect-[4/5] ring-1 ring-ink-100 shadow-2xl">
                            <img data-citizen-step-img src="/images/citizen/family-hugging.jpg" alt="Step preview" class="absolute inset-0 w-full h-full object-cover transition-opacity duration-300" />
                            <div class="absolute inset-0 bg-gradient-to-t from-navy-950/55 via-transparent to-transparent"></div>
                            <div class="absolute top-4 left-4">
                                <span data-citizen-step-badge class="inline-flex items-center gap-2 rounded-full bg-white/90 backdrop-blur px-3 py-1 text-[10.5px] font-mono uppercase tracking-[.18em] text-navy-900 ring-1 ring-white/40 shadow">
                                    <span class="w-1.5 h-1.5 rounded-full bg-red-600"></span>
                                    Step 01
                                </span>
                            </div>
                            <div class="absolute inset-x-0 bottom-0 p-5">
                                <p data-citizen-step-caption class="font-display text-lg sm:text-xl font-bold text-white leading-tight max-w-xs">Create your free Citizen profile</p>
                            </div>
                        </div>
                        <div class="mt-6 text-center">
                            <span data-citizen-step-counter class="font-mono text-[11px] uppercase tracking-[.18em] text-ink-500">Step 01 of 04</span>
                        </div>
                    </div>
                </div>
                <div class="lg:col-span-7">
                    <ol data-citizen-steps class="relative space-y-2">
                        @foreach ([
                            ['n'=>'01','img'=>'/images/citizen/family-hugging.jpg', 'h'=>'Create your free Citizen profile','b'=>"Just your name, phone, and a 4-digit PIN. We never sell your data — and the citizen tier is free, forever."],
                            ['n'=>'02','img'=>'/images/citizen/family-safe.jpg',    'h'=>'Verify your phone in 30 seconds','b'=>"Standard SMS verification. Once verified, you'll receive trusted, ranked alerts and never spam."],
                            ['n'=>'03','img'=>'/images/citizen/family-park-walk.jpg','h'=>'Add your family circle','b'=>'Invite parents, partner, kids — share location in either direction with one-tap controls.'],
                            ['n'=>'04','img'=>'/images/citizen/family-safe.jpg',    'h'=>"You're protected — go live the day",'b'=>"SOS is wired up, alerts are flowing, your family knows where you are when you want them to."],
                        ] as $i => $s)
                            <li data-citizen-step="{{ $i }}" data-img="{{ $s['img'] }}"
                                @if($i===0) data-active class="cursor-pointer rounded-md bg-white border-2 border-brand-200 shadow-lg p-5 lg:p-6 transition"
                                @else class="cursor-pointer rounded-md bg-white border-2 border-transparent hover:border-brand-200 hover:shadow-md p-5 lg:p-6 transition"
                                @endif>
                                <div class="flex items-start gap-4">
                                    <span class="flex w-11 h-11 shrink-0 items-center justify-center rounded-full {{ $i===0 ? 'bg-red-600 text-white' : 'bg-brand-50 text-brand-600 ring-1 ring-brand-100' }} font-display font-extrabold transition">{{ $s['n'] }}</span>
                                    <div class="flex-1">
                                        <h3 class="font-display text-lg sm:text-xl font-bold text-navy-900">{{ $s['h'] }}</h3>
                                        <p class="mt-1.5 text-[14px] text-navy-700/80 leading-relaxed">{{ $s['b'] }}</p>
                                    </div>
                                </div>
                            </li>
                        @endforeach
                    </ol>

                    <div class="mt-8 flex items-center gap-3">
                        <button type="button" data-citizen-step-prev class="flex w-11 h-11 items-center justify-center rounded-md border border-ink-200 bg-white text-navy-900 hover:border-brand-300 hover:text-brand-600 transition" aria-label="Previous">
                            <svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M15 19l-7-7 7-7"/></svg>
                        </button>
                        <button type="button" data-citizen-step-next class="flex w-11 h-11 items-center justify-center rounded-md bg-red-600 hover:bg-red-700 text-white transition shadow-md" aria-label="Next">
                            <svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M9 5l7 7-7 7"/></svg>
                        </button>
                        <a href="#" class="ml-2 inline-flex items-center gap-2 rounded-md bg-navy-900 hover:bg-navy-800 text-white px-5 py-3 text-sm font-semibold transition">
                            Get the app
                            <svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M12 4v16m0 0l-5-5m5 5l5-5"/></svg>
                        </a>
                    </div>
                </div>
            </div>
        </div>
    </section>

    {{-- ========== STORYTELLING — Stay Connected With Authorities ========== --}}
    <section class="relative overflow-hidden" style="background:linear-gradient(180deg,#f7f3ee 0%, #ffffff 100%);">
        <span class="absolute -top-32 left-1/3 w-[420px] h-[420px] rounded-full bg-cyan-300/20 blur-3xl pointer-events-none"></span>

        <div class="relative mx-auto max-w-7xl px-5 sm:px-8 py-20 lg:py-28">
            <div class="grid lg:grid-cols-12 gap-12 lg:gap-16 items-center">
                <div class="lg:col-span-6 fade-up">
                    <div class="relative max-w-md mx-auto lg:mx-0">
                        <span class="absolute -inset-6 rounded-[40px] blur-3xl bg-navy-900/15 pointer-events-none"></span>
                        <div class="relative rounded-[28px] overflow-hidden aspect-[4/5] ring-1 ring-ink-100 lush-shadow">
                            <img src="/images/citizen/officer-coffee.jpg" alt="Officer connected with the community" class="absolute inset-0 w-full h-full object-cover" />
                            <div class="absolute inset-0 bg-gradient-to-t from-navy-950/60 via-transparent to-transparent"></div>
                            <span class="absolute top-4 left-4 inline-flex items-center gap-2 rounded-full bg-white/95 backdrop-blur px-3 py-1 text-[10.5px] font-mono uppercase tracking-[.18em] text-navy-900 ring-1 ring-white/60 shadow">
                                <span class="beacon"></span>
                                Verified · Newark PD
                            </span>
                        </div>

                        {{-- chat thread floating card --}}
                        <div class="hidden md:block float-card absolute -right-12 top-12 w-64 rounded-2xl bg-white p-4 shadow-2xl ring-1 ring-ink-100">
                            <div class="flex items-center gap-2 mb-3">
                                <span class="flex w-8 h-8 items-center justify-center rounded-full bg-blue-100 text-blue-700">
                                    <svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4"><path stroke-linecap="round" stroke-linejoin="round" d="M3 12c0-3.87 4.03-7 9-7s9 3.13 9 7-4.03 7-9 7c-1.05 0-2.06-.13-3-.38L3 21l1.45-3.95C3.55 15.86 3 14.02 3 12z"/></svg>
                                </span>
                                <div class="leading-tight">
                                    <div class="font-display text-sm font-bold text-navy-900">Live with dispatch</div>
                                    <div class="font-mono text-[9.5px] uppercase tracking-[.16em] text-emerald-600">Encrypted</div>
                                </div>
                            </div>
                            <div class="space-y-2">
                                <div class="rounded-xl bg-ink-50 px-3 py-2 text-[12.5px] text-navy-900">"You're connected. What's happening?"</div>
                                <div class="ml-auto max-w-[80%] rounded-xl bg-red-600 text-white px-3 py-2 text-[12.5px]">"Suspicious car outside."</div>
                                <div class="rounded-xl bg-ink-50 px-3 py-2 text-[12.5px] text-navy-900">"Officer Reyes is 90s out. Stay on the line."</div>
                            </div>
                        </div>

                        <div class="hidden md:flex float-card delay-2 absolute -left-8 -bottom-8 items-center gap-3 rounded-2xl bg-navy-900 text-white px-4 py-3 shadow-2xl ring-1 ring-white/10" style="min-width:215px;">
                            <span class="flex w-11 h-11 items-center justify-center rounded-full bg-amber-400 text-navy-900">
                                <svg class="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4"><path stroke-linecap="round" stroke-linejoin="round" d="M12 3l8 4v5c0 5-3.5 8.5-8 9-4.5-.5-8-4-8-9V7l8-4z"/></svg>
                            </span>
                            <div class="leading-tight">
                                <div class="font-mono text-[10px] uppercase tracking-[.18em] text-amber-300 font-bold">VERIFIED</div>
                                <div class="font-display text-[14px] font-bold">Badge #487 · 12 yrs</div>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="lg:col-span-6 fade-up">
                    <p class="text-xs font-mono uppercase tracking-[.2em] text-brand-600">Stay connected with authorities</p>
                    <h2 class="mt-3 font-display font-extrabold text-3xl sm:text-4xl lg:text-5xl leading-[1.05] tracking-tight text-navy-900">
                        A direct line to <span class="grad-red">verified responders</span> — not a hotline maze.
                    </h2>
                    <p class="mt-5 text-navy-700/80 leading-relaxed max-w-xl">
                        Every responder on Auxilio is identity-verified and badge-credentialed. When you reach out, you get a real person — not a phone tree, not a chatbot — and a transparent log of who responded, when, and why.
                    </p>

                    <div class="mt-7 grid sm:grid-cols-2 gap-4 max-w-xl">
                        @foreach ([
                            ['t'=>'Verified badges','b'=>'Every responder. Every dispatch.','color'=>'red'],
                            ['t'=>'Encrypted chat','b'=>'AES-256, end-to-end. Always.','color'=>'emerald'],
                            ['t'=>'Audit trail','b'=>'Signed, timestamped, exportable.','color'=>'amber'],
                            ['t'=>'Local PD bridge','b'=>'911 handoff in serious cases.','color'=>'blue'],
                        ] as $f)
                            @php
                                $cmap = [
                                    'red' => ['bg'=>'bg-red-50','text'=>'text-red-600','ring'=>'ring-red-100'],
                                    'emerald' => ['bg'=>'bg-emerald-50','text'=>'text-emerald-600','ring'=>'ring-emerald-100'],
                                    'amber' => ['bg'=>'bg-amber-50','text'=>'text-amber-600','ring'=>'ring-amber-100'],
                                    'blue' => ['bg'=>'bg-blue-50','text'=>'text-blue-600','ring'=>'ring-blue-100'],
                                ][$f['color']];
                            @endphp
                            <div class="rounded-2xl bg-white ring-1 ring-ink-100 p-5 shadow-sm hover:shadow-md transition">
                                <span class="flex w-10 h-10 items-center justify-center rounded-xl {{ $cmap['bg'] }} {{ $cmap['text'] }} ring-1 {{ $cmap['ring'] }}">
                                    <svg class="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4"><path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7"/></svg>
                                </span>
                                <p class="mt-3 font-display font-bold text-navy-900">{{ $f['t'] }}</p>
                                <p class="text-sm text-navy-700/80 leading-relaxed">{{ $f['b'] }}</p>
                            </div>
                        @endforeach
                    </div>
                </div>
            </div>
        </div>
    </section>

    {{-- ========== STORYTELLING — Real-Time Safety Alerts (alt layout) ========== --}}
    <section class="relative overflow-hidden bg-white">
        <span class="absolute top-1/2 -left-32 w-[440px] h-[440px] rounded-full bg-amber-200/25 blur-3xl pointer-events-none"></span>

        <div class="relative mx-auto max-w-7xl px-5 sm:px-8 py-20 lg:py-28">
            <div class="grid lg:grid-cols-12 gap-12 lg:gap-16 items-center">
                <div class="lg:col-span-6 lg:order-2 fade-up">
                    <div class="relative max-w-md mx-auto lg:mx-0">
                        <span class="absolute -inset-6 rounded-[40px] blur-3xl bg-amber-300/30 pointer-events-none"></span>
                        <div class="relative rounded-[28px] overflow-hidden aspect-[4/5] ring-1 ring-ink-100 lush-shadow">
                            <img src="/images/citizen/warning-lamp.jpg" alt="Real-time safety alerts" class="absolute inset-0 w-full h-full object-cover" />
                            <div class="absolute inset-0 bg-gradient-to-t from-navy-950/70 via-transparent to-transparent"></div>
                            <div class="absolute inset-x-4 bottom-4 glass rounded-2xl p-4 text-white">
                                <div class="flex items-center gap-3 mb-3">
                                    <span class="flex w-9 h-9 items-center justify-center rounded-full bg-amber-400 text-navy-900">
                                        <svg class="w-5 h-5" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2l-1 6 4 1-3 5h3l-2 8 6-9h-3l3-6h-4l1-5h-4z"/></svg>
                                    </span>
                                    <div class="leading-tight">
                                        <div class="font-mono text-[10px] uppercase tracking-[.18em] text-amber-300 font-bold">CITY ALERT · 0.4 mi</div>
                                        <div class="font-display text-sm font-bold">Power outage · Maple St</div>
                                    </div>
                                </div>
                                <div class="space-y-1.5">
                                    @foreach ([
                                        ['t'=>'2:14p','c'=>'Crime spike on E Broad','d'=>'amber'],
                                        ['t'=>'2:31p','c'=>'School lockdown lifted','d'=>'emerald'],
                                        ['t'=>'2:48p','c'=>'Severe weather warning','d'=>'red'],
                                    ] as $a)
                                        @php $dotColor = ['amber'=>'#f5c844','emerald'=>'#10b981','red'=>'#FB0606'][$a['d']]; @endphp
                                        <div class="flex items-center gap-2 text-[12px]">
                                            <span class="w-1.5 h-1.5 rounded-full" style="background:{{ $dotColor }}"></span>
                                            <span class="font-mono text-white/60 w-12">{{ $a['t'] }}</span>
                                            <span class="text-white/90">{{ $a['c'] }}</span>
                                        </div>
                                    @endforeach
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="lg:col-span-6 lg:order-1 fade-up">
                    <p class="text-xs font-mono uppercase tracking-[.2em] text-brand-600">Real-time safety alerts</p>
                    <h2 class="mt-3 font-display font-extrabold text-3xl sm:text-4xl lg:text-5xl leading-[1.05] tracking-tight text-navy-900">
                        Know what's happening, <span class="grad-red">before it reaches you.</span>
                    </h2>
                    <p class="mt-5 text-navy-700/80 leading-relaxed max-w-xl">
                        Auxilio surfaces only the alerts that matter to your block, your route, your kid's school. No noise, no fear-mongering — just the calm, accurate signal you need to make a smart decision in the moment.
                    </p>

                    <ul class="mt-7 space-y-3 max-w-xl">
                        @foreach ([
                            ['c'=>'amber','t'=>'Hyperlocal','b'=>'Filtered to your home, work, and family zones.'],
                            ['c'=>'red',  't'=>'Verified','b'=>'Cross-checked against municipal feeds and trusted reports.'],
                            ['c'=>'emerald','t'=>'Quiet by default','b'=>'Push only for what genuinely affects your safety.'],
                        ] as $li)
                            @php $ring = ['amber'=>'bg-amber-100 text-amber-700','red'=>'bg-red-100 text-red-700','emerald'=>'bg-emerald-100 text-emerald-700'][$li['c']]; @endphp
                            <li class="flex items-start gap-4 rounded-2xl bg-white ring-1 ring-ink-100 p-4 shadow-sm">
                                <span class="flex w-10 h-10 items-center justify-center rounded-full {{ $ring }} shrink-0">
                                    <svg class="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4"><path stroke-linecap="round" stroke-linejoin="round" d="M15 17h5l-1.4-1.4A2 2 0 0118 14V11a6 6 0 10-12 0v3a2 2 0 01-.6 1.6L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"/></svg>
                                </span>
                                <div class="leading-snug">
                                    <p class="font-display font-bold text-navy-900">{{ $li['t'] }}</p>
                                    <p class="text-sm text-navy-700/80">{{ $li['b'] }}</p>
                                </div>
                            </li>
                        @endforeach
                    </ul>
                </div>
            </div>
        </div>
    </section>

    {{-- ========== STORYTELLING — Fast Response Network (full-bleed visual) ========== --}}
    <section class="relative overflow-hidden text-white" style="background:linear-gradient(135deg, #1a0707 0%, #4a0606 40%, #07101f 100%);">
        <div class="absolute inset-0 opacity-30 pointer-events-none"
             style="background-image:
                radial-gradient(circle at 30% 30%, rgba(255,200,150,.6) 1px, transparent 1.5px),
                radial-gradient(circle at 70% 70%, rgba(255,255,255,.4) 1px, transparent 1.5px);
                background-size: 36px 36px;
                mask-image: radial-gradient(circle at 50% 50%, black, transparent 75%);"></div>
        <span class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[820px] h-[820px] rounded-full bg-red-600/15 blur-3xl pointer-events-none"></span>

        <div class="relative mx-auto max-w-7xl px-5 sm:px-8 py-20 lg:py-28">
            <div class="text-center max-w-3xl mx-auto fade-up">
                <p class="text-xs font-mono uppercase tracking-[.2em] text-red-300">Fast response network</p>
                <h2 class="mt-3 font-display font-extrabold text-3xl sm:text-4xl lg:text-5xl leading-[1.05] tracking-tight">
                    A network of <span class="grad-red">12,000+ verified responders</span> — moving the moment you need them.
                </h2>
                <p class="mt-5 text-white/75 leading-relaxed">
                    Trained, badged, background-checked. The nearest verified responder accepts within seconds — and stays on the line until help is at your door.
                </p>
            </div>

            <div class="reveal mt-14 grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
                @foreach ([
                    ['v'=>'12K+','l'=>'Verified responders','i'=>'<path stroke-linecap="round" stroke-linejoin="round" d="M16 11a4 4 0 10-8 0 4 4 0 008 0zM3 21a7 7 0 0118 0"/>'],
                    ['v'=>'30+', 'l'=>'Cities live','i'=>'<path stroke-linecap="round" stroke-linejoin="round" d="M12 22s8-7.5 8-13a8 8 0 10-16 0c0 5.5 8 13 8 13z"/><circle cx="12" cy="9" r="2.5"/>'],
                    ['v'=>'8s',  'l'=>'To dispatch','i'=>'<path stroke-linecap="round" stroke-linejoin="round" d="M12 8v4l3 2M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>'],
                    ['v'=>'99.9%','l'=>'Uptime SLA','i'=>'<path stroke-linecap="round" stroke-linejoin="round" d="M12 3l8 4v5c0 5-3.5 8.5-8 9-4.5-.5-8-4-8-9V7l8-4z"/><path stroke-linecap="round" stroke-linejoin="round" d="M9.5 12l2 2 3.5-4"/>'],
                ] as $stat)
                    <div class="glass rounded-3xl p-6 hover:-translate-y-1 transition-transform duration-500">
                        <span class="flex w-12 h-12 items-center justify-center rounded-2xl bg-red-600 text-white shadow-lg ring-1 ring-white/20" style="box-shadow:0 14px 30px -10px rgba(251,6,6,.45)">
                            <svg class="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">{!! $stat['i'] !!}</svg>
                        </span>
                        <div class="mt-5 font-display text-4xl font-extrabold">{{ $stat['v'] }}</div>
                        <div class="mt-1 font-mono text-[10.5px] uppercase tracking-[.18em] text-white/60">{{ $stat['l'] }}</div>
                    </div>
                @endforeach
            </div>

            {{-- responder portrait strip --}}
            <div class="reveal mt-12 flex flex-wrap items-center justify-center gap-4">
                <div class="flex -space-x-3">
                    @foreach (['officer-1.jpg','officer-2.jpg','officer-3.jpg','officer-4.jpg'] as $o)
                        <img src="/images/{{ $o }}" alt="Verified responder" class="w-12 h-12 rounded-full ring-4 ring-navy-950 object-cover" />
                    @endforeach
                    <span class="grid place-items-center w-12 h-12 rounded-full ring-4 ring-navy-950 bg-emerald-500 text-navy-950 font-display font-extrabold text-xs">+12K</span>
                </div>
                <p class="font-mono text-[11px] uppercase tracking-[.2em] text-white/60">verified · badge-credentialed · background-checked</p>
            </div>
        </div>
    </section>

    {{-- ========== FAQ ========== --}}
    <section class="relative bg-ink-50">
        <div class="mx-auto max-w-5xl px-5 sm:px-8 py-20 lg:py-28">
            <div class="text-center max-w-2xl mx-auto">
                <p class="reveal text-xs font-mono uppercase tracking-[.2em] text-brand-600">Frequently asked</p>
                <h2 class="reveal reveal-delay-1 mt-4 font-display font-extrabold text-3xl sm:text-4xl lg:text-5xl tracking-tight text-navy-900">
                    Everything you wanted <span class="text-brand-600">to ask.</span>
                </h2>
                <p class="reveal reveal-delay-2 mt-5 text-navy-700/80 leading-relaxed">
                    Real answers from our safety team. Still curious? Reach us anytime — we read every note.
                </p>
            </div>

            <div class="reveal mt-12 space-y-3" data-citizen-faq>
                @foreach ([
                    ['q'=>'Is Auxilio Citizen actually free?','a'=>"Yes. Our citizen tier is free forever. You pay for what businesses, schools, and PDs use — never for personal safety. We don't sell your data, ever."],
                    ['q'=>'Who responds when I press the SOS button?','a'=>"Verified Auxilio responders nearest to you receive the alert simultaneously — and the first to accept takes the call. For medical or serious threats, we also bridge directly to local 911 dispatch."],
                    ['q'=>'Can my family see my location all the time?','a'=>"Only when you choose. You control who's in your circle, when you go live, and when you stay private. Setup takes less than 30 seconds, and you can toggle visibility per person."],
                    ['q'=>'How accurate is the crime + offender map?','a'=>"Crime data is sourced from live municipal feeds where available, and verified citizen reports elsewhere. Offender records are pulled directly from public registries and refreshed daily."],
                    ['q'=>'What happens if I press SOS by accident?','a'=>"You get a 5-second countdown to cancel right inside the app. If a call goes through, you can flag it as a false alarm with one tap — no penalty, no judgment. We'd rather have one extra check-in than one missed call."],
                    ['q'=>'Does Auxilio work outside my city?','a'=>"Coverage is live in 30+ cities and expanding fast. Outside coverage, SOS still bridges to local emergency services and shares your location with your family circle."],
                ] as $i => $f)
                    <div data-faq-item @if($i===0) data-open @endif class="rounded-md bg-white ring-1 ring-ink-100 overflow-hidden shadow-sm hover:shadow-md transition">
                        <button type="button" data-faq-toggle class="w-full flex items-center gap-5 text-left px-5 sm:px-6 py-5 group">
                            <span class="flex w-9 h-9 shrink-0 items-center justify-center rounded-md bg-brand-50 text-brand-600 font-display font-extrabold text-sm">{{ str_pad($i+1, 2, '0', STR_PAD_LEFT) }}</span>
                            <span class="flex-1 font-display font-bold text-[15px] sm:text-base text-navy-900 group-hover:text-brand-600 transition">{{ $f['q'] }}</span>
                            <span data-faq-icon class="flex w-8 h-8 shrink-0 items-center justify-center rounded-full bg-ink-50 text-navy-900 transition group-hover:bg-brand-50 group-hover:text-brand-600">
                                <svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4"><path stroke-linecap="round" stroke-linejoin="round" d="M6 9l6 6 6-6"/></svg>
                            </span>
                        </button>
                        <div data-faq-body class="px-5 sm:px-6 pl-[78px] sm:pl-[88px] text-[14.5px] text-navy-700/80 leading-relaxed {{ $i===0 ? 'pb-5' : '' }}">
                            <div class="pb-5">{{ $f['a'] }}</div>
                        </div>
                    </div>
                @endforeach
            </div>
        </div>
    </section>

    {{-- ========== FINAL CTA — warm, hopeful, emotional ========== --}}
    <section class="relative overflow-hidden text-white" style="background:linear-gradient(155deg, #060c1a 0%, #1a0707 45%, #2a0a0a 75%, #060c1a 100%);">
        <div class="absolute inset-0 pointer-events-none">
            <div class="absolute -top-32 -left-20 w-[520px] h-[520px] rounded-full bg-red-600/30 blur-3xl"></div>
            <div class="absolute -bottom-32 -right-10 w-[560px] h-[560px] rounded-full bg-amber-400/15 blur-3xl"></div>
            <div class="absolute top-1/2 left-1/4 w-[300px] h-[300px] rounded-full bg-rose-500/15 blur-3xl"></div>
        </div>
        <div class="absolute inset-0 opacity-25 pointer-events-none"
             style="background-image:
                linear-gradient(rgba(255,255,255,.05) 1px, transparent 1px),
                linear-gradient(90deg, rgba(255,255,255,.05) 1px, transparent 1px);
                background-size: 56px 56px;
                mask-image: radial-gradient(circle at 50% 50%, black, transparent 70%);"></div>

        <div class="relative mx-auto max-w-7xl px-5 sm:px-8 py-20 lg:py-32">
            <div class="grid lg:grid-cols-12 gap-12 lg:gap-16 items-center">
                <div class="lg:col-span-7">
                    <span class="reveal inline-flex items-center gap-2 rounded-full bg-white/10 ring-1 ring-white/15 backdrop-blur text-white text-xs font-bold uppercase tracking-wider px-3 py-1.5">
                        <span class="relative flex w-1.5 h-1.5">
                            <span class="absolute inset-0 rounded-full bg-red-500 animate-ping opacity-70"></span>
                            <span class="relative w-1.5 h-1.5 rounded-full bg-red-500"></span>
                        </span>
                        Ready when life isn't
                    </span>
                    <h2 class="reveal reveal-delay-1 mt-5 font-display font-extrabold text-3xl sm:text-4xl lg:text-6xl leading-[1.02] tracking-tight">
                        Bring everyone <br/>
                        <span class="grad-red">home tonight.</span>
                    </h2>
                    <p class="reveal reveal-delay-2 mt-6 max-w-xl text-white/80 leading-relaxed text-lg">
                        Free for families. Encrypted by default. Live in 30+ cities. Auxilio is the safety companion that loves your people as much as you do — quietly there, instantly ready.
                    </p>

                    <div class="reveal reveal-delay-3 mt-8 flex flex-wrap items-center gap-3">
                        <a href="#" class="inline-flex shrink-0 transition hover:-translate-y-0.5 hover:opacity-95 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-500 rounded-lg"><img src="/images/app-store-badge.png" alt="Download on the App Store" class="h-12 sm:h-14 w-auto rounded-lg shadow-md" /></a>
                        <a href="#" class="inline-flex shrink-0 transition hover:-translate-y-0.5 hover:opacity-95 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-500 rounded-lg"><img src="/images/google-play-badge.png" alt="Get it on Google Play" class="h-12 sm:h-14 w-auto rounded-lg shadow-md" /></a>
                    </div>

                    <div class="reveal reveal-delay-4 mt-10 flex flex-wrap items-center gap-x-8 gap-y-3 text-sm text-white/70">
                        <span class="inline-flex items-center gap-2">
                            <svg class="w-4 h-4 text-emerald-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4"><path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7"/></svg>
                            Free, forever for families
                        </span>
                        <span class="inline-flex items-center gap-2">
                            <svg class="w-4 h-4 text-emerald-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4"><path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7"/></svg>
                            No credit card to start
                        </span>
                        <span class="inline-flex items-center gap-2">
                            <svg class="w-4 h-4 text-emerald-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4"><path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7"/></svg>
                            We never sell your data
                        </span>
                    </div>
                </div>

                <div class="lg:col-span-5">
                    <div class="reveal reveal-right relative max-w-md mx-auto">
                        {{-- glowing aura --}}
                        <span class="absolute -inset-10 rounded-[44px] blur-3xl bg-red-600/30 pointer-events-none"></span>
                        <span class="absolute -bottom-8 -right-8 w-44 h-44 rounded-full blur-2xl bg-amber-400/30 pointer-events-none"></span>

                        {{-- main warm family photo --}}
                        <div class="relative rounded-[32px] overflow-hidden aspect-[4/5] ring-1 ring-white/15 lush-shadow float-slow">
                            <img src="/images/citizen/family-park-walk.jpg" alt="Families at sunset, safe together" class="absolute inset-0 w-full h-full object-cover" />
                            <div class="absolute inset-0 bg-gradient-to-t from-navy-950/85 via-navy-950/15 to-transparent"></div>

                            <div class="absolute bottom-5 left-5 right-5">
                                <div class="glass rounded-2xl px-4 py-3 flex items-center gap-3 text-white">
                                    <span class="flex w-11 h-11 items-center justify-center rounded-full bg-red-600 text-white shadow-lg " style="box-shadow:0 14px 30px -10px rgba(251,6,6,.55)">
                                        <svg class="w-5 h-5" viewBox="0 0 24 24" fill="currentColor"><path d="M12 21s-7-4.35-7-10a5 5 0 019-3 5 5 0 019 3c0 5.65-7 10-7 10z"/></svg>
                                    </span>
                                    <div class="leading-tight">
                                        <div class="font-mono text-[10px] uppercase tracking-[.18em] text-white/65">Protected · Live</div>
                                        <div class="font-display text-sm font-bold">All 4 family members home</div>
                                    </div>
                                    <span class="ml-auto beacon"></span>
                                </div>
                            </div>
                        </div>

                        {{-- floating thumb: real family --}}
                        <div class="hidden md:block float-card absolute -left-10 -bottom-6 w-36 rounded-2xl overflow-hidden ring-2 ring-white/25 shadow-2xl tilt-l">
                            <div class="relative aspect-square">
                                <img src="/images/citizen/family-hugging.jpg" alt="Family safe" class="absolute inset-0 w-full h-full object-cover" />
                                <div class="absolute inset-0 bg-gradient-to-t from-navy-950/60 via-transparent to-transparent"></div>
                                <span class="absolute bottom-2 left-2 right-2 text-center text-[9.5px] font-mono uppercase tracking-[.14em] text-white">Hello, neighbor.</span>
                            </div>
                        </div>

                        {{-- floating QR-style download chip --}}
                        <div class="hidden md:flex float-card delay-2 absolute -right-8 top-12 items-center gap-3 rounded-2xl bg-white text-navy-900 px-4 py-3 shadow-2xl ring-1 ring-ink-100" style="min-width:215px;">
                            <span class="flex w-11 h-11 items-center justify-center rounded-full bg-amber-400 text-navy-900">
                                <svg class="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4"><path stroke-linecap="round" stroke-linejoin="round" d="M12 4v16m0 0l-5-5m5 5l5-5"/></svg>
                            </span>
                            <div class="leading-tight">
                                <div class="font-mono text-[10px] uppercase tracking-[.18em] text-amber-700 font-bold">FREE DOWNLOAD</div>
                                <div class="font-display text-[14px] font-bold">iOS &amp; Android</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>

    <script>
    (function(){
        /* ---- Stats counter ---- */
        var stats = document.querySelector('[data-view="citizen-app"] [data-citizen-stats]');
        if (stats) {
            var nums = stats.querySelectorAll('[data-stat-num]');
            var animated = false;
            function animate() {
                if (animated) return;
                animated = true;
                nums.forEach(function(el){
                    var to = parseFloat(el.getAttribute('data-stat-to'));
                    var duration = 1400, start = performance.now();
                    function tick(now) {
                        var t = Math.min((now - start) / duration, 1);
                        var eased = 1 - Math.pow(1 - t, 3);
                        var val = Math.round(to * eased);
                        el.textContent = val.toLocaleString();
                        if (t < 1) requestAnimationFrame(tick);
                    }
                    requestAnimationFrame(tick);
                });
            }
            if ('IntersectionObserver' in window) {
                var io = new IntersectionObserver(function(entries){
                    entries.forEach(function(e){ if (e.isIntersecting) { animate(); io.disconnect(); } });
                }, { threshold: 0.3 });
                io.observe(stats);
            } else animate();
            window.addEventListener('hashchange', function(){
                if (location.hash === '#/citizen-app') { animated = false; nums.forEach(function(n){ n.textContent='0'; }); setTimeout(animate, 250); }
            });
        }

        /* ---- 4-step onboarding carousel ---- */
        var stepsRoot = document.querySelector('[data-view="citizen-app"] [data-citizen-steps]');
        if (stepsRoot) {
            var steps = Array.prototype.slice.call(stepsRoot.querySelectorAll('[data-citizen-step]'));
            var img     = document.querySelector('[data-view="citizen-app"] [data-citizen-step-img]');
            var counter = document.querySelector('[data-view="citizen-app"] [data-citizen-step-counter]');
            var stepBadge   = document.querySelector('[data-view="citizen-app"] [data-citizen-step-badge]');
            var stepCaption = document.querySelector('[data-view="citizen-app"] [data-citizen-step-caption]');
            var prev = document.querySelector('[data-view="citizen-app"] [data-citizen-step-prev]');
            var next = document.querySelector('[data-view="citizen-app"] [data-citizen-step-next]');
            var i = 0;
            function go(n) {
                i = (n + steps.length) % steps.length;
                steps.forEach(function(s, idx){
                    var badge = s.querySelector('span');
                    if (idx === i) {
                        s.setAttribute('data-active','');
                        s.className = 'cursor-pointer rounded-md bg-white border-2 border-brand-200 shadow-lg p-5 lg:p-6 transition';
                        if (badge) badge.className = 'flex w-11 h-11 shrink-0 items-center justify-center rounded-full bg-red-600 text-white font-display font-extrabold transition';
                    } else {
                        s.removeAttribute('data-active');
                        s.className = 'cursor-pointer rounded-md bg-white border-2 border-transparent hover:border-brand-200 hover:shadow-md p-5 lg:p-6 transition';
                        if (badge) badge.className = 'flex w-11 h-11 shrink-0 items-center justify-center rounded-full bg-brand-50 text-brand-600 ring-1 ring-brand-100 font-display font-extrabold transition';
                    }
                });
                var stepData = steps[i];
                if (img) {
                    var src = stepData.getAttribute('data-img');
                    img.style.opacity = '0';
                    setTimeout(function(){ img.src = src; img.style.opacity = '1'; }, 180);
                }
                if (stepCaption) {
                    var heading = stepData.querySelector('h3');
                    if (heading) stepCaption.textContent = heading.textContent;
                }
                if (stepBadge) {
                    stepBadge.innerHTML = '<span class="w-1.5 h-1.5 rounded-full bg-red-600"></span>Step ' + String(i+1).padStart(2,'0');
                }
                if (counter) counter.textContent = 'Step ' + String(i+1).padStart(2,'0') + ' of ' + String(steps.length).padStart(2,'0');
            }
            steps.forEach(function(s){ s.addEventListener('click', function(){ go(parseInt(s.getAttribute('data-citizen-step'),10)); }); });
            if (prev) prev.addEventListener('click', function(){ go(i-1); });
            if (next) next.addEventListener('click', function(){ go(i+1); });
            setInterval(function(){
                var view = document.querySelector('[data-view="citizen-app"]');
                if (view && !view.classList.contains('hidden') && document.visibilityState === 'visible') go(i+1);
            }, 5500);
        }

        /* ---- FAQ accordion ---- */
        var faqRoot = document.querySelector('[data-view="citizen-app"] [data-citizen-faq]');
        if (faqRoot) {
            var items = faqRoot.querySelectorAll('[data-faq-item]');
            items.forEach(function(item){
                var btn = item.querySelector('[data-faq-toggle]');
                if (!btn) return;
                btn.addEventListener('click', function(){
                    var isOpen = item.hasAttribute('data-open');
                    items.forEach(function(o){ o.removeAttribute('data-open'); });
                    if (!isOpen) item.setAttribute('data-open','');
                });
            });
        }

        /* ---- Emergency Types auto-rotating 3-card gallery ---- */
        var emRoot   = document.querySelector('[data-view="citizen-app"] #emergency-types');
        var emGallery= emRoot && emRoot.querySelector('[data-em-gallery]');
        var emData   = (function(){
            try { var n = emRoot && emRoot.querySelector('[data-em-data]'); return n ? JSON.parse(n.textContent) : []; }
            catch(e){ return []; }
        })();
        if (emRoot && emGallery && emData.length) {
            var slots     = emGallery.querySelectorAll('[data-em-slot]');
            var dots      = emRoot.querySelectorAll('[data-em-page]');
            var pageLabel = emRoot.querySelector('[data-em-page-label]');
            var progress  = emRoot.querySelector('[data-em-progress]');
            var prevBtn   = emRoot.querySelector('[data-em-prev]');
            var nextBtn   = emRoot.querySelector('[data-em-next]');

            var perPage = slots.length;            // 3
            var totalPages = Math.max(1, Math.ceil(emData.length / perPage));
            // pad data so last page is full
            var padded = emData.slice();
            while (padded.length < totalPages * perPage) padded.push(emData[padded.length % emData.length]);

            var page = 0;
            var hovering = false;
            var ROT_MS = 5500;
            var STEP_MS = 80;
            var elapsed = 0;
            var rafTimer = null;

            function svgIcon(d) {
                return '<svg class="w-7 h-7" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="'+ d +'"/></svg>';
            }
            function escapeHtml(s){ return String(s||'').replace(/[&<>"']/g, function(c){return ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'})[c]; }); }

            function renderCard(em, idxGlobal) {
                var bg = '';
                if (em.img) {
                    bg = ''
                      + '<img class="em-img absolute inset-0 w-full h-full object-cover" src="'+ em.img +'" alt="'+ escapeHtml(em.title) +'" />'
                      + '<div class="absolute inset-0" style="background:linear-gradient(180deg, rgba(10,18,36,0) 0%, rgba(10,18,36,.45) 55%, rgba(10,18,36,.95) 100%);"></div>'
                      + '<div class="absolute inset-0" style="background:linear-gradient(135deg, '+ em.tone +'33 0%, '+ em.tone2 +'33 100%); mix-blend-mode: multiply;"></div>';
                } else {
                    bg = ''
                      + '<div class="em-illust-bg absolute inset-0" style="background:linear-gradient(135deg, '+ em.tone +' 0%, '+ em.tone2 +' 100%);"></div>'
                      + '<div class="absolute -top-10 -right-10 w-44 h-44 rounded-full" style="background: rgba(255,255,255,.18); filter: blur(28px);"></div>'
                      + '<div class="absolute -bottom-12 -left-10 w-40 h-40 rounded-full" style="background: rgba(255,255,255,.12); filter: blur(28px);"></div>';
                }
                var num = String(idxGlobal + 1).padStart(2,'0');
                return ''
                  + '<div class="em-inner">'
                  +   bg
                  +   '<div class="absolute top-4 left-4 z-10">'
                  +     '<span class="em-icon-chip flex w-12 h-12 items-center justify-center rounded-2xl" style="background:rgba(255,255,255,.96); color:'+ em.tone +'; box-shadow:0 8px 18px -6px rgba(0,0,0,.25);">'
                  +       svgIcon(em.icon)
                  +     '</span>'
                  +   '</div>'
                  +   '<span class="absolute top-4 right-4 z-10 rounded-full text-white text-[9.5px] font-mono uppercase tracking-[.18em] px-2.5 py-1 font-bold shadow-lg" style="background:'+ em.tone +';">'+ num +' · TYPE</span>'
                  +   '<div class="absolute inset-x-0 bottom-0 p-5 sm:p-6 z-10 text-white">'
                  +     '<h3 class="font-display text-xl sm:text-2xl font-bold leading-tight">'+ escapeHtml(em.title) +'</h3>'
                  +     '<p class="mt-2 text-[13px] sm:text-[13.5px] text-white/90 leading-relaxed">'+ escapeHtml(em.desc) +'</p>'
                  +     '<div class="mt-4 flex items-center justify-between gap-3">'
                  +       '<div class="inline-flex items-center gap-2">'
                  +         '<span class="beacon" style="background:#fff;"></span>'
                  +         '<span class="font-mono text-[10px] uppercase tracking-[.18em] text-white/85 font-bold">Avg. response &lt; 4 min</span>'
                  +       '</div>'
                  +     '</div>'
                  +   '</div>'
                  + '</div>';
            }

            function setPage(p, animated) {
                page = ((p % totalPages) + totalPages) % totalPages;
                if (animated) slots.forEach(function(s){ s.classList.add('em-fade-out'); });
                var apply = function() {
                    for (var i = 0; i < perPage; i++) {
                        var globalIdx = (page * perPage + i) % emData.length;
                        slots[i].innerHTML = renderCard(padded[page * perPage + i], globalIdx);
                        slots[i].classList.remove('em-fade-out');
                    }
                    if (pageLabel) pageLabel.textContent = 'Page ' + (page + 1) + ' of ' + totalPages;
                    dots.forEach(function(d, i){
                        if (i === page) d.classList.add('is-active');
                        else d.classList.remove('is-active');
                    });
                };
                if (animated) setTimeout(apply, 280);
                else apply();
                elapsed = 0;
                if (progress) progress.style.width = '0%';
            }

            function tick() {
                if (!hovering) {
                    elapsed += STEP_MS;
                    if (progress) progress.style.width = Math.min(100, (elapsed / ROT_MS) * 100) + '%';
                    if (elapsed >= ROT_MS) setPage(page + 1, true);
                }
                rafTimer = setTimeout(tick, STEP_MS);
            }

            // wire up
            dots.forEach(function(d){
                d.addEventListener('click', function(){
                    var p = parseInt(d.getAttribute('data-em-page'), 10) || 0;
                    setPage(p, true);
                });
            });
            if (prevBtn) prevBtn.addEventListener('click', function(){ setPage(page - 1, true); });
            if (nextBtn) nextBtn.addEventListener('click', function(){ setPage(page + 1, true); });
            emGallery.addEventListener('mouseenter', function(){ hovering = true; });
            emGallery.addEventListener('mouseleave', function(){ hovering = false; });
            // restart when navigating into citizen view
            window.addEventListener('hashchange', function(){
                if (location.hash === '#/citizen-app') setPage(0, false);
            });

            setPage(0, false);
            tick();
        }

        /* ---- Scroll-triggered reveal: .stagger-in + .fade-up ---- */
        if ('IntersectionObserver' in window) {
            var revealEls = document.querySelectorAll('[data-view="citizen-app"] .stagger-in, [data-view="citizen-app"] .fade-up');
            var revealIO = new IntersectionObserver(function(entries){
                entries.forEach(function(e){
                    if (e.isIntersecting) {
                        e.target.classList.add('is-in');
                        revealIO.unobserve(e.target);
                    }
                });
            }, { threshold: 0.12, rootMargin: '0px 0px -8% 0px' });
            revealEls.forEach(function(el){ revealIO.observe(el); });

            /* Re-trigger when navigating back into the view */
            window.addEventListener('hashchange', function(){
                if (location.hash === '#/citizen-app') {
                    setTimeout(function(){
                        document.querySelectorAll('[data-view="citizen-app"] .stagger-in, [data-view="citizen-app"] .fade-up').forEach(function(el){
                            var rect = el.getBoundingClientRect();
                            if (rect.top < window.innerHeight * 0.9 && rect.bottom > 0) {
                                el.classList.add('is-in');
                            } else {
                                el.classList.remove('is-in');
                                revealIO.observe(el);
                            }
                        });
                    }, 80);
                }
            });
        } else {
            document.querySelectorAll('[data-view="citizen-app"] .stagger-in, [data-view="citizen-app"] .fade-up').forEach(function(el){ el.classList.add('is-in'); });
        }
    })();
    </script>
</div>

{{-- ============================================================
     ABOUT US VIEW
============================================================--}}
<div data-view="about" class="hidden">
    <section class="relative overflow-hidden hero-bg">
        <div class="pointer-events-none absolute inset-0 -z-10">
            <div class="absolute -top-32 left-1/3 w-[520px] h-[520px] rounded-full bg-brand-100/40 blur-3xl"></div>
            <div class="absolute bottom-0 right-0 w-[420px] h-[420px] rounded-full bg-gold-100/50 blur-3xl"></div>
        </div>
        <div class="mx-auto max-w-7xl px-5 sm:px-8 py-16 lg:py-24">
            <div class="reveal flex items-center gap-2 text-xs font-mono uppercase tracking-[.2em] text-ink-500">
                <a data-route href="#/" class="hover:text-brand-600 transition">Home</a><span>›</span><span class="text-navy-900">About us</span>
            </div>
            <h1 class="reveal reveal-delay-1 mt-3 font-display font-extrabold text-4xl sm:text-5xl lg:text-6xl tracking-tight text-navy-900">
                Built for the people <span class="text-brand-600">we love.</span>
            </h1>
            <p class="reveal reveal-delay-2 mt-4 text-lg text-navy-700/80 max-w-2xl">
                Auxilio started after a near-miss in our own family. We couldn't find a way to summon real, accountable help fast enough. So we built one.
            </p>

            <div class="reveal stagger mt-12 grid md:grid-cols-3 gap-6">
                @foreach ([
                    ['k'=>'500K+','v'=>'Citizens covered'],
                    ['k'=>'1,200+','v'=>'Verified Super Agents'],
                    ['k'=>'< 4 min','v'=>'Median response time'],
                ] as $stat)
                    <div class="rounded-md border border-ink-100 bg-white p-7 shadow-sm">
                        <p class="font-display text-4xl font-extrabold text-brand-600">{{ $stat['k'] }}</p>
                        <p class="mt-1 text-sm text-navy-700/80 uppercase tracking-wider font-semibold">{{ $stat['v'] }}</p>
                    </div>
                @endforeach
            </div>

            <div class="mt-16 grid lg:grid-cols-2 gap-12 items-start">
                <div class="reveal reveal-left">
                    <p class="text-xs font-bold uppercase tracking-[.2em] text-brand-600">Our mission</p>
                    <h2 class="mt-3 font-display font-extrabold text-3xl sm:text-4xl tracking-tight text-navy-900">Make safety <em class="not-italic text-brand-600">accessible</em>, not aspirational.</h2>
                    <p class="mt-4 text-navy-700/80 leading-relaxed">
                        911 is a finite resource. Private security is a privilege. We're building a third lane — citizen-grade response, vetted operators, and transparent pricing — so help is no longer a question of who you know or what you can pay.
                    </p>
                </div>
                <div class="reveal reveal-right">
                    <p class="text-xs font-bold uppercase tracking-[.2em] text-brand-600">Our values</p>
                    <ul class="mt-4 space-y-4">
                        @foreach ([['Accountability','Every dispatch is logged, signed, and auditable. No anonymous responders.'],['Privacy first','Location data lives only as long as the case does.'],['Calm by default','Our app should be boring 99% of the time. The 1% is what we trained for.'],['Open to oversight','We invite local LE, civic groups, and journalists into our process.']] as $v)
                            <li class="flex gap-4">
                                <span class="grid place-items-center w-9 h-9 rounded-md bg-brand-50 text-brand-600 shrink-0 text-sm font-extrabold">{{ $loop->iteration }}</span>
                                <div>
                                    <p class="font-bold text-navy-900">{{ $v[0] }}</p>
                                    <p class="text-sm text-navy-700/80">{{ $v[1] }}</p>
                                </div>
                            </li>
                        @endforeach
                    </ul>
                </div>
            </div>

            <div class="mt-16">
                <p class="reveal text-xs font-bold uppercase tracking-[.2em] text-brand-600 text-center">Leadership</p>
                <h2 class="reveal reveal-delay-1 mt-3 text-center font-display font-extrabold text-3xl sm:text-4xl tracking-tight text-navy-900">The people behind it.</h2>
                <div class="reveal stagger mt-10 grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    @foreach ([
                        ['n'=>'Marcus Holloway','r'=>'Co-founder & CEO','p'=>'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=320&h=320&fit=crop&q=80'],
                        ['n'=>'Priya Shah','r'=>'Co-founder & CTO','p'=>'https://images.unsplash.com/photo-1573497019418-b400bb3ab074?w=320&h=320&fit=crop&q=80'],
                        ['n'=>'James Pierce','r'=>'Head of Operations','p'=>'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=320&h=320&fit=crop&q=80'],
                        ['n'=>'Lena Brooks','r'=>'Head of Trust & Safety','p'=>'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=320&h=320&fit=crop&q=80'],
                    ] as $p)
                        <div class="rounded-md border border-ink-100 bg-white p-5 text-center shadow-sm hover:shadow-lg transition">
                            <img src="{{ $p['p'] }}" alt="{{ $p['n'] }}" class="w-24 h-24 mx-auto rounded-full object-cover ring-4 ring-brand-50" loading="lazy" />
                            <p class="mt-4 font-bold text-navy-900">{{ $p['n'] }}</p>
                            <p class="text-xs text-ink-500 uppercase tracking-wider mt-1">{{ $p['r'] }}</p>
                        </div>
                    @endforeach
                </div>
            </div>
        </div>
    </section>
</div>

{{-- ============================================================
     CONTACT US VIEW
============================================================--}}
<div data-view="contact" class="hidden">
    <section class="relative overflow-hidden hero-bg">
        <div class="pointer-events-none absolute inset-0 -z-10">
            <div class="absolute -top-32 right-1/4 w-[520px] h-[520px] rounded-full bg-navy-100/60 blur-3xl"></div>
            <div class="absolute bottom-0 left-0 w-[420px] h-[420px] rounded-full bg-brand-100/40 blur-3xl"></div>
        </div>
        <div class="mx-auto max-w-7xl px-5 sm:px-8 py-16 lg:py-24">
            <div class="reveal flex items-center gap-2 text-xs font-mono uppercase tracking-[.2em] text-ink-500">
                <a data-route href="#/" class="hover:text-brand-600 transition">Home</a><span>›</span><span class="text-navy-900">Contact us</span>
            </div>
            <h1 class="reveal reveal-delay-1 mt-3 font-display font-extrabold text-4xl sm:text-5xl lg:text-6xl tracking-tight text-navy-900">
                Talk to <span class="text-brand-600">us.</span>
            </h1>
            <p class="reveal reveal-delay-2 mt-4 text-lg text-navy-700/80 max-w-2xl">
                Press, partnerships, agent applications, or just questions — drop us a line and a real human will reply within one business day.
            </p>

            <div class="mt-12 grid lg:grid-cols-12 gap-10">
                <div class="reveal reveal-left lg:col-span-5 space-y-4">
                    @foreach ([
                        ['i'=>'M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z','t'=>'Email','v'=>'support@auxilionetwork.com','h'=>'mailto:support@auxilionetwork.com'],
                        ['i'=>'M3 5a2 2 0 012-2h3.28a1 1 0 01.95.68l1.5 4.49a1 1 0 01-.5 1.21l-2.26 1.13a11 11 0 005.52 5.52l1.13-2.26a1 1 0 011.21-.5l4.49 1.5a1 1 0 01.68.95V19a2 2 0 01-2 2h-1C9.72 21 3 14.28 3 6V5z','t'=>'Phone','v'=>'(704) 555-0127','h'=>'tel:+17045550127'],
                        ['i'=>'M12 22s8-7.5 8-13a8 8 0 10-16 0c0 5.5 8 13 8 13z','t'=>'Headquarters','v'=>'1 Mission Way, San Francisco, CA 94103','h'=>'#'],
                    ] as $info)
                        <a href="{{ $info['h'] }}" class="flex items-start gap-4 rounded-md border border-ink-100 bg-white p-5 hover:shadow-lg transition">
                            <span class="grid place-items-center w-11 h-11 rounded-md bg-brand-50 text-brand-600 shrink-0">
                                <svg class="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="{{ $info['i'] }}"/></svg>
                            </span>
                            <div>
                                <p class="text-xs font-bold uppercase tracking-wider text-ink-500">{{ $info['t'] }}</p>
                                <p class="mt-1 font-semibold text-navy-900">{{ $info['v'] }}</p>
                            </div>
                        </a>
                    @endforeach
                </div>

                <form action="#contact" method="POST" class="reveal reveal-right lg:col-span-7 rounded-md border border-ink-100 bg-white p-7 shadow-sm space-y-5">
                    <div class="grid sm:grid-cols-2 gap-5">
                        <label class="block">
                            <span class="text-xs font-bold uppercase tracking-wider text-navy-900">Your name</span>
                            <input type="text" name="name" required class="mt-1.5 w-full rounded-md border border-ink-200 px-4 py-3 text-sm focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-100 transition" placeholder="Jane Doe" />
                        </label>
                        <label class="block">
                            <span class="text-xs font-bold uppercase tracking-wider text-navy-900">Email</span>
                            <input type="email" name="email" required class="mt-1.5 w-full rounded-md border border-ink-200 px-4 py-3 text-sm focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-100 transition" placeholder="you@example.com" />
                        </label>
                    </div>
                    <label class="block">
                        <span class="text-xs font-bold uppercase tracking-wider text-navy-900">Topic</span>
                        <select name="topic" class="mt-1.5 w-full rounded-md border border-ink-200 px-4 py-3 text-sm bg-white focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-100 transition">
                            <option>General question</option>
                            <option>Become a Super Agent</option>
                            <option>Partnership / press</option>
                            <option>Bug report</option>
                            <option>Account help</option>
                        </select>
                    </label>
                    <label class="block">
                        <span class="text-xs font-bold uppercase tracking-wider text-navy-900">Message</span>
                        <textarea name="message" rows="5" required class="mt-1.5 w-full rounded-md border border-ink-200 px-4 py-3 text-sm focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-100 transition" placeholder="Tell us what's on your mind…"></textarea>
                    </label>
                    <button type="submit" class="inline-flex items-center gap-2 rounded-md bg-brand-600 hover:bg-brand-700 text-white text-sm font-bold px-6 py-3 transition">
                        Send message
                        <svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M5 12h14m0 0l-6-6m6 6l-6 6"/></svg>
                    </button>
                    <p class="text-xs text-ink-500">By submitting you agree to our privacy policy. We never share your details.</p>
                </form>
            </div>
        </div>
    </section>
</div>

{{-- Shared Incident / Profile Detail Modal --}}
<div id="incident-modal" class="fixed inset-0 z-[9999] hidden">
    <div class="absolute inset-0 bg-navy-950/50 backdrop-blur-sm" data-modal-close></div>
    <div class="modal-panel absolute right-0 top-0 bottom-0 w-full max-w-md bg-white shadow-2xl overflow-y-auto">
        <button class="absolute top-4 right-4 z-10 grid place-items-center w-9 h-9 rounded-full bg-white border border-ink-100 shadow hover:bg-ink-50 transition" data-modal-close aria-label="Close">
            <svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12"/></svg>
        </button>
        <div class="p-6 pt-14 space-y-6" id="incident-modal-body"></div>
    </div>
</div>

</main>

{{-- =======================================================================
     FOOTER
========================================================================--}}
<footer class="bg-navy-950 text-navy-200">
    <div class="mx-auto max-w-7xl px-5 sm:px-8 pt-20 pb-10">
        <div class="grid lg:grid-cols-12 gap-12">
            <div class="lg:col-span-5">
                <a href="#top" class="inline-flex items-center gap-3 group">
                    <span class="grid place-items-center h-12 w-12 rounded-md bg-white shadow-sm transition-transform group-hover:rotate-[-4deg]">
                        <img src="/images/auxilio-shield.png" alt="" class="h-10 w-auto" />
                    </span>
                    <img src="/images/auxilio-logo-white.png" alt="Auxilio" class="h-6 w-auto" />
                </a>
                <p class="mt-5 max-w-md text-navy-300/80 leading-relaxed">
                    Real-time alerts, one-tap SOS, verified Super Agents, and live case tracking — Auxilio User is a personal safety companion built for the people you love.
                </p>
            </div>

            <div class="lg:col-span-7 grid sm:grid-cols-3 gap-8">
                <div>
                    <p class="text-xs font-semibold uppercase tracking-[.18em] text-white">Product</p>
                    <ul class="mt-4 space-y-3 text-sm">
                        <li><a href="#features"    class="hover:text-white transition">Features</a></li>
                        <li><a href="#walkthrough" class="hover:text-white transition">Walkthrough</a></li>
                        <li><a href="#how"         class="hover:text-white transition">Report flow</a></li>
                        <li><a href="#dispatch"    class="hover:text-white transition">Live dispatch</a></li>
                        <li><a href="#contact"     class="hover:text-white transition">Download</a></li>
                    </ul>
                </div>
                <div>
                    <p class="text-xs font-semibold uppercase tracking-[.18em] text-white">Company</p>
                    <ul class="mt-4 space-y-3 text-sm">
                        <li><a href="#voices" class="hover:text-white transition">Voices</a></li>
                        <li><a href="#blog"   class="hover:text-white transition">Blog</a></li>
                        <li><a href="#"       class="hover:text-white transition">Careers</a></li>
                        <li><a href="#contact" class="hover:text-white transition">Contact</a></li>
                    </ul>
                </div>
                <div>
                    <p class="text-xs font-semibold uppercase tracking-[.18em] text-white">Reach us</p>
                    <ul class="mt-4 space-y-3 text-sm">
                        <li><a href="tel:+17045550127" class="hover:text-white transition">(704) 555-0127</a></li>
                        <li><a href="mailto:support@auxilionetwork.com" class="hover:text-white transition">support@auxilionetwork.com</a></li>
                        <li class="text-navy-400">1 Mission Way<br/>San Francisco, CA 94103</li>
                    </ul>
                </div>
            </div>
        </div>

        <div class="mt-16 pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-navy-400">
            <p>&copy; {{ date('Y') }} Auxilio User. All rights reserved.</p>
            <div class="flex items-center gap-5">
                <a href="#" class="hover:text-white transition">Privacy</a>
                <a href="#" class="hover:text-white transition">Terms</a>
                <a href="#" class="hover:text-white transition">Licenses</a>
            </div>
        </div>
    </div>
</footer>

<script defer src="https://unpkg.com/leaflet@1.9.4/dist/leaflet.js" integrity="sha256-20nQCchB9co0qIjJZRGuk2/Z9VM+kNiyxNV1lvTlZBo=" crossorigin=""></script>
<script>
(function(){
    'use strict';

    var NEWARK = [40.7357, -74.1724];

    var COLORS = { SC:'#f59e0b', RC:'#f97316', H:'#dc2626', PV:'#3b82f6', O:'#10b981' };

    /* Stock-photo pools (Unsplash) — sized 240x240 thumbnails */
    var EMERGENCY_PHOTOS = [
        'https://images.unsplash.com/photo-1486325212027-8081e485255e?w=240&h=240&fit=crop&q=80',
        'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=240&h=240&fit=crop&q=80',
        'https://images.unsplash.com/photo-1444723121867-7a241cacace9?w=240&h=240&fit=crop&q=80',
        'https://images.unsplash.com/photo-1519501025264-65ba15a82390?w=240&h=240&fit=crop&q=80',
        'https://images.unsplash.com/photo-1480714378408-67cf0d13bc1b?w=240&h=240&fit=crop&q=80',
        'https://images.unsplash.com/photo-1493246507139-91e8fad9978e?w=240&h=240&fit=crop&q=80',
        'https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?w=240&h=240&fit=crop&q=80',
        'https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=240&h=240&fit=crop&q=80'
    ];
    var INCIDENT_PHOTOS = [
        'https://images.unsplash.com/photo-1517490232338-06b912a786b5?w=240&h=240&fit=crop&q=80',
        'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=240&h=240&fit=crop&q=80',
        'https://images.unsplash.com/photo-1542435503-956c469947f6?w=240&h=240&fit=crop&q=80',
        'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=240&h=240&fit=crop&q=80',
        'https://images.unsplash.com/photo-1505066836950-2bea3df3a8d5?w=240&h=240&fit=crop&q=80',
        'https://images.unsplash.com/photo-1582719188393-bb71ca45dbb9?w=240&h=240&fit=crop&q=80',
        'https://images.unsplash.com/photo-1551898284-15bb6cea7820?w=240&h=240&fit=crop&q=80',
        'https://images.unsplash.com/photo-1532635241-17e820acc59f?w=240&h=240&fit=crop&q=80'
    ];
    function pickPhotos(pool, n, seed) {
        var out = [];
        for (var i = 0; i < n; i++) out.push(pool[(seed + i) % pool.length]);
        return out;
    }
    function photoGrid(photos) {
        var h = '<div class="grid grid-cols-4 gap-2 mt-2">';
        for (var i = 0; i < photos.length; i++) {
            h += '<a href="'+photos[i]+'" target="_blank" rel="noopener" class="group block aspect-square rounded-lg overflow-hidden ring-1 ring-ink-100 hover:ring-brand-500 transition">'
              +  '<img src="'+photos[i]+'" loading="lazy" class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300" />'
              +  '</a>';
        }
        h += '</div>';
        return h;
    }

    var INCIDENTS = [
        { id:1, lat:40.7585, lng:-74.1730, type:'SC',
          person:{name:'Karen Buldier', photo:'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&h=200&fit=crop&q=80', hair:'Straight', eyes:'Brown', height:"6'4", weight:'123.00', sex:'Male', race:'-'},
          address:'870 Broadway, Newark, NJ 07104, USA', status:100,
          agents:['https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=80&h=80&fit=crop&q=80','https://images.unsplash.com/photo-1573497019418-b400bb3ab074?w=80&h=80&fit=crop&q=80','https://images.unsplash.com/photo-1531427186611-ecfd6d936c79?w=80&h=80&fit=crop&q=80'],
          injured:[{x:50,y:14},{x:38,y:30},{x:50,y:36},{x:30,y:78}] },
        { id:2, lat:40.7510, lng:-74.1690, type:'SC',
          person:{name:'Sarah Mitchell', photo:'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200&h=200&fit=crop&q=80', hair:'Wavy', eyes:'Hazel', height:"5'6", weight:'135', sex:'Female', race:'White'},
          address:'45 Mt Prospect Ave, Newark, NJ', status:78,
          agents:['https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=80&h=80&fit=crop&q=80','https://images.unsplash.com/photo-1573497019418-b400bb3ab074?w=80&h=80&fit=crop&q=80'],
          injured:[{x:45,y:18},{x:55,y:32}] },
        { id:3, lat:40.7460, lng:-74.1810, type:'RC',
          person:{name:'Marcus Chen', photo:'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop&q=80', hair:'Black', eyes:'Brown', height:"5'10", weight:'170', sex:'Male', race:'Asian'},
          address:'Branford Pl, Newark, NJ', status:92,
          agents:['https://images.unsplash.com/photo-1531427186611-ecfd6d936c79?w=80&h=80&fit=crop&q=80'],
          injured:[{x:50,y:38}] },
        { id:4, lat:40.7395, lng:-74.1750, type:'H',
          person:{name:'Daniel Rivers', photo:'https://images.unsplash.com/photo-1521119989659-a83eee488004?w=200&h=200&fit=crop&q=80', hair:'Brown', eyes:'Green', height:"6'0", weight:'190', sex:'Male', race:'White'},
          address:'200 Mulberry St, Newark, NJ', status:100,
          agents:['https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=80&h=80&fit=crop&q=80','https://images.unsplash.com/photo-1573497019418-b400bb3ab074?w=80&h=80&fit=crop&q=80'],
          injured:[{x:50,y:14},{x:50,y:36}] },
        { id:5, lat:40.7370, lng:-74.1670, type:'SC',
          person:{name:'Linda Park', photo:'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=200&h=200&fit=crop&q=80', hair:'Black', eyes:'Brown', height:"5'4", weight:'120', sex:'Female', race:'Asian'},
          address:'15 Halsey St, Newark, NJ', status:65,
          agents:['https://images.unsplash.com/photo-1573497019418-b400bb3ab074?w=80&h=80&fit=crop&q=80'],
          injured:[{x:55,y:22}] },
        { id:6, lat:40.7300, lng:-74.1670, type:'RC',
          person:{name:'Tyrone Walker', photo:'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=200&h=200&fit=crop&q=80', hair:'Short', eyes:'Brown', height:"6'1", weight:'200', sex:'Male', race:'Black'},
          address:'Broad St & Market, Newark, NJ', status:88,
          agents:['https://images.unsplash.com/photo-1531427186611-ecfd6d936c79?w=80&h=80&fit=crop&q=80'],
          injured:[{x:60,y:30}] },
        { id:7, lat:40.7280, lng:-74.1580, type:'H',
          person:{name:'Robert Greene', photo:'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=200&h=200&fit=crop&q=80', hair:'Salt-pepper', eyes:'Blue', height:"5'9", weight:'175', sex:'Male', race:'White'},
          address:'East Ferry St, Newark, NJ', status:100,
          agents:['https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=80&h=80&fit=crop&q=80','https://images.unsplash.com/photo-1573497019418-b400bb3ab074?w=80&h=80&fit=crop&q=80','https://images.unsplash.com/photo-1531427186611-ecfd6d936c79?w=80&h=80&fit=crop&q=80'],
          injured:[{x:50,y:14},{x:42,y:36},{x:50,y:60}] },
        { id:8, lat:40.7240, lng:-74.1720, type:'O',
          person:{name:'Anonymous', photo:'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop&q=80', hair:'-', eyes:'-', height:'-', weight:'-', sex:'-', race:'-'},
          address:'Ironbound District, Newark, NJ', status:42,
          agents:[], injured:[] },
        { id:9, lat:40.7200, lng:-74.1450, type:'RC',
          person:{name:'Jasmine Reed', photo:'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=200&h=200&fit=crop&q=80', hair:'Curly', eyes:'Brown', height:"5'5", weight:'140', sex:'Female', race:'Black'},
          address:'Wilson Ave, Newark, NJ', status:73,
          agents:['https://images.unsplash.com/photo-1573497019418-b400bb3ab074?w=80&h=80&fit=crop&q=80'],
          injured:[{x:35,y:50}] },
        { id:10, lat:40.7155, lng:-74.1610, type:'SC',
          person:{name:'Emily Hart', photo:'https://images.unsplash.com/photo-1488426862026-3ee34a7d66df?w=200&h=200&fit=crop&q=80', hair:'Blonde', eyes:'Blue', height:"5'7", weight:'125', sex:'Female', race:'White'},
          address:'Frelinghuysen Ave, Newark, NJ', status:55,
          agents:['https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=80&h=80&fit=crop&q=80'],
          injured:[{x:48,y:24},{x:52,y:34}] },
        { id:11, lat:40.7090, lng:-74.1700, type:'RC',
          person:{name:'Carlos Vega', photo:'https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?w=200&h=200&fit=crop&q=80', hair:'Black', eyes:'Brown', height:"5'8", weight:'165', sex:'Male', race:'Hispanic'},
          address:'Weequahic Park, Newark, NJ', status:81,
          agents:['https://images.unsplash.com/photo-1531427186611-ecfd6d936c79?w=80&h=80&fit=crop&q=80'],
          injured:[{x:45,y:42}] },
        { id:12, lat:40.7020, lng:-74.1620, type:'SC',
          person:{name:'Rebecca Klein', photo:'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&h=200&fit=crop&q=80', hair:'Red', eyes:'Green', height:"5'6", weight:'130', sex:'Female', race:'White'},
          address:'Clinton Ave, Newark, NJ', status:60,
          agents:['https://images.unsplash.com/photo-1573497019418-b400bb3ab074?w=80&h=80&fit=crop&q=80'],
          injured:[{x:50,y:20}] },
        { id:13, lat:40.6940, lng:-74.1530, type:'PV',
          person:{name:'Aisha Brooks', photo:'https://images.unsplash.com/photo-1531123897727-8f129e1688ce?w=200&h=200&fit=crop&q=80', hair:'Braids', eyes:'Brown', height:"5'5", weight:'135', sex:'Female', race:'Black'},
          address:'Bayonne Bridge area, NJ', status:48,
          agents:[], injured:[{x:40,y:30}] },
        { id:14, lat:40.7480, lng:-74.1620, type:'H',
          person:{name:'Michael O\'Brien', photo:'https://images.unsplash.com/photo-1500048993953-d23a436266cf?w=200&h=200&fit=crop&q=80', hair:'Brown', eyes:'Hazel', height:"5'11", weight:'180', sex:'Male', race:'White'},
          address:'McCarter Hwy, Newark, NJ', status:100,
          agents:['https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=80&h=80&fit=crop&q=80','https://images.unsplash.com/photo-1531427186611-ecfd6d936c79?w=80&h=80&fit=crop&q=80'],
          injured:[{x:50,y:14},{x:50,y:36},{x:55,y:60}] },
        { id:15, lat:40.7530, lng:-74.1855, type:'SC',
          person:{name:'Olivia Tran', photo:'https://images.unsplash.com/photo-1502823403499-6ccfcf4fb453?w=200&h=200&fit=crop&q=80', hair:'Black', eyes:'Brown', height:"5'3", weight:'110', sex:'Female', race:'Asian'},
          address:'South Orange Ave, Newark, NJ', status:35,
          agents:[], injured:[{x:50,y:24}] }
    ];

    var OFFENDERS = [
        { id:101, lat:40.7515, lng:-74.1740, type:'PV',
          person:{name:'James K. Holland', photo:'https://images.unsplash.com/photo-1531891437562-4301cf35b7e4?w=200&h=200&fit=crop&q=80', hair:'Bald', eyes:'Blue', height:"5'11", weight:'195', sex:'Male', race:'White'},
          address:'118 Park Ave, Newark, NJ 07104',
          offense:'Sexual Assault, 2nd Degree',
          tier:'Tier 2 · Moderate',
          registeredSince:'2018-03-15',
          distance:'0.3 mi' },
        { id:102, lat:40.7460, lng:-74.1670, type:'PV',
          person:{name:'Anthony R. Pierce', photo:'https://images.unsplash.com/photo-1463453091185-61582044d556?w=200&h=200&fit=crop&q=80', hair:'Short Brown', eyes:'Hazel', height:"6'0", weight:'205', sex:'Male', race:'White'},
          address:'42 Halsey St, Newark, NJ 07102',
          offense:'Endangering the Welfare of a Child',
          tier:'Tier 1 · Low',
          registeredSince:'2020-09-02',
          distance:'0.7 mi' },
        { id:103, lat:40.7390, lng:-74.1850, type:'PV',
          person:{name:'David Mosley', photo:'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&h=200&fit=crop&q=80', hair:'Grey', eyes:'Brown', height:"5'8", weight:'170', sex:'Male', race:'Black'},
          address:'305 South Orange Ave, Newark, NJ',
          offense:'Aggravated Sexual Assault',
          tier:'Tier 3 · High',
          registeredSince:'2014-11-22',
          distance:'1.1 mi' },
        { id:104, lat:40.7330, lng:-74.1620, type:'PV',
          person:{name:'Steven Garrett', photo:'https://images.unsplash.com/photo-1480455624313-e29b44bbfde1?w=200&h=200&fit=crop&q=80', hair:'Black', eyes:'Brown', height:"5'10", weight:'185', sex:'Male', race:'Black'},
          address:'90 Market St, Newark, NJ',
          offense:'Criminal Sexual Contact',
          tier:'Tier 2 · Moderate',
          registeredSince:'2019-06-10',
          distance:'1.4 mi' },
        { id:105, lat:40.7250, lng:-74.1740, type:'PV',
          person:{name:'Frank L. Castle', photo:'https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?w=200&h=200&fit=crop&q=80', hair:'Bald', eyes:'Brown', height:"5'9", weight:'175', sex:'Male', race:'Hispanic'},
          address:'17 Avon Ave, Newark, NJ',
          offense:'Lewdness · Repeat',
          tier:'Tier 1 · Low',
          registeredSince:'2021-02-08',
          distance:'1.8 mi' },
        { id:106, lat:40.7185, lng:-74.1530, type:'PV',
          person:{name:'Marcus Whitfield', photo:'https://images.unsplash.com/photo-1519345182560-3f2917c472ef?w=200&h=200&fit=crop&q=80', hair:'Beard', eyes:'Green', height:"6'2", weight:'215', sex:'Male', race:'White'},
          address:'Wilson Ave & Wilson Pl, Newark, NJ',
          offense:'Sexual Assault, 1st Degree',
          tier:'Tier 3 · High',
          registeredSince:'2011-08-14',
          distance:'2.3 mi' },
        { id:107, lat:40.7100, lng:-74.1620, type:'PV',
          person:{name:'Eric Thompson', photo:'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=200&h=200&fit=crop&q=80', hair:'Brown', eyes:'Brown', height:"5'7", weight:'160', sex:'Male', race:'White'},
          address:'Frelinghuysen Ave, Newark, NJ',
          offense:'Endangering Welfare · Internet',
          tier:'Tier 2 · Moderate',
          registeredSince:'2017-04-30',
          distance:'2.6 mi' },
        { id:108, lat:40.7050, lng:-74.1450, type:'PV',
          person:{name:'Lawrence Diaz', photo:'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=200&h=200&fit=crop&q=80', hair:'Black', eyes:'Brown', height:"5'8", weight:'170', sex:'Male', race:'Hispanic'},
          address:'Bayonne, NJ (border)',
          offense:'Sexual Assault, 2nd Degree',
          tier:'Tier 2 · Moderate',
          registeredSince:'2016-07-01',
          distance:'3.1 mi' },
        { id:109, lat:40.7560, lng:-74.1620, type:'PV',
          person:{name:'Henry Pollock', photo:'https://images.unsplash.com/photo-1521119989659-a83eee488004?w=200&h=200&fit=crop&q=80', hair:'Greying', eyes:'Blue', height:"5'10", weight:'180', sex:'Male', race:'White'},
          address:'Mt Prospect Ave, Newark, NJ',
          offense:'Criminal Sexual Contact · Minor',
          tier:'Tier 2 · Moderate',
          registeredSince:'2013-12-19',
          distance:'0.9 mi' },
        { id:110, lat:40.7610, lng:-74.1810, type:'PV',
          person:{name:'Vincent Reilly', photo:'https://images.unsplash.com/photo-1500048993953-d23a436266cf?w=200&h=200&fit=crop&q=80', hair:'Brown', eyes:'Brown', height:"6'1", weight:'200', sex:'Male', race:'White'},
          address:'Forest Hill, Newark, NJ',
          offense:'Aggravated Sexual Assault',
          tier:'Tier 3 · High',
          registeredSince:'2009-05-25',
          distance:'1.2 mi' },
        { id:111, lat:40.7290, lng:-74.1815, type:'PV',
          person:{name:'Nathan Bridges', photo:'https://images.unsplash.com/photo-1463453091185-61582044d556?w=200&h=200&fit=crop&q=80', hair:'Black', eyes:'Brown', height:"5'9", weight:'175', sex:'Male', race:'Black'},
          address:'West Side, Newark, NJ',
          offense:'Endangering the Welfare of a Child',
          tier:'Tier 1 · Low',
          registeredSince:'2022-01-12',
          distance:'1.6 mi' },
        { id:112, lat:40.7405, lng:-74.1530, type:'PV',
          person:{name:'Gregory Stone', photo:'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=200&h=200&fit=crop&q=80', hair:'Salt-pepper', eyes:'Hazel', height:"5'11", weight:'190', sex:'Male', race:'White'},
          address:'Ironbound, Newark, NJ',
          offense:'Sexual Assault, 2nd Degree',
          tier:'Tier 2 · Moderate',
          registeredSince:'2015-10-04',
          distance:'1.9 mi' }
    ];

    /* ---------- Hash routing ---------- */
    var currentView = 'home';
    var crimeMapInited = false;
    var soMapInited = false;
    var crimeMap, soMap;

    function getRoute() {
        var h = (window.location.hash || '').replace(/^#\//, '');
        var allowed = ['crime-map','sex-offender-map','how-it-works','agent-app','citizen-app','about','contact'];
        if (allowed.indexOf(h) !== -1) return h;
        return 'home';
    }
    function showView(view) {
        // Always close modal + reset body scroll on view change
        var modal = document.getElementById('incident-modal');
        if (modal) {
            modal.removeAttribute('data-open');
            modal.classList.add('hidden');
        }
        document.body.style.overflow = '';

        var views = document.querySelectorAll('[data-view]');
        for (var i = 0; i < views.length; i++) {
            if (views[i].getAttribute('data-view') === view) views[i].classList.remove('hidden');
            else views[i].classList.add('hidden');
        }
        currentView = view;
        // Always reset the dispatch section to hidden when changing view
        var dispatchSec = document.querySelector('[data-dispatch-section]');
        if (dispatchSec) dispatchSec.classList.add('hidden');
        if (view === 'crime-map') initCrimeMap();
        if (view === 'sex-offender-map') initSOMap();
        // Re-trigger reveal animations on the now-visible view
        document.querySelectorAll('[data-view="'+view+'"] .reveal').forEach(function(el){
            el.classList.remove('is-visible');
            requestAnimationFrame(function(){ el.classList.add('is-visible'); });
        });
    }
    function applyRoute() {
        showView(getRoute());
        window.scrollTo({top:0, behavior:'instant'});
    }

    /* ---------- Marker icon ---------- */
    function makeIcon(type) {
        return L.divIcon({
            className: 'crime-marker',
            html: '<span class="pin" style="background:'+COLORS[type]+';">'+type+'</span>',
            iconSize: [34, 22],
            iconAnchor: [17, 11]
        });
    }

    /* ---------- Map init ---------- */
    function initCrimeMap() {
        if (crimeMapInited) { setTimeout(function(){ crimeMap && crimeMap.invalidateSize(); }, 100); return; }
        if (typeof L === 'undefined') { setTimeout(initCrimeMap, 100); return; }
        var el = document.getElementById('auxilio-map');
        if (!el) return;
        crimeMap = L.map(el, { scrollWheelZoom: true, zoomControl: true }).setView(NEWARK, 11);
        L.tileLayer('https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png', {
            attribution:'© OpenStreetMap contributors © CARTO',
            subdomains:'abcd', maxZoom: 19
        }).addTo(crimeMap);
        L.circle(NEWARK, { radius: 5000, color:'#0f172a', fillColor:'#0f172a', weight:1.5, opacity:.45, fillOpacity:.04, dashArray:'6 6' }).addTo(crimeMap);
        INCIDENTS.forEach(function(inc){
            var m = L.marker([inc.lat, inc.lng], { icon: makeIcon(inc.type) }).addTo(crimeMap);
            m.on('click', function(){ openIncident(inc, 'crime'); });
        });
        crimeMapInited = true;
        setTimeout(function(){ crimeMap.invalidateSize(); }, 100);
    }
    var dispatchMapInited = false, dispatchMap;
    function initDispatchMap() {
        var el = document.getElementById('dispatch-leaflet');
        if (!el) return;
        if (dispatchMapInited) { setTimeout(function(){ dispatchMap && dispatchMap.invalidateSize(); }, 100); return; }
        if (typeof L === 'undefined') { setTimeout(initDispatchMap, 150); return; }
        dispatchMap = L.map(el, {
            scrollWheelZoom: false, zoomControl: false, dragging: false,
            doubleClickZoom: false, touchZoom: false, boxZoom: false, keyboard: false,
            attributionControl: false
        }).setView(NEWARK, 13);
        L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png', {
            subdomains:'abcd', maxZoom: 19
        }).addTo(dispatchMap);
        dispatchMapInited = true;
        setTimeout(function(){ dispatchMap.invalidateSize(); }, 120);
    }

    function initSOMap() {
        if (soMapInited) { setTimeout(function(){ soMap && soMap.invalidateSize(); }, 100); return; }
        if (typeof L === 'undefined') { setTimeout(initSOMap, 100); return; }
        var el = document.getElementById('auxilio-so-map');
        if (!el) return;
        soMap = L.map(el, { scrollWheelZoom: true, zoomControl: true }).setView(NEWARK, 11);
        L.tileLayer('https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png', {
            attribution:'© OpenStreetMap contributors © CARTO',
            subdomains:'abcd', maxZoom: 19
        }).addTo(soMap);
        L.circle(NEWARK, { radius: 5000, color:'#1d4ed8', fillColor:'#1d4ed8', weight:1.5, opacity:.5, fillOpacity:.04, dashArray:'6 6' }).addTo(soMap);
        OFFENDERS.forEach(function(off){
            var m = L.marker([off.lat, off.lng], { icon: makeIcon('PV') }).addTo(soMap);
            m.on('click', function(){ openIncident(off, 'offender'); });
        });
        soMapInited = true;
        setTimeout(function(){ soMap.invalidateSize(); }, 100);
    }

    /* ---------- Modal ---------- */
    function openIncident(inc, mode) {
        var p = inc.person;
        var body = document.getElementById('incident-modal-body');
        if (!body) return;
        var html = '';
        html += '<div class="flex items-start gap-4 rounded-md border border-ink-100 bg-white p-4 shadow-sm">';
        html += '  <img src="'+p.photo+'" alt="'+p.name+'" class="w-20 h-20 rounded-xl object-cover" loading="lazy" />';
        html += '  <div class="text-sm leading-relaxed flex-1 min-w-0">';
        html += '    <p class="font-bold text-navy-900 flex items-center gap-1.5">'+p.name+' <span class="inline-flex w-2 h-2 rounded-full bg-blue-500"></span></p>';
        html += '    <p class="text-ink-500 mt-1.5">Hair : <span class="text-navy-900 font-medium">'+p.hair+'</span> &nbsp; Eyes : <span class="text-navy-900 font-medium">'+p.eyes+'</span></p>';
        html += '    <p class="text-ink-500">Height : <span class="text-navy-900 font-medium">'+p.height+'</span> &nbsp; Weight : <span class="text-navy-900 font-medium">'+p.weight+'</span></p>';
        html += '    <p class="text-ink-500">Sex : <span class="text-navy-900 font-medium">'+p.sex+'</span> &nbsp; Race : <span class="text-navy-900 font-medium">'+p.race+'</span></p>';
        html += '  </div>';
        html += '</div>';
        html += '<div><p class="text-xs font-semibold text-navy-900">Location <span class="text-red-500">*</span></p>';
        html += '<div class="mt-2 rounded-xl border border-ink-100 bg-white px-4 py-3 text-sm text-navy-800">'+inc.address+'</div></div>';

        var seed = inc.id || 1;
        var locPhotos = pickPhotos(EMERGENCY_PHOTOS, 4, seed);
        var evPhotos = pickPhotos(INCIDENT_PHOTOS, 4, seed + 3);

        if (mode === 'offender') {
            html += '<div class="grid grid-cols-2 gap-3 text-sm">';
            html += '  <div class="rounded-xl border border-ink-100 bg-white p-3"><p class="text-[10px] font-bold uppercase tracking-wider text-ink-500">Offense</p><p class="mt-1 text-navy-900 font-medium">'+inc.offense+'</p></div>';
            html += '  <div class="rounded-xl border border-ink-100 bg-white p-3"><p class="text-[10px] font-bold uppercase tracking-wider text-ink-500">Risk Tier</p><p class="mt-1 text-navy-900 font-medium">'+inc.tier+'</p></div>';
            html += '  <div class="rounded-xl border border-ink-100 bg-white p-3"><p class="text-[10px] font-bold uppercase tracking-wider text-ink-500">Registered Since</p><p class="mt-1 text-navy-900 font-medium">'+inc.registeredSince+'</p></div>';
            html += '  <div class="rounded-xl border border-ink-100 bg-white p-3"><p class="text-[10px] font-bold uppercase tracking-wider text-ink-500">Distance</p><p class="mt-1 text-navy-900 font-medium">'+inc.distance+'</p></div>';
            html += '</div>';
            html += '<div><p class="text-xs font-semibold text-navy-900">Registered Residence</p>'+photoGrid(locPhotos)+'</div>';
            html += '<div><p class="text-xs font-semibold text-navy-900 uppercase tracking-wider">Background</p>'+photoGrid(evPhotos)+'</div>';
        } else {
            html += '<div><p class="text-xs font-semibold text-navy-900">Emergency Location</p>'+photoGrid(locPhotos)+'</div>';

            html += '<div><div class="flex items-center justify-between text-xs"><span class="font-semibold text-navy-900 uppercase tracking-wider">Status</span><span class="text-ink-500">completion</span><span class="font-bold text-emerald-600">'+inc.status+'%</span></div>';
            html += '<div class="mt-2 h-2 rounded-full bg-ink-100 overflow-hidden"><div class="h-full bg-emerald-500 transition-all" style="width:'+inc.status+'%"></div></div></div>';

            html += '<div><p class="text-xs font-semibold text-navy-900 uppercase tracking-wider">Agent Assist</p><div class="mt-2 flex items-center -space-x-2">';
            (inc.agents || []).forEach(function(ph){ html += '<img src="'+ph+'" class="w-9 h-9 rounded-full border-2 border-white object-cover" loading="lazy" />'; });
            html += '<span class="ml-3 grid place-items-center w-9 h-9 rounded-full bg-ink-100 text-xs font-bold text-navy-900">+3</span></div></div>';

            html += '<div><p class="text-xs font-semibold text-navy-900 uppercase tracking-wider">Incident Photos</p>'+photoGrid(evPhotos)+'</div>';

            html += '<div><p class="text-center text-sm font-semibold text-navy-900">Victim Injured</p>';
            html += '<div class="mt-3 relative mx-auto w-36 h-80">';
            html += '<svg viewBox="0 0 100 230" class="w-full h-full text-ink-300" fill="currentColor" preserveAspectRatio="xMidYMid meet">';
            html += '<ellipse cx="50" cy="22" rx="15" ry="17"/>';
            html += '<rect x="44" y="36" width="12" height="8"/>';
            html += '<path d="M 28 50 Q 50 40 72 50 L 84 60 Q 88 64 84 70 L 76 130 L 24 130 L 16 70 Q 12 64 16 60 Z"/>';
            html += '<path d="M 16 60 Q 8 62 6 70 L 4 138 Q 4 148 14 148 Q 22 148 24 138 L 28 76 Z"/>';
            html += '<path d="M 84 60 Q 92 62 94 70 L 96 138 Q 96 148 86 148 Q 78 148 76 138 L 72 76 Z"/>';
            html += '<path d="M 24 130 L 50 150 L 48 220 Q 48 226 42 226 L 28 226 Q 22 226 22 220 L 22 150 Z"/>';
            html += '<path d="M 76 130 L 50 150 L 52 220 Q 52 226 58 226 L 72 226 Q 78 226 78 220 L 78 150 Z"/>';
            html += '</svg>';
            (inc.injured || []).forEach(function(d){ html += '<span class="absolute w-3.5 h-3.5 rounded-full bg-red-500 ring-2 ring-white shadow-lg sos-glow" style="left:calc('+d.x+'% - 7px);top:calc('+d.y+'% - 7px);"></span>'; });
            html += '</div></div>';
        }

        body.innerHTML = html;
        var modal = document.getElementById('incident-modal');
        modal.classList.remove('hidden');
        requestAnimationFrame(function(){ modal.setAttribute('data-open',''); });
        document.body.style.overflow = 'hidden';
    }
    function closeIncident() {
        var modal = document.getElementById('incident-modal');
        modal.removeAttribute('data-open');
        setTimeout(function(){ modal.classList.add('hidden'); }, 350);
        document.body.style.overflow = '';
    }

    /* ---------- Wire it up ---------- */
    document.addEventListener('click', function(e){
        var t = e.target.closest('[data-modal-close]');
        if (t) { e.preventDefault(); closeIncident(); return; }

        // Submit Emergency on how-it-works → reveal hidden dispatch section + scroll
        var trigger = e.target.closest('[data-show-dispatch]');
        if (trigger) {
            e.preventDefault();
            var dispatchSec = document.querySelector('[data-dispatch-section]');
            if (dispatchSec) {
                dispatchSec.classList.remove('hidden');
                dispatchSec.querySelectorAll('.reveal').forEach(function(el){
                    el.classList.remove('is-visible');
                    requestAnimationFrame(function(){ el.classList.add('is-visible'); });
                });
                setTimeout(function(){ dispatchSec.scrollIntoView({ behavior:'smooth', block:'start' }); }, 80);
                setTimeout(initDispatchMap, 250);
            }
            return;
        }
        var a = e.target.closest('a[href^="#"]');
        if (!a) return;
        var href = a.getAttribute('href');
        if (href === '#' || href.indexOf('#/') === 0 || href === '#top') return;
        if (currentView !== 'home') {
            e.preventDefault();
            if (window.location.hash !== '#/') window.location.hash = '#/';
            else showView('home');
            setTimeout(function(){
                var tgt = document.querySelector(href);
                if (tgt) tgt.scrollIntoView({ behavior:'smooth' });
            }, 80);
        }
    });
    document.addEventListener('keydown', function(e){ if (e.key === 'Escape') closeIncident(); });
    window.addEventListener('hashchange', applyRoute);
    document.addEventListener('DOMContentLoaded', applyRoute);
})();
</script>

{{-- =======================================================================
     LIVE CHAT — simple click-to-open widget (bottom-right)
========================================================================--}}
<style>
    #chat-launcher { transition: transform .25s ease, box-shadow .25s ease; }
    #chat-launcher:hover { transform: translateY(-2px) scale(1.05); }
    #chat-dialog {
        transform: translateY(16px) scale(.97);
        opacity: 0; pointer-events: none;
        transition: transform .25s cubic-bezier(.16,1,.3,1), opacity .18s ease;
    }
    #chat-dialog.is-open { transform: none; opacity: 1; pointer-events: auto; }
    .chat-bubble { max-width: 80%; padding:9px 13px; border-radius:14px; font-size:13.5px; line-height:1.45; }
    .bubble-them { background:#f1f3f7; color:#0c1126; border-bottom-left-radius:4px; }
    .bubble-me { background:#FB0606; color:#fff; border-bottom-right-radius:4px; }
    .typing-dot { display:inline-block; width:6px; height:6px; margin:0 1px; border-radius:9999px; background:#9aa3b2; animation: typing 1.2s infinite; }
    .typing-dot:nth-child(2){ animation-delay:.15s; } .typing-dot:nth-child(3){ animation-delay:.3s; }
    @keyframes typing { 0%,60%,100%{ transform: translateY(0); opacity:.4;} 30%{ transform: translateY(-4px); opacity:1;} }
    #chat-thread::-webkit-scrollbar { width:6px; } #chat-thread::-webkit-scrollbar-thumb { background:#d6dae3; border-radius:9999px; }
    .chat-topo {
        background-image:
            radial-gradient(circle at 22% 18%, rgba(251,6,6,.05) 0, transparent 38%),
            radial-gradient(circle at 78% 82%, rgba(12,17,38,.04) 0, transparent 42%),
            repeating-radial-gradient(circle at 50% 50%, rgba(251,6,6,.045) 0 1px, transparent 1px 22px),
            repeating-radial-gradient(circle at 50% 50%, rgba(12,17,38,.035) 0 1px, transparent 1px 44px);
    }
</style>

{{-- Floating launcher button --}}
<button id="chat-launcher" type="button" aria-label="Open live chat"
        class="fixed bottom-6 right-6 z-[9998] grid place-items-center w-14 h-14 rounded-full text-white shadow-[0_18px_38px_-10px_rgba(251,6,6,.55)]"
        style="background:linear-gradient(135deg,#FB0606 0%,#c8202f 100%);">
    {{-- chat icon (shown when closed) --}}
    <svg id="chat-icon-open" class="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2">
        <path stroke-linecap="round" stroke-linejoin="round" d="M21 12a8.5 8.5 0 01-12.6 7.4L3 21l1.6-5.4A8.5 8.5 0 1121 12z"/>
    </svg>
    {{-- close icon (shown when open) --}}
    <svg id="chat-icon-close" class="w-5 h-5 hidden" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4">
        <path stroke-linecap="round" stroke-linejoin="round" d="M18 6L6 18M6 6l12 12"/>
    </svg>
</button>

{{-- Chat dialog --}}
<div id="chat-dialog" role="dialog" aria-modal="false" aria-labelledby="chat-title"
     class="fixed bottom-24 right-6 z-[9998] w-[min(380px,calc(100vw-2rem))] h-[min(560px,calc(100vh-8rem))] rounded-2xl bg-white border border-ink-100 shadow-[0_30px_60px_-15px_rgba(12,17,38,.35)] overflow-hidden flex flex-col">

    {{-- Header --}}
    <header class="flex items-center justify-between px-5 py-4 text-white" style="background:#FB0606;">
        <div class="flex items-center gap-2.5">
            <span class="grid place-items-center w-8 h-8 rounded-full bg-white/15 backdrop-blur-sm">
                <svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><path stroke-linecap="round" stroke-linejoin="round" d="M21 12a8.5 8.5 0 01-12.6 7.4L3 21l1.6-5.4A8.5 8.5 0 1121 12z"/></svg>
            </span>
            <div>
                <p id="chat-title" class="text-[15px] font-semibold leading-tight">Auxilio AI Support</p>
                <p class="text-[11px] text-white/80 flex items-center gap-1.5 mt-0.5">
                    <span class="inline-block w-1.5 h-1.5 rounded-full bg-green-300"></span>
                    Typically replies in a few minutes
                </p>
            </div>
        </div>
        <button id="chat-close" type="button" class="grid place-items-center w-8 h-8 rounded-md hover:bg-white/10" aria-label="Close chat">
            <svg class="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><path stroke-linecap="round" stroke-linejoin="round" d="M18 6L6 18M6 6l12 12"/></svg>
        </button>
    </header>

    {{-- Messages --}}
    <div id="chat-thread" class="chat-topo flex-1 overflow-y-auto px-4 py-5 space-y-3 bg-white relative">
        <div id="chat-empty" class="absolute inset-0 grid place-items-center text-center px-6 pointer-events-none">
            <div>
                <div class="mx-auto mb-3 grid place-items-center w-12 h-12 rounded-full bg-[#FB0606]/10">
                    <svg class="w-5 h-5 text-[#FB0606]" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M21 12a8.5 8.5 0 01-12.6 7.4L3 21l1.6-5.4A8.5 8.5 0 1121 12z"/></svg>
                </div>
                <p class="text-[13.5px] text-ink-500">No messages yet. Say hi! 👋</p>
            </div>
        </div>
    </div>

    {{-- Composer --}}
    <form id="chat-form" class="flex items-center gap-2 px-3 py-3 border-t border-ink-100 bg-white">
        <input id="chat-input" type="text" autocomplete="off" placeholder="Type your message…" class="flex-1 px-3 py-2.5 text-sm rounded-md border border-ink-100 focus:outline-none focus:ring-2 focus:ring-[#FB0606]/30"/>
        <button type="submit" class="grid place-items-center w-10 h-10 rounded-md text-white shrink-0" style="background:#FB0606;" aria-label="Send">
            <svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><path stroke-linecap="round" stroke-linejoin="round" d="M22 2L11 13M22 2l-7 20-4-9-9-4 20-7z"/></svg>
        </button>
    </form>

    {{-- Footer --}}
    <div class="px-4 py-2 text-center text-[11px] text-ink-400 bg-[#fafbfd] border-t border-ink-100">
        Powered by <span class="font-semibold text-ink-600">Auxilio AI</span>
    </div>
</div>

<script>
(function(){
    var launcher = document.getElementById('chat-launcher');
    var dialog   = document.getElementById('chat-dialog');
    var closeBtn = document.getElementById('chat-close');
    var threadEl = document.getElementById('chat-thread');
    var emptyEl  = document.getElementById('chat-empty');
    var form     = document.getElementById('chat-form');
    var input    = document.getElementById('chat-input');
    var iconOpen = document.getElementById('chat-icon-open');
    var iconClose= document.getElementById('chat-icon-close');

    function escapeHtml(s){ return s.replace(/[&<>"']/g, function(c){ return ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'})[c]; }); }

    function appendBubble(from, text){
        if (emptyEl && !emptyEl.classList.contains('hidden')) emptyEl.classList.add('hidden');
        var time = new Date().toLocaleTimeString([], { hour:'numeric', minute:'2-digit' });
        var html;
        if (from === 'me') {
            html = '<div class="flex justify-end"><div class="chat-bubble bubble-me">'+escapeHtml(text)+'<div class="text-[10px] mt-1 opacity-80 text-right">'+escapeHtml(time)+'</div></div></div>';
        } else {
            html = '<div class="flex items-end gap-2"><span class="grid place-items-center shrink-0 w-7 h-7 rounded-full text-white text-[10px] font-bold" style="background:#FB0606;">A</span><div class="chat-bubble bubble-them">'+escapeHtml(text)+'<div class="text-[10px] mt-1 text-ink-500">'+escapeHtml(time)+'</div></div></div>';
        }
        threadEl.insertAdjacentHTML('beforeend', html);
        threadEl.scrollTop = threadEl.scrollHeight;
    }

    function showTyping(){
        if (emptyEl && !emptyEl.classList.contains('hidden')) emptyEl.classList.add('hidden');
        var id = 'typ-' + Date.now();
        threadEl.insertAdjacentHTML('beforeend',
            '<div id="'+id+'" class="flex items-end gap-2">'
            +'<span class="grid place-items-center shrink-0 w-7 h-7 rounded-full text-white text-[10px] font-bold" style="background:#FB0606;">A</span>'
            +'<div class="chat-bubble bubble-them"><span class="typing-dot"></span><span class="typing-dot"></span><span class="typing-dot"></span></div>'
            +'</div>'
        );
        threadEl.scrollTop = threadEl.scrollHeight;
        return id;
    }

    function openDialog(){
        dialog.classList.add('is-open');
        iconOpen.classList.add('hidden');
        iconClose.classList.remove('hidden');
        setTimeout(function(){ input.focus(); }, 200);
    }
    function closeDialog(){
        dialog.classList.remove('is-open');
        iconOpen.classList.remove('hidden');
        iconClose.classList.add('hidden');
    }

    launcher.addEventListener('click', function(){
        if (dialog.classList.contains('is-open')) closeDialog(); else openDialog();
    });
    closeBtn.addEventListener('click', closeDialog);

    form.addEventListener('submit', function(e){
        e.preventDefault();
        var v = input.value.trim();
        if (!v) return;
        appendBubble('me', v);
        input.value = '';

        setTimeout(function(){
            var id = showTyping();
            setTimeout(function(){
                var t = document.getElementById(id);
                if (t) t.remove();
                var replies = [
                    "Thanks for reaching out! A support agent will jump in shortly.",
                    "Got it — let me pull up your account.",
                    "Happy to help with that 👍",
                    "Could you share a bit more detail so we can route you to the right team?"
                ];
                appendBubble('them', replies[Math.floor(Math.random()*replies.length)]);
            }, 1100);
        }, 500);
    });

    document.addEventListener('keydown', function(e){
        if (e.key === 'Escape' && dialog.classList.contains('is-open')) closeDialog();
    });
})();
</script>
</body>
</html>
