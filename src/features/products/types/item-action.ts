import type { Product } from '@/core/domain/models/product.model'

export type ItemAction =
  | { action: 'create' }
  | { action: Exclude<ActionType, 'create'>, item: Product }

type ActionType = 'edit' | 'delete' | 'create'
