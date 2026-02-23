import type { ProductsApi } from '../domain/apis/products.api'

export class DeleteProductUseCase {
  private readonly _productsApi: ProductsApi

  constructor(deps: DeleteProductUseCaseDeps) {
    this._productsApi = deps.productsApi
  }

  async execute(id: string): Promise<void> {
    await this._productsApi.deleteProduct(id)
  }
}

type DeleteProductUseCaseDeps = {
  productsApi: ProductsApi
}
