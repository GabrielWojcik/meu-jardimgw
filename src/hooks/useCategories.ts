import { useQuery } from "@tanstack/react-query";
import { api } from "@/lib/api";
import type { Category } from "@/types/product";

export interface CategoriesQuery {
  /** id ou slug do tipo (ex: "PLANT") */
  kind?: string;
}

export function useCategories(query: CategoriesQuery = {}) {
  return useQuery({
    queryKey: ["categories", query],
    queryFn: () => api.get<Category[]>("/categories", { ...query }),
  });
}
