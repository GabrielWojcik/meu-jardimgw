import { useQuery } from "@tanstack/react-query";
import { api } from "@/lib/api";
import type { Paginated, Product, ProductsQuery } from "@/types/product";

export const productKeys = {
  all: ["products"] as const,
  lists: () => [...productKeys.all, "list"] as const,
  list: (query: ProductsQuery) => [...productKeys.lists(), query] as const,
  details: () => [...productKeys.all, "detail"] as const,
  detail: (slug: string) => [...productKeys.details(), slug] as const,
  related: (slug: string) => [...productKeys.all, "related", slug] as const,
};

export function useProducts(query: ProductsQuery = {}) {
  return useQuery({
    queryKey: productKeys.list(query),
    queryFn: () => api.get<Paginated<Product>>("/products", { ...query }),
  });
}

export function useProduct(slug: string) {
  return useQuery({
    queryKey: productKeys.detail(slug),
    queryFn: () => api.get<Product>(`/products/${slug}`),
    enabled: Boolean(slug),
  });
}

export function useRelatedProducts(slug: string) {
  return useQuery({
    queryKey: productKeys.related(slug),
    queryFn: () => api.get<Product[]>(`/products/${slug}/related`),
    enabled: Boolean(slug),
  });
}
