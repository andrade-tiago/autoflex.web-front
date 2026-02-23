import { ProductsApiImpl } from '@/core/infra/apis/products-api-impl'
import { PRODUCTS } from '@/core/infra/shared/query-keys'
import {
  UpdateProductUseCase,
  type UpdateProductDTO,
} from '@/core/use-cases/update-product.use-case'
import { useMutation, useQueryClient } from '@tanstack/react-query'

type UseUpdateProduct = {
  execute: (data: UpdateProductDTO) => Promise<void>
}

export const useUpdateProduct = (): UseUpdateProduct => {
  const productsApi = new ProductsApiImpl()
  const useCase = new UpdateProductUseCase({ productsApi })

  const queryClient = useQueryClient()
  const mutation = useMutation({
    mutationFn: (data: UpdateProductDTO) => useCase.execute(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: PRODUCTS })
    },
  })

  return {
    execute: async (data) => mutation.mutate(data),
  }
}
