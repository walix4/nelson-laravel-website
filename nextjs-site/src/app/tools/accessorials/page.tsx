"use client";
import { useState } from "react";
import ToolLayout from "@/components/ToolLayout";

const AC = [
  { n: "Hash", d: "A fixed-length cryptographic fingerprint of a document or record — any change produces a completely different hash.", p: "SHA-256" },
  { n: "Anchor", d: "Writing a record's hash to the blockchain so its existence and contents at that moment are provable forever.", p: "On-chain" },
  { n: "Immutable", d: "Once a record is anchored it cannot be altered or deleted — only superseded by a new, linked record.", p: "Permanent" },
  { n: "Audit trail", d: "The complete, time-ordered history of every event and change tied to a shipment record.", p: "Time-ordered" },
  { n: "Chain of custody", d: "The verified sequence of parties who held or handled a container, from gate-in to final delivery.", p: "Custody" },
  { n: "Provenance", d: "The documented origin and full history of a record or shipment, traceable back to its source.", p: "Origin" },
  { n: "Digital signature", d: "A cryptographic approval that binds a record to a specific, verifiable identity and cannot be forged.", p: "Signed" },
  { n: "Rate confirmation", d: "An agreed freight rate captured as a signed, timestamped on-chain record between two parties.", p: "Record" },
  { n: "BOL", d: "Bill of lading — the contract and receipt for a shipment, anchored on-chain as a verifiable document.", p: "Document" },
  { n: "POD", d: "Proof of delivery — signed confirmation that a shipment was received, hashed into the record.", p: "Document" },
  { n: "Smart contract", d: "Self-executing code that records or releases an event (such as a payment) when conditions are met.", p: "Automated" },
  { n: "Block height", d: "The position of a block in the chain — a simple measure of how many confirmations a record has.", p: "Position" },
  { n: "Tamper-proof", d: "A property of anchored records: any attempt to change them breaks verification and is immediately detectable.", p: "Verified" },
  { n: "Verification link", d: "A shareable URL that lets any party independently confirm a record's authenticity on-chain.", p: "Shareable" },
  { n: "Timestamp", d: "The exact, trusted time a record was anchored, used to prove when an event occurred.", p: "Trusted time" },
  { n: "Consensus", d: "The mechanism by which network nodes agree a record is valid before it is permanently committed.", p: "Network" },
];

export default function Page() {
  const [q, setQ] = useState("");
  const list = AC.filter((a) => !q || (a.n + " " + a.d).toLowerCase().includes(q.toLowerCase()));
  return (
    <ToolLayout eyebrow="Reference" title="Verification Glossary" desc="Every blockchain verification term, in plain English — what it means and how it applies to your shipment records.">
      <div className="relative max-w-xl mx-auto mb-6 reveal">
        <svg className="absolute left-4 top-1/2 -translate-y-1/2" style={{ color: "rgba(11,35,80,0.4)" }} width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="7" /><path d="M21 21l-4.3-4.3" /></svg>
        <input className="tool-input" style={{ paddingLeft: "2.8rem" }} placeholder="Search terms…" value={q} onChange={(e) => setQ(e.target.value)} />
      </div>
      <div className="grid sm:grid-cols-2 gap-4">
        {list.map((a) => (
          <div key={a.n} className="bg-white rounded-[16px] p-5 reveal" style={{ border: "1px solid rgba(11,35,80,0.08)" }}>
            <div className="flex items-start justify-between gap-3"><h3 className="text-[15.5px] font-bold text-[var(--navy)]">{a.n}</h3><span className="text-[12.5px] font-bold whitespace-nowrap px-[11px] py-1 rounded-full" style={{ color: "#15935F", background: "rgba(22,181,113,0.12)" }}>{a.p}</span></div>
            <p className="text-[13.5px] text-[var(--muted)] leading-[1.55] mt-1.5">{a.d}</p>
          </div>
        ))}
      </div>
      {list.length === 0 && <div className="text-center text-[var(--muted)] py-12">No terms match your search.</div>}
    </ToolLayout>
  );
}
