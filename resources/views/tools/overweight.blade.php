@extends('layouts.tool')
@section('title','Overweight Checker')
@section('desc','Check a loaded container against U.S. federal gross and axle weight limits for road drayage.')

@section('content')
<section class="py-16 md:py-20">
  <div class="max-w-[900px] mx-auto px-6">
    <div class="text-center max-w-2xl mx-auto reveal">
      <div class="text-[11px] uppercase tracking-[0.22em] font-semibold text-[var(--red)]">Drayage tool</div>
      <h1 class="display text-[38px] md:text-[50px] text-[var(--navy)] leading-[1.05] mt-2">Overweight Checker</h1>
      <p class="mt-4 text-[var(--muted)] text-[15px]">Add up cargo, container and equipment to see your gross combination weight against the U.S. federal 80,000 lb limit.</p>
    </div>

    <div class="mt-10 grid md:grid-cols-[1.1fr_0.9fr] gap-6">
      <div class="bg-white rounded-[24px] p-7 md:p-9 reveal reveal-d1" style="box-shadow:0 40px 90px -40px rgba(11,31,68,0.3);border:1px solid rgba(11,35,80,0.06);">
        <div class="space-y-5">
          <div><label class="tool-label">Cargo weight (lb)</label><input id="oCargo" class="tool-input" type="number" min="0" value="44000" /></div>
          <div class="grid grid-cols-2 gap-4">
            <div><label class="tool-label">Container tare (lb)</label><input id="oBox" class="tool-input" type="number" min="0" value="8160" /></div>
            <div><label class="tool-label">Chassis tare (lb)</label><input id="oChassis" class="tool-input" type="number" min="0" value="7000" /></div>
          </div>
          <div><label class="tool-label">Tractor weight (lb)</label><input id="oTractor" class="tool-input" type="number" min="0" value="17000" /></div>
        </div>
      </div>
      <div id="oResult" class="rounded-[24px] p-7 md:p-9 reveal reveal-d2 flex flex-col justify-center text-white transition-colors" style="background:#15935F;box-shadow:0 40px 90px -40px rgba(11,31,68,0.6);">
        <div class="text-[12px] uppercase tracking-[0.16em] text-white/70">Gross combination weight</div>
        <div class="display text-[44px] leading-none mt-1 num"><span id="oGross">0</span> lb</div>
        <div class="h-px bg-white/20 my-6"></div>
        <div class="flex justify-between text-[14px] text-white/85"><span>Federal limit</span><span class="num">80,000 lb</span></div>
        <div class="flex justify-between text-[14px] text-white/85 mt-2"><span id="oMarginLabel">Headroom</span><span class="num"><span id="oMargin">0</span> lb</span></div>
        <div class="mt-6 flex items-center gap-2 text-[15px] font-bold" id="oStatus"></div>
      </div>
    </div>
    <p class="text-[12px] text-[var(--muted)] mt-5 text-center reveal">U.S. federal interstate limits: 80,000 lb gross, 20,000 lb single axle, 34,000 lb tandem. State and bridge-formula limits may be lower — confirm before dispatch. Tri-axle chassis can raise allowable container weight.</p>
  </div>
</section>
@endsection

@push('scripts')
<script>
  const O=['oCargo','oBox','oChassis','oTractor'].map(i=>document.getElementById(i));
  const LIMIT=80000;
  function oCalc(){
    const gross=O.reduce((s,e)=>s+(parseFloat(e.value)||0),0);
    const margin=LIMIT-gross;
    document.getElementById('oGross').textContent=gross.toLocaleString();
    document.getElementById('oMargin').textContent=Math.abs(margin).toLocaleString();
    const box=document.getElementById('oResult'),status=document.getElementById('oStatus'),ml=document.getElementById('oMarginLabel');
    if(margin>=0){
      box.style.background='#15935F'; ml.textContent='Headroom';
      status.innerHTML='<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round"><path d="M20 6L9 17l-5-5"/></svg> Legal — within federal limit';
    } else {
      box.style.background='linear-gradient(160deg,#EF4444,#991B1B)'; ml.textContent='Over limit by';
      status.innerHTML='<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round"><path d="M12 9v4M12 17h.01M10.3 3.9L1.8 18a2 2 0 0 0 1.7 3h17a2 2 0 0 0 1.7-3L13.7 3.9a2 2 0 0 0-3.4 0z"/></svg> Overweight — permit or tri-axle needed';
    }
  }
  O.forEach(e=>e.addEventListener('input',oCalc)); oCalc();
</script>
@endpush
