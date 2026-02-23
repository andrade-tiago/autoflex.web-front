import { AppHeader } from '@/shared/components/app-header'

type HeaderLayoutProps = {
  children: React.ReactNode
}

export const HeaderLayout: React.FunctionComponent<HeaderLayoutProps> = (props) => {
  return (
    <>
      <AppHeader />
      {props.children}
    </>
  )
}
