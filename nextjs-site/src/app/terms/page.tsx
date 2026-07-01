import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import Link from "next/link";

const SECTIONS = [
  "About DrayGo",
  "Eligibility",
  "User Accounts",
  "Platform Services",
  "User Responsibilities",
  "Quotes and Pricing",
  "Smart Contracts and Blockchain",
  "DrayPay Financial Services",
  "Artificial Intelligence",
  "Documentation",
  "Payments",
  "Intellectual Property",
  "Privacy",
  "Limitation of Liability",
  "Indemnification",
  "Suspension and Termination",
  "Modifications",
  "Governing Law",
  "Contact Information",
];

export default function TermsPage() {
  return (
    <>
      <Nav />

      {/* Hero */}
      <section style={{ background: "linear-gradient(150deg,#040d1a 0%,#081929 60%,#060e20 100%)", borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
        <div className="max-w-[900px] mx-auto px-6 py-20 text-center">
          <div className="inline-flex items-center gap-2 mb-5">
            <span style={{ width: 6, height: 6, borderRadius: "50%", background: "#fc0b05", display: "inline-block", boxShadow: "0 0 8px #fc0b05" }} />
            <span className="text-[11px] font-extrabold uppercase tracking-[0.26em]" style={{ color: "#fc0b05" }}>Legal</span>
          </div>
          <h1 className="text-white font-bold mb-4" style={{ fontSize: "clamp(32px,5vw,52px)", lineHeight: 1.1 }}>Terms &amp; Conditions</h1>
          <p className="text-white/45 text-[14px]">Effective Date: July 1, 2026</p>
          <p className="text-white/60 mt-4 text-[15px] leading-relaxed max-w-[640px] mx-auto">
            Welcome to <strong className="text-white">DrayGo LLC</strong> ("DrayGo," "we," "our," or "us"). These Terms &amp; Conditions ("Terms") govern your access to and use of Draygo.net, the DrayGo mobile applications, DrayGo AI, DrayPay, APIs, and all related services (collectively, the "Platform").
          </p>
          <p className="text-white/45 mt-3 text-[14px]">By accessing or using the Platform, you agree to be legally bound by these Terms. If you do not agree, you must not access or use the Platform.</p>
        </div>
      </section>

      <div style={{ background: "#050e1c" }}>
        <div className="max-w-[1100px] mx-auto px-6 py-16 lg:grid lg:grid-cols-[220px_1fr] lg:gap-14">

          {/* Sticky TOC */}
          <aside className="hidden lg:block">
            <div className="sticky top-24">
              <div className="text-[10px] font-extrabold uppercase tracking-[0.22em] text-white/30 mb-4">Contents</div>
              <nav className="space-y-1">
                {SECTIONS.map((s, i) => (
                  <a key={s} href={`#s${i + 1}`}
                    className="block text-[12px] text-white/45 hover:text-white/80 transition-colors py-1 leading-snug"
                    style={{ borderLeft: "2px solid rgba(255,255,255,0.06)", paddingLeft: 10 }}>
                    <span className="text-white/25 mr-1.5">{String(i + 1).padStart(2, "0")}.</span>{s}
                  </a>
                ))}
              </nav>
            </div>
          </aside>

          {/* Content */}
          <article className="prose-legal">
            <style>{`
              .prose-legal h2{font-size:22px;font-weight:700;color:#fff;margin:2.5rem 0 1rem;padding-top:1.5rem;border-top:1px solid rgba(255,255,255,0.06)}
              .prose-legal h2:first-child{border-top:none;margin-top:0;padding-top:0}
              .prose-legal h3{font-size:14px;font-weight:700;color:rgba(255,255,255,0.85);margin:1.25rem 0 0.5rem;text-transform:uppercase;letter-spacing:0.08em}
              .prose-legal p{font-size:14.5px;color:rgba(255,255,255,0.6);line-height:1.75;margin-bottom:0.85rem}
              .prose-legal ul{margin:0.5rem 0 1rem 0;padding:0;list-style:none;display:flex;flex-direction:column;gap:6px}
              .prose-legal ul li{font-size:14px;color:rgba(255,255,255,0.55);padding-left:18px;position:relative;line-height:1.55}
              .prose-legal ul li::before{content:'';position:absolute;left:0;top:8px;width:5px;height:5px;border-radius:50%;background:#fc0b05;opacity:0.7}
              .prose-legal strong{color:rgba(255,255,255,0.9);font-weight:600}
              .prose-legal a{color:#fc0b05;text-decoration:none}
              .prose-legal a:hover{text-decoration:underline}
              .prose-legal .info-box{background:rgba(252,11,5,0.06);border:1px solid rgba(252,11,5,0.15);border-radius:8px;padding:14px 18px;margin:1rem 0}
              .prose-legal .info-box p{margin:0 0 6px;font-size:13.5px}
              .prose-legal .info-box p:last-child{margin:0}
              .prose-legal .warn-box{background:rgba(255,200,0,0.05);border:1px solid rgba(255,200,0,0.15);border-radius:8px;padding:14px 18px;margin:1rem 0}
              .prose-legal .warn-box p{margin:0;font-size:13.5px;color:rgba(255,200,100,0.75)}
            `}</style>

            <h2 id="s1">1. About DrayGo</h2>
            <p>DrayGo is an AI-powered Transportation Management System (TMS) designed for the drayage and intermodal logistics industry. The Platform provides tools for shippers, brokers, carriers, owner-operators, drivers, warehouses, and logistics providers to manage container transportation, documentation, smart contracts, digital payments, compliance, and operational workflows.</p>
            <p>DrayGo may also offer services through affiliated products, including DrayGo AI, DrayPay, and blockchain-based documentation systems.</p>

            <h2 id="s2">2. Eligibility</h2>
            <p>You must be at least 18 years of age and have the legal authority to enter into binding agreements to use the Platform.</p>
            <p>If you register on behalf of a company or organization, you represent that you have authority to bind that entity to these Terms.</p>

            <h2 id="s3">3. User Accounts</h2>
            <p>You are responsible for:</p>
            <ul>
              {["Maintaining the confidentiality of your account credentials.","All activity that occurs under your account.","Providing accurate, current, and complete information.","Promptly updating your account information when changes occur."].map(i => <li key={i}>{i}</li>)}
            </ul>
            <p>You must notify DrayGo immediately of any unauthorized access or suspected security breach.</p>

            <h2 id="s4">4. Platform Services</h2>
            <p>Depending on your subscription and permissions, the Platform may provide:</p>
            <ul>
              {["Instant Freight Quotes","AI-Powered Dispatch","Carrier Verification","Container Tracking","Vessel Tracking","Port Appointment Management","Customs Documentation","Electronic Bills of Lading (eBOL)","Electronic Proof of Delivery (ePOD)","Smart Invoicing","Real-Time Analytics","Automated Compliance","Smart Contracts","Blockchain-Secured Documentation","DrayPay Digital Wallet","QR Code Job Management","Reporting and Business Analytics"].map(i => <li key={i}>{i}</li>)}
            </ul>
            <p>Availability of features may vary and may change over time.</p>

            <h2 id="s5">5. User Responsibilities</h2>
            <p>You agree to:</p>
            <ul>
              {["Use the Platform only for lawful business purposes.","Submit accurate shipment, payment, and account information.","Comply with all applicable transportation, customs, tax, labor, and financial regulations.","Maintain all required operating authorities, licenses, insurance, and permits.","Protect your login credentials.","Refrain from uploading malicious software or attempting to disrupt the Platform."].map(i => <li key={i}>{i}</li>)}
            </ul>

            <h2 id="s6">6. Quotes and Pricing</h2>
            <p>Instant freight quotes generated by DrayGo are estimates based on the information provided at the time of the request. Final transportation charges may vary due to factors such as:</p>
            <ul>
              {["Waiting time","Port congestion","Demurrage","Per diem","Chassis charges","Fuel surcharges","Tolls","Detention","Accessorial services","Appointment changes","Route deviations","Government or terminal fees"].map(i => <li key={i}>{i}</li>)}
            </ul>
            <p>Users are responsible for reviewing and approving applicable charges before final settlement.</p>

            <h2 id="s7">7. Smart Contracts and Blockchain</h2>
            <p>Certain transactions may be documented through blockchain technology and automated smart contracts. Smart contracts may include:</p>
            <ul>
              {["Shipment details","Pricing","Payment terms","Delivery milestones","Digital signatures","Electronic documentation","Audit records"].map(i => <li key={i}>{i}</li>)}
            </ul>
            <p>Blockchain records are intended to provide transparency, integrity, and an immutable history of supported transactions. They do not replace any legal documentation required by applicable law.</p>

            <h2 id="s8">8. DrayPay Financial Services</h2>
            <p>DrayPay provides digital payment functionality that may include:</p>
            <ul>
              {["Digital wallets","ACH transfers","Debit card services","Instant payouts","Bank transfers","Split payments","Invoice settlement"].map(i => <li key={i}>{i}</li>)}
            </ul>
            <p>Financial services may be provided through licensed banking institutions, payment processors, or other authorized financial partners. Additional terms from those providers may apply.</p>

            <h2 id="s9">9. Artificial Intelligence</h2>
            <p>DrayGo AI provides automated recommendations and insights, including dispatch suggestions, routing, pricing estimates, compliance alerts, and document analysis.</p>
            <div className="warn-box"><p>AI-generated outputs are intended to assist users and should be reviewed before making operational or business decisions. Users remain responsible for verifying the accuracy of information and complying with all applicable laws and contractual obligations.</p></div>

            <h2 id="s10">10. Documentation</h2>
            <p>Users are responsible for ensuring that all uploaded or generated documentation is accurate and complete, including but not limited to:</p>
            <ul>
              {["Bills of Lading","Delivery Orders","Commercial Invoices","Customs Documents","Proofs of Delivery","Insurance Certificates","Rate Confirmations"].map(i => <li key={i}>{i}</li>)}
            </ul>
            <p>DrayGo is not responsible for losses resulting from inaccurate or incomplete information provided by users.</p>

            <h2 id="s11">11. Payments</h2>
            <p>Unless otherwise agreed in writing:</p>
            <ul>
              {["Fees are due according to the agreed payment terms.","Users are responsible for applicable taxes and governmental charges.","Late payments may be subject to interest or additional fees where permitted by law."].map(i => <li key={i}>{i}</li>)}
            </ul>

            <h2 id="s12">12. Intellectual Property</h2>
            <p>All software, technology, trademarks, logos, designs, graphics, documentation, and content made available through the Platform are owned by DrayGo or its licensors and are protected by applicable intellectual property laws.</p>
            <p>You may not copy, modify, distribute, reverse engineer, or create derivative works from the Platform without prior written permission.</p>

            <h2 id="s13">13. Privacy</h2>
            <p>Your use of the Platform is also governed by the <Link href="/privacy">DrayGo Privacy Policy</Link>, which explains how personal and business information is collected, used, stored, and protected.</p>

            <h2 id="s14">14. Limitation of Liability</h2>
            <div className="warn-box"><p>To the maximum extent permitted by law, DrayGo shall not be liable for indirect, incidental, special, consequential, or punitive damages, including lost profits, lost business opportunities, business interruption, or loss of data arising from the use of or inability to use the Platform. DrayGo does not guarantee uninterrupted, error-free, or continuous availability of the Platform.</p></div>

            <h2 id="s15">15. Indemnification</h2>
            <p>You agree to defend, indemnify, and hold harmless DrayGo, its affiliates, officers, employees, contractors, and partners from any claims, liabilities, damages, losses, costs, or expenses arising from your use of the Platform, your violation of these Terms, or your infringement of any rights of another party.</p>

            <h2 id="s16">16. Suspension and Termination</h2>
            <p>DrayGo reserves the right to suspend or terminate accounts that:</p>
            <ul>
              {["Violate these Terms.","Engage in fraudulent or unlawful activity.","Compromise the security or integrity of the Platform.","Misuse or abuse Platform services."].map(i => <li key={i}>{i}</li>)}
            </ul>
            <p>Termination does not relieve users of obligations incurred before termination.</p>

            <h2 id="s17">17. Modifications</h2>
            <p>DrayGo may update these Terms from time to time. Updated Terms become effective when posted on the Platform. Continued use of the Platform after changes are posted constitutes acceptance of the revised Terms.</p>

            <h2 id="s18">18. Governing Law</h2>
            <p>These Terms shall be governed by and interpreted in accordance with the laws of the jurisdiction specified by DrayGo, without regard to conflict-of-law principles.</p>

            <h2 id="s19">19. Contact Information</h2>
            <p>If you have questions regarding these Terms &amp; Conditions, please contact:</p>
            <div className="info-box">
              <p><strong>DrayGo LLC</strong></p>
              <p>Website: <a href="https://www.draygo.net">https://www.draygo.net</a></p>
              <p>Email: <a href="mailto:legal@draygo.net">legal@draygo.net</a></p>
              <p>Support: <a href="mailto:support@draygo.net">support@draygo.net</a></p>
            </div>

            <div className="mt-12 pt-8 border-t border-white/10 flex flex-wrap gap-4 items-center justify-between">
              <p className="text-white/30 text-[12px] m-0">© 2026 DrayGo LLC. All Rights Reserved.</p>
              <Link href="/privacy" className="text-[13px] font-semibold" style={{ color: "#fc0b05" }}>View Privacy Policy →</Link>
            </div>
          </article>
        </div>
      </div>

      <Footer />
    </>
  );
}
