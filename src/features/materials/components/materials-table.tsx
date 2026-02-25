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
import { LoadingTableData } from '@/shared/components/loading-table-data'
import type { RawMaterial } from '@/core/domain/models/raw-material.model'
import type { ItemAction } from '../types/item-action'

type MaterialsTableProps = {
  materials?: RawMaterial[]
  search?: string
  status: TableStatus
  setAction: (action: ItemAction) => void
}
export type TableStatus = 'loading' | 'no_search_results' | 'empty' | 'showing'

const TABLE_COLS = 3

export const MaterialsTable: React.FunctionComponent<MaterialsTableProps> = (props) => {
  const materials = props.materials ?? []

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>
            Nome
          </TableHead>
          <TableHead>
            Estoque
          </TableHead>
          <TableHead>
            Opções
          </TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {props.status === 'showing' && materials.map(item =>
          <TableRow key={item.id}>
            <TableCell>
              {item.name}
            </TableCell>
            <TableCell className="text-right">
              {item.stock}
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
                    onClick={() => props.setAction({ item, action: 'edit' })}
                  >
                    Editar
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem
                    variant="destructive"
                    onClick={() => props.setAction({ item, action: 'delete' })}
                  >
                    Excluir
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </TableCell>
          </TableRow>
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
              Não há materiais cadastrados no momento.
            </TableCell>
          </TableRow>
        )}
      </TableBody>
    </Table>
  )
}
