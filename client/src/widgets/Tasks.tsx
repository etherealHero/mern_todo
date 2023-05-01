import { useEffect, useRef } from "react"
import { AddTask, TaskController, TaskToggle } from "../features"
import { Task, useTaskQuery, useCategoryQuery } from "../entities"
import { useModalContext, useWindowSize } from "../shared"

const Tasks = () => {
  const ref = useRef<HTMLUListElement>(null)
  const [_, windowHeight] = useWindowSize()
  const { categories } = useCategoryQuery()

  useEffect(() => {
    if (!ref.current) return
    const coords = ref.current.getBoundingClientRect()
    ref.current.style.height = windowHeight - 16 - coords.top + "px"
  }, [ref, windowHeight, categories])

  const { setModalChild } = useModalContext()
  const modalHandler = () => setModalChild(<AddTask />)

  const { tasks } = useTaskQuery()

  return (
    <>
      <div className="mt-0 flex items-end gap-x-3 mb-4">
        <h2>Tasks</h2>
        <label
          htmlFor="my-modal"
          className="btn btn-sm btn-primary"
          onClick={modalHandler}
        >
          + Add
        </label>
      </div>
      <ul ref={ref} className="overflow-scroll ">
        {tasks?.map(({ _id }) => (
          <Task id={_id} key={_id}>
            <TaskController id={_id} />
            <TaskToggle id={_id} />
          </Task>
        ))}
      </ul>
    </>
  )
}

export default Tasks
