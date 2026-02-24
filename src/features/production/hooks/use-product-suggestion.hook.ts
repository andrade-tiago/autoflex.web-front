import { ProductionApiImpl } from '@/core/infra/apis/production-api-impl'
import { PRODUCTION } from '@/core/infra/shared/query-keys'
import {
  SuggestProductionUseCase,
  type ProductionSuggestion,
} from '@/core/use-cases/suggest-production.use-case'
import { useQuery } from '@tanstack/react-query'

type UseProductSuggestion = {
  data?: ProductionSuggestion
  isLoading: boolean
}

export const useProductSuggestion = (): UseProductSuggestion => {
  const productionApi = new ProductionApiImpl()
  const useCase = new SuggestProductionUseCase({ productionApi })
  
  const query = useQuery({
    queryKey: PRODUCTION,
    queryFn: () => useCase.execute(),
  })

  return {
    data: query.data,
    isLoading: query.isPending,
  }
}
