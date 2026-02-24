import type { ProductionApi } from '../domain/apis/production.api'

export class SuggestProductionUseCase {
  private readonly _productionApi: ProductionApi

  constructor(deps: SuggestProductionUseCaseDeps) {
    this._productionApi = deps.productionApi
  }

  async execute(): Promise<ProductionSuggestion> {
    return await this._productionApi.suggestProduction()
  }
}

type SuggestProductionUseCaseDeps = {
  productionApi: ProductionApi
}

export type ProductionSuggestion = {
  totalValue: number
  products: Suggestion[]
}

export type Suggestion = {
  productId: string
  productName: string
  quantity: number
  unitValue: number
  totalValue: number
}
