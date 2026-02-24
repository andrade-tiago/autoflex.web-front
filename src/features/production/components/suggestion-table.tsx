import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from '@/shared/components/ui/table'
import { CurrencyFormatter } from '@/core/infra/shared/currency-formatter'
import type { ProductionSuggestion } from '@/core/use-cases/suggest-production.use-case'

type SuggestionTableProps = {
  suggestion?: ProductionSuggestion
  tableStatus: SuggestionTableStatus
}
export type SuggestionTableStatus = 'showing' | 'loading' | 'empty'

const TABLE_COLS: number = 4
const LOADING_TABLE_ROWS: number = 5

export const SuggestionTable: React.FunctionComponent<SuggestionTableProps> = (props) => {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>
            Produto
          </TableHead>
          <TableHead>
            Valor unitário
          </TableHead>
          <TableHead>
            Quantidade
          </TableHead>
          <TableHead>
            Valor total
          </TableHead>
        </TableRow>
      </TableHeader>

      <TableBody>
        {props.tableStatus === 'loading' && Array.from({ length: LOADING_TABLE_ROWS }).map((_, i) =>
          <TableRow key={i}>
            {Array.from({ length: TABLE_COLS }).map((_, j) =>
              <TableCell key={j}>
                <LoadingData />
              </TableCell>
            )}
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
              {CurrencyFormatter.format(suggestion.unitValue)}
            </TableCell>
            <TableCell className="text-right">
              {suggestion.quantity.toLocaleString()}
            </TableCell>
            <TableCell className="text-right">
              {CurrencyFormatter.format(suggestion.totalValue)}
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
              {CurrencyFormatter.format(props.suggestion?.totalValue ?? 0)}
            </TableCell>
          </TableRow>
        </TableFooter>
      )}
    </Table>
  )
}

const LoadingData: React.FunctionComponent = () => {
  return (
    <span className="inline-block rounded-xl bg-gray-300 h-5 w-2/3 animate-pulse" />
  )
}
