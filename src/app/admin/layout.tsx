"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const TABS = [
  { href: "/admin/produtos", label: "Produtos" },
  { href: "/admin/categorias", label: "Categorias" },
  { href: "/admin/tipos", label: "Tipos" },
];

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white border-b border-gray-200">
        <div className="container mx-auto px-4 sm:px-6 pt-4 flex flex-wrap items-center gap-x-6 gap-y-2">
          <span className="font-bold text-[#2f5e3c]">Painel admin</span>
          <Link href="/" className="sm:ml-auto text-sm text-gray-500 hover:text-gray-700">
            Voltar à loja
          </Link>
        </div>
        <nav className="container mx-auto px-4 sm:px-6 flex gap-2 text-sm mt-3">
          {TABS.map((tab) => {
            const isActive = pathname?.startsWith(tab.href);
            return (
              <Link
                key={tab.href}
                href={tab.href}
                className={`px-4 py-2 rounded-t-lg font-medium transition-colors ${
                  isActive
                    ? "bg-[#2f5e3c] text-white"
                    : "text-gray-500 hover:bg-gray-100 hover:text-[#2f5e3c]"
                }`}
              >
                {tab.label}
              </Link>
            );
          })}
        </nav>
      </header>
      <main className="container mx-auto px-4 sm:px-6 py-6 sm:py-8">{children}</main>
    </div>
  );
}
