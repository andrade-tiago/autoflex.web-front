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

type DeleteProductAlertProps = {
  open: boolean
  onClose: () => void
  onConfirm?: () => Promise<void>
}

export const DeleteProductAlert: React.FunctionComponent<DeleteProductAlertProps> = (props) => {  
  return (
    <AlertDialog open={props.open} onOpenChange={() => props.onClose()}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>
            Excluir produto?
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
