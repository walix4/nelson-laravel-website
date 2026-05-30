@extends('layouts.tool')
@section('title','All Estimates')
@section('desc','Live stream of every drayage quote on the network — priced in seconds.')

@push('head')
<style>
  @keyframes livePulseBlue{0%{box-shadow:0 0 0 0 rgba(58,95,192,0.55);}70%{box-shadow:0 0 0 8px rgba(58,95,192,0);}100%{box-shadow:0 0 0 0 rgba(58,95,192,0);}}
  .est-wrap{background:#fff;border:1px solid rgba(11,35,80,0.08);border-radius:16px;box-shadow:0 34px 80px -40px rgba(11,35,80,0.35);overflow:hidden;}
  .est-scroll{overflow-x:auto;}
  .est-table{width:100%;border-collapse:collapse;min-width:1040px;}
  .est-table thead th{text-align:left;font-size:10.5px;font-weight:700;letter-spacing:0.05em;text-transform:uppercase;color:rgba(11,35,80,0.5);background:linear-gradient(180deg,#F7FAFD,#EEF3F9);padding:13px 10px;white-space:nowrap;border-bottom:1px solid rgba(11,35,80,0.08);}
  .est-table tbody td{padding:12px 10px;border-bottom:1px solid rgba(11,35,80,0.055);vertical-align:middle;font-size:12.5px;color:var(--navy);}
  .est-table th:nth-child(1),.est-table td:nth-child(1){padding-left:18px;}
  .est-table th:nth-child(5),.est-table td:nth-child(5){text-align:center;}
  .est-table tbody tr{transition:background .15s;}
  .est-table tbody tr:hover{background:#F5F9FE;}
  .est-table tbody tr:hover td:first-child{box-shadow:inset 3px 0 0 var(--red);}
  .est-table tbody tr:last-child td{border-bottom:none;}
  .est-ref{font-family:ui-monospace,SFMono-Regular,Menlo,monospace;font-weight:700;font-size:11px;letter-spacing:-0.03em;color:rgba(11,35,80,0.82);white-space:nowrap;}
  .est-cust{display:flex;align-items:center;gap:9px;}
  .est-avatar{width:32px;height:32px;border-radius:9px;flex:0 0 auto;display:grid;place-items:center;color:#fff;font-weight:700;font-size:11.5px;box-shadow:0 8px 16px -8px rgba(11,35,80,0.55);}
  .est-cust .est-name{font-weight:700;}
  .est-sub{font-size:11.5px;color:var(--muted);margin-top:2px;}
  .est-route{display:flex;align-items:center;gap:7px;font-weight:600;}
  .est-pin{display:inline-flex;align-items:center;justify-content:center;width:22px;height:22px;border-radius:6px;flex:0 0 auto;}
  .est-pin.up{background:rgba(22,181,113,0.13);} .est-pin.down{background:rgba(255,59,48,0.1);}
  .est-loc{max-width:124px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;}
  .est-chip{display:inline-block;font-size:11px;font-weight:700;padding:3px 9px;border-radius:7px;background:#fff;border:1px solid rgba(11,35,80,0.14);color:var(--navy);white-space:nowrap;}
  .est-badge{display:inline-flex;align-items:center;gap:5px;font-size:11.5px;font-weight:700;padding:4px 10px;border-radius:999px;white-space:nowrap;}
  .est-badge.completed{background:rgba(22,181,113,0.13);color:#15935F;}
  .est-badge.streaming{background:rgba(58,95,192,0.13);color:#3A5FC0;}
  .est-badge.pending{background:rgba(11,35,80,0.07);color:#5B6473;}
  .est-badge.failed{background:rgba(255,59,48,0.12);color:#E0241A;}
  .est-dot{width:7px;height:7px;border-radius:50%;background:currentColor;animation:livePulseBlue 1.6s ease-out infinite;}
  .est-prog{width:96px;}
  .est-prog-track{height:7px;border-radius:7px;background:rgba(11,35,80,0.09);overflow:hidden;}
  .est-prog-fill{height:100%;border-radius:7px;background:linear-gradient(90deg,#3A5FC0,#6E8FE0);transition:width .7s cubic-bezier(.4,0,.2,1);box-shadow:0 0 10px rgba(58,95,192,0.5);}
  .est-prog-label{font-size:11px;font-weight:600;color:var(--muted);margin-top:5px;}
  .est-calc{font-style:italic;color:var(--muted);}
  .est-price{font-weight:800;font-size:15px;color:var(--navy);}
  .est-time{display:inline-flex;align-items:center;gap:6px;color:var(--muted);font-size:12.5px;white-space:nowrap;}
  .est-view{display:inline-flex;align-items:center;gap:5px;color:var(--red);font-weight:700;font-size:12.5px;text-decoration:none;white-space:nowrap;padding:6px 11px;border-radius:8px;transition:background .15s;}
  .est-view:hover{background:rgba(255,59,48,0.09);}
  .est-input{width:100%;padding:0.72rem 0.9rem 0.72rem 2.5rem;border:1px solid rgba(11,35,80,0.14);border-radius:10px;background:#fff;font-size:0.9rem;color:var(--navy);transition:border-color .2s,box-shadow .2s;}
  .est-input:focus{outline:none;border-color:var(--blue);box-shadow:0 0 0 4px rgba(58,95,192,0.14);}
  .est-input::placeholder{color:rgba(11,35,80,0.4);}
  .est-select{appearance:none;-webkit-appearance:none;padding:0.72rem 2.3rem 0.72rem 0.95rem;border:1px solid rgba(11,35,80,0.14);border-radius:10px;background-color:#fff;font-size:0.9rem;font-weight:600;color:var(--navy);cursor:pointer;background-image:url("data:image/svg+xml;charset=UTF-8,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 20 20' fill='%230B2350'%3e%3cpath fill-rule='evenodd' d='M5.23 7.21a.75.75 0 011.06.02L10 11.06l3.71-3.83a.75.75 0 111.08 1.04l-4.25 4.39a.75.75 0 01-1.08 0L5.21 8.27a.75.75 0 01.02-1.06z' clip-rule='evenodd'/%3e%3c/svg%3e");background-repeat:no-repeat;background-position:right .7rem center;background-size:1.05rem;}
  .est-empty{padding:46px;text-align:center;color:var(--muted);font-size:14px;}
  .no-scrollbar::-webkit-scrollbar{display:none;} .no-scrollbar{-ms-overflow-style:none;scrollbar-width:none;}
</style>
@endpush

@section('content')
<section class="py-14 md:py-16">
  <div class="max-w-[1400px] mx-auto px-6">
    <div class="text-center max-w-2xl mx-auto reveal mb-10">
      <div class="text-[11px] uppercase tracking-[0.22em] font-semibold text-[var(--red)]">Live estimate stream</div>
      <h1 class="display text-[40px] md:text-[52px] text-[var(--navy)] leading-[1.04] mt-2">All Estimates</h1>
      <p class="mt-4 text-[var(--muted)] text-[15px]">Every drayage quote on the network — streaming in live and priced in seconds.</p>
    </div>
    <div class="reveal reveal-d1">
      <div class="flex flex-col md:flex-row gap-3 mb-5">
        <div class="relative flex-1">
          <svg class="absolute left-3 top-1/2 -translate-y-1/2" style="color:rgba(11,35,80,0.4);" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="7"/><path d="M21 21l-4.3-4.3"/></svg>
          <input id="estSearch" class="est-input" type="text" placeholder="Search by reference, customer, pickup, or drop-off…" />
        </div>
        <select id="estStatus" class="est-select">
          <option value="all">All statuses</option><option value="completed">Completed</option><option value="streaming">Streaming</option><option value="pending">Pending</option><option value="failed">Failed</option>
        </select>
        <select id="estDate" class="est-select"><option>Today</option><option>Last 7 days</option><option>Last 30 days</option><option>All time</option></select>
        <div class="flex items-center text-[12px] font-medium text-[var(--muted)] px-1 whitespace-nowrap"><b id="estCount" class="text-[var(--navy)] mr-1">0</b> estimates</div>
      </div>
      <div class="est-wrap"><div class="est-scroll no-scrollbar"><table class="est-table">
        <thead><tr><th>Reference</th><th>Customer</th><th>Pickup</th><th>Drop-off</th><th>Container</th><th>Est. Price</th><th>Status</th><th>Stream</th><th>Created</th><th></th></tr></thead>
        <tbody id="estTbody"></tbody>
      </table></div></div>
    </div>
  </div>
</section>
@endsection

@push('scripts')
<script>
  const ESTIMATES=[
    {ref:'DRY-2026-0847',customer:'Pacific Freight Brokers',email:'ops@pacificfreight.com',pickup:'Port of Los Angeles — Pier 400',pickupSub:'San Pedro, CA · port',drop:'Ontario Distribution Center',dropSub:'Ontario, CA · warehouse',container:'40ft',miles:62,price:'$485',status:'completed',stream:0,created:'2h ago'},
    {ref:'DRY-2026-0846',customer:'Harbor Line Logistics',email:'dispatch@harborline.io',pickup:'Port of Newark — Elizabeth',pickupSub:'Elizabeth, NJ · port',drop:'Carlstadt NJ Warehouse',dropSub:'Carlstadt, NJ · warehouse',container:'20ft',miles:18,price:'$325',status:'completed',stream:0,created:'2h ago'},
    {ref:'DRY-2026-0845',customer:'Gulf Coast Intermodal',email:'quotes@gulfcoastim.com',pickup:'Port of Houston — Barbours Cut',pickupSub:'La Porte, TX · port',drop:'Dallas Rail Ramp',dropSub:'Wilmer, TX · rail',container:'40ft-hc',miles:248,price:null,finalPrice:'$1,240',status:'streaming',stream:67,created:'2h ago'},
    {ref:'DRY-2026-0844',customer:'Midwest Container Co',email:'tms@midwestcontainer.com',pickup:'Chicago CSX 59th St',pickupSub:'Chicago, IL · rail',drop:'Joliet Warehouse Park',dropSub:'Joliet, IL · warehouse',container:'40ft',miles:41,price:null,finalPrice:'$365',status:'pending',stream:0,created:'2h ago'},
    {ref:'DRY-2026-0843',customer:'Atlantic Drayage LLC',email:'billing@atlanticdray.com',pickup:'Port of Savannah — GCT',pickupSub:'Savannah, GA · port',drop:'McDonough Distribution',dropSub:'McDonough, GA · warehouse',container:'reefer',miles:264,price:'$892',status:'completed',stream:0,created:'3h ago'},
    {ref:'DRY-2026-0842',customer:'West Coast TMS Demo',email:'demo@westcoasttms.io',pickup:'Port of Oakland — SSA',pickupSub:'Oakland, CA · port',drop:'Tracy CA Fulfillment',dropSub:'Tracy, CA · warehouse',container:'40ft',miles:71,price:null,status:'failed',stream:0,created:'4h ago'},
    {ref:'DRY-2026-0841',customer:'Northeast Brokerage Group',email:'rates@nebrokerage.com',pickup:'Port of Baltimore — Seagirt',pickupSub:'Baltimore, MD · port',drop:'Harrisburg PA DC',dropSub:'Harrisburg, PA · warehouse',container:'20ft',miles:92,price:'$410',status:'completed',stream:0,created:'4h ago'},
    {ref:'DRY-2026-0840',customer:'Sunshine Port Services',email:'ops@sunshineport.com',pickup:'Port of Miami — Seaboard',pickupSub:'Miami, FL · port',drop:'Hialeah Industrial Park',dropSub:'Hialeah, FL · warehouse',container:'40ft-hc',miles:22,price:null,finalPrice:'$298',status:'streaming',stream:41,created:'4h ago'},
    {ref:'DRY-2026-0839',customer:'Rocky Mountain Freight',email:'hello@rmfreight.com',pickup:'Port of Seattle — Terminal 18',pickupSub:'Seattle, WA · port',drop:'Denver Cold Storage',dropSub:'Denver, CO · warehouse',container:'reefer',miles:1320,price:'$2,140',status:'completed',stream:0,created:'5h ago'},
    {ref:'DRY-2026-0838',customer:'Lone Star Logistics',email:'dispatch@lonestarlog.com',pickup:'Port of Long Beach — Pier T',pickupSub:'Long Beach, CA · port',drop:'Phoenix AZ Crossdock',dropSub:'Phoenix, AZ · warehouse',container:'40ft',miles:372,price:'$1,180',status:'completed',stream:0,created:'6h ago'},
    {ref:'DRY-2026-0837',customer:'Great Lakes Cartage',email:'quotes@glcartage.com',pickup:"Norfolk Int'l Terminal",pickupSub:'Norfolk, VA · port',drop:'Columbus OH DC',dropSub:'Columbus, OH · warehouse',container:'40ft',miles:470,price:null,finalPrice:'$1,460',status:'pending',stream:0,created:'7h ago'},
    {ref:'DRY-2026-0836',customer:'Bayou Transport',email:'ops@bayoutransport.com',pickup:'Port of New Orleans',pickupSub:'New Orleans, LA · port',drop:'Memphis Rail Yard',dropSub:'Memphis, TN · rail',container:'20ft',miles:395,price:'$1,020',status:'completed',stream:0,created:'8h ago'}
  ];
  const EST_LABELS={completed:'Completed',streaming:'Streaming',pending:'Pending',failed:'Failed'};
  const UP_ARROW='<span class="est-pin up"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#15935F" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round"><path d="M12 19V5M5 12l7-7 7 7"/></svg></span>';
  const DOWN_ARROW='<span class="est-pin down"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#E0241A" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round"><path d="M12 5v14M5 12l7 7 7-7"/></svg></span>';
  const EST_AVCOLORS=['#0B2350','#1E3A8A','#3A5FC0','#E0241A','#15935F'];
  const EST_ICONS={completed:'<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><path d="M20 6L9 17l-5-5"/></svg>',failed:'<svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round"><path d="M18 6L6 18M6 6l12 12"/></svg>',pending:'<svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/></svg>'};
  function estInitials(n){const p=n.replace(/[^A-Za-z ]/g,'').trim().split(/\s+/);return ((p[0]||'')[0]||'')+((p[1]||'')[0]||'');}
  function estAvatarColor(n){let h=0;for(let i=0;i<n.length;i++)h=(h*31+n.charCodeAt(i))>>>0;return EST_AVCOLORS[h%EST_AVCOLORS.length];}
  function estBadge(s){return '<span class="est-badge '+s+'">'+(s==='streaming'?'<span class="est-dot"></span>':(EST_ICONS[s]||''))+EST_LABELS[s]+'</span>';}
  const CLOCK_ICON='<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="opacity:.6"><circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/></svg>';
  function estStream(e){if(e.status!=='streaming')return '<span style="color:var(--muted)">—</span>';const v=Math.round(e.stream);return '<div class="est-prog"><div class="est-prog-track"><div class="est-prog-fill" data-fill="'+e.ref+'" style="width:'+v+'%"></div></div><div class="est-prog-label" data-label="'+e.ref+'">'+v+'%</div></div>';}
  function estPrice(e){if(e.price)return '<span class="est-price">'+e.price+'</span>';if(e.status==='failed')return '<span style="color:var(--muted)">—</span>';return '<span class="est-calc">Calculating…</span>';}
  function estRow(e){return '<tr><td><span class="est-ref">'+e.ref+'</span></td>'+
    '<td><div class="est-cust"><div style="min-width:0"><div class="est-name">'+e.customer+'</div><div class="est-sub">'+e.email+'</div></div></div></td>'+
    '<td><div class="est-route">'+UP_ARROW+'<span class="est-loc">'+e.pickup+'</span></div><div class="est-sub" style="padding-left:29px">'+e.pickupSub+'</div></td>'+
    '<td><div class="est-route">'+DOWN_ARROW+'<span class="est-loc">'+e.drop+'</span></div><div class="est-sub" style="padding-left:29px">'+e.dropSub+'</div></td>'+
    '<td><span class="est-chip">'+e.container+'</span><div class="est-sub">'+e.miles+' mi</div></td>'+
    '<td>'+estPrice(e)+'</td><td>'+estBadge(e.status)+'</td><td>'+estStream(e)+'</td>'+
    '<td><span class="est-time">'+CLOCK_ICON+e.created+'</span></td>'+
    '<td><a href="__B__/dryge/#quote" class="est-view">View<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14M13 6l6 6-6 6"/></svg></a></td></tr>';}
  const estTbody=document.getElementById('estTbody'),estSearch=document.getElementById('estSearch'),estStatus=document.getElementById('estStatus'),estCount=document.getElementById('estCount');
  function estApply(){const q=(estSearch.value||'').toLowerCase().trim(),st=estStatus.value;const rows=ESTIMATES.filter(e=>{const okSt=st==='all'||e.status===st;const hay=(e.ref+' '+e.customer+' '+e.email+' '+e.pickup+' '+e.drop).toLowerCase();return okSt&&(!q||hay.includes(q));});estTbody.innerHTML=rows.length?rows.map(estRow).join(''):'<tr><td colspan="10" class="est-empty">No estimates match your filters.</td></tr>';estCount.textContent=rows.length;}
  if(estTbody){
    estApply();
    estSearch.addEventListener('input',estApply);estStatus.addEventListener('change',estApply);document.getElementById('estDate').addEventListener('change',estApply);
    setInterval(()=>{let done=false;ESTIMATES.forEach(e=>{if(e.status==='streaming'){e.stream=Math.min(100,e.stream+(4+Math.random()*9));if(e.stream>=100){e.status='completed';e.price=e.finalPrice||'$—';done=true;}}});if(done){estApply();}else{ESTIMATES.forEach(e=>{if(e.status==='streaming'){const f=estTbody.querySelector('[data-fill="'+e.ref+'"]'),l=estTbody.querySelector('[data-label="'+e.ref+'"]');if(f)f.style.width=Math.round(e.stream)+'%';if(l)l.textContent=Math.round(e.stream)+'%';}});}},1100);
  }
</script>
@endpush
