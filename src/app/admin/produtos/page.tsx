"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { Button, Modal, Table, Tag, message } from "antd";
import type { ColumnsType } from "antd/es/table";
import Image from "next/image";
import Link from "next/link";
import { useProducts } from "@/hooks/useProducts";
import { useDeleteProduct } from "@/hooks/useAdminProducts";
import type { Product } from "@/types/product";

export default function AdminProductsPage() {
  const router = useRouter();
  const { data, isLoading, isError } = useProducts({
    includeInactive: true,
    limit: 60,
  });
  const deleteProduct = useDeleteProduct();
  const [messageApi, messageContextHolder] = message.useMessage();
  const [modal, modalContextHolder] = Modal.useModal();
  const [isNavigating, startTransition] = useTransition();
  const [navigatingSlug, setNavigatingSlug] = useState<string | null>(null);

  const products = data?.data ?? [];

  const handleEdit = (product: Product) => {
    setNavigatingSlug(product.slug);
    startTransition(() => {
      router.push(`/admin/produtos/${product.slug}/editar`);
    });
  };

  const handleDelete = (product: Product) => {
    modal.confirm({
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
        <div className="flex gap-2">
          <Button
            size="small"
            loading={isNavigating && navigatingSlug === product.slug}
            onClick={() => handleEdit(product)}
          >
            Editar
          </Button>
          <Button
            size="small"
            danger
            loading={deleteProduct.isPending && deleteProduct.variables === product.id}
            onClick={() => handleDelete(product)}
          >
            Excluir
          </Button>
        </div>
      ),
    },
  ];

  return (
    <div>
      {messageContextHolder}
      {modalContextHolder}
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
