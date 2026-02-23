import type { RawMaterial } from '@/core/domain/models/raw-material.model'

export type ItemAction =
  | { action: 'create' }
  | { action: Exclude<ActionType, 'create'>, item: RawMaterial }

type ActionType = 'edit' | 'delete' | 'create'
