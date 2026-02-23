import { configSchema } from './config.schema';

export const AppConfig = configSchema.parse(import.meta.env)
