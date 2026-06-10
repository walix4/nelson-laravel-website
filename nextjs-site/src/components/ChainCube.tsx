// Pure-CSS 3D rotating block. size = edge length in px.
export default function ChainCube({ size = 120, duration = 16, delay = 0, label }: { size?: number; duration?: number; delay?: number; label?: string }) {
  const h = size / 2;
  const faces: [string, string][] = [
    [`translateZ(${h}px)`, "glow"],
    [`rotateY(180deg) translateZ(${h}px)`, ""],
    [`rotateY(90deg) translateZ(${h}px)`, ""],
    [`rotateY(-90deg) translateZ(${h}px)`, ""],
    [`rotateX(90deg) translateZ(${h}px)`, "glow"],
    [`rotateX(-90deg) translateZ(${h}px)`, ""],
  ];
  return (
    <div className="ccube-wrap flex flex-col items-center gap-3" style={{ animationDelay: `${delay - 2}s` }}>
      <div className="ccube-scene" style={{ width: size * 1.5, height: size * 1.5 }}>
        <div className="ccube" style={{ width: size, height: size, animationDuration: `${duration}s`, animationDelay: `${delay}s` }}>
          {faces.map(([t, g], i) => <div key={i} className={`cf ${g}`} style={{ transform: t }} />)}
        </div>
      </div>
      {label && <div className="text-[10px] uppercase tracking-[0.18em] font-semibold text-white/55 num">{label}</div>}
    </div>
  );
}
