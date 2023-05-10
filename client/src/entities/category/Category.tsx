import { FC, MouseEventHandler, ReactNode } from "react"
import { Icon, useCategoryContext } from "../../shared"
import { useModelsContext } from "../../shared/layout/Layout"
import { progressVariants } from "./lib"

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
          {tasksByCategory.filter((t) => t.checked).length ? (
            <span>
              {tasksByCategory.filter((t) => t.checked).length}
              <span className="text-base-content/50">
                /{tasksByCategory.length} tasks
              </span>
            </span>
          ) : (
            tasksByCategory.length + " tasks"
          )}

          <h1 className="card-title ">
            <span className="whitespace-nowrap max-w-[160px] overflow-hidden">
              {currentCategory.title}
            </span>{" "}
            {pinCategory === currentCategory._id && <Icon type="pin" />}
          </h1>
          <div className="bg-base-content/10 w-full h-2 rounded-full">
            <div
              className={`h-2 absolute bottom-4 rounded-l-full
              after:content[''] after:absolute after:right-0 after:-top-1 after:rounded-full 
              after:w-[3px] after:h-4 after:translate-x-3/4
              ${progressVariants[currentCategory.color]}
              `}
              style={{
                width: `${
                  (190 / tasksByCategory.length) *
                  tasksByCategory.filter((t) => t.checked).length
                }px`,
              }}
            />
          </div>
        </div>
      </li>
    </>
  )
}

export default Category
