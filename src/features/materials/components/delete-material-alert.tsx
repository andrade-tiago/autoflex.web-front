import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/shared/components/ui/alert-dialog'

type DeleteMaterialAlertProps = {
  open: boolean
  onClose: () => void
  onConfirm?: () => void
}

export const DeleteMaterialAlert: React.FunctionComponent<DeleteMaterialAlertProps> = (props) => {  
  return (
    <AlertDialog open={props.open} onOpenChange={() => props.onClose()}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>
            Excluir matéria-prima?
          </AlertDialogTitle>
          <AlertDialogDescription>
            Esta ação não poderá ser desfeita.
          </AlertDialogDescription>
        </AlertDialogHeader>

        <AlertDialogFooter>
          <AlertDialogCancel>
            Cancelar
          </AlertDialogCancel>
          <AlertDialogAction onClick={() => props.onConfirm?.()}>
            Excluir
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}
