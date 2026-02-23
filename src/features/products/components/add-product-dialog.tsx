import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/shared/components/ui/dialog'
import {
  Controller,
  useFieldArray,
  useForm,
  useWatch,
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
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/shared/components/ui/select'
import { XIcon } from 'lucide-react'
import type { CreateProductDTO } from '@/core/use-cases/create-product.use-case'
import type { RawMaterial } from '@/core/domain/models/raw-material.model'

type AddProductDialogProps = {
  open: boolean
  onClose: () => void
  handleSubmit: (data: CreateProductDTO) => Promise<void>
  materials?: RawMaterial[]
}

const FORM_ID = 'createProduct'

export const AddProductDialog: React.FunctionComponent<AddProductDialogProps> = props => {
  const materials = props.materials ?? []

  const form = useForm({
    resolver: zodResolver(createProductSchema),
    defaultValues: {
      name: String(),
      value: String(),
      composition: [],
    },
  })
  const composition = useFieldArray({
    control: form.control,
    name: 'composition',
  })
  const watchedComposition = useWatch({
    control: form.control,
    name: 'composition',
  })
  const selectedMaterialIds = watchedComposition.map(item => item.rawMaterialId)

  async function handleSubmit(data: CreateProductDTO) {
    await props.handleSubmit(data)
    props.onClose()
    form.reset()
  }

  return (
    <Dialog open={props.open} onOpenChange={props.onClose}>
      <DialogContent className="flex flex-1 max-h-[90vh]">
        <form
          className="flex flex-1 flex-col"
          onSubmit={form.handleSubmit(handleSubmit)}
        >
          <DialogHeader>
            <DialogTitle>
              Novo produto
            </DialogTitle>
          </DialogHeader>

          <div className="flex flex-col flex-1 gap-5 p-5 my-5 overflow-y-auto border-y">
            <Field data-invalid={form.control.getFieldState('name').invalid}>
              <FieldLabel>
                Nome
              </FieldLabel>
              <Input
                {...form.control.register('name')}
                type='text'
                aria-invalid={form.control.getFieldState('name').invalid}
              />
              {form.control.getFieldState('name').invalid && (
                <FieldError errors={[form.control.getFieldState('name').error]} />
              )}
            </Field>

            <Field data-invalid={form.control.getFieldState('value').invalid}>
              <FieldLabel>
                Valor
              </FieldLabel>
              <Input
                {...form.control.register('value')}
                type='number'
                min={0}
                aria-invalid={form.control.getFieldState('value').invalid}
              />
              {form.control.getFieldState('value').invalid && (
                <FieldError errors={[form.control.getFieldState('value').error]} />
              )}
            </Field>

            <Field>
              <FieldLabel>
                Composição
              </FieldLabel>

              <div className="border p-3 rounded-2xl flex flex-col gap-5">
                {composition.fields.map((field, index) =>
                  <div key={field.id} className="flex justify-between gap-2 items-end">
                    <Field className="flex flex-col">
                      <FieldLabel htmlFor={`${FORM_ID}.composition.${index}.rawMaterialId`}>
                        Material
                      </FieldLabel>

                      <Controller
                        control={form.control}
                        name={`composition.${index}.rawMaterialId`}
                        render={({ field }) => (
                          <Select
                            value={field.value}
                            onValueChange={field.onChange}
                          >
                            <SelectTrigger
                              id={`${FORM_ID}.composition.${index}.rawMaterialId`}
                              className="w-full max-w-48"
                            >
                              <SelectValue placeholder="Selecione" />
                            </SelectTrigger>

                            <SelectContent>
                              <SelectGroup>
                                {materials.map(material => (
                                  <SelectItem
                                    key={material.id}
                                    value={material.id}
                                    disabled={
                                      selectedMaterialIds.includes(material.id)
                                      && watchedComposition[index]?.rawMaterialId !== material.id
                                    }
                                  >
                                    {material.name}
                                  </SelectItem>
                                ))}
                              </SelectGroup>
                            </SelectContent>
                          </Select>
                        )}
                      />
                    </Field>

                    <Field>
                      <FieldLabel htmlFor={`${FORM_ID}.composition.${index}.requiredQuantity`}>
                        Quantidade
                      </FieldLabel>
                      <Input
                        type="number"
                        min={1}
                        id={`${FORM_ID}.composition.${index}.requiredQuantity`}
                        {...form.control.register(`composition.${index}.requiredQuantity`)}
                      />
                    </Field>

                    <Button
                      type="button"
                      variant="ghost"
                      onClick={() => composition.remove(index)}
                    >
                      <XIcon />
                    </Button>
                  </div>
                )}

                <Button
                  type="button"
                  onClick={() => composition.append({ rawMaterialId: '', requiredQuantity: 1 })}
                >
                  Adicionar material
                </Button>
              </div>
            </Field>
          </div>

          <DialogFooter>
            <Button type="submit">
              Criar
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}

const createProductSchema = z.object({
  name: z.string()
    .trim()
    .min(1, 'O nome não pode estar vazio.'),
  value: z.coerce.number()
    .nonnegative('O valor não deve ser negativo.'),
  composition: z.array(z.object({
    rawMaterialId: z.uuid(),
    requiredQuantity: z.coerce.number()
      .int('A quantidade deve ser inteira')
      .positive('A quantidade deve ser maior que zero'),
  })),
})
