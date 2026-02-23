export const validateMaterialStock = (value: number): number => {
  if (!Number.isFinite(value))
    throw new Error('Material stock must be a valid number')
  if (value < 0)
    throw new Error('Material stock cannot be negative')

  return value
}