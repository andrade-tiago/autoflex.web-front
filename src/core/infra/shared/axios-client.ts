import axios from 'axios'
import { AppConfig } from '@/config'

const AxiosClient = axios.create({
  baseURL: AppConfig.apiUrl,
})

export { AxiosClient }
