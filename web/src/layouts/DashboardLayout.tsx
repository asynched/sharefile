import { ReactNode } from 'react'
import DashboardNavbar from 'src/components/navbar/DashboardNavbar'

export type DashboardLayoutProps = {
  children: ReactNode
}

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  return (
    <div className="w-full h-screen flex">
      <DashboardNavbar />
      <main className="py-6 w-full h-screen overflow-auto">
        <div className="max-w-screen-lg w-full mx-auto">{children}</div>
      </main>
    </div>
  )
}
