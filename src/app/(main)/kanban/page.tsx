// "use client"

// import React, { useRef, useState } from "react"

// import { cn } from "@/lib/utils"

// const KanbanBoard = () => {
//   const dragItem = useRef<string | null>(null)
//   const dragOverItem = useRef<string | null>(null)

//   const [boardData, setBoardData] = useState([
//     {
//       id: 1,
//       name: "Backlog",
//       bgColor: "bg-red-500",
//       cards: [
//         "Research Next.js",
//         "Learn DRF basics",
//         "Watch Jujutsu Kaisen episode 1",
//       ],
//     },
//     {
//       id: 2,
//       name: "Doing",
//       bgColor: "bg-yellow-500",
//       cards: [
//         "Build a React component",
//         "Set up DRF project",
//         "Football match highlights",
//       ],
//     },
//     {
//       id: 3,
//       name: "Review",
//       bgColor: "bg-green-500",
//       cards: [
//         "Code review React project",
//         "Test API endpoints",
//         "Watch JJK fight scenes",
//       ],
//     },
//     {
//       id: 4,
//       name: "Done",
//       bgColor: "bg-blue-500",
//       cards: [
//         // "Deploy Next.js app",
//         // "Complete DRF tutorial",
//         // "Finish latest JJK episode",
//       ],
//     },
//   ])

//   const dragStart = (e: React.DragEvent<HTMLDivElement>) => {
//     const target = e.target as HTMLDivElement
//     if (target && target.id) {
//       console.log("dragging", target.id)
//       dragItem.current = target.id
//     }
//   }

//   const dragEnter = (e: React.DragEvent<HTMLDivElement>) => {
//     const target = e.target as HTMLDivElement
//     if (target && target.id) {
//       console.log("dragging over", target.id)
//       dragOverItem.current = target.id
//     }
//   }

//   const drop = () => {
//     const boardIndex = boardData.findIndex((board) =>
//       board.cards.includes(dragItem.current!)
//     )

//     const dropBoardIndex = boardData.findIndex((board) =>
//       board.cards.includes(dragOverItem.current!)
//     )

//     const itemIndex = boardData[boardIndex].cards.findIndex(
//       (card) => card === dragItem.current!
//     )

//     const dropItemIndex = boardData[dropBoardIndex].cards.findIndex(
//       (card) => card === dragOverItem.current!
//     )

//     const updatedBoard = [...boardData]

//     if (boardIndex === dropBoardIndex && itemIndex === dropItemIndex) {
//       // if the dragged item is dropped on itself, return
//       return
//     }

//     // remove the dragged item from the board
//     updatedBoard[boardIndex].cards.splice(itemIndex, 1)

//     // add the dragged item to the new board

//     updatedBoard[dropBoardIndex].cards.splice(
//       dropItemIndex,
//       0,
//       dragItem.current!
//     )

//     setBoardData(updatedBoard)
//   }

//   return (
//     <div className="grid h-full w-full grid-cols-4  gap-10 p-5">
//       {boardData.map((board) => (
//         <div
//           key={board.id}
//           className={`h-3/4 w-auto rounded-md border-2 border-white `}
//         >
//           <div
//             className={`${board.bgColor} flex h-1/6 w-full items-center justify-center text-2xl font-semibold`}
//             draggable
//             onDragOver={(e) => e.preventDefault()}
//             onDrop={() => {
//               console.log("Dropping over board", board.name)
//             }}
//           >
//             {board.name}
//           </div>
//           <div className="flex flex-col gap-2 overflow-y-auto p-5">
//             {board.cards.map((card, index) => (
//               <div
//                 onDragStart={(e) => dragStart(e)}
//                 onDragEnter={(e) => dragEnter(e)}
//                 onDragEnd={drop}
//                 draggable
//                 className={cn(
//                   "flex h-10 items-center justify-center rounded-lg bg-white font-semibold text-black"
//                 )}
//                 id={card}
//                 key={index}
//               >
//                 {card}
//               </div>
//             ))}
//           </div>
//         </div>
//       ))}
//     </div>
//   )
// }

// export default KanbanBoard
"use client"

import React, { useRef, useState } from "react"

import { cn } from "@/lib/utils"

const KanbanBoard = () => {
  const dragItem = useRef<{ boardIndex: number; cardIndex: number } | null>(
    null
  )
  const dragOverItem = useRef<{ boardIndex: number; cardIndex: number } | null>(
    null
  )

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
      cards: [],
    },
  ])

  const dragStart = (
    e: React.DragEvent<HTMLDivElement>,
    boardIndex: number,
    cardIndex: number
  ) => {
    dragItem.current = { boardIndex, cardIndex }
  }

  const dragEnter = (
    e: React.DragEvent<HTMLDivElement>,
    boardIndex: number,
    cardIndex?: number
  ) => {
    if (cardIndex !== undefined) {
      dragOverItem.current = { boardIndex, cardIndex }
    } else {
      dragOverItem.current = { boardIndex, cardIndex: -1 }
    }
  }

  const drop = () => {
    if (dragItem.current && dragOverItem.current) {
      const { boardIndex: startBoardIndex, cardIndex: startCardIndex } =
        dragItem.current
      const { boardIndex: endBoardIndex, cardIndex: endCardIndex } =
        dragOverItem.current

      const updatedBoard = [...boardData]

      // Remove the dragged item from its original position
      const [draggedItem] = updatedBoard[startBoardIndex].cards.splice(
        startCardIndex,
        1
      )

      if (endCardIndex === -1) {
        // If dropped on an empty board or non-card area, add at the end
        updatedBoard[endBoardIndex].cards.push(draggedItem)
      } else {
        // If dropped on a specific card, insert before that card
        updatedBoard[endBoardIndex].cards.splice(endCardIndex, 0, draggedItem)
      }

      setBoardData(updatedBoard)
    }

    dragItem.current = null
    dragOverItem.current = null
  }

  return (
    <div className="grid h-full w-full grid-cols-4 gap-10 p-5">
      {boardData.map((board, boardIndex) => (
        <div
          key={board.id}
          id={board.name}
          className={`h-3/4 w-auto rounded-md border-2 border-white`}
          // onDragEnter={(e) => dragEnter(e, boardIndex)}
          onDragEnter={(e) => {
            const target = e.target as HTMLDivElement
            console.log("Dragging over board : ", target.id)
          }}
          onDragOver={(e) => e.preventDefault()}
          // onDrop={drop}
          onDrop={() => {
            console.log("Dropping over board ", board.name)
          }}
        >
          <div
            className={`${board.bgColor} flex h-1/6 w-full items-center justify-center text-2xl font-semibold`}
          >
            {board.name}
          </div>
          <div className="flex flex-col gap-2 overflow-y-auto p-5">
            {board.cards.map((card, cardIndex) => (
              <div
                onDragStart={(e) => dragStart(e, boardIndex, cardIndex)}
                onDragEnter={(e) => {
                  e.stopPropagation()
                  dragEnter(e, boardIndex, cardIndex)
                }}
                draggable
                className={cn(
                  "flex h-10 items-center justify-center rounded-lg bg-white font-semibold text-black"
                )}
                // onDrop={drop}
                onDrop={(e) => {
                  e.stopPropagation()
                  console.log("Dropping over card", card)
                }}
                id={card}
                key={cardIndex}
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
