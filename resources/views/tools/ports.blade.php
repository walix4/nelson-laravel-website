@extends('layouts.tool')
@section('title','See All Ports')
@section('desc','Searchable directory of every major U.S. sea, rail and inland port served on the DrayageRate network.')

@push('head')
<style>
  .pt-card{background:#fff;border:1px solid rgba(11,35,80,0.08);border-radius:16px;padding:18px 20px;box-shadow:0 18px 44px -30px rgba(11,31,68,0.3);transition:transform .25s,box-shadow .25s;}
  .pt-card:hover{transform:translateY(-3px);box-shadow:0 26px 54px -28px rgba(11,31,68,0.4);}
  .pt-flag{width:34px;height:34px;border-radius:9px;display:flex;align-items:center;justify-content:center;color:#fff;flex-shrink:0;}
  .pt-tag{font-size:10.5px;font-weight:700;letter-spacing:0.04em;padding:3px 9px;border-radius:999px;text-transform:uppercase;}
  .pt-chip{font-size:13px;font-weight:600;color:var(--muted);border:1px solid rgba(11,35,80,0.14);background:#fff;padding:8px 16px;border-radius:999px;cursor:pointer;transition:all .15s;}
  .pt-chip.on{background:var(--navy);color:#fff;border-color:var(--navy);}
</style>
@endpush

@section('content')
<section class="py-14 md:py-16">
  <div class="max-w-[1200px] mx-auto px-6">
    <div class="text-center max-w-2xl mx-auto reveal">
      <div class="text-[11px] uppercase tracking-[0.22em] font-semibold text-[var(--red)]">Port directory</div>
      <h1 class="display text-[38px] md:text-[52px] text-[var(--navy)] leading-[1.04] mt-2">See all U.S. ports</h1>
      <p class="mt-4 text-[var(--muted)] text-[15px]">Every sea, rail and inland port we price drayage to. Search by name or state, or filter by coast and type.</p>
    </div>

    <div class="mt-9 reveal reveal-d1">
      <div class="relative max-w-xl mx-auto">
        <svg class="absolute left-4 top-1/2 -translate-y-1/2" style="color:rgba(11,35,80,0.4)" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="7"/><path d="M21 21l-4.3-4.3"/></svg>
        <input id="ptSearch" class="tool-input" style="padding-left:2.8rem" placeholder="Search ports, cities or states…" />
      </div>
      <div class="flex flex-wrap justify-center gap-2.5 mt-5">
        <button class="pt-chip on" data-f="all">All</button>
        <button class="pt-chip" data-f="West">West Coast</button>
        <button class="pt-chip" data-f="East">East Coast</button>
        <button class="pt-chip" data-f="Gulf">Gulf</button>
        <button class="pt-chip" data-f="Rail">Rail ramps</button>
        <button class="pt-chip" data-f="Inland">Inland</button>
      </div>
      <div class="text-center text-[13px] text-[var(--muted)] mt-4"><b id="ptCount" class="text-[var(--navy)]">0</b> ports</div>
    </div>

    <div id="ptGrid" class="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-6"></div>
    <div id="ptEmpty" class="text-center text-[var(--muted)] py-16" style="display:none">No ports match your search.</div>
  </div>
</section>
@endsection

@push('scripts')
<script>
  const PT=[
    {n:'Port of Los Angeles',c:'San Pedro, CA',r:'West',t:'Sea',v:'9.2M TEU'},
    {n:'Port of Long Beach',c:'Long Beach, CA',r:'West',t:'Sea',v:'9.1M TEU'},
    {n:'Port of Oakland',c:'Oakland, CA',r:'West',t:'Sea',v:'2.3M TEU'},
    {n:'Northwest Seaport (Seattle)',c:'Seattle, WA',r:'West',t:'Sea',v:'3.4M TEU'},
    {n:'Port of Tacoma',c:'Tacoma, WA',r:'West',t:'Sea',v:'2.1M TEU'},
    {n:'Port of Portland',c:'Portland, OR',r:'West',t:'Sea',v:'0.3M TEU'},
    {n:'Port of New York & NJ',c:'Elizabeth, NJ',r:'East',t:'Sea',v:'9.5M TEU'},
    {n:'Port of Savannah',c:'Savannah, GA',r:'East',t:'Sea',v:'5.9M TEU'},
    {n:'Port of Virginia',c:'Norfolk, VA',r:'East',t:'Sea',v:'3.7M TEU'},
    {n:'Port of Charleston',c:'Charleston, SC',r:'East',t:'Sea',v:'2.8M TEU'},
    {n:'Port of Baltimore',c:'Baltimore, MD',r:'East',t:'Sea',v:'1.1M TEU'},
    {n:'PortMiami',c:'Miami, FL',r:'East',t:'Sea',v:'1.2M TEU'},
    {n:'Port Everglades',c:'Fort Lauderdale, FL',r:'East',t:'Sea',v:'1.0M TEU'},
    {n:'Port of Jacksonville',c:'Jacksonville, FL',r:'East',t:'Sea',v:'1.4M TEU'},
    {n:'Port of Houston',c:'La Porte, TX',r:'Gulf',t:'Sea',v:'4.0M TEU'},
    {n:'Port of New Orleans',c:'New Orleans, LA',r:'Gulf',t:'Sea',v:'0.6M TEU'},
    {n:'Port of Mobile',c:'Mobile, AL',r:'Gulf',t:'Sea',v:'0.6M TEU'},
    {n:'BNSF Logistics Park',c:'Chicago, IL',r:'Rail',t:'Rail',v:'Class I ramp'},
    {n:'UP Global IV',c:'Joliet, IL',r:'Rail',t:'Rail',v:'Class I ramp'},
    {n:'CSX Fairburn',c:'Atlanta, GA',r:'Rail',t:'Rail',v:'Class I ramp'},
    {n:'BNSF Alliance',c:'Fort Worth, TX',r:'Rail',t:'Rail',v:'Class I ramp'},
    {n:'Inland Empire Hub',c:'Ontario, CA',r:'Inland',t:'Inland',v:'Distribution'},
    {n:'Memphis Intermodal',c:'Memphis, TN',r:'Inland',t:'Inland',v:'Distribution'},
    {n:'Columbus Rickenbacker',c:'Columbus, OH',r:'Inland',t:'Inland',v:'Distribution'},
    {n:'Kansas City SmartPort',c:'Kansas City, MO',r:'Inland',t:'Inland',v:'Distribution'},
    {n:'Denver Inland Port',c:'Denver, CO',r:'Inland',t:'Inland',v:'Distribution'}
  ];
  const PT_COLOR={West:'linear-gradient(160deg,#22D3EE,#3A5FC0)',East:'linear-gradient(160deg,#4C6FE0,#1E3A8A)',Gulf:'linear-gradient(160deg,#FB923C,#E0241A)',Rail:'linear-gradient(160deg,#8B5CF6,#6D28D9)',Inland:'linear-gradient(160deg,#34D399,#059669)'};
  const PT_TAG={Sea:'background:rgba(58,95,192,0.13);color:#3A5FC0',Rail:'background:rgba(139,92,246,0.14);color:#6D28D9',Inland:'background:rgba(22,181,113,0.14);color:#15935F'};
  const ptGrid=document.getElementById('ptGrid'),ptSearch=document.getElementById('ptSearch');
  let ptFilter='all';
  function ptRender(){
    const q=(ptSearch.value||'').toLowerCase().trim();
    const list=PT.filter(p=>{
      const okF = ptFilter==='all' || p.r===ptFilter || p.t===ptFilter;
      const hay=(p.n+' '+p.c).toLowerCase();
      return okF && (!q||hay.includes(q));
    });
    ptGrid.innerHTML=list.map(p=>'<div class="pt-card flex items-center gap-3.5">'+
      '<span class="pt-flag" style="background:'+(PT_COLOR[p.r]||PT_COLOR.Inland)+'"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 22s-7-5.6-7-11a7 7 0 0 1 14 0c0 5.4-7 11-7 11z"/><circle cx="12" cy="11" r="2.4"/></svg></span>'+
      '<div class="min-w-0 flex-1"><div class="font-semibold text-[var(--navy)] text-[15px] truncate">'+p.n+'</div><div class="text-[12.5px] text-[var(--muted)]">'+p.c+' · '+p.v+'</div></div>'+
      '<span class="pt-tag" style="'+(PT_TAG[p.t]||'')+'">'+p.t+'</span></div>').join('');
    document.getElementById('ptCount').textContent=list.length;
    document.getElementById('ptEmpty').style.display=list.length?'none':'block';
  }
  document.querySelectorAll('.pt-chip').forEach(c=>c.addEventListener('click',()=>{document.querySelectorAll('.pt-chip').forEach(x=>x.classList.remove('on'));c.classList.add('on');ptFilter=c.dataset.f;ptRender();}));
  ptSearch.addEventListener('input',ptRender); ptRender();
</script>
@endpush
