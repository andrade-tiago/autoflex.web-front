import { Outlet } from 'react-router'
import { SidebarLayout } from './layouts/side-bar.layout'
import { HeaderLayout } from './layouts/header.layout'
import { PageContentLayout } from './layouts/page-content.layout'

export const App: React.FunctionComponent = () => {
  return (
    <SidebarLayout>
      <HeaderLayout>
        <PageContentLayout>
          <Outlet />
        </PageContentLayout>
      </HeaderLayout>
    </SidebarLayout>
  )
}
