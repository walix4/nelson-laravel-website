import type { Metadata } from "next";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import BookingFlow from "./BookingFlow";

export const metadata: Metadata = {
  title: "Book a Meeting · DrayGo",
  description:
    "Schedule a 30-minute meeting with the DrayGo team. Pick a date and time that works best for you.",
};

export default function BookMeetingPage() {
  return (
    <>
      <Nav />
      <main style={{ position: "relative", background: "#0b0c0e", minHeight: "100vh", overflow: "hidden" }}>
        {/* Ambient red glow */}
        <div aria-hidden style={{ position: "absolute", inset: 0, pointerEvents: "none" }}>
          <div style={{ position: "absolute", top: -160, left: "10%", width: 520, height: 520, borderRadius: "50%", background: "rgba(252,11,5,0.10)", filter: "blur(90px)" }} />
          <div style={{ position: "absolute", top: "40%", right: -180, width: 560, height: 560, borderRadius: "50%", background: "rgba(252,11,5,0.06)", filter: "blur(100px)" }} />
        </div>

        <section style={{ position: "relative", padding: "32px 20px 72px" }}>
          <BookingFlow />
        </section>
      </main>
      <Footer />
    </>
  );
}
