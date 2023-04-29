import { AddTask } from "../features"
import { useModalContext } from "../shared"

const Tasks = () => {
  const { setModalChild } = useModalContext()

  const modalHandler = () => setModalChild(<AddTask />)

  return (
    <>
      <div className="mx-4 mt-0 flex items-end gap-x-3">
        <h2>Tasks</h2>
        <label
          htmlFor="my-modal"
          className="btn btn-sm btn-primary"
          onClick={modalHandler}
        >
          + Add
        </label>
      </div>
    </>
  )
}

export default Tasks
