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
     HERO  — centered, dark navy with grid + glow + dual CTAs
========================================================================--}}
<section class="relative overflow-hidden" style="background: radial-gradient(ellipse at top, #1a2548 0%, #0c1126 55%, #06080b 100%);">
    {{-- subtle grid background --}}
    <div class="pointer-events-none absolute inset-0 -z-0 opacity-[0.18]"
         style="background-image: linear-gradient(rgba(255,255,255,.06) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.06) 1px, transparent 1px); background-size: 56px 56px; mask-image: radial-gradient(ellipse at center, #000 30%, transparent 75%);"></div>

    {{-- ambient glows --}}
    <div class="pointer-events-none absolute inset-0 -z-0 overflow-hidden">
        <div data-parallax="0.06" class="absolute top-[-15%] left-1/2 -translate-x-1/2 w-[900px] h-[900px] rounded-full blur-3xl" style="background: radial-gradient(circle, rgba(228,67,82,.35) 0%, rgba(228,67,82,0) 65%);"></div>
        <div data-parallax="0.10" class="absolute top-1/3 -left-40 w-[520px] h-[520px] rounded-full blur-3xl" style="background: radial-gradient(circle, rgba(244,196,65,.18) 0%, rgba(244,196,65,0) 65%);"></div>
        <div data-parallax="0.08" class="absolute bottom-[-10%] right-[-10%] w-[600px] h-[600px] rounded-full blur-3xl" style="background: radial-gradient(circle, rgba(200,32,47,.30) 0%, rgba(200,32,47,0) 65%);"></div>
    </div>

    <div class="relative mx-auto max-w-7xl px-5 sm:px-8 pt-16 sm:pt-20 lg:pt-28 pb-20 sm:pb-28 lg:pb-32 text-center">

        {{-- eyebrow pill --}}
        <div class="reveal flex justify-center">
            <span class="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/[0.04] backdrop-blur px-4 py-1.5 text-xs font-semibold uppercase tracking-[.18em] text-white/85">
                <span class="relative inline-flex">
                    <span class="absolute inline-flex h-2 w-2 rounded-full opacity-75 animate-ping" style="background:#FB0606;"></span>
                    <span class="relative inline-flex h-2 w-2 rounded-full" style="background:#FB0606;"></span>
                </span>
                <span style="color:#f4c441;">Live</span>
                <span class="text-white/40">·</span>
                America&rsquo;s personal safety platform
            </span>
        </div>

        {{-- massive headline --}}
        <h1 class="reveal reveal-delay-1 mt-7 mx-auto max-w-5xl font-display font-extrabold tracking-tight text-white text-[44px] sm:text-6xl lg:text-[78px] leading-[1.02]">
            World&rsquo;s 1<sup class="text-[0.5em] align-super" style="color:#f4c441;">st</sup> personal safety<br/>
            platform for <span style="background:linear-gradient(90deg,#FB0606,#f4c441); -webkit-background-clip:text; background-clip:text; color:transparent;">families.</span>
        </h1>

        {{-- 2-line poetic sub --}}
        <p class="reveal reveal-delay-2 mt-6 mx-auto max-w-2xl text-base sm:text-lg text-white/70 leading-relaxed">
            One tap to verified responders. Live crime maps, registered offender alerts, and a real-time safety network — engineered for parents, students, and neighborhoods that refuse to wait for the news.
        </p>

        {{-- dual CTAs --}}
        <div class="reveal reveal-delay-3 mt-9 flex flex-col sm:flex-row items-center justify-center gap-3">
            <a href="#download" class="group inline-flex items-center justify-center gap-2 rounded-md text-white px-7 py-3.5 text-sm font-semibold shadow-[0_20px_40px_-15px_rgba(251,6,6,.65)] hover:-translate-y-0.5 transition" style="background:linear-gradient(135deg,#FB0606 0%,#c8202f 100%);">
                Download Auxilio
                <svg class="w-4 h-4 transition-transform group-hover:translate-x-0.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><path stroke-linecap="round" stroke-linejoin="round" d="M5 12h14m0 0l-6-6m6 6l-6 6"/></svg>
            </a>
            <a data-route href="#/how-it-works" class="group inline-flex items-center justify-center gap-2 rounded-md border border-white/15 bg-white/[0.04] backdrop-blur text-white px-7 py-3.5 text-sm font-semibold hover:bg-white/[0.10] transition">
                See how it works
                <svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><path stroke-linecap="round" stroke-linejoin="round" d="M6 9l6 6 6-6"/></svg>
            </a>
        </div>

        {{-- trust line --}}
        <p class="reveal reveal-delay-4 mt-7 text-xs uppercase tracking-[.18em] text-white/40 font-semibold">
            Built &amp; trained by veteran responders &middot; Trusted by 200K+ families
        </p>

        {{-- dashboard mockup card --}}
        <div class="reveal reveal-delay-5 mt-16 lg:mt-20 mx-auto max-w-5xl">
            <div class="relative rounded-2xl border border-white/10 p-2 shadow-[0_60px_120px_-30px_rgba(0,0,0,.7)]" style="background:linear-gradient(180deg,rgba(255,255,255,.06) 0%,rgba(255,255,255,.01) 100%);">
                {{-- glow ring --}}
                <div class="pointer-events-none absolute -inset-1 rounded-3xl opacity-60 blur-2xl -z-10" style="background:linear-gradient(120deg,#FB0606 0%,#f4c441 50%,#1a2548 100%);"></div>
                <div class="rounded-xl overflow-hidden" style="background:#0c1126;">
                    <div class="grid lg:grid-cols-12 gap-0">
                        {{-- left: phone --}}
                        <div class="lg:col-span-5 relative p-8 lg:p-10 flex items-center justify-center" style="background:radial-gradient(circle at 30% 30%,rgba(251,6,6,.18),transparent 60%),#0c1126;">
                            <div class="relative w-full max-w-[240px] aspect-[9/19] rounded-[36px] p-2 shadow-[0_40px_80px_-20px_rgba(0,0,0,.6)] float-slow" style="background:#06080b;">
                                <div class="absolute top-3 left-1/2 -translate-x-1/2 w-16 h-4 rounded-full z-20" style="background:#06080b;"></div>
                                <div class="relative w-full h-full rounded-[28px] overflow-hidden bg-white">
                                    <img src="/images/screen-sos.png" alt="Auxilio SOS screen" class="absolute inset-0 w-full h-full object-cover object-top" />
                                </div>
                                {{-- floating SOS pill --}}
                                <span class="absolute -top-3 -right-3 inline-flex items-center gap-1.5 rounded-full text-white px-2.5 py-1 text-[10px] font-bold tracking-widest uppercase shadow-lg sos-glow" style="background:#FB0606;">
                                    <span class="relative inline-flex w-1.5 h-1.5 rounded-full bg-white pulse-dot text-white"></span>
                                    SOS
                                </span>
                            </div>
                        </div>

                        {{-- right: live feed mockup --}}
                        <div class="lg:col-span-7 p-7 lg:p-9 border-t lg:border-t-0 lg:border-l border-white/10">
                            <div class="flex items-center justify-between">
                                <div class="flex items-center gap-2 text-[11px] uppercase tracking-[.16em] text-white/50 font-semibold">
                                    <span class="grid place-items-center w-6 h-6 rounded-md" style="background:rgba(244,196,65,.15);">
                                        <svg class="w-3 h-3" style="color:#f4c441;" viewBox="0 0 24 24" fill="currentColor"><circle cx="12" cy="12" r="6"/></svg>
                                    </span>
                                    Live activity
                                </div>
                                <span class="text-[10px] font-mono text-white/40">NEWARK &middot; SECTOR 4</span>
                            </div>

                            <div class="mt-5 space-y-3">
                                @php
                                    $feed = [
                                        ['tag'=>'SOS','tag_color'=>'#FB0606','title'=>'Karen B. tapped SOS','meta'=>'870 Broadway · 0.6mi · 18s ago'],
                                        ['tag'=>'ALERT','tag_color'=>'#f4c441','title'=>'Registered offender within 0.5mi','meta'=>'Auto-refreshed registry · Home zone'],
                                        ['tag'=>'AGENT','tag_color'=>'#22c55e','title'=>'Agent Mosley en-route, ETA 4m','meta'=>'Verified Super Agent · Badge #4129'],
                                        ['tag'=>'CASE','tag_color'=>'#3b82f6','title'=>'Case #2026-0488 closed safely','meta'=>'Resolution: family reunified'],
                                    ];
                                @endphp
                                @foreach ($feed as $i => $f)
                                    <div class="flex items-center gap-3 rounded-lg border border-white/5 p-3" style="background:rgba(255,255,255,0.025);">
                                        <span class="rounded-md text-white text-[10px] font-bold uppercase tracking-wider px-2 py-1 shrink-0" style="background:{{ $f['tag_color'] }};">{{ $f['tag'] }}</span>
                                        <div class="flex-1 min-w-0">
                                            <p class="text-sm font-semibold text-white truncate">{{ $f['title'] }}</p>
                                            <p class="text-[11px] text-white/50 truncate">{{ $f['meta'] }}</p>
                                        </div>
                                        <svg class="w-4 h-4 text-white/30 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M9 5l7 7-7 7"/></svg>
                                    </div>
                                @endforeach
                            </div>

                            {{-- mini metric strip --}}
                            <div class="mt-5 grid grid-cols-3 gap-3">
                                <div class="rounded-lg border border-white/5 p-3" style="background:rgba(255,255,255,0.025);">
                                    <p class="text-[10px] uppercase tracking-[.14em] text-white/40 font-semibold">Active</p>
                                    <p class="mt-1 text-lg font-bold text-white">12</p>
                                </div>
                                <div class="rounded-lg border border-white/5 p-3" style="background:rgba(255,255,255,0.025);">
                                    <p class="text-[10px] uppercase tracking-[.14em] text-white/40 font-semibold">Avg ETA</p>
                                    <p class="mt-1 text-lg font-bold" style="color:#f4c441;">4.2m</p>
                                </div>
                                <div class="rounded-lg border border-white/5 p-3" style="background:rgba(255,255,255,0.025);">
                                    <p class="text-[10px] uppercase tracking-[.14em] text-white/40 font-semibold">Cleared</p>
                                    <p class="mt-1 text-lg font-bold" style="color:#22c55e;">98%</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</section>

{{-- =======================================================================
     PARTNER / TRUST MARQUEE
========================================================================--}}
<section class="relative border-y border-ink-100 bg-white py-10 overflow-hidden">
    <p class="text-center text-[11px] font-semibold uppercase tracking-[.22em] text-ink-500">
        Working alongside agencies, registries &amp; communities across <span class="text-brand-600">40+ states</span>
    </p>
    <div class="mt-7 flex items-center gap-12 marquee-track whitespace-nowrap">
        @php
            $partners = ['NEWARK PD','NJSP','NCMEC','911 Dispatch','NSOPW Registry','City of Charlotte','Austin Safety Net','Denver SafeWalk','Megan&rsquo;s Law','State Patrol','Verified Super Agents','iOS · Android'];
            $partners = array_merge($partners, $partners);
        @endphp
        @foreach ($partners as $p)
            <span class="inline-flex items-center gap-3 text-base font-display font-bold tracking-tight text-navy-900/70">
                <svg class="w-4 h-4 text-brand-600" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2l8 4v6c0 5-3.5 9-8 10-4.5-1-8-5-8-10V6l8-4z"/></svg>
                {!! $p !!}
            </span>
        @endforeach
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
                Auxilio is the personal safety layer your phone has been missing. We unify live crime data, public registries, verified responders, and a one-tap SOS into a single experience — so families never have to refresh the news to know whether to keep the kids inside.
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
                    $faces = [
                        'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=560&h=560&fit=crop&q=80',
                        'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=560&h=560&fit=crop&q=80',
                        'https://images.unsplash.com/photo-1573497019418-b400bb3ab074?w=560&h=560&fit=crop&q=80',
                        'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=560&h=560&fit=crop&q=80',
                    ];
                @endphp
                @foreach ($faces as $i => $face)
                    <div class="relative aspect-square rounded-2xl overflow-hidden shadow-xl {{ $i % 2 ? 'mt-10' : '' }}">
                        <img src="{{ $face }}" alt="" loading="lazy" class="absolute inset-0 w-full h-full object-cover transition-transform duration-700 hover:scale-105" />
                        <div class="absolute inset-0 bg-gradient-to-t from-navy-950/60 via-transparent to-transparent"></div>
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
                ['title'=>'End-to-end SOS','body'=>'One tap routes your location, identity, and situation to verified responders and trusted contacts simultaneously — no menus, no panic-typing.','icon'=>'sos','accent'=>'#FB0606'],
                ['title'=>'Intelligent screening','body'=>'Live crime maps and registry overlays filter the noise so you see only what matters within your geofence — color-coded, time-sorted, actionable.','icon'=>'shield','accent'=>'#f4c441'],
                ['title'=>'Data-driven decisions','body'=>'Case progress, agent ETAs, and resolution metrics — every interaction adds to a transparent record you can trust over time.','icon'=>'progress','accent'=>'#22c55e'],
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
     FEATURES — "The intelligent network behind safer streets"
========================================================================--}}
<section id="features" class="relative py-24 lg:py-32 bg-white">
    <div class="mx-auto max-w-7xl px-5 sm:px-8">
        <div class="max-w-3xl mx-auto text-center">
            <p class="reveal text-xs font-semibold uppercase tracking-[.2em] text-brand-600">Features</p>
            <h2 class="reveal reveal-delay-1 mt-4 font-display font-extrabold text-4xl sm:text-5xl lg:text-[56px] leading-[1.05] tracking-tight text-navy-900">
                The intelligent network behind <span class="text-brand-600">safer streets.</span>
            </h2>
            <p class="reveal reveal-delay-2 mt-5 text-lg text-navy-700/80 leading-relaxed">
                Nine capabilities, one continuous safety fabric. Each feature talks to the next — alerts inform geofences, geofences trigger SOS shortcuts, SOS routes to verified responders.
            </p>
        </div>

        @php
            $features = [
                ['title' => 'Real-Time Safety Alerts',  'body' => 'Instant push notifications the moment something happens near you, your home, or the people you care about.', 'icon' => 'bell'],
                ['title' => 'Quick SOS for Instant Help', 'body' => 'One tap alerts trusted agents or emergency responders with your location, situation, and identity — when seconds matter.',  'icon' => 'sos'],
                ['title' => 'Track &amp; Share Location', 'body' => 'Let your loved ones or verified security agents monitor your location in real time — never alone on the way home.',     'icon' => 'location'],
                ['title' => 'Verified Super Agents',     'body' => 'A trained, background-checked network of safety agents who can respond, escort, or coordinate help on your behalf.',                'icon' => 'shield'],
                ['title' => 'Live Crime Map',            'body' => 'A live, color-coded map of incidents reported around you — searchable, filterable, and refreshed as events come in.',          'icon' => 'map'],
                ['title' => 'Categorized Reporting',     'body' => 'Report incidents with the right urgency and category — Sexual Crimes, Robbery, Physical Violence, Homicides — in seconds.',         'icon' => 'feed'],
                ['title' => 'Suspect Sketch Builder',    'body' => 'Help responders identify a suspect with a guided sketch composer — features, build, clothing — all from your phone.',              'icon' => 'sketch'],
                ['title' => 'Case Progress Tracking',    'body' => 'Watch your case move with a live completion bar, agent ETA, and distance / duration metrics — no more wondering what&rsquo;s next.', 'icon' => 'progress'],
                ['title' => 'Trusted Community Watch',   'body' => 'Privately share live updates with neighbors and trusted contacts — turn your block into an always-on safety network.',             'icon' => 'people'],
            ];
        @endphp

        <div class="mt-14 stagger grid sm:grid-cols-2 lg:grid-cols-3 gap-px bg-ink-100 rounded-2xl overflow-hidden border border-ink-100">
            @foreach ($features as $i => $f)
                <article class="group relative bg-white p-8 lg:p-10 hover:bg-brand-50/30 transition-colors">
                    <span class="grid place-items-center w-12 h-12 rounded-md bg-navy-900 text-white group-hover:bg-brand-600 group-hover:rotate-[-6deg] transition">
                        <svg class="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8">
                            {!! $icons[$f['icon']] !!}
                        </svg>
                    </span>
                    <h3 class="mt-6 text-xl font-semibold tracking-tight text-navy-900">{!! $f['title'] !!}</h3>
                    <p class="mt-2.5 text-navy-700/80 leading-relaxed">{!! $f['body'] !!}</p>
                    <span class="absolute top-8 right-8 text-xs font-mono text-ink-300">0{{ $i + 1 }}</span>
                    <span class="pointer-events-none absolute bottom-0 left-0 h-0.5 w-0 bg-brand-600 group-hover:w-full transition-all duration-500"></span>
                </article>
            @endforeach
        </div>
    </div>
</section>

{{-- =======================================================================
     WHY CHOOSE — 4-col cards on dark
========================================================================--}}
<section class="relative py-24 lg:py-32 overflow-hidden" style="background:#06080b;">
    <div class="pointer-events-none absolute inset-0 -z-0 opacity-50">
        <div class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1100px] h-[600px] rounded-full blur-3xl" style="background:radial-gradient(ellipse,rgba(251,6,6,.18) 0%,transparent 60%);"></div>
    </div>
    <div class="relative mx-auto max-w-7xl px-5 sm:px-8">
        <div class="max-w-3xl">
            <p class="reveal text-xs font-semibold uppercase tracking-[.2em]" style="color:#f4c441;">Why choose Auxilio?</p>
            <h2 class="reveal reveal-delay-1 mt-4 font-display font-extrabold text-4xl sm:text-5xl lg:text-[56px] leading-[1.05] tracking-tight text-white">
                A safety stack designed to <span style="color:#FB0606;">act,</span> not just inform.
            </h2>
        </div>

        @php
            $whys = [
                ['title'=>'Real-time, not next-day','body'=>'Sub-30-second alerting from incident to your lock screen — beating local news by minutes.','icon'=>'bell'],
                ['title'=>'Verified network','body'=>'Every responder, agent, and registry update is verified — no anonymous &ldquo;tips&rdquo; clogging the feed.','icon'=>'shield'],
                ['title'=>'Private by default','body'=>'You choose who sees you. End-to-end location encryption with explicit, revocable sharing.','icon'=>'location'],
                ['title'=>'Always on, always free','body'=>'Core safety features — alerts, SOS, registry — are free forever. No paywall on emergencies.','icon'=>'sos'],
            ];
        @endphp
        <div class="mt-14 stagger grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            @foreach ($whys as $w)
                <article class="group relative rounded-2xl border border-white/10 p-7 transition hover:-translate-y-1" style="background:linear-gradient(180deg,rgba(255,255,255,.05) 0%,rgba(255,255,255,.01) 100%);">
                    <span class="grid place-items-center w-12 h-12 rounded-md text-white" style="background:linear-gradient(135deg,#FB0606,#c8202f);">
                        <svg class="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8">
                            {!! $icons[$w['icon']] !!}
                        </svg>
                    </span>
                    <h3 class="mt-5 text-lg font-bold text-white">{{ $w['title'] }}</h3>
                    <p class="mt-2 text-sm text-white/60 leading-relaxed">{!! $w['body'] !!}</p>
                    <a href="#download" class="mt-5 inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-[.14em] transition" style="color:#f4c441;">
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
     INTEGRATIONS — agencies, registries, devices
========================================================================--}}
<section class="relative py-24 lg:py-32 bg-white">
    <div class="mx-auto max-w-7xl px-5 sm:px-8 grid lg:grid-cols-12 gap-12 items-center">
        <div class="lg:col-span-5">
            <p class="reveal text-xs font-semibold uppercase tracking-[.2em] text-brand-600">Integrations</p>
            <h2 class="reveal reveal-delay-1 mt-4 font-display font-extrabold text-4xl sm:text-5xl tracking-tight text-navy-900 leading-[1.05]">
                Plugs into the safety infrastructure you <span class="text-brand-600">already trust.</span>
            </h2>
            <p class="reveal reveal-delay-2 mt-5 text-lg text-navy-700/80 leading-relaxed">
                Local PDs, public registries, family group chats, smart devices — Auxilio pulls them into one canonical timeline so nothing slips through.
            </p>
            <a href="#download" class="reveal reveal-delay-3 mt-7 inline-flex items-center gap-2 rounded-md bg-navy-900 hover:bg-navy-800 text-white px-6 py-3 text-sm font-semibold transition">
                See full list
                <svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M5 12h14m0 0l-6-6m6 6l-6 6"/></svg>
            </a>
        </div>

        <div class="lg:col-span-7">
            <div class="reveal reveal-right grid grid-cols-3 sm:grid-cols-4 gap-3">
                @php
                    $ints = ['NEWARK PD','NJSP','NCMEC','NSOPW','911','Ring','Apple Watch','Wear OS','Google Maps','Waze','Twilio','iMessage','SMS','WhatsApp','Slack','Teams'];
                @endphp
                @foreach ($ints as $i => $name)
                    <div class="aspect-square rounded-xl border border-ink-100 bg-white grid place-items-center text-center p-3 text-xs font-semibold text-navy-900 hover:border-brand-600 hover:text-brand-600 hover:-translate-y-0.5 transition shadow-sm">
                        {{ $name }}
                    </div>
                @endforeach
            </div>
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
     FAQ — accordion
========================================================================--}}
<section class="relative py-24 lg:py-32 bg-white">
    <div class="mx-auto max-w-4xl px-5 sm:px-8">
        <div class="text-center">
            <p class="reveal text-xs font-semibold uppercase tracking-[.2em] text-brand-600">FAQ</p>
            <h2 class="reveal reveal-delay-1 mt-4 font-display font-extrabold text-4xl sm:text-5xl lg:text-[56px] leading-[1.05] tracking-tight text-navy-900">
                Frequently asked questions.
            </h2>
        </div>

        @php
            $faqs = [
                ['q'=>'Is Auxilio free to use?','a'=>'Yes — every core safety feature (alerts, SOS, registry, live crime map) is free forever. We never paywall an emergency. Premium plans add concierge agents, family routing, and advanced geofences.'],
                ['q'=>'How fast does an SOS reach a responder?','a'=>'Median time from tap to verified responder dispatch is under 30 seconds. Your location, identity, and situation are sent simultaneously to your authorized contacts and the closest available Super Agent.'],
                ['q'=>'Who can see my location?','a'=>'Only the people you explicitly authorize. Sharing is opt-in, time-bound, and revocable in one tap. We do not sell, monetize, or share your location with anyone — including agencies — without your express consent.'],
                ['q'=>'Where does the offender data come from?','a'=>'We pull from the National Sex Offender Public Website (NSOPW) and individual state registries (e.g., Megan&rsquo;s Law). Data is auto-refreshed; you don&rsquo;t do manual lookups.'],
                ['q'=>'Are Super Agents actually trained?','a'=>'Yes. Every Super Agent is background-checked, identity-verified, and trained in de-escalation, first response, and case handoff. Each has a public badge number you can verify in-app.'],
                ['q'=>'What devices does Auxilio support?','a'=>'iOS 15+ and Android 10+. Companion experiences are available on Apple Watch and Wear OS for silent SOS without unlocking the phone.'],
            ];
        @endphp
        <div class="mt-12 space-y-3">
            @foreach ($faqs as $i => $f)
                <details data-faq class="group rounded-2xl border border-ink-100 bg-white overflow-hidden hover:border-brand-200 transition">
                    <summary class="flex items-center justify-between gap-4 cursor-pointer px-6 py-5 list-none">
                        <h3 class="font-semibold text-navy-900 text-base sm:text-lg">{{ $f['q'] }}</h3>
                        <span class="grid place-items-center shrink-0 w-9 h-9 rounded-full bg-ink-50 text-navy-900 group-open:bg-brand-600 group-open:text-white transition">
                            <svg class="w-4 h-4 transition-transform group-open:rotate-45" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4"><path stroke-linecap="round" stroke-linejoin="round" d="M12 5v14M5 12h14"/></svg>
                        </span>
                    </summary>
                    <div class="px-6 pb-6 -mt-1 text-navy-700/80 leading-relaxed text-[15px]">
                        {!! $f['a'] !!}
                    </div>
                </details>
            @endforeach
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
            <a href="#" class="group inline-flex items-center gap-3 rounded-md bg-white text-navy-900 px-6 py-4 shadow-[0_20px_40px_-15px_rgba(0,0,0,.5)] hover:-translate-y-0.5 transition">
                <img src="/images/app-store.svg" alt="" class="w-8 h-8" />
                <div class="text-left whitespace-nowrap">
                    <p class="text-[10px] uppercase tracking-[.18em] text-ink-500">Download on the</p>
                    <p class="text-base font-bold leading-none mt-0.5">App Store</p>
                </div>
            </a>
            <a href="#" class="group inline-flex items-center gap-3 rounded-md bg-white text-navy-900 px-6 py-4 shadow-[0_20px_40px_-15px_rgba(0,0,0,.5)] hover:-translate-y-0.5 transition">
                <img src="/images/google-play.svg" alt="" class="w-8 h-8" />
                <div class="text-left whitespace-nowrap">
                    <p class="text-[10px] uppercase tracking-[.18em] text-ink-500">Get it on</p>
                    <p class="text-base font-bold leading-none mt-0.5">Google Play</p>
                </div>
            </a>
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
                    <span class="reveal reveal-delay-1 inline-flex items-center gap-2 rounded-full bg-brand-50 text-brand-700 text-xs font-bold uppercase tracking-wider px-3 py-1.5">For Super Agents</span>
                    <h1 class="reveal reveal-delay-2 mt-4 font-display font-extrabold text-4xl sm:text-5xl lg:text-6xl tracking-tight text-navy-900">
                        Auxilio <span class="text-brand-600">Agent</span>.
                    </h1>
                    <p class="reveal reveal-delay-3 mt-4 text-lg text-navy-700/80 max-w-xl">
                        The companion app for verified responders. Accept calls, file reports, run live dispatch — all from the same phone.
                    </p>
                    <div class="reveal reveal-delay-4 mt-8 grid grid-cols-1 sm:grid-cols-2 gap-3" style="max-width:380px;">
                        <a href="#" class="group inline-flex items-center justify-center gap-3 rounded-md bg-red-600 hover:bg-red-700 text-white px-5 py-3.5 shadow-sm hover:shadow-lg transition">
                            <img src="/images/app-store.svg" alt="" class="w-7 h-7 shrink-0" />
                            <div class="text-left whitespace-nowrap leading-tight">
                                <p class="text-[10px] uppercase tracking-wider text-white/80">Download on the</p>
                                <p class="text-sm font-semibold -mt-0.5">App Store</p>
                            </div>
                        </a>
                        <a href="#" class="group inline-flex items-center justify-center gap-3 rounded-md bg-navy-900 hover:bg-navy-800 text-white px-5 py-3.5 shadow-sm hover:shadow-lg transition">
                            <img src="/images/google-play.svg" alt="" class="w-7 h-7 shrink-0" />
                            <div class="text-left whitespace-nowrap leading-tight">
                                <p class="text-[10px] uppercase tracking-wider text-white/80">Get it on</p>
                                <p class="text-sm font-semibold -mt-0.5">Google Play</p>
                            </div>
                        </a>
                    </div>
                </div>
                <div class="reveal reveal-right lg:col-span-5">
                    <div class="relative mx-auto max-w-[280px] aspect-[9/19] rounded-[40px] bg-navy-950 p-3 shadow-[0_30px_80px_-20px_rgba(12,17,38,.6)] float-slow">
                        <div class="absolute top-5 left-1/2 -translate-x-1/2 w-20 h-5 rounded-full bg-navy-950 z-20"></div>
                        <div class="relative w-full h-full rounded-[30px] overflow-hidden bg-white">
                            <img src="/images/screen-assigning.png" alt="Auxilio Agent app" class="absolute inset-0 w-full h-full object-cover object-top" />
                        </div>
                    </div>
                </div>
            </div>

            <div class="reveal stagger mt-16 grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                @foreach ([
                    ['t'=>'Live dispatch queue','b'=>'See incoming reports filtered by distance and category. Accept or pass with one tap.'],
                    ['t'=>'Auto-routed cases','b'=>'The system pings the closest qualified agent first. No bidding, no fighting for jobs.'],
                    ['t'=>'In-app evidence locker','b'=>'Photos, audio, sketches, and victim statements are unlocked the moment you accept.'],
                    ['t'=>'Status & ETA broadcast','b'=>'The victim sees you en route in real time. Update status with one swipe.'],
                    ['t'=>'Background-check baked in','b'=>'Apply once. We verify license, insurance, and clearance — you\'re on the platform in under 72 hours.'],
                    ['t'=>'Earnings dashboard','b'=>'Per-case payout, weekly summary, and tax-ready exports. Always know what you cleared.'],
                ] as $f)
                    <div class="rounded-md border border-ink-100 bg-white p-6 shadow-sm hover:shadow-lg transition">
                        <h3 class="text-base font-bold text-navy-900">{{ $f['t'] }}</h3>
                        <p class="mt-2 text-sm text-navy-700/80 leading-relaxed">{{ $f['b'] }}</p>
                    </div>
                @endforeach
            </div>

            <div class="reveal mt-16 rounded-md bg-gradient-to-br from-navy-950 to-navy-900 text-white p-8 lg:p-12 text-center">
                <p class="text-xs font-bold uppercase tracking-[.2em] text-brand-300">Become an agent</p>
                <h2 class="mt-3 font-display font-extrabold text-3xl sm:text-4xl">Apply to join the network.</h2>
                <p class="mt-3 max-w-xl mx-auto text-navy-200/90">Licensed security, off-duty law enforcement, and certified responders welcome. We handle vetting; you handle the call.</p>
                <a data-route href="#/contact" class="mt-6 inline-flex items-center gap-2 rounded-md bg-brand-600 hover:bg-brand-700 text-white text-sm font-bold px-6 py-3 transition">Start application
                    <svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M5 12h14m0 0l-6-6m6 6l-6 6"/></svg>
                </a>
            </div>
        </div>
    </section>
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
        var allowed = ['crime-map','sex-offender-map','how-it-works','agent-app','about','contact'];
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
</body>
</html>
