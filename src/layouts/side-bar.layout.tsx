import { AppSideBar } from '@/shared/components/app-sidebar'
import { SidebarProvider } from '@/shared/components/ui/sidebar'

type SidebarLayoutProps = {
  children: React.ReactNode
}

export const SidebarLayout: React.FunctionComponent<SidebarLayoutProps> = (props) => {
  return (
    <SidebarProvider>
      <AppSideBar />
      <div className='flex-1'>
        {props.children}
      </div>
    </SidebarProvider>
  )
}
