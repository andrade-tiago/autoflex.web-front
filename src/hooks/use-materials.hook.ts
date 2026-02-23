import { MaterialsApiImpl } from '@/core/infra/apis/materials-api-impl'
import { useQuery } from '@tanstack/react-query'
import { MATERIALS } from '@/core/infra/shared/query-keys'
import type { RawMaterial } from '@/core/domain/models/raw-material.model'
import { FetchMaterialsUseCase } from '@/core/use-cases/fetch-materials.use-case'

type UseMaterials = {
  isLoading: boolean
  data?: RawMaterial[]
}

export const useMaterials = (): UseMaterials => {
  const materialsApi = new MaterialsApiImpl()
  const useCase = new FetchMaterialsUseCase({ materialsApi })

  const query = useQuery({
    queryKey: MATERIALS,
    queryFn: () => useCase.execute(),
    staleTime: 1000 * 60 * 5 // 5 minutes
  })
  
  return {
    data: query.data,
    isLoading: query.isPending,
  }
}
