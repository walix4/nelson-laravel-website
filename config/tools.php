<?php

/*
 | Master list of DrayageRate tools — single source of truth for both the
 | header mega-menu (partials/nav) and the /tools index page.
 | href: use '#anchor' for home-page sections (the nav prepends the home base),
 |       or '__B__/...' for dedicated pages (rewritten to the gh-pages base at deploy).
 | i: inner SVG markup for a 24x24 stroke icon.
 */
return [
  'list' => [
    ['n'=>'Rate Calculator','d'=>'Instant drayage pricing across every U.S. port & inland lane.','href'=>'#quote','g'=>'linear-gradient(160deg,#FF6B62,#E0241A)','i'=>'<rect x="4" y="3" width="16" height="18" rx="2"/><path d="M8 7h8M8 11h8M8 15h4"/>'],
    ['n'=>'See All Ports','d'=>'Searchable directory of every U.S. sea, rail & inland port.','href'=>'__B__/tools/ports/','g'=>'linear-gradient(160deg,#1E3A8A,#0B2350)','i'=>'<circle cx="12" cy="5" r="3"/><line x1="12" y1="22" x2="12" y2="8"/><path d="M5 12H2a10 10 0 0 0 20 0h-3"/>'],
    ['n'=>'Distance & Time','d'=>'Road distance & ETA for any U.S. drayage lane.','href'=>'__B__/tools/distance/','g'=>'linear-gradient(160deg,#22D3EE,#3A5FC0)','i'=>'<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/>'],
    ['n'=>'Unit Converter','d'=>'Convert weight, volume, distance, speed & more.','href'=>'__B__/tools/converter/','g'=>'linear-gradient(160deg,#7C3AED,#6B5BFF)','i'=>'<path d="M7 16V4M7 4L3 8M7 4l4 4M17 8v12M17 20l4-4M17 20l-4-4"/>'],
    ['n'=>'Demurrage & Detention','d'=>'Estimate per-diem & detention exposure before it bites.','href'=>'__B__/tools/demurrage/','g'=>'linear-gradient(160deg,#FB923C,#E0241A)','i'=>'<circle cx="12" cy="12" r="9"/><path d="M12 8v4l2 2"/>'],
    ['n'=>'Fuel Surcharge (FSC)','d'=>'Calculate the fuel surcharge on any drayage move.','href'=>'__B__/tools/fsc/','g'=>'linear-gradient(160deg,#F59E0B,#D97706)','i'=>'<path d="M4 22h10V4a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2v18z"/><path d="M14 9h2a2 2 0 0 1 2 2v6a1.5 1.5 0 0 0 3 0V8l-3-3"/><path d="M7 8h4"/>'],
    ['n'=>'CO₂ Emissions','d'=>'Estimate emissions for any drayage move.','href'=>'__B__/tools/co2/','g'=>'linear-gradient(160deg,#34D399,#059669)','i'=>'<path d="M11 20A7 7 0 0 1 9.8 6.1C16 5 17 4.5 19 2c1 2 2 4.5 2 8a7 7 0 0 1-7 7H11z"/><path d="M2 21c0-3 1.85-5.36 5.5-6"/>'],
    ['n'=>'Container Specs','d'=>'Dimensions, capacity & payload for every box type.','href'=>'__B__/tools/containers/','g'=>'linear-gradient(160deg,#0EA5E9,#0369A1)','i'=>'<rect x="3" y="7" width="18" height="12" rx="1"/><path d="M3 11h18M8 7v12M13 7v12"/>'],
    ['n'=>'Accessorial Guide','d'=>'What every drayage fee means — tolls, hazmat, reefer & more.','href'=>'__B__/tools/accessorials/','g'=>'linear-gradient(160deg,#8B5CF6,#6D28D9)','i'=>'<path d="M6 2h9l4 4v16l-2-1-2 1-2-1-2 1-2-1-3 1V2z"/><path d="M9 8h6M9 12h6M9 16h4"/>'],
    ['n'=>'Overweight Checker','d'=>'Check axle & gross weight against U.S. road limits.','href'=>'__B__/tools/overweight/','g'=>'linear-gradient(160deg,#EF4444,#991B1B)','i'=>'<path d="M12 3v18M7 21h10"/><path d="M7 6l-4 7a4 4 0 0 0 8 0L7 6zM17 6l-4 7a4 4 0 0 0 8 0l-4-7zM6 6h12"/>'],
    ['n'=>'All Estimates','d'=>'Live stream of every quote on the network.','href'=>'__B__/estimates/','g'=>'linear-gradient(160deg,#0EA5E9,#1E3A8A)','i'=>'<path d="M3 3v18h18"/><path d="M7 14l3-3 3 2 4-5"/>'],
  ],
];
