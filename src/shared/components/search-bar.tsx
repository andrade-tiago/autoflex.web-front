import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput
} from '@/shared/components/ui/input-group'
import { SearchIcon } from 'lucide-react'

type SearchBarProps = {
  value: string
  onChange: React.HTMLAttributes<HTMLInputElement>['onChange']
  results?: number
  className?: React.HTMLAttributes<HTMLInputElement>['className']
} 

export const SearchBar: React.FunctionComponent<SearchBarProps> = props => {
  const resultsText = props.results === 1
    ? `1 resultado`
    : `${props.results ?? 0} resultados`

  return (
    <InputGroup className={props.className}>
      <InputGroupInput value={props.value} onChange={props.onChange} />
      <InputGroupAddon>
        <SearchIcon />
      </InputGroupAddon>
      <InputGroupAddon align="inline-end">
        {resultsText}
      </InputGroupAddon>
    </InputGroup>
  )
}
