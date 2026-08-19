import { Banner } from "@/components/Banner";
import { ProductCard } from "@/components/ProductCard";
import { cardMocks } from "@/mocks/cards";
import { categoriesMock } from "@/mocks/categories";
import { CiCircleCheck } from "react-icons/ci";
import { FiShoppingBag } from "react-icons/fi";
import { LuLeaf } from "react-icons/lu";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <div>
      <Banner />

      {/* Seção Nossas Categorias */}
      <section className="bg-[#F8FBF6] py-12 md:py-20">
        <div className="container mx-auto px-6">
          <div className="text-center mb-12">
            <h1 className="text-3xl md:text-5xl text-[#2f5e3c] font-bold mb-4">
              Nossas Categorias
            </h1>
            <p className="text-gray-600">
              Explore nossa variedade de plantas e acessórios para todos os espaços
              e níveis de experiência.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {categoriesMock.map((category) => (
              <a key={category.id} href={category.href} className="block group">
                <div className="bg-white rounded-2xl shadow-md group-hover:shadow-xl transition-shadow duration-300 ease-in-out overflow-hidden h-full">
                  <div className="overflow-hidden">
                    <Image
                      src={category.imagem}
                      alt={category.nome}
                      width={600}
                      height={400}
                      className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300 ease-in-out"
                    />
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-semibold text-gray-800 mb-2">
                      {category.nome}
                    </h3>
                    <p className="text-gray-600 text-sm leading-relaxed">
                      {category.descricao}
                    </p>
                  </div>
                </div>
              </a>
            ))}
          </div>

          <div className="text-center mt-12">
            <Link href="/catalogo">
            <button className="text-[#3C6F4D] border border-[#3C6F4D] py-2 px-4 rounded-md cursor-pointer hover:bg-[#3C6F4D] hover:text-white transition-colors duration-200">
              Ver todas categorias
            </button>
            </Link>
          </div>
        </div>
      </section>

      {/* Seção Produtos em Destaque */}
      <section className="bg-[#F8FBF6] py-12 md:py-20">
        <div className="container mx-auto px-6">
          <div className="flex flex-col gap-4 text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-[#2f5e3c]">
              Produtos em destaque
            </h2>
            <p className="text-gray-600">
              Descubra nossa seleção especial de plantas e acessórios mais
              populares
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 max-w-7xl mx-auto">
            {cardMocks.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
          <div className="text-center mt-12">
            <button className="text-[#3C6F4D] border border-[#3C6F4D] py-2 px-4 rounded-md cursor-pointer hover:bg-[#3C6F4D] hover:text-white transition-colors duration-200">
              Ver todos produtos
            </button>
          </div>
        </div>
      </section>

      {/* Seção de Vantagens */}
      <section className="bg-[#E4F1DC] py-12 md:py-16">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="flex flex-col items-center gap-2 p-6 text-[#3C6F4D] border-[#E4F1DC] rounded-2xl border-2 bg-white">
              <div className="p-4 rounded-full bg-[#E4F1DC]">
                <LuLeaf size={48} color="#3F6212" />
              </div>
              <div className="text-center">
                <h3 className="font-bold text-xl my-2">Plantas Saudáveis</h3>
                <p>
                  Todas as nossas plantas são cultivadas com cuidado e amor para
                  garantir qualidade.
                </p>
              </div>
            </div>
            <div className="flex flex-col items-center gap-2 p-6 text-[#3C6F4D] border-[#E4F1DC] rounded-2xl border-2 bg-white">
              <div className="p-4 rounded-full bg-[#E4F1DC]">
                <FiShoppingBag size={48} color="#3F6212" />
              </div>
              <div className="text-center">
                <h3 className="font-bold text-xl my-2">Entrega Segura</h3>
                <p>
                  Entregamos suas plantas com embalagens especiais para garantir
                  que cheguem intactas.
                </p>
              </div>
            </div>
            <div className="flex flex-col items-center gap-2 p-6 text-[#3C6F4D] border-[#E4F1DC] rounded-2xl border-2 bg-white">
              <div className="p-4 rounded-full bg-[#E4F1DC]">
                <CiCircleCheck size={48} color="#3F6212" />
              </div>
              <div className="text-center">
                <h3 className="font-bold text-xl my-2">
                  Garantia de Satisfação
                </h3>
                <p>
                  Se você não estiver satisfeito com sua compra, nós garantimos
                  a troca ou reembolso.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Seção Newsletter */}
      <section className="bg-[#3C6F4D] py-12 md:py-16 text-white">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-3xl md:text-5xl font-bold mb-4">
            Fique por dentro das novidades
          </h2>
          <p className="mb-6">
            Inscreva-se na nossa newsletter e receba dicas de cuidados com
            plantas, notícias sobre novos produtos e ofertas exclusivas.
          </p>
          <div className="flex gap-2 justify-center mb-4">
            <input
              placeholder="Seu melhor email"
              className="rounded outline-none p-2 text-gray-700 border border-gray-300"
            />
            <button className="bg-white rounded text-[#2f5e3c] p-2 px-6 cursor-pointer hover:bg-gray-100 transition-colors">
              Inscrever
            </button>
          </div>
          <p className="text-sm text-gray-300">
            Nós respeitamos sua privacidade. Cancele a inscrição a qualquer
            momento.
          </p>
        </div>
      </section>
    </div>
  );
}
