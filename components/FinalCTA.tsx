import Reveal from "@/components/Reveal";
import AuditForm from "@/components/AuditForm";

export default function FinalCTA() {
  return (
    <section
      id="audit"
      style={{ backgroundColor: "#0D0B09", color: "#ffffff" }}
      className="relative overflow-hidden px-6 py-28 sm:py-36"
    >
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(50% 60% at 50% 100%, rgba(212,168,83,0.16), rgba(13,11,9,0) 70%)",
        }}
      />
      <div className="relative mx-auto max-w-2xl text-center">
        <Reveal>
          <h2
            className="font-display font-extrabold leading-[1.05] tracking-tight"
            style={{ fontSize: "clamp(32px, 4.8vw, 58px)" }}
          >
            Stop being your market&apos;s{" "}
            <span style={{ color: "#D4A853" }}>best-kept secret.</span>
          </h2>
        </Reveal>
        <Reveal delay={0.08}>
          <p
            className="mx-auto mt-6 max-w-xl text-lg"
            style={{ color: "rgba(255,255,255,0.7)", lineHeight: 1.7 }}
          >
            Tell me about your business. I&apos;ll send back a free Visibility
            Audit: exactly where you are losing customers to competitors right
            now, and what it would take to become the obvious choice.
          </p>
        </Reveal>
        <Reveal delay={0.14}>
          <div id="apply" className="mt-10 scroll-mt-24">
            <AuditForm />
          </div>
        </Reveal>
        <Reveal delay={0.2}>
          <p className="mt-10 text-sm" style={{ color: "rgba(255,255,255,0.5)" }}>
            Prefer to talk? +1 (438) 522-0907 · juan@clientgrowth.ca · Three
            client seats. Founder-led. Quebec.
          </p>
        </Reveal>
      </div>
    </section>
  );
}
