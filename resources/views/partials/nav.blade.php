@php
  $onHome = $onHome ?? false;
  $h = $onHome ? '' : '__B__/dryge/';            // base for home-page anchors
  $logo = $onHome ? './' : '__B__/dryge/';
  $tools = [
    ['n'=>'Rate Calculator','d'=>'Instant drayage pricing across every port &amp; lane','href'=>$h.'#quote','g'=>'linear-gradient(160deg,#FF6B62,#E0241A)','i'=>'<path d="M3 3h18v18H3z" opacity="0"/><rect x="4" y="3" width="16" height="18" rx="2"/><path d="M8 7h8M8 11h8M8 15h4"/>'],
    ['n'=>'Container Tracking','d'=>'Track your box by sea, rail &amp; road in real time','href'=>'__B__/tools/tracking/','g'=>'linear-gradient(160deg,#4C6FE0,#3A5FC0)','i'=>'<path d="M21 16V8a2 2 0 0 0-1-1.7l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.7l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/><path d="M3.3 7L12 12l8.7-5M12 22V12"/>'],
    ['n'=>'Port Explorer','d'=>'Browse 1,200+ sea, river &amp; dry ports','href'=>$h.'#network','g'=>'linear-gradient(160deg,#1E3A8A,#0B2350)','i'=>'<path d="M12 22s-8-6-8-12a8 8 0 0 1 16 0c0 6-8 12-8 12z"/><circle cx="12" cy="10" r="3"/>'],
    ['n'=>'Distance &amp; Time','d'=>'Map distance &amp; ETA for any drayage lane','href'=>'__B__/tools/distance/','g'=>'linear-gradient(160deg,#22D3EE,#3A5FC0)','i'=>'<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/>'],
    ['n'=>'Unit Converter','d'=>'Convert weight, volume, distance &amp; more','href'=>'__B__/tools/converter/','g'=>'linear-gradient(160deg,#7C3AED,#6B5BFF)','i'=>'<path d="M7 16V4M7 4L3 8M7 4l4 4M17 8v12M17 20l4-4M17 20l-4-4"/>'],
    ['n'=>'Demurrage Calculator','d'=>'Estimate per-diem &amp; detention exposure','href'=>'__B__/tools/demurrage/','g'=>'linear-gradient(160deg,#FB923C,#E0241A)','i'=>'<circle cx="12" cy="12" r="9"/><path d="M12 8v4l2 2"/><path d="M12 2v2M12 20v2"/>'],
    ['n'=>'CO&#8322; Emissions','d'=>'Estimate emissions for any drayage move','href'=>'__B__/tools/co2/','g'=>'linear-gradient(160deg,#34D399,#059669)','i'=>'<path d="M11 20A7 7 0 0 1 9.8 6.1C16 5 17 4.5 19 2c1 2 2 4.5 2 8a7 7 0 0 1-7 7H11z"/><path d="M2 21c0-3 1.85-5.36 5.5-6"/>'],
    ['n'=>'All Estimates','d'=>'Live stream of every quote on the network','href'=>'__B__/estimates/','g'=>'linear-gradient(160deg,#0EA5E9,#1E3A8A)','i'=>'<path d="M3 3v18h18"/><path d="M7 14l3-3 3 2 4-5"/>'],
  ];
@endphp
<header class="sticky top-0 z-40 border-b" style="background:#0B2350;border-color:rgba(255,255,255,0.18);box-shadow:0 6px 24px -10px rgba(11,35,80,0.45);">
  <div class="max-w-[1400px] mx-auto px-6 h-16 flex items-center justify-between">
    <a href="{{ $logo }}" class="flex items-center gap-2.5">
      <img src="{{ $onHome ? '' : '__B__/dryge/' }}logo-mark.png" alt="" class="h-9 md:h-10 w-auto" />
      <span class="display text-white text-[22px] md:text-[24px] tracking-tight leading-none">Drayage <span style="color:var(--red);">Rate</span></span>
    </a>
    <nav class="hidden md:flex items-center gap-6 text-[13px] font-medium text-white/85">
      <div class="mega-wrap">
        <button class="hover:text-white inline-flex items-center gap-1.5" onclick="this.closest('.mega-wrap').classList.toggle('open')">Tools
          <svg class="mega-caret" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"><path d="M6 9l6 6 6-6"/></svg>
        </button>
        <div class="mega-panel">
          <div class="grid grid-cols-2 lg:grid-cols-3 gap-x-5 gap-y-1">
            @foreach($tools as $t)
            <a href="{{ $t['href'] }}" class="mega-tool">
              <span class="mega-ic" style="background:{{ $t['g'] }}"><svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">{!! $t['i'] !!}</svg></span>
              <span><h4>{!! $t['n'] !!}</h4><p>{!! $t['d'] !!}</p></span>
            </a>
            @endforeach
          </div>
          <div class="border-t border-[var(--navy)]/10 mt-3 pt-4 flex flex-wrap gap-3">
            <a href="{{ $h }}#quote" class="text-[13px] font-semibold text-[var(--blue)] bg-[var(--blue)]/8 hover:bg-[var(--blue)]/14 px-5 py-2.5 rounded-lg transition">Request a quote</a>
            <a href="__B__/tools/" class="text-[13px] font-semibold text-[var(--navy)] bg-[var(--navy)]/6 hover:bg-[var(--navy)]/10 px-5 py-2.5 rounded-lg transition">All tools</a>
          </div>
        </div>
      </div>
      <a href="{{ $h }}#network" class="hover:text-white">Network</a>
      <a href="{{ $h }}#how" class="hover:text-white">How it works</a>
      <a href="{{ $h }}#features" class="hover:text-white">Platform</a>
      <a href="{{ $h }}#pricing" class="hover:text-white">Pricing</a>
      <a href="__B__/estimates/" class="nav-blink">Estimates</a>
    </nav>
    <div class="flex items-center gap-2.5">
      <a href="{{ $h }}#login" class="hidden sm:inline text-[13px] font-semibold text-white/90 hover:text-white px-3 py-1.5">Sign in</a>
      <a href="{{ $h }}#quote" class="btn-primary text-[13px] px-4 py-2 rounded-lg inline-flex items-center gap-1.5">
        <span class="label">Get instant quote</span>
      </a>
    </div>
  </div>
</header>
