import { createFileRoute } from "@tanstack/react-router";
import { Hero } from "@/components/sections/Hero";
import { Quality } from "@/components/sections/Quality";
import { Countdown } from "@/components/sections/Countdown";
import { Collections } from "@/components/sections/Collections";
import { Boutique } from "@/components/sections/Boutique";
import { Reviews } from "@/components/sections/Reviews";

export const Route = createFileRoute("/_shell/")({
  component: HomePage,
});

function HomePage() {
  return (
    <>
      <Hero />
      <Quality />
      <section className="px-8 py-8 max-w-7xl mx-auto flex justify-center md:justify-end">
        <Countdown />
      </section>
      <Collections mode="preview" showCountdown={false} />
      <Boutique mode="preview" />
      <Reviews />
    </>
  );
}
