import { NextRequest, NextResponse } from "next/server";
import { adminApi } from "@/lib/adminApi";
import { requireAdmin, respondFromApiError } from "@/lib/requireAdmin";
import type { Product } from "@/types/product";

interface RouteParams {
  params: Promise<{ id: string; imageId: string }>;
}

export async function DELETE(_req: NextRequest, { params }: RouteParams) {
  const { response } = await requireAdmin();
  if (response) return response;

  const { id, imageId } = await params;

  try {
    const product = await adminApi.delete<Product>(`/products/${id}/images/${imageId}`);
    return NextResponse.json(product);
  } catch (error) {
    return respondFromApiError(error);
  }
}
