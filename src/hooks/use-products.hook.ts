import { ProductsApiImpl } from '@/core/infra/apis/products-api-impl'
import { PRODUCTS } from '@/core/infra/shared/query-keys'
import { FetchProductsUseCase } from '@/core/use-cases/fetch-products.use-case'
import { useQuery } from '@tanstack/react-query'
import type { Product } from '@/core/domain/models/product.model'

type UseProducts = {
  isLoading: boolean
  data?: Product[]
}

export const useProducts = (): UseProducts => {
  const productsApi = new ProductsApiImpl()
  const useCase = new FetchProductsUseCase({ productsApi })

  const query = useQuery({
    queryKey: PRODUCTS,
    queryFn: () => useCase.execute(),
    staleTime: 1000 * 60 * 5 // 5 minutes
  })
  
  return {
    data: query.data,
    isLoading: query.isPending,
  }
}
