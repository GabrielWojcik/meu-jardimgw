"use client";
import { QuantitySelector } from "@/components/modules/product/QuantitySelector";
import { FaRegTrashAlt } from "react-icons/fa";
import Image from "next/image";
import { Button, Form, Input, message } from "antd";
import { useCartStore } from "@/store/cartStore";
import { useSession, signIn } from "next-auth/react";
import { useCreateOrder } from "@/hooks/useOrders";
import { WHATSAPP_NUMBER } from "@/lib/constants";
import type { CreateOrderInput } from "@/types/order";

type DeliveryFormValues = Omit<CreateOrderInput, "items">;

function buildWhatsAppMessage(
  items: { name: string; price: number; quantity: number }[],
  total: number,
  values: DeliveryFormValues
) {
  const lines = items.map(
    (item) => `- ${item.quantity}x ${item.name} — R$ ${(item.price * item.quantity).toFixed(2)}`
  );

  const address = [
    `${values.street}, ${values.number}${values.complement ? `, ${values.complement}` : ""}`,
    `${values.neighborhood} - ${values.city}${values.zipCode ? `, CEP ${values.zipCode}` : ""}`,
  ].join("\n");

  const parts = [
    "Olá! Gostaria de confirmar meu pedido:",
    "",
    ...lines,
    "",
    `Total: R$ ${total.toFixed(2)}`,
    "",
    "Entrega:",
    address,
  ];

  if (values.notes) {
    parts.push("", `Observações: ${values.notes}`);
  }

  return parts.join("\n");
}

export default function CartPage() {
  const { items, updateQuantity, removeItem, totalItems, totalPrice, clearCart } =
    useCartStore();
  const { data: session } = useSession();
  const createOrder = useCreateOrder();
  const [form] = Form.useForm<DeliveryFormValues>();

  const handleFinish = async (values: DeliveryFormValues) => {
    if (!session?.user) {
      signIn("google", { callbackUrl: "/carrinho" });
      return;
    }

    try {
      await createOrder.mutateAsync({
        ...values,
        items: items.map((item) => ({
          productId: item.id,
          quantity: item.quantity,
        })),
      });

      const text = buildWhatsAppMessage(items, totalPrice(), values);
      window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(text)}`, "_blank");
      clearCart();
      form.resetFields();
      message.success("Pedido registrado! Continue a conversa no WhatsApp.");
    } catch {
      message.error("Não foi possível registrar o pedido. Tente novamente.");
    }
  };

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
              </div>

              <p className="text-sm font-bold text-gray-500 uppercase mb-3">
                Dados de entrega
              </p>
              <Form
                layout="vertical"
                form={form}
                onFinish={handleFinish}
                initialValues={{ customerName: session?.user?.name ?? "" }}
              >
                <Form.Item
                  name="customerName"
                  label="Nome"
                  rules={[{ required: true, message: "Informe seu nome" }]}
                >
                  <Input className="!rounded-xl" />
                </Form.Item>
                <Form.Item
                  name="customerPhone"
                  label="Telefone"
                  rules={[{ required: true, message: "Informe seu telefone" }]}
                >
                  <Input className="!rounded-xl" placeholder="(41) 99999-9999" />
                </Form.Item>
                <div className="grid grid-cols-3 gap-2">
                  <div className="col-span-2">
                    <Form.Item
                      name="street"
                      label="Rua"
                      rules={[{ required: true, message: "Informe a rua" }]}
                    >
                      <Input className="!rounded-xl" />
                    </Form.Item>
                  </div>
                  <Form.Item
                    name="number"
                    label="Número"
                    rules={[{ required: true, message: "Nº" }]}
                  >
                    <Input className="!rounded-xl" />
                  </Form.Item>
                </div>
                <Form.Item name="complement" label="Complemento (opcional)">
                  <Input className="!rounded-xl" />
                </Form.Item>
                <div className="grid grid-cols-2 gap-2">
                  <Form.Item
                    name="neighborhood"
                    label="Bairro"
                    rules={[{ required: true, message: "Informe o bairro" }]}
                  >
                    <Input className="!rounded-xl" />
                  </Form.Item>
                  <Form.Item
                    name="city"
                    label="Cidade"
                    rules={[{ required: true, message: "Informe a cidade" }]}
                  >
                    <Input className="!rounded-xl" />
                  </Form.Item>
                </div>
                <Form.Item name="zipCode" label="CEP (opcional)">
                  <Input className="!rounded-xl" placeholder="00000-000" />
                </Form.Item>
                <Form.Item name="notes" label="Observações (opcional)">
                  <Input.TextArea className="!rounded-xl" rows={2} />
                </Form.Item>

                <Button
                  type="primary"
                  htmlType="submit"
                  size="large"
                  block
                  loading={createOrder.isPending}
                  className="!bg-[#2D5A27] hover:!bg-[#234a1f] !rounded-xl mt-4 transition-colors"
                >
                  {session?.user
                    ? "Finalizar pedido via WhatsApp"
                    : "Fazer login para finalizar"}
                </Button>
              </Form>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}
