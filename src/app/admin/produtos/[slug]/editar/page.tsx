"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Image from "next/image";
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
import { useProduct } from "@/hooks/useProducts";
import {
  useDeleteProductImage,
  useUpdateProduct,
  useUploadProductImages,
} from "@/hooks/useAdminProducts";
import type { ProductInput } from "@/types/product";

export default function EditProductPage() {
  const router = useRouter();
  const { slug } = useParams<{ slug: string }>();
  const { data: product, isLoading, isError } = useProduct(slug);

  const [form] = Form.useForm<ProductInput>();
  const [kind, setKind] = useState<"PLANT" | "POT">("PLANT");
  const [fileList, setFileList] = useState<UploadFile[]>([]);

  const { data: categories } = useCategories({ kind });
  const updateProduct = useUpdateProduct(product?.id ?? "");
  const uploadImages = useUploadProductImages();
  const deleteImage = useDeleteProductImage();

  useEffect(() => {
    if (!product) return;

    setKind(product.kind as "PLANT" | "POT");
    form.setFieldsValue({
      title: product.title,
      slug: product.slug,
      description: product.description,
      price: product.price,
      compareAtPrice: product.compareAtPrice ?? undefined,
      kind: product.kind as "PLANT" | "POT",
      category: product.category.name,
      light: product.light ?? undefined,
      water: product.water ?? undefined,
      size: product.size ?? undefined,
      stock: product.stock,
      active: product.active,
      featured: product.featured,
    });
  }, [product, form]);

  const handleFinish = async (values: ProductInput) => {
    try {
      await updateProduct.mutateAsync(values);

      const files = fileList
        .map((file) => file.originFileObj)
        .filter((file): file is NonNullable<typeof file> => Boolean(file));

      if (files.length > 0 && product) {
        await uploadImages.mutateAsync({ id: product.id, files });
        setFileList([]);
      }

      message.success("Produto atualizado.");
    } catch {
      message.error("Não foi possível salvar as alterações. Confira os campos.");
    }
  };

  const handleDeleteImage = async (imageId: string) => {
    if (!product) return;

    try {
      await deleteImage.mutateAsync({ id: product.id, imageId });
      message.success("Imagem removida.");
    } catch {
      message.error("Não foi possível remover a imagem.");
    }
  };

  if (isLoading) {
    return <p className="text-gray-500">Carregando produto...</p>;
  }

  if (isError || !product) {
    return <p className="text-red-600">Produto não encontrado.</p>;
  }

  return (
    <div className="max-w-2xl">
      <h1 className="text-2xl font-bold text-gray-800 mb-6">
        Editar produto
      </h1>

      <Form layout="vertical" form={form} onFinish={handleFinish}>
        <Form.Item
          name="title"
          label="Título"
          rules={[{ required: true, min: 2, max: 120, message: "Informe um título (2-120 caracteres)" }]}
        >
          <Input />
        </Form.Item>

        <Form.Item name="slug" label="Slug">
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

        {product.images.length > 0 && (
          <div className="mb-4">
            <p className="text-sm font-medium text-gray-700 mb-2">
              Imagens atuais
            </p>
            <div className="flex flex-wrap gap-3">
              {product.images.map((image) => (
                <div key={image.id} className="relative w-24 h-24 rounded overflow-hidden border">
                  <Image src={image.url} alt={image.alt ?? ""} fill className="object-cover" />
                  <button
                    type="button"
                    onClick={() => handleDeleteImage(image.id)}
                    className="absolute top-1 right-1 bg-white/90 text-red-600 text-xs px-1.5 py-0.5 rounded cursor-pointer"
                  >
                    Remover
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        <Form.Item label="Adicionar imagens">
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

        <div className="flex gap-3">
          <Button
            type="primary"
            htmlType="submit"
            loading={updateProduct.isPending || uploadImages.isPending}
          >
            Salvar alterações
          </Button>
          <Button onClick={() => router.push("/admin/produtos")}>Voltar</Button>
        </div>
      </Form>
    </div>
  );
}
