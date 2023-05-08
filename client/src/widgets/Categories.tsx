import { FC } from "react"
import { Category, useCategoryQuery } from "../entities"
import { AddCategory, CategoryController } from "../features"
import { Icon, Loader, useCategoryContext, useModalContext } from "../shared"

type Props = {
  mutate: {
    updateCategoryColor: any
    removeTasksByCategory: any
  }
}

const Categories: FC<Props> = ({ mutate }) => {
  const { categories, isLoading, create, swap, update, remove } =
    useCategoryQuery()
  const { pinCategory, setPinCategory } = useCategoryContext()

  const { setModalChild } = useModalContext()
  const modalHandler = () => setModalChild(<AddCategory create={create} />)

  return (
    <>
      <div className="mt-0 flex items-end justify-between mb-4">
        <div className="flex gap-x-3 items-end">
          <h2>Categories</h2>
          <label
            htmlFor="my-modal"
            className="btn btn-sm btn-primary"
            onClick={modalHandler}
          >
            + Add
          </label>
        </div>
        {pinCategory && (
          <button
            className="btn btn-sm btn-error btn-outline border-none flex gap-x-2 normal-case"
            onClick={() => setPinCategory(null)}
          >
            Unpin
            <Icon type="pin" />
          </button>
        )}
      </div>
      {isLoading ? (
        <div className="pb-20">
          <Loader />
        </div>
      ) : (
        <ul className="overflow-scroll flex gap-x-3 mb-3 pb-20 -mx-3 px-3">
          {categories?.length ? (
            categories?.map(({ _id }) => (
              <Category id={_id} key={_id}>
                <CategoryController
                  id={_id}
                  mutate={{
                    swap,
                    update,
                    updateColor: mutate.updateCategoryColor,
                    removeTasksByCategory: mutate.removeTasksByCategory,
                    remove,
                  }}
                />
              </Category>
            ))
          ) : (
            <div className="divider w-full">Empty list</div>
          )}
        </ul>
      )}
    </>
  )
}

export default Categories
