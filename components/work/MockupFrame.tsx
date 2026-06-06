"use client";

import Image from "next/image";
import { isTodo, type WorkClient } from "@/content/work";
import { useLang } from "@/components/LanguageProvider";

// Browser-chrome frame around a client site screenshot. Until a real screenshot
// is supplied (content/work.ts -> client.shot) it shows a neutral on-brand
// placeholder so the grid looks intentional. The fixed 16:10 aspect ratio keeps
// layout shift at zero when the real image lands.
export default function MockupFrame({ client }: { client: WorkClient }) {
  const { t } = useLang();
  const hasShot = !isTodo(client.shot);
  const hasUrl = !isTodo(client.liveUrl);
  const displayUrl = hasUrl
    ? client.liveUrl.replace(/^https?:\/\//, "").replace(/\/$/, "")
    : "yoursite.com";

  return (
    <div className="overflow-hidden">
      {/* Browser chrome */}
      <div
        className="flex h-8 items-center gap-1.5 border-b px-3"
        style={{
          borderColor: "rgba(255,255,255,0.06)",
          backgroundColor: "rgba(255,255,255,0.02)",
        }}
      >
        <span className="h-2.5 w-2.5 rounded-full" style={{ backgroundColor: "#3A332A" }} />
        <span className="h-2.5 w-2.5 rounded-full" style={{ backgroundColor: "#3A332A" }} />
        <span className="h-2.5 w-2.5 rounded-full" style={{ backgroundColor: "#3A332A" }} />
        <span
          className="ml-3 truncate rounded-full px-3 py-0.5 text-[11px] text-[#A69D8D]"
          style={{ backgroundColor: "rgba(0,0,0,0.35)" }}
        >
          {displayUrl}
        </span>
      </div>

      {/* Screenshot or neutral placeholder, fixed aspect ratio */}
      <div className="relative aspect-[16/10] w-full" style={{ backgroundColor: "#0D0B09" }}>
        {hasShot ? (
          <Image
            src={client.shot}
            alt={`${client.name} website`}
            fill
            sizes="(max-width: 1024px) 100vw, 50vw"
            className="object-cover object-top grayscale transition duration-500 group-hover:grayscale-0"
          />
        ) : (
          <div className="flex h-full w-full flex-col items-center justify-center gap-1 px-4 text-center">
            {/* TODO: desktop screenshot (content/work.ts -> client.shot) */}
            <span className="font-display text-sm font-bold text-[#D4A853]">
              {client.name}
            </span>
            <span className="text-[10px] uppercase tracking-[0.18em] text-[#756D63]">
              {t.work.screenshotComing}
            </span>
          </div>
        )}
      </div>
    </div>
  );
}
