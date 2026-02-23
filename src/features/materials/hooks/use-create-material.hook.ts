import { MaterialsApiImpl } from '@/core/infra/apis/materials-api-impl'
import { MATERIALS } from '@/core/infra/shared/query-keys'
import {
  CreateMaterialUseCase,
  type CreateMaterialDTO,
} from '@/core/use-cases/create-material.use-case'
import { useMutation, useQueryClient } from '@tanstack/react-query'

type UseCreateMaterial = {
  execute: (data: CreateMaterialDTO) => Promise<void>
}

export const useCreateMaterial = (): UseCreateMaterial => {
  const materialsApi = new MaterialsApiImpl()
  const useCase = new CreateMaterialUseCase({ materialsApi })

  const queryClient = useQueryClient()
  const mutation = useMutation({
    mutationFn: (data: CreateMaterialDTO) => useCase.execute(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: MATERIALS })
    },
  })

  return {
    execute: async (data) => mutation.mutate(data),
  }
}
