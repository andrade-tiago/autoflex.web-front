import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/shared/components/ui/card'
import { MaterialsTable, type TableStatus } from '../components/materials-table'
import { SearchBar } from '@/shared/components/search-bar'
import { useMaterials } from '@/hooks/use-materials.hook'
import { useMemo, useState } from 'react'
import { Button } from '@/shared/components/ui/button'
import { AddMaterialDialog } from '../components/add-material-dialog'
import { useCreateMaterial } from '../hooks/use-create-material.hook'
import { UpdateMaterialDialog } from '../components/update-material-dialog'
import { useUpdateMaterial } from '../hooks/use-update-material.hook'
import { DeleteMaterialAlert } from '../components/delete-material-alert'
import { useDeleteMaterial } from '../hooks/use-delete-material.hook'
import type { ItemAction } from '../types/item-action'


export const MaterialsPage: React.FunctionComponent = () => {
  const materials = useMaterials()
  const createMaterial = useCreateMaterial()
  const updateMaterial = useUpdateMaterial()
  const deleteMaterial = useDeleteMaterial()

  const [search, setSearch] = useState(String())
  const [itemAction, setItemAction] = useState<ItemAction | undefined>()

  const results = useMemo(() => {
    if (!search)
      return materials.data ?? []

    return materials.data?.filter(i =>
      i.name.toLowerCase().includes(
        search.toLowerCase()
      )
    ) ?? []
  }, [materials.data, search])

  const tableStatus: TableStatus = useMemo(() => {
    if (materials.isLoading)
      return 'loading'
    if (search && results.length === 0)
      return 'no_search_results'
    if (results.length === 0)
      return 'empty'

    return 'showing'
  }, [materials, search])

  return (
    <div className="flex-1 flex flex-col items-center">
      <Card className="w-full max-w-lg">
        <CardHeader>
          <CardTitle>
            Materiais
          </CardTitle>
          <CardDescription>
            Materias cadastrados e suas respectivas quantidades em estoque.
          </CardDescription>
        </CardHeader>

        <CardContent className="flex flex-col gap-3">
          <div className="flex justify-between gap-3">
            <SearchBar
              value={search}
              onChange={event => setSearch(event.target.value)}
              results={results?.length}
            />
            <Button
              className="bg-cyan-700 hover:bg-cyan-800 enabled:cursor-pointer"
              onClick={() => setItemAction({ action: 'create' })}
            >
              Novo
            </Button>
          </div>
          <MaterialsTable
            materials={results}
            status={tableStatus}
            setAction={setItemAction}
          />
        </CardContent>
      </Card>

      <AddMaterialDialog
        open={itemAction?.action === 'create'}
        onClose={() => setItemAction(undefined)}
        handleSubmit={createMaterial.execute}
      />
      <UpdateMaterialDialog
        open={itemAction?.action === 'edit'}
        material={itemAction?.action === 'edit' ? itemAction.item : undefined}
        handleSubmit={updateMaterial.execute}
        onClose={() => setItemAction(undefined)}
      />
      <DeleteMaterialAlert
        open={itemAction?.action === 'delete'}
        onConfirm={
          itemAction?.action === 'delete'
            ? () => deleteMaterial.execute(itemAction.item.id)
            : undefined
        }
        onClose={() => setItemAction(undefined)}
      />
    </div>
  )
}
