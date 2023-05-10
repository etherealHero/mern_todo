import { FC, useEffect, useState } from "react"
import { ICategory } from "../../entities"
import { dotVariants } from "./lib"
import { useModelsContext } from "../../shared/layout/Layout"

const EditTask: FC<{ id: string }> = ({ id }) => {
  const models = useModelsContext()
  const currentTask = models.task?.tasks?.find((t) => t._id === id)
  if (!currentTask) return <></>

  const [form, setForm] = useState({ title: "", description: "" })
  const [category, setCategory] = useState<ICategory>()

  useEffect(() => {
    setForm({
      title: currentTask.title,
      description: currentTask.description || "",
    })
    setCategory(
      models.category.categories?.find(
        (c) => c._id === currentTask.category._id
      )
    )
  }, [currentTask, models.category.categories])

  const submitHandler = () => {
    models.task.update({
      _id: currentTask._id,
      ...form,
      checked: currentTask.checked,
      category: (category as ICategory)._id,
      categoryColor: (category as ICategory).color,
      order: currentTask.order,
    })
    setForm({ title: "", description: "" })
  }

  return (
    <>
      <h3 className="text-center">Edit task</h3>

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
        <div className="dropdown dropdown-top ">
          <label tabIndex={0} className="btn btn-sm normal-case">
            <div
              className={`${
                dotVariants[category?.color || "accent"]
              } w-3 h-3 rounded-full mr-2`}
            />
            {category?.title}
          </label>
          <ul
            tabIndex={0}
            className="dropdown-content menu menu-compact flex-nowrap overflow-scroll bg-base-300 h-44 p-2 shadow rounded-box w-40"
          >
            {models.category.categories?.map((c) => (
              <li key={c._id} onClick={() => setCategory(c)}>
                <a>{c.title}</a>
              </li>
            ))}
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

export default EditTask
