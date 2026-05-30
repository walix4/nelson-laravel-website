<!DOCTYPE html>
<html lang="en" class="scroll-smooth">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>DrayageRate · The drayage pricing network for North America</title>
  <meta name="description" content="Instant drayage quotes across every major U.S. and Canadian port. Watch your freight move from port to door — in real time." />

  <script src="https://cdn.tailwindcss.com"></script>
  <link rel="stylesheet" href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css" />
  <script src="https://unpkg.com/leaflet@1.9.4/dist/leaflet.js"></script>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&family=Space+Grotesk:wght@500;600;700&display=swap" rel="stylesheet">

  <style>
    :root{
      --navy:#0B1F44; --navy-2:#0A1736; --navy-3:#050B1A;
      --red:#FF3B30; --red-2:#E0241A;
      --blue:#4DA3FF; --blue-2:#7BBCFF;
      --bg:#F8FAFC; --green:#00C16A;
      --ink:#0B1220; --muted:#5B6473;
    }
    *{-webkit-font-smoothing:antialiased;}
    html,body{font-family:'Inter',system-ui,-apple-system,Segoe UI,Roboto,sans-serif;color:var(--ink);background:var(--bg);}
    .display{font-family:'Space Grotesk','Inter',sans-serif;letter-spacing:-0.025em;font-weight:700;}
    .num{font-feature-settings:"tnum","cv01";font-variant-numeric:tabular-nums;}

    .glass{
      background:linear-gradient(180deg, rgba(255,255,255,0.86) 0%, rgba(255,255,255,0.72) 100%);
      backdrop-filter:blur(22px) saturate(180%); -webkit-backdrop-filter:blur(22px) saturate(180%);
      border:1px solid rgba(255,255,255,0.65);
      box-shadow:0 40px 100px -28px rgba(11,31,68,0.55), 0 12px 30px -10px rgba(11,31,68,0.25), inset 0 1px 0 rgba(255,255,255,0.9);
    }
    .glass-dark{
      background:linear-gradient(180deg, rgba(11,31,68,0.78), rgba(11,31,68,0.62));
      backdrop-filter:blur(18px) saturate(160%); -webkit-backdrop-filter:blur(18px) saturate(160%);
      border:1px solid rgba(255,255,255,0.1); color:#fff;
    }
    .glass-pill{ background:rgba(255,255,255,0.08); backdrop-filter:blur(14px); -webkit-backdrop-filter:blur(14px); border:1px solid rgba(255,255,255,0.16); }

    .port-icon{position:relative;width:14px;height:14px;pointer-events:auto;}
    .port-icon .dot{position:absolute;left:50%;top:50%;transform:translate(-50%,-50%);width:9px;height:9px;border-radius:50%;background:var(--blue);box-shadow:0 0 12px var(--blue),0 0 26px rgba(77,163,255,0.55);z-index:3;border:1.5px solid #fff;}
    .port-icon .ring{position:absolute;left:50%;top:50%;transform:translate(-50%,-50%);width:14px;height:14px;border-radius:50%;border:2px solid var(--blue);opacity:0.9;animation:pulseRing 2.6s ease-out infinite;}
    .port-icon.origin .dot{background:var(--red);box-shadow:0 0 16px var(--red),0 0 32px rgba(255,59,48,0.6);}
    .port-icon.origin .ring{border-color:var(--red);}
    .port-icon.destination .dot{background:var(--green);box-shadow:0 0 14px var(--green),0 0 28px rgba(0,193,106,0.6);}
    .port-icon.destination .ring{border-color:var(--green);}
    .port-icon .label{position:absolute;left:18px;top:-3px;white-space:nowrap;font-size:10px;font-weight:600;letter-spacing:0.04em;color:rgba(255,255,255,0.85);text-shadow:0 1px 6px rgba(0,0,0,0.8);pointer-events:none;}
    @keyframes pulseRing{0%{width:14px;height:14px;opacity:0.9;}100%{width:60px;height:60px;opacity:0;}}

    .truck-icon{width:32px;height:18px;border-radius:3px;background:linear-gradient(180deg,#FFD23F,#F2A516);border:1.5px solid #1A1A1A;box-shadow:0 4px 14px rgba(0,0,0,0.55),0 0 18px rgba(255,210,63,0.6);position:relative;}
    .truck-icon::before{content:"";position:absolute;left:-9px;top:1px;width:9px;height:14px;border-radius:2px;background:linear-gradient(180deg,#FF3B30,#C7241A);border:1.5px solid #1A1A1A;}

    .leaflet-container{background:#03070F !important;font-family:inherit;}
    .leaflet-control-attribution{background:rgba(11,31,68,0.55)!important;color:rgba(255,255,255,0.42)!important;backdrop-filter:blur(6px);font-size:9px!important;border-radius:6px 0 0 0;}
    .leaflet-control-attribution a{color:rgba(255,255,255,0.65)!important;}
    .leaflet-control-zoom a{background:rgba(11,31,68,0.85)!important;color:#fff!important;border:1px solid rgba(255,255,255,0.1)!important;}
    .leaflet-control-zoom a:hover{background:rgba(77,163,255,0.85)!important;}
    .leaflet-tile-pane{filter:saturate(1.1) contrast(1.02);}

    .leaflet-overlay-pane .route-line{stroke:#FF3B30;stroke-width:3.2;fill:none;filter:drop-shadow(0 0 8px rgba(255,59,48,0.7));stroke-linecap:round;}
    .leaflet-overlay-pane .route-line-draw{stroke-dasharray:var(--len,1200);stroke-dashoffset:var(--len,1200);animation:drawLine 1.6s cubic-bezier(.65,.05,.36,1) forwards;}
    @keyframes drawLine{to{stroke-dashoffset:0;}}
    .leaflet-overlay-pane .corridor{stroke:rgba(77,163,255,0.35);stroke-width:1.1;fill:none;stroke-dasharray:3 7;animation:dashFlow 9s linear infinite;}
    @keyframes dashFlow{from{stroke-dashoffset:0;}to{stroke-dashoffset:-60;}}
    .leaflet-overlay-pane .corridor-warm{stroke:rgba(255,59,48,0.28);}

    .input{width:100%;padding:0.85rem 1rem;border:1px solid rgba(11,31,68,0.12);border-radius:10px;background:rgba(255,255,255,0.7);font-size:0.92rem;color:var(--ink);transition:border-color .2s,box-shadow .2s,background .2s;}
    .input:focus{outline:none;border-color:var(--blue);box-shadow:0 0 0 4px rgba(77,163,255,0.18);background:#fff;}
    select.input{appearance:none;-webkit-appearance:none;background-image:url("data:image/svg+xml;charset=UTF-8,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 20 20' fill='%230B1F44'%3e%3cpath fill-rule='evenodd' d='M5.23 7.21a.75.75 0 011.06.02L10 11.06l3.71-3.83a.75.75 0 111.08 1.04l-4.25 4.39a.75.75 0 01-1.08 0L5.21 8.27a.75.75 0 01.02-1.06z' clip-rule='evenodd'/%3e%3c/svg%3e");background-repeat:no-repeat;background-position:right .8rem center;background-size:1.1rem;padding-right:2.4rem;}
    .input-label{font-size:11px;font-weight:700;letter-spacing:0.08em;color:var(--navy);text-transform:uppercase;}

    .btn-primary{background:linear-gradient(180deg,var(--red) 0%,var(--red-2) 100%);color:#fff;font-weight:600;letter-spacing:0.02em;border:1px solid rgba(255,255,255,0.18);box-shadow:0 14px 30px -10px rgba(255,59,48,0.55),inset 0 1px 0 rgba(255,255,255,0.4);transition:transform .2s cubic-bezier(.2,.7,.2,1),box-shadow .2s,filter .2s;}
    .btn-primary:hover{transform:translateY(-1px);box-shadow:0 20px 40px -10px rgba(255,59,48,0.7),inset 0 1px 0 rgba(255,255,255,0.5);filter:saturate(1.1);}
    .btn-primary.loading .label{opacity:0;}
    .btn-primary.loading .spinner{opacity:1;}
    .spinner{position:absolute;inset:0;display:flex;align-items:center;justify-content:center;opacity:0;transition:opacity .2s;}
    .spinner::after{content:"";width:18px;height:18px;border:2.5px solid rgba(255,255,255,0.35);border-top-color:#fff;border-radius:50%;animation:spin .8s linear infinite;}
    @keyframes spin{to{transform:rotate(360deg);}}
    .btn-ghost{background:rgba(255,255,255,0.06);border:1px solid rgba(255,255,255,0.18);color:#fff;backdrop-filter:blur(10px);transition:all .2s;}
    .btn-ghost:hover{background:rgba(255,255,255,0.12);border-color:rgba(255,255,255,0.32);}

    .marquee-track{display:flex;gap:4rem;width:max-content;animation:marq 38s linear infinite;}
    @keyframes marq{from{transform:translateX(0);}to{transform:translateX(-50%);}}

    .reveal{opacity:0;transform:translateY(28px);transition:opacity .9s cubic-bezier(.2,.7,.2,1),transform .9s cubic-bezier(.2,.7,.2,1);}
    .reveal.in{opacity:1;transform:translateY(0);}
    .reveal-delay-1{transition-delay:.08s;}
    .reveal-delay-2{transition-delay:.16s;}
    .reveal-delay-3{transition-delay:.24s;}

    .scene{perspective:1600px;perspective-origin:50% 40%;}
    .box3d{position:relative;width:260px;height:140px;transform-style:preserve-3d;transform:rotateX(14deg) rotateY(-32deg);animation:floatBox 6s ease-in-out infinite;}
    @keyframes floatBox{0%,100%{transform:rotateX(14deg) rotateY(-32deg) translateY(0);}50%{transform:rotateX(14deg) rotateY(-32deg) translateY(-16px);}}
    .face{position:absolute;border:1px solid rgba(0,0,0,0.35);background-image:repeating-linear-gradient(180deg,rgba(0,0,0,0.18) 0 2px,transparent 2px 10px);background-color:#E0241A;}
    .face.front{width:260px;height:140px;background-color:#FF3B30;transform:translateZ(70px);}
    .face.back {width:260px;height:140px;background-color:#9F1812;transform:rotateY(180deg) translateZ(70px);}
    .face.right{width:140px;height:140px;background-color:#C7241A;transform:rotateY(90deg) translateZ(190px);}
    .face.left {width:140px;height:140px;background-color:#C7241A;transform:rotateY(-90deg) translateZ(70px);}
    .face.top  {width:260px;height:140px;background-color:#FF5448;transform:rotateX(90deg) translateZ(70px);background-image:none;}
    .face.bot  {width:260px;height:140px;background-color:#7B100B;transform:rotateX(-90deg) translateZ(70px);background-image:none;}
    .box-label{position:absolute;left:18px;bottom:12px;font-family:'Space Grotesk',sans-serif;font-weight:700;color:rgba(255,255,255,0.95);font-size:13px;letter-spacing:0.1em;}
    .box-no{position:absolute;right:18px;top:12px;font-family:'Space Grotesk',sans-serif;font-weight:600;color:rgba(255,255,255,0.85);font-size:11px;letter-spacing:0.08em;}
    .floating-tag{position:absolute;pointer-events:none;animation:floatTag 5.5s ease-in-out infinite;}
    @keyframes floatTag{0%,100%{transform:translateY(0);}50%{transform:translateY(-10px);}}

    .bento-card{position:relative;overflow:hidden;transition:transform .35s cubic-bezier(.2,.7,.2,1);}
    .bento-card::after{content:"";position:absolute;inset:0;border-radius:inherit;pointer-events:none;background:radial-gradient(600px circle at var(--mx,50%) var(--my,50%),rgba(77,163,255,0.18),transparent 40%);opacity:0;transition:opacity .3s;}
    .bento-card:hover{transform:translateY(-4px);}
    .bento-card:hover::after{opacity:1;}

    .calc-tilt{transition:transform .12s linear;transform-style:preserve-3d;}

    .live-dot{display:inline-block;width:7px;height:7px;border-radius:50%;background:var(--green);box-shadow:0 0 0 0 rgba(0,193,106,0.6);animation:livePulse 1.8s ease-out infinite;}
    @keyframes livePulse{0%{box-shadow:0 0 0 0 rgba(0,193,106,0.55);}70%{box-shadow:0 0 0 8px rgba(0,193,106,0);}100%{box-shadow:0 0 0 0 rgba(0,193,106,0);}}

    .grid-bg{background-image:radial-gradient(1200px 600px at 20% 10%,rgba(77,163,255,0.18),transparent 60%),radial-gradient(900px 500px at 90% 30%,rgba(255,59,48,0.16),transparent 55%),linear-gradient(180deg,#050B1A 0%,#0B1F44 100%);}
    .no-scrollbar::-webkit-scrollbar{display:none;} .no-scrollbar{-ms-overflow-style:none;scrollbar-width:none;}
  </style>
</head>
<body class="overflow-x-hidden">

  <!-- Live status strip -->
  <div class="bg-[#03070F] text-white/80 text-[11px] font-medium border-b border-white/5">
    <div class="max-w-[1400px] mx-auto px-6 h-8 flex items-center justify-between">
      <div class="flex items-center gap-5">
        <span class="flex items-center gap-2"><span class="live-dot"></span><span>Network <b class="text-white">LIVE</b></span></span>
        <span class="hidden sm:inline opacity-70">·</span>
        <span class="hidden sm:inline num"><b id="liveRoutes" class="text-white">12,431</b> active routes</span>
        <span class="hidden md:inline opacity-70">·</span>
        <span class="hidden md:inline num">Diesel <b class="text-white">$5.18</b>/gal · FSC <b class="text-white">17%</b></span>
      </div>
      <div class="flex items-center gap-4 text-[10px] uppercase tracking-[0.14em]">
        <span class="opacity-60">v2026.05</span>
        <a href="#api" class="opacity-80 hover:opacity-100">API status</a>
      </div>
    </div>
  </div>

  <!-- Header -->
  <header class="sticky top-0 z-40 bg-[#03070F]/85 backdrop-blur-xl border-b border-white/5">
    <div class="max-w-[1400px] mx-auto px-6 h-16 flex items-center justify-between">
      <a href="./" class="flex items-center gap-2.5">
        <span class="relative w-9 h-9 rounded-lg flex items-center justify-center text-white font-extrabold text-sm" style="background:linear-gradient(135deg,#FF3B30,#E0241A);box-shadow:0 6px 20px -4px rgba(255,59,48,0.6);">
          DR
          <span class="absolute -top-1 -right-1 w-2 h-2 rounded-full bg-[var(--green)] ring-2 ring-[#03070F]"></span>
        </span>
        <span class="display text-lg text-white">DrayageRate</span>
      </a>
      <nav class="hidden md:flex items-center gap-7 text-[13px] font-medium text-white/75">
        <a href="#network" class="hover:text-white">Network</a>
        <a href="#how" class="hover:text-white">How it works</a>
        <a href="#features" class="hover:text-white">Platform</a>
        <a href="#pricing" class="hover:text-white">Pricing</a>
        <a href="#api" class="hover:text-white">Developers</a>
      </nav>
      <div class="flex items-center gap-2.5">
        <a href="#login" class="hidden sm:inline text-[13px] font-medium text-white/80 hover:text-white px-3 py-1.5">Sign in</a>
        <a href="#quote" class="btn-primary text-[13px] px-4 py-2 rounded-lg inline-flex items-center gap-1.5">
          <span class="label">Get instant quote</span>
        </a>
      </div>
    </div>
  </header>

  <!-- HERO -->
  <section class="relative grid-bg overflow-hidden">
    <div class="max-w-[1400px] mx-auto px-6 pt-10 pb-6 relative z-10">
      <div class="flex flex-wrap items-end justify-between gap-6">
        <div class="max-w-2xl">
          <div class="glass-pill inline-flex items-center gap-2 px-3 py-1 rounded-full text-[11px] font-semibold text-white/90 tracking-wide">
            <span class="live-dot"></span> The drayage pricing network · North America
          </div>
          <h1 class="display text-white mt-4 text-[30px] md:text-[40px] leading-[1.08] max-w-xl">
            Drayage quotes, port to door —
            <span style="background:linear-gradient(90deg,#FF3B30,#FF8470 45%,#4DA3FF);-webkit-background-clip:text;background-clip:text;color:transparent;">priced in 30 seconds.</span>
          </h1>
          <p class="mt-3 text-white/65 text-[14px] max-w-md">
            Live diesel, FSC, chassis & port fees across every major U.S. & Canadian port.
          </p>
        </div>
        <div class="flex items-center gap-6 text-[11px] uppercase tracking-[0.16em] text-white/55">
          <div><div class="text-[22px] display num text-white" data-count="50">0</div><div>Ports</div></div>
          <div class="h-8 w-px bg-white/15"></div>
          <div><div class="text-[22px] display num text-white" data-count="1200" data-suffix="+">0</div><div>Lanes</div></div>
          <div class="h-8 w-px bg-white/15"></div>
          <div><div class="text-[22px] display num text-white" data-count="250000" data-suffix="+">0</div><div>Quotes</div></div>
        </div>
      </div>
    </div>

    <div class="max-w-[1400px] mx-auto px-6 pb-10 relative z-10">
      <div class="relative grid lg:grid-cols-[1.55fr_1fr] gap-5">
        <!-- MAP -->
        <div class="relative rounded-2xl overflow-hidden border border-white/8" style="height:min(640px,72vh);box-shadow:0 30px 80px -20px rgba(0,0,0,0.7);">
          <div id="map" class="absolute inset-0"></div>

          <div class="absolute top-4 left-4 glass-dark rounded-xl px-3.5 py-2.5 text-[11px] z-[600]">
            <div class="flex items-center gap-2 text-white/60 uppercase tracking-[0.14em] text-[10px]"><span class="live-dot"></span> Active corridor</div>
            <div class="display text-white text-[13px] mt-1.5" id="activeCorridor">Los Angeles · Port complex</div>
            <div class="num text-white/70 mt-0.5">Throughput · <b class="text-white">9.2M TEU</b> / yr</div>
          </div>

          <div class="absolute top-4 right-4 glass-dark rounded-xl px-3.5 py-2.5 text-[11px] z-[600] hidden sm:block">
            <div class="text-white/60 uppercase tracking-[0.14em] text-[10px]">Live · last 60s</div>
            <div class="flex items-center gap-4 mt-1.5">
              <div><div class="display text-white text-[14px] num"><span id="liveQuotes">412</span></div><div class="text-white/55">Quotes</div></div>
              <div class="h-7 w-px bg-white/15"></div>
              <div><div class="display text-white text-[14px] num"><span id="liveAvg">$1,847</span></div><div class="text-white/55">Avg rate</div></div>
            </div>
          </div>

          <div class="absolute left-4 right-4 bottom-4 glass-dark rounded-xl px-4 py-3 z-[600] flex flex-wrap items-center justify-between gap-3 text-[11px]">
            <div class="flex items-center gap-2 text-white/70">
              <span class="w-1.5 h-1.5 rounded-full bg-[var(--red)]"></span><span>Origin</span>
              <span class="ml-3 w-1.5 h-1.5 rounded-full bg-[var(--green)]"></span><span>Destination</span>
              <span class="ml-3 w-1.5 h-1.5 rounded-full bg-[var(--blue)]"></span><span>Port</span>
            </div>
            <div class="flex flex-wrap gap-2">
              <button data-preset="LAX-DAL" class="glass-pill px-3 py-1.5 rounded-full text-white/80 hover:text-white">LA → Dallas</button>
              <button data-preset="NYNJ-CHI" class="glass-pill px-3 py-1.5 rounded-full text-white/80 hover:text-white">NY/NJ → Chicago</button>
              <button data-preset="SAV-ATL" class="glass-pill px-3 py-1.5 rounded-full text-white/80 hover:text-white">Savannah → Atlanta</button>
            </div>
          </div>
        </div>

        <!-- CALCULATOR -->
        <div id="quote" class="relative">
          <div id="calcCard" class="calc-tilt glass rounded-2xl p-5 md:p-6 lg:p-7">
            <div class="flex items-center justify-between">
              <div>
                <div class="text-[10px] uppercase tracking-[0.16em] font-bold text-[var(--navy)]/70">Instant quote engine</div>
                <h2 class="display text-[24px] md:text-[26px] text-[var(--navy)] mt-1">Price your move</h2>
              </div>
              <div class="px-2.5 py-1 rounded-full text-[10px] font-semibold text-[var(--navy)] bg-[var(--navy)]/8 border border-[var(--navy)]/10">v2026</div>
            </div>

            <form id="quoteForm" class="mt-5 space-y-3.5">
              <div>
                <label class="input-label">Origin port / ramp</label>
                <select id="originSel" class="input mt-1.5" required></select>
              </div>
              <div>
                <label class="input-label">Destination city</label>
                <select id="destSel" class="input mt-1.5" required></select>
              </div>
              <div class="grid grid-cols-2 gap-3">
                <div>
                  <label class="input-label">Container</label>
                  <select id="contType" class="input mt-1.5">
                    <option value="40">40' Standard</option>
                    <option value="40hc">40' High Cube</option>
                    <option value="20">20' Standard</option>
                    <option value="45hc">45' High Cube</option>
                    <option value="40rf">40' Reefer</option>
                  </select>
                </div>
                <div>
                  <label class="input-label">Qty</label>
                  <input id="contQty" type="number" min="1" value="1" class="input mt-1.5 num" />
                </div>
              </div>
              <div class="grid grid-cols-2 gap-3">
                <div>
                  <label class="input-label">Weight (lb)</label>
                  <input id="contWeight" type="number" min="0" value="32000" class="input mt-1.5 num" />
                </div>
                <div>
                  <label class="input-label">Shipping line</label>
                  <select id="contLine" class="input mt-1.5">
                    <option>Maersk</option><option>MSC</option><option>CMA CGM</option>
                    <option>Hapag-Lloyd</option><option>ONE</option><option>Evergreen</option>
                    <option>COSCO</option><option>Other</option>
                  </select>
                </div>
              </div>
              <div>
                <label class="input-label">Accessorials</label>
                <div class="mt-2 flex flex-wrap gap-1.5 text-[11px]">
                  <label class="cursor-pointer"><input type="checkbox" class="peer hidden" name="acc" value="tolls"><span class="px-2.5 py-1.5 rounded-full border border-[var(--navy)]/15 bg-white/60 text-[var(--navy)]/80 peer-checked:bg-[var(--navy)] peer-checked:text-white peer-checked:border-[var(--navy)] transition inline-block">Tolls</span></label>
                  <label class="cursor-pointer"><input type="checkbox" class="peer hidden" name="acc" value="prepull"><span class="px-2.5 py-1.5 rounded-full border border-[var(--navy)]/15 bg-white/60 text-[var(--navy)]/80 peer-checked:bg-[var(--navy)] peer-checked:text-white peer-checked:border-[var(--navy)] transition inline-block">Pre-pull</span></label>
                  <label class="cursor-pointer"><input type="checkbox" class="peer hidden" name="acc" value="overweight"><span class="px-2.5 py-1.5 rounded-full border border-[var(--navy)]/15 bg-white/60 text-[var(--navy)]/80 peer-checked:bg-[var(--navy)] peer-checked:text-white peer-checked:border-[var(--navy)] transition inline-block">Overweight</span></label>
                  <label class="cursor-pointer"><input type="checkbox" class="peer hidden" name="acc" value="hazmat"><span class="px-2.5 py-1.5 rounded-full border border-[var(--navy)]/15 bg-white/60 text-[var(--navy)]/80 peer-checked:bg-[var(--navy)] peer-checked:text-white peer-checked:border-[var(--navy)] transition inline-block">Hazmat</span></label>
                  <label class="cursor-pointer"><input type="checkbox" class="peer hidden" name="acc" value="reefer"><span class="px-2.5 py-1.5 rounded-full border border-[var(--navy)]/15 bg-white/60 text-[var(--navy)]/80 peer-checked:bg-[var(--navy)] peer-checked:text-white peer-checked:border-[var(--navy)] transition inline-block">Reefer plug</span></label>
                </div>
              </div>

              <button id="calcBtn" type="submit" class="btn-primary relative w-full py-3.5 rounded-xl text-[14px] font-semibold mt-1.5">
                <span class="label inline-flex items-center justify-center gap-2">Calculate instant rate</span>
                <span class="spinner"></span>
              </button>
              <p class="text-[10px] text-[var(--navy)]/55 text-center">No login · No card · Rates lock for 24h</p>
            </form>

            <div id="resultPanel" class="hidden mt-5 pt-5 border-t border-[var(--navy)]/10">
              <div class="flex items-end justify-between">
                <div>
                  <div class="text-[10px] uppercase tracking-[0.16em] font-bold text-[var(--green)]">Live rate</div>
                  <div class="flex items-baseline gap-2 mt-1">
                    <span class="display text-[36px] text-[var(--navy)] num">$<span id="rTotal">0</span></span>
                    <span class="text-[12px] text-[var(--navy)]/60">/ round trip</span>
                  </div>
                </div>
                <div class="text-right text-[11px] text-[var(--navy)]/70">
                  <div><span class="num"><b id="rMiles">0</b></span> mi total</div>
                  <div><span class="num"><b id="rEta">0</b></span> hr transit</div>
                </div>
              </div>
              <div class="mt-3 grid grid-cols-3 gap-2 text-[10px]">
                <div class="rounded-lg px-2 py-2 bg-[var(--navy)]/5 border border-[var(--navy)]/10"><div class="text-[var(--navy)]/55 uppercase tracking-wider">Fuel</div><div class="display text-[var(--navy)] text-[14px] num mt-0.5">$<span id="rFuel">0</span></div></div>
                <div class="rounded-lg px-2 py-2 bg-[var(--navy)]/5 border border-[var(--navy)]/10"><div class="text-[var(--navy)]/55 uppercase tracking-wider">Labor</div><div class="display text-[var(--navy)] text-[14px] num mt-0.5">$<span id="rLabor">0</span></div></div>
                <div class="rounded-lg px-2 py-2 bg-[var(--navy)]/5 border border-[var(--navy)]/10"><div class="text-[var(--navy)]/55 uppercase tracking-wider">Chassis</div><div class="display text-[var(--navy)] text-[14px] num mt-0.5">$<span id="rChassis">0</span></div></div>
                <div class="rounded-lg px-2 py-2 bg-[var(--navy)]/5 border border-[var(--navy)]/10"><div class="text-[var(--navy)]/55 uppercase tracking-wider">Port</div><div class="display text-[var(--navy)] text-[14px] num mt-0.5">$<span id="rPort">0</span></div></div>
                <div class="rounded-lg px-2 py-2 bg-[var(--navy)]/5 border border-[var(--navy)]/10"><div class="text-[var(--navy)]/55 uppercase tracking-wider">Overhead</div><div class="display text-[var(--navy)] text-[14px] num mt-0.5">$<span id="rOverhead">0</span></div></div>
                <div class="rounded-lg px-2 py-2 bg-[var(--navy)]/5 border border-[var(--navy)]/10"><div class="text-[var(--navy)]/55 uppercase tracking-wider">Access.</div><div class="display text-[var(--navy)] text-[14px] num mt-0.5">$<span id="rAcc">0</span></div></div>
              </div>
              <div class="mt-3 flex items-center gap-2">
                <button class="flex-1 py-2.5 rounded-lg text-[12px] font-semibold bg-[var(--navy)] text-white hover:bg-[var(--navy-2)]">Export PDF</button>
                <button class="flex-1 py-2.5 rounded-lg text-[12px] font-semibold border border-[var(--navy)]/20 text-[var(--navy)] hover:bg-[var(--navy)]/5">Request booking</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>

  <!-- Trust marquee -->
  <section class="py-10 bg-white border-y border-black/5">
    <div class="max-w-[1400px] mx-auto px-6">
      <div class="text-center text-[11px] uppercase tracking-[0.2em] font-semibold text-[var(--navy)]/55 reveal">Trusted by brokers, freight forwarders, importers & 3PLs</div>
      <div class="mt-6 overflow-hidden no-scrollbar" style="mask-image:linear-gradient(90deg,transparent,#000 12%,#000 88%,transparent);-webkit-mask-image:linear-gradient(90deg,transparent,#000 12%,#000 88%,transparent);">
        <div class="marquee-track">
          <div class="flex gap-12 items-center text-[var(--navy)]/55">
            <span class="display text-[20px] whitespace-nowrap">CARGOMAX</span>
            <span class="display text-[20px] italic whitespace-nowrap">portlink</span>
            <span class="display text-[20px] whitespace-nowrap">◆ NORDFREIGHT</span>
            <span class="display text-[20px] whitespace-nowrap">veritas3pl</span>
            <span class="display text-[20px] whitespace-nowrap">▲ ARC LOGISTICS</span>
            <span class="display text-[20px] whitespace-nowrap">Halo Freight</span>
            <span class="display text-[20px] whitespace-nowrap">CONTAINERWORKS</span>
            <span class="display text-[20px] whitespace-nowrap">⬢ Meridian Drayage</span>
            <span class="display text-[20px] whitespace-nowrap">Atlas BCO</span>
            <span class="display text-[20px] whitespace-nowrap">↗ Northstar Cargo</span>
          </div>
          <div class="flex gap-12 items-center text-[var(--navy)]/55" aria-hidden="true">
            <span class="display text-[20px] whitespace-nowrap">CARGOMAX</span>
            <span class="display text-[20px] italic whitespace-nowrap">portlink</span>
            <span class="display text-[20px] whitespace-nowrap">◆ NORDFREIGHT</span>
            <span class="display text-[20px] whitespace-nowrap">veritas3pl</span>
            <span class="display text-[20px] whitespace-nowrap">▲ ARC LOGISTICS</span>
            <span class="display text-[20px] whitespace-nowrap">Halo Freight</span>
            <span class="display text-[20px] whitespace-nowrap">CONTAINERWORKS</span>
            <span class="display text-[20px] whitespace-nowrap">⬢ Meridian Drayage</span>
            <span class="display text-[20px] whitespace-nowrap">Atlas BCO</span>
            <span class="display text-[20px] whitespace-nowrap">↗ Northstar Cargo</span>
          </div>
        </div>
      </div>
    </div>
  </section>

  <!-- HOW IT WORKS -->
  <section id="how" class="py-24 bg-[var(--bg)]">
    <div class="max-w-[1400px] mx-auto px-6">
      <div class="flex items-end justify-between flex-wrap gap-6 reveal">
        <div class="max-w-xl">
          <div class="text-[11px] uppercase tracking-[0.18em] font-semibold text-[var(--red)]">How it works</div>
          <h2 class="display text-[40px] md:text-[48px] text-[var(--navy)] leading-[1.05] mt-2">Quote, route, book — one continuous flow.</h2>
        </div>
        <p class="max-w-md text-[var(--muted)] text-[15px]">From the first input to a customer-ready PDF, every drayage move is priced and visualized in under a minute.</p>
      </div>
      <div class="mt-14 relative">
        <div class="hidden md:block absolute left-0 right-0 top-7 h-px bg-gradient-to-r from-transparent via-[var(--navy)]/15 to-transparent"></div>
        <div id="stepsGrid" class="grid md:grid-cols-5 gap-6"></div>
      </div>
    </div>
  </section>

  <!-- NETWORK -->
  <section id="network" class="py-24 bg-[#03070F] text-white relative overflow-hidden">
    <div class="absolute inset-0 opacity-[0.07]" style="background:radial-gradient(circle at 25% 20%,#4DA3FF 0%,transparent 40%),radial-gradient(circle at 80% 70%,#FF3B30 0%,transparent 45%);"></div>
    <div class="max-w-[1400px] mx-auto px-6 relative">
      <div class="grid lg:grid-cols-[1fr_1.4fr] gap-12 items-center">
        <div class="reveal">
          <div class="text-[11px] uppercase tracking-[0.18em] font-semibold text-[var(--blue)]">North American network</div>
          <h2 class="display text-[40px] md:text-[48px] leading-[1.05] mt-2">One rate engine. Every container port from Seattle to Savannah.</h2>
          <p class="mt-5 text-white/70 max-w-md text-[15px]">Real-time pricing across 50+ port complexes, every Class I rail ramp, and 1,200+ inland delivery destinations — covered by 2,800+ carrier partners on the platform.</p>
          <div class="mt-8 grid grid-cols-2 gap-3 text-[12px]">
            <div class="glass-dark rounded-lg p-3"><div class="text-white/55 text-[10px] uppercase tracking-wider">West coast</div><div class="display text-white text-[16px] mt-0.5">LAX · LGB · OAK · SEA</div></div>
            <div class="glass-dark rounded-lg p-3"><div class="text-white/55 text-[10px] uppercase tracking-wider">East coast</div><div class="display text-white text-[16px] mt-0.5">NY/NJ · NOR · SAV · CHA</div></div>
            <div class="glass-dark rounded-lg p-3"><div class="text-white/55 text-[10px] uppercase tracking-wider">Gulf</div><div class="display text-white text-[16px] mt-0.5">HOU · MIA</div></div>
            <div class="glass-dark rounded-lg p-3"><div class="text-white/55 text-[10px] uppercase tracking-wider">Canada</div><div class="display text-white text-[16px] mt-0.5">VAN · MTL · HAL</div></div>
          </div>
        </div>
        <div class="reveal reveal-delay-1">
          <div class="relative rounded-2xl overflow-hidden border border-white/8" style="height:520px;box-shadow:0 30px 80px -20px rgba(0,0,0,0.8);">
            <div id="map2" class="absolute inset-0"></div>
            <div class="absolute top-4 left-4 glass-dark rounded-xl px-3.5 py-2.5 text-[11px] z-[600]">
              <div class="text-white/55 uppercase tracking-[0.12em] text-[10px]">Hovered hub</div>
              <div class="display text-white text-[14px] mt-1" id="hubName">Chicago</div>
              <div class="num text-white/70 mt-1"><b class="text-white" id="hubTime">36 hr</b> avg transit · <b class="text-white" id="hubRate">$1,920</b> avg</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>

  <!-- COST CARDS -->
  <section class="py-24 relative overflow-hidden" style="background:linear-gradient(180deg,#F8FAFC,#EEF2F8);">
    <div class="absolute inset-0 opacity-50 pointer-events-none" style="background:radial-gradient(800px 400px at 80% 10%,rgba(77,163,255,0.18),transparent 60%),radial-gradient(700px 400px at 10% 80%,rgba(255,59,48,0.13),transparent 60%);"></div>
    <div class="max-w-[1400px] mx-auto px-6 relative">
      <div class="max-w-2xl reveal">
        <div class="text-[11px] uppercase tracking-[0.18em] font-semibold text-[var(--red)]">Cost transparency</div>
        <h2 class="display text-[40px] md:text-[48px] text-[var(--navy)] leading-[1.05] mt-2">Every dollar in the quote, accounted for.</h2>
        <p class="mt-4 text-[var(--muted)] text-[15px]">No mystery FSCs. No surprise accessorials at delivery. Six cost components on every quote — priced from live market data.</p>
      </div>
      <div id="costGrid" class="mt-12 grid md:grid-cols-3 lg:grid-cols-6 gap-4"></div>
    </div>
  </section>

  <!-- BENTO FEATURES -->
  <section id="features" class="py-24 bg-white">
    <div class="max-w-[1400px] mx-auto px-6">
      <div class="flex items-end justify-between flex-wrap gap-6 reveal">
        <div class="max-w-2xl">
          <div class="text-[11px] uppercase tracking-[0.18em] font-semibold text-[var(--blue)]">The platform</div>
          <h2 class="display text-[40px] md:text-[48px] text-[var(--navy)] leading-[1.05] mt-2">Not a calculator. A drayage operating system.</h2>
        </div>
        <a href="#features" class="text-[13px] font-semibold text-[var(--navy)] hover:underline">All platform capabilities →</a>
      </div>

      <div class="mt-10 grid md:grid-cols-3 lg:grid-cols-4 gap-4 auto-rows-[180px]">
        <div class="bento-card md:col-span-2 lg:col-span-2 md:row-span-2 rounded-2xl p-6 relative" style="background:linear-gradient(135deg,#0B1F44 0%,#1A3070 100%);color:#fff;">
          <div class="relative z-10">
            <div class="text-[10px] uppercase tracking-[0.16em] text-white/65">01 / Instant quotes</div>
            <h3 class="display text-[26px] mt-2 leading-tight">From input to priced route in <span style="color:#FF8470;">&lt; 30 seconds</span>.</h3>
            <p class="text-white/70 text-[13px] mt-3 max-w-md">Every quote rebuilt against live diesel, FSC, chassis pool rates and per-port dwell. No spreadsheets. No revisions.</p>
          </div>
          <div class="absolute right-0 bottom-0 w-64 h-64 opacity-90" style="background:radial-gradient(circle at center,rgba(255,59,48,0.35),transparent 60%);"></div>
          <svg class="absolute right-4 bottom-4 opacity-85" width="160" height="120" viewBox="0 0 160 120" fill="none">
            <path d="M5 95 Q 50 30, 100 60 T 155 25" stroke="#FF3B30" stroke-width="2.5" fill="none" stroke-linecap="round" />
            <circle cx="155" cy="25" r="6" fill="#FF3B30"/>
            <circle cx="5" cy="95" r="4" fill="#4DA3FF"/>
          </svg>
        </div>

        <div class="bento-card rounded-2xl p-5 relative overflow-hidden" style="background:linear-gradient(160deg,#EFF4FB,#DCE6F4);">
          <div class="text-[10px] uppercase tracking-[0.16em] font-bold text-[var(--navy)]/55">02 / Route visualization</div>
          <h3 class="display text-[18px] text-[var(--navy)] mt-2 leading-tight">Watch the freight move.</h3>
          <p class="text-[var(--navy)]/65 text-[12px] mt-2">Animated lane drawing on every quote.</p>
          <svg class="absolute right-2 bottom-2" width="120" height="80" viewBox="0 0 120 80" fill="none">
            <path d="M10 60 Q 40 10, 70 35 T 115 18" stroke="#4DA3FF" stroke-width="2" stroke-dasharray="4 4" fill="none"/>
            <circle cx="115" cy="18" r="4" fill="#FF3B30"/>
          </svg>
        </div>

        <div class="bento-card rounded-2xl p-5 relative" style="background:linear-gradient(160deg,#FFF,#F1F5FA);border:1px solid rgba(11,31,68,0.06);">
          <div class="text-[10px] uppercase tracking-[0.16em] font-bold text-[var(--navy)]/55">03 / Multi-port</div>
          <h3 class="display text-[18px] text-[var(--navy)] mt-2 leading-tight">Every USA & Canada port.</h3>
          <div class="mt-3 flex flex-wrap gap-1">
            <span class="text-[10px] px-2 py-0.5 rounded-full bg-[var(--navy)]/8 text-[var(--navy)]/75 font-semibold">LAX</span>
            <span class="text-[10px] px-2 py-0.5 rounded-full bg-[var(--navy)]/8 text-[var(--navy)]/75 font-semibold">LGB</span>
            <span class="text-[10px] px-2 py-0.5 rounded-full bg-[var(--navy)]/8 text-[var(--navy)]/75 font-semibold">OAK</span>
            <span class="text-[10px] px-2 py-0.5 rounded-full bg-[var(--navy)]/8 text-[var(--navy)]/75 font-semibold">SEA</span>
            <span class="text-[10px] px-2 py-0.5 rounded-full bg-[var(--navy)]/8 text-[var(--navy)]/75 font-semibold">NY/NJ</span>
            <span class="text-[10px] px-2 py-0.5 rounded-full bg-[var(--navy)]/8 text-[var(--navy)]/75 font-semibold">SAV</span>
            <span class="text-[10px] px-2 py-0.5 rounded-full bg-[var(--navy)]/8 text-[var(--navy)]/75 font-semibold">HOU</span>
            <span class="text-[10px] px-2 py-0.5 rounded-full bg-[var(--navy)]/8 text-[var(--navy)]/75 font-semibold">MIA</span>
            <span class="text-[10px] px-2 py-0.5 rounded-full bg-[var(--navy)]/8 text-[var(--navy)]/75 font-semibold">+42</span>
          </div>
        </div>

        <div class="bento-card rounded-2xl p-5 relative" style="background:linear-gradient(135deg,#FFF,#FFF5F4);border:1px solid rgba(255,59,48,0.12);">
          <div class="text-[10px] uppercase tracking-[0.16em] font-bold text-[var(--red)]">04 / Export</div>
          <h3 class="display text-[18px] text-[var(--navy)] mt-2 leading-tight">PDF · JSON · HTML.</h3>
          <p class="text-[var(--navy)]/60 text-[12px] mt-2">Brand-ready quotes in one click.</p>
        </div>

        <div class="bento-card rounded-2xl p-5 relative md:col-span-2" style="background:#0B1F44;color:#fff;">
          <div class="text-[10px] uppercase tracking-[0.16em] text-white/55">05 / API</div>
          <h3 class="display text-[20px] mt-2 leading-tight">Embed instant rates anywhere.</h3>
          <pre class="mt-3 bg-black/30 rounded-lg p-3 text-[11px] font-mono overflow-x-auto text-[var(--blue-2)] border border-white/8 leading-relaxed"><span style="color:#00C16A">POST</span> /v1/quotes
{
  "origin": "<span style="color:#fff">USLAX</span>",
  "destination": "<span style="color:#fff">Dallas, TX</span>",
  "container": "<span style="color:#fff">40HC</span>"
}</pre>
        </div>

        <div class="bento-card rounded-2xl p-5 relative" style="background:linear-gradient(160deg,#F0FBF5,#DDF6E7);border:1px solid rgba(0,193,106,0.18);">
          <div class="text-[10px] uppercase tracking-[0.16em] font-bold text-[var(--green)]">06 / Broker tools</div>
          <h3 class="display text-[18px] text-[var(--navy)] mt-2 leading-tight">White-label margins.</h3>
          <p class="text-[var(--navy)]/65 text-[12px] mt-2">Markup % per customer, baked into every quote.</p>
        </div>

        <div class="bento-card rounded-2xl p-5 relative" style="background:linear-gradient(160deg,#FFF,#F1F5FA);border:1px solid rgba(11,31,68,0.06);">
          <div class="text-[10px] uppercase tracking-[0.16em] font-bold text-[var(--navy)]/55">07 / Enterprise</div>
          <h3 class="display text-[18px] text-[var(--navy)] mt-2 leading-tight">SSO · SOC 2 · audit log.</h3>
        </div>
      </div>
    </div>
  </section>

  <!-- 3D CONTAINER -->
  <section class="py-28 relative overflow-hidden" style="background:radial-gradient(ellipse at 50% 0%,#0B1F44,#03070F 70%);color:#fff;">
    <div class="absolute inset-0 opacity-30 pointer-events-none" style="background-image:linear-gradient(rgba(255,255,255,0.05) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,0.05) 1px,transparent 1px);background-size:48px 48px;"></div>
    <div class="max-w-[1400px] mx-auto px-6 relative">
      <div class="grid lg:grid-cols-2 gap-12 items-center">
        <div class="reveal">
          <div class="text-[11px] uppercase tracking-[0.18em] font-semibold text-[var(--blue)]">Every container, modeled.</div>
          <h2 class="display text-[40px] md:text-[52px] leading-[1.04] mt-2">A live digital twin of every move on the platform.</h2>
          <p class="text-white/65 mt-5 max-w-lg text-[15px]">Container type, weight, chassis assignment, port dwell — every variable feeds the rate engine. Quotes update as ocean ETAs shift.</p>
          <div class="mt-8 grid grid-cols-2 gap-3 max-w-lg">
            <div class="glass-dark rounded-xl p-4"><div class="text-white/55 text-[10px] uppercase tracking-wider">Container types</div><div class="display num text-[24px] mt-1">12</div></div>
            <div class="glass-dark rounded-xl p-4"><div class="text-white/55 text-[10px] uppercase tracking-wider">Live variables</div><div class="display num text-[24px] mt-1">38</div></div>
            <div class="glass-dark rounded-xl p-4"><div class="text-white/55 text-[10px] uppercase tracking-wider">Reprice latency</div><div class="display num text-[24px] mt-1">120ms</div></div>
            <div class="glass-dark rounded-xl p-4"><div class="text-white/55 text-[10px] uppercase tracking-wider">Quote validity</div><div class="display text-[24px] mt-1">24 hr</div></div>
          </div>
        </div>

        <div class="relative flex items-center justify-center" style="min-height:420px;">
          <div class="scene">
            <div class="box3d">
              <div class="face front"><div class="box-no num">DRG · 2026 · 4520-7</div><div class="box-label">DRAYAGE RATE</div></div>
              <div class="face back"></div><div class="face right"></div><div class="face left"></div>
              <div class="face top"></div><div class="face bot"></div>
            </div>
          </div>
          <div class="floating-tag glass-dark rounded-xl px-3 py-2 text-[11px]" style="top:8%;left:5%;animation-delay:-1s;"><div class="text-white/55 text-[9px] uppercase tracking-wider">Container</div><div class="display text-white">40' High Cube</div></div>
          <div class="floating-tag glass-dark rounded-xl px-3 py-2 text-[11px]" style="top:20%;right:5%;animation-delay:-2.5s;"><div class="text-white/55 text-[9px] uppercase tracking-wider">Weight</div><div class="display text-white num">38,420 lb</div></div>
          <div class="floating-tag glass-dark rounded-xl px-3 py-2 text-[11px]" style="bottom:18%;left:8%;animation-delay:-3.5s;"><div class="text-white/55 text-[9px] uppercase tracking-wider">Chassis</div><div class="display text-white">SACP Pool</div></div>
          <div class="floating-tag glass-dark rounded-xl px-3 py-2 text-[11px]" style="bottom:8%;right:6%;animation-delay:-1.5s;"><div class="text-white/55 text-[9px] uppercase tracking-wider">Dwell</div><div class="display text-white num">2.4 days</div></div>
        </div>
      </div>
    </div>
  </section>

  <!-- STATS -->
  <section class="py-20 bg-white">
    <div class="max-w-[1400px] mx-auto px-6">
      <div class="grid md:grid-cols-4 gap-px bg-[var(--navy)]/8 rounded-2xl overflow-hidden border border-[var(--navy)]/8">
        <div class="bg-white p-8 reveal"><div class="display text-[44px] text-[var(--navy)] num" data-count="250000" data-suffix="+">0</div><div class="text-[var(--muted)] text-[13px] mt-1">Quotes generated</div></div>
        <div class="bg-white p-8 reveal reveal-delay-1"><div class="display text-[44px] text-[var(--navy)] num" data-count="50" data-suffix="+">0</div><div class="text-[var(--muted)] text-[13px] mt-1">Ports supported</div></div>
        <div class="bg-white p-8 reveal reveal-delay-2"><div class="display text-[44px] text-[var(--navy)] num" data-count="1200" data-suffix="+">0</div><div class="text-[var(--muted)] text-[13px] mt-1">Inland destinations</div></div>
        <div class="bg-white p-8 reveal reveal-delay-3"><div class="display text-[44px] text-[var(--navy)] num" data-count="999" data-suffix="‰">0</div><div class="text-[var(--muted)] text-[13px] mt-1">Platform availability</div></div>
      </div>
    </div>
  </section>

  <!-- CTA -->
  <section class="py-24 relative overflow-hidden" style="background:linear-gradient(135deg,#0B1F44 0%,#03070F 60%,#1A3070 100%);">
    <div class="absolute inset-0 opacity-50 pointer-events-none" style="background:radial-gradient(700px 400px at 90% 50%,rgba(255,59,48,0.25),transparent 60%),radial-gradient(600px 400px at 10% 80%,rgba(77,163,255,0.22),transparent 60%);"></div>
    <div class="max-w-[1400px] mx-auto px-6 relative">
      <div class="text-center max-w-3xl mx-auto text-white reveal">
        <div class="glass-pill inline-flex items-center gap-2 px-3 py-1 rounded-full text-[11px] font-semibold text-white/90"><span class="live-dot"></span> Ready when you are</div>
        <h2 class="display text-[44px] md:text-[58px] leading-[1.03] mt-5">Get your drayage quote in seconds.</h2>
        <p class="text-white/70 text-[16px] mt-4">Instant pricing. Full transparency. Nationwide coverage. Built for the brokers, BCOs and 3PLs running North American freight.</p>
        <div class="mt-8 flex items-center justify-center gap-3 flex-wrap">
          <a href="#quote" class="btn-primary px-6 py-3.5 rounded-xl text-[14px] inline-flex items-center gap-2"><span class="label">Run my first quote</span></a>
          <a href="#api" class="btn-ghost px-6 py-3.5 rounded-xl text-[14px]">Talk to platform team</a>
        </div>
      </div>
    </div>
  </section>

  <!-- Footer -->
  <footer class="bg-[#03070F] text-white/70 py-14 border-t border-white/5">
    <div class="max-w-[1400px] mx-auto px-6">
      <div class="grid md:grid-cols-5 gap-8 text-[13px]">
        <div class="md:col-span-2">
          <div class="flex items-center gap-2.5">
            <span class="w-8 h-8 rounded-md flex items-center justify-center text-white font-extrabold text-xs" style="background:linear-gradient(135deg,#FF3B30,#E0241A);">DR</span>
            <span class="display text-white">DrayageRate</span>
          </div>
          <p class="mt-3 max-w-sm text-white/55">The drayage pricing network for North America. Instant rates across every container port from Vancouver to Miami.</p>
          <div class="mt-4 text-[11px] text-white/40 num">© 2026 drayagerate.net · All rights reserved</div>
        </div>
        <div><div class="text-white text-[11px] uppercase tracking-[0.16em] font-semibold mb-3">Platform</div><ul class="space-y-2"><li><a href="#network">Network</a></li><li><a href="#features">Features</a></li><li><a href="#api">API</a></li><li><a href="#pricing">Pricing</a></li></ul></div>
        <div><div class="text-white text-[11px] uppercase tracking-[0.16em] font-semibold mb-3">Company</div><ul class="space-y-2"><li><a href="#about">About</a></li><li><a href="#careers">Careers</a></li><li><a href="#press">Press</a></li><li><a href="#contact">Contact</a></li></ul></div>
        <div><div class="text-white text-[11px] uppercase tracking-[0.16em] font-semibold mb-3">Legal</div><ul class="space-y-2"><li><a href="#privacy">Privacy</a></li><li><a href="#terms">Terms</a></li><li><a href="#dpa">DPA</a></li><li><a href="#status">Status</a></li></ul></div>
      </div>
    </div>
  </footer>

  <script>
  const PORTS = {
    LAX: { name:'Los Angeles',   coords:[33.7395,-118.2596], teu:'9.2M' },
    LGB: { name:'Long Beach',    coords:[33.7536,-118.2169], teu:'9.1M' },
    OAK: { name:'Oakland',       coords:[37.7955,-122.2782], teu:'2.4M' },
    SEA: { name:'Seattle/Tacoma',coords:[47.4097,-122.3331], teu:'3.4M' },
    HOU: { name:'Houston',       coords:[29.7250, -95.0250], teu:'4.0M' },
    SAV: { name:'Savannah',      coords:[32.1330, -81.1430], teu:'5.9M' },
    MIA: { name:'Miami',         coords:[25.7741, -80.1709], teu:'1.2M' },
    NOR: { name:'Norfolk',       coords:[36.9171, -76.2944], teu:'3.5M' },
    NYNJ:{ name:'New York/NJ',   coords:[40.6630, -74.1090], teu:'9.5M' },
  };
  const HUBS = {
    DAL:{name:'Dallas, TX',coords:[32.7767,-96.7970]}, CHI:{name:'Chicago, IL',coords:[41.8781,-87.6298]},
    ATL:{name:'Atlanta, GA',coords:[33.7490,-84.3880]}, MEM:{name:'Memphis, TN',coords:[35.1495,-90.0490]},
    KCM:{name:'Kansas City, MO',coords:[39.0997,-94.5786]}, DEN:{name:'Denver, CO',coords:[39.7392,-104.9903]},
    PHX:{name:'Phoenix, AZ',coords:[33.4484,-112.0740]}, NSH:{name:'Nashville, TN',coords:[36.1627,-86.7816]},
    IND:{name:'Indianapolis, IN',coords:[39.7684,-86.1581]}, SLC:{name:'Salt Lake City, UT',coords:[40.7608,-111.8910]},
  };
  const CORRIDORS = [
    ['LAX','DAL'],['LAX','PHX'],['LAX','DEN'],['LGB','SLC'],
    ['OAK','SLC'],['SEA','DEN'],['SEA','CHI'],
    ['NYNJ','CHI'],['NYNJ','IND'],['NOR','ATL'],
    ['SAV','ATL'],['SAV','NSH'],['HOU','DAL'],['MIA','ATL'],
  ];

  function haversineMiles(a,b){const R=3958.8,t=v=>v*Math.PI/180;const dL=t(b[0]-a[0]),dG=t(b[1]-a[1]);const x=Math.sin(dL/2)**2+Math.cos(t(a[0]))*Math.cos(t(b[0]))*Math.sin(dG/2)**2;return 2*R*Math.asin(Math.min(1,Math.sqrt(x)));}
  function computeQuote(o,d,type,qty,acc){
    const miles=haversineMiles(o,d), mpg=7,diesel=5.18,fscPct=0.17,drvHr=28,speed=50,legs=2;
    const fuel=(miles/mpg)*diesel*(1+fscPct)*legs;
    const labor=((miles/speed)+2.5)*drvHr*legs;
    const chassis=40*Math.max(1,Math.ceil(miles/300));
    const port=75, overhead=160;
    const accCost=(acc.includes('overweight')?125:0)+(acc.includes('hazmat')?180:0)+(acc.includes('reefer')?95:0)+(acc.includes('prepull')?75:0)+(acc.includes('tolls')?Math.round(miles*0.04):0);
    const m=type==='45hc'?1.08:type==='40rf'?1.15:type==='20'?0.88:1;
    const subtotal=(fuel+labor+chassis+port+overhead+accCost)*m*qty;
    const margin=subtotal*0.15, admin=subtotal*0.05;
    const total=Math.round(subtotal+margin+admin);
    const eta=Math.round((miles/speed+4)*10)/10;
    return {miles:Math.round(miles),total,eta,fuel:Math.round(fuel*m*qty),labor:Math.round(labor*m*qty),chassis:Math.round(chassis*qty),port:port*qty,overhead:Math.round(overhead*qty+margin+admin),acc:Math.round(accCost*qty)};
  }
  function fmt(n){return n.toLocaleString();}

  const originSel=document.getElementById('originSel'), destSel=document.getElementById('destSel');
  Object.entries(PORTS).forEach(([k,p])=>originSel.insertAdjacentHTML('beforeend',`<option value="${k}">${p.name}</option>`));
  Object.entries(HUBS).forEach(([k,h])=>destSel.insertAdjacentHTML('beforeend',`<option value="${k}">${h.name}</option>`));
  originSel.value='LAX'; destSel.value='DAL';

  const map=L.map('map',{zoomControl:true,attributionControl:true,scrollWheelZoom:false,minZoom:3,maxZoom:8}).setView([39.5,-96],4);
  L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png',{subdomains:'abcd',maxZoom:19,attribution:'© OpenStreetMap · © CARTO'}).addTo(map);

  const corridorLayer=L.layerGroup().addTo(map);
  CORRIDORS.forEach(([a,b])=>{
    const A=PORTS[a]?.coords||HUBS[a]?.coords, B=PORTS[b]?.coords||HUBS[b]?.coords;
    const warm=Math.random()>0.65;
    L.polyline([A,B],{className:'corridor'+(warm?' corridor-warm':''),weight:1.2,smoothFactor:1}).addTo(corridorLayer);
  });

  Object.entries(PORTS).forEach(([k,p])=>{
    const html=`<div class="port-icon" data-port="${k}"><div class="ring"></div><div class="dot"></div><div class="label">${p.name.split('/')[0].split(',')[0]}</div></div>`;
    const m=L.marker(p.coords,{icon:L.divIcon({html,className:'',iconSize:[14,14],iconAnchor:[7,7]}),title:p.name});
    m.on('click',()=>{originSel.value=k;updateActiveCorridor();});
    m.addTo(map);
  });

  function updateActiveCorridor(){const p=PORTS[originSel.value];document.getElementById('activeCorridor').textContent=`${p.name} · Port complex`;}
  originSel.addEventListener('change',updateActiveCorridor);

  let routeLine=null,truckMarker=null,originMarker=null,destMarker=null,truckAnim=null;
  function clearRoute(){if(routeLine){map.removeLayer(routeLine);routeLine=null;}if(truckMarker){map.removeLayer(truckMarker);truckMarker=null;}if(originMarker){map.removeLayer(originMarker);originMarker=null;}if(destMarker){map.removeLayer(destMarker);destMarker=null;}if(truckAnim){cancelAnimationFrame(truckAnim);truckAnim=null;}}
  function drawRoute(originKey,destKey){
    clearRoute();
    const o=PORTS[originKey].coords, d=HUBS[destKey].coords;
    originMarker=L.marker(o,{icon:L.divIcon({html:`<div class="port-icon origin"><div class="ring"></div><div class="dot"></div></div>`,className:'',iconSize:[14,14],iconAnchor:[7,7]})}).addTo(map);
    destMarker=L.marker(d,{icon:L.divIcon({html:`<div class="port-icon destination"><div class="ring"></div><div class="dot"></div><div class="label" style="left:18px;top:-3px;">${HUBS[destKey].name}</div></div>`,className:'',iconSize:[14,14],iconAnchor:[7,7]})}).addTo(map);

    const mid=[(o[0]+d[0])/2,(o[1]+d[1])/2];
    const dx=d[1]-o[1], dy=d[0]-o[0];
    const norm=Math.sqrt(dx*dx+dy*dy)||1, offset=norm*0.15;
    const ctrl=[mid[0]+(dx/norm)*offset, mid[1]-(dy/norm)*offset];
    const path=[];
    for(let i=0;i<=60;i++){const t=i/60;
      const lat=(1-t)**2*o[0]+2*(1-t)*t*ctrl[0]+t*t*d[0];
      const lng=(1-t)**2*o[1]+2*(1-t)*t*ctrl[1]+t*t*d[1];
      path.push([lat,lng]);
    }
    routeLine=L.polyline(path,{className:'route-line',smoothFactor:1}).addTo(map);
    const pathEl=routeLine.getElement();
    if(pathEl){const len=pathEl.getTotalLength();pathEl.style.setProperty('--len',len);pathEl.classList.add('route-line-draw');}
    map.flyToBounds(L.latLngBounds(path).pad(0.18),{duration:1.1,easeLinearity:0.4});

    setTimeout(()=>{
      truckMarker=L.marker(path[0],{icon:L.divIcon({html:`<div class="truck-icon"></div>`,className:'',iconSize:[32,18],iconAnchor:[16,9]})}).addTo(map);
      const t0=performance.now(), dur=2400;
      function tick(now){const t=Math.min(1,(now-t0)/dur);const idx=Math.floor(t*(path.length-1));truckMarker.setLatLng(path[idx]);if(t<1)truckAnim=requestAnimationFrame(tick);}
      truckAnim=requestAnimationFrame(tick);
    },1500);
  }

  function countTo(el,end,dur=1500){const t0=performance.now();function step(now){const t=Math.min(1,(now-t0)/dur);const eased=1-Math.pow(1-t,3);el.textContent=fmt(Math.round(end*eased));if(t<1)requestAnimationFrame(step);}requestAnimationFrame(step);}

  const form=document.getElementById('quoteForm'), calcBtn=document.getElementById('calcBtn'), resultPanel=document.getElementById('resultPanel');
  function runQuote(originKey,destKey){
    const type=document.getElementById('contType').value;
    const qty=parseInt(document.getElementById('contQty').value||'1',10);
    const acc=Array.from(document.querySelectorAll('input[name="acc"]:checked')).map(c=>c.value);
    const q=computeQuote(PORTS[originKey].coords,HUBS[destKey].coords,type,qty,acc);
    calcBtn.classList.add('loading');
    drawRoute(originKey,destKey);
    setTimeout(()=>{
      calcBtn.classList.remove('loading');
      resultPanel.classList.remove('hidden');
      countTo(document.getElementById('rTotal'),q.total);
      countTo(document.getElementById('rMiles'),q.miles);
      document.getElementById('rEta').textContent=q.eta;
      countTo(document.getElementById('rFuel'),q.fuel);
      countTo(document.getElementById('rLabor'),q.labor);
      countTo(document.getElementById('rChassis'),q.chassis);
      countTo(document.getElementById('rPort'),q.port);
      countTo(document.getElementById('rOverhead'),q.overhead);
      countTo(document.getElementById('rAcc'),q.acc);
    },1200);
  }
  form.addEventListener('submit',e=>{e.preventDefault();runQuote(originSel.value,destSel.value);});
  document.querySelectorAll('[data-preset]').forEach(btn=>{
    btn.addEventListener('click',()=>{const [o,d]=btn.dataset.preset.split('-');originSel.value=o;destSel.value=d;updateActiveCorridor();runQuote(o,d);document.getElementById('quote').scrollIntoView({behavior:'smooth',block:'nearest'});});
  });

  const calcCard=document.getElementById('calcCard');
  calcCard.addEventListener('mousemove',e=>{const r=calcCard.getBoundingClientRect();const x=(e.clientX-r.left)/r.width-0.5;const y=(e.clientY-r.top)/r.height-0.5;calcCard.style.transform=`perspective(1400px) rotateX(${(-y*3).toFixed(2)}deg) rotateY(${(x*3).toFixed(2)}deg) translateZ(0)`;});
  calcCard.addEventListener('mouseleave',()=>{calcCard.style.transform='perspective(1400px) rotateX(0) rotateY(0)';});

  document.querySelectorAll('.bento-card').forEach(card=>{
    card.addEventListener('mousemove',e=>{const r=card.getBoundingClientRect();card.style.setProperty('--mx',((e.clientX-r.left)/r.width*100)+'%');card.style.setProperty('--my',((e.clientY-r.top)/r.height*100)+'%');});
  });

  const io=new IntersectionObserver((entries)=>{
    entries.forEach(en=>{if(en.isIntersecting){
      en.target.classList.add('in');
      if(en.target.dataset.count && !en.target.dataset._done){
        en.target.dataset._done='1';
        const end=parseInt(en.target.dataset.count,10), suffix=en.target.dataset.suffix||'';
        const t0=performance.now(), dur=1600;
        function step(now){const t=Math.min(1,(now-t0)/dur);const eased=1-Math.pow(1-t,3);en.target.textContent=fmt(Math.round(end*eased))+suffix;if(t<1)requestAnimationFrame(step);}
        requestAnimationFrame(step);
      }
      io.unobserve(en.target);
    }});
  },{threshold:0.18});
  document.querySelectorAll('.reveal,[data-count]').forEach(el=>io.observe(el));

  const liveRoutesEl=document.getElementById('liveRoutes'), liveQuotesEl=document.getElementById('liveQuotes'), liveAvgEl=document.getElementById('liveAvg');
  setInterval(()=>{
    if(liveRoutesEl){const cur=parseInt(liveRoutesEl.textContent.replace(/,/g,''),10);liveRoutesEl.textContent=fmt(cur+Math.floor(Math.random()*7-3));}
    if(liveQuotesEl){liveQuotesEl.textContent=fmt(parseInt(liveQuotesEl.textContent.replace(/,/g,''),10)+Math.floor(Math.random()*4-1));}
    if(liveAvgEl){liveAvgEl.textContent='$'+fmt(1820+Math.floor(Math.random()*120));}
  },1800);

  const map2=L.map('map2',{zoomControl:false,attributionControl:false,scrollWheelZoom:false,dragging:true,minZoom:3,maxZoom:7}).setView([39,-96],4);
  L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png',{subdomains:'abcd',maxZoom:19,attribution:'© OSM · CARTO'}).addTo(map2);
  CORRIDORS.forEach(([a,b])=>{const A=PORTS[a]?.coords||HUBS[a]?.coords, B=PORTS[b]?.coords||HUBS[b]?.coords;L.polyline([A,B],{className:'corridor',weight:1.1}).addTo(map2);});
  Object.entries(PORTS).forEach(([k,p])=>L.marker(p.coords,{icon:L.divIcon({html:`<div class="port-icon"><div class="ring"></div><div class="dot"></div></div>`,className:'',iconSize:[14,14],iconAnchor:[7,7]})}).addTo(map2));
  const hubMeta={DAL:{time:'36 hr',rate:'$1,920'},CHI:{time:'72 hr',rate:'$2,640'},ATL:{time:'24 hr',rate:'$1,180'},MEM:{time:'30 hr',rate:'$1,420'},KCM:{time:'48 hr',rate:'$1,980'},DEN:{time:'60 hr',rate:'$2,260'},PHX:{time:'12 hr',rate:'$980'},NSH:{time:'30 hr',rate:'$1,540'},IND:{time:'66 hr',rate:'$2,420'},SLC:{time:'52 hr',rate:'$2,180'}};
  Object.entries(HUBS).forEach(([k,h])=>{const meta=hubMeta[k]||{time:'—',rate:'—'};const m=L.marker(h.coords,{icon:L.divIcon({html:`<div class="port-icon" style="opacity:.85"><div class="ring" style="border-color:#FFD23F;animation-duration:3.4s;"></div><div class="dot" style="background:#FFD23F;box-shadow:0 0 10px #FFD23F;"></div></div>`,className:'',iconSize:[14,14],iconAnchor:[7,7]})});m.on('mouseover',()=>{document.getElementById('hubName').textContent=h.name;document.getElementById('hubTime').textContent=meta.time;document.getElementById('hubRate').textContent=meta.rate;});m.addTo(map2);});

  document.querySelectorAll('.btn-primary,.btn-ghost').forEach(btn=>{
    btn.addEventListener('mousemove',e=>{const r=btn.getBoundingClientRect();const x=(e.clientX-r.left-r.width/2)*0.18;const y=(e.clientY-r.top-r.height/2)*0.18;btn.style.transform=`translate(${x}px,${y}px)`;});
    btn.addEventListener('mouseleave',()=>{btn.style.transform='';});
  });

  const STEPS=[
    {n:'01',t:'Choose origin port',d:'Every U.S. & Canadian container port — including rail ramps.',c:'#FF3B30'},
    {n:'02',t:'Select destination',d:'1,200+ inland cities pre-mapped to delivery zones.',c:'#FF7B30'},
    {n:'03',t:'Calculate rate',d:'Live diesel, FSC, chassis, accessorials — priced in 30s.',c:'#4DA3FF'},
    {n:'04',t:'Export quote',d:'Brand-ready PDF, JSON for your TMS, or shareable HTML link.',c:'#00C16A'},
    {n:'05',t:'Book shipment',d:'Hand off to your preferred carrier or our 2,800+ partner network.',c:'#A855F7'},
  ];
  document.getElementById('stepsGrid').innerHTML=STEPS.map((s,i)=>`<div class="reveal reveal-delay-${Math.min(3,i)} relative"><div class="w-14 h-14 rounded-2xl flex items-center justify-center display text-[18px] text-white num" style="background:${s.c};box-shadow:0 14px 30px -10px ${s.c}80;">${s.n}</div><h3 class="display text-[18px] text-[var(--navy)] mt-5">${s.t}</h3><p class="text-[13px] text-[var(--muted)] mt-1.5">${s.d}</p></div>`).join('');

  const COSTS=[
    {n:'Fuel + FSC',d:'Live diesel × MPG × distance, plus carrier FSC.',i:'⛽',a:'#FF3B30'},
    {n:'Driver labor',d:'Hourly wage × transit time + per diem on 400+ mi.',i:'👤',a:'#4DA3FF'},
    {n:'Port charges',d:'Gate fees, terminal handling, exam fees if pulled.',i:'⚓',a:'#0B1F44'},
    {n:'Chassis',d:'Daily rental, pool fees, per-diem on long dwell.',i:'🛞',a:'#F2A516'},
    {n:'Accessorials',d:'Tolls, overweight, hazmat, reefer plug, lumper.',i:'📋',a:'#A855F7'},
    {n:'Overhead',d:'Admin, dispatch, ELD/TMS, insurance, depreciation.',i:'⚙️',a:'#00C16A'},
  ];
  document.getElementById('costGrid').innerHTML=COSTS.map((c,i)=>`<div class="bento-card glass rounded-2xl p-5 reveal reveal-delay-${i%4}"><div class="w-9 h-9 rounded-lg flex items-center justify-center text-[16px]" style="background:${c.a}18;color:${c.a};border:1px solid ${c.a}30;">${c.i}</div><div class="display text-[15px] text-[var(--navy)] mt-3">${c.n}</div><p class="text-[12px] text-[var(--muted)] mt-1.5 leading-relaxed">${c.d}</p></div>`).join('');
  document.querySelectorAll('.reveal:not(.in)').forEach(el=>io.observe(el));
  </script>

</body>
</html>
