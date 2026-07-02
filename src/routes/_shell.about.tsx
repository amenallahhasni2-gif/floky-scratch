import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_shell/about")({
  component: AboutPage,
});

function AboutPage() {
  return (
    <section className="min-h-[70vh] flex flex-col justify-center px-8 py-20 max-w-3xl mx-auto text-center">
      <h1 className="font-serif text-4xl md:text-5xl text-white mb-8">Notre Histoire</h1>
      <p className="text-gray-400 text-lg leading-relaxed">
        FLOKY est née à Tunis avec une conviction simple : le streetwear peut porter une identité locale sans compromis sur la qualité. Chaque collection capsule fusionne l'héritage tunisien avec l'avant-garde urbaine, confectionnée dans nos ateliers à partir de matières nobles et durables.
      </p>
    </section>
  );
}
