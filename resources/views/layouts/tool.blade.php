<!DOCTYPE html>
<html lang="en" class="scroll-smooth">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>@yield('title', 'Tools') · DrayageRate</title>
  <meta name="description" content="@yield('desc', 'Free logistics tools for drayage — pricing, tracking, distance, conversions and more.')" />
  <script src="https://cdn.tailwindcss.com"></script>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700;800&display=swap" rel="stylesheet">
  <style>
    :root{--navy:#0B2350;--navy-2:#163A7E;--navy-3:#06143A;--red:#FF3B30;--red-2:#E0241A;--blue:#3A5FC0;--blue-2:#6E8FE0;--bg:#F8FAFC;--ink:#0B1220;--muted:#5B6473;}
    *{-webkit-font-smoothing:antialiased;}
    html,body{font-family:'Poppins',system-ui,-apple-system,Segoe UI,Roboto,sans-serif;color:var(--ink);background:var(--bg);}
    .display{font-family:'Poppins',system-ui,sans-serif;letter-spacing:-0.02em;font-weight:700;}
    .num{font-variant-numeric:tabular-nums;}
    .btn-primary{background:linear-gradient(180deg,var(--red) 0%,var(--red-2) 100%);color:#fff;font-weight:600;border:1px solid rgba(255,255,255,0.18);box-shadow:0 14px 30px -10px rgba(255,59,48,0.55),inset 0 1px 0 rgba(255,255,255,0.4);transition:transform .2s,box-shadow .2s,filter .2s;}
    .btn-primary:hover{transform:translateY(-1px);filter:brightness(1.04);}
    .reveal{opacity:0;transform:translateY(24px);transition:opacity .8s cubic-bezier(.2,.7,.2,1),transform .8s cubic-bezier(.2,.7,.2,1);}
    .reveal.in{opacity:1;transform:none;}
    .reveal-d1{transition-delay:.08s;} .reveal-d2{transition-delay:.16s;} .reveal-d3{transition-delay:.24s;}
    .nav-blink{font-weight:700;padding:6px 14px;border-radius:8px;color:#fff;background:var(--red);box-shadow:0 8px 18px -8px rgba(255,59,48,0.65);transition:filter .2s,transform .2s;}
    .nav-blink:hover{filter:brightness(1.06);transform:translateY(-1px);}
    .mega-wrap{position:relative;}
    .mega-panel{position:absolute;left:0;top:calc(100% + 18px);width:min(940px,calc(100vw - 32px));background:#fff;border-radius:20px;box-shadow:0 44px 100px -34px rgba(11,31,68,0.6);padding:26px 26px 20px;opacity:0;visibility:hidden;transform:translateY(10px);transition:opacity .22s,transform .22s;z-index:60;}
    .mega-panel::before{content:"";position:absolute;left:0;right:0;top:-22px;height:22px;}/* invisible bridge over the gap so hover doesn't drop */
    .mega-wrap:hover .mega-panel,.mega-wrap.open .mega-panel{opacity:1;visibility:visible;transform:translateY(0);}
    .mega-tool{display:flex;gap:14px;padding:12px;border-radius:13px;transition:background .15s;text-decoration:none;}
    .mega-tool:hover{background:#F4F6FB;}
    .mega-ic{width:46px;height:46px;border-radius:13px;flex-shrink:0;display:flex;align-items:center;justify-content:center;color:#fff;box-shadow:0 8px 18px -8px rgba(11,31,68,0.4);}
    .mega-tool h4{font-size:14.5px;font-weight:700;color:var(--navy);}
    .mega-tool p{font-size:12.5px;color:var(--muted);line-height:1.45;margin-top:2px;}
    .mega-caret{transition:transform .22s;} .mega-wrap:hover .mega-caret{transform:rotate(180deg);}
    .tool-input,.tool-select{width:100%;border:1px solid rgba(11,35,80,0.12);border-radius:13px;background:#fff;font-size:15px;color:var(--navy);font-weight:600;padding:14px 16px;outline:none;transition:border-color .2s,box-shadow .2s;}
    .tool-select{appearance:none;-webkit-appearance:none;padding-right:42px;cursor:pointer;background-image:url("data:image/svg+xml;charset=UTF-8,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 20 20' fill='%230B2350'%3e%3cpath fill-rule='evenodd' d='M5.23 7.21a.75.75 0 011.06.02L10 11.06l3.71-3.83a.75.75 0 111.08 1.04l-4.25 4.39a.75.75 0 01-1.08 0L5.21 8.27a.75.75 0 01.02-1.06z' clip-rule='evenodd'/%3e%3c/svg%3e");background-repeat:no-repeat;background-position:right 1rem center;background-size:1.1rem;}
    .tool-input:focus,.tool-select:focus{border-color:var(--blue);box-shadow:0 0 0 4px rgba(58,95,192,0.13);}
    .tool-label{font-size:11px;font-weight:700;letter-spacing:0.08em;text-transform:uppercase;color:var(--muted);margin-bottom:7px;display:block;}
    /* Wide-monitor (1920px) optimisation — only on very large screens */
    @media (min-width:1680px){
      .max-w-\[1400px\]{max-width:1560px !important;}
      .max-w-\[1200px\]{max-width:1320px !important;}
    }
  </style>
  @stack('head')
</head>
<body class="overflow-x-hidden">
  @include('partials.nav', ['onHome' => false])

  <main>@yield('content')</main>

  <footer class="text-white/85 py-14 border-t border-white/10 mt-10" style="background:#08163C;">
    <div class="max-w-[1400px] mx-auto px-6">
      <div class="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <div class="flex items-center"><img src="__B__/dryge/logo-mark.png" alt="" class="h-9 w-auto" /><span class="display text-white text-[22px] tracking-tight leading-none ml-2.5">Dray <span style="color:var(--red);">Rate</span></span></div>
          <p class="mt-3 max-w-sm text-white/75 text-[13px]">The drayage pricing network for North America. Instant rates across every U.S. container port.</p>
        </div>
        <a href="__B__/tools/" class="text-[13px] font-semibold text-white/90 hover:text-white inline-flex items-center gap-2">← Back to all tools</a>
      </div>
      <div class="mt-8 text-[11px] text-white/55 num">© 2026 drayagerate.net · All rights reserved</div>
    </div>
  </footer>

  <script>
    const io=new IntersectionObserver((es)=>{es.forEach(e=>{if(e.isIntersecting){e.target.classList.add('in');io.unobserve(e.target);}})},{threshold:0.12});
    document.querySelectorAll('.reveal').forEach(el=>io.observe(el));
  </script>
  @stack('scripts')
</body>
</html>
