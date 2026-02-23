import type { MaterialsApi } from '../domain/apis/raw-materials.api'
import type { RawMaterial } from '../domain/models/raw-material.model'

export class FetchMaterialsUseCase {
  private readonly materialsApi: MaterialsApi

  constructor(deps: FetchMaterialsUseCaseDeps) {
    this.materialsApi = deps.materialsApi
  }

  async execute(): Promise<RawMaterial[]> {
    const response = await this.materialsApi.fetchMaterials()
    return response.data
  }
}

type FetchMaterialsUseCaseDeps = {
  materialsApi: MaterialsApi
}
