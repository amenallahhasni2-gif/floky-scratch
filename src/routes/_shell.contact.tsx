import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_shell/contact")({
  component: ContactPage,
});

function ContactPage() {
  return (
    <section className="min-h-[70vh] flex flex-col justify-center px-8 py-20 max-w-3xl mx-auto text-center">
      <h1 className="font-serif text-4xl md:text-5xl text-white mb-8">Contact</h1>
      <p className="text-gray-400 text-lg leading-relaxed">
        Une question sur une commande, une collection ou une collaboration ? Écrivez-nous à contact@floky.tn — notre équipe vous répond sous 48 heures.
      </p>
    </section>
  );
}
