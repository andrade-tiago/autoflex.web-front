export type Product = {
  id: string
  name: string
  value: number
  composition: ProductCompositionItem[]
}

export type ProductCompositionItem = {
  materialId: string
  quantity: number
}
