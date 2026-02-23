import type { ProductsApi } from '../domain/apis/products.api'

export class CreateProductUseCase {
  private readonly _productsApi: ProductsApi

  constructor(deps: CreateProductUseCaseDeps) {
    this._productsApi = deps.productsApi
  }

  async execute(data: CreateProductDTO): Promise<string> {
    const response = await this._productsApi.createProduct({ ...data })
    return response.id
  }
}

type CreateProductUseCaseDeps = {
  productsApi: ProductsApi
}

export type CreateProductDTO = {
  name: string
  value: number
  composition: Array<{
    rawMaterialId: string
    requiredQuantity: number
  }>
}

