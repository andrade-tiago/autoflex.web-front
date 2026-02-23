import type { ProductsApi } from '../domain/apis/products.api'
import type { Product } from '../domain/models/product.model'

export class FetchProductsUseCase {
  private readonly productsApi: ProductsApi

  constructor(deps: FetchProductsUseCaseDeps) {
    this.productsApi = deps.productsApi
  }

  async execute(): Promise<Product[]> {
    const response = await this.productsApi.fetchProducts()
    return response.data
  }
}

type FetchProductsUseCaseDeps = {
  productsApi: ProductsApi
}
