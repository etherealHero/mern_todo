import { AddCategory } from "../features"
import { useModalContext } from "../shared"

const Categories = () => {
  const { setModalChild } = useModalContext()

  const modalHandler = () => setModalChild(<AddCategory />)

  return (
    <>
      <div className="mt-0 flex items-end gap-x-3">
        <h2>Categories</h2>
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

export default Categories
