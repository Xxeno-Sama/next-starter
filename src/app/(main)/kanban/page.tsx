"use client"

import React, { useState } from "react"

const KanbanBoard = () => {
  const [boardData, setBoardData] = useState([
    {
      id: 1,
      name: "Backlog",
      bgColor: "bg-red-500",
      cards: [
        "Research Next.js",
        "Learn DRF basics",
        "Watch Jujutsu Kaisen episode 1",
      ],
    },
    {
      id: 2,
      name: "Doing",
      bgColor: "bg-yellow-500",
      cards: [
        "Build a React component",
        "Set up DRF project",
        "Football match highlights",
      ],
    },
    {
      id: 3,
      name: "Review",
      bgColor: "bg-green-500",
      cards: [
        "Code review React project",
        "Test API endpoints",
        "Watch JJK fight scenes",
      ],
    },
    {
      id: 4,
      name: "Done",
      bgColor: "bg-blue-500",
      cards: [
        "Deploy Next.js app",
        "Complete DRF tutorial",
        "Finish latest JJK episode",
      ],
    },
  ])

  return (
    <div className="grid h-full w-full grid-cols-4  gap-10 p-5">
      {boardData.map((board) => (
        <div
          key={board.id}
          className={`h-3/4 w-auto rounded-md border-2 border-white `}
        >
          <div
            className={`${board.bgColor} flex h-1/6 w-full items-center justify-center text-2xl font-semibold`}
          >
            {board.name}
          </div>
          <div className="flex flex-col gap-2 overflow-y-auto p-5">
            {board.cards.map((card, index) => (
              <div
                className="flex h-10 items-center justify-center rounded-lg bg-white font-semibold text-black"
                key={index}
              >
                {card}
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  )
}

export default KanbanBoard
