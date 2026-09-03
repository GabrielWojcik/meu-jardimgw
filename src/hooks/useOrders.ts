import { useMutation } from "@tanstack/react-query";
import { adminClient } from "@/lib/adminClient";
import type { CreateOrderInput, Order } from "@/types/order";

export function useCreateOrder() {
  return useMutation({
    mutationFn: (input: CreateOrderInput) =>
      adminClient.post<Order>("/api/orders", input),
  });
}
