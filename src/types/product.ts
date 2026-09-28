export interface Category {
  id: string;
  name: string;
  slug: string;
  description: string | null;
  imageUrl: string | null;
  kind: string;
  position: number;
  productCount: number;
}

/** Payload do formulário de criar categoria (espelha o CreateCategoryDto da API) */
export interface CategoryInput {
  name: string;
  slug?: string;
  description?: string;
  imageUrl?: string;
  /** id ou slug do tipo (ex: "PLANT") */
  kind?: string;
  position?: number;
}

export interface Kind {
  id: string;
  name: string;
  slug: string;
  position: number;
  productCount: number;
  categoryCount: number;
}

/** Payload do formulário de criar tipo (espelha o CreateKindDto da API) */
export interface KindInput {
  name: string;
  slug?: string;
  position?: number;
}

export interface ProductImage {
  id: string;
  url: string;
  alt: string | null;
  position: number;
}

export interface Product {
  id: string;
  slug: string;
  title: string;
  description: string;
  price: number;
  compareAtPrice: number | null;
  light: string | null;
  water: string | null;
  size: string | null;
  stock: number;
  kind: string;
  active: boolean;
  featured: boolean;
  category: Category;
  image: string | null;
  images: ProductImage[];
  createdAt: string;
  updatedAt: string;
}

export interface Paginated<T> {
  data: T[];
  meta: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

export type ProductSort =
  | "recentes"
  | "preco-asc"
  | "preco-desc"
  | "nome-asc"
  | "nome-desc";

export interface ProductsQuery {
  page?: number;
  limit?: number;
  category?: string;
  /** id ou slug do tipo (ex: "PLANT") */
  kind?: string;
  search?: string;
  minPrice?: number;
  maxPrice?: number;
  inStock?: boolean;
  featured?: boolean;
  includeInactive?: boolean;
  sort?: ProductSort;
}

/** Payload do formulário de criar/editar produto (espelha o CreateProductDto da API) */
export interface ProductInput {
  title: string;
  slug?: string;
  description: string;
  price: number;
  compareAtPrice?: number;
  category: string;
  /** id ou slug do tipo (ex: "PLANT") */
  kind?: string;
  light?: string;
  water?: string;
  size?: string;
  stock?: number;
  active?: boolean;
  featured?: boolean;
}
