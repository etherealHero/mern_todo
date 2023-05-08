import { FC } from "react"
import { Icon } from "../../shared"
import { useCategoryQuery } from "../../entities"

const Move: FC<{ id: string; swap: any }> = ({ id, swap }) => {
  const { category: current, categories } = useCategoryQuery(id)

  const currentIdx = (categories || [])?.findIndex((c) => c._id === current._id)

  const nextSwapHandler = () => {
    const next = (categories || [])[currentIdx + 1]
    if (!next) return
    swap({ _id: current._id, _id2: next._id })
  }

  const prevSwapHandler = () => {
    const prev = (categories || [])[currentIdx - 1]
    if (!prev) return
    swap({ _id: current._id, _id2: prev._id })
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
