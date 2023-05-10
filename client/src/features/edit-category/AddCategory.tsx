import { useState } from "react"
import { useModelsContext } from "../../shared/layout/Layout"

const AddCategory = ({ create }: { create: any }) => {
  const [title, setTitle] = useState<string>("")
  const [color, setColor] = useState<string>("error")
  const models = useModelsContext()

  const submitHandler = () => {
    const arr: number[] = [0]
    models.category.categories?.map((c) => arr.push(c.order))

    const maxOrder = Math.max(...arr)

    create({
      title,
      color,
      order: maxOrder + 1,
    })
    setTitle("")
    setColor("error")
  }

  return (
    <>
      <h2 className="text-center">Add category</h2>

      <div className="form-control">
        <label className="label">
          <span className="label-text">Category</span>
        </label>
        <input
          type="text"
          placeholder="Enter category name"
          className="input input-bordered w-full mb-4"
          onChange={(e) => setTitle(e.target.value)}
          value={title}
        />

        <div className="bg-neutral/10 px-2 pb-3 rounded-md">
          <label className="label">
            <span className="label-text">Pick a color</span>
          </label>

          <div className="flex gap-x-2">
            <input
              checked={color === "error"}
              onChange={() => setColor("error")}
              type="radio"
              name="radio-2"
              className="radio radio-error "
            />
            <input
              checked={color === "accent"}
              onChange={() => setColor("accent")}
              type="radio"
              name="radio-2"
              className="radio radio-accent"
            />

            <input
              checked={color === "warning"}
              onChange={() => setColor("warning")}
              type="radio"
              name="radio-2"
              className="radio radio-warning "
            />
            <input
              checked={color === "success"}
              onChange={() => setColor("success")}
              type="radio"
              name="radio-2"
              className="radio radio-success"
            />
            <input
              checked={color === "info"}
              onChange={() => setColor("info")}
              type="radio"
              name="radio-2"
              className="radio radio-info"
            />
            <input
              checked={color === "primary"}
              onChange={() => setColor("primary")}
              type="radio"
              name="radio-2"
              className="radio radio-primary"
            />
            <input
              checked={color === "secondary"}
              onChange={() => setColor("secondary")}
              type="radio"
              name="radio-2"
              className="radio radio-secondary"
            />
          </div>
        </div>
      </div>
      <div className="modal-action flex justify-end">
        <label
          htmlFor="my-modal"
          className="btn btn-sm btn-ghost mr-1 text-base-content/60 font-medium"
        >
          Cancel
        </label>
        <label
          onClick={submitHandler}
          htmlFor="my-modal"
          className="btn btn-primary btn-sm text-primary-content"
        >
          Done
        </label>
      </div>
    </>
  )
}

export default AddCategory
