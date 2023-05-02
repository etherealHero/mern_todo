import { FC, useEffect, useState } from "react"
import { ICategory, useCategoryQuery, useTaskQuery } from "../../entities"
import { dotVariants } from "./lib"

const EditTask: FC<{ id: string }> = ({ id }) => {
  const { update, task } = useTaskQuery(id)
  const { categories } = useCategoryQuery()
  const [form, setForm] = useState({ title: "", description: "" })
  const [category, setCategory] = useState<ICategory>()

  useEffect(() => {
    setForm({ title: task.title, description: task.description || "" })
    setCategory(categories?.find((c) => c._id === task.category._id))
  }, [task, categories])

  const submitHandler = () => {
    update({
      _id: task._id,
      ...form,
      checked: task.checked,
      category: (category as ICategory)._id,
      categoryColor: (category as ICategory).color,
      order: task.order,
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
          <label tabIndex={0} className="btn btn-sm">
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
            {categories?.map((c) => (
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
