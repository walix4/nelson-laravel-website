@extends('layouts.tool')
@section('title','Unit Converter')
@section('desc','Free online unit converter — weight, volume, distance, speed, area, temperature and more.')

@push('head')
<style>
  .uc-eq{font-size:34px;font-weight:800;color:var(--navy);line-height:1;}
</style>
@endpush

@section('content')
<section class="py-16 md:py-20">
  <div class="max-w-[1000px] mx-auto px-6">
    <div class="text-center max-w-2xl mx-auto reveal">
      <div class="text-[11px] uppercase tracking-[0.22em] font-semibold text-[var(--red)]">Free logistics tool</div>
      <h1 class="display text-[38px] md:text-[52px] text-[var(--navy)] leading-[1.05] mt-2">Online Unit Converter</h1>
      <p class="mt-4 text-[var(--muted)] text-[15px]">Convert common units of measurement instantly. Pick a category, then choose the <i>from</i> and <i>to</i> units.</p>
    </div>

    <div class="mt-10 bg-white rounded-[26px] p-7 md:p-12 reveal reveal-d1" style="box-shadow:0 40px 90px -40px rgba(11,31,68,0.32);border:1px solid rgba(11,35,80,0.06);">
      <div class="mb-6 md:max-w-[48%]"><select id="ucCat" class="tool-select"></select></div>
      <div class="grid md:grid-cols-[1fr_auto_1fr] gap-5 md:gap-7 items-center">
        <div class="space-y-4"><select id="ucFrom" class="tool-select"></select><input id="ucInput" class="tool-input" type="text" inputmode="decimal" value="1" /></div>
        <div class="uc-eq text-center select-none">=</div>
        <div class="space-y-4"><select id="ucTo" class="tool-select"></select><input id="ucOutput" class="tool-input" type="text" readonly value="0" style="background:#F4F6FB" /></div>
      </div>
      <div class="mt-6 flex justify-center"><button id="ucSwap" type="button" class="inline-flex items-center gap-2 text-[13px] font-semibold text-[var(--navy)] border border-[var(--navy)]/15 rounded-lg px-4 py-2 hover:bg-[var(--navy)]/5 transition"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M7 16V4M7 4L3 8M7 4l4 4M17 8v12M17 20l4-4M17 20l-4-4"/></svg>Swap units</button></div>
    </div>
  </div>
</section>
@endsection

@push('scripts')
<script>
  const UC_DATA={
    Length:{units:{'Meter (m)':1,'Kilometer (km)':1000,'Centimeter (cm)':0.01,'Millimeter (mm)':0.001,'Mile (mi)':1609.344,'Yard (yd)':0.9144,'Foot (ft)':0.3048,'Inch (in)':0.0254,'Nautical mile (nmi)':1852}},
    Weight:{units:{'Kilogram (kg)':1,'Gram (g)':0.001,'Metric tonne (t)':1000,'Pound (lb)':0.45359237,'Ounce (oz)':0.028349523,'US ton':907.18474,'Long ton':1016.0469}},
    Volume:{units:{'Liter (L)':1,'Milliliter (mL)':0.001,'Cubic meter (m³)':1000,'Cubic foot (ft³)':28.316846,'US gallon':3.785411784,'Imperial gallon':4.54609,'Barrel (oil)':158.987295}},
    Area:{units:{'Square meter (m²)':1,'Square kilometer (km²)':1e6,'Hectare (ha)':10000,'Square foot (ft²)':0.092903,'Square yard (yd²)':0.836127,'Acre':4046.8564}},
    Speed:{units:{'Meter/sec (m/s)':1,'Kilometer/hour (km/h)':0.277778,'Mile/hour (mph)':0.44704,'Knot (kn)':0.514444,'Foot/sec (ft/s)':0.3048}},
    Acceleration:{units:{'Meter/sq.sec (m/sec²)':1,'Foot/sq.sec (ft/sec²)':0.3048,'Standard gravity (g)':9.80665,'Gal (cm/sec²)':0.01}},
    Time:{units:{'Second (s)':1,'Minute (min)':60,'Hour (h)':3600,'Day (d)':86400,'Week':604800}},
    Temperature:{special:'temp',units:{'Celsius (°C)':1,'Fahrenheit (°F)':1,'Kelvin (K)':1}}
  };
  const ucCat=document.getElementById('ucCat'),ucFrom=document.getElementById('ucFrom'),ucTo=document.getElementById('ucTo'),ucInput=document.getElementById('ucInput'),ucOutput=document.getElementById('ucOutput');
  Object.keys(UC_DATA).forEach(c=>ucCat.add(new Option(c,c))); ucCat.value='Length';
  function ucFillUnits(){const list=Object.keys(UC_DATA[ucCat.value].units);[ucFrom,ucTo].forEach(sel=>{sel.innerHTML='';list.forEach(u=>sel.add(new Option(u,u)));});ucFrom.selectedIndex=0;ucTo.selectedIndex=Math.min(1,list.length-1);}
  function toC(v,u){if(u.startsWith('Fahrenheit'))return (v-32)*5/9;if(u.startsWith('Kelvin'))return v-273.15;return v;}
  function fromC(v,u){if(u.startsWith('Fahrenheit'))return v*9/5+32;if(u.startsWith('Kelvin'))return v+273.15;return v;}
  function ucConvert(){const cat=UC_DATA[ucCat.value],raw=parseFloat(ucInput.value);if(isNaN(raw)){ucOutput.value='';return;}let res;if(cat.special==='temp'){res=fromC(toC(raw,ucFrom.value),ucTo.value);}else{res=raw*cat.units[ucFrom.value]/cat.units[ucTo.value];}ucOutput.value=parseFloat(res.toPrecision(8)).toLocaleString(undefined,{maximumFractionDigits:8});}
  ucCat.addEventListener('change',()=>{ucFillUnits();ucConvert();});
  [ucFrom,ucTo].forEach(s=>s.addEventListener('change',ucConvert)); ucInput.addEventListener('input',ucConvert);
  document.getElementById('ucSwap').addEventListener('click',()=>{const a=ucFrom.value;ucFrom.value=ucTo.value;ucTo.value=a;ucConvert();});
  ucFillUnits(); ucConvert();
</script>
@endpush
