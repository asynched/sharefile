import { createBrowserRouter, RouterProvider } from 'react-router-dom'

import Home from 'src/pages/index'
import Dashboard from 'src/pages/dashboard'
import DashboardFolder from 'src/pages/dashboard/folders'

const router = createBrowserRouter([
  {
    path: '/',
    element: <Home />,
  },
  {
    path: '/dashboard',
    element: <Dashboard />,
  },
  {
    path: '/dashboard/folders',
    element: <DashboardFolder />,
  },
])

export default function App() {
  return <RouterProvider router={router} />
}
