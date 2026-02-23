import type { MaterialsApi } from "../domain/apis/raw-materials.api"

export class DeleteMaterialUseCase {
  private readonly materialsApi: MaterialsApi

  constructor(deps: DeleteMaterialUseCaseDeps) {
    this.materialsApi = deps.materialsApi
  }
  
  async execute(id: string): Promise<void> {
    await this.materialsApi.deleteMaterial(id)
  }
}

type DeleteMaterialUseCaseDeps = {
  materialsApi: MaterialsApi
}
