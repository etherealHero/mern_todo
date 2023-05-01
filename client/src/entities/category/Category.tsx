import { FC, ReactNode } from "react"
import { useCategoryQuery } from "./model"
import { useTaskQuery } from ".."
import { progressVariants } from "./lib"

interface ITaskProps {
  id: string
  children?: ReactNode
}

const Category: FC<ITaskProps> = ({ id, children }) => {
  const { category } = useCategoryQuery(id)
  const { tasks } = useTaskQuery()
  const tasksByCategory =
    tasks?.filter((t) => t.category._id === category._id) || []

  return (
    <>
      <li className="card card-compact shrink-0 w-56 bg-base-300/50">
        {children}
        {/* <CardController position="right-start" direction="row" /> */}
        <div className="card-body">
          {tasksByCategory.length} tasks
          <h1 className="card-title">{category.title}</h1>
          <progress
            className={`progress w-full bg-gray-600/30 ${
              progressVariants[category.color]
            }`}
            value={tasksByCategory.filter((t) => t.checked).length}
            max={tasksByCategory.length}
          ></progress>
        </div>
      </li>
    </>
  )
}

export default Category
