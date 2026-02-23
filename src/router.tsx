import { createBrowserRouter, redirect } from 'react-router'
import { MaterialsPage } from './features/materials/pages/materials.page'
import { ProductsPage } from './features/products/pages/products.page'
import { App } from './App'

export const MATERIALS_ROUTE = 'materials'
export const PRODUCTS_ROUTE = 'products'

export const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        path: '/',
        loader: () => redirect(MATERIALS_ROUTE)
      },
      {
        path: MATERIALS_ROUTE,
        element: <MaterialsPage />,
      },
      {
        path: PRODUCTS_ROUTE,
        element: <ProductsPage />,
      },
    ]
  },
])
