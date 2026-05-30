@extends('layouts.tool')
@section('title','All Tools')
@section('desc','Free drayage logistics tools — rate calculator, container tracking, distance & time, unit converter, demurrage and CO₂ calculators.')

@php
  $tools = config('tools.list');
@endphp

@section('content')
<section class="relative overflow-hidden py-20" style="background:linear-gradient(135deg,#0B2350,#06143A 60%,#1E3C82);">
  <div class="absolute inset-0 opacity-50 pointer-events-none" style="background:radial-gradient(700px 360px at 85% 0%,rgba(255,59,48,0.22),transparent 60%),radial-gradient(600px 360px at 10% 100%,rgba(58,95,192,0.3),transparent 60%);"></div>
  <div class="max-w-[1100px] mx-auto px-6 relative text-center">
    <div class="text-[11px] uppercase tracking-[0.22em] font-semibold text-white/70">Free logistics tools</div>
    <h1 class="display text-white text-[40px] md:text-[58px] leading-[1.03] mt-3">Everything you need to<br>move a container</h1>
    <p class="text-white/75 text-[16px] mt-5 max-w-xl mx-auto">A full toolkit for drayage — price moves, track boxes, calculate transit time, demurrage and emissions, all in one place.</p>
  </div>
</section>

<section class="py-16 -mt-10">
  <div class="max-w-[1200px] mx-auto px-6">
    <div class="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
      @foreach($tools as $i => $t)
      <a href="{{ \Illuminate\Support\Str::startsWith($t['href'], '#') ? '__B__/dryge/'.$t['href'] : $t['href'] }}" class="reveal reveal-d{{ $i % 3 }} group bg-white rounded-2xl p-7 border border-[var(--navy)]/8 hover:-translate-y-1.5 transition" style="box-shadow:0 24px 60px -34px rgba(11,31,68,0.35);">
        <span class="inline-flex items-center justify-center w-14 h-14 rounded-2xl text-white" style="background:{{ $t['g'] }};box-shadow:0 12px 26px -10px rgba(11,31,68,0.5);"><svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">{!! $t['i'] !!}</svg></span>
        <h3 class="display text-[20px] text-[var(--navy)] mt-5">{!! $t['n'] !!}</h3>
        <p class="text-[14px] text-[var(--muted)] mt-2 leading-relaxed">{{ $t['d'] }}</p>
        <span class="inline-flex items-center gap-1.5 mt-4 text-[13.5px] font-semibold text-[var(--red)]">Open tool <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round" class="group-hover:translate-x-1 transition"><path d="M5 12h14M13 6l6 6-6 6"/></svg></span>
      </a>
      @endforeach
    </div>
  </div>
</section>
@endsection
