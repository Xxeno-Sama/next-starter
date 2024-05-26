import React from "react"

const Sidebar = () => {
  return (
    <div className="h-full w-full bg-blue-700">
      {[...Array(10)].map((_, i) => (
        <div
          key={i}
          className="mb-2 flex h-12 items-center rounded-lg bg-blue-500 p-4 text-2xl"
        >
          Navigation{i + 1}
        </div>
      ))}
    </div>
  )
}

export default Sidebar
