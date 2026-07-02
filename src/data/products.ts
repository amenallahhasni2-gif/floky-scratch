import pHoodie from "@/assets/p-hoodie.jpg";
import pTshirt from "@/assets/p-tshirt.jpg";
import pJacket from "@/assets/p-jacket.jpg";
import pSneakers from "@/assets/p-sneakers.jpg";
import pCap from "@/assets/p-cap.jpg";
import pBag from "@/assets/p-bag.jpg";
import { slugify } from "@/lib/slugify";

export type Product = {
  name: string;
  slug: string;
  collectionSlug: string;
  price: string;
  img: string;
  soldOut: boolean;
};

const productData = [
  { name: "Hoodie Signature", collectionTitle: "Essentiels Noir", price: "89 TND", img: pHoodie, soldOut: false },
  { name: "T-shirt Premium", collectionTitle: "Essentiels Noir", price: "49 TND", img: pTshirt, soldOut: true },
  { name: "Veste Urbaine", collectionTitle: "Atelier Doré", price: "149 TND", img: pJacket, soldOut: false },
  { name: "Sneakers Édition", collectionTitle: "Sahara Warm", price: "129 TND", img: pSneakers, soldOut: false },
  { name: "Casquette Iconique", collectionTitle: "Essentiels Noir", price: "39 TND", img: pCap, soldOut: true },
  { name: "Sac Tech", collectionTitle: "Medina Blue", price: "79 TND", img: pBag, soldOut: false },
] as const;

export const products: Product[] = productData.map((p) => ({
  name: p.name,
  slug: slugify(p.name),
  collectionSlug: slugify(p.collectionTitle),
  price: p.price,
  img: p.img,
  soldOut: p.soldOut,
}));

export function getProductBySlug(slug: string) {
  return products.find((p) => p.slug === slug);
}

export function getProductsByCollectionSlug(collectionSlug: string) {
  return products.filter((p) => p.collectionSlug === collectionSlug);
}
