import type { MaterialsApi } from '../domain/apis/raw-materials.api'
import { validateMaterialName } from '../domain/functions/validate-material-name'
import { validateMaterialStock } from '../domain/functions/validate-material-stock'
import type { RawMaterial } from '../domain/models/raw-material.model'

export class UpdateMaterialUseCase {
  private readonly materialsApi: MaterialsApi

  constructor(deps: UpdateMaterialUseCaseDeps) {
    this.materialsApi = deps.materialsApi
  }

  async execute(dto: UpdateMaterialDTO): Promise<RawMaterial> {
    const name = validateMaterialName(dto.name)
    const stock = validateMaterialStock(dto.stock)

    return this.materialsApi.updateMaterial(dto.id, { name, stock })
  }
}

type UpdateMaterialUseCaseDeps = {
  materialsApi: MaterialsApi
}

export type UpdateMaterialDTO = {
  id: string
  name: string
  stock: number
}
