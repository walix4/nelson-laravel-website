// Pure-CSS 3D payment elements (no images, no JS animation loops — keyframes only,
// per the "don't slow the site" rule). Classes live in globals.css.

export function CoinSpin({ size = 170, label = "$" }: { size?: number; label?: string }) {
  return (
    <div className="pcoin-scene">
      <div className="pcoin" style={{ width: size, height: size }}>
        <div className="pc-face"><span className="display text-white" style={{ fontSize: size * 0.42, textShadow: "0 2px 10px rgba(0,0,0,0.35)" }}>{label}</span><span className="pc-ring" /></div>
        <div className="pc-face back"><span className="display text-white" style={{ fontSize: size * 0.42, textShadow: "0 2px 10px rgba(0,0,0,0.35)" }}>{label}</span><span className="pc-ring" /></div>
      </div>
    </div>
  );
}

export function Card3D({ name = "NELSON BULDIER", number = "5310 •••• •••• 0226", tag = "DrayPay · Visa" }: { name?: string; number?: string; tag?: string }) {
  return (
    <div className="paycard-scene">
      <div className="paycard">
        <div className="absolute left-6 top-5 flex items-center gap-2">
          <span className="italic font-black text-[19px] tracking-tight text-white" style={{ fontFamily: "'Roboto', sans-serif" }}>Dray<span className="text-[#8fd9f5]">Pay</span></span>
        </div>
        <div className="absolute right-6 top-5 text-[10px] uppercase tracking-[0.2em] text-white/70">{tag}</div>
        <div className="pcc-chip" />
        <div className="absolute left-6 bottom-14 num text-[19px] tracking-[0.12em] text-white/95">{number}</div>
        <div className="absolute left-6 bottom-5 text-[11px] uppercase tracking-[0.16em] text-white/70">{name}</div>
        <div className="absolute right-6 bottom-5 text-right"><div className="text-[8px] uppercase tracking-[0.14em] text-white/55">Balance</div><div className="num text-[15px] font-bold text-white">$12,480.20</div></div>
      </div>
    </div>
  );
}

// 3D extruded cube — escrow vault / block. size in px, glyph rendered on the front face.
export function VaultCube({ size = 120, glyph }: { size?: number; glyph?: React.ReactNode }) {
  const h = size / 2;
  return (
    <div className="ccube-scene" style={{ minHeight: size * 1.6 }}>
      <div className="ccube-wrap">
        <div className="ccube" style={{ width: size, height: size }}>
          <div className="cf" style={{ transform: `translateZ(${h}px)`, display: "grid", placeItems: "center" }}>{glyph}</div>
          <div className="cf" style={{ transform: `rotateY(180deg) translateZ(${h}px)` }} />
          <div className="cf glow" style={{ transform: `rotateY(90deg) translateZ(${h}px)` }} />
          <div className="cf glow" style={{ transform: `rotateY(-90deg) translateZ(${h}px)` }} />
          <div className="cf" style={{ transform: `rotateX(90deg) translateZ(${h}px)` }} />
          <div className="cf" style={{ transform: `rotateX(-90deg) translateZ(${h}px)` }} />
        </div>
      </div>
    </div>
  );
}

// Endless 3D ribbon of settling payments (amount on each block).
const CONV = ["$1,840", "$760", "$2,310", "$540", "$1,120", "$3,400", "$980", "$1,640"];
export function PayConveyor() {
  return (
    <div className="conv-persp conv-fade overflow-hidden py-16">
      <div className="conv-plane">
        <div className="conv-track">
          {[...CONV, ...CONV].map((a, i) => (
            <div key={i} className="conv-block">
              <svg className="absolute left-2 top-2" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#8fd9f5" strokeWidth="2" strokeLinecap="round"><path d="M12 1v22M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" /></svg>
              <span className="cb-hash">{a}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
