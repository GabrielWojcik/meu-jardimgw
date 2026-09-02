"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  Button,
  Form,
  Input,
  InputNumber,
  Select,
  Switch,
  Upload,
  message,
} from "antd";
import type { UploadFile } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { useCategories } from "@/hooks/useCategories";
import { useCreateProduct, useUploadProductImages } from "@/hooks/useAdminProducts";
import type { ProductInput } from "@/types/product";

export default function NewProductPage() {
  const router = useRouter();
  const [kind, setKind] = useState<"PLANT" | "POT">("PLANT");
  const [fileList, setFileList] = useState<UploadFile[]>([]);
  const { data: categories } = useCategories({ kind });
  const createProduct = useCreateProduct();
  const uploadImages = useUploadProductImages();

  const handleFinish = async (values: ProductInput) => {
    try {
      const product = await createProduct.mutateAsync(values);

      const files = fileList
        .map((file) => file.originFileObj)
        .filter((file): file is NonNullable<typeof file> => Boolean(file));

      if (files.length > 0) {
        await uploadImages.mutateAsync({ id: product.id, files });
      }

      message.success("Produto criado.");
      router.push("/admin/produtos");
    } catch {
      message.error("Não foi possível criar o produto. Confira os campos.");
    }
  };

  return (
    <div className="max-w-2xl">
      <h1 className="text-2xl font-bold text-gray-800 mb-6">Novo produto</h1>

      <Form
        layout="vertical"
        onFinish={handleFinish}
        initialValues={{ kind: "PLANT", active: true, featured: false, stock: 0 }}
      >
        <Form.Item
          name="title"
          label="Título"
          rules={[{ required: true, min: 2, max: 120, message: "Informe um título (2-120 caracteres)" }]}
        >
          <Input />
        </Form.Item>

        <Form.Item name="slug" label="Slug (opcional, gerado do título se vazio)">
          <Input />
        </Form.Item>

        <Form.Item
          name="description"
          label="Descrição"
          rules={[{ required: true, min: 10, max: 2000, message: "Descrição precisa ter 10-2000 caracteres" }]}
        >
          <Input.TextArea rows={4} />
        </Form.Item>

        <div className="grid grid-cols-2 gap-4">
          <Form.Item
            name="price"
            label="Preço"
            rules={[{ required: true, type: "number", min: 0.01, message: "Informe um preço válido" }]}
          >
            <InputNumber<number> className="w-full" min={0} step={0.01} prefix="R$" />
          </Form.Item>

          <Form.Item name="compareAtPrice" label="Preço 'de' (promoção, opcional)">
            <InputNumber<number> className="w-full" min={0} step={0.01} prefix="R$" />
          </Form.Item>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <Form.Item name="kind" label="Tipo">
            <Select
              options={[
                { value: "PLANT", label: "Planta" },
                { value: "POT", label: "Vaso" },
              ]}
              onChange={(value) => setKind(value)}
            />
          </Form.Item>

          <Form.Item
            name="category"
            label="Categoria"
            rules={[{ required: true, message: "Selecione a categoria" }]}
          >
            <Select
              options={categories?.map((category) => ({
                value: category.name,
                label: category.name,
              }))}
            />
          </Form.Item>
        </div>

        <div className="grid grid-cols-3 gap-4">
          <Form.Item name="light" label="Luz">
            <Input />
          </Form.Item>
          <Form.Item name="water" label="Água">
            <Input />
          </Form.Item>
          <Form.Item name="size" label="Tamanho">
            <Input />
          </Form.Item>
        </div>

        <Form.Item name="stock" label="Estoque">
          <InputNumber<number> className="w-full" min={0} />
        </Form.Item>

        <div className="flex gap-8 mb-4">
          <Form.Item name="active" label="Ativo" valuePropName="checked">
            <Switch />
          </Form.Item>
          <Form.Item name="featured" label="Destaque" valuePropName="checked">
            <Switch />
          </Form.Item>
        </div>

        <Form.Item label="Imagens">
          <Upload
            listType="picture-card"
            fileList={fileList}
            beforeUpload={() => false}
            onChange={({ fileList: next }) => setFileList(next)}
            multiple
            accept="image/*"
          >
            <div>
              <PlusOutlined />
              <div className="mt-2">Enviar</div>
            </div>
          </Upload>
        </Form.Item>

        <Button
          type="primary"
          htmlType="submit"
          loading={createProduct.isPending || uploadImages.isPending}
        >
          Criar produto
        </Button>
      </Form>
    </div>
  );
}
