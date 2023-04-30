import { useState } from "react"
import { useTaskQuery } from "../../entities"

const AddTask = () => {
  const [form, setForm] = useState({ title: "", description: "" })
  const { tasks, addTaskL } = useTaskQuery()

  const submitHandler = () => {
    const arr: number[] = [0]
    tasks?.map((t) => arr.push(t.order))

    const maxOrder = Math.max(...arr)

    addTaskL.mutate({
      ...form,
      category: "644cccbd5c237c725b466d86",
      order: maxOrder + 1,
    })
    setForm({ title: "", description: "" })
  }

  return (
    <>
      <h3 className="text-center">Add task</h3>

      <div className="form-control">
        <label className="label">
          <span className="label-text">Task</span>
        </label>
        <input
          type="text"
          placeholder="Enter task name"
          className="input input-bordered w-full"
          value={form.title}
          onChange={(e) => setForm({ ...form, title: e.target.value })}
        />
        <label className="label">
          <span className="label-text">Description</span>
        </label>
        <textarea
          className="textarea textarea-bordered h-24 resize-none"
          placeholder="Enter description"
          value={form.description}
          onChange={(e) => setForm({ ...form, description: e.target.value })}
        ></textarea>
      </div>

      <div className="modal-action flex justify-between">
        <div className="dropdown dropdown-right dropdown-end">
          <label tabIndex={0} className="btn btn-sm">
            <div className="bg-accent w-3 h-3 rounded-full mr-2" />
            Business
          </label>
          <ul
            tabIndex={0}
            className="dropdown-content menu menu-compact flex-nowrap overflow-scroll bg-base-300 h-44 p-2 shadow rounded-box w-40"
          >
            <li>
              <a>Item 1</a>
            </li>
            <li>
              <a>Item 2</a>
            </li>
            <li>
              <a>Item 1</a>
            </li>
            <li>
              <a>Item 2</a>
            </li>
            <li>
              <a>Item 1</a>
            </li>
            <li>
              <a>Item 2</a>
            </li>
            <li>
              <a>Item 1</a>
            </li>
            <li>
              <a>Item 2</a>
            </li>
          </ul>
        </div>
        <div>
          <label
            htmlFor="my-modal"
            className="btn btn-sm btn-ghost mr-1 text-base-content/60 font-medium"
          >
            Cancel
          </label>
          <label
            htmlFor="my-modal"
            className="btn btn-primary btn-sm text-primary-content"
            onClick={submitHandler}
          >
            Done
          </label>
        </div>
      </div>
    </>
  )
}

export default AddTask