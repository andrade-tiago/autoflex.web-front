import { createBrowserRouter, redirect } from 'react-router'
import { MaterialsPage } from './features/materials/pages/materials.page'
import { ProductsPage } from './features/products/pages/products.page'
import { SuggestionPage } from './features/production/pages/suggestion.page'
import { App } from './App'

export const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        index: true,
        loader: () => redirect('materials')
      },
      {
        path: 'materials',
        element: <MaterialsPage />,
      },
      {
        path: 'products',
        element: <ProductsPage />,
      },
      {
        path: 'production',
        children: [
          {
            index: true,
            loader: () => redirect('suggestion'),
          },
          {
            path: 'suggestion',
            element: <SuggestionPage />,
          },
        ],
      },
    ],
  },
])
