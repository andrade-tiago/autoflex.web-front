import { ProductsApiImpl } from '@/core/infra/apis/products-api-impl'
import { PRODUCTS } from '@/core/infra/shared/query-keys'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import {
  CreateProductUseCase,
  type CreateProductDTO,
} from '@/core/use-cases/create-product.use-case'

type UseCreateProduct = {
  execute: (data: CreateProductDTO) => Promise<void>
}

export const useCreateProduct = (): UseCreateProduct => {
  const productsApi = new ProductsApiImpl()
  const useCase = new CreateProductUseCase({ productsApi })

  const queryClient = useQueryClient()

  const mutation = useMutation({
    mutationFn: (data: CreateProductDTO) => useCase.execute(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: PRODUCTS })
    },
  })

  return {
    execute: async (data: CreateProductDTO) => mutation.mutate(data),
  }
}
