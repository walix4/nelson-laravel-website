@extends('layouts.tool')
@section('title','Container Specs')
@section('desc','Dimensions, capacity and payload for every standard shipping container type, in US units.')

@push('head')
<style>
  .cn-card{background:#fff;border:1px solid rgba(11,35,80,0.08);border-radius:18px;padding:24px;box-shadow:0 20px 48px -32px rgba(11,31,68,0.32);transition:transform .25s,box-shadow .25s;}
  .cn-card:hover{transform:translateY(-4px);box-shadow:0 30px 60px -30px rgba(11,31,68,0.42);}
  .cn-row{display:flex;justify-content:space-between;font-size:13.5px;padding:7px 0;border-bottom:1px dashed rgba(11,35,80,0.1);}
  .cn-row:last-child{border-bottom:none;}
  .cn-row span:first-child{color:var(--muted);}
  .cn-row span:last-child{font-weight:600;color:var(--navy);}
</style>
@endpush

@section('content')
<section class="py-16 md:py-20">
  <div class="max-w-[1150px] mx-auto px-6">
    <div class="text-center max-w-2xl mx-auto reveal">
      <div class="text-[11px] uppercase tracking-[0.22em] font-semibold text-[var(--red)]">Reference</div>
      <h1 class="display text-[38px] md:text-[50px] text-[var(--navy)] leading-[1.05] mt-2">Container Specs</h1>
      <p class="mt-4 text-[var(--muted)] text-[15px]">Interior dimensions, capacity and max payload for the boxes you move every day.</p>
      <div class="inline-flex mt-6 rounded-xl border border-[var(--navy)]/12 overflow-hidden text-[13px] font-semibold">
        <button id="cnUS" class="px-5 py-2 bg-[var(--navy)] text-white">US (ft / lb)</button>
        <button id="cnSI" class="px-5 py-2 text-[var(--navy)]">Metric (m / kg)</button>
      </div>
    </div>
    <div id="cnGrid" class="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 mt-9"></div>
  </div>
</section>
@endsection

@push('scripts')
<script>
  // values: interior L,W,H (ft), capacity (cu ft), tare (lb), payload (lb)
  const CN=[
    {n:"20' Standard",ic:'dry',L:19.4,W:7.7,H:7.9,cap:1170,tare:5070,pay:47900},
    {n:"40' Standard",ic:'dry',L:39.5,W:7.7,H:7.9,cap:2390,tare:8160,pay:59040},
    {n:"40' High-Cube",ic:'dry',L:39.5,W:7.7,H:8.9,cap:2700,tare:8750,pay:58450},
    {n:"45' High-Cube",ic:'dry',L:44.5,W:7.7,H:8.9,cap:3040,tare:10580,pay:56660},
    {n:"20' Reefer",ic:'reefer',L:17.8,W:7.5,H:7.5,cap:1000,tare:6610,pay:46340},
    {n:"40' Reefer HC",ic:'reefer',L:37.9,W:7.5,H:8.2,cap:2130,tare:10780,pay:56440},
    {n:"20' Open Top",ic:'open',L:19.3,W:7.7,H:7.8,cap:1135,tare:5510,pay:47460},
    {n:"40' Flat Rack",ic:'flat',L:39.6,W:6.8,H:6.5,cap:0,tare:11630,pay:85800},
  ];
  const CN_IC={dry:'<rect x="3" y="7" width="18" height="11" rx="1"/><path d="M3 11h18M8 7v11M13 7v11"/>',reefer:'<rect x="3" y="7" width="18" height="11" rx="1"/><path d="M7 11.5h0M7 14h2M9 10v5"/>',open:'<path d="M3 9v9h18V9"/><path d="M3 9l2-3h14l2 3M3 13h18"/>',flat:'<path d="M2 16h20M5 16v-3h14v3"/><circle cx="7" cy="18" r="1.4"/><circle cx="17" cy="18" r="1.4"/>'};
  let cnUnit='US';
  function f1(v){return Math.round(v*10)/10;}
  function cnRender(){
    const grid=document.getElementById('cnGrid');
    grid.innerHTML=CN.map(c=>{
      let dims,cap,tare,pay;
      if(cnUnit==='US'){dims=f1(c.L)+' × '+f1(c.W)+' × '+f1(c.H)+' ft';cap=c.cap?c.cap.toLocaleString()+' cu ft':'—';tare=c.tare.toLocaleString()+' lb';pay=c.pay.toLocaleString()+' lb';}
      else{dims=f1(c.L*0.3048)+' × '+f1(c.W*0.3048)+' × '+f1(c.H*0.3048)+' m';cap=c.cap?f1(c.cap*0.0283168).toLocaleString()+' m³':'—';tare=Math.round(c.tare*0.453592).toLocaleString()+' kg';pay=Math.round(c.pay*0.453592).toLocaleString()+' kg';}
      return '<div class="cn-card"><div class="flex items-center gap-3 mb-4"><span class="inline-flex items-center justify-center w-11 h-11 rounded-xl text-white" style="background:linear-gradient(160deg,#0EA5E9,#1E3A8A)"><svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">'+CN_IC[c.ic]+'</svg></span><div class="display text-[18px] text-[var(--navy)]">'+c.n+'</div></div>'+
        '<div class="cn-row"><span>Interior</span><span>'+dims+'</span></div>'+
        '<div class="cn-row"><span>Capacity</span><span>'+cap+'</span></div>'+
        '<div class="cn-row"><span>Tare weight</span><span>'+tare+'</span></div>'+
        '<div class="cn-row"><span>Max payload</span><span>'+pay+'</span></div></div>';
    }).join('');
  }
  document.getElementById('cnUS').addEventListener('click',function(){cnUnit='US';this.classList.add('bg-[var(--navy)]','text-white');document.getElementById('cnSI').classList.remove('bg-[var(--navy)]','text-white');cnRender();});
  document.getElementById('cnSI').addEventListener('click',function(){cnUnit='SI';this.classList.add('bg-[var(--navy)]','text-white');document.getElementById('cnUS').classList.remove('bg-[var(--navy)]','text-white');cnRender();});
  cnRender();
</script>
@endpush
