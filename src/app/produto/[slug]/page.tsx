import { cardMocks } from "@/mocks/cards";
import { potMocks } from "@/mocks/pots";
import { ProductPageClient } from "./ProductPageClient";
import { notFound } from "next/navigation";

interface ProductPageProps {
  params: Promise<{ slug: string }>;
}

export default async function ProductPage({ params }: ProductPageProps) {
  const { slug } = await params;
  const id = parseInt(slug.split("-").pop() || "0");

  const product = [...cardMocks, ...potMocks].find((p) => p.id === id);

  if (!product) {
    notFound();
  }

  return <ProductPageClient product={product} />;
}
