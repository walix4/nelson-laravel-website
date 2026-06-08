"use client";
import Nav from "./Nav";
import Footer from "./Footer";
import RevealInit from "./RevealInit";

export default function ToolLayout({ eyebrow = "Dray Overweight tool", title, desc, children }: { eyebrow?: string; title: React.ReactNode; desc: string; children: React.ReactNode }) {
  return (
    <>
      <Nav />
      <RevealInit />
      <main>
        <section className="py-14 md:py-16">
          <div className="max-w-[1000px] mx-auto px-6">
            <div className="text-center max-w-2xl mx-auto reveal in">
              <div className="text-[11px] uppercase tracking-[0.22em] font-semibold text-[var(--red)]">{eyebrow}</div>
              <h1 className="display text-[38px] md:text-[50px] text-[var(--navy)] leading-[1.05] mt-2">{title}</h1>
              <p className="mt-4 text-[var(--muted)] text-[15px]">{desc}</p>
            </div>
            <div className="mt-10">{children}</div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
