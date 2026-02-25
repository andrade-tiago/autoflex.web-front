type PageContentLayoutProps = {
  children: React.ReactNode
}

export const PageContentLayout: React.FunctionComponent<PageContentLayoutProps> = (props) => {
  return (
    <div className="flex-1 p-5">
      {props.children}
    </div>
  )
}
