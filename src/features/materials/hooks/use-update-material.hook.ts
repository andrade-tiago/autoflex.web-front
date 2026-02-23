import { MaterialsApiImpl } from '@/core/infra/apis/materials-api-impl'
import { MATERIALS } from '@/core/infra/shared/query-keys'
import {
  UpdateMaterialUseCase,
  type UpdateMaterialDTO,
} from '@/core/use-cases/update-material.use-case'
import { useMutation, useQueryClient } from '@tanstack/react-query'

type UseUpdateMaterial = {
  execute: (data: UpdateMaterialDTO) => Promise<void>
}

export const useUpdateMaterial = (): UseUpdateMaterial => {
  const materialsApi = new MaterialsApiImpl()
  const useCase = new UpdateMaterialUseCase({ materialsApi })

  const queryClient = useQueryClient()
  const mutation = useMutation({
    mutationFn: (data: UpdateMaterialDTO) => useCase.execute(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: MATERIALS })
    },
  })

  return {
    execute: async (data) => mutation.mutate(data),
  }
}
