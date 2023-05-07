import { FC, ReactNode } from "react"
import { useTaskQuery } from "./model"
import { useCategoryQuery } from ".."
import { useCategoryContext } from "../../shared"

interface ITaskProps {
  id: string
  children?: ReactNode
}

const Task: FC<ITaskProps> = ({ id, children }) => {
  const { task } = useTaskQuery(id)
  const { category } = useCategoryQuery(task.category._id)

  const { pinCategory } = useCategoryContext()

  return (
    <li
      className={`card bg-base-300/50 shrink-0 mb-2 ${
        pinCategory && pinCategory !== category._id && "hidden"
      }`}
    >
      <div className="card-body p-4 pr-[32px] flex flex-row items-center gap-4">
        {children}
        <div className="w-full">
          <h3
            className={`card-title break-words inline mr-2 ${
              task.checked && "line-through text-base-content/50"
            }`}
          >
            {task.title}
          </h3>
          {!pinCategory && (
            <span
              className={`
            badge opacity-60 border-base-content/30 relative -top-0.5 bg-base-300 text-base-content
            ${task.checked && "opacity-40"}
          `}
            >
              {category.title}
            </span>
          )}
          <p
            className={`text-base-content/50 mt-0 break-words ${
              task.checked && "line-through"
            }`}
          >
            {task.description}
          </p>
        </div>
        {/* DEVELOPMENT */}
        {/* <span className="badge badge-accent badge-outline absolute right-8">
          {task.order}
        </span> */}
      </div>
    </li>
  )
}

export default Task
