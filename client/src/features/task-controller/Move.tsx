import { FC } from "react"
import { Icon } from "../../shared"
import { useTaskQuery } from "../../entities"

const Move: FC<{ id: string }> = ({ id }) => {
  const { task: current, tasks, swap } = useTaskQuery(id)

  const currentIdx = (tasks || [])?.findIndex((t) => t._id === current._id)

  const nextSwapHandler = () => {
    const next = (tasks || [])[currentIdx + 1]
    if (!next) return
    swap({ _id: current._id, _id2: next._id })
    console.log(next)
  }

  const prevSwapHandler = () => {
    const prev = (tasks || [])[currentIdx - 1]
    if (!prev) return
    swap({ _id: current._id, _id2: prev._id })
    console.log(prev)
  }

  return (
    <li className="flex flex-row flex-nowrap gap-x-1 p-1">
      <a
        className="w-1/2 btn btn-sm bg-neutral/10 font-normal p-0"
        onClick={nextSwapHandler}
      >
        <Icon type="down" />
      </a>
      <a
        className="w-1/2 btn btn-sm bg-neutral/10 font-normal p-0"
        onClick={prevSwapHandler}
      >
        <Icon type="up" />
      </a>
    </li>
  )
}

export default Move
