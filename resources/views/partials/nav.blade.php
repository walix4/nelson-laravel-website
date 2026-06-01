@php
  $onHome = $onHome ?? false;
  $h = $onHome ? '' : '__B__/dryge/';            // base for home-page anchors
  $logo = $onHome ? './' : '__B__/dryge/';
  $tools = config('tools.list');
@endphp
<header class="sticky top-0 z-40 border-b" style="background:#0B2350;border-color:rgba(255,255,255,0.18);box-shadow:0 6px 24px -10px rgba(11,35,80,0.45);">
  <div class="max-w-[1400px] mx-auto px-6 h-16 flex items-center justify-between">
    <a href="{{ $logo }}" class="flex items-center gap-2.5">
      <img src="{{ $onHome ? '' : '__B__/dryge/' }}logo-mark.png" alt="" class="h-9 md:h-10 w-auto" />
      <span class="display text-white text-[22px] md:text-[24px] tracking-tight leading-none">Dray <span style="color:var(--red);">Rate</span></span>
    </a>
    <nav class="hidden md:flex items-center gap-6 text-[13px] font-medium text-white/85">
      <div class="mega-wrap">
        <button class="hover:text-white inline-flex items-center gap-1.5" onclick="this.closest('.mega-wrap').classList.toggle('open')">Tools
          <svg class="mega-caret" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"><path d="M6 9l6 6 6-6"/></svg>
        </button>
        <div class="mega-panel">
          <div class="grid grid-cols-2 lg:grid-cols-3 gap-x-5 gap-y-1">
            @foreach($tools as $t)
            <a href="{{ \Illuminate\Support\Str::startsWith($t['href'], '#') ? $h.$t['href'] : $t['href'] }}" class="mega-tool">
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
