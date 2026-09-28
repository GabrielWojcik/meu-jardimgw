import { useMutation, useQueryClient } from "@tanstack/react-query";
import { adminClient } from "@/lib/adminClient";
import type { Kind, KindInput } from "@/types/product";

export function useCreateKind() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (input: KindInput) =>
      adminClient.post<Kind>("/api/admin/kinds", input),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["kinds"] });
    },
  });
}

export function useDeleteKind() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => adminClient.delete(`/api/admin/kinds/${id}`),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["kinds"] });
    },
  });
}
