import { FC, useMemo } from "react"
import { Icon, useCategoryContext } from "../../shared"
import { ITask, useTaskQuery } from "../../entities"

const Move: FC<{ id: string; swap: any }> = ({ id, swap }) => {
  const { task: current, tasks, swap: _, update } = useTaskQuery(id)
  const { pinCategory } = useCategoryContext()

  const currentIdx = (tasks || [])?.findIndex((t) => t._id === current._id)

  const scopeTasks = useMemo(
    () => pinCategory && tasks?.filter((t) => t.category._id === pinCategory),
    [pinCategory, tasks]
  )

  const scopeIdx = useMemo(
    () =>
      (scopeTasks as ITask[] | null)?.findIndex((t) => t._id === current._id) ||
      0,
    [scopeTasks, current]
  )

  const nextSwapHandler = () => {
    const next = scopeTasks
      ? scopeTasks[scopeIdx + 1]
      : (tasks || [])[currentIdx + 1]

    if (!next) return
    swap({ _id: current._id, _id2: next._id })
  }

  const prevSwapHandler = () => {
    const prev = scopeTasks
      ? scopeTasks[scopeIdx - 1]
      : (tasks || [])[currentIdx - 1]

    if (!prev) return
    swap({ _id: current._id, _id2: prev._id })
  }

  const topSwapHandler = () => {
    if (!tasks) return
    if (currentIdx === 0) return

    const arr: number[] = [0]
    tasks?.map((t) => arr.push(t.order))

    update({
      _id: current._id,
      title: current.title,
      description: current.description || "",
      checked: current.checked,
      category: current.category._id,
      categoryColor: current.category.color,
      order: Math.max(...arr) + 1,
    })
  }

  const downSwapHandler = () => {
    if (!tasks) return
    if (currentIdx === tasks.length - 1) return

    const arr: number[] = [0]
    tasks?.map((t) => arr.push(t.order))

    update({
      _id: current._id,
      title: current.title,
      description: current.description || "",
      checked: current.checked,
      category: current.category._id,
      categoryColor: current.category.color,
      order: Math.min(...arr) - 1,
    })
  }

  return (
    <li className="grid grid-cols-[2fr_2fr_1fr_1fr] gap-x-0.5">
      <a
        className="btn btn-sm bg-neutral/10 font-normal p-0"
        onClick={prevSwapHandler}
      >
        <Icon type="up" />
      </a>
      <a
        className="btn btn-sm bg-neutral/10 font-normal p-0"
        onClick={nextSwapHandler}
      >
        <Icon type="down" />
      </a>
      <a
        className="btn btn-sm bg-neutral/10 font-normal p-0 gap-0"
        onClick={topSwapHandler}
      >
        <div className="relative top-1">
          <Icon type="up" />
        </div>
        <div className="relative -top-1">
          <Icon type="up" />
        </div>
      </a>
      <a
        className="btn btn-sm bg-neutral/10 font-normal p-0 gap-0"
        onClick={downSwapHandler}
      >
        <div className="relative top-1">
          <Icon type="down" />
        </div>
        <div className="relative -top-1">
          <Icon type="down" />
        </div>
      </a>
    </li>
  )
}

export default Move
