import { FC, useContext } from "react"
import { Icon } from "../../shared"
import { ModelsContext } from "../../pages/Dashboard"

const Move: FC<{ id: string }> = ({ id }) => {
  const models = useContext(ModelsContext)
  if (!models) return <></>

  const current = models.category.categories?.find((c) => c._id === id)

  if (!current) return <></>

  const currentIdx = (models.category.categories || [])?.findIndex(
    (c) => c._id === current._id
  )

  const nextSwapHandler = () => {
    const next = (models.category.categories || [])[currentIdx + 1]
    if (!next) return
    models.category.swap({ _id: current._id, _id2: next._id })
  }

  const prevSwapHandler = () => {
    const prev = (models.category.categories || [])[currentIdx - 1]
    if (!prev) return
    models.category.swap({ _id: current._id, _id2: prev._id })
  }

  return (
    <li className="flex flex-row flex-nowrap gap-x-1 p-1">
      <a
        className="w-1/2 btn btn-sm bg-neutral/10 font-normal p-0"
        onClick={prevSwapHandler}
      >
        <Icon type="left" />
      </a>
      <a
        className="w-1/2 btn btn-sm bg-neutral/10 font-normal p-0"
        onClick={nextSwapHandler}
      >
        <Icon type="right" />
      </a>
    </li>
  )
}

export default Move
