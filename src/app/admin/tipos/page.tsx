"use client";

import { useState } from "react";
import { Button, Form, Input, InputNumber, Modal, Table, Tag, message } from "antd";
import type { ColumnsType } from "antd/es/table";
import { useKinds } from "@/hooks/useKinds";
import { useCreateKind, useDeleteKind } from "@/hooks/useAdminKinds";
import { AdminButton } from "@/components/admin/AdminButton";
import { ApiError } from "@/lib/api";
import type { Kind, KindInput } from "@/types/product";

export default function AdminKindsPage() {
  const { data: kinds, isLoading, isError } = useKinds();
  const createKind = useCreateKind();
  const deleteKind = useDeleteKind();
  const [messageApi, messageContextHolder] = message.useMessage();
  const [modal, modalContextHolder] = Modal.useModal();
  const [form] = Form.useForm<KindInput>();
  const [isFormOpen, setIsFormOpen] = useState(false);

  const handleCreate = async (values: KindInput) => {
    try {
      await createKind.mutateAsync(values);
      messageApi.success("Tipo criado.");
      form.resetFields();
      setIsFormOpen(false);
    } catch {
      messageApi.error("Não foi possível criar o tipo. Confira os campos.");
    }
  };

  const handleDelete = (kind: Kind) => {
    modal.confirm({
      title: `Excluir "${kind.name}"?`,
      content: "Essa ação não pode ser desfeita.",
      okText: "Excluir",
      okType: "danger",
      cancelText: "Cancelar",
      onOk: async () => {
        try {
          await deleteKind.mutateAsync(kind.id);
          messageApi.success("Tipo excluído.");
        } catch (error) {
          const apiMessage =
            error instanceof ApiError && typeof error.info === "object" && error.info
              ? (error.info as { message?: string }).message
              : null;
          messageApi.error(apiMessage ?? "Não foi possível excluir o tipo.");
        }
      },
    });
  };

  const columns: ColumnsType<Kind> = [
    {
      title: "Tipo",
      dataIndex: "name",
    },
    {
      title: "Slug",
      dataIndex: "slug",
    },
    {
      title: "Produtos",
      dataIndex: "productCount",
      render: (count: number) => <Tag>{count}</Tag>,
    },
    {
      title: "Categorias",
      dataIndex: "categoryCount",
      render: (count: number) => <Tag>{count}</Tag>,
    },
    {
      title: "Ações",
      render: (_, kind) => (
        <Button
          size="small"
          danger
          loading={deleteKind.isPending && deleteKind.variables === kind.id}
          onClick={() => handleDelete(kind)}
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
        <h1 className="text-2xl font-bold text-gray-800">Tipos</h1>
        <AdminButton className="self-start sm:self-auto" onClick={() => setIsFormOpen(true)}>
          Novo tipo
        </AdminButton>
      </div>

      {isError && (
        <p className="text-red-600">Não foi possível carregar os tipos.</p>
      )}

      <Table
        rowKey="id"
        columns={columns}
        dataSource={kinds}
        loading={isLoading}
        pagination={false}
        scroll={{ x: 560 }}
      />

      <Modal
        title="Novo tipo"
        open={isFormOpen}
        onCancel={() => setIsFormOpen(false)}
        okText="Criar"
        cancelText="Cancelar"
        confirmLoading={createKind.isPending}
        okButtonProps={{
          size: "small",
          className: "!bg-[#2f5e3c] hover:!bg-[#254a30] !rounded-full !px-5 !py-4",
        }}
        onOk={() => form.submit()}
        destroyOnClose
      >
        <Form form={form} layout="vertical" onFinish={handleCreate}>
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
            <Input placeholder="aromatica" />
          </Form.Item>

          <Form.Item name="position" label="Posição (opcional)">
            <InputNumber className="w-full" min={0} />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
}
