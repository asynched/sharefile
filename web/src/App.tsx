import { createBrowserRouter, RouterProvider } from 'react-router-dom'

import Home from 'src/pages/index'
import Dashboard from 'src/pages/dashboard'

const router = createBrowserRouter([
  {
    path: '/',
    element: <Home />,
  },
  {
    path: '/dashboard',
    element: <Dashboard />,
  },
])

export default function App() {
  return <RouterProvider router={router} />
}
