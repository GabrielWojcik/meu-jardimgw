import { NextRequest, NextResponse } from "next/server";
import { adminApi } from "@/lib/adminApi";
import { requireAdmin, respondFromApiError } from "@/lib/requireAdmin";

interface RouteParams {
  params: Promise<{ id: string }>;
}

export async function DELETE(_req: NextRequest, { params }: RouteParams) {
  const { response } = await requireAdmin();
  if (response) return response;

  const { id } = await params;

  try {
    await adminApi.delete(`/categories/${id}`);
    return new NextResponse(null, { status: 204 });
  } catch (error) {
    return respondFromApiError(error);
  }
}
