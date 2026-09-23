"use client";

import { useState } from "react";
import { Button, Form, Input, InputNumber, Modal, Select, Table, Tag, message } from "antd";
import type { ColumnsType } from "antd/es/table";
import { useCategories } from "@/hooks/useCategories";
import { useCreateCategory, useDeleteCategory } from "@/hooks/useAdminCategories";
import { ApiError } from "@/lib/api";
import type { Category, CategoryInput } from "@/types/product";

export default function AdminCategoriesPage() {
  const { data: categories, isLoading, isError } = useCategories();
  const createCategory = useCreateCategory();
  const deleteCategory = useDeleteCategory();
  const [messageApi, messageContextHolder] = message.useMessage();
  const [modal, modalContextHolder] = Modal.useModal();
  const [form] = Form.useForm<CategoryInput>();
  const [isFormOpen, setIsFormOpen] = useState(false);

  const handleCreate = async (values: CategoryInput) => {
    try {
      await createCategory.mutateAsync(values);
      messageApi.success("Categoria criada.");
      form.resetFields();
      setIsFormOpen(false);
    } catch {
      messageApi.error("Não foi possível criar a categoria. Confira os campos.");
    }
  };

  const handleDelete = (category: Category) => {
    modal.confirm({
      title: `Excluir "${category.name}"?`,
      content: "Essa ação não pode ser desfeita.",
      okText: "Excluir",
      okType: "danger",
      cancelText: "Cancelar",
      onOk: async () => {
        try {
          await deleteCategory.mutateAsync(category.id);
          messageApi.success("Categoria excluída.");
        } catch (error) {
          const apiMessage =
            error instanceof ApiError && typeof error.info === "object" && error.info
              ? (error.info as { message?: string }).message
              : null;
          messageApi.error(apiMessage ?? "Não foi possível excluir a categoria.");
        }
      },
    });
  };

  const columns: ColumnsType<Category> = [
    {
      title: "Categoria",
      dataIndex: "name",
    },
    {
      title: "Slug",
      dataIndex: "slug",
    },
    {
      title: "Tipo",
      dataIndex: "kind",
      render: (kind: string) => (kind === "POT" ? "Vaso" : "Planta"),
    },
    {
      title: "Produtos",
      dataIndex: "productCount",
      render: (count: number) => <Tag>{count}</Tag>,
    },
    {
      title: "Ações",
      render: (_, category) => (
        <Button
          size="small"
          danger
          loading={deleteCategory.isPending && deleteCategory.variables === category.id}
          onClick={() => handleDelete(category)}
        >
          Excluir
        </Button>
      ),
    },
  ];

  return (
    <div>
      {messageContextHolder}
      {modalContextHolder}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Categorias</h1>
        <Button type="primary" block className="sm:w-auto" onClick={() => setIsFormOpen(true)}>
          Nova categoria
        </Button>
      </div>

      {isError && (
        <p className="text-red-600">Não foi possível carregar as categorias.</p>
      )}

      <Table
        rowKey="id"
        columns={columns}
        dataSource={categories}
        loading={isLoading}
        pagination={false}
        scroll={{ x: 560 }}
      />

      <Modal
        title="Nova categoria"
        open={isFormOpen}
        onCancel={() => setIsFormOpen(false)}
        okText="Criar"
        cancelText="Cancelar"
        confirmLoading={createCategory.isPending}
        onOk={() => form.submit()}
        destroyOnClose
      >
        <Form
          form={form}
          layout="vertical"
          onFinish={handleCreate}
          initialValues={{ kind: "PLANT" }}
        >
          <Form.Item
            name="name"
            label="Nome"
            rules={[{ required: true, min: 2, max: 60, message: "Informe um nome (2-60 caracteres)" }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            name="slug"
            label="Slug (opcional, gerado do nome se vazio)"
            rules={[{ min: 2, max: 80, message: "Slug precisa ter 2-80 caracteres" }]}
          >
            <Input placeholder="suculentas" />
          </Form.Item>

          <Form.Item name="kind" label="Tipo">
            <Select
              options={[
                { value: "PLANT", label: "Planta" },
                { value: "POT", label: "Vaso" },
              ]}
            />
          </Form.Item>

          <Form.Item
            name="description"
            label="Descrição (opcional)"
            rules={[{ max: 500, message: "Descrição pode ter no máximo 500 caracteres" }]}
          >
            <Input.TextArea rows={3} />
          </Form.Item>

          <Form.Item name="position" label="Posição (opcional)">
            <InputNumber className="w-full" min={0} />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
}
