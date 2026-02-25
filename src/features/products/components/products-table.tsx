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
import { CurrencyTableData } from '@/shared/components/currency-table-data'
import { LoadingTableData } from '@/shared/components/loading-table-data'
import type { ItemAction } from '../types/item-action'
import type { Product } from '@/core/domain/models/product.model'

const TABLE_COLS = 3

type ProductsTableProps = {
  products?: Product[]
  status: TableStatus
  setAction: (action: ItemAction) => void
}
export type TableStatus = 'loading' | 'no_search_results' | 'empty' | 'showing'

export const ProductsTable: React.FunctionComponent<ProductsTableProps> = (props) => {
  const products = props.products ?? []

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
          <ProductTableRow product={product} setAction={props.setAction} />
        )}
        {props.status === 'loading' && Array.from({ length: 10 }).map((_, i) =>
          <TableRow key={i}>
            {Array.from({ length: TABLE_COLS }).map((_, j) =>
              <TableCell key={j}>
                <LoadingTableData />
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

type ProductTableRowProps = {
  product: Product
  setAction: ProductsTableProps['setAction']
}
const ProductTableRow: React.FunctionComponent<ProductTableRowProps> = (props) => {
  return (
    <TableRow key={props.product.id}>
      <TableCell>
        {props.product.name}
      </TableCell>
      <TableCell className="text-right">
        <CurrencyTableData value={props.product.value} />
      </TableCell>
      <TableCell className="text-right">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost">
              <MoreHorizontalIcon />
            </Button>
          </DropdownMenuTrigger>

          <DropdownMenuContent>
            <DropdownMenuItem
              onClick={() => props.setAction({ item: props.product, action: 'edit' })}
            >
              Editar
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              variant="destructive"
              onClick={() => props.setAction({ item: props.product, action: 'delete' })}
            >
              Excluir
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </TableCell>
    </TableRow>
  )
}
