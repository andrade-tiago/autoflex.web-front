import type { RawMaterial } from '../models/raw-material.model'

export interface MaterialsApi {
  createMaterial(data: CreateMaterialRequest): Promise<CreateMaterialResponse>
  deleteMaterial(id: string): Promise<void>
  fetchMaterials(): Promise<FetchMaterialsResponse>
  updateMaterial(id: string, data: UpdateMaterialRequest): Promise<RawMaterial>
}

export type CreateMaterialRequest = {
  name: string
  stock: number
}
export type CreateMaterialResponse = {
  id: string
}

export type UpdateMaterialRequest = {
  name: string
  stock: number
}

export type FetchMaterialsResponse = {
  data: RawMaterial[]
}
