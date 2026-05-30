@extends('layouts.tool')
@section('title','Fuel Surcharge Calculator')
@section('desc','Calculate the fuel surcharge (FSC) on a drayage move from diesel price, peg and truck efficiency.')

@section('content')
<section class="py-16 md:py-20">
  <div class="max-w-[900px] mx-auto px-6">
    <div class="text-center max-w-2xl mx-auto reveal">
      <div class="text-[11px] uppercase tracking-[0.22em] font-semibold text-[var(--red)]">Drayage tool</div>
      <h1 class="display text-[38px] md:text-[50px] text-[var(--navy)] leading-[1.05] mt-2">Fuel Surcharge (FSC)</h1>
      <p class="mt-4 text-[var(--muted)] text-[15px]">Work out the per-mile fuel surcharge and total FSC for a move from the current diesel price, your base peg and truck MPG.</p>
    </div>

    <div class="mt-10 grid md:grid-cols-[1.1fr_0.9fr] gap-6">
      <div class="bg-white rounded-[24px] p-7 md:p-9 reveal reveal-d1" style="box-shadow:0 40px 90px -40px rgba(11,31,68,0.3);border:1px solid rgba(11,35,80,0.06);">
        <div class="space-y-5">
          <div class="grid grid-cols-2 gap-4">
            <div><label class="tool-label">Diesel price ($/gal)</label><input id="fDiesel" class="tool-input" type="number" step="0.01" min="0" value="4.05" /></div>
            <div><label class="tool-label">Base peg ($/gal)</label><input id="fPeg" class="tool-input" type="number" step="0.01" min="0" value="1.25" /></div>
          </div>
          <div class="grid grid-cols-2 gap-4">
            <div><label class="tool-label">Truck MPG</label><input id="fMpg" class="tool-input" type="number" step="0.1" min="1" value="6" /></div>
            <div><label class="tool-label">Distance (miles)</label><input id="fMiles" class="tool-input" type="number" min="0" value="372" /></div>
          </div>
          <div><label class="tool-label">Linehaul base ($)</label><input id="fBase" class="tool-input" type="number" min="0" value="950" /></div>
        </div>
      </div>
      <div class="bg-[var(--navy)] text-white rounded-[24px] p-7 md:p-9 reveal reveal-d2 flex flex-col justify-center" style="box-shadow:0 40px 90px -40px rgba(11,31,68,0.6);">
        <div class="text-[12px] uppercase tracking-[0.16em] text-white/60">FSC per mile</div>
        <div class="display text-[26px] mt-1 num">$<span id="fPerMile">0</span></div>
        <div class="h-px bg-white/15 my-6"></div>
        <div class="flex justify-between text-[14px] text-white/80"><span>Fuel surcharge</span><span class="num">$<span id="fFsc">0</span></span></div>
        <div class="flex justify-between text-[14px] text-white/80 mt-2"><span>FSC as % of linehaul</span><span class="num"><span id="fPct">0</span>%</span></div>
        <div class="h-px bg-white/15 my-5"></div>
        <div class="flex justify-between items-end"><span class="text-[14px] text-white/70">All-in total</span><span class="display text-[40px] leading-none num">$<span id="fTotal">0</span></span></div>
      </div>
    </div>
    <p class="text-[12px] text-[var(--muted)] mt-5 text-center reveal">Per-mile method: (diesel − peg) ÷ MPG. Carriers vary; use as a directional estimate, then lock a firm all-in rate on the <a href="__B__/dryge/#quote" class="text-[var(--blue)] font-semibold">calculator</a>.</p>
  </div>
</section>
@endsection

@push('scripts')
<script>
  const F=['fDiesel','fPeg','fMpg','fMiles','fBase'].map(i=>document.getElementById(i));
  function fCalc(){
    const [diesel,peg,mpg,miles,base]=F.map(e=>parseFloat(e.value)||0);
    const perMile=Math.max(0,(diesel-peg)/(mpg||1));
    const fsc=perMile*miles;
    document.getElementById('fPerMile').textContent=perMile.toFixed(3);
    document.getElementById('fFsc').textContent=Math.round(fsc).toLocaleString();
    document.getElementById('fPct').textContent=base>0?Math.round(fsc/base*100):0;
    document.getElementById('fTotal').textContent=Math.round(base+fsc).toLocaleString();
  }
  F.forEach(e=>e.addEventListener('input',fCalc)); fCalc();
</script>
@endpush
