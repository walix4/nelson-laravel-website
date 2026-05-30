@extends('layouts.tool')
@section('title','Container Tracking')
@section('desc','Track your container by sea, rail and road with real-time milestone updates.')

@push('head')
<style>
  .trk-step{display:flex;gap:16px;}
  .trk-dot{position:relative;flex-shrink:0;width:34px;display:flex;justify-content:center;}
  .trk-dot::before{content:"";position:absolute;top:30px;bottom:-18px;width:2px;background:rgba(11,35,80,0.12);}
  .trk-step:last-child .trk-dot::before{display:none;}
  .trk-ic{width:34px;height:34px;border-radius:50%;display:flex;align-items:center;justify-content:center;background:#fff;border:2px solid rgba(11,35,80,0.15);color:var(--muted);z-index:1;}
  .trk-step.done .trk-ic{background:#16C784;border-color:#16C784;color:#fff;}
  .trk-step.active .trk-ic{background:var(--red);border-color:var(--red);color:#fff;box-shadow:0 0 0 5px rgba(255,59,48,0.18);}
  .trk-step.done .trk-dot::before{background:#16C784;}
</style>
@endpush

@section('content')
<section class="py-16 md:py-20">
  <div class="max-w-[820px] mx-auto px-6">
    <div class="text-center max-w-2xl mx-auto reveal">
      <div class="text-[11px] uppercase tracking-[0.22em] font-semibold text-[var(--red)]">Drayage tool</div>
      <h1 class="display text-[38px] md:text-[50px] text-[var(--navy)] leading-[1.05] mt-2">Container Tracking</h1>
      <p class="mt-4 text-[var(--muted)] text-[15px]">Enter a container or booking number to see live milestones from vessel to door.</p>
    </div>

    <form id="trkForm" class="mt-10 flex flex-col sm:flex-row gap-3 reveal reveal-d1">
      <input id="trkNum" class="tool-input flex-1" placeholder="e.g. MSCU 482910-7 or BKG-2026-0481" value="MSCU 482910-7" />
      <button class="btn-primary px-7 py-3.5 rounded-xl text-[15px] whitespace-nowrap" type="submit">Track container</button>
    </form>

    <div id="trkResult" class="mt-8 reveal reveal-d2" style="display:none">
      <div class="bg-white rounded-[22px] p-7 md:p-9" style="box-shadow:0 40px 90px -40px rgba(11,31,68,0.3);border:1px solid rgba(11,35,80,0.06);">
        <div class="flex flex-wrap items-center justify-between gap-3 pb-6 mb-7 border-b border-[var(--navy)]/8">
          <div><div class="display text-[22px] text-[var(--navy)]" id="trkId">—</div><div class="text-[13px] text-[var(--muted)] mt-0.5">40ft High-Cube · MSC · Port of LA → Dallas, TX</div></div>
          <span class="inline-flex items-center gap-2 text-[13px] font-bold text-white px-4 py-2 rounded-full" style="background:#16C784"><span class="w-2 h-2 rounded-full bg-white"></span>In transit</span>
        </div>
        <div id="trkSteps" class="space-y-[18px]"></div>
      </div>
    </div>
  </div>
</section>
@endsection

@push('scripts')
<script>
  const TRK=[
    {t:'Booking confirmed',s:'Los Angeles, CA · 6 days ago',ic:'<path d="M20 6L9 17l-5-5"/>',st:'done'},
    {t:'Loaded on vessel',s:'MSC Bellissima · 5 days ago',ic:'<path d="M3 18h18M5 18l-2-6h18l-2 6M12 12V5"/>',st:'done'},
    {t:'Discharged at port',s:'Port of Los Angeles · 2 days ago',ic:'<path d="M21 16V8a2 2 0 0 0-1-1.7l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8"/>',st:'done'},
    {t:'On the road (drayage)',s:'I-10 E near Phoenix, AZ · now',ic:'<path d="M3 13h11v5H3zM14 9h4l3 4v5h-7z"/><circle cx="7" cy="18" r="1.6"/><circle cx="17.5" cy="18" r="1.6"/>',st:'active'},
    {t:'Out for delivery',s:'Dallas, TX · est. in 14h',ic:'<path d="M5 12h14M13 6l6 6-6 6"/>',st:''},
    {t:'Delivered',s:'Consignee warehouse · est. tomorrow',ic:'<path d="M3 7l9-4 9 4-9 4-9-4zM3 7v10l9 4 9-4V7"/>',st:''}
  ];
  function trkRender(){
    document.getElementById('trkSteps').innerHTML=TRK.map(x=>
      '<div class="trk-step '+x.st+'"><div class="trk-dot"><div class="trk-ic"><svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">'+x.ic+'</svg></div></div>'+
      '<div class="pb-1"><div class="text-[15px] font-semibold text-[var(--navy)]">'+x.t+'</div><div class="text-[13px] text-[var(--muted)] mt-0.5">'+x.s+'</div></div></div>').join('');
  }
  document.getElementById('trkForm').addEventListener('submit',e=>{
    e.preventDefault();
    document.getElementById('trkId').textContent=(document.getElementById('trkNum').value||'MSCU 482910-7').toUpperCase();
    const r=document.getElementById('trkResult'); r.style.display='block'; r.classList.add('in'); trkRender();
  });
  // show default on load
  document.getElementById('trkId').textContent='MSCU 482910-7';
  document.getElementById('trkResult').style.display='block'; trkRender();
</script>
@endpush
