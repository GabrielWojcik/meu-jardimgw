"use client";

import { Button, Modal, Table, Tag, message } from "antd";
import type { ColumnsType } from "antd/es/table";
import Image from "next/image";
import Link from "next/link";
import { useProducts } from "@/hooks/useProducts";
import { useDeleteProduct } from "@/hooks/useAdminProducts";
import type { Product } from "@/types/product";

export default function AdminProductsPage() {
  const { data, isLoading, isError } = useProducts({
    includeInactive: true,
    limit: 60,
  });
  const deleteProduct = useDeleteProduct();
  const [messageApi, contextHolder] = message.useMessage();

  const products = data?.data ?? [];

  const handleDelete = (product: Product) => {
    Modal.confirm({
      title: `Excluir "${product.title}"?`,
      content: "Essa ação não pode ser desfeita.",
      okText: "Excluir",
      okType: "danger",
      cancelText: "Cancelar",
      onOk: async () => {
        try {
          await deleteProduct.mutateAsync(product.id);
          messageApi.success("Produto excluído.");
        } catch {
          messageApi.error("Não foi possível excluir o produto.");
        }
      },
    });
  };

  const columns: ColumnsType<Product> = [
    {
      title: "",
      dataIndex: "image",
      width: 64,
      render: (image: string | null, product) => (
        <div className="relative w-12 h-12 rounded bg-gray-100 overflow-hidden">
          {image && (
            <Image src={image} alt={product.title} fill className="object-cover" />
          )}
        </div>
      ),
    },
    {
      title: "Produto",
      dataIndex: "title",
    },
    {
      title: "Categoria",
      dataIndex: ["category", "name"],
    },
    {
      title: "Preço",
      dataIndex: "price",
      render: (price: number) => `R$ ${price.toFixed(2)}`,
    },
    {
      title: "Estoque",
      dataIndex: "stock",
    },
    {
      title: "Status",
      dataIndex: "active",
      render: (active: boolean) =>
        active ? <Tag color="green">Ativo</Tag> : <Tag color="default">Inativo</Tag>,
    },
    {
      title: "Ações",
      render: (_, product) => (
        <div className="flex gap-3">
          <Link href={`/admin/produtos/${product.slug}/editar`}>Editar</Link>
          <button
            className="text-red-600 cursor-pointer"
            onClick={() => handleDelete(product)}
          >
            Excluir
          </button>
        </div>
      ),
    },
  ];

  return (
    <div>
      {contextHolder}
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Produtos</h1>
        <Link href="/admin/produtos/novo">
          <Button type="primary">Novo produto</Button>
        </Link>
      </div>

      {isError && (
        <p className="text-red-600">Não foi possível carregar os produtos.</p>
      )}

      <Table
        rowKey="id"
        columns={columns}
        dataSource={products}
        loading={isLoading}
        pagination={false}
      />
    </div>
  );
}
