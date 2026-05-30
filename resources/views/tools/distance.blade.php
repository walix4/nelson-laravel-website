@extends('layouts.tool')
@section('title','Distance & Time')
@section('desc','Calculate road distance and transit time for any U.S. drayage lane between a port and an inland destination.')

@section('content')
<section class="py-16 md:py-20">
  <div class="max-w-[920px] mx-auto px-6">
    <div class="text-center max-w-2xl mx-auto reveal">
      <div class="text-[11px] uppercase tracking-[0.22em] font-semibold text-[var(--red)]">Drayage tool</div>
      <h1 class="display text-[38px] md:text-[50px] text-[var(--navy)] leading-[1.05] mt-2">Distance &amp; Transit Time</h1>
      <p class="mt-4 text-[var(--muted)] text-[15px]">Pick an origin port and an inland destination to estimate road distance, drive time and an indicative drayage rate.</p>
    </div>

    <div class="mt-10 bg-white rounded-[24px] p-7 md:p-10 reveal reveal-d1" style="box-shadow:0 40px 90px -40px rgba(11,31,68,0.32);border:1px solid rgba(11,35,80,0.06);">
      <div class="grid md:grid-cols-2 gap-5">
        <div><label class="tool-label">Origin port</label><select id="dOrigin" class="tool-select"></select></div>
        <div><label class="tool-label">Destination</label><select id="dDest" class="tool-select"></select></div>
      </div>
      <div class="grid grid-cols-3 gap-4 mt-8 text-center">
        <div class="rounded-2xl bg-[var(--navy)]/4 border border-[var(--navy)]/8 py-6"><div class="display text-[34px] text-[var(--navy)] num"><span id="dMiles">0</span></div><div class="text-[12px] text-[var(--muted)] mt-1 uppercase tracking-wider">Miles</div></div>
        <div class="rounded-2xl bg-[var(--navy)]/4 border border-[var(--navy)]/8 py-6"><div class="display text-[34px] text-[var(--navy)] num"><span id="dTime">0h</span></div><div class="text-[12px] text-[var(--muted)] mt-1 uppercase tracking-wider">Drive time</div></div>
        <div class="rounded-2xl bg-[var(--red)]/6 border border-[var(--red)]/15 py-6"><div class="display text-[34px] text-[var(--red)] num">$<span id="dRate">0</span></div><div class="text-[12px] text-[var(--muted)] mt-1 uppercase tracking-wider">Est. rate</div></div>
      </div>
      <p class="text-[12px] text-[var(--muted)] mt-5 text-center">Estimates use great-circle distance × a 1.2 road factor at 45 mph average. Get a firm, all-in quote on the <a href="__B__/dryge/#quote" class="text-[var(--blue)] font-semibold">rate calculator</a>.</p>
    </div>
  </div>
</section>
@endsection

@push('scripts')
<script>
  const D_PORTS={'Los Angeles, CA':[33.74,-118.26],'Long Beach, CA':[33.75,-118.22],'Oakland, CA':[37.80,-122.30],'Seattle, WA':[47.60,-122.34],'New York / NJ':[40.66,-74.08],'Savannah, GA':[32.08,-81.10],'Houston, TX':[29.73,-95.27],'Miami, FL':[25.78,-80.18],'Baltimore, MD':[39.26,-76.55],'Charleston, SC':[32.78,-79.92]};
  const D_DEST={'Dallas, TX':[32.78,-96.80],'Chicago, IL':[41.88,-87.63],'Phoenix, AZ':[33.45,-112.07],'Denver, CO':[39.74,-104.99],'Atlanta, GA':[33.75,-84.39],'Memphis, TN':[35.15,-90.05],'Las Vegas, NV':[36.17,-115.14],'Columbus, OH':[39.96,-82.99],'Kansas City, MO':[39.10,-94.58],'Salt Lake City, UT':[40.76,-111.89]};
  const dO=document.getElementById('dOrigin'),dD=document.getElementById('dDest');
  Object.keys(D_PORTS).forEach(k=>dO.add(new Option(k,k)));
  Object.keys(D_DEST).forEach(k=>dD.add(new Option(k,k)));
  dO.value='Los Angeles, CA'; dD.value='Dallas, TX';
  function hav(a,b){const R=3958.8,t=Math.PI/180;const dLat=(b[0]-a[0])*t,dLon=(b[1]-a[1])*t;const s=Math.sin(dLat/2)**2+Math.cos(a[0]*t)*Math.cos(b[0]*t)*Math.sin(dLon/2)**2;return 2*R*Math.asin(Math.sqrt(s));}
  function dCalc(){
    const mi=Math.round(hav(D_PORTS[dO.value],D_DEST[dD.value])*1.2);
    const hrs=mi/45; const h=Math.floor(hrs),m=Math.round((hrs-h)*60);
    document.getElementById('dMiles').textContent=mi.toLocaleString();
    document.getElementById('dTime').textContent=h+'h '+(m<10?'0':'')+m+'m';
    const rate=Math.round((350+mi*2.35)/5)*5;
    document.getElementById('dRate').textContent=rate.toLocaleString();
  }
  dO.addEventListener('change',dCalc); dD.addEventListener('change',dCalc); dCalc();
</script>
@endpush
