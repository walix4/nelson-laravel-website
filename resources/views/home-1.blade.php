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
<header data-nav class="fixed inset-x-0 top-0 z-50 bg-brand-600 text-white shadow-md">
    <nav class="mx-auto flex h-[78px] max-w-7xl items-center px-5 sm:px-8">
        <div class="flex-1 flex items-center">
            <a href="#top" class="flex items-center gap-3 group">
                <span class="grid place-items-center h-11 w-11 rounded-md bg-white shadow-sm transition-transform group-hover:rotate-[-4deg]">
                    <img src="/images/auxilio-user.png" alt="" class="h-9 w-auto" />
                </span>
                <span class="text-lg font-bold tracking-tight text-white uppercase">AUXILIO</span>
            </a>
        </div>

        <ul class="hidden md:flex items-center gap-8 text-sm font-medium text-white/90 shrink-0 whitespace-nowrap">
            <li><a data-route href="#/"                 class="nav-link hover:text-white transition">Home</a></li>
            <li><a data-route href="#/crime-map"        class="nav-link hover:text-white transition">Crime Map</a></li>
            <li><a data-route href="#/sex-offender-map" class="nav-link hover:text-white transition">Sex Offender Map</a></li>
            <li><a data-nav-link href="#walkthrough"    class="nav-link hover:text-white transition">Walkthrough</a></li>
            <li><a data-nav-link href="#voices"         class="nav-link hover:text-white transition">Voices</a></li>
        </ul>

        <div class="flex-1 flex items-center justify-end">
            <button data-menu-btn aria-expanded="false" aria-controls="mobile-menu" class="md:hidden relative w-10 h-10 grid place-items-center rounded-lg hover:bg-white/10 transition">
                <span class="sr-only">Toggle menu</span>
                <svg class="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M4 7h16M4 12h16M4 17h16" /></svg>
            </button>
        </div>
    </nav>

    <div id="mobile-menu" data-menu-panel class="md:hidden absolute inset-x-4 top-[72px] rounded-2xl bg-white border border-ink-100 shadow-xl p-6">
        <ul class="flex flex-col gap-4 text-base font-medium text-navy-800">
            <li><a data-route href="#/">Home</a></li>
            <li><a data-route href="#/crime-map">Crime Map</a></li>
            <li><a data-route href="#/sex-offender-map">Sex Offender Map</a></li>
            <li><a href="#walkthrough">Walkthrough</a></li>
            <li><a href="#voices">Voices</a></li>
        </ul>
    </div>
</header>

<main id="top" class="pt-[78px]">

{{-- ============================================================
     HOME VIEW
============================================================--}}
<div data-view="home">

{{-- =======================================================================
     HERO  — matches the reference: phone-in-hands left, dual logos right
========================================================================--}}
<section class="relative overflow-hidden hero-bg">
    {{-- soft blob backgrounds --}}
    <div class="pointer-events-none absolute inset-0 -z-10">
        <div data-parallax="0.08" class="absolute -top-32 right-[-12%] w-[640px] h-[640px] rounded-full bg-brand-100/50 blur-3xl"></div>
        <div data-parallax="0.05" class="absolute top-1/4 -left-32 w-[460px] h-[460px] rounded-full bg-navy-100/70 blur-3xl"></div>
        <div data-parallax="0.12" class="absolute bottom-0 right-1/3 w-[360px] h-[360px] rounded-full bg-gold-100/60 blur-3xl"></div>
    </div>

    <div class="mx-auto max-w-7xl px-5 sm:px-8 pt-10 sm:pt-14 lg:pt-20 pb-16 sm:pb-20 lg:pb-28 grid lg:grid-cols-12 gap-10 lg:gap-8 items-center">

        {{-- LEFT: hands + phone photograph (bigger + left-bleed) --}}
        <div class="order-2 lg:order-1 lg:col-span-7 relative">
            <div class="reveal reveal-left relative w-full max-w-[560px] sm:max-w-[680px] lg:max-w-none mx-auto lg:mx-0 lg:-ml-24 xl:-ml-48">
                {{-- Soft pedestal --}}
                <div class="absolute inset-x-10 -bottom-2 h-8 sm:h-10 rounded-[50%] bg-navy-900/15 blur-2xl"></div>

                {{-- Red drop-ripple: solid expanding circles, no shadow, slow + cozy --}}
                <div class="absolute inset-0 grid place-items-center pointer-events-none" aria-hidden="true">
                    <span class="absolute w-[55%] aspect-square rounded-full bg-red-500 map-pulse"></span>
                    <span class="absolute w-[55%] aspect-square rounded-full bg-red-500 map-pulse" style="animation-delay:1.75s"></span>
                </div>

                {{-- The hands+phone photo (above radar) --}}
                <div class="relative z-10 float-slow">
                    @include('partials.hero-hands')
                </div>

                {{-- SOS · LIVE pill (top-right) --}}
                <div class="reveal reveal-delay-2 absolute top-1 right-1 sm:top-3 sm:right-3 z-20 inline-flex items-center gap-2 rounded-full bg-red-600 text-white px-3 py-1.5 shadow-lg shadow-red-600/40 sos-glow">
                    <span class="relative inline-flex w-1.5 h-1.5 rounded-full bg-white pulse-dot text-white"></span>
                    <span class="text-[11px] font-bold tracking-widest uppercase">SOS · Live</span>
                </div>

                {{-- Registry notification card (bottom-right) --}}
                <div class="reveal reveal-delay-4 absolute -bottom-2 right-2 sm:bottom-4 sm:right-4 z-20 flex items-center gap-3 rounded-2xl bg-white border border-ink-100 px-3 py-2 sm:px-4 sm:py-3 shadow-lg">
                    <span class="grid place-items-center w-8 h-8 sm:w-9 sm:h-9 rounded-xl bg-navy-900 text-white">
                        <svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M12 22s8-7.5 8-13a8 8 0 10-16 0c0 5.5 8 13 8 13z"/><circle cx="12" cy="9" r="2.5" stroke-width="2"/></svg>
                    </span>
                    <div class="text-[11px] sm:text-xs">
                        <p class="font-semibold text-navy-900">Registry refreshed</p>
                        <p class="text-ink-500">2 within 0.5mi of home</p>
                    </div>
                </div>
            </div>
        </div>

        {{-- RIGHT: heading + CTAs --}}
        <div class="order-1 lg:order-2 lg:col-span-5 lg:pl-2">
            <div>
            <h1 class="reveal reveal-delay-1 font-display text-3xl sm:text-4xl lg:text-[40px] xl:text-[48px] leading-[1.1] tracking-tight text-navy-900">
                Designed for<br/>
                safety of the families,<br/>
                <span class="text-brand-600">making it accessible</span><br/>
                for citizens.
            </h1>

            <p class="reveal reveal-delay-2 mt-6 max-w-xl text-lg text-navy-700/80 leading-relaxed">
                Real-time alerts, one-tap SOS, and live location sharing with trusted agents and loved ones. Auxilio User is your personal safety companion — peace of mind at your fingertips.
            </p>

            <p class="reveal reveal-delay-3 mt-5 text-2xl font-semibold text-navy-900">
                &ldquo;Your Safety, Your Control.&rdquo;
            </p>

            {{-- store buttons --}}
            <div class="reveal reveal-delay-4 mt-8 flex flex-wrap items-center gap-3">
                {{-- Google Play --}}
                <a href="#" class="group inline-flex items-center gap-3 rounded-2xl bg-navy-900 hover:bg-navy-800 text-white px-5 py-3.5 shadow-sm hover:shadow-lg transition">
                    <img src="/images/google-play.svg" alt="" class="w-7 h-7" />
                    <div class="text-left">
                        <p class="text-[10px] uppercase tracking-[.18em] text-white/70">Get it on</p>
                        <p class="text-base font-semibold leading-none -mt-0.5">Google Play</p>
                    </div>
                </a>
                {{-- Apple App Store --}}
                <a href="#" class="group inline-flex items-center gap-3 rounded-2xl bg-navy-900 hover:bg-navy-800 text-white px-5 py-3.5 shadow-sm hover:shadow-lg transition">
                    <img src="/images/app-store.svg" alt="" class="w-7 h-7" />
                    <div class="text-left">
                        <p class="text-[10px] uppercase tracking-[.18em] text-white/70">Download on the</p>
                        <p class="text-base font-semibold leading-none -mt-0.5">App Store</p>
                    </div>
                </a>
            </div>

            <p class="reveal reveal-delay-5 mt-5 text-sm text-ink-500">Get it. Download from Appstore and Google Playstore.</p>
            </div>
        </div>
    </div>
</section>

{{-- (Crime Map moved to its own view below; see [data-view="crime-map"]) --}}

{{-- =======================================================================
     STATS
========================================================================--}}
<section id="walkthrough" class="relative py-24 lg:py-32 overflow-hidden">
    <div class="pointer-events-none absolute inset-0 -z-10">
        <div class="absolute top-1/4 -right-32 w-[480px] h-[480px] rounded-full bg-brand-100/50 blur-3xl"></div>
        <div class="absolute bottom-0 -left-24 w-[400px] h-[400px] rounded-full bg-navy-100/60 blur-3xl"></div>
    </div>
    <div class="mx-auto max-w-7xl px-5 sm:px-8">
        <div class="max-w-2xl">
            <p class="reveal text-xs font-semibold uppercase tracking-[.2em] text-brand-600">A walkthrough</p>
            <h2 class="reveal reveal-delay-1 mt-4 font-display text-4xl sm:text-5xl lg:text-6xl tracking-tight text-navy-900">
                The app, <span class="text-brand-600">in three taps.</span>
            </h2>
            <p class="reveal reveal-delay-2 mt-5 text-lg text-navy-700/80 leading-relaxed">
                Open Auxilio User and you're already covered — alerts on, location synced, and a verified safety network one tap away.
            </p>
        </div>

        @php
            $screens = [
                ['img' => '/images/screen-companion.png', 'tag' => 'Step 01', 'title' => 'Your Personal Safety Companion', 'body' => 'Stay safe with real-time alerts, emergency support, and peace of mind at your fingertips.'],
                ['img' => '/images/screen-sos.png',       'tag' => 'Step 02', 'title' => 'Quick SOS for Instant Help',     'body' => 'Alert trusted agents or emergency responders with just a tap whenever you\'re in danger.'],
                ['img' => '/images/screen-location.png',  'tag' => 'Step 03', 'title' => 'Track and Share Your Location',  'body' => 'Let your loved ones or security agents monitor your location to ensure you\'re always safe.'],
                ['img' => '/images/screen-map.png',       'tag' => 'Step 04', 'title' => 'Live Case Tracking',             'body' => 'Watch your case move in real time — completion bar, agent ETA, distance and duration, all on one screen.'],
            ];
        @endphp

        <div class="mt-16 stagger grid sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-6">
            @foreach ($screens as $s)
                <article class="group flex flex-col items-center text-center">
                    <div class="relative mx-auto w-full max-w-[260px] aspect-[9/19] rounded-[44px] bg-navy-950 p-3 shadow-[0_30px_60px_-20px_rgba(12,17,38,.45)] transition group-hover:-translate-y-2 group-hover:shadow-[0_40px_80px_-20px_rgba(12,17,38,.55)]">
                        <div class="absolute top-5 left-1/2 -translate-x-1/2 w-20 h-5 rounded-full bg-navy-950 z-20"></div>
                        <div class="relative w-full h-full rounded-[32px] overflow-hidden bg-white">
                            <img src="{{ $s['img'] }}" alt="{{ $s['title'] }}" class="absolute inset-0 w-full h-full object-cover object-top" />
                        </div>
                    </div>
                    <span class="mt-7 inline-flex items-center gap-2 rounded-full bg-brand-50 text-brand-700 text-[11px] font-semibold uppercase tracking-[.18em] px-3 py-1">
                        <svg class="w-3 h-3" viewBox="0 0 24 24" fill="currentColor"><circle cx="12" cy="12" r="6"/></svg>
                        {{ $s['tag'] }}
                    </span>
                    <h3 class="mt-4 text-xl font-semibold text-navy-900">{{ $s['title'] }}</h3>
                    <p class="mt-2 max-w-[24ch] text-navy-700/80 leading-relaxed">{{ $s['body'] }}</p>
                </article>
            @endforeach
        </div>
    </div>
</section>

{{-- =======================================================================
     HOW IT WORKS
========================================================================--}}
<section id="how" class="relative bg-navy-950 text-white overflow-hidden">
    <div class="pointer-events-none absolute inset-0 -z-0 opacity-30">
        <div class="absolute top-1/4 -left-32 w-[520px] h-[520px] rounded-full bg-brand-600/40 blur-3xl"></div>
        <div class="absolute bottom-0 -right-32 w-[500px] h-[500px] rounded-full bg-gold-500/25 blur-3xl"></div>
    </div>

    <div class="relative mx-auto max-w-7xl px-5 sm:px-8 py-24 lg:py-32">
        <div class="max-w-3xl">
            <p class="reveal text-xs font-semibold uppercase tracking-[.2em] text-brand-400">Create emergency · 5 steps</p>
            <h2 class="reveal reveal-delay-1 mt-4 font-display text-4xl sm:text-5xl lg:text-6xl tracking-tight">
                From siren <span class="text-gold-400">to signal</span> in seconds.
            </h2>
            <p class="reveal reveal-delay-2 mt-5 text-lg text-navy-200/80 leading-relaxed max-w-2xl">
                Five guided steps. Each captures exactly the detail responders need — and skips what you don't have. Tap through and Auxilio takes care of the rest.
            </p>
        </div>

        @php
            $flow = [
                ['n' => '01', 'tag' => 'Categorize', 'title' => 'Pick the urgency &amp; category.',                          'body' => 'Choose Urgent or Regular, then tap the type — Sexual Crimes, Robbery, Physical Violence, or Homicide. Auxilio routes the priority for you.', 'img' => '/images/screen-categorize.png', 'pills' => ['Urgent','Regular'], 'chips' => ['Sexual Crimes','Robbery','Physical Violence','Homicide']],
                ['n' => '02', 'tag' => 'Describe',   'title' => 'Capture the suspect — guided.',                            'body' => 'Step-through dropdowns for Race, Age, Hair, Height, Weight, Build, Teeth, Face Color and more. Skip what you don\'t know — Auxilio fills in the rest.', 'img' => '/images/screen-suspect.png', 'chips' => ['Race','Age','Hair','Height','Weight','Build','Face Color']],
                ['n' => '03', 'tag' => 'Vehicle',    'title' => 'Add vehicle details if you saw one.',                       'body' => 'Car, motorcycle, e-scooter — whatever was involved. License plate, make, model, color, body style. Skip cleanly if it doesn\'t apply.', 'img' => '/images/screen-vehicle.png', 'chips' => ['Type','License Plate','Make','Model','Color','Body Style']],
                ['n' => '04', 'tag' => 'Evidence',   'title' => 'Drop in evidence on the spot.',                             'body' => 'Record video, capture audio, or upload up to six photos. Add a description in your own words — everything is encrypted on send.', 'img' => '/images/screen-evidence.png', 'chips' => ['Record Video','Record Audio','Upload Photos','Description']],
                ['n' => '05', 'tag' => 'Sketch',     'title' => 'Build a suspect <span class="text-gold-400">sketch</span>.', 'body' => 'Tap through guided options for body, skin, hair, face, eyes and accessories. Auxilio composes a recognizable sketch in under a minute and ships it with the report.', 'img' => '/images/screen-sketch.png', 'chips' => ['Body','Skin','Hair','Facial Hair','Eyes','Nose','Jaw','Face','Head Wear','Glasses']],
            ];
        @endphp

        <div class="mt-16 lg:mt-20 space-y-20 lg:space-y-28">
            @foreach ($flow as $i => $f)
                @php $reverse = $i % 2 === 1; @endphp
                <article class="grid lg:grid-cols-12 gap-10 items-center">
                    <div class="lg:col-span-5 {{ $reverse ? 'lg:order-2' : '' }} reveal {{ $reverse ? 'reveal-right' : 'reveal-left' }}">
                        <div class="relative mx-auto max-w-[280px] lg:max-w-[320px] aspect-[9/19] rounded-[44px] bg-navy-900 p-3 shadow-[0_40px_80px_-20px_rgba(0,0,0,.6)] ring-1 ring-white/5">
                            <div class="absolute top-5 left-1/2 -translate-x-1/2 w-24 h-6 rounded-full bg-navy-900 z-20"></div>
                            <div class="relative w-full h-full rounded-[32px] overflow-hidden bg-white">
                                <img src="{{ $f['img'] }}" alt="{{ $f['title'] }}" loading="lazy" class="absolute inset-0 w-full h-full object-cover object-top" />
                            </div>
                            <div class="absolute -inset-4 -z-10 rounded-[60px] bg-gradient-to-tr from-brand-600/40 via-transparent to-gold-400/20 blur-2xl"></div>
                        </div>
                    </div>

                    <div class="lg:col-span-7 {{ $reverse ? 'lg:order-1 lg:pr-12' : 'lg:pl-8' }} reveal {{ $reverse ? 'reveal-left' : 'reveal-right' }}">
                        <div class="flex items-center gap-3 text-brand-400">
                            <span class="font-display text-5xl lg:text-6xl tracking-tight">{{ $f['n'] }}</span>
                            <span class="text-[11px] font-bold uppercase tracking-[.22em] rounded-full bg-brand-600/20 border border-brand-500/40 text-brand-200 px-3 py-1">{{ $f['tag'] }}</span>
                        </div>
                        <h3 class="mt-3 font-display text-3xl sm:text-4xl lg:text-5xl tracking-tight">{!! $f['title'] !!}</h3>
                        <p class="mt-4 text-lg text-navy-200/80 leading-relaxed max-w-xl">{{ $f['body'] }}</p>

                        @if (!empty($f['pills']))
                            <div class="mt-6 inline-flex rounded-full bg-white/5 border border-white/10 p-1">
                                <span class="px-4 py-1.5 rounded-full bg-brand-600 text-white text-xs font-semibold">{{ $f['pills'][0] }}</span>
                                <span class="px-4 py-1.5 rounded-full text-white/60 text-xs font-medium">{{ $f['pills'][1] }}</span>
                            </div>
                        @endif

                        <div class="mt-5 flex flex-wrap gap-2">
                            @foreach ($f['chips'] as $chip)
                                <span class="text-xs font-medium text-white/80 rounded-full bg-white/5 border border-white/10 px-3 py-1.5">{{ $chip }}</span>
                            @endforeach
                        </div>
                    </div>
                </article>
            @endforeach
        </div>
    </div>

    {{-- Submit Emergency — scroll-locked CTA. JS pins the page here until the button is clicked. --}}
    <div data-submit-lock class="relative h-screen bg-navy-950">
        <div class="absolute inset-0 -z-0 opacity-30 pointer-events-none">
            <div class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[720px] h-[720px] rounded-full bg-brand-600/30 blur-3xl"></div>
            <div class="absolute top-10 left-10 w-[280px] h-[280px] rounded-full bg-gold-500/20 blur-3xl"></div>
        </div>
        <div class="relative h-full flex items-center justify-center px-5 sm:px-8">
            <div class="text-center max-w-3xl w-full">
                <p class="reveal text-xs font-semibold uppercase tracking-[.2em] text-emerald-300 inline-flex items-center gap-2">
                    <span class="grid place-items-center w-5 h-5 rounded-full bg-emerald-400/20 text-emerald-300">
                        <svg class="w-3 h-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3"><path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7"/></svg>
                    </span>
                    Report complete · 5 of 5
                </p>

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
                            {{-- separator line — vertically aligned to circle center (~28px from top of li on sm) --}}
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

                <h3 class="reveal reveal-delay-2 mt-12 font-display text-3xl sm:text-4xl lg:text-5xl tracking-tight">
                    All <span class="text-gold-400">5 steps</span> complete. <br class="hidden sm:block"/>
                    <span class="text-white/85">Ready to dispatch.</span>
                </h3>
                <p class="reveal reveal-delay-3 mt-4 text-base text-navy-200/80 max-w-xl mx-auto leading-relaxed">
                    Hit the button to lock the report, encrypt it, and dispatch a verified Super Agent in your radius — instantly.
                </p>

                <div class="reveal reveal-delay-4 mt-10 flex flex-col items-center gap-5">
                    <button data-submit-emergency type="button"
                        class="submit-emergency group inline-flex items-center gap-3 rounded-full text-white font-bold uppercase tracking-[.18em] text-base px-10 py-5">
                        <svg class="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4"><path stroke-linecap="round" stroke-linejoin="round" d="M12 9v3m0 4h.01M5.07 19h13.86c1.54 0 2.5-1.67 1.73-3L13.73 4a2 2 0 00-3.46 0L3.34 16c-.77 1.33.19 3 1.73 3z"/></svg>
                        Submit Emergency
                        <svg class="w-5 h-5 transition-transform group-hover:translate-x-1" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4"><path stroke-linecap="round" stroke-linejoin="round" d="M5 12h14m0 0l-6-6m6 6l-6 6"/></svg>
                    </button>

                    <p data-submit-hint class="text-xs text-white/50 flex items-center justify-center gap-2">
                        <span class="inline-block w-1.5 h-1.5 rounded-full bg-brand-400 animate-pulse"></span>
                        Tap the button to dispatch — scroll is paused until you do.
                    </p>
                </div>
            </div>
        </div>
    </div>
</section>

{{-- =======================================================================
     SUSPECT SKETCH BUILDER — spotlight on the unique sketch composer
========================================================================--}}
<section id="dispatch" class="relative py-24 lg:py-32 bg-navy-950 text-white overflow-hidden">
    <div class="pointer-events-none absolute inset-0 -z-0 opacity-30">
        <div class="absolute top-0 left-1/4 w-[480px] h-[480px] rounded-full bg-brand-600/40 blur-3xl"></div>
        <div class="absolute bottom-0 right-1/4 w-[420px] h-[420px] rounded-full bg-gold-500/30 blur-3xl"></div>
    </div>

    <div class="relative mx-auto max-w-7xl px-5 sm:px-8 grid lg:grid-cols-12 gap-12 items-center">
        <div class="lg:col-span-6 reveal reveal-left">
            <p class="text-xs font-semibold uppercase tracking-[.2em] text-brand-400">Live Agent Dispatch</p>
            <h2 class="mt-4 font-display text-4xl sm:text-5xl lg:text-6xl tracking-tight">
                A verified agent, <span class="text-gold-400">on the way</span> in seconds.
            </h2>
            <p class="mt-5 text-lg text-navy-200/80 leading-relaxed max-w-xl">
                The moment you confirm an emergency, Auxilio searches nearby Super Agents, locks in the closest match, and shows you the countdown — distance, duration, ETA — until they arrive.
            </p>

            <ul class="mt-8 stagger space-y-3">
                @php
                    $bullets = [
                        ['title' => 'Verified Super Agents', 'body' => 'Background-checked, trained, and rated by the community.'],
                        ['title' => 'Live ETA &amp; metrics', 'body' => 'Distance, duration, driving and walking times — refreshed continuously.'],
                        ['title' => 'Trusted contacts loop', 'body' => 'Loved ones can watch the same dispatch — no extra setup.'],
                    ];
                @endphp
                @foreach ($bullets as $b)
                    <li class="flex items-start gap-4 rounded-2xl border border-white/10 bg-white/[0.03] p-4 hover:bg-white/[0.06] transition">
                        <span class="grid place-items-center shrink-0 w-9 h-9 rounded-xl bg-brand-600 text-white">
                            <svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7"/></svg>
                        </span>
                        <div>
                            <p class="font-semibold">{!! $b['title'] !!}</p>
                            <p class="text-sm text-navy-200/80 mt-0.5">{!! $b['body'] !!}</p>
                        </div>
                    </li>
                @endforeach
            </ul>
        </div>

        {{-- Live dispatch panel --}}
        <div class="lg:col-span-6 reveal reveal-right">
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

                {{-- Live map with rich realistic navigation styling + sonar + route + officer avatar --}}
                <div class="relative mt-6 aspect-[16/10] rounded-2xl border border-white/10 bg-[#0d1429] overflow-hidden">
                    <svg viewBox="0 0 400 250" class="absolute inset-0 w-full h-full" aria-hidden="true" preserveAspectRatio="xMidYMid slice">
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

                        {{-- Base map fill --}}
                        <rect width="400" height="250" fill="url(#bgFade)"/>
                        <rect width="400" height="250" fill="url(#dispatchGrid)"/>

                        {{-- River / water bodies (subtle teal) --}}
                        <path d="M-10 220 Q60 200 130 215 Q210 232 280 218 Q340 208 410 226 L410 260 L-10 260 Z"
                              fill="#0c2742" opacity=".75"/>
                        <path d="M-10 220 Q60 200 130 215 Q210 232 280 218 Q340 208 410 226"
                              stroke="rgba(120,180,230,.08)" stroke-width="1.2" fill="none"/>

                        {{-- Park / green zones --}}
                        <path d="M40 110 Q70 95 110 105 Q140 113 145 140 Q140 165 105 168 Q70 170 50 155 Q35 138 40 110 Z"
                              fill="#1a3a2c" opacity=".55"/>
                        <path d="M260 30 Q300 20 335 40 Q355 60 345 88 Q325 105 290 100 Q260 92 255 65 Q252 45 260 30 Z"
                              fill="#1a3a2c" opacity=".4"/>

                        {{-- Block tiles (give the map "city" texture) --}}
                        <g fill="rgba(255,255,255,.025)" stroke="rgba(255,255,255,.05)" stroke-width="0.5">
                            <rect x="160" y="50"  width="38" height="22" rx="2"/>
                            <rect x="205" y="50"  width="32" height="22" rx="2"/>
                            <rect x="160" y="78"  width="38" height="18" rx="2"/>
                            <rect x="205" y="78"  width="32" height="18" rx="2"/>
                            <rect x="246" y="115" width="42" height="26" rx="2"/>
                            <rect x="293" y="115" width="34" height="26" rx="2"/>
                            <rect x="246" y="146" width="42" height="22" rx="2"/>
                            <rect x="293" y="146" width="34" height="22" rx="2"/>
                            <rect x="22"  y="40"  width="36" height="20" rx="2"/>
                            <rect x="22"  y="65"  width="36" height="22" rx="2"/>
                            <rect x="335" y="40"  width="40" height="22" rx="2"/>
                            <rect x="335" y="68"  width="40" height="22" rx="2"/>
                            <rect x="55"  y="180" width="34" height="20" rx="2"/>
                            <rect x="92"  y="180" width="38" height="20" rx="2"/>
                            <rect x="170" y="180" width="42" height="20" rx="2"/>
                        </g>

                        {{-- Highway (thicker, lighter) --}}
                        <path d="M-10 95 Q90 75 200 90 Q300 105 410 90"
                              stroke="rgba(245,221,135,.18)" stroke-width="6" fill="none" stroke-linecap="round"/>
                        <path d="M-10 95 Q90 75 200 90 Q300 105 410 90"
                              stroke="rgba(245,221,135,.55)" stroke-width="1.4" fill="none" stroke-dasharray="6 6"/>

                        {{-- Major streets --}}
                        <g stroke="rgba(255,255,255,.12)" stroke-width="2.2" fill="none" stroke-linecap="round">
                            <path d="M-10 165 Q90 150 200 170 Q310 190 410 170"/>
                            <path d="M105 -10 Q120 60 150 130 Q175 200 165 260"/>
                            <path d="M295 -10 Q280 60 270 120 Q258 195 245 260"/>
                        </g>

                        {{-- Minor street network --}}
                        <g stroke="rgba(255,255,255,.06)" stroke-width="1" fill="none">
                            <path d="M-10 35  L410 35"/>
                            <path d="M-10 130 L410 130"/>
                            <path d="M-10 195 L410 195"/>
                            <path d="M50  -10 L50  260"/>
                            <path d="M210 -10 L210 260"/>
                            <path d="M360 -10 L360 260"/>
                        </g>

                        {{-- Subtle area labels --}}
                        <g fill="rgba(255,255,255,.18)" font-family="Inter, sans-serif" font-weight="600" font-size="7" letter-spacing=".15em">
                            <text x="60"  y="155" >RIVERSIDE</text>
                            <text x="170" y="62"  >MIDTOWN</text>
                            <text x="270" y="60"  >EAST HILL</text>
                            <text x="100" y="195" >DOWNTOWN</text>
                        </g>

                        {{-- River label --}}
                        <text x="160" y="245" fill="rgba(140,190,230,.45)" font-family="Inter, sans-serif" font-style="italic" font-size="8">East River</text>

                        {{-- Marching dashed route from agent → user --}}
                        <path id="dispatchRoute" d="M 70 70 Q 160 110 200 150 Q 250 180 330 200"
                              stroke="url(#routeStroke)" stroke-width="3" fill="none" stroke-linecap="round"
                              class="route-march" />
                        {{-- subtle glow underlay --}}
                        <path d="M 70 70 Q 160 110 200 150 Q 250 180 330 200"
                              stroke="rgba(244,196,65,.25)" stroke-width="8" fill="none" stroke-linecap="round" filter="url(#glowR)"/>

                        {{-- Moving police cruiser — top-down, fully detailed --}}
                        <g>
                            {{-- Big red & blue siren glow halos (alternating, soft-blurred) --}}
                            <circle cx="0" cy="0" r="28" fill="rgba(228,67,82,.55)" filter="url(#bigGlow)">
                                <animate attributeName="opacity" values=".85;0;.85" dur=".42s" repeatCount="indefinite"/>
                            </circle>
                            <circle cx="0" cy="0" r="28" fill="rgba(59,130,246,.55)" filter="url(#bigGlow)">
                                <animate attributeName="opacity" values="0;.85;0" dur=".42s" repeatCount="indefinite"/>
                            </circle>

                            {{-- Light beams projecting forward and back from the bar (cone shapes) --}}
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

                            {{-- Wheels (under the body) --}}
                            <g>
                                <rect x="-10" y="-7.8" width="4" height="2.4" rx=".7" fill="#0a0a0a"/>
                                <rect x="-9.7" y="-7.4" width="3.4" height="1.6" rx=".3" fill="#2a2a2a"/>
                            </g>
                            <g>
                                <rect x="6" y="-7.8" width="4" height="2.4" rx=".7" fill="#0a0a0a"/>
                                <rect x="6.3" y="-7.4" width="3.4" height="1.6" rx=".3" fill="#2a2a2a"/>
                            </g>
                            <g>
                                <rect x="-10" y="5.4" width="4" height="2.4" rx=".7" fill="#0a0a0a"/>
                                <rect x="-9.7" y="5.8" width="3.4" height="1.6" rx=".3" fill="#2a2a2a"/>
                            </g>
                            <g>
                                <rect x="6" y="5.4" width="4" height="2.4" rx=".7" fill="#0a0a0a"/>
                                <rect x="6.3" y="5.8" width="3.4" height="1.6" rx=".3" fill="#2a2a2a"/>
                            </g>

                            {{-- Cruiser body (sleek silhouette with rounded nose & rear) --}}
                            <path d="M-12.5 -6 Q-14 -6 -14 -4.5 L-14 4.5 Q-14 6 -12.5 6 L11.5 6 Q14 6 14 4 L14 -4 Q14 -6 11.5 -6 Z"
                                  fill="url(#carBody)" stroke="#1a2548" stroke-width="0.4"/>

                            {{-- Hood shine (subtle) --}}
                            <path d="M5 -5.6 L13.5 -5.4 L13.5 -2 L5 -2.6 Z" fill="url(#hoodShine)" opacity=".7"/>

                            {{-- Door split lines --}}
                            <line x1="-3" y1="-6" x2="-3" y2="6" stroke="rgba(0,0,0,.18)" stroke-width=".35"/>
                            <line x1="3"  y1="-6" x2="3"  y2="6" stroke="rgba(0,0,0,.18)" stroke-width=".35"/>

                            {{-- Hood center seam --}}
                            <line x1="14" y1="0" x2="9" y2="0" stroke="rgba(0,0,0,.12)" stroke-width=".3"/>

                            {{-- Side mirrors --}}
                            <rect x="2.5" y="-7"  width="2" height="1.4" rx=".4" fill="#1a2548"/>
                            <rect x="2.5" y="5.6" width="2" height="1.4" rx=".4" fill="#1a2548"/>

                            {{-- Front windshield (right side, deep tinted with sky reflection) --}}
                            <path d="M3 -5 L8.5 -3.5 L8.5 3.5 L3 5 Z" fill="#1e3a5f"/>
                            <path d="M3 -5 L8.5 -3.5 L8.5 -1.5 L3 -2 Z" fill="rgba(140,180,230,.45)"/>
                            {{-- Rear window --}}
                            <path d="M-8.5 -3.5 L-3 -5 L-3 5 L-8.5 3.5 Z" fill="#1e3a5f"/>
                            <path d="M-8.5 -3.5 L-3 -5 L-3 -3 L-8.5 -1.5 Z" fill="rgba(140,180,230,.4)"/>

                            {{-- Black police livery stripe with POLICE text --}}
                            <rect x="-12" y="-1.4" width="24" height="2.8" fill="#0c1126"/>
                            <text x="0" y=".7" text-anchor="middle" font-family="Inter, sans-serif" font-weight="900" font-size="1.9" fill="#fff" letter-spacing=".45">POLICE</text>

                            {{-- Headlights (front edge, very bright) --}}
                            <rect x="12.6" y="-4.8" width="1.6" height="1.8" rx=".4" fill="#fffce5"/>
                            <rect x="12.6" y="3"    width="1.6" height="1.8" rx=".4" fill="#fffce5"/>
                            {{-- Front grille --}}
                            <rect x="13" y="-1.5" width="1" height="3" rx=".2" fill="#0c1126"/>

                            {{-- Tail lights (rear edge, dim red) --}}
                            <rect x="-14" y="-4.8" width="1.2" height="1.8" rx=".3" fill="#a01818"/>
                            <rect x="-14" y="3"    width="1.2" height="1.8" rx=".3" fill="#a01818"/>

                            {{-- Light bar housing on roof --}}
                            <rect x="-4" y="-3.4" width="8" height="6.8" rx="1" fill="#0c1126" stroke="#1a2548" stroke-width=".25"/>

                            {{-- Top row: 4 red LEDs (sequential flash) --}}
                            <g>
                                <circle cx="-2.6" cy="-2" r=".7" fill="#e44352" filter="url(#glowR)">
                                    <animate attributeName="fill-opacity" values="1;.2;.2;.2;1" dur=".4s" repeatCount="indefinite"/>
                                </circle>
                                <circle cx="-.85" cy="-2" r=".7" fill="#e44352" filter="url(#glowR)">
                                    <animate attributeName="fill-opacity" values=".2;1;.2;.2;.2" dur=".4s" repeatCount="indefinite"/>
                                </circle>
                                <circle cx=".85"  cy="-2" r=".7" fill="#e44352" filter="url(#glowR)">
                                    <animate attributeName="fill-opacity" values=".2;.2;1;.2;.2" dur=".4s" repeatCount="indefinite"/>
                                </circle>
                                <circle cx="2.6"  cy="-2" r=".7" fill="#e44352" filter="url(#glowR)">
                                    <animate attributeName="fill-opacity" values=".2;.2;.2;1;.2" dur=".4s" repeatCount="indefinite"/>
                                </circle>
                            </g>

                            {{-- Center white strobes --}}
                            <rect x="-1" y=".1" width="2" height=".5" rx=".15" fill="#fff">
                                <animate attributeName="fill-opacity" values="1;0;1;0;1" dur=".22s" repeatCount="indefinite"/>
                            </rect>

                            {{-- Bottom row: 4 blue LEDs (counter-sequential flash) --}}
                            <g>
                                <circle cx="-2.6" cy="2" r=".7" fill="#3b82f6" filter="url(#glowR)">
                                    <animate attributeName="fill-opacity" values=".2;.2;.2;1;.2" dur=".4s" repeatCount="indefinite"/>
                                </circle>
                                <circle cx="-.85" cy="2" r=".7" fill="#3b82f6" filter="url(#glowR)">
                                    <animate attributeName="fill-opacity" values=".2;.2;1;.2;.2" dur=".4s" repeatCount="indefinite"/>
                                </circle>
                                <circle cx=".85"  cy="2" r=".7" fill="#3b82f6" filter="url(#glowR)">
                                    <animate attributeName="fill-opacity" values=".2;1;.2;.2;.2" dur=".4s" repeatCount="indefinite"/>
                                </circle>
                                <circle cx="2.6"  cy="2" r=".7" fill="#3b82f6" filter="url(#glowR)">
                                    <animate attributeName="fill-opacity" values="1;.2;.2;.2;1" dur=".4s" repeatCount="indefinite"/>
                                </circle>
                            </g>

                            <animateMotion dur="6s" repeatCount="indefinite" rotate="auto">
                                <mpath href="#dispatchRoute"/>
                            </animateMotion>
                        </g>

                        {{-- user destination pin --}}
                        <g transform="translate(330 200)">
                            <circle r="11" fill="rgba(228,67,82,.18)"/>
                            <circle r="7"  fill="#fff"/>
                            <circle r="3.5" fill="#e44352"/>
                        </g>
                        <text x="312" y="225" fill="#fff" font-size="10" font-family="Inter, sans-serif" font-weight="700">You</text>

                        {{-- Vignette top --}}
                        <rect width="400" height="250" fill="url(#vignette)" pointer-events="none"/>
                    </svg>

                    {{-- Officer Marcus — round avatar with floating name label (the simple original) --}}
                    <div class="absolute" style="left: calc(70/400 * 100%); top: calc(70/250 * 100%); transform: translate(-50%, -50%);">
                        <div class="relative">
                            <div class="absolute -inset-1 rounded-full bg-gold-400/30 blur-md"></div>
                            <div class="relative w-12 h-12 rounded-full ring-2 ring-gold-300 ring-offset-2 ring-offset-[#0d1429] overflow-hidden bg-navy-800 shadow-lg">
                                <svg viewBox="0 0 64 64" class="w-full h-full">
                                    <defs>
                                        <radialGradient id="officerBg" cx="50%" cy="35%" r="65%">
                                            <stop offset="0%"  stop-color="#3a4870"/>
                                            <stop offset="100%" stop-color="#0c1126"/>
                                        </radialGradient>
                                        <linearGradient id="officerSkin" x1="0" x2="0" y1="0" y2="1">
                                            <stop offset="0%"  stop-color="#f3d4b3"/>
                                            <stop offset="60%" stop-color="#dcb189"/>
                                            <stop offset="100%" stop-color="#a87a55"/>
                                        </linearGradient>
                                        <linearGradient id="officerCap" x1="0" x2="0" y1="0" y2="1">
                                            <stop offset="0%" stop-color="#3a4870"/>
                                            <stop offset="100%" stop-color="#0c1126"/>
                                        </linearGradient>
                                        <linearGradient id="officerUni" x1="0" x2="0" y1="0" y2="1">
                                            <stop offset="0%" stop-color="#28335a"/>
                                            <stop offset="100%" stop-color="#0c1126"/>
                                        </linearGradient>
                                        <radialGradient id="officerCheek" cx="50%" cy="50%" r="50%">
                                            <stop offset="0%" stop-color="rgba(220,130,110,.45)"/>
                                            <stop offset="100%" stop-color="transparent"/>
                                        </radialGradient>
                                    </defs>
                                    <rect width="64" height="64" fill="url(#officerBg)"/>
                                    <path d="M0 64 Q3 44 16 42 L48 42 Q61 44 64 64 Z" fill="url(#officerUni)"/>
                                    <rect x="5" y="46" width="6" height="2.5" rx=".4" fill="#f4c441"/>
                                    <rect x="53" y="46" width="6" height="2.5" rx=".4" fill="#f4c441"/>
                                    <path d="M22 42 Q27 46 32 50 Q37 46 42 42 L40 50 L24 50 Z" fill="#0a0e1f"/>
                                    <rect x="27" y="55" width="10" height="3" rx=".4" fill="#f4c441"/>
                                    <path d="M27.5 38 L27.5 45 Q32 47.5 36.5 45 L36.5 38 Z" fill="url(#officerSkin)"/>
                                    <path d="M27.5 39 Q32 41 36.5 39 L36.5 40.2 Q32 42.2 27.5 40.2 Z" fill="rgba(0,0,0,.18)"/>
                                    <ellipse cx="32" cy="29" rx="10.5" ry="12.5" fill="url(#officerSkin)"/>
                                    <ellipse cx="22" cy="29" rx="1.4" ry="2.4" fill="url(#officerSkin)"/>
                                    <ellipse cx="42" cy="29" rx="1.4" ry="2.4" fill="url(#officerSkin)"/>
                                    <ellipse cx="26" cy="32.5" rx="2.5" ry="1.4" fill="url(#officerCheek)"/>
                                    <ellipse cx="38" cy="32.5" rx="2.5" ry="1.4" fill="url(#officerCheek)"/>
                                    <path d="M22 24 Q32 21 42 24 Q42 28 38 28.5 L26 28.5 Q22 28 22 24 Z" fill="#3a2615"/>
                                    <path d="M19 24 Q32 28 45 24 L45 25.6 Q32 29 19 25.6 Z" fill="#070b1a"/>
                                    <path d="M19 24 Q19 13 32 11 Q45 13 45 24 Z" fill="url(#officerCap)"/>
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
                            <div class="absolute left-full ml-2 top-1/2 -translate-y-1/2 whitespace-nowrap">
                                <p class="text-[10px] font-bold text-white leading-tight drop-shadow">Officer Marcus</p>
                                <p class="text-[9px] text-gold-300 leading-tight drop-shadow">en route · ★ 4.9</p>
                            </div>
                        </div>
                    </div>

                    {{-- Sonar rings on user destination --}}
                    <div class="absolute" style="left: calc(330/400 * 100%); top: calc(200/250 * 100%); transform: translate(-50%, -50%);">
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
                <div class="mt-5 rounded-2xl border border-white/10 bg-white/[0.03] px-4 py-3">
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
                <div class="mt-5 rounded-2xl border border-brand-500/30 bg-brand-600/10 px-4 py-3 flex items-center justify-between">
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

{{-- =======================================================================
     MARQUEE / TRUST BAR
========================================================================--}}
<section class="relative border-y border-ink-100 bg-white">
    <div class="mx-auto max-w-7xl px-5 sm:px-8 py-14 lg:py-20 stagger grid grid-cols-2 lg:grid-cols-4 gap-y-10 gap-x-6">
        @php
            $stats = [
                ['count' => 1,   'suffix' => 'M+', 'label' => 'Crimes Mapped'],
                ['count' => 850, 'suffix' => 'K',  'label' => 'Offenders Tracked'],
                ['count' => 200, 'suffix' => 'K',  'label' => 'Families Protected'],
                ['count' => 30,  'suffix' => 's',  'label' => 'Avg. Alert Time', 'prefix' => '<'],
            ];
        @endphp
        @foreach ($stats as $s)
            <div class="relative">
                <p class="font-display text-5xl lg:text-6xl tracking-tight text-navy-900">
                    @if(!empty($s['prefix']))<span class="text-brand-600">{{ $s['prefix'] }}</span>@endif<span data-count="{{ $s['count'] }}" data-suffix="{{ $s['suffix'] }}">0{{ $s['suffix'] }}</span>
                </p>
                <p class="mt-2 text-xs font-semibold uppercase tracking-[.18em] text-ink-500">{{ $s['label'] }}</p>
            </div>
        @endforeach
    </div>
</section>

{{-- =======================================================================
     FEATURES
========================================================================--}}
<section id="features" class="relative py-24 lg:py-32 bg-ink-50/40">
    <div class="mx-auto max-w-7xl px-5 sm:px-8">
        <div class="max-w-2xl">
            <p class="reveal text-xs font-semibold uppercase tracking-[.2em] text-brand-600">Features</p>
            <h2 class="reveal reveal-delay-1 mt-4 font-display text-4xl sm:text-5xl lg:text-6xl tracking-tight text-navy-900">
                Family-grade safety, <span class="text-brand-600">in real time.</span>
            </h2>
            <p class="reveal reveal-delay-2 mt-5 text-lg text-navy-700/80 leading-relaxed">
                Live crime data, registered offender alerts, and instant emergency response — all bundled into a single app that lives in your pocket. Built for parents, families, and communities.
            </p>
        </div>

        @php
            $features = [
                ['title' => 'Real-Time Safety Alerts',  'body' => 'Stay safe with instant push notifications the moment something happens near you, your home, or the people you care about.', 'icon' => 'bell'],
                ['title' => 'Quick SOS for Instant Help', 'body' => 'One tap alerts trusted agents or emergency responders with your location, situation, and identity — when seconds matter.',  'icon' => 'sos'],
                ['title' => 'Track &amp; Share Location', 'body' => 'Let your loved ones or verified security agents monitor your location in real time — so you\'re never alone on the way home.',     'icon' => 'location'],
                ['title' => 'Verified Super Agents',     'body' => 'Connect to a trained, verified network of safety agents who can respond, escort, or coordinate help on your behalf.',                'icon' => 'shield'],
                ['title' => 'Live Crime Map',            'body' => 'A live, color-coded map of incidents reported around you — searchable, filterable, and refreshed as new events come in.',          'icon' => 'map'],
                ['title' => 'Categorized Reporting',     'body' => 'Report incidents with the right urgency and category — Sexual Crimes, Robbery, Physical Violence, Homicides — in seconds.',         'icon' => 'feed'],
                ['title' => 'Suspect Sketch Builder',    'body' => 'Help responders identify a suspect with a guided sketch composer — features, build, clothing — all from your phone.',              'icon' => 'sketch'],
                ['title' => 'Case Progress Tracking',    'body' => 'Watch your case move with a live completion bar, agent ETA, and distance / duration metrics — no more wondering what happens next.', 'icon' => 'progress'],
                ['title' => 'Trusted Community Watch',   'body' => 'Privately share live updates with neighbors and trusted contacts — turn your block into an always-on safety network.',             'icon' => 'people'],
            ];
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

        <div class="mt-14 stagger grid sm:grid-cols-2 lg:grid-cols-3 gap-px bg-ink-100 rounded-3xl overflow-hidden border border-ink-100">
            @foreach ($features as $i => $f)
                <article class="group relative bg-white p-8 lg:p-10 hover:bg-brand-50/30 transition-colors">
                    <span class="grid place-items-center w-12 h-12 rounded-2xl bg-navy-900 text-white group-hover:bg-brand-600 group-hover:rotate-[-6deg] transition">
                        <svg class="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8">
                            {!! $icons[$f['icon']] !!}
                        </svg>
                    </span>
                    <h3 class="mt-6 text-xl font-semibold tracking-tight text-navy-900">{{ $f['title'] }}</h3>
                    <p class="mt-2.5 text-navy-700/80 leading-relaxed">{{ $f['body'] }}</p>
                    <span class="absolute top-8 right-8 text-xs font-mono text-ink-300">0{{ $i + 1 }}</span>
                    <span class="pointer-events-none absolute bottom-0 left-0 h-0.5 w-0 bg-brand-600 group-hover:w-full transition-all duration-500"></span>
                </article>
            @endforeach
        </div>
    </div>
</section>

{{-- =======================================================================
     APP WALKTHROUGH — actual onboarding screens from the app
========================================================================--}}
<section class="border-y border-ink-100 bg-white py-8 overflow-hidden">
    <div class="flex items-center gap-6 marquee-track whitespace-nowrap">
        @php
            $bar = ['Trusted by 200,000+ families', 'Verified Super Agents', 'iOS · Android', 'Real-time alerts', 'One-tap SOS', 'Suspect Sketch Builder', 'Live case tracking', 'Privacy-first by design'];
            $bar = array_merge($bar, $bar);
        @endphp
        @foreach ($bar as $item)
            <span class="inline-flex items-center gap-3 text-sm font-medium text-ink-500">
                <svg class="w-3 h-3 text-brand-600" viewBox="0 0 24 24" fill="currentColor"><circle cx="12" cy="12" r="6"/></svg>
                {{ $item }}
            </span>
        @endforeach
    </div>
</section>

{{-- =======================================================================
     TESTIMONIALS
========================================================================--}}
<section id="voices" class="relative py-24 lg:py-32 bg-ink-50/40">
    <div class="mx-auto max-w-7xl px-5 sm:px-8">
        <div class="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6">
            <div class="max-w-xl">
                <p class="reveal text-xs font-semibold uppercase tracking-[.2em] text-brand-600">Voices</p>
                <h2 class="reveal reveal-delay-1 mt-4 font-display text-4xl sm:text-5xl lg:text-6xl tracking-tight text-navy-900">
                    Built for parents.<br/>
                    Loved by them.
                </h2>
            </div>
            <p class="reveal reveal-delay-2 max-w-md text-navy-700/80">
                Available on iOS and Android — used by parents, students, and communities across the country to make safety information actually actionable.
            </p>
        </div>

        @php
            $reviews = [
                ['name' => 'Sarah Mitchell', 'role' => 'Parent · Charlotte, NC',
                 'photo' => 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=160&h=160&fit=crop&q=80',
                 'body' => '"I used to refresh the local news after every siren. Auxilio gives me the actual incident, on a map, the moment it happens — I know whether to keep the kids inside or carry on with our day."'],
                ['name' => 'David Chen',     'role' => 'Homeowner · Austin, TX',
                 'photo' => 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=160&h=160&fit=crop&q=80',
                 'body' => '"We bought a house and the offender map showed me something the realtor didn\'t. That single feature has paid for the app a hundred times over — peace of mind I didn\'t realize I needed."'],
                ['name' => 'Renee Alvarez',  'role' => 'Parent · Denver, CO',
                 'photo' => 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=160&h=160&fit=crop&q=80',
                 'body' => '"My daughter walks home from practice at dusk. The geofence alerts and silent SOS button mean she has a way to reach me, and the right people, the second something feels off."'],
            ];
        @endphp
        <div class="mt-14 stagger grid lg:grid-cols-3 gap-6">
            @foreach ($reviews as $r)
                <figure class="group relative flex flex-col rounded-3xl bg-white p-8 border border-ink-100 hover:-translate-y-1 hover:shadow-xl transition">
                    <svg class="w-10 h-10 text-brand-600/15" viewBox="0 0 24 24" fill="currentColor"><path d="M9 7H5a2 2 0 00-2 2v3a2 2 0 002 2h2v3l4-3v-7H9zm10 0h-4a2 2 0 00-2 2v3a2 2 0 002 2h2v3l4-3v-7h-2z"/></svg>
                    <blockquote class="mt-4 text-navy-800 leading-relaxed flex-1">{{ $r['body'] }}</blockquote>
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
     BLOG / RESOURCES
========================================================================--}}
<section id="blog" class="py-24 lg:py-32">
    <div class="mx-auto max-w-7xl px-5 sm:px-8">
        <div class="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6">
            <div class="max-w-2xl">
                <p class="reveal text-xs font-semibold uppercase tracking-[.2em] text-brand-600">From the blog</p>
                <h2 class="reveal reveal-delay-1 mt-4 font-display text-4xl sm:text-5xl lg:text-6xl tracking-tight text-navy-900">
                    Practical safety, <span class="text-brand-600">written for parents.</span>
                </h2>
            </div>
            <a href="#" class="reveal reveal-delay-2 inline-flex items-center gap-1.5 text-sm font-medium text-navy-900 hover:text-brand-600 transition">
                Read all posts
                <svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M5 12h14m0 0l-6-6m6 6l-6 6"/></svg>
            </a>
        </div>

        @php
            $posts = [
                [
                    'date'  => 'Feb 10, 2026',
                    'tag'   => 'Setup',
                    'title' => 'How to set up custom alerts for your family in 5 minutes',
                    'body'  => 'A simple walkthrough of geofences, contact lists, and quick-tap presets — so the app is doing the work the moment something happens nearby.',
                    'img'   => 'https://images.unsplash.com/photo-1556761175-5973dc0f32e7?w=900&h=600&fit=crop&q=80',
                    'alt'   => 'Parent setting up phone alerts at the kitchen table',
                ],
                [
                    'date'  => 'Jan 28, 2026',
                    'tag'   => 'Guides',
                    'title' => 'Reading a crime map without panic: what the colors actually mean',
                    'body'  => 'Heat-map intensity, incident-type filters, and time-of-day patterns — a parent\'s guide to making sense of the dashboard without the doom-scroll.',
                    'img'   => 'https://images.unsplash.com/photo-1486325212027-8081e485255e?w=900&h=600&fit=crop&q=80',
                    'alt'   => 'City skyline at dusk overlaid with map lines',
                ],
                [
                    'date'  => 'Jan 14, 2026',
                    'tag'   => 'Privacy',
                    'title' => 'Sex offender registries explained: what\'s public, what\'s not, and why it matters',
                    'body'  => 'A plain-English breakdown of how state registries work, what data Auxilio surfaces, and the privacy tradeoffs we make on your behalf.',
                    'img'   => 'https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=900&h=600&fit=crop&q=80',
                    'alt'   => 'Documents and a justice scale on a desk',
                ],
            ];
        @endphp
        <div class="mt-14 stagger grid md:grid-cols-3 gap-6">
            @foreach ($posts as $p)
                <a href="#" class="group block rounded-3xl overflow-hidden border border-ink-100 bg-white hover:-translate-y-1 hover:shadow-xl transition">
                    <div class="aspect-[16/10] relative overflow-hidden bg-ink-100">
                        <img src="{{ $p['img'] }}" alt="{{ $p['alt'] }}" loading="lazy" class="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                        <div class="absolute inset-0 bg-gradient-to-t from-navy-950/40 via-transparent to-transparent"></div>
                        <span class="absolute top-4 left-4 text-[10px] font-semibold uppercase tracking-[.18em] bg-white/95 backdrop-blur text-navy-800 rounded-full px-3 py-1 shadow-sm">{{ $p['tag'] }}</span>
                        <span class="absolute bottom-4 right-4 text-[10px] font-mono text-white/90 bg-black/30 backdrop-blur rounded-full px-2.5 py-1">{{ $p['date'] }}</span>
                    </div>
                    <div class="p-7">
                        <h3 class="text-lg font-semibold text-navy-900 leading-snug group-hover:text-brand-600 transition-colors">{{ $p['title'] }}</h3>
                        <p class="mt-2.5 text-navy-700/80 leading-relaxed text-[15px]">{{ $p['body'] }}</p>
                        <span class="mt-5 inline-flex items-center gap-1.5 text-sm font-medium text-navy-900 group-hover:text-brand-600 transition">
                            Read post
                            <svg class="w-4 h-4 transition-transform group-hover:translate-x-0.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M5 12h14m0 0l-6-6m6 6l-6 6"/></svg>
                        </span>
                    </div>
                </a>
            @endforeach
        </div>
    </div>
</section>

{{-- =======================================================================
     CTA / CONTACT
========================================================================--}}
<section id="contact" class="relative py-24 lg:py-32 overflow-hidden">
    {{-- Lush gradient backdrop --}}
    <div class="absolute inset-0 -z-10 bg-gradient-to-br from-navy-950 via-navy-900 to-brand-900"></div>
    <div class="pointer-events-none absolute inset-0 -z-10 opacity-60">
        <div class="absolute -top-32 -left-32 w-[640px] h-[640px] rounded-full bg-brand-600/40 blur-3xl"></div>
        <div class="absolute -bottom-40 -right-32 w-[680px] h-[680px] rounded-full bg-gold-500/25 blur-3xl"></div>
        <div class="absolute top-1/3 left-1/2 w-[500px] h-[500px] rounded-full bg-brand-500/20 blur-3xl"></div>
    </div>

    <div class="relative mx-auto max-w-7xl px-5 sm:px-8 grid lg:grid-cols-12 gap-12 items-center">
        {{-- LEFT: lush phone showcase --}}
        <div class="lg:col-span-5">
            <p class="reveal text-xs font-semibold uppercase tracking-[.2em] text-gold-300">Get the app</p>
            <h2 class="reveal reveal-delay-1 mt-4 font-display text-4xl sm:text-5xl lg:text-6xl tracking-tight text-white">
                A safer block <br/><span class="text-gold-300">starts on your phone.</span>
            </h2>
            <p class="reveal reveal-delay-2 mt-5 text-lg text-white/80 leading-relaxed">
                Free to download. Available on iOS and Android. Set up in under five minutes — and let Auxilio User do the watching while you live your life.
            </p>

            {{-- Big premium store buttons --}}
            <div class="reveal reveal-delay-3 mt-8 flex flex-col sm:flex-row gap-3">
                <a href="#" class="group flex items-center gap-3 rounded-2xl bg-white text-navy-900 px-6 py-4 shadow-[0_20px_40px_-15px_rgba(0,0,0,.4)] hover:-translate-y-0.5 hover:shadow-[0_30px_60px_-15px_rgba(0,0,0,.5)] transition">
                    <img src="/images/app-store.svg" alt="" class="w-8 h-8" />
                    <div class="text-left">
                        <p class="text-[10px] uppercase tracking-[.18em] text-ink-500">Download on the</p>
                        <p class="text-base font-bold leading-none mt-0.5">App Store</p>
                    </div>
                </a>
                <a href="#" class="group flex items-center gap-3 rounded-2xl bg-white text-navy-900 px-6 py-4 shadow-[0_20px_40px_-15px_rgba(0,0,0,.4)] hover:-translate-y-0.5 hover:shadow-[0_30px_60px_-15px_rgba(0,0,0,.5)] transition">
                    <img src="/images/google-play.svg" alt="" class="w-8 h-8" />
                    <div class="text-left">
                        <p class="text-[10px] uppercase tracking-[.18em] text-ink-500">Get it on</p>
                        <p class="text-base font-bold leading-none mt-0.5">Google Play</p>
                    </div>
                </a>
            </div>

            {{-- Trust row --}}
            <div class="reveal reveal-delay-4 mt-10 flex flex-wrap items-center gap-6 text-sm text-white/70">
                <div class="flex items-center gap-2">
                    <span class="grid place-items-center w-8 h-8 rounded-full bg-white/10">
                        <svg class="w-4 h-4 text-gold-300" viewBox="0 0 24 24" fill="currentColor"><path d="M12 .6l3.7 7.5 8.3 1.2-6 5.8 1.4 8.3L12 19l-7.4 4.4L6 15.1 0 9.3l8.3-1.2L12 .6z"/></svg>
                    </span>
                    <span><span class="font-semibold text-white">4.9</span> · 12K+ ratings</span>
                </div>
                <div class="flex items-center gap-2">
                    <span class="grid place-items-center w-8 h-8 rounded-full bg-white/10">
                        <svg class="w-4 h-4 text-gold-300" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M12 3l8 4v5c0 5-3.5 8.5-8 9-4.5-.5-8-4-8-9V7l8-4z"/></svg>
                    </span>
                    <span><span class="font-semibold text-white">200K+</span> families protected</span>
                </div>
            </div>

            {{-- Reach us cards --}}
            <div class="reveal reveal-delay-5 mt-8 grid sm:grid-cols-3 gap-3">
                <a href="tel:+17045550127" class="rounded-2xl border border-white/10 bg-white/[0.04] backdrop-blur p-4 hover:bg-white/[0.08] transition">
                    <p class="text-[10px] uppercase tracking-[.18em] text-white/50 font-semibold">Sales</p>
                    <p class="mt-1 text-sm font-semibold text-white">(704) 555-0127</p>
                </a>
                <a href="mailto:support@auxilionetwork.com" class="rounded-2xl border border-white/10 bg-white/[0.04] backdrop-blur p-4 hover:bg-white/[0.08] transition">
                    <p class="text-[10px] uppercase tracking-[.18em] text-white/50 font-semibold">Support</p>
                    <p class="mt-1 text-sm font-semibold text-white truncate">support@auxilio…</p>
                </a>
                <div class="rounded-2xl border border-white/10 bg-white/[0.04] backdrop-blur p-4">
                    <p class="text-[10px] uppercase tracking-[.18em] text-white/50 font-semibold">HQ</p>
                    <p class="mt-1 text-sm font-semibold text-white">San Francisco</p>
                </div>
            </div>
        </div>

        {{-- RIGHT: glass form card with gold/red trim --}}
        <div class="lg:col-span-7">
            <form action="/contact" method="POST" class="reveal reveal-right relative rounded-3xl border border-white/10 bg-navy-900 p-8 lg:p-10 shadow-[0_40px_80px_-20px_rgba(0,0,0,.6)]">
                @csrf

                <div class="flex items-center gap-2 text-xs font-semibold uppercase tracking-[.2em] text-gold-300">
                    <span class="grid place-items-center w-7 h-7 rounded-full bg-gold-300/15 ring-1 ring-gold-300/30">
                        <svg class="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><path stroke-linecap="round" stroke-linejoin="round" d="M3 8l9 6 9-6M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/></svg>
                    </span>
                    Send us a message
                </div>
                <h3 class="mt-4 font-display text-2xl sm:text-3xl text-white">We reply within one business day.</h3>
                <p class="mt-2 text-sm text-white/55 leading-relaxed">Tell us where you are and what you're trying to solve — we'll point you to the right thing in the app, or get a human on the line.</p>

                @if (session('contact_status'))
                    <div class="mt-6 flex items-start gap-3 rounded-2xl border border-emerald-300/40 bg-emerald-400/10 p-4 text-sm text-emerald-100">
                        <svg class="w-5 h-5 mt-0.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7"/></svg>
                        {{ session('contact_status') }}
                    </div>
                @endif

                <div class="mt-7 grid sm:grid-cols-2 gap-4">
                    <div>
                        <label for="name" class="text-[11px] font-semibold uppercase tracking-[.16em] text-white/50">Your name</label>
                        <input id="name" name="name" type="text" value="{{ old('name') }}" required
                            class="mt-2 w-full rounded-xl border border-white/10 bg-navy-950 px-4 py-3 text-sm text-white placeholder:text-white/30 focus:border-gold-300 focus:ring-2 focus:ring-gold-300/20 outline-none transition"
                            placeholder="Jordan Avery" />
                        @error('name') <p class="mt-1.5 text-xs text-brand-300">{{ $message }}</p> @enderror
                    </div>
                    <div>
                        <label for="email" class="text-[11px] font-semibold uppercase tracking-[.16em] text-white/50">Email address</label>
                        <input id="email" name="email" type="email" value="{{ old('email') }}" required
                            class="mt-2 w-full rounded-xl border border-white/10 bg-navy-950 px-4 py-3 text-sm text-white placeholder:text-white/30 focus:border-gold-300 focus:ring-2 focus:ring-gold-300/20 outline-none transition"
                            placeholder="you@household.com" />
                        @error('email') <p class="mt-1.5 text-xs text-brand-300">{{ $message }}</p> @enderror
                    </div>
                </div>

                <div class="mt-4">
                    <label for="message" class="text-[11px] font-semibold uppercase tracking-[.16em] text-white/50">How can we help?</label>
                    <textarea id="message" name="message" rows="5" required
                        class="mt-2 w-full rounded-xl border border-white/10 bg-navy-950 px-4 py-3 text-sm text-white placeholder:text-white/30 focus:border-gold-300 focus:ring-2 focus:ring-gold-300/20 outline-none transition resize-none"
                        placeholder="Tell us about your household, neighborhood, or the question on your mind…">{{ old('message') }}</textarea>
                    @error('message') <p class="mt-1.5 text-xs text-brand-300">{{ $message }}</p> @enderror
                </div>

                <div class="mt-7 flex flex-col sm:flex-row sm:items-center gap-4">
                    <button type="submit" class="group inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-full bg-gradient-to-r from-brand-600 to-brand-500 hover:from-brand-500 hover:to-brand-400 text-white font-semibold px-8 py-3.5 shadow-[0_20px_40px_-15px_rgba(228,67,82,.6)] hover:shadow-[0_30px_60px_-15px_rgba(228,67,82,.7)] hover:-translate-y-0.5 transition">
                        Send message
                        <svg class="w-4 h-4 transition-transform group-hover:translate-x-0.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><path stroke-linecap="round" stroke-linejoin="round" d="M5 12h14m0 0l-6-6m6 6l-6 6"/></svg>
                    </button>
                    <p class="text-xs text-white/45 leading-relaxed">By submitting, you agree to our <a href="#" class="underline decoration-white/30 hover:text-white">privacy policy</a>. We never share your details.</p>
                </div>
            </form>
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
            <div class="pointer-events-auto inline-flex flex-wrap gap-2 rounded-2xl bg-white/95 backdrop-blur shadow-lg ring-1 ring-ink-100 p-2">
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
            <div class="pointer-events-auto inline-flex items-center gap-2 rounded-2xl bg-white/95 backdrop-blur shadow-lg ring-1 ring-ink-100 px-3 py-2">
                <span class="inline-flex items-center gap-1.5 text-xs font-bold text-blue-700"><span class="w-2.5 h-2.5 rounded-full bg-blue-500"></span> Registered Sex Offender</span>
                <span class="text-ink-300">·</span>
                <span class="text-xs text-ink-500">State Registry</span>
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
                        <img src="/images/auxilio-user.png" alt="" class="h-10 w-auto" />
                    </span>
                    <span class="text-xl font-bold tracking-tight text-white uppercase">AUXILIO</span>
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
        if (h === 'crime-map' || h === 'sex-offender-map') return h;
        return 'home';
    }
    function showView(view) {
        var views = document.querySelectorAll('[data-view]');
        for (var i = 0; i < views.length; i++) {
            if (views[i].getAttribute('data-view') === view) views[i].classList.remove('hidden');
            else views[i].classList.add('hidden');
        }
        currentView = view;
        if (view === 'crime-map') initCrimeMap();
        if (view === 'sex-offender-map') initSOMap();
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
        html += '<div class="flex items-start gap-4 rounded-2xl border border-ink-100 bg-white p-4 shadow-sm">';
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
