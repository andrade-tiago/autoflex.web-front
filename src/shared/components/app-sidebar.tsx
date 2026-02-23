import { Link } from 'react-router'
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenuButton,
  SidebarMenuItem,
} from './ui/sidebar'
import { PackageSearchIcon, PencilRulerIcon } from 'lucide-react'

export const AppSideBar: React.FunctionComponent = () => {
  return (
    <Sidebar>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>
            Dashboard
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenuItem>
              <SidebarMenuButton asChild>
                <Link to="materials">
                  <PencilRulerIcon />
                  Matérias-primas
                </Link>
              </SidebarMenuButton>
              <SidebarMenuButton asChild>
                <Link to="products">
                <PackageSearchIcon />
                  Produtos
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  )
}
