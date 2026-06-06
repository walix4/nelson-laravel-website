"use client";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import { asset } from "@/lib/site";

export default function RateMapPage() {
  return (
    <>
      <Nav />
      <section className="py-10 md:py-14" style={{ background: "linear-gradient(180deg,#061A38,#0B2350)" }}>
        <div className="max-w-[1400px] mx-auto px-6">
          <div className="max-w-2xl mb-8">
            <div className="text-[11px] uppercase tracking-[0.22em] font-semibold text-[var(--red)]">Live network</div>
            <h1 className="display text-[34px] md:text-[46px] text-white leading-[1.05] mt-2">Drayage Rate Map</h1>
            <p className="mt-3 text-white/65 text-[15px]">Average per-mile drayage rates across every major U.S. container port.</p>
          </div>
          <div className="overflow-x-auto pb-2">
            <div className="mx-auto rounded-2xl overflow-hidden shadow-2xl" style={{ width: 1200, border: "1px solid rgba(255,255,255,0.08)" }}>
              <iframe src={asset("/rate-map.html")} title="Drayage Rate Map" scrolling="no" style={{ width: 1200, height: 780, border: "none", display: "block" }} />
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
}
