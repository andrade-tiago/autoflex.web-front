import type { ProductsApi } from '../domain/apis/products.api'
import type { Product } from '../domain/models/product.model'

export class UpdateProductUseCase {
  private readonly _productsApi: ProductsApi

  constructor(deps: UpdateProductUseCaseDeps) {
    this._productsApi = deps.productsApi
  }

  execute({ id, ...data }: UpdateProductDTO): Promise<Product> {
    return this._productsApi.updateProduct(id, data)
  }
}

type UpdateProductUseCaseDeps = {
  productsApi: ProductsApi
}

export type UpdateProductDTO = {
  id: string
  name: string
  value: number
  composition: Array<{
    rawMaterialId: string
    requiredQuantity: number
  }>
}
