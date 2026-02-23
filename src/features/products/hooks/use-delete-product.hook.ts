import { ProductsApiImpl } from '@/core/infra/apis/products-api-impl'
import { PRODUCTS } from '@/core/infra/shared/query-keys'
import { DeleteProductUseCase } from '@/core/use-cases/delete-product.use-case'
import { useMutation, useQueryClient } from '@tanstack/react-query'

type UseDeleteProduct = {
  execute: (id: string) => Promise<void>
}

export const useDeleteProduct = (): UseDeleteProduct => {
  const productsApi = new ProductsApiImpl()
  const useCase = new DeleteProductUseCase({ productsApi })

  const queryClient = useQueryClient()
  const mutation = useMutation({
    mutationFn: (id: string) => useCase.execute(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: PRODUCTS })
    },
  })

  return {
    execute: async (id: string) => mutation.mutate(id),
  }
}
