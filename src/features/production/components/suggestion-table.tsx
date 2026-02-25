import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from '@/shared/components/ui/table'
import { CurrencyTableData } from '@/shared/components/currency-table-data'
import { LoadingTableData } from '@/shared/components/loading-table-data'
import type { ProductionSuggestion } from '@/core/use-cases/suggest-production.use-case'
import { Link } from 'react-router'

type SuggestionTableProps = {
  suggestion?: ProductionSuggestion
  tableStatus: SuggestionTableStatus
}
export type SuggestionTableStatus = 'showing' | 'loading' | 'empty' | 'no_products'

const TABLE_COLS: number = 4
const LOADING_TABLE_ROWS: number = 5

export const SuggestionTable: React.FunctionComponent<SuggestionTableProps> = (props) => {
  return (
    <Table className="table-fixed w-full">
      <TableHeader>
        <TableRow>
          <TableHead className="overflow-x-auto whitespace-break-spaces">
            Produto
          </TableHead>
          <TableHead className="overflow-x-auto whitespace-break-spaces">
            Valor unitário
          </TableHead>
          <TableHead className="overflow-x-auto whitespace-break-spaces">
            Quantidade
          </TableHead>
          <TableHead className="overflow-x-auto whitespace-break-spaces">
            Valor total
          </TableHead>
        </TableRow>
      </TableHeader>

      <TableBody>
        {props.tableStatus === 'loading' && Array.from({ length: LOADING_TABLE_ROWS }).map((_, i) =>
          <TableRow key={i}>
            {Array.from({ length: TABLE_COLS }).map((_, j) =>
              <TableCell key={j}>
                <LoadingTableData />
              </TableCell>
            )}
          </TableRow>
        )}
        {props.tableStatus === 'no_products' && (
          <TableRow>
            <TableCell
              colSpan={TABLE_COLS}
              align="center"
              className="text-gray-500 whitespace-break-spaces "
            >
              Não há produtos cadastrados no momento. Clique{' '}
              <Link className="underline text-cyan-600" to="/products">
                aqui
              </Link>
              {' '}para acessar o controle de produtos.
            </TableCell>
          </TableRow>
        )}
        {props.tableStatus === 'empty' && (
          <TableRow>
            <TableCell
              colSpan={TABLE_COLS}
              align="center"
              className="text-gray-500"
            >
              Não é possível produzir com os materiais em estoque.
            </TableCell>
          </TableRow>
        )}
        {props.tableStatus === 'showing' && props.suggestion?.products.map(suggestion =>
          <TableRow key={suggestion.productId}>
            <TableCell>
              {suggestion.productName}
            </TableCell>
            <TableCell className="text-right">
              <CurrencyTableData value={suggestion.unitValue} />
            </TableCell>
            <TableCell className="text-right">
              {suggestion.quantity.toLocaleString()}
            </TableCell>
            <TableCell className="text-right">
              <CurrencyTableData value={suggestion.totalValue} />
            </TableCell>
          </TableRow>
        )}
      </TableBody>

      {props.tableStatus === 'showing' && (
        <TableFooter>
          <TableRow>
            <TableCell colSpan={TABLE_COLS - 1}>
              Total
            </TableCell>
            <TableCell className="text-right">
              <CurrencyTableData value={props.suggestion?.totalValue} />
            </TableCell>
          </TableRow>
        </TableFooter>
      )}
    </Table>
  )
}
