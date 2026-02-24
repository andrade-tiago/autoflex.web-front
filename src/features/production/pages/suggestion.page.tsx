import { useMemo } from 'react'
import { useProductSuggestion } from '../hooks/use-product-suggestion.hook'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/shared/components/ui/card'
import {
  SuggestionTable,
  type SuggestionTableStatus
} from '../components/suggestion-table'

export const SuggestionPage: React.FunctionComponent = () => {
  const suggestion = useProductSuggestion()

  const tableStatus = useMemo((): SuggestionTableStatus => {
    if (suggestion.isLoading)
      return 'loading'
    if (suggestion.data && suggestion.data.products.length === 0)
      return 'empty'
    return 'showing'
  }, [suggestion])
  
  return (
    <div className="flex-1 flex flex-col items-center">
      <Card className="w-full max-w-2xl">
        <CardHeader>
          <CardTitle>
            Sugestão de produção
          </CardTitle>
          <CardDescription>
            Sugestão de produção baseada nos materiais em estoque e nos materiais
            necessários para os produto, com a preferência para os produtos de maior
            valor.
          </CardDescription>
        </CardHeader>

        <CardContent>
          <SuggestionTable
            tableStatus={tableStatus}
            suggestion={suggestion.data}
          />
        </CardContent>
      </Card>
    </div>
  )
}
