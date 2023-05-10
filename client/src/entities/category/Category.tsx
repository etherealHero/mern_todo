import { FC, MouseEventHandler, ReactNode } from "react"
import { progressVariants } from "./lib"
import { Icon, useCategoryContext } from "../../shared"
import { useModelsContext } from "../../shared/layout/Layout"

interface ITaskProps {
  id: string
  children?: ReactNode
}

const Category: FC<ITaskProps> = ({ id, children }) => {
  const models = useModelsContext()
  const currentCategory = models.category.categories?.find((c) => c._id === id)
  if (!currentCategory) return <></>
  const tasksByCategory =
    models.task.tasks?.filter((t) => t.category._id === currentCategory._id) ||
    []

  const { pinCategory, setPinCategory } = useCategoryContext()

  const pinCategoryHandler: MouseEventHandler<HTMLLIElement> = (e) => {
    if ((e.target as HTMLElement).closest(".dropdown")) return null

    pinCategory === currentCategory._id
      ? setPinCategory(null)
      : setPinCategory(currentCategory._id)
  }

  return (
    <>
      <li
        className={`card card-compact shrink-0 w-56 bg-base-300/50 border border-transparent cursor-pointer ${
          pinCategory === currentCategory._id &&
          "border !border-base-content/75 shadow-md shadow-base-content/20"
        }`}
        onClick={pinCategoryHandler}
      >
        {children}
        <div className="card-body">
          {tasksByCategory.length} tasks
          <h1 className="card-title ">
            {currentCategory.title}{" "}
            {pinCategory === currentCategory._id && <Icon type="pin" />}
          </h1>
          <progress
            className={`progress w-full bg-gray-600/30 ${
              progressVariants[currentCategory.color]
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
