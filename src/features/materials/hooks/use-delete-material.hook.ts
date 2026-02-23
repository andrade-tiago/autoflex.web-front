import { MaterialsApiImpl } from '@/core/infra/apis/materials-api-impl'
import { MATERIALS } from '@/core/infra/shared/query-keys'
import { DeleteMaterialUseCase } from '@/core/use-cases/delete-material.use-case'
import { useMutation, useQueryClient } from '@tanstack/react-query'

type UseDeleteMaterial = {
  execute: (id: string) => Promise<void>
}

export const useDeleteMaterial = (): UseDeleteMaterial => {
  const materialsApi = new MaterialsApiImpl()
  const useCase = new DeleteMaterialUseCase({ materialsApi })

  const queryClient = useQueryClient()
  const mutation = useMutation({
    mutationFn: (id: string) => useCase.execute(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: MATERIALS })
    },
  })

  return {
    execute: async (id: string) => mutation.mutate(id),
  }
}
