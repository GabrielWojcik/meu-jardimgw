import { NextRequest, NextResponse } from "next/server";
import { adminApi } from "@/lib/adminApi";
import { requireAdmin, respondFromApiError } from "@/lib/requireAdmin";
import type { Product } from "@/types/product";

interface RouteParams {
  params: Promise<{ id: string }>;
}

export async function PATCH(req: NextRequest, { params }: RouteParams) {
  const { response } = await requireAdmin();
  if (response) return response;

  const { id } = await params;
  const body = await req.json();

  try {
    const product = await adminApi.patch<Product>(`/products/${id}`, body);
    return NextResponse.json(product);
  } catch (error) {
    return respondFromApiError(error);
  }
}

export async function DELETE(_req: NextRequest, { params }: RouteParams) {
  const { response } = await requireAdmin();
  if (response) return response;

  const { id } = await params;

  try {
    await adminApi.delete(`/products/${id}`);
    return new NextResponse(null, { status: 204 });
  } catch (error) {
    return respondFromApiError(error);
  }
}
