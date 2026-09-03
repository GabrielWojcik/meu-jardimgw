import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/authOptions";
import { api, ApiError } from "@/lib/api";
import type { CreateOrderInput, Order } from "@/types/order";

export async function POST(req: NextRequest) {
  const session = await getServerSession(authOptions);

  if (!session?.user?.email) {
    return NextResponse.json({ message: "Faça login para finalizar o pedido" }, { status: 401 });
  }

  const body = (await req.json()) as CreateOrderInput;

  try {
    const order = await api.post<Order>("/orders", {
      ...body,
      customerEmail: session.user.email,
    });
    return NextResponse.json(order);
  } catch (error) {
    if (error instanceof ApiError) {
      return NextResponse.json(error.info ?? { message: error.message }, {
        status: error.status,
      });
    }
    return NextResponse.json({ message: "Erro inesperado" }, { status: 500 });
  }
}
