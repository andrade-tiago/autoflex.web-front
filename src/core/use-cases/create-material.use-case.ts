import type { MaterialsApi } from '../domain/apis/raw-materials.api'
import { validateMaterialName } from '../domain/functions/validate-material-name'
import { validateMaterialStock } from '../domain/functions/validate-material-stock'

export class CreateMaterialUseCase {
  private materialsApi: MaterialsApi

  constructor(deps: CreateMaterialUseCaseDeps) {
    this.materialsApi = deps.materialsApi
  }

  async execute(dto: CreateMaterialDTO): Promise<string> {
    const name = validateMaterialName(dto.name)
    const stock = validateMaterialStock(dto.stock)

    const response = await this.materialsApi.createMaterial({ name, stock })
    return response.id
  }
}

type CreateMaterialUseCaseDeps = {
  materialsApi: MaterialsApi
}

export type CreateMaterialDTO = {
  name: string
  stock: number
}
