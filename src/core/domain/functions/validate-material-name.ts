export const validateMaterialName = (value: string): string => {
  value = value.trim()
  
  if (value.length === 0)
    throw new Error('Material name cannot be empty')

  return value
}
