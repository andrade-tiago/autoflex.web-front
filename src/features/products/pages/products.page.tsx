import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/shared/components/ui/card'
import { ProductsTable, type TableStatus } from '../components/products-table'
import { useMemo, useState } from 'react'
import { useProducts } from '../hooks/use-products.hook'
import { SearchBar } from '@/shared/components/search-bar'
import { Button } from '@/shared/components/ui/button'
import { AddProductDialog } from '../components/add-product-dialog'
import { useMaterials } from '@/hooks/use-materials.hook'
import { useCreateProduct } from '../hooks/use-create-product.hook'
import { useDeleteProduct } from '../hooks/use-delete-product.hook'
import type { ItemAction } from '../types/item-action'
import { DeleteProductAlert } from '../components/delete-material-alert'
import { useUpdateProduct } from '../hooks/use-update-product.hook'
import { UpdateProductDialog } from '../components/update-product-dialog'

export const ProductsPage: React.FunctionComponent = () => {
  const products = useProducts()
  const materials = useMaterials()
  const createProduct = useCreateProduct()
  const deleteProduct = useDeleteProduct()
  const updateProduct = useUpdateProduct()

  const [search, setSearch] = useState(String())
  const [itemAction, setItemAction] = useState<ItemAction | null>(null)

  const results = useMemo(() => {
    if (!search)
      return products.data ?? []

    return products.data?.filter(prod =>
      prod.name.toLowerCase().includes(
        search.toLowerCase()
      )
    ) ?? []
  }, [products.data, search])

  const tableStatus: TableStatus = useMemo(() => {
    if (products.isLoading)
      return 'loading'
    if (search && results.length === 0)
      return 'no_search_results'
    if (results.length === 0)
      return 'empty'

    return 'showing'
  }, [products, search, results])

  return (
    <div>
      <Card className="max-w-2xl mx-auto">
        <CardHeader>
          <CardTitle>
            Produtos
          </CardTitle>
          <CardDescription>
            Todos os produtos cadastrados.
          </CardDescription>
        </CardHeader>

        <CardContent>
          <div className="flex justify-between gap-3">
            <SearchBar
              value={search}
              onChange={event => setSearch(event.target.value)}
              results={results?.length}
              className="w-max"
            />
            <Button
              className="bg-amber-500 hover:bg-amber-600 enabled:cursor-pointer"
              onClick={() => setItemAction({ action: 'create' })}
            >
              Novo
            </Button>
          </div>
          <ProductsTable
            products={results}
            status={tableStatus}
            setAction={setItemAction}
          />
        </CardContent>
      </Card>

      <AddProductDialog
        materials={materials.data}
        handleSubmit={createProduct.execute}
        open={itemAction?.action === 'create'}
        onClose={() => setItemAction(null)}
      />
      <DeleteProductAlert
        onClose={() => setItemAction(null)}
        onConfirm={
          itemAction?.action === 'delete'
          ? () => deleteProduct.execute(itemAction.item.id)
          : undefined
        }
        open={itemAction?.action === 'delete'}
      />
      <UpdateProductDialog
        open={itemAction?.action === 'edit'}
        onClose={() => setItemAction(null)}
        handleSubmit={updateProduct.execute}
        materials={materials.data}
        product={itemAction?.action === 'edit' ? itemAction.item : undefined}
      />
    </div>
  )
}
