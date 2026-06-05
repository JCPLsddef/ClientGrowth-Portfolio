import Reveal from "@/components/Reveal";
import WorkCard from "@/components/work/WorkCard";
import { clients, isTodo } from "@/content/work";

// Bento grid of client work. Once screenshots exist, Triple W and Texas span the
// full width as feature cards. Until then it is a clean uniform grid of result
// cards, with no placeholder mockups.
export default function WorkGrid() {
  const anyShots = clients.some((c) => !isTodo(c.shot));

  return (
    <div
      className={
        anyShots
          ? "grid grid-cols-1 gap-5 lg:grid-cols-2"
          : "grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3"
      }
    >
      {clients.map((client, i) => {
        const wide =
          anyShots && (client.span === "feature" || client.span === "wide");
        return (
          <Reveal
            key={client.slug}
            delay={(i % 3) * 0.06}
            className={`h-full ${wide ? "lg:col-span-2" : ""}`}
          >
            <WorkCard client={client} index={String(i + 1).padStart(2, "0")} />
          </Reveal>
        );
      })}
    </div>
  );
}
