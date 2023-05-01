import { Category, useCategoryQuery } from "../entities"
import { AddCategory } from "../features"
import { useModalContext } from "../shared"

const Categories = () => {
  const { categories } = useCategoryQuery()
  const { setModalChild } = useModalContext()

  const modalHandler = () => setModalChild(<AddCategory />)

  return (
    <>
      <div className="mt-0 flex items-end gap-x-3 mb-4">
        <h2>Categories</h2>
        <label
          htmlFor="my-modal"
          className="btn btn-sm btn-primary"
          onClick={modalHandler}
        >
          + Add
        </label>
      </div>
      <ul className="overflow-scroll flex gap-x-3 mb-3">
        {categories?.map(({ _id }) => (
          <Category id={_id} />
        ))}
      </ul>
    </>
  )
}

export default Categories
