import type { Product } from '../models/product.model'

export interface ProductsApi {
  fetchProducts(): Promise<FetchProductsResponse>
  createProduct(data: CreateProductRequest): Promise<CreateProductResponse>
  deleteProduct(id: string): Promise<void>
  updateProduct(id: string, data: UpdateProductRequest): Promise<Product>
}

export type FetchProductsResponse = {
  data: Product[]
}

export type CreateProductRequest = {
  name: string
  value: number
  composition: CreateProductRequestCompositionItem[]
}
export type CreateProductRequestCompositionItem = {
  rawMaterialId: string
  requiredQuantity: number
}
export type CreateProductResponse = {
  id: string
}

export type UpdateProductRequest = {
  name: string
  value: number
  composition: UpdateProductRequestCompositionItem[]
}
export type UpdateProductRequestCompositionItem = {
  rawMaterialId: string
  requiredQuantity: number
}
