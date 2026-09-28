import { NextRequest, NextResponse } from "next/server";
import { adminApi } from "@/lib/adminApi";
import { requireAdmin, respondFromApiError } from "@/lib/requireAdmin";
import type { Kind } from "@/types/product";

export async function POST(req: NextRequest) {
  const { response } = await requireAdmin();
  if (response) return response;

  const body = await req.json();

  try {
    const kind = await adminApi.post<Kind>("/kinds", body);
    return NextResponse.json(kind);
  } catch (error) {
    return respondFromApiError(error);
  }
}
