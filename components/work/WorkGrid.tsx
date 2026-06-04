import Reveal from "@/components/Reveal";
import WorkCard from "@/components/work/WorkCard";
import { clients } from "@/content/work";

// Bento grid of client work. Triple W (feature) and Texas (wide) span the full
// width as horizontal cards; the remaining four sit two-up. Single column on
// mobile, in array order (Triple W first).
export default function WorkGrid() {
  return (
    <div className="grid grid-cols-1 gap-5 lg:grid-cols-2">
      {clients.map((client, i) => {
        const wide = client.span === "feature" || client.span === "wide";
        return (
          <Reveal
            key={client.slug}
            delay={(i % 2) * 0.08}
            className={`h-full ${wide ? "lg:col-span-2" : ""}`}
          >
            <WorkCard client={client} />
          </Reveal>
        );
      })}
    </div>
  );
}
