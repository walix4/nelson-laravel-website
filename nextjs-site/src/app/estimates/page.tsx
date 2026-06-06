"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import { asset } from "@/lib/site";

type Est = { ref: string; customer: string; email: string; pickup: string; pickupSub: string; drop: string; dropSub: string; container: string; miles: number; price: string | null; finalPrice?: string; status: string; stream: number; created: string };
const SEED: Est[] = [
  { ref: "DRY-2026-0847", customer: "Pacific Freight Brokers", email: "ops@pacificfreight.com", pickup: "Port of Los Angeles — Pier 400", pickupSub: "San Pedro, CA · port", drop: "Ontario Distribution Center", dropSub: "Ontario, CA · warehouse", container: "40ft", miles: 62, price: "$485", status: "completed", stream: 0, created: "2h ago" },
  { ref: "DRY-2026-0846", customer: "Harbor Line Logistics", email: "dispatch@harborline.io", pickup: "Port of Newark — Elizabeth", pickupSub: "Elizabeth, NJ · port", drop: "Carlstadt NJ Warehouse", dropSub: "Carlstadt, NJ · warehouse", container: "20ft", miles: 18, price: "$325", status: "completed", stream: 0, created: "2h ago" },
  { ref: "DRY-2026-0845", customer: "Gulf Coast Intermodal", email: "quotes@gulfcoastim.com", pickup: "Port of Houston — Barbours Cut", pickupSub: "La Porte, TX · port", drop: "Dallas Rail Ramp", dropSub: "Wilmer, TX · rail", container: "40ft-hc", miles: 248, price: null, finalPrice: "$1,240", status: "streaming", stream: 67, created: "2h ago" },
  { ref: "DRY-2026-0844", customer: "Midwest Container Co", email: "tms@midwestcontainer.com", pickup: "Chicago CSX 59th St", pickupSub: "Chicago, IL · rail", drop: "Joliet Warehouse Park", dropSub: "Joliet, IL · warehouse", container: "40ft", miles: 41, price: null, finalPrice: "$365", status: "pending", stream: 0, created: "2h ago" },
  { ref: "DRY-2026-0843", customer: "Atlantic Drayage LLC", email: "billing@atlanticdray.com", pickup: "Port of Savannah — GCT", pickupSub: "Savannah, GA · port", drop: "McDonough Distribution", dropSub: "McDonough, GA · warehouse", container: "reefer", miles: 264, price: "$892", status: "completed", stream: 0, created: "3h ago" },
  { ref: "DRY-2026-0842", customer: "West Coast TMS Demo", email: "demo@westcoasttms.io", pickup: "Port of Oakland — SSA", pickupSub: "Oakland, CA · port", drop: "Tracy CA Fulfillment", dropSub: "Tracy, CA · warehouse", container: "40ft", miles: 71, price: null, status: "failed", stream: 0, created: "4h ago" },
  { ref: "DRY-2026-0841", customer: "Northeast Brokerage Group", email: "rates@nebrokerage.com", pickup: "Port of Baltimore — Seagirt", pickupSub: "Baltimore, MD · port", drop: "Harrisburg PA DC", dropSub: "Harrisburg, PA · warehouse", container: "20ft", miles: 92, price: "$410", status: "completed", stream: 0, created: "4h ago" },
  { ref: "DRY-2026-0840", customer: "Sunshine Port Services", email: "ops@sunshineport.com", pickup: "Port of Miami — Seaboard", pickupSub: "Miami, FL · port", drop: "Hialeah Industrial Park", dropSub: "Hialeah, FL · warehouse", container: "40ft-hc", miles: 22, price: null, finalPrice: "$298", status: "streaming", stream: 41, created: "4h ago" },
  { ref: "DRY-2026-0839", customer: "Rocky Mountain Freight", email: "hello@rmfreight.com", pickup: "Port of Seattle — Terminal 18", pickupSub: "Seattle, WA · port", drop: "Denver Cold Storage", dropSub: "Denver, CO · warehouse", container: "reefer", miles: 1320, price: "$2,140", status: "completed", stream: 0, created: "5h ago" },
  { ref: "DRY-2026-0838", customer: "Lone Star Logistics", email: "dispatch@lonestarlog.com", pickup: "Port of Long Beach — Pier T", pickupSub: "Long Beach, CA · port", drop: "Phoenix AZ Crossdock", dropSub: "Phoenix, AZ · warehouse", container: "40ft", miles: 372, price: "$1,180", status: "completed", stream: 0, created: "6h ago" },
];
const LABELS: Record<string, string> = { completed: "Completed", streaming: "Streaming", pending: "Pending", failed: "Failed" };
const UpArrow = () => <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#16B571" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" style={{ flex: "0 0 auto" }}><path d="M12 19V5M5 12l7-7 7 7" /></svg>;
const DownArrow = () => <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#FF3B30" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" style={{ flex: "0 0 auto" }}><path d="M12 5v14M5 12l7 7 7-7" /></svg>;

export default function Page() {
  const [rows, setRows] = useState<Est[]>(SEED);
  const [q, setQ] = useState(""), [st, setSt] = useState("all");
  useEffect(() => {
    const id = setInterval(() => {
      setRows((prev) => prev.map((e) => {
        if (e.status !== "streaming") return e;
        const stream = Math.min(100, e.stream + (4 + Math.random() * 9));
        return stream >= 100 ? { ...e, stream: 100, status: "completed", price: e.finalPrice || "$—" } : { ...e, stream };
      }));
    }, 1100);
    return () => clearInterval(id);
  }, []);
  const view = rows.filter((e) => (st === "all" || e.status === st) && (!q || (e.ref + " " + e.customer + " " + e.email + " " + e.pickup + " " + e.drop).toLowerCase().includes(q.toLowerCase())));
  return (
    <>
      <Nav />
      <section className="py-7 md:py-9">
        <div className="max-w-[1400px] mx-auto px-6">
          <div className="mb-5">
            <div className="text-[11px] uppercase tracking-[0.22em] font-semibold text-[var(--red)]">Live estimate stream</div>
            <p className="mt-1.5 text-[var(--muted)] text-[14px]">Every drayage quote on the network — streaming in live and priced in seconds.</p>
          </div>
          <div>
            <div className="flex flex-col md:flex-row md:items-center gap-3 mb-5">
              <select className="est-select" value={st} onChange={(e) => setSt(e.target.value)}><option value="all">All statuses</option><option value="completed">Completed</option><option value="streaming">Streaming</option><option value="pending">Pending</option><option value="failed">Failed</option></select>
              <select className="est-select"><option>Today</option><option>Last 7 days</option><option>Last 30 days</option><option>All time</option></select>
              <div className="relative flex-1">
                <svg className="absolute left-3 top-1/2 -translate-y-1/2" style={{ color: "rgba(11,35,80,0.4)" }} width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="7" /><path d="M21 21l-4.3-4.3" /></svg>
                <input className="est-input" placeholder="Search by reference, customer, pickup, or drop-off…" value={q} onChange={(e) => setQ(e.target.value)} />
              </div>
              <div className="flex items-center text-[12px] font-medium text-[var(--muted)] px-1 whitespace-nowrap"><b className="text-[var(--navy)] mr-1">{view.length}</b> estimates</div>
            </div>
            <div className="est-wrap"><div className="est-scroll"><table className="est-table">
              <thead><tr><th>Reference</th><th>Customer</th><th>Pickup</th><th>Drop-off</th><th>Container</th><th>Est. Price</th><th>Status</th><th>Stream</th><th>Created</th><th></th></tr></thead>
              <tbody>
                {view.length === 0 ? <tr><td colSpan={10} className="est-empty">No estimates match your filters.</td></tr> : view.map((e) => (
                  <tr key={e.ref}>
                    <td>
                      <div className="est-refcell">
                        <span className="est-cont" aria-hidden="true"><svg width="34" height="34" viewBox="0 0 24 24" fill="none"><rect x="2.5" y="2.5" width="19" height="19" rx="3" stroke="currentColor" strokeWidth="1.4" strokeDasharray="3 2.4" /><rect x="8" y="8" width="8" height="8" rx="1.6" fill="#2E6BD6" /><rect x="10.2" y="10.2" width="3.6" height="3.6" rx="0.8" fill="#fff" fillOpacity="0.9" /></svg></span>
                        <div style={{ minWidth: 0 }}>
                          {e.container === "reefer"
                            ? <span className="est-tag"><img className="est-ico" src={asset("/ic-reefer.png")} alt="" />REEFER</span>
                            : <span className="est-tag"><img className="est-ico" src={asset("/ic-dry.png")} alt="" />DRY</span>}
                          <div className="est-refnum">{e.ref.split("-").slice(1).reverse().join("")}</div>
                        </div>
                      </div>
                    </td>
                    <td><div className="est-cust"><div style={{ minWidth: 0 }}><div className="est-name">{e.customer}</div><div className="est-sub">{e.email}</div></div></div></td>
                    <td><div className="est-route"><UpArrow /><span className="est-loc">{e.pickup}</span></div><div className="est-sub" style={{ paddingLeft: 23 }}>{e.pickupSub}</div></td>
                    <td><div className="est-route"><DownArrow /><span className="est-loc">{e.drop}</span></div><div className="est-sub" style={{ paddingLeft: 23 }}>{e.dropSub}</div></td>
                    <td><span className="est-chip">{e.container}</span><div className="est-sub">{e.miles} mi</div></td>
                    <td>{e.price ? <span className="est-price">{e.price}</span> : e.status === "failed" ? <span style={{ color: "var(--muted)" }}>—</span> : <span className="est-calc">Calculating…</span>}</td>
                    <td><span className={`est-badge ${e.status}`}>{e.status === "streaming" && <span className="est-dot" />}{LABELS[e.status]}</span></td>
                    <td>{e.status === "streaming" ? <div className="est-prog"><div className="est-prog-track"><div className="est-prog-fill" style={{ width: `${Math.round(e.stream)}%` }} /></div><div className="est-prog-label">{Math.round(e.stream)}%</div></div> : <span style={{ color: "var(--muted)" }}>—</span>}</td>
                    <td><span className="est-time"><svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ opacity: 0.6 }}><circle cx="12" cy="12" r="9" /><path d="M12 7v5l3 2" /></svg>{e.created}</span></td>
                    <td><Link href="/#quote" className="est-view">View</Link></td>
                  </tr>
                ))}
              </tbody>
            </table></div></div>
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
}
