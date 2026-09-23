"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useCallback, useMemo, useRef, useState } from "react";
import { Carousel } from "antd";
import type { CarouselRef } from "antd/es/carousel";
import {
  ChevronLeft,
  ChevronRight,
  Minus,
  Plus,
  ShoppingCart,
  Star,
} from "lucide-react";
import { GoSun } from "react-icons/go";
import { LuDroplets } from "react-icons/lu";
import { SlSizeFullscreen } from "react-icons/sl";
import { useCartStore } from "@/store/cartStore";
import type { Product } from "@/types/product";

interface ProductPageClientProps {
  product: Product;
}

// Ainda não há campo de avaliação vindo da API; usamos um valor fixo até isso existir.
const STATIC_RATING = 4.5;
const STATIC_REVIEW_COUNT = 50;

type TabKey = "descricao" | "cuidados" | "especificacoes";

const TABS: { key: TabKey; label: string }[] = [
  { key: "descricao", label: "Descrição" },
  { key: "cuidados", label: "Cuidados" },
  { key: "especificacoes", label: "Especificações" },
];

export function ProductPageClient({ product }: ProductPageClientProps) {
  const router = useRouter();
  const addItem = useCartStore((state) => state.addItem);
  const items = useCartStore((state) => state.items);
  const [quantity, setQuantity] = useState(1);
  const [activeImage, setActiveImage] = useState(0);
  const [activeTab, setActiveTab] = useState<TabKey>("descricao");
  const carouselRef = useRef<CarouselRef>(null);

  const currentCartQuantity =
    items.find((item) => item.id === product.id)?.quantity || 0;
  const maxAvailable = product.stock - currentCartQuantity;

  const images = useMemo(() => {
    if (product.images && product.images.length > 0) {
      return [...product.images]
        .sort((a, b) => a.position - b.position)
        .map((img) => img.url);
    }
    return product.image ? [product.image] : [];
  }, [product.images, product.image]);

  const isPlant = product.kind === "PLANT";

 

  const addToCart = useCallback(
    (qty: number) => {
      if (currentCartQuantity >= product.stock) {
        alert("Estoque insuficiente! Você já adicionou o máximo disponível.");
        return false;
      }

      const quantityToAdd = Math.min(qty, maxAvailable);
      addItem(
        {
          id: product.id,
          name: product.title,
          price: product.price,
          image: product.image ?? "",
        },
        quantityToAdd,
      );
      return true;
    },
    [addItem, product, currentCartQuantity, maxAvailable],
  );

  const handleAddToCart = useCallback(() => {
    if (addToCart(quantity)) {
      setQuantity(1);
    }
  }, [addToCart, quantity]);

  const handleBuyNow = useCallback(() => {
    if (addToCart(quantity)) {
      setQuantity(1);
      router.push("/carrinho");
    }
  }, [addToCart, quantity, router]);

  const goToImage = useCallback((index: number) => {
    carouselRef.current?.goTo(index);
  }, []);

  const handlePrev = useCallback(() => {
    carouselRef.current?.prev();
  }, []);

  const handleNext = useCallback(() => {
    carouselRef.current?.next();
  }, []);

  return (
    <div className="max-w-6xl mx-auto w-full px-4 py-6 md:py-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Galeria */}
        <div>
          <div className="relative bg-slate-50 rounded-2xl overflow-hidden">
            {images.length > 0 ? (
              <Carousel
                ref={carouselRef}
                dots={false}
                infinite
                afterChange={setActiveImage}
              >
                {images.map((url, index) => (
                  <div key={url + index}>
                    <div className="relative w-full aspect-square">
                      <Image
                        src={url}
                        alt={`${product.title} - imagem ${index + 1}`}
                        fill
                        className="object-cover"
                        priority={index === 0}
                      />
                    </div>
                  </div>
                ))}
              </Carousel>
            ) : (
              <div className="w-full aspect-square rounded-xl bg-slate-100" />
            )}

            {images.length > 1 && (
              <>
                <button
                  type="button"
                  onClick={handlePrev}
                  aria-label="Imagem anterior"
                  className="absolute left-2 top-1/2 -translate-y-1/2 z-10 flex h-9 w-9 items-center justify-center rounded-full bg-white/80 text-slate-700 shadow-sm hover:bg-white transition"
                >
                  <ChevronLeft size={20} />
                </button>
                <button
                  type="button"
                  onClick={handleNext}
                  aria-label="Próxima imagem"
                  className="absolute right-2 top-1/2 -translate-y-1/2 z-10 flex h-9 w-9 items-center justify-center rounded-full bg-white/80 text-slate-700 shadow-sm hover:bg-white transition"
                >
                  <ChevronRight size={20} />
                </button>
              </>
            )}
          </div>

          {images.length > 1 && (
            <div className="flex justify-center items-center gap-1.5 mt-3">
              {images.map((url, index) => (
                <button
                  key={url + index}
                  type="button"
                  aria-label={`Ver imagem ${index + 1}`}
                  onClick={() => goToImage(index)}
                  className={`h-1.5 rounded-full transition-all ${
                    index === activeImage
                      ? "w-6 bg-emerald-800"
                      : "w-1.5 bg-slate-300"
                  }`}
                />
              ))}
            </div>
          )}

          {images.length > 1 && (
            <div className="flex flex-wrap justify-center gap-3 mt-3">
              {images.map((url, index) => (
                <button
                  key={url + index}
                  type="button"
                  onClick={() => goToImage(index)}
                  className={`relative w-[calc(25%-0.5625rem)] aspect-square rounded-xl overflow-hidden border-2 bg-slate-50 ${
                    index === activeImage
                      ? "border-emerald-700"
                      : "border-transparent"
                  }`}
                >
                  <Image
                    src={url}
                    alt={`${product.title} - imagem ${index + 1}`}
                    fill
                    className="object-cover"
                  />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Informações */}
        <div className="flex flex-col h-full">
          <div className="flex flex-col gap-4">
            <div>
              <h1 className="text-2xl md:text-3xl font-bold text-emerald-900">
                {product.title}
              </h1>
              <div className="flex items-center gap-1.5 mt-1.5">
                <div className="flex items-center gap-0.5">
                  {Array.from({ length: 5 }).map((_, index) => (
                    <Star
                      key={index}
                      size={16}
                      className={
                        index < Math.floor(STATIC_RATING)
                          ? "fill-amber-400 text-amber-400"
                          : "text-slate-300"
                      }
                    />
                  ))}
                </div>
                <span className="text-sm text-slate-500">
                  {STATIC_RATING} ({STATIC_REVIEW_COUNT} avaliações)
                </span>
              </div>
            </div>

            <div className="bg-emerald-50 rounded-2xl px-4 py-3.5">
              <span className="text-2xl font-bold text-emerald-900">
                R$ {product.price.toFixed(2)}
              </span>
              <p className="text-xs text-slate-500 mt-0.5">
                ou 3x de R$ {(product.price / 3).toFixed(2)} sem juros
              </p>
            </div>

            <div className="flex items-center gap-2">
              <span
                className={`h-2 w-2 rounded-full ${
                  product.stock > 0 ? "bg-emerald-500" : "bg-red-500"
                }`}
              />
              <span className="text-sm text-slate-600">
                {product.stock > 0
                  ? `${product.stock} em estoque`
                  : "Sem estoque"}
              </span>
            </div>

            <p className="text-sm text-slate-600 leading-relaxed break-words">
              {product.description}
            </p>

            <div className="flex items-center gap-3">
              <span className="text-sm font-semibold text-slate-700">
                Quantidade:
              </span>
              <div className="flex items-center gap-3 rounded-lg bg-slate-100 p-1">
                <button
                  type="button"
                  onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                  disabled={quantity <= 1}
                  className="flex h-7 w-7 items-center cursor-pointer justify-center rounded-md bg-white text-slate-700 shadow-sm disabled:cursor-not-allowed disabled:opacity-50"
                  aria-label="Diminuir quantidade"
                >
                  <Minus size={14} />
                </button>
                <span className="w-4 text-center text-sm font-bold text-slate-800">
                  {quantity}
                </span>
                <button
                  type="button"
                  onClick={() =>
                    setQuantity((q) => Math.min(Math.max(1, maxAvailable), q + 1))
                  }
                  disabled={quantity >= Math.max(1, maxAvailable)}
                  className="flex h-7 w-7 items-center cursor-pointer justify-center rounded-md bg-white text-slate-700 shadow-sm disabled:cursor-not-allowed disabled:opacity-50"
                  aria-label="Aumentar quantidade"
                >
                  <Plus size={14} />
                </button>
              </div>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 mt-auto pt-6">
            <button
              type="button"
              onClick={handleAddToCart}
              disabled={maxAvailable <= 0}
              className="flex-1 cursor-pointer flex items-center justify-center gap-2 border border-slate-200 bg-white text-slate-800 font-semibold text-sm rounded-xl py-3 px-4 hover:bg-slate-50 transition disabled:cursor-not-allowed disabled:opacity-50"
            >
              <ShoppingCart size={18} />
              {maxAvailable <= 0 ? "Sem estoque" : "Adicionar ao Carrinho"}
            </button>
            <button
              type="button"
              onClick={handleBuyNow}
              disabled={maxAvailable <= 0}
              className="flex-1 cursor-pointer flex items-center justify-center gap-2 bg-emerald-800 text-white font-semibold text-sm rounded-xl py-3 px-4 hover:bg-emerald-900 transition disabled:cursor-not-allowed disabled:opacity-50"
            >
              Comprar Agora
            </button>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="mt-8">
        <div className="flex bg-slate-100 rounded-full p-1 gap-1">
          {TABS.map((tab) => (
            <button
              key={tab.key}
              type="button"
              onClick={() => setActiveTab(tab.key)}
              className={`flex-1 cursor-pointer text-sm font-semibold py-2.5 rounded-full transition ${
                activeTab === tab.key
                  ? "bg-white text-slate-800 shadow-sm"
                  : "text-slate-500 hover:text-slate-700"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        <div className="bg-white border border-slate-100 rounded-2xl p-6 mt-4 shadow-sm">
          {activeTab === "descricao" && (
            <div className="flex flex-col gap-4">
              <h3 className="text-lg font-bold text-emerald-900">
                Sobre este produto
              </h3>
              <p className="text-sm text-slate-600 leading-relaxed break-words">
                {product.description}
              </p>
            </div>
          )}

          {activeTab === "cuidados" && (
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="flex flex-col items-center text-center gap-2 p-4 rounded-xl bg-slate-50">
                <GoSun color="#F59E0B" size={22} />
                <span className="text-xs font-bold text-slate-400 uppercase tracking-tighter">
                  Luz
                </span>
                <span className="text-sm font-semibold text-slate-700">
                  {product.light ?? "—"}
                </span>
              </div>
              <div className="flex flex-col items-center text-center gap-2 p-4 rounded-xl bg-slate-50">
                <LuDroplets color="#3B82F6" size={22} />
                <span className="text-xs font-bold text-slate-400 uppercase tracking-tighter">
                  Água
                </span>
                <span className="text-sm font-semibold text-slate-700">
                  {product.water ?? "—"}
                </span>
              </div>
              <div className="flex flex-col items-center text-center gap-2 p-4 rounded-xl bg-slate-50">
                <SlSizeFullscreen color="#10B981" size={22} />
                <span className="text-xs font-bold text-slate-400 uppercase tracking-tighter">
                  Tamanho
                </span>
                <span className="text-sm font-semibold text-slate-700">
                  {product.size ?? "—"}
                </span>
              </div>
            </div>
          )}

          {activeTab === "especificacoes" && (
            <dl className="flex flex-col divide-y divide-slate-100">
              <div className="flex items-center justify-between py-3 text-sm">
                <dt className="text-slate-500">Categoria</dt>
                <dd className="font-semibold text-slate-800">
                  {product.category.name}
                </dd>
              </div>
              <div className="flex items-center justify-between py-3 text-sm">
                <dt className="text-slate-500">Tipo</dt>
                <dd className="font-semibold text-slate-800">
                  {isPlant ? "Planta" : "Vaso"}
                </dd>
              </div>
              <div className="flex items-center justify-between py-3 text-sm">
                <dt className="text-slate-500">Tamanho</dt>
                <dd className="font-semibold text-slate-800">
                  {product.size ?? "—"}
                </dd>
              </div>
              <div className="flex items-center justify-between py-3 text-sm">
                <dt className="text-slate-500">Estoque</dt>
                <dd className="font-semibold text-slate-800">
                  {product.stock} unidades
                </dd>
              </div>
            </dl>
          )}
        </div>
      </div>
    </div>
  );
}
