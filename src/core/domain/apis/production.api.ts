export interface ProductionApi {
  suggestProduction(): Promise<SuggestProductionResponse>
}

export type SuggestProductionResponse = {
  totalValue: number
  products: Array<{
    productId: string
    productName: string
    quantity: number
    unitValue: number
    totalValue: number
  }>
}
