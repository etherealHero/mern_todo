import { FC, ReactNode } from "react"
import { useTaskQuery } from "./model"

interface ITaskProps {
  id: string
  children?: ReactNode
}

const Task: FC<ITaskProps> = ({ id, children }) => {
  const { task } = useTaskQuery(id)

  return (
    <li className="card bg-base-300/50 shrink-0 mb-2">
      <div className="card-body p-4 pr-[72px] flex flex-row items-center gap-4">
        {children}
        <div className="w-full">
          <h3 className="card-title break-words">{task.title}</h3>
          <p className="text-base-content/50 mt-0 break-words">
            {task.description}
          </p>
        </div>
        {/* <span className="text-info outline outline-1">{task.order}</span> */}
      </div>
    </li>
  )
}

export default Task
