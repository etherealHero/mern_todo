import { Category, useCategoryQuery } from "../entities"
import { AddCategory, CategoryController } from "../features"
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
      <ul className="overflow-scroll flex gap-x-3 mb-3 pb-20">
        {categories?.length ? (
          categories.map(({ _id }) => (
            <Category id={_id} key={_id}>
              <CategoryController id={_id} />
            </Category>
          ))
        ) : (
          <div className="divider w-full">Empty list</div>
        )}
      </ul>
    </>
  )
}

export default Categories
