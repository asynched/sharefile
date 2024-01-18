import { createBrowserRouter, RouterProvider } from 'react-router-dom'

import Home from 'src/pages/index'
import Dashboard from 'src/pages/dashboard'
import DashboardFolder from 'src/pages/dashboard/folders'
import DashboardFolderDetail from 'src/pages/dashboard/folders/[id]'
import Settings from 'src/pages/dashboard/settings'

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
  {
    path: '/dashboard/folders/:id',
    element: <DashboardFolderDetail />,
  },
  {
    path: '/dashboard/settings',
    element: <Settings />,
  },
])

export default function App() {
  return <RouterProvider router={router} />
}
