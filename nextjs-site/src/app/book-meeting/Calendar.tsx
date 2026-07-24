"use client";

import { useMemo, useState } from "react";
import { WEEKDAYS, MONTHS, LIME, LIME_TEXT, isDayDisabled, isSameDay } from "./data";

export default function Calendar({
  selected,
  onSelect,
}: {
  selected: Date | null;
  onSelect: (date: Date) => void;
}) {
  const today = useMemo(() => {
    const t = new Date();
    t.setHours(0, 0, 0, 0);
    return t;
  }, []);

  const [view, setView] = useState(() => new Date(today.getFullYear(), today.getMonth(), 1));

  const cells = useMemo(() => {
    const year = view.getFullYear();
    const month = view.getMonth();
    const firstWeekday = new Date(year, month, 1).getDay();
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const list: (Date | null)[] = [];
    for (let i = 0; i < firstWeekday; i++) list.push(null);
    for (let d = 1; d <= daysInMonth; d++) list.push(new Date(year, month, d));
    while (list.length % 7 !== 0) list.push(null);
    return list;
  }, [view]);

  const canGoPrev =
    view.getFullYear() > today.getFullYear() ||
    (view.getFullYear() === today.getFullYear() && view.getMonth() > today.getMonth());

  const goPrev = () => {
    if (!canGoPrev) return;
    setView(new Date(view.getFullYear(), view.getMonth() - 1, 1));
  };
  const goNext = () => setView(new Date(view.getFullYear(), view.getMonth() + 1, 1));

  const navBtn: React.CSSProperties = {
    width: 36, height: 36, display: "flex", alignItems: "center", justifyContent: "center",
    borderRadius: 10, border: "none", background: "transparent", cursor: "pointer",
    color: "rgba(255,255,255,0.6)", transition: "background .15s, color .15s",
  };

  return (
    <div>
      {/* Month header */}
      <div
        className="flex items-center justify-between"
        style={{ marginBottom: 18, paddingBottom: 14, borderBottom: "1px solid rgba(255,255,255,0.10)" }}
      >
        <button
          onClick={goPrev}
          disabled={!canGoPrev}
          aria-label="Previous month"
          style={{ ...navBtn, opacity: canGoPrev ? 1 : 0.3, pointerEvents: canGoPrev ? "auto" : "none" }}
          onMouseEnter={(e) => { e.currentTarget.style.background = "rgba(255,255,255,0.08)"; e.currentTarget.style.color = "#fff"; }}
          onMouseLeave={(e) => { e.currentTarget.style.background = "transparent"; e.currentTarget.style.color = "rgba(255,255,255,0.6)"; }}
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><polyline points="15 18 9 12 15 6" /></svg>
        </button>
        <div style={{ fontSize: 16, fontWeight: 700, color: "#fff" }}>
          {MONTHS[view.getMonth()]} {view.getFullYear()}
        </div>
        <button
          onClick={goNext}
          aria-label="Next month"
          style={navBtn}
          onMouseEnter={(e) => { e.currentTarget.style.background = "rgba(255,255,255,0.08)"; e.currentTarget.style.color = "#fff"; }}
          onMouseLeave={(e) => { e.currentTarget.style.background = "transparent"; e.currentTarget.style.color = "rgba(255,255,255,0.6)"; }}
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 18 15 12 9 6" /></svg>
        </button>
      </div>

      {/* Weekday labels */}
      <div className="grid grid-cols-7" style={{ gap: 4, marginBottom: 6 }}>
        {WEEKDAYS.map((wd) => (
          <div key={wd} style={{ textAlign: "center", fontSize: 11, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.04em", color: "rgba(255,255,255,0.38)", padding: "4px 0" }}>
            {wd}
          </div>
        ))}
      </div>

      {/* Days */}
      <div className="grid grid-cols-7" style={{ gap: 4 }}>
        {cells.map((date, i) => {
          if (!date) return <div key={`e-${i}`} />;
          const disabled = isDayDisabled(date);
          const isSelected = isSameDay(date, selected);
          const isToday = isSameDay(date, today);

          return (
            <button
              key={date.toISOString()}
              disabled={disabled}
              onClick={() => onSelect(date)}
              style={{
                position: "relative",
                aspectRatio: "1 / 1",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                borderRadius: 12,
                fontSize: 14,
                fontWeight: isSelected ? 800 : 600,
                border: "none",
                cursor: disabled ? "not-allowed" : "pointer",
                transition: "all .18s ease",
                color: disabled ? "rgba(255,255,255,0.22)" : isSelected ? LIME_TEXT : "rgba(255,255,255,0.85)",
                background: isSelected
                  ? LIME
                  : disabled
                  ? "transparent"
                  : "rgba(255,255,255,0.05)",
                boxShadow: isSelected ? `0 10px 26px -8px ${LIME}80` : "none",
                transform: isSelected ? "scale(1.04)" : "scale(1)",
              }}
              onMouseEnter={(e) => {
                if (disabled || isSelected) return;
                e.currentTarget.style.background = "rgba(252,11,5,0.16)";
                e.currentTarget.style.color = "#fff";
                e.currentTarget.style.transform = "scale(1.05)";
              }}
              onMouseLeave={(e) => {
                if (disabled || isSelected) return;
                e.currentTarget.style.background = "rgba(255,255,255,0.05)";
                e.currentTarget.style.color = "rgba(255,255,255,0.85)";
                e.currentTarget.style.transform = "scale(1)";
              }}
            >
              {date.getDate()}
              {isToday && !isSelected && (
                <span style={{ position: "absolute", bottom: 5, width: 4, height: 4, borderRadius: "50%", background: LIME }} />
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}
