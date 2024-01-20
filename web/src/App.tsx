import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

import Private from 'src/routing/Private'
import Public from 'src/routing/Public'

import Home from 'src/pages/index'
import Dashboard from 'src/pages/dashboard'
import DashboardFolder from 'src/pages/dashboard/folders'
import DashboardFolderDetail from 'src/pages/dashboard/folders/[id]'
import Settings from 'src/pages/dashboard/settings'
import SignUp from 'src/pages/auth/sign-up'
import SignIn from 'src/pages/auth/sign-in'

const router = createBrowserRouter([
  {
    path: '/',
    element: <Home />,
  },
  {
    path: '/auth/sign-up',
    element: (
      <Public>
        <SignUp />
      </Public>
    ),
  },
  {
    path: '/auth/sign-in',
    element: (
      <Public>
        <SignIn />
      </Public>
    ),
  },
  {
    path: '/dashboard',
    element: (
      <Private>
        <Dashboard />
      </Private>
    ),
  },
  {
    path: '/dashboard/folders',
    element: (
      <Private>
        <DashboardFolder />
      </Private>
    ),
  },
  {
    path: '/dashboard/folders/:id',
    element: (
      <Private>
        <DashboardFolderDetail />
      </Private>
    ),
  },
  {
    path: '/dashboard/settings',
    element: (
      <Private>
        <Settings />
      </Private>
    ),
  },
])

const queryClient = new QueryClient()

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>
  )
}
