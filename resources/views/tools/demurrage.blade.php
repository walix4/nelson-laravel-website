@extends('layouts.tool')
@section('title','Demurrage Calculator')
@section('desc','Estimate demurrage and detention charges on your containers before they add up.')

@section('content')
<section class="py-16 md:py-20">
  <div class="max-w-[900px] mx-auto px-6">
    <div class="text-center max-w-2xl mx-auto reveal">
      <div class="text-[11px] uppercase tracking-[0.22em] font-semibold text-[var(--red)]">Drayage tool</div>
      <h1 class="display text-[38px] md:text-[50px] text-[var(--navy)] leading-[1.05] mt-2">Demurrage &amp; Detention</h1>
      <p class="mt-4 text-[var(--muted)] text-[15px]">Estimate per-diem exposure on containers sitting past their free time — at the terminal (demurrage) and on your equipment (detention).</p>
    </div>

    <div class="mt-10 grid md:grid-cols-[1.1fr_0.9fr] gap-6">
      <div class="bg-white rounded-[24px] p-7 md:p-9 reveal reveal-d1" style="box-shadow:0 40px 90px -40px rgba(11,31,68,0.3);border:1px solid rgba(11,35,80,0.06);">
        <div class="space-y-5">
          <div><label class="tool-label">Containers</label><input id="dmQty" class="tool-input" type="number" min="1" value="3" /></div>
          <div class="grid grid-cols-2 gap-4">
            <div><label class="tool-label">Total days held</label><input id="dmDays" class="tool-input" type="number" min="0" value="9" /></div>
            <div><label class="tool-label">Free days</label><input id="dmFree" class="tool-input" type="number" min="0" value="4" /></div>
          </div>
          <div class="grid grid-cols-2 gap-4">
            <div><label class="tool-label">Demurrage / day ($)</label><input id="dmDem" class="tool-input" type="number" min="0" value="165" /></div>
            <div><label class="tool-label">Detention / day ($)</label><input id="dmDet" class="tool-input" type="number" min="0" value="120" /></div>
          </div>
        </div>
      </div>
      <div class="bg-[var(--navy)] text-white rounded-[24px] p-7 md:p-9 reveal reveal-d2 flex flex-col justify-center" style="box-shadow:0 40px 90px -40px rgba(11,31,68,0.6);">
        <div class="text-[12px] uppercase tracking-[0.16em] text-white/60">Chargeable days</div>
        <div class="display text-[26px] mt-1 num"><span id="dmCharge">0</span> per container</div>
        <div class="h-px bg-white/15 my-6"></div>
        <div class="flex justify-between text-[14px] text-white/80"><span>Demurrage</span><span class="num">$<span id="dmDemTot">0</span></span></div>
        <div class="flex justify-between text-[14px] text-white/80 mt-2"><span>Detention</span><span class="num">$<span id="dmDetTot">0</span></span></div>
        <div class="h-px bg-white/15 my-5"></div>
        <div class="flex justify-between items-end"><span class="text-[14px] text-white/70">Total exposure</span><span class="display text-[40px] leading-none num">$<span id="dmTotal">0</span></span></div>
      </div>
    </div>
    <p class="text-[12px] text-[var(--muted)] mt-5 text-center reveal">Indicative only — actual tariffs vary by carrier and terminal. Avoid charges entirely with faster turns — <a href="__B__/dryge/#quote" class="text-[var(--blue)] font-semibold">price a move</a>.</p>
  </div>
</section>
@endsection

@push('scripts')
<script>
  const ids=['dmQty','dmDays','dmFree','dmDem','dmDet'].map(i=>document.getElementById(i));
  function dmCalc(){
    const [qty,days,free,dem,det]=ids.map(e=>Math.max(0,parseFloat(e.value)||0));
    const charge=Math.max(0,days-free);
    const demTot=charge*dem*qty, detTot=charge*det*qty;
    document.getElementById('dmCharge').textContent=charge;
    document.getElementById('dmDemTot').textContent=demTot.toLocaleString();
    document.getElementById('dmDetTot').textContent=detTot.toLocaleString();
    document.getElementById('dmTotal').textContent=(demTot+detTot).toLocaleString();
  }
  ids.forEach(e=>e.addEventListener('input',dmCalc)); dmCalc();
</script>
@endpush
