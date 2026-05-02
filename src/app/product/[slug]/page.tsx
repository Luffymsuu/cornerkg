import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { ProductView } from "@/components/product/ProductView";
import { getProductBySlug } from "@/lib/data/repository";

interface RouteParams {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata(
  { params }: RouteParams,
): Promise<Metadata> {
  const { slug } = await params;
  const product = getProductBySlug(slug);
  if (!product) return { title: "Товар не найден" };
  return {
    title: `${product.title} — ${product.brand}`,
    description: product.description,
    openGraph: {
      title: `${product.title} — ${product.brand}`,
      description: product.description,
      images: product.images.slice(0, 1),
    },
  };
}

export default async function ProductPage({ params }: RouteParams) {
  const { slug } = await params;
  const product = getProductBySlug(slug);
  if (!product) notFound();
  return <ProductView product={product} />;
}
