<!DOCTYPE html>
<html lang="en" class="scroll-smooth">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>DrayageRate — Instant Drayage Quotes for U.S. & Canadian Ports</title>
  <meta name="description" content="Get instant drayage quotes between major North American ports and inland destinations. Fuel, labor, chassis, port fees — all in one rate." />

  <script src="https://cdn.tailwindcss.com"></script>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap" rel="stylesheet">

  <style>
    :root {
      --brand-red: #E11D2A;
      --brand-red-dark: #B8141F;
      --brand-navy: #0F1B3D;
      --brand-navy-2: #1A2856;
      --ink: #0B1220;
      --muted: #5B6473;
      --line: #E5E7EB;
      --bg: #F7F8FA;
    }
    html, body { font-family: 'Inter', system-ui, -apple-system, Segoe UI, Roboto, sans-serif; color: var(--ink); }
    .font-display { font-weight: 800; letter-spacing: -0.02em; }
    .btn-primary { background: var(--brand-navy); color: #fff; }
    .btn-primary:hover { background: var(--brand-navy-2); }
    .btn-red { background: var(--brand-red); color: #fff; }
    .btn-red:hover { background: var(--brand-red-dark); }
    .ring-focus:focus { outline: 2px solid var(--brand-navy); outline-offset: 1px; }
    .card-shadow { box-shadow: 0 10px 30px -10px rgba(15, 27, 61, 0.18), 0 2px 6px -2px rgba(15, 27, 61, 0.08); }
    .map-skeleton {
      background:
        radial-gradient(ellipse at 30% 40%, #DDE6F0 0%, #E8EDF3 60%),
        linear-gradient(180deg, #EAF1F8 0%, #DCE6EF 100%);
      position: relative;
    }
    .map-skeleton::before {
      content: "United States";
      position: absolute; inset: 0;
      display: flex; align-items: center; justify-content: center;
      font-weight: 600; color: #6B7280; letter-spacing: 0.04em;
    }
    .input {
      width: 100%; padding: 0.85rem 1rem; border: 1px solid var(--line);
      border-radius: 0.5rem; background: #fff; font-size: 0.95rem; color: var(--ink);
    }
    .input:focus { border-color: var(--brand-navy); outline: 2px solid rgba(15,27,61,0.15); }
    select.input { appearance: none; background-image: url("data:image/svg+xml;charset=UTF-8,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 20 20' fill='%236B7280'%3e%3cpath fill-rule='evenodd' d='M5.23 7.21a.75.75 0 011.06.02L10 11.06l3.71-3.83a.75.75 0 111.08 1.04l-4.25 4.39a.75.75 0 01-1.08 0L5.21 8.27a.75.75 0 01.02-1.06z' clip-rule='evenodd'/%3e%3c/svg%3e"); background-repeat: no-repeat; background-position: right 0.75rem center; background-size: 1.1rem; padding-right: 2.25rem; }
    .label { font-size: 0.8rem; font-weight: 600; color: var(--muted); text-transform: uppercase; letter-spacing: 0.04em; }
    .pill { padding: 0.4rem 0.85rem; border-radius: 9999px; font-size: 0.8rem; font-weight: 600; }
    .pill-blue { background: #E8EEFB; color: #1E3A8A; }
    .pill-gray { background: #F1F3F6; color: #475569; }
  </style>
</head>
<body class="bg-white antialiased">

  <!-- Header -->
  <header class="border-b border-gray-200 bg-white sticky top-0 z-40">
    <div class="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
      <a href="/dryge" class="flex items-center gap-2.5">
        <span class="w-9 h-9 rounded-lg flex items-center justify-center text-white font-extrabold text-sm" style="background: var(--brand-red);">DR</span>
        <span class="font-display text-lg" style="color: var(--brand-navy);">DrayageRate</span>
      </a>
      <nav class="hidden md:flex items-center gap-8 text-sm font-medium" style="color: #1F2937;">
        <a href="#how" class="hover:text-black">How it works</a>
        <a href="#ports" class="hover:text-black">Ports & lanes</a>
        <a href="#pricing" class="hover:text-black">Pricing</a>
        <a href="#about" class="hover:text-black">About</a>
      </nav>
      <div class="flex items-center gap-3">
        <a href="#login" class="hidden sm:inline text-sm font-semibold" style="color: var(--brand-navy);">Log in</a>
        <a href="#quote" class="btn-red px-4 py-2 rounded-md text-sm font-semibold">Get a quote</a>
      </div>
    </div>
  </header>

  <!-- Hero -->
  <section class="relative overflow-hidden" style="background: linear-gradient(180deg, #F7F8FA 0%, #FFFFFF 100%);">
    <div class="max-w-7xl mx-auto px-6 pt-14 pb-10">
      <div class="grid lg:grid-cols-2 gap-10 items-start">
        <div>
          <span class="pill pill-blue">Instant drayage quotes · U.S. & Canada</span>
          <h1 class="font-display text-4xl md:text-5xl mt-5 leading-[1.08]" style="color: var(--brand-navy);">
            Price your next drayage move in <span style="color: var(--brand-red);">under 30 seconds</span>.
          </h1>
          <p class="mt-5 text-lg" style="color: var(--muted);">
            Fuel, labor, chassis, port fees, accessorials — all bundled into one transparent rate. Built for brokers, BCOs and 3PLs moving containers between North American ports and inland destinations.
          </p>
          <ul class="mt-6 space-y-2.5 text-sm" style="color: #1F2937;">
            <li class="flex gap-2"><span style="color: var(--brand-red);">✓</span> Live diesel + FSC factored every quote</li>
            <li class="flex gap-2"><span style="color: var(--brand-red);">✓</span> Round-trip vs single-leg breakdown</li>
            <li class="flex gap-2"><span style="color: var(--brand-red);">✓</span> Export quotes as HTML, JSON or PDF</li>
          </ul>
          <div class="mt-8 flex items-center gap-3">
            <a href="#quote" class="btn-primary px-5 py-3 rounded-md text-sm font-semibold">Calculate a rate</a>
            <a href="#how" class="px-5 py-3 rounded-md text-sm font-semibold border border-gray-300 bg-white hover:bg-gray-50" style="color: var(--brand-navy);">See how it works</a>
          </div>
        </div>

        <!-- Quote form (card) -->
        <div id="quote" class="bg-white rounded-2xl border border-gray-200 card-shadow p-6 md:p-8">
          <h2 class="font-display text-2xl" style="color: var(--brand-navy);">Get an Instant Drayage Quote</h2>
          <p class="text-sm mt-1" style="color: var(--muted);">Origin, container, destination — that's all we need.</p>

          <form class="mt-6 space-y-4" onsubmit="event.preventDefault(); document.getElementById('quote-status').classList.remove('hidden');">
            <div class="space-y-1">
              <span class="label">Route information</span>
            </div>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-3">
              <select class="input" required>
                <option value="">Origin (Port or Ramp)*</option>
                <option>Port of Los Angeles</option>
                <option>Port of Long Beach</option>
                <option>Port of Oakland</option>
                <option>Port of New York/New Jersey</option>
                <option>Port of Savannah</option>
                <option>Port of Houston</option>
                <option>Port of Miami</option>
                <option>Port of Vancouver</option>
                <option>Port of Montreal</option>
              </select>
              <select class="input" required>
                <option value="">Container Type*</option>
                <option>20' Standard</option>
                <option>40' Standard</option>
                <option>40' High Cube</option>
                <option>45' High Cube</option>
                <option>20' Reefer</option>
                <option>40' Reefer</option>
              </select>
            </div>

            <input type="text" class="input" placeholder="Destination*" required />

            <div class="grid grid-cols-1 md:grid-cols-3 gap-3">
              <input type="number" min="1" class="input" placeholder="Containers QTY*" required />
              <div class="flex">
                <input type="number" min="0" class="input rounded-r-none" placeholder="Weight" />
                <select class="input rounded-l-none border-l-0 w-24">
                  <option>lb</option>
                  <option>kg</option>
                </select>
              </div>
              <select class="input">
                <option value="">Shipping line</option>
                <option>Maersk</option>
                <option>MSC</option>
                <option>CMA CGM</option>
                <option>Hapag-Lloyd</option>
                <option>ONE</option>
                <option>Evergreen</option>
                <option>COSCO</option>
                <option>Other</option>
              </select>
            </div>

            <div class="pt-2 space-y-1">
              <span class="label">Contact information</span>
            </div>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-3">
              <input type="text" class="input" placeholder="Name*" required />
              <input type="email" class="input" placeholder="Email*" required />
            </div>
            <input type="tel" class="input" placeholder="+1 phone number" />

            <label class="flex items-start gap-2.5 text-sm pt-1" style="color: #1F2937;">
              <input type="checkbox" class="mt-1" />
              <span>I need drayage service support and agree to be contacted.</span>
            </label>
            <label class="flex items-start gap-2.5 text-sm" style="color: #1F2937;">
              <input type="checkbox" class="mt-1" checked required />
              <span>I consent to the processing of my personal data in accordance with the <a href="#privacy" class="underline" style="color: var(--brand-navy);">Privacy Policy</a>*.</span>
            </label>

            <button type="submit" class="btn-primary w-full py-3.5 rounded-md font-semibold tracking-wide">CALCULATE</button>

            <div id="quote-status" class="hidden mt-3 p-3 rounded-md text-sm" style="background:#ECFDF5; color:#065F46; border:1px solid #A7F3D0;">
              Thanks — we'll have your instant rate over within minutes. (Demo form — wire to backend next.)
            </div>
          </form>
        </div>
      </div>
    </div>
  </section>

  <!-- Ports map section -->
  <section id="ports" class="py-16" style="background: #F7F8FA;">
    <div class="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-10 items-center">
      <div>
        <span class="pill pill-gray">Coverage</span>
        <h2 class="font-display text-3xl md:text-4xl mt-4" style="color: var(--brand-navy);">Every major North American port — one rate engine.</h2>
        <p class="mt-4" style="color: var(--muted);">
          Simplify port selection with our tool, covering key North American ports like Los Angeles, Long Beach, New York/New Jersey, Savannah, Houston, Miami, Vancouver and Montreal. Use the map to find your nearest port and get an instant rate to any inland destination.
        </p>
        <div class="mt-6 grid grid-cols-2 gap-3 text-sm">
          <div class="flex items-center gap-2"><span class="w-2 h-2 rounded-full" style="background: var(--brand-red);"></span> Los Angeles · Long Beach</div>
          <div class="flex items-center gap-2"><span class="w-2 h-2 rounded-full" style="background: var(--brand-red);"></span> Oakland · Seattle/Tacoma</div>
          <div class="flex items-center gap-2"><span class="w-2 h-2 rounded-full" style="background: var(--brand-red);"></span> NY/NJ · Norfolk</div>
          <div class="flex items-center gap-2"><span class="w-2 h-2 rounded-full" style="background: var(--brand-red);"></span> Savannah · Charleston</div>
          <div class="flex items-center gap-2"><span class="w-2 h-2 rounded-full" style="background: var(--brand-red);"></span> Houston · Miami</div>
          <div class="flex items-center gap-2"><span class="w-2 h-2 rounded-full" style="background: var(--brand-red);"></span> Vancouver · Montreal</div>
        </div>
      </div>
      <div class="rounded-2xl overflow-hidden border border-gray-200 card-shadow aspect-[4/3] map-skeleton">
        <!-- Placeholder — wire to Google Maps / Leaflet in next pass -->
      </div>
    </div>
  </section>

  <!-- How it works -->
  <section id="how" class="py-16 bg-white">
    <div class="max-w-7xl mx-auto px-6">
      <div class="max-w-2xl">
        <span class="pill pill-blue">How it works</span>
        <h2 class="font-display text-3xl md:text-4xl mt-4" style="color: var(--brand-navy);">From port to door, transparently priced.</h2>
        <p class="mt-4" style="color: var(--muted);">Three inputs, one quote. Every cost component shown — no hidden FSCs, no surprise accessorials.</p>
      </div>
      <div class="grid md:grid-cols-3 gap-6 mt-10">
        @php $steps = [
          ['1','Enter your move','Origin port, container type, destination ZIP, weight and shipping line. That\'s it.'],
          ['2','We compute the rate','Live diesel + FSC, driver labor, chassis, port fees, accessorials and overhead — round-trip aware.'],
          ['3','Export & book','Download the quote as HTML, JSON or PDF and forward to your customer in one click.'],
        ]; @endphp
        @foreach($steps as $s)
          <div class="border border-gray-200 rounded-xl p-6 card-shadow">
            <div class="w-9 h-9 rounded-md flex items-center justify-center text-white font-bold mb-4" style="background: var(--brand-navy);">{{ $s[0] }}</div>
            <h3 class="font-semibold text-lg" style="color: var(--brand-navy);">{{ $s[1] }}</h3>
            <p class="mt-2 text-sm" style="color: var(--muted);">{{ $s[2] }}</p>
          </div>
        @endforeach
      </div>
    </div>
  </section>

  <!-- CTA strip -->
  <section class="py-14" style="background: var(--brand-navy);">
    <div class="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-6">
      <div>
        <h3 class="font-display text-2xl md:text-3xl text-white">Quote your next container in 30 seconds.</h3>
        <p class="mt-2 text-sm" style="color: #C5CCDE;">No login required. Free during beta.</p>
      </div>
      <a href="#quote" class="btn-red px-6 py-3 rounded-md text-sm font-semibold">Get my instant rate →</a>
    </div>
  </section>

  <!-- Footer -->
  <footer class="bg-white border-t border-gray-200 py-10">
    <div class="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-4 text-sm" style="color: var(--muted);">
      <div class="flex items-center gap-2.5">
        <span class="w-7 h-7 rounded-md flex items-center justify-center text-white font-extrabold text-xs" style="background: var(--brand-red);">DR</span>
        <span class="font-display" style="color: var(--brand-navy);">DrayageRate</span>
        <span class="ml-3">© {{ date('Y') }} drayagerate.net</span>
      </div>
      <div class="flex items-center gap-5">
        <a href="#privacy" class="hover:underline">Privacy</a>
        <a href="#terms" class="hover:underline">Terms</a>
        <a href="#contact" class="hover:underline">Contact</a>
      </div>
    </div>
  </footer>

</body>
</html>
