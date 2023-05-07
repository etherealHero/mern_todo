import { FC, MouseEventHandler, ReactNode } from "react"
import { useCategoryQuery } from "./model"
import { useTaskQuery } from ".."
import { progressVariants } from "./lib"
import { Icon, useCategoryContext } from "../../shared"

interface ITaskProps {
  id: string
  children?: ReactNode
}

const Category: FC<ITaskProps> = ({ id, children }) => {
  const { category } = useCategoryQuery(id)
  const { tasks } = useTaskQuery()
  const tasksByCategory =
    tasks?.filter((t) => t.category._id === category._id) || []

  const { pinCategory, setPinCategory } = useCategoryContext()

  const pinCategoryHandler: MouseEventHandler<HTMLLIElement> = (e) => {
    if ((e.target as HTMLElement).closest(".dropdown")) return null

    pinCategory === category._id
      ? setPinCategory(null)
      : setPinCategory(category._id)
  }

  return (
    <>
      <li
        className={`card card-compact shrink-0 w-56 bg-base-300/50 border border-transparent cursor-pointer ${
          pinCategory === category._id &&
          "border !border-base-content/75 shadow-md shadow-base-content/20"
        }`}
        onClick={pinCategoryHandler}
      >
        {children}
        <div className="card-body">
          {tasksByCategory.length} tasks
          <h1 className="card-title ">
            {category.title}{" "}
            {pinCategory === category._id && <Icon type="pin" />}
          </h1>
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
