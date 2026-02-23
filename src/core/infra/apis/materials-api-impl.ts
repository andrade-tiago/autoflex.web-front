import { AxiosClient } from '../shared/axios-client'
import type {
  CreateMaterialRequest,
  CreateMaterialResponse,
  FetchMaterialsResponse,
  MaterialsApi,
  UpdateMaterialRequest,
} from '@/core/domain/apis/raw-materials.api'
import type { RawMaterial } from '@/core/domain/models/raw-material.model'

export class MaterialsApiImpl implements MaterialsApi {
  private readonly _endpoint = 'materials'

  async fetchMaterials(): Promise<FetchMaterialsResponse> {
    const response = await AxiosClient.get<FetchMaterialsResponse>(this._endpoint)
    return response.data
  }

  async createMaterial(data: CreateMaterialRequest): Promise<CreateMaterialResponse> {
    const response = await AxiosClient.post<CreateMaterialResponse>(this._endpoint, data)
    return response.data
  }

  async updateMaterial(id: string, data: UpdateMaterialRequest): Promise<RawMaterial> {
    const response = await AxiosClient.patch<RawMaterial>(`${this._endpoint}/${id}`, data)
    return response.data
  }

  async deleteMaterial(id: string): Promise<void> {
    await AxiosClient.delete(`${this._endpoint}/${id}`)
  }
}
