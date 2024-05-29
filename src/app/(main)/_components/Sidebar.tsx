import React, { useRef } from "react"

interface SidebarProps {
  onWidthChange: (newWidth: number) => void
}

const Sidebar = ({ onWidthChange }: SidebarProps) => {
  const isResizing = useRef(false)

  const handleMouseMove = (e: MouseEvent) => {
    if (!isResizing.current) return
    let newWidth = e.clientX

    if (newWidth < 200) newWidth = 200
    if (newWidth > 400) newWidth = 400

    onWidthChange(newWidth)
  }

  const handleMouseUp = () => {
    isResizing.current = false
    document.removeEventListener("mousemove", handleMouseMove)
    document.removeEventListener("mouseup", handleMouseUp)
  }

  const handleMouseDown = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()

    isResizing.current = true

    document.addEventListener("mousemove", handleMouseMove)
    document.addEventListener("mouseup", handleMouseUp)
  }

  return (
    <div className="relative h-full w-full bg-gray-200 px-2">
      {[...Array(10)].map((_, i) => (
        <div
          key={i}
          className="mb-2 flex h-12 items-center rounded-lg bg-black p-4 text-2xl"
        >
          Navigation{i + 1}
        </div>
      ))}

      <div
        className="absolute right-0 top-0 h-full w-1 cursor-ew-resize
      bg-blue-700
      "
        onMouseDown={handleMouseDown}
      />
    </div>
  )
}

export default Sidebar
