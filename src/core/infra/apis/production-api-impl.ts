import type {
  ProductionApi,
  SuggestProductionResponse,
} from '@/core/domain/apis/production.api'
import { AxiosClient } from '../shared/axios-client'

export class ProductionApiImpl implements ProductionApi {
  private readonly endpoint = 'production'

  async suggestProduction(): Promise<SuggestProductionResponse> {
    const response = await AxiosClient.get<SuggestProductionResponse>(`${this.endpoint}/suggest`)
    return response.data
  }
}
