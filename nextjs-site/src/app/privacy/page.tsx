import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import Link from "next/link";

const SECTIONS = [
  "Information We Collect",
  "Information Collected Automatically",
  "How We Use Your Information",
  "Artificial Intelligence",
  "Blockchain Technology",
  "Location Information",
  "Cookies",
  "Information Sharing",
  "Data Security",
  "Data Retention",
  "Your Rights",
  "Third-Party Services",
  "Children's Privacy",
  "International Users",
  "Changes to This Privacy Policy",
  "Contact Us",
];

export default function PrivacyPage() {
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
          <h1 className="text-white font-bold mb-4" style={{ fontSize: "clamp(32px,5vw,52px)", lineHeight: 1.1 }}>Privacy Policy</h1>
          <p className="text-white/45 text-[14px]">Effective Date: July 1, 2026</p>
          <p className="text-white/60 mt-4 text-[15px] leading-relaxed max-w-[640px] mx-auto">
            Welcome to <strong className="text-white">DrayGo LLC</strong> ("DrayGo," "we," "our," or "us"). Your privacy is important to us. This Privacy Policy explains how we collect, use, disclose, and protect your information when you use Draygo.net, the DrayGo mobile applications, DrayGo AI, DrayPay, and all related services (collectively, the "Platform").
          </p>
          <p className="text-white/45 mt-3 text-[14px]">By accessing or using the Platform, you agree to the practices described in this Privacy Policy.</p>
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
              .prose-legal .info-box p{margin:0;font-size:13.5px}
            `}</style>

            <h2 id="s1">1. Information We Collect</h2>
            <p>We collect information that you provide directly to us, information collected automatically through your use of the Platform, and information from third-party service providers.</p>

            <h3>Personal Information</h3>
            <ul>
              {["Full name","Company name","Email address","Phone number","Business address","Billing information","Driver license information","TWIC information","CDL information","MC Number","DOT Number","Insurance information","Tax Identification Number","W-9 information"].map(i => <li key={i}>{i}</li>)}
            </ul>

            <h3>Account Information</h3>
            <ul>
              {["Username","Password (encrypted)","User preferences","Login history","User role","Company profile"].map(i => <li key={i}>{i}</li>)}
            </ul>

            <h3>Transportation Information</h3>
            <ul>
              {["Booking information","Shipment information","Container numbers","Chassis numbers","Seal numbers","Bill of Lading","Delivery Orders","Port appointments","Vessel information","GPS locations","Pickup and delivery timestamps","Electronic signatures","Proof of Delivery (ePOD)","Electronic Bill of Lading (eBOL)"].map(i => <li key={i}>{i}</li>)}
            </ul>

            <h3>Payment Information</h3>
            <p>For DrayPay services, we may collect:</p>
            <ul>
              {["Bank account information","Debit card information","ACH information","Payment history","Invoice records","Wallet transactions"].map(i => <li key={i}>{i}</li>)}
            </ul>
            <div className="info-box"><p>Payment information is processed by authorized banking and payment partners. DrayGo does not store full payment card numbers unless required by applicable law or a compliant payment processor.</p></div>

            <h2 id="s2">2. Information Collected Automatically</h2>
            <p>When you use DrayGo, we may automatically collect:</p>
            <ul>
              {["IP address","Browser type","Device information","Operating system","Mobile device identifiers","GPS location (with permission)","App usage statistics","Crash reports","Cookies","Session information"].map(i => <li key={i}>{i}</li>)}
            </ul>

            <h2 id="s3">3. How We Use Your Information</h2>
            <p>We use your information to:</p>
            <ul>
              {["Create and manage your account","Generate freight quotes","Schedule container moves","Dispatch carriers","Verify carriers and drivers","Track containers and vessels","Manage port appointments","Process invoices","Process payments through DrayPay","Generate smart contracts","Maintain blockchain-secured records","Improve our AI services","Prevent fraud","Detect unauthorized access","Comply with legal obligations","Provide customer support","Improve platform performance"].map(i => <li key={i}>{i}</li>)}
            </ul>

            <h2 id="s4">4. Artificial Intelligence</h2>
            <p>DrayGo AI analyzes transportation data to provide:</p>
            <ul>
              {["Instant freight quotes","Dispatch recommendations","Route optimization","Carrier verification","Risk analysis","Compliance monitoring","Predictive analytics","Document recognition (OCR)"].map(i => <li key={i}>{i}</li>)}
            </ul>
            <p>AI-generated recommendations are intended to assist users and should be reviewed before making business decisions.</p>

            <h2 id="s5">5. Blockchain Technology</h2>
            <p>Certain documents and transactions may be securely recorded using blockchain technology, including:</p>
            <ul>
              {["Smart Contracts","Electronic Bills of Lading","Proof of Delivery","Digital Signatures","Payment confirmations","Audit records"].map(i => <li key={i}>{i}</li>)}
            </ul>
            <p>Blockchain records are designed to provide transparency, integrity, and tamper resistance.</p>

            <h2 id="s6">6. Location Information</h2>
            <p>With your permission, we collect location data to:</p>
            <ul>
              {["Track shipments","Display driver locations","Verify pickup and delivery","Optimize routes","Improve dispatch accuracy"].map(i => <li key={i}>{i}</li>)}
            </ul>
            <p>You may disable location services in your device settings, although some features may not function properly.</p>

            <h2 id="s7">7. Cookies</h2>
            <p>We use cookies and similar technologies to:</p>
            <ul>
              {["Keep you signed in","Remember preferences","Improve website performance","Analyze traffic","Enhance security"].map(i => <li key={i}>{i}</li>)}
            </ul>
            <p>You can manage cookies through your browser settings.</p>

            <h2 id="s8">8. Information Sharing</h2>
            <div className="info-box"><p><strong>We do not sell your personal information.</strong></p></div>
            <p>We may share information with:</p>
            <ul>
              {["Authorized carriers","Shippers","Brokers","Banking partners","Payment processors","Identity verification providers","Cloud hosting providers","Government agencies when required by law","Law enforcement when legally required"].map(i => <li key={i}>{i}</li>)}
            </ul>

            <h2 id="s9">9. Data Security</h2>
            <p>We implement industry-standard safeguards, including:</p>
            <ul>
              {["Encryption in transit and at rest","Secure authentication","Multi-factor authentication (MFA)","Role-based access controls","Firewalls","Continuous monitoring","Security audits","Backup and disaster recovery"].map(i => <li key={i}>{i}</li>)}
            </ul>
            <p>While we strive to protect your information, no internet-based system can be guaranteed to be completely secure.</p>

            <h2 id="s10">10. Data Retention</h2>
            <p>We retain information only as long as necessary to:</p>
            <ul>
              {["Provide services","Meet contractual obligations","Comply with legal and tax requirements","Resolve disputes","Maintain audit records"].map(i => <li key={i}>{i}</li>)}
            </ul>

            <h2 id="s11">11. Your Rights</h2>
            <p>Depending on your location, you may have the right to:</p>
            <ul>
              {["Access your personal information","Correct inaccurate information","Request deletion of your information","Restrict certain processing","Object to certain processing","Receive a copy of your data","Withdraw consent where applicable"].map(i => <li key={i}>{i}</li>)}
            </ul>
            <p>To exercise these rights, please contact us using the information below.</p>

            <h2 id="s12">12. Third-Party Services</h2>
            <p>DrayGo may integrate with third-party providers, including:</p>
            <ul>
              {["Payment processors","Banking partners","Port terminals","Customs agencies","Vessel tracking services","Mapping providers","Identity verification providers"].map(i => <li key={i}>{i}</li>)}
            </ul>
            <p>Your use of those services may also be subject to their privacy policies.</p>

            <h2 id="s13">13. Children&apos;s Privacy</h2>
            <p>DrayGo is intended for business users and is not directed to children under the age of 13. We do not knowingly collect personal information from children.</p>

            <h2 id="s14">14. International Users</h2>
            <p>If you access DrayGo outside the United States, your information may be transferred to and processed in countries where we or our service providers operate, subject to applicable legal safeguards.</p>

            <h2 id="s15">15. Changes to This Privacy Policy</h2>
            <p>We may update this Privacy Policy from time to time. The revised version will be posted on this page with an updated Effective Date. Continued use of the Platform after changes become effective constitutes acceptance of the updated policy.</p>

            <h2 id="s16">16. Contact Us</h2>
            <p>If you have any questions regarding this Privacy Policy, please contact us:</p>
            <div className="info-box">
              <p><strong>DrayGo LLC</strong></p>
              <p>Website: <a href="https://www.draygo.net">https://www.draygo.net</a></p>
              <p>Email: <a href="mailto:privacy@draygo.net">privacy@draygo.net</a></p>
              <p>Support: <a href="mailto:support@draygo.net">support@draygo.net</a></p>
            </div>

            <div className="mt-12 pt-8 border-t border-white/10 flex flex-wrap gap-4 items-center justify-between">
              <p className="text-white/30 text-[12px] m-0">© 2026 DrayGo LLC. All Rights Reserved.</p>
              <Link href="/terms" className="text-[13px] font-semibold" style={{ color: "#fc0b05" }}>View Terms &amp; Conditions →</Link>
            </div>
          </article>
        </div>
      </div>

      <Footer />
    </>
  );
}
