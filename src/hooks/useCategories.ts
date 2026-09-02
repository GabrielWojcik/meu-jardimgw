import { useQuery } from "@tanstack/react-query";
import { api } from "@/lib/api";
import type { Category } from "@/types/product";

export interface CategoriesQuery {
  kind?: "PLANT" | "POT";
}

export function useCategories(query: CategoriesQuery = {}) {
  return useQuery({
    queryKey: ["categories", query],
    queryFn: () => api.get<Category[]>("/categories", { ...query }),
  });
}
