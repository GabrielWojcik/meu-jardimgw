import { NextRequest, NextResponse } from "next/server";
import { adminApi } from "@/lib/adminApi";
import { requireAdmin, respondFromApiError } from "@/lib/requireAdmin";
import type { Product } from "@/types/product";

interface RouteParams {
  params: Promise<{ id: string }>;
}

export async function POST(req: NextRequest, { params }: RouteParams) {
  const { response } = await requireAdmin();
  if (response) return response;

  const { id } = await params;
  const form = await req.formData();

  try {
    const product = await adminApi.postForm<Product>(`/products/${id}/images`, form);
    return NextResponse.json(product);
  } catch (error) {
    return respondFromApiError(error);
  }
}
