import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/shared/components/ui/dialog'
import {
  Controller,
  useForm,
} from 'react-hook-form'
import {
  Field,
  FieldError,
  FieldLabel,
} from '@/shared/components/ui/field'
import { Input } from '@/shared/components/ui/input'
import { Button } from '@/shared/components/ui/button'
import z from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import type { CreateMaterialDTO } from '@/core/use-cases/create-material.use-case'

type AddMaterialDialogProps = {
  open: boolean
  onClose: () => void
  handleSubmit: (data: CreateMaterialDTO) => Promise<void>
}

export const AddMaterialDialog: React.FunctionComponent<AddMaterialDialogProps> = props => {
  const form = useForm({
    resolver: zodResolver(createMaterialSchema),
    defaultValues: {
      name: String(),
      stock: String(),
    },
  })

  async function handleSubmit(data: CreateMaterialDTO) {
    await props.handleSubmit(data)

    props.onClose()
    form.setValue('name', String())
    form.setValue('stock', String())
  }

  return (
    <Dialog open={props.open} onOpenChange={props.onClose}>
      <DialogContent>
        <form onSubmit={form.handleSubmit(handleSubmit)}>
          <DialogHeader>
            <DialogTitle>
              Adicionar matéria-prima
            </DialogTitle>
          </DialogHeader>

          <div className="flex flex-col gap-5 my-8">
            <Controller
              control={form.control}
              name="name"
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
              name="stock"
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel>
                    Quantidade em estoque
                  </FieldLabel>
                  <Input
                    {...field}
                    value={field.value as string}
                    type="number"
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
            <Button type="submit" className="bg-cyan-700 hover:bg-cyan-800 enabled:cursor-pointer">
              Criar
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}

const createMaterialSchema = z.object({
  name: z.string()
    .trim()
    .min(1, 'O nome não pode estar vazio.'),
  stock: z.coerce.number()
    .int('O estoque precisa ser inteiro.')
    .nonnegative('O estoque não pode ser negativo.'),
})
