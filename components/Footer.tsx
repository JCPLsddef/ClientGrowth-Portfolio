import Link from "next/link";
import KnightLogo from "@/components/KnightLogo";

const NAV_LINKS = [
  { label: "How it works", href: "/#system" },
  { label: "Work", href: "/#work" },
  { label: "For hiring teams", href: "/#how-i-think" },
  { label: "Pricing", href: "/#pricing" },
  { label: "Apply", href: "/#apply" },
];

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer style={{ backgroundColor: "#0D0B09", borderTop: "1px solid #2A2318" }}>
      {/* Decorative divider */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 20,
          padding: "0 max(24px, 5vw)",
          marginTop: 56,
          marginBottom: 48,
        }}
      >
        <div style={{ flex: 1, height: 1, backgroundColor: "#2A2318" }} />
        <div
          style={{
            width: 7,
            height: 7,
            transform: "rotate(45deg)",
            backgroundColor: "#D4A853",
            boxShadow: "0 0 8px rgba(212,168,83,0.4)",
            flexShrink: 0,
          }}
        />
        <div style={{ flex: 1, height: 1, backgroundColor: "#2A2318" }} />
      </div>

      {/* Columns */}
      <div className="mx-auto grid max-w-6xl grid-cols-1 gap-8 px-6 py-10 md:grid-cols-4 md:gap-10 md:py-14">
        <div className="md:col-span-2">
          <Link
            href="/"
            className="inline-flex items-center gap-3.5 transition-opacity duration-200 hover:opacity-80"
          >
            <KnightLogo size={48} spinInterval={9000} />
            <span
              className="font-display text-xl font-extrabold tracking-tight"
              style={{ color: "#F5F0E8" }}
            >
              CLIENT GROWTH
            </span>
          </Link>
          <p style={{ color: "#756D63", fontSize: "0.8rem", marginTop: 16, maxWidth: 320 }}>
            Growth infrastructure for local service businesses.
          </p>
        </div>

        <div>
          <h4
            style={{
              fontSize: 12,
              textTransform: "uppercase",
              letterSpacing: "0.14em",
              fontWeight: 500,
              color: "#756D63",
              marginBottom: 16,
            }}
          >
            Navigation
          </h4>
          <ul className="flex flex-col gap-3">
            {NAV_LINKS.map((l) => (
              <li key={l.href}>
                <Link
                  href={l.href}
                  className="text-[15px] text-[#A69D8D] transition-colors duration-150 hover:text-white"
                >
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h4
            style={{
              fontSize: 12,
              textTransform: "uppercase",
              letterSpacing: "0.14em",
              fontWeight: 500,
              color: "#756D63",
              marginBottom: 16,
            }}
          >
            Legal
          </h4>
          <ul className="flex flex-col gap-3">
            <li>
              <Link
                href="/privacy"
                className="text-[15px] text-[#A69D8D] transition-colors duration-150 hover:text-white"
              >
                Privacy Policy
              </Link>
            </li>
            <li>
              <Link
                href="/terms"
                className="text-[15px] text-[#A69D8D] transition-colors duration-150 hover:text-white"
              >
                Terms of Service
              </Link>
            </li>
            <li>
              <a href="mailto:juan@clientgrowth.ca" className="text-[15px] text-[#D4A853]">
                juan@clientgrowth.ca
              </a>
            </li>
          </ul>
        </div>
      </div>

      {/* Giant wordmark */}
      <div
        aria-hidden="true"
        style={{
          width: "100%",
          textAlign: "center",
          overflow: "hidden",
          padding: "0 12px 24px",
          marginTop: 24,
          lineHeight: 0.82,
          userSelect: "none",
        }}
      >
        <span
          style={{
            display: "block",
            fontFamily: "var(--font-cormorant), Georgia, serif",
            fontWeight: 400,
            fontSize: "clamp(52px, 16vw, 280px)",
            letterSpacing: "-0.02em",
            whiteSpace: "nowrap",
            maxWidth: "100%",
            overflow: "hidden",
            backgroundImage: "linear-gradient(180deg, #F5F0E8 0%, #D4A853 100%)",
            WebkitBackgroundClip: "text",
            backgroundClip: "text",
            WebkitTextFillColor: "transparent",
            color: "#F5F0E8",
          }}
        >
          Client Growth
        </span>
      </div>

      {/* Bottom bar */}
      <div
        style={{
          textAlign: "center",
          borderTop: "1px solid #2A2318",
          padding: "20px max(24px, 5vw)",
        }}
      >
        <p style={{ fontSize: 12, color: "#756D63" }}>
          Operated from Quebec, Canada. Founder-led. Juan@clientgrowth.ca
        </p>
        <p style={{ fontSize: 13, color: "#756D63", marginTop: 4 }}>
          © {currentYear} Client Growth. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
