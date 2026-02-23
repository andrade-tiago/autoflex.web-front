import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/shared/components/ui/table'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/shared/components/ui/dropdown-menu'
import { Button } from '@/shared/components/ui/button'
import { MoreHorizontalIcon } from 'lucide-react'
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from '@/shared/components/ui/hover-card'
import type { ItemAction } from '../types/item-action'
import type { Product } from '@/core/domain/models/product.model'
import { useMaterials } from '@/hooks/use-materials.hook'
import type { RawMaterial } from '@/core/domain/models/raw-material.model'
import type { ComponentProps } from 'react'

const TABLE_COLS = 3

type ProductsTableProps = {
  products?: Product[]
  status: TableStatus
  setAction: (action: ItemAction) => void
}
export type TableStatus = 'loading' | 'no_search_results' | 'empty' | 'showing'

export const ProductsTable: React.FunctionComponent<ProductsTableProps> = (props) => {
  const products = props.products ?? []

  const materials = useMaterials()

  function getMaterial(id: string): RawMaterial | undefined {
    return materials.data?.find(i => i.id === id)
  }

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>
            Nome
          </TableHead>
          <TableHead>
            Valor
          </TableHead>
          <TableHead>
            Opções
          </TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {props.status === 'showing' && products.map(product =>
          <HoverCard key={product.id} openDelay={100} closeDelay={100}>
            <HoverCardTrigger asChild>
              <ProductTableRow product={product} setAction={props.setAction} />
            </HoverCardTrigger>

            <HoverCardContent side="bottom">
              <span className="font-medium">Materiais requeridos:</span>
              <ul>
                {product.composition.map(item => (
                  <li key={item.materialId} className='list-disc list-inside'>
                    {getMaterial(item.materialId)?.name}:
                    {' '}{item.quantity}
                  </li>
                ))}
              </ul>
            </HoverCardContent>
          </HoverCard>
        )}
        {props.status === 'loading' && Array.from({ length: 10 }).map((_, i) =>
          <TableRow key={i}>
            {Array.from({ length: TABLE_COLS }).map((_, j) =>
              <TableCell key={j}>
                <DataSkeleton />
              </TableCell>
            )}
          </TableRow>
        )}
        {props.status === 'no_search_results' && (
          <TableRow>
            <TableCell colSpan={TABLE_COLS} align="center" className="text-gray-400">
              Nenhum resultado encontrado.
            </TableCell>
          </TableRow>
        )}
        {props.status === 'empty' && (
          <TableRow>
            <TableCell colSpan={TABLE_COLS} align="center" className="text-gray-400">
              Não há produtos cadastrados no momento.
            </TableCell>
          </TableRow>
        )}
      </TableBody>
    </Table>
  )
}

type ProductTableRowProps = ComponentProps<typeof TableRow> & {
  product: Product
  setAction: ProductsTableProps['setAction']
}
const ProductTableRow: React.FunctionComponent<ProductTableRowProps> = ({
  product,
  setAction,
  ...props
}) => {
  return (
    <TableRow key={product.id} {...props}>
      <TableCell>
        {product.name}
      </TableCell>
      <TableCell>
        {product.value.toFixed(2)}
      </TableCell>
      <TableCell>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost">
              <MoreHorizontalIcon />
            </Button>
          </DropdownMenuTrigger>

          <DropdownMenuContent>
            <DropdownMenuItem
              onClick={() => setAction({ item: product, action: 'edit' })}
            >
              Editar
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              variant="destructive"
              onClick={() => setAction({ item: product, action: 'delete' })}
            >
              Excluir
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </TableCell>
    </TableRow>
  )
}

const DataSkeleton: React.FunctionComponent = () => {
  return <span className="w-2/3 h-4 inline-block bg-gray-200 animate-pulse rounded-2xl" />
}
