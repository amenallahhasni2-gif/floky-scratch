import cNoir from "@/assets/c-noir.jpg";
import cSahara from "@/assets/c-sahara.jpg";
import cMedina from "@/assets/c-medina.jpg";
import cAtelier from "@/assets/c-atelier.jpg";
import { slugify } from "@/lib/slugify";

export type Collection = {
  title: string;
  slug: string;
  sub: string;
  tag: string;
  img: string;
};

const collectionData = [
  { title: "Essentiels Noir", sub: "12 pièces · Automne 26", tag: "7-14 JOURS", img: cNoir },
  { title: "Sahara Warm", sub: "8 pièces · Édition limitée", tag: "7-14 JOURS", img: cSahara },
  { title: "Medina Blue", sub: "10 pièces · Capsule d'été", tag: "7-14 JOURS", img: cMedina },
  { title: "Atelier Doré", sub: "6 pièces · Numérotées", tag: "7-14 JOURS", img: cAtelier },
] as const;

export const collections: Collection[] = collectionData.map((c) => ({
  ...c,
  slug: slugify(c.title),
}));

export function getCollectionBySlug(slug: string) {
  return collections.find((c) => c.slug === slug);
}
