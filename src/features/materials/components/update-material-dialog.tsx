import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/shared/components/ui/dialog'
import { Controller, useForm } from 'react-hook-form'
import { Field, FieldError, FieldLabel } from '@/shared/components/ui/field'
import { Input } from '@/shared/components/ui/input'
import { Button } from '@/shared/components/ui/button'
import type { RawMaterial } from '@/core/domain/models/raw-material.model'
import type { UpdateMaterialDTO } from '@/core/use-cases/update-material.use-case'
import z from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useEffect } from 'react'

type UpdateMaterialDialogProps = {
  open: boolean
  onClose: () => void
  handleSubmit: (data: UpdateMaterialDTO) => Promise<void>
  material?: RawMaterial
}

export const UpdateMaterialDialog: React.FunctionComponent<UpdateMaterialDialogProps> = props => {
  const form = useForm({
    resolver: zodResolver(updateMaterialSchema),
    defaultValues: {
      name: String(),
      stock: String(),
    },
  })

  async function handleSubmit(data: UpdateMaterialSchemaOutput) {
    if (!props.material) return
    
    await props.handleSubmit({ id: props.material.id, ...data })
    props.onClose()
  }

  useEffect(() => {
    function updateFileds(material: RawMaterial) {
      form.setValue('name', material.name)
      form.setValue('stock', material.stock)
    }
    if (props.material)
      updateFileds(props.material)
  }, [props.material])

  return (
    <Dialog open={props.open} onOpenChange={() => props.onClose()}>
      <DialogContent>
        <form onSubmit={form.handleSubmit(handleSubmit)}>
          <DialogHeader>
            <DialogTitle>
              Editar matéria-prima
            </DialogTitle>
          </DialogHeader>

          <div className="flex flex-col gap-5 my-5">
            <Controller
              control={form.control}
              name='name'
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel>
                    Nome
                  </FieldLabel>
                  <Input
                    {...field}
                    type='text'
                    aria-invalid={fieldState.invalid}
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />

            <Controller
              control={form.control}
              name='stock'
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel>
                    Quantidade em estoque
                  </FieldLabel>
                  <Input
                    {...field}
                    type='number'
                    value={field.value as string}
                    aria-invalid={fieldState.invalid}
                    min={0}
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
          </div>

          <DialogFooter>
            <Button type='submit'>
              Atualizar
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}

const updateMaterialSchema = z.object({
  name: z.string()
    .trim()
    .min(1, 'O nome não pode estar vazio.'),
  stock: z.coerce.number()
    .int('O estoque precisa ser inteiro.')
    .nonnegative('O estoque não pode ser negativo.'),
})
type UpdateMaterialSchemaOutput = z.output<typeof updateMaterialSchema>
