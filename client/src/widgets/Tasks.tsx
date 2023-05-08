import { useEffect, useRef } from "react"
import { AddTask, TaskController, TaskToggle } from "../features"
import { Task, useTaskQuery, useCategoryQuery, ITask } from "../entities"
import {
  Loader,
  useCategoryContext,
  useModalContext,
  useWindowSize,
} from "../shared"

const Tasks = ({
  tasks,
  create,
}: {
  tasks: ITask[] | undefined
  create: any
}) => {
  const ref = useRef<HTMLUListElement>(null)
  const [_, windowHeight] = useWindowSize()
  const { categories } = useCategoryQuery()

  useEffect(() => {
    if (!ref.current) return
    const coords = ref.current.getBoundingClientRect()
    ref.current.style.height = windowHeight - 16 - coords.top + "px"
  }, [ref, windowHeight, categories])

  const { isLoading, swap, remove, update } = useTaskQuery()

  const { setModalChild } = useModalContext()
  const modalHandler = () => setModalChild(<AddTask create={create} />)

  const { pinCategory } = useCategoryContext()

  return (
    <>
      <div className="-mt-20 flex items-end gap-x-3 mb-4">
        <h2>Tasks</h2>
        <label
          htmlFor={`${categories?.length && "my-modal"}`}
          className={`btn btn-sm
            ${categories?.length && " btn-primary"}`}
          onClick={modalHandler}
        >
          + Add
        </label>
      </div>
      <ul ref={ref} className="overflow-scroll ">
        {isLoading ? (
          <Loader />
        ) : tasks?.filter((t) =>
            pinCategory ? t.category._id === pinCategory : t
          )?.length ? (
          tasks.map(({ _id }) => (
            <Task id={_id} key={_id}>
              <TaskController id={_id} mutate={{ swap, remove, update }} />
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
