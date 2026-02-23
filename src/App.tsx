import { Outlet } from 'react-router'
import { SidebarLayout } from './layouts/side-bar.layout'
import { HeaderLayout } from './layouts/header.layout'

export const App: React.FunctionComponent = () => {
  return (
    <SidebarLayout>
      <HeaderLayout>
        <Outlet />
      </HeaderLayout>
    </SidebarLayout>
  )
}
