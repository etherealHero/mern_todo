import { useState } from "react"

const AddCategory = () => {
  const [title, setTitle] = useState<string>("")
  const [_, setColor] = useState<string>("")

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
              onClick={() => setColor("error")}
              type="radio"
              name="radio-2"
              className="radio radio-error "
            />
            <input
              onClick={() => setColor("accent")}
              type="radio"
              name="radio-2"
              className="radio radio-accent"
            />

            <input
              onClick={() => setColor("warning")}
              type="radio"
              name="radio-2"
              className="radio radio-warning "
            />
            <input
              onClick={() => setColor("success")}
              type="radio"
              name="radio-2"
              className="radio radio-success"
            />
            <input
              onClick={() => setColor("info")}
              type="radio"
              name="radio-2"
              className="radio radio-info"
            />
            <input
              onClick={() => setColor("primary")}
              type="radio"
              name="radio-2"
              className="radio radio-primary"
            />
            <input
              onClick={() => setColor("secondary")}
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
