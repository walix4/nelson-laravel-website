@extends('layouts.tool')
@section('title','Accessorial Guide')
@section('desc','Plain-English guide to every U.S. drayage accessorial charge, with typical price ranges.')

@push('head')
<style>
  .ac-card{background:#fff;border:1px solid rgba(11,35,80,0.08);border-radius:16px;padding:20px 22px;box-shadow:0 16px 40px -30px rgba(11,31,68,0.3);}
  .ac-card h3{font-size:15.5px;font-weight:700;color:var(--navy);}
  .ac-card p{font-size:13.5px;color:var(--muted);line-height:1.55;margin-top:5px;}
  .ac-price{font-size:12.5px;font-weight:700;color:#15935F;background:rgba(22,181,113,0.12);padding:4px 11px;border-radius:999px;white-space:nowrap;}
</style>
@endpush

@section('content')
<section class="py-16 md:py-20">
  <div class="max-w-[1000px] mx-auto px-6">
    <div class="text-center max-w-2xl mx-auto reveal">
      <div class="text-[11px] uppercase tracking-[0.22em] font-semibold text-[var(--red)]">Reference</div>
      <h1 class="display text-[38px] md:text-[50px] text-[var(--navy)] leading-[1.05] mt-2">Accessorial Guide</h1>
      <p class="mt-4 text-[var(--muted)] text-[15px]">Every drayage line-item, in plain English — what it is, when it hits, and a typical U.S. range.</p>
    </div>
    <div class="relative max-w-xl mx-auto mt-8 reveal reveal-d1">
      <svg class="absolute left-4 top-1/2 -translate-y-1/2" style="color:rgba(11,35,80,0.4)" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="7"/><path d="M21 21l-4.3-4.3"/></svg>
      <input id="acSearch" class="tool-input" style="padding-left:2.8rem" placeholder="Search accessorials…" />
    </div>
    <div id="acGrid" class="grid sm:grid-cols-2 gap-4 mt-6"></div>
    <div id="acEmpty" class="text-center text-[var(--muted)] py-12" style="display:none">No accessorials match your search.</div>
  </div>
</section>
@endsection

@push('scripts')
<script>
  const AC=[
    {n:'Chassis rental',d:'Daily charge for the wheeled frame the container rides on, when not using your own.',p:'$25–45 / day'},
    {n:'Chassis split',d:'Fee when the chassis and container are stored at different locations and must be combined.',p:'$75–150'},
    {n:'Pre-pull',d:'Pulling a container from the terminal early to beat last free day, then storing it short-term.',p:'$125–250'},
    {n:'Drop & hook',d:'Dropping the loaded container at the consignee and picking up an empty later, instead of waiting.',p:'$50–100'},
    {n:'Detention',d:'Charge when your driver waits beyond free time (usually 1–2 hrs) at pickup or delivery.',p:'$60–90 / hr'},
    {n:'Demurrage',d:'Terminal charge for a container sitting past its free days at the port.',p:'$150–300 / day'},
    {n:'Per diem',d:'Carrier charge for keeping the container/equipment past the allowed free days.',p:'$100–185 / day'},
    {n:'Congestion / pier pass',d:'Port traffic-mitigation fee (e.g. PierPass at LA/LB) on peak-hour moves.',p:'$35–80'},
    {n:'Tolls',d:'Highway, bridge and turnpike tolls along the drayage route, passed through at cost.',p:'At cost'},
    {n:'Hazmat',d:'Surcharge for moving hazardous materials requiring certified drivers and placarding.',p:'$75–200'},
    {n:'Overweight',d:'Surcharge for loads over legal axle/gross weight needing permits or special equipment.',p:'$100–350'},
    {n:'Reefer plug / genset',d:'Powering a refrigerated container in transit or at yard via genset or plug-in.',p:'$60–150 / day'},
    {n:'Scale / weigh',d:'Stopping at a certified scale to verify gross weight (often required for export).',p:'$25–60'},
    {n:'Yard storage',d:'Holding a container in the carrier yard between pickup and delivery.',p:'$30–55 / day'},
    {n:'Bobtail / dry run',d:'Driver dispatched but unable to complete the move (container not ready, etc.).',p:'$95–175'},
    {n:'Stop-off',d:'Additional intermediate stop for partial unload or cross-dock on the route.',p:'$50–120 / stop'}
  ];
  const acGrid=document.getElementById('acGrid'),acSearch=document.getElementById('acSearch');
  function acRender(){
    const q=(acSearch.value||'').toLowerCase().trim();
    const list=AC.filter(a=>!q||(a.n+' '+a.d).toLowerCase().includes(q));
    acGrid.innerHTML=list.map(a=>'<div class="ac-card"><div class="flex items-start justify-between gap-3"><h3>'+a.n+'</h3><span class="ac-price">'+a.p+'</span></div><p>'+a.d+'</p></div>').join('');
    document.getElementById('acEmpty').style.display=list.length?'none':'block';
  }
  acSearch.addEventListener('input',acRender); acRender();
</script>
@endpush
