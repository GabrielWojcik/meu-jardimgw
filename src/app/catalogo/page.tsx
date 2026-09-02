"use client";
import { Suspense, useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { useFilterStore } from "@/store/filterStore";
import { ProductCard } from "@/components/ProductCard";
import { useProducts } from "@/hooks/useProducts";

const categories = ["Suculentas", "Orquídeas", "Samambaias"];

// Componente que usa useSearchParams
function CatalogoContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const { category, setCategory } = useFilterStore();
  const { data, isLoading, isError } = useProducts({
    category: category ?? undefined,
  });
  const products = data?.data ?? [];

  useEffect(() => {
    const categoryFromUrl = searchParams.get("category");
    setCategory(categoryFromUrl);
  }, [searchParams, setCategory]);

  const handleCategoryChange = (newCategory: string | null) => {
    setCategory(newCategory);

    const params = new URLSearchParams(searchParams.toString());
    if (newCategory) {
      params.set("category", newCategory);
    } else {
      params.delete("category");
    }
    router.push(`?${params.toString()}`);
  };

  return (
    <div className="bg-gray-50 min-h-screen font-sans">
      <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Cabeçalho da página */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-800">Nosso Catálogo</h1>
          <p className="text-lg text-gray-600 mt-2">
            Explore nossa variedade de plantas e acessórios para todos os
            espaços.
          </p>
        </div>

        {/* Filtros */}
        <div className="flex flex-wrap gap-2 mb-6">
          <button
            onClick={() => handleCategoryChange(null)}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
              category === null
                ? "bg-green-600 text-white"
                : "bg-white text-gray-600 hover:bg-gray-100"
            }`}
          >
            Todos
          </button>
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => handleCategoryChange(cat)}
              className={`px-4 py-2 cursor-pointer rounded-full text-sm font-medium transition-colors ${
                category === cat
                  ? "bg-green-600 text-white"
                  : "bg-white text-gray-600 hover:bg-gray-100"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Info */}
        <div className="flex justify-between items-center mb-8 p-4 bg-white rounded-lg shadow-sm">
          <div className="text-gray-600">
            Mostrando{" "}
            <span className="font-semibold">{products.length}</span>{" "}
            produtos
          </div>
        </div>

        {/* Grade de Produtos */}
        {isLoading && <p className="text-gray-500">Carregando produtos...</p>}
        {isError && (
          <p className="text-red-600">
            Não foi possível carregar os produtos. Tente novamente.
          </p>
        )}
        {!isLoading && !isError && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </main>
      {/* Seção de Vantagens */}
      <section className="bg-lime-50/80 py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div className="flex flex-col items-center p-6 bg-white rounded-xl shadow-sm">
              <div className="bg-lime-100 p-4 rounded-full mb-4">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="32"
                  height="32"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="text-green-700"
                >
                  <path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z" />
                  <path d="M12 8v4l2 2" />
                  <path d="m15.82 4.18 1.44 1.44M6.74 6.74l1.44 1.44m-2.9 5.82h2.88m10.66 0h2.88M6.74 17.26l1.44-1.44m8.52 1.44 1.44 1.44" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">
                Plantas Saudáveis
              </h3>
              <p className="text-gray-600">
                Todas as nossas plantas são cultivadas com cuidado e amor para
                garantir qualidade.
              </p>
            </div>
            <div className="flex flex-col items-center p-6 bg-white rounded-xl shadow-sm">
              <div className="bg-lime-100 p-4 rounded-full mb-4">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="32"
                  height="32"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="text-green-700"
                >
                  <path d="M10.59 16.41 15.17 12l-4.58-4.41L12 6l6 6-6 6-1.41-1.41z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">
                Entrega Segura
              </h3>
              <p className="text-gray-600">
                Entregamos suas plantas com embalagens especiais para garantir
                que cheguem intactas.
              </p>
            </div>
            <div className="flex flex-col items-center p-6 bg-white rounded-xl shadow-sm">
              <div className="bg-lime-100 p-4 rounded-full mb-4">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="32"
                  height="32"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="text-green-700"
                >
                  <path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z" />
                  <path d="m9 12 2 2 4-4" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">
                Garantia de Satisfação
              </h3>
              <p className="text-gray-600">
                Se você não estiver satisfeito com sua compra, nós garantimos a
                troca ou reembolso.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

// Componente principal com Suspense
export default function CatalogoPage() {
  return (
    <Suspense fallback={<div className="flex items-center justify-center min-h-screen">Carregando...</div>}>
      <CatalogoContent />
    </Suspense>
  );
}
