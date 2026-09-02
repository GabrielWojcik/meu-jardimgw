"use client";

import Image from "next/image";
import { useCategories } from "@/hooks/useCategories";

export function CategoriesSection() {
  const { data: categories, isLoading, isError } = useCategories({
    kind: "PLANT",
  });

  if (isLoading) {
    return (
      <p className="text-center text-gray-500">Carregando categorias...</p>
    );
  }

  if (isError) {
    return (
      <p className="text-center text-red-600">
        Não foi possível carregar as categorias.
      </p>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
      {categories?.map((category) => (
        <a
          key={category.id}
          href={`/catalogo?category=${encodeURIComponent(category.name)}`}
          className="block group"
        >
          <div className="bg-white rounded-2xl shadow-md group-hover:shadow-xl transition-shadow duration-300 ease-in-out overflow-hidden h-full">
            <div className="overflow-hidden bg-gray-100 h-64">
              {category.imageUrl && (
                <Image
                  src={category.imageUrl}
                  alt={category.name}
                  width={600}
                  height={400}
                  className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300 ease-in-out"
                />
              )}
            </div>
            <div className="p-6">
              <h3 className="text-xl font-semibold text-gray-800 mb-2">
                {category.name}
              </h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                {category.description}
              </p>
            </div>
          </div>
        </a>
      ))}
    </div>
  );
}
