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
import { PackageSearchIcon, PencilRulerIcon, SparklesIcon } from 'lucide-react'

export const AppSideBar: React.FunctionComponent = () => {
  return (
    <Sidebar>
      <SidebarContent>
        <ControlGroup />
        <ProductionGroup />
      </SidebarContent>
    </Sidebar>
  )
}

const ControlGroup: React.FunctionComponent = () => {
  return (
    <SidebarGroup>
      <SidebarGroupLabel>
        Controle
      </SidebarGroupLabel>

      <SidebarGroupContent>
        <SidebarMenuItem>
          <SidebarMenuButton asChild>
            <Link to="materials">
              <PencilRulerIcon />
              Matérias-primas
            </Link>
          </SidebarMenuButton>
        </SidebarMenuItem>

        <SidebarMenuItem>
          <SidebarMenuButton asChild>
            <Link to="products">
              <PackageSearchIcon />
              Produtos
            </Link>
          </SidebarMenuButton>
        </SidebarMenuItem>
      </SidebarGroupContent>
    </SidebarGroup>
  )
}

const ProductionGroup: React.FunctionComponent = () => {
  return (
    <SidebarGroup>
      <SidebarGroupLabel>
        Produção
      </SidebarGroupLabel>

      <SidebarGroupContent>
        <SidebarMenuItem>
          <SidebarMenuButton asChild>
            <Link to="production/suggestion">
              <SparklesIcon />
              Sugestão
            </Link>
          </SidebarMenuButton>
        </SidebarMenuItem>
      </SidebarGroupContent>
    </SidebarGroup>
  )
}
