import { useQuery } from "@tanstack/react-query";
import { api } from "@/lib/api";
import type { Kind } from "@/types/product";

export function useKinds() {
  return useQuery({
    queryKey: ["kinds"],
    queryFn: () => api.get<Kind[]>("/kinds"),
  });
}
