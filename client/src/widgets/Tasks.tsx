import { useContext, useEffect, useRef } from "react"
import { AddTask, TaskController, TaskToggle } from "../features"
import { Task } from "../entities"
import {
  Loader,
  useCategoryContext,
  useModalContext,
  useWindowSize,
} from "../shared"
import { ModelsContext } from "../pages/Dashboard"

const Tasks = () => {
  const ref = useRef<HTMLUListElement>(null)
  const [_, windowHeight] = useWindowSize()
  const models = useContext(ModelsContext)

  useEffect(() => {
    if (!ref.current) return
    const coords = ref.current.getBoundingClientRect()
    ref.current.style.height = windowHeight - 16 - coords.top + "px"
  }, [ref, windowHeight, models.category.categories])

  const { setModalChild } = useModalContext()
  const modalHandler = () => setModalChild(<AddTask />)

  const { pinCategory } = useCategoryContext()

  return (
    <>
      <div className="-mt-20 flex items-end gap-x-3 mb-4">
        <h2>Tasks</h2>
        <label
          htmlFor={`${models.category.categories?.length && "my-modal"}`}
          className={`btn btn-sm
            ${models.category.categories?.length && " btn-primary"}`}
          onClick={modalHandler}
        >
          + Add
        </label>
      </div>
      <ul ref={ref} className="overflow-scroll ">
        {models.task.isLoading ? (
          <Loader />
        ) : models.task.tasks?.filter((t) =>
            pinCategory ? t.category._id === pinCategory : t
          )?.length ? (
          models.task.tasks.map(({ _id }) => (
            <Task id={_id} key={_id}>
              <TaskController id={_id} />
              <TaskToggle id={_id} />
            </Task>
          ))
        ) : (
          <div className="divider w-full">Empty list</div>
        )}
      </ul>
    </>
  )
}

export default Tasks
