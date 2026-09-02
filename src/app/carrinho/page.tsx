"use client";
import { QuantitySelector } from "@/components/modules/product/QuantitySelector";
import { FaRegTrashAlt } from "react-icons/fa";
import Image from "next/image";
import { Input } from "antd";
import { IoLocationOutline } from "react-icons/io5";
import { useCartStore } from "@/store/cartStore";

export default function CartPage() {
  const { items, updateQuantity, removeItem, totalItems, totalPrice } =
    useCartStore();

  return (
    <main className="flex-grow max-w-7xl mx-auto w-full px-4 py-8 md:py-12">
      <h1 className="text-3xl font-serif font-bold text-[#2D5A27] mb-8">
        Meu Carrinho
      </h1>
      {items.length === 0 ? (
        <div className="flex items-center justify-center h-[50vh]">
          <p className="text-gray-500 text-center">
            Seu carrinho está vazio :(
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 flex flex-col gap-4">
            {items?.map((value) => {
            return (
              <div
                key={value.id}
                className="bg-white p-4 md:p-6 rounded-3xl shadow-sm flex flex-col md:flex-row items-center gap-6 group hover:shadow-md transition-shadow"
              >
                <div className="w-24 h-24 md:w-32 md:h-32 bg-gray-100 rounded-2xl overflow-hidden flex-shrink-0 relative">
                  {value.image && (
                    <Image
                      src={value.image}
                      alt=""
                      fill
                      className="object-cover"
                    />
                  )}
                </div>
                <div className="flex-grow text-center md:text-left">
                  <span className="text-xs uppercase tracking-wider text-gray-400 font-semibold">
                    Suculentas
                  </span>
                  <h3 className="text-lg font-bold text-gray-800 mt-1">
                    {value.name}
                  </h3>
                  <div className="mt-2 flex items-center justify-center md:justify-start gap-3">
                    <span className="text-[#2D5A27] font-bold text-xl">
                      R$ {value.price}
                    </span>
                  </div>
                </div>
                <div className="flex flex-col items-center md:items-end gap-4">
                  <QuantitySelector
                    initialValue={value.quantity}
                    onChange={(qty) => updateQuantity(value.id, qty)}
                  />
                  <div className="flex gap-2 items-center cursor-pointer">
                    <button
                      onClick={() => removeItem(value.id)}
                      className="cursor-pointer text-gray-400 flex items-center gap-1 text-xs font-medium uppercase tracking-tight"
                    >
                      <FaRegTrashAlt color="#99a1af" />
                      Remover
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
          </div>
          <div className="space-y-6">
            <div className="bg-white p-6 md:p-8 rounded-3xl shadow-sm border border-gray-100">
              <p className="text-xl font-bold text-gray-800 mb-6 pb-4 border-b border-gray-50">
                Resumo do Pedido
              </p>
              <div className="space-y-4 mb-6">
                <div className="flex justify-between">
                  <p>Subtotal ({totalItems()} itens)</p>
                  <span className="font-medium text-gray-800">
                    R$ {totalPrice().toFixed(2).replace(".", ",")}
                  </span>
                </div>
                <div className="flex justify-between">
                  <p>Entrega</p>
                  <span className="font-medium text-gray-800">R$ 15,00</span>
                </div>
              </div>
              <div className="flex items-end gap-2">
                <div className="flex-1">
                  <label
                    htmlFor=""
                    className="text-xs font-bold text-gray-400 uppercase mb-2 block"
                  >
                    Calcular Frete
                  </label>
                  <Input
                    placeholder="00000-000"
                    prefix={<IoLocationOutline color="#9ca3af" size={18} />}
                    style={{
                      borderRadius: "9999px",
                      padding: "8px 16px",
                      borderColor: "#e5e7eb",
                    }}
                  />
                </div>
                <button className="shrink-0 px-5 py-[9px] text-[#2D5A27] font-bold text-sm bg-[#E8F5E9] rounded-full hover:bg-[#d0e9d3] transition-colors">
                  Ok
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}
