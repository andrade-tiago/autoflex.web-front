import { CurrencyFormatter } from '@/core/infra/shared/currency-formatter'

type CurrencyTableDataProps = {
  value?: number
}

export const CurrencyTableData: React.FunctionComponent<CurrencyTableDataProps> = (props) => {
  const value = Number.isFinite(props.value) ? props.value! : 0
  const parts = CurrencyFormatter.formatToParts(value)

  const currency = parts.find(p => p.type === 'currency')?.value
  const valueStartsIndex = parts.findIndex(p => p.type === 'integer')
  
  return (
    <span className="flex justify-between gap-2 w-full">
      <span>
        {currency}
      </span>

      <span>
        {value < 0 ? ' -' : null}
        {parts.slice(valueStartsIndex, parts.length)
          .map(p => p.value)
          .join(String())
        }
      </span>
    </span>
  )
}
