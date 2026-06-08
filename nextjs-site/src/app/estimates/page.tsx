"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";

type Est = { ref: string; customer: string; email: string; pickup: string; pickupSub: string; drop: string; dropSub: string; container: string; miles: number; price: string | null; finalPrice?: string; status: string; stream: number; created: string };
const SEED: Est[] = [
  { ref: "DRC-2026-0847", customer: "Pacific Freight Brokers", email: "ops@pacificfreight.com", pickup: "Los Angeles, CA", pickupSub: "Gate-in · origin", drop: "Phoenix, AZ", dropSub: "Delivery · destination", container: "Rate conf", miles: 372, price: "0x7af3", status: "completed", stream: 0, created: "2h ago" },
  { ref: "DRC-2026-0846", customer: "Harbor Line Logistics", email: "dispatch@harborline.io", pickup: "Newark, NJ", pickupSub: "BOL signed · origin", drop: "Boston, MA", dropSub: "POD logged · destination", container: "BOL / POD", miles: 215, price: "0x1c9e", status: "completed", stream: 0, created: "2h ago" },
  { ref: "DRC-2026-0845", customer: "Gulf Coast Intermodal", email: "quotes@gulfcoastim.com", pickup: "Houston, TX", pickupSub: "Custody handoff · origin", drop: "Dallas, TX", dropSub: "Ramp transfer · destination", container: "Movement", miles: 240, price: null, finalPrice: "0xc4f2", status: "streaming", stream: 67, created: "2h ago" },
  { ref: "DRC-2026-0844", customer: "Midwest Freight Co", email: "tms@midwestfreight.com", pickup: "Chicago, IL", pickupSub: "Awaiting signature · origin", drop: "Indianapolis, IN", dropSub: "Pending anchor · destination", container: "Signature", miles: 184, price: null, finalPrice: "0x8b07", status: "pending", stream: 0, created: "2h ago" },
  { ref: "DRC-2026-0843", customer: "Atlantic Carriers LLC", email: "billing@atlanticcarriers.com", pickup: "Savannah, GA", pickupSub: "Payment event · origin", drop: "Atlanta, GA", dropSub: "Settled · destination", container: "Payment", miles: 248, price: "0x2a55", status: "completed", stream: 0, created: "3h ago" },
  { ref: "DRC-2026-0842", customer: "West Coast TMS Demo", email: "demo@westcoasttms.io", pickup: "Oakland, CA", pickupSub: "Hash mismatch · origin", drop: "Sacramento, CA", dropSub: "Rejected · destination", container: "BOL / POD", miles: 82, price: null, status: "failed", stream: 0, created: "4h ago" },
  { ref: "DRC-2026-0841", customer: "Northeast Brokerage Group", email: "rates@nebrokerage.com", pickup: "Baltimore, MD", pickupSub: "Rate conf · origin", drop: "Harrisburg, PA", dropSub: "Confirmed · destination", container: "Rate conf", miles: 92, price: "0x6f3d", status: "completed", stream: 0, created: "4h ago" },
  { ref: "DRC-2026-0840", customer: "Sunshine Logistics Services", email: "ops@sunshinelogistics.com", pickup: "Miami, FL", pickupSub: "Gate-out · origin", drop: "Orlando, FL", dropSub: "In transit · destination", container: "Movement", miles: 235, price: null, finalPrice: "0xe190", status: "streaming", stream: 41, created: "4h ago" },
  { ref: "DRC-2026-0839", customer: "Rocky Mountain Freight", email: "hello@rmfreight.com", pickup: "Denver, CO", pickupSub: "POD signed · origin", drop: "Salt Lake City, UT", dropSub: "Delivered · destination", container: "BOL / POD", miles: 525, price: "0x5d72", status: "completed", stream: 0, created: "5h ago" },
  { ref: "DRC-2026-0838", customer: "Lone Star Logistics", email: "dispatch@lonestarlog.com", pickup: "Dallas, TX", pickupSub: "Rate conf · origin", drop: "San Antonio, TX", dropSub: "Confirmed · destination", container: "Rate conf", miles: 274, price: "0xab14", status: "completed", stream: 0, created: "6h ago" },
];
const LABELS: Record<string, string> = { completed: "Verified", streaming: "Anchoring", pending: "Pending", failed: "Failed" };
const UpArrow = () => <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#16B571" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" style={{ flex: "0 0 auto" }}><path d="M12 19V5M5 12l7-7 7 7" /></svg>;
const DownArrow = () => <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#2f61c0" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" style={{ flex: "0 0 auto" }}><path d="M12 5v14M5 12l7 7 7-7" /></svg>;

export default function Page() {
  const [rows, setRows] = useState<Est[]>(SEED);
  const [q, setQ] = useState(""), [st, setSt] = useState("all");
  useEffect(() => {
    const id = setInterval(() => {
      setRows((prev) => prev.map((e) => {
        if (e.status !== "streaming") return e;
        const stream = Math.min(100, e.stream + (4 + Math.random() * 9));
        return stream >= 100 ? { ...e, stream: 100, status: "completed", price: e.finalPrice || "0x—" } : { ...e, stream };
      }));
    }, 1100);
    return () => clearInterval(id);
  }, []);
  const view = rows.filter((e) => (st === "all" || e.status === st) && (!q || (e.ref + " " + e.customer + " " + e.email + " " + e.pickup + " " + e.drop).toLowerCase().includes(q.toLowerCase())));
  return (
    <>
      <Nav />
      <section className="py-14 md:py-16">
        <div className="max-w-[1400px] mx-auto px-6">
          <div className="text-center max-w-2xl mx-auto mb-10">
            <div className="text-[11px] uppercase tracking-[0.22em] font-semibold text-[var(--red)]">Live record stream</div>
            <h1 className="display text-[40px] md:text-[52px] text-[var(--navy)] leading-[1.04] mt-2">Verified Records</h1>
            <p className="mt-4 text-[var(--muted)] text-[15px]">Every record anchored on the chain — streaming in live and verified in seconds.</p>
          </div>
          <div>
            <div className="flex flex-col md:flex-row gap-3 mb-5">
              <div className="relative flex-1">
                <svg className="absolute left-3 top-1/2 -translate-y-1/2" style={{ color: "rgba(11,35,80,0.4)" }} width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="7" /><path d="M21 21l-4.3-4.3" /></svg>
                <input className="est-input" placeholder="Search by reference, customer, origin, or destination…" value={q} onChange={(e) => setQ(e.target.value)} />
              </div>
              <select className="est-select" value={st} onChange={(e) => setSt(e.target.value)}><option value="all">All statuses</option><option value="completed">Verified</option><option value="streaming">Anchoring</option><option value="pending">Pending</option><option value="failed">Failed</option></select>
              <select className="est-select"><option>Today</option><option>Last 7 days</option><option>Last 30 days</option><option>All time</option></select>
              <div className="flex items-center text-[12px] font-medium text-[var(--muted)] px-1 whitespace-nowrap"><b className="text-[var(--navy)] mr-1">{view.length}</b> records</div>
            </div>
            <div className="est-wrap"><div className="est-scroll"><table className="est-table">
              <thead><tr><th>Reference</th><th>Customer</th><th>Origin</th><th>Destination</th><th>Record type</th><th>Tx hash</th><th>Status</th><th>Progress</th><th>Created</th><th></th></tr></thead>
              <tbody>
                {view.length === 0 ? <tr><td colSpan={10} className="est-empty">No records match your filters.</td></tr> : view.map((e) => (
                  <tr key={e.ref}>
                    <td><span className="est-ref">{e.ref}</span></td>
                    <td><div className="est-cust"><div style={{ minWidth: 0 }}><div className="est-name">{e.customer}</div><div className="est-sub">{e.email}</div></div></div></td>
                    <td><div className="est-route"><UpArrow /><span className="est-loc">{e.pickup}</span></div><div className="est-sub" style={{ paddingLeft: 23 }}>{e.pickupSub}</div></td>
                    <td><div className="est-route"><DownArrow /><span className="est-loc">{e.drop}</span></div><div className="est-sub" style={{ paddingLeft: 23 }}>{e.dropSub}</div></td>
                    <td><span className="est-chip">{e.container}</span><div className="est-sub">{e.miles} mi</div></td>
                    <td>{e.price ? <span className="est-price">{e.price}</span> : e.status === "failed" ? <span style={{ color: "var(--muted)" }}>—</span> : <span className="est-calc">Anchoring…</span>}</td>
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
