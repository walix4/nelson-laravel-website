@extends('layouts.tool')
@section('title','All Tools')
@section('desc','Free drayage logistics tools — rate calculator, container tracking, distance & time, unit converter, demurrage and CO₂ calculators.')

@php
  $tools = [
    ['n'=>'Rate Calculator','d'=>'Instant drayage pricing across every U.S. port & inland lane.','href'=>'__B__/dryge/#quote','g'=>'linear-gradient(160deg,#FF6B62,#E0241A)','i'=>'<rect x="4" y="3" width="16" height="18" rx="2"/><path d="M8 7h8M8 11h8M8 15h4"/>'],
    ['n'=>'Container Tracking','d'=>'Track your box by sea, rail & road in real time.','href'=>'__B__/tools/tracking/','g'=>'linear-gradient(160deg,#4C6FE0,#3A5FC0)','i'=>'<path d="M21 16V8a2 2 0 0 0-1-1.7l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.7l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/><path d="M3.3 7L12 12l8.7-5M12 22V12"/>'],
    ['n'=>'Distance & Time','d'=>'Map distance & ETA for any U.S. drayage lane.','href'=>'__B__/tools/distance/','g'=>'linear-gradient(160deg,#22D3EE,#3A5FC0)','i'=>'<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/>'],
    ['n'=>'Unit Converter','d'=>'Convert weight, volume, distance, speed & more.','href'=>'__B__/tools/converter/','g'=>'linear-gradient(160deg,#7C3AED,#6B5BFF)','i'=>'<path d="M7 16V4M7 4L3 8M7 4l4 4M17 8v12M17 20l4-4M17 20l-4-4"/>'],
    ['n'=>'Demurrage Calculator','d'=>'Estimate per-diem & detention exposure before it bites.','href'=>'__B__/tools/demurrage/','g'=>'linear-gradient(160deg,#FB923C,#E0241A)','i'=>'<circle cx="12" cy="12" r="9"/><path d="M12 8v4l2 2"/>'],
    ['n'=>'CO₂ Emissions','d'=>'Estimate emissions for any drayage move.','href'=>'__B__/tools/co2/','g'=>'linear-gradient(160deg,#34D399,#059669)','i'=>'<path d="M11 20A7 7 0 0 1 9.8 6.1C16 5 17 4.5 19 2c1 2 2 4.5 2 8a7 7 0 0 1-7 7H11z"/><path d="M2 21c0-3 1.85-5.36 5.5-6"/>'],
    ['n'=>'All Estimates','d'=>'Live stream of every quote on the network.','href'=>'__B__/estimates/','g'=>'linear-gradient(160deg,#0EA5E9,#1E3A8A)','i'=>'<path d="M3 3v18h18"/><path d="M7 14l3-3 3 2 4-5"/>'],
    ['n'=>'Port Explorer','d'=>'Browse every major U.S. container port & ramp.','href'=>'__B__/dryge/#network','g'=>'linear-gradient(160deg,#1E3A8A,#0B2350)','i'=>'<path d="M12 22s-8-6-8-12a8 8 0 0 1 16 0c0 6-8 12-8 12z"/><circle cx="12" cy="10" r="3"/>'],
  ];
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
      <a href="{{ $t['href'] }}" class="reveal reveal-d{{ $i % 3 }} group bg-white rounded-2xl p-7 border border-[var(--navy)]/8 hover:-translate-y-1.5 transition" style="box-shadow:0 24px 60px -34px rgba(11,31,68,0.35);">
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
