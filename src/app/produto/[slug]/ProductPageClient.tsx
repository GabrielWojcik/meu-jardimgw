"use client";

import { Button } from "antd";
import { FaWhatsapp } from "react-icons/fa";
import { GoSun } from "react-icons/go";
import { LuDroplets } from "react-icons/lu";
import { SlSizeFullscreen } from "react-icons/sl";
import Image from "next/image";
import { CareAttribute } from "@/components/modules/product/CareAttribute";
import { QuantitySelector } from "@/components/modules/product/QuantitySelector";
import { useCartStore } from "@/store/cartStore";
import { useCallback, useState } from "react";
import type { Product } from "@/types/product";

interface ProductPageClientProps {
  product: Product;
}

export function ProductPageClient({ product }: ProductPageClientProps) {
  const addItem = useCartStore((state) => state.addItem);
  const items = useCartStore((state) => state.items);
  const [quantity, setQuantity] = useState(1);

  // Calcula quantos items deste produto já estão no carrinho
  const currentCartQuantity =
    items.find((item) => item.id === product.id)?.quantity || 0;

  // Calcula o máximo que pode ser adicionado
  const maxAvailable = product.stock - currentCartQuantity;

  const handleAddToCart = useCallback(() => {
    if (currentCartQuantity >= product.stock) {
      alert("Estoque insuficiente! Você já adicionou o máximo disponível.");
      return;
    }

    const quantityToAdd = Math.min(quantity, maxAvailable);

    addItem(
      {
        id: product.id,
        name: product.title,
        price: product.price,
        image: product.image ?? "",
      },
      quantityToAdd,
    );

    setQuantity(1);
  }, [addItem, product, quantity, currentCartQuantity, maxAvailable]);

  return (
    <div className="flex flex-col h-full py-4 md:pr-4 md:flex-row gap-2">
      <div className="flex items-center justify-center md:pr-4 md:w-1/2">
        {product.image ? (
          <Image
            src={product.image}
            alt={product.title}
            width={600}
            height={600}
            className="h-auto w-full rounded-2xl md:max-h-[600px] object-contain"
          />
        ) : (
          <div className="h-auto w-full aspect-square rounded-2xl bg-gray-100 md:max-h-[600px]" />
        )}
      </div>

      <div className="flex flex-col gap-2 px-4 md:w-1/2 justify-around">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold text-slate-800">{product.title}</h1>
          <span>R${product.price.toFixed(2)}</span>
        </div>
        <div className="flex flex-col gap-4">
          <div className="grid grid-cols-3 gap-3">
            <CareAttribute
              title="LUZ"
              subTitle={product.light ?? "—"}
              icon={GoSun}
              iconColor="#F59E0B"
            />
            <CareAttribute
              title="ÁGUA"
              subTitle={product.water ?? "—"}
              icon={LuDroplets}
              iconColor="#3B82F6"
            />
            <CareAttribute
              title="TAM."
              subTitle={product.size ?? "—"}
              icon={SlSizeFullscreen}
              iconColor="#10B981"
            />
          </div>

          <div className="flex items-center justify-between bg-white p-4 rounded-2xl border border-slate-100 shadow-sm">
            <div className="space-y-0.5">
              <span className="text-xs font-bold text-slate-400 uppercase tracking-tighter">
                Quantidade
              </span>
              {maxAvailable > 0 ? (
                <p className="text-xs text-orange-600 font-medium">
                  Apenas {maxAvailable} disponíveis
                </p>
              ) : (
                <p className="text-xs text-red-600 font-medium">
                  Sem estoque (já no carrinho)
                </p>
              )}
            </div>
            <QuantitySelector
              max={Math.max(1, maxAvailable)}
              initialValue={1}
              onChange={setQuantity}
            />
          </div>
          <div>
            <h3 className="font-bold text-slate-800">Descrição</h3>
            <span className="text-slate-600 leading-relaxed text-sm">
              {product.description}
            </span>
          </div>

          <div className="flex gap-2 flex-col">
            <div className="flex flex-col gap-3">
              <Button
                size="large"
                className="text-base font-semibold rounded-xl"
                onClick={handleAddToCart}
                disabled={maxAvailable <= 0}
              >
                {maxAvailable <= 0 ? "Sem estoque" : "Adicione à sacola"}
              </Button>
              <Button
                size="large"
                className="text-base font-semibold rounded-xl !bg-[#25D366] !text-white !border-[#25D366] hover:!bg-[#20BA5A]"
              >
                <FaWhatsapp size={20} />
                Compre agora
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
