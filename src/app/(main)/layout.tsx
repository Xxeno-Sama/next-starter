"use client"

import { useRef, useState } from "react"

import Sidebar from "./_components/Sidebar"

interface RootLayoutProps {
  children: React.ReactNode
}

export default function RootLayout({ children }: RootLayoutProps) {
  const [sidebarWidth, setSidebarWidth] = useState(300)

  const onWidthChange = (newWidth: number) => {
    setSidebarWidth(newWidth)
  }

  return (
    <div className="flex h-full w-full">
      <div
        className={"hidden"}
        style={{
          width: `${sidebarWidth}px`,
        }}
      >
        <Sidebar onWidthChange={onWidthChange} />
      </div>
      <div className="h-screen flex-1">{children}</div>
    </div>
  )
}
