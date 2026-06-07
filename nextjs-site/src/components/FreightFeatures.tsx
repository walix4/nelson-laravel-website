const FEATURES = [
  { t: "5-axle & heavy truck classes", d: "Toll tables mapped to commercial class, axle count, and trailer configuration — not passenger-car defaults.", i: '<path d="M3 7h11v8H3zM14 10h3l3 3v2h-6zM7 18a1.6 1.6 0 1 0 0-3.2A1.6 1.6 0 0 0 7 18Zm10 0a1.6 1.6 0 1 0 0-3.2A1.6 1.6 0 0 0 17 18Z"/>' },
  { t: "Container & chassis profiles", d: "40', 45', and 53' equipment types with weight, height, and combined-length rules for bridge and plaza tolls.", i: '<path d="M21 7.5 12 3 3 7.5 12 12zM3 7.5v9L12 21M21 7.5v9L12 21M12 12v9"/>' },
  { t: "Port-to-ramp route estimates", d: "Drayage corridors from marine terminals to rail ramps, warehouses, and cross-docks with plaza-by-plaza breakdown.", i: '<path d="M9 3 3 5v16l6-2 6 2 6-2V3l-6 2zM9 3v16M15 5v16"/>' },
  { t: "Peak & off-peak commercial rates", d: "E-ZPass, license-plate, and cash lanes with time-of-day multipliers used by major US toll authorities.", i: '<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/>' },
  { t: "Fleet & TMS integrations", d: "REST JSON API for dispatch, rating engines, and shipper portals — sandbox keys and usage analytics included.", i: '<path d="m9 8-4 4 4 4M15 8l4 4-4 4"/>' },
  { t: "Audit-ready cost breakdown", d: "Per-plaza receipts for freight invoices, accessorial chargebacks, and customer quote validation.", i: '<rect x="6" y="4" width="12" height="16" rx="1.5"/><path d="M9 4V3h6v1M9 9h6M9 13h6M9 17h4"/>' },
];

export default function FreightFeatures() {
  return (
    <section id="features" className="py-24 bg-white">
      <div className="max-w-[1280px] mx-auto px-6">
        <div className="text-center max-w-2xl mx-auto reveal">
          <div className="text-[11px] uppercase tracking-[0.2em] font-bold text-[var(--red)]">Built for heavy freight</div>
          <h2 className="display text-[38px] md:text-[50px] text-[var(--navy)] leading-[1.05] mt-3">Container moves need truck-grade toll logic</h2>
          <p className="mt-4 text-[var(--muted)] text-[15px] md:text-[16px] leading-relaxed">Passenger-car APIs miss axle classes, equipment profiles, and commercial peak rates — we model tolls the way ports and fleets actually pay them.</p>
        </div>
        <div className="mt-14 grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          {FEATURES.map((f, i) => (
            <div key={f.t} className={`reveal reveal-d${i % 3} group rounded-lg border border-[var(--navy)]/8 p-7 hover:-translate-y-1 transition shadow-sm hover:shadow-xl`} style={{ background: "linear-gradient(170deg,#FFFFFF,#F7F9FC)" }}>
              <div className="w-12 h-12 rounded-lg flex items-center justify-center" style={{ background: "linear-gradient(160deg,#0B2D5C,#061A38)" }}>
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#ffe45c" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" dangerouslySetInnerHTML={{ __html: f.i }} />
              </div>
              <h3 className="display text-[19px] text-[var(--navy)] mt-5">{f.t}</h3>
              <p className="text-[13.5px] text-[var(--muted)] mt-2.5 leading-relaxed">{f.d}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
