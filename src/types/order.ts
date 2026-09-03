export interface OrderItem {
  id: string;
  title: string;
  price: number;
  quantity: number;
  productId: string | null;
}

export type OrderStatus = "PENDING" | "CONFIRMED" | "DELIVERED" | "CANCELLED";

export interface Order {
  id: string;
  customerEmail: string;
  customerName: string;
  customerPhone: string;
  street: string;
  number: string;
  complement: string | null;
  neighborhood: string;
  city: string;
  zipCode: string | null;
  notes: string | null;
  total: number;
  status: OrderStatus;
  items: OrderItem[];
  createdAt: string;
  updatedAt: string;
}

export interface CreateOrderInput {
  customerName: string;
  customerPhone: string;
  street: string;
  number: string;
  complement?: string;
  neighborhood: string;
  city: string;
  zipCode?: string;
  notes?: string;
  items: { productId: string; quantity: number }[];
}
