import "server-only";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import { authOptions } from "@/lib/authOptions";
import { ApiError } from "@/lib/api";

/** Revalida sessão + allowlist no servidor (defesa em profundidade além do middleware) */
export async function requireAdmin() {
  const session = await getServerSession(authOptions);

  if (!session?.user?.isAdmin) {
    return {
      session: null,
      response: NextResponse.json({ message: "Não autorizado" }, { status: 403 }),
    } as const;
  }

  return { session, response: null } as const;
}

/** Repassa status + corpo de erro da API real pro client conseguir mostrar a mensagem */
export function respondFromApiError(error: unknown) {
  if (error instanceof ApiError) {
    return NextResponse.json(error.info ?? { message: error.message }, {
      status: error.status,
    });
  }

  return NextResponse.json({ message: "Erro inesperado" }, { status: 500 });
}
