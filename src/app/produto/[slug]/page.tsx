"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import { useProduct } from "@/hooks/useProducts";
import { ProductPageClient } from "./ProductPageClient";

export default function ProductPage() {
  const { slug } = useParams<{ slug: string }>();
  const { data: product, isLoading, isError } = useProduct(slug);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        Carregando...
      </div>
    );
  }

  if (isError || !product) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen gap-4 text-center px-4">
        <p className="text-gray-600">Produto não encontrado.</p>
        <Link href="/catalogo" className="text-green-700 underline">
          Voltar ao catálogo
        </Link>
      </div>
    );
  }

  return <ProductPageClient product={product} />;
}
