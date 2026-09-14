"use client";

import { Heart } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import type { Product } from "@/types/product";

export function ProductCard({ product }: { product: Product }) {
  return (
    <Link href={`/produto/${product.slug}`} className="block h-full">
      <div className="h-full flex flex-col bg-white rounded-lg shadow-md overflow-hidden group transition-transform duration-300 hover:shadow-xl hover:-translate-y-1">
        <div className="relative h-56 shrink-0 bg-gray-100">
          {product.image && (
            <Image
              src={product.image}
              alt={product.title}
              fill
              className="object-cover"
            />
          )}
          <button className="absolute top-3 right-3 text-gray-400 hover:text-red-500 transition">
            <Heart size={24} />
          </button>
        </div>
        <div className="flex flex-1 flex-col p-4">
          <span className="self-start text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded-full">
            {product.category.name}
          </span>
          <h3 className="text-lg font-semibold text-gray-800 mt-2 mb-1 truncate">
            {product.title}
          </h3>
          <p className="text-sm text-gray-600 line-clamp-2">
            {product.description}
          </p>
        </div>
      </div>
    </Link>
  );
}
