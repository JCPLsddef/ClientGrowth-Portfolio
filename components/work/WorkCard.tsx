import Link from "next/link";
import MockupFrame from "@/components/work/MockupFrame";
import SpotlightCard from "@/components/work/SpotlightCard";
import { isTodo, type WorkClient } from "@/content/work";

// One bento card: a browser mockup of the client site, one line of result, and
// a "View live site" link. Wide/feature clients lay the mockup beside the copy.
export default function WorkCard({ client }: { client: WorkClient }) {
  const hasUrl = !isTodo(client.liveUrl);
  const isWide = client.span === "feature" || client.span === "wide";
  const isFeature = client.span === "feature";

  return (
    <SpotlightCard className="h-full rounded-2xl border border-[rgba(212,168,83,0.18)] bg-[#14110D] transition-colors duration-200 hover:border-[rgba(212,168,83,0.45)]">
      <div
        className={
          isWide
            ? "flex h-full flex-col lg:grid lg:grid-cols-[1.4fr_1fr]"
            : "flex h-full flex-col"
        }
      >
        <MockupFrame client={client} />
        <div className="flex flex-1 flex-col justify-center gap-4 p-6 sm:p-7">
          {isFeature && (
            <span
              className="inline-flex w-fit items-center rounded-md px-2 py-0.5 text-[11px] font-bold uppercase tracking-[0.1em]"
              style={{ backgroundColor: "rgba(212,168,83,0.14)", color: "#D4A853" }}
            >
              Signature result
            </span>
          )}
          <p
            className={`font-display font-bold leading-snug text-[#F5F0E8] ${
              isFeature ? "text-2xl" : "text-lg"
            }`}
          >
            {client.result}
          </p>
          <div className="flex flex-wrap items-center gap-x-5 gap-y-2">
            {hasUrl ? (
              <a
                href={client.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm font-semibold text-[#D4A853] underline-offset-4 hover:underline"
              >
                View live site →
              </a>
            ) : (
              <span className="text-sm font-semibold text-[#756D63]">
                {/* TODO: live site URL (content/work.ts -> client.liveUrl) */}
                Live site coming
              </span>
            )}
            {client.caseStudyHref && (
              <Link
                href={client.caseStudyHref}
                className="text-sm font-semibold text-[#F5F0E8] underline-offset-4 hover:underline"
              >
                See the build →
              </Link>
            )}
          </div>
        </div>
      </div>
    </SpotlightCard>
  );
}
