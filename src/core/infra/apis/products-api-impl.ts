import type { Product } from '@/core/domain/models/product.model'
import { AxiosClient } from '../shared/axios-client'
import type {
  CreateProductRequest,
  CreateProductResponse,
  FetchProductsResponse,
  ProductsApi,
  UpdateProductRequest,
} from '@/core/domain/apis/products.api'

export class ProductsApiImpl implements ProductsApi {
  private readonly _endpoint: string = 'products'

  async fetchProducts(): Promise<FetchProductsResponse> {
    const response = await AxiosClient.get<FetchProductsResponse>(this._endpoint)
    return response.data
  }

  async createProduct(data: CreateProductRequest): Promise<CreateProductResponse> {
    const response = await AxiosClient.post<CreateProductResponse>(this._endpoint, data)
    return response.data
  }

  async deleteProduct(id: string): Promise<void> {
    await AxiosClient.delete(`${this._endpoint}/${id}`)
  }

  async updateProduct(id: string, data: UpdateProductRequest): Promise<Product> {
    const response = await AxiosClient.patch<Product>(`${this._endpoint}/${id}`, data)
    return response.data
  }
}
