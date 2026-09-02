import { NextRequest, NextResponse } from "next/server";
import { adminApi } from "@/lib/adminApi";
import { requireAdmin, respondFromApiError } from "@/lib/requireAdmin";
import type { Product } from "@/types/product";

export async function POST(req: NextRequest) {
  const { response } = await requireAdmin();
  if (response) return response;

  const body = await req.json();

  try {
    const product = await adminApi.post<Product>("/products", body);
    return NextResponse.json(product);
  } catch (error) {
    return respondFromApiError(error);
  }
}
