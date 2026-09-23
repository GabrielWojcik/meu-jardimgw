import Link from "next/link";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white border-b border-gray-200">
        <div className="container mx-auto px-4 sm:px-6 py-4 flex flex-wrap items-center gap-x-6 gap-y-2">
          <span className="font-bold text-[#2f5e3c]">Painel admin</span>
          <nav className="flex gap-4 text-sm">
            <Link href="/admin/produtos" className="text-gray-600 hover:text-[#2f5e3c]">
              Produtos
            </Link>
            <Link href="/admin/categorias" className="text-gray-600 hover:text-[#2f5e3c]">
              Categorias
            </Link>
          </nav>
          <Link href="/" className="sm:ml-auto text-sm text-gray-500 hover:text-gray-700">
            Voltar à loja
          </Link>
        </div>
      </header>
      <main className="container mx-auto px-4 sm:px-6 py-6 sm:py-8">{children}</main>
    </div>
  );
}
