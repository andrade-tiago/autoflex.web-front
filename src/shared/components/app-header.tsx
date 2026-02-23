import { SidebarTrigger } from './ui/sidebar'

export const AppHeader: React.FunctionComponent = () => {
  return (
    <header className="w-full p-2 border-b mb-5">
      <SidebarTrigger />
    </header>
  )
}
