import Sidebar from "./_components/Sidebar"

interface RootLayoutProps {
  children: React.ReactNode
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <div className="flex h-full w-full">
      <div className="w-[300px] ">
        <Sidebar />
      </div>
      <div className="flex-1">{children}</div>
    </div>
  )
}
