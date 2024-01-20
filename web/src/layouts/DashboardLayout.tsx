import { ReactNode } from 'react'
import DashboardNavbar from 'src/components/navbar/DashboardNavbar'
import Title from 'src/components/utils/Title'

export type DashboardLayoutProps = {
  title?: string
  children: ReactNode
}

export default function DashboardLayout({
  children,
  title,
}: DashboardLayoutProps) {
  return (
    <div className="w-full h-screen flex">
      <Title title={title ?? 'ShareFile'}></Title>
      <DashboardNavbar />
      <main className="py-6 w-full h-screen overflow-auto">
        <div className="max-w-screen-lg w-full mx-auto">{children}</div>
      </main>
    </div>
  )
}
