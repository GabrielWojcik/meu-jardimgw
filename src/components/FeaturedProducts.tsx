"use client";

import { ProductCard } from "@/components/ProductCard";
import { useProducts } from "@/hooks/useProducts";

export function FeaturedProducts() {
  const { data, isLoading, isError } = useProducts({ featured: true });
  const products = data?.data ?? [];

  if (isLoading) {
    return <p className="text-center text-gray-500">Carregando produtos...</p>;
  }

  if (isError) {
    return (
      <p className="text-center text-red-600">
        Não foi possível carregar os produtos em destaque.
      </p>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 max-w-7xl mx-auto">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
}
