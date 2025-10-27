// src/types/index.ts
export interface Product {
   _id: string;
  name: string;
  price: number;
  image: string; // Changed from optional to required
  description: string;
  category?: string;
  inStock?: boolean;
  rating?: number;
}

export interface ApiResponse<T> {
  data: T;
  success: boolean;
  message?: string;
}

export interface CartItem extends Product {
  quantity: number;
}