import { NextRequest, NextResponse } from "next/server";
import { adminApi } from "@/lib/adminApi";
import { requireAdmin, respondFromApiError } from "@/lib/requireAdmin";
import type { Category } from "@/types/product";

export async function POST(req: NextRequest) {
  const { response } = await requireAdmin();
  if (response) return response;

  const body = await req.json();

  try {
    const category = await adminApi.post<Category>("/categories", body);
    return NextResponse.json(category);
  } catch (error) {
    return respondFromApiError(error);
  }
}
