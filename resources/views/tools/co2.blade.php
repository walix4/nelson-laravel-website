@extends('layouts.tool')
@section('title','CO₂ Emissions')
@section('desc','Estimate the carbon emissions of a drayage move based on distance, weight and equipment.')

@section('content')
<section class="py-16 md:py-20">
  <div class="max-w-[900px] mx-auto px-6">
    <div class="text-center max-w-2xl mx-auto reveal">
      <div class="text-[11px] uppercase tracking-[0.22em] font-semibold text-[var(--red)]">Drayage tool</div>
      <h1 class="display text-[38px] md:text-[50px] text-[var(--navy)] leading-[1.05] mt-2">CO&#8322; Emissions Estimator</h1>
      <p class="mt-4 text-[var(--muted)] text-[15px]">Estimate the carbon footprint of a container move and see how rail and electric drayage compare.</p>
    </div>

    <div class="mt-10 bg-white rounded-[24px] p-7 md:p-10 reveal reveal-d1" style="box-shadow:0 40px 90px -40px rgba(11,31,68,0.3);border:1px solid rgba(11,35,80,0.06);">
      <div class="grid md:grid-cols-3 gap-5">
        <div><label class="tool-label">Distance (miles)</label><input id="coMiles" class="tool-input" type="number" min="0" value="372" /></div>
        <div><label class="tool-label">Cargo weight (tons)</label><input id="coTons" class="tool-input" type="number" min="0" value="18" /></div>
        <div><label class="tool-label">Mode</label><select id="coMode" class="tool-select">
          <option value="0.161">Diesel truck</option>
          <option value="0.090">Rail + dray</option>
          <option value="0.045">Electric truck</option>
        </select></div>
      </div>
      <div class="grid sm:grid-cols-3 gap-4 mt-8 text-center">
        <div class="rounded-2xl py-7 sm:col-span-1" style="background:linear-gradient(160deg,#34D399,#059669);color:#fff;box-shadow:0 20px 44px -22px rgba(5,150,105,0.8)"><div class="display text-[40px] leading-none num"><span id="coKg">0</span></div><div class="text-[12px] mt-1.5 uppercase tracking-wider opacity-90">kg CO₂</div></div>
        <div class="rounded-2xl bg-[var(--navy)]/4 border border-[var(--navy)]/8 py-7"><div class="display text-[34px] text-[var(--navy)] num"><span id="coTrees">0</span></div><div class="text-[12px] text-[var(--muted)] mt-1.5 uppercase tracking-wider">Trees / yr to offset</div></div>
        <div class="rounded-2xl bg-[var(--navy)]/4 border border-[var(--navy)]/8 py-7"><div class="display text-[34px] text-[var(--navy)] num"><span id="coSave">0</span>%</div><div class="text-[12px] text-[var(--muted)] mt-1.5 uppercase tracking-wider">Cut vs diesel</div></div>
      </div>
      <p class="text-[12px] text-[var(--muted)] mt-5 text-center">Based on ~0.161 kg CO₂ per ton-mile for diesel drayage (EPA SmartWay range). For directional planning only.</p>
    </div>
  </div>
</section>
@endsection

@push('scripts')
<script>
  const coM=document.getElementById('coMiles'),coT=document.getElementById('coTons'),coMode=document.getElementById('coMode');
  function coCalc(){
    const mi=Math.max(0,parseFloat(coM.value)||0),tons=Math.max(0,parseFloat(coT.value)||0),f=parseFloat(coMode.value);
    const kg=mi*tons*f;
    const diesel=mi*tons*0.161;
    document.getElementById('coKg').textContent=Math.round(kg).toLocaleString();
    document.getElementById('coTrees').textContent=Math.max(0,Math.round(kg/21));
    document.getElementById('coSave').textContent=diesel>0?Math.round((1-kg/diesel)*100):0;
  }
  [coM,coT,coMode].forEach(e=>e.addEventListener('input',coCalc)); coMode.addEventListener('change',coCalc); coCalc();
</script>
@endpush
