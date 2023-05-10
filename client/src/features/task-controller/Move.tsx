import { FC, useMemo } from "react"
import { Icon, useCategoryContext } from "../../shared"
import { ITask } from "../../entities"
import { useModelsContext } from "../../shared/layout/Layout"

const Move: FC<{ id: string }> = ({ id }) => {
  const models = useModelsContext()
  const currentTask = models.task.tasks?.find((t) => t._id === id)
  if (!currentTask) return <></>

  const { pinCategory } = useCategoryContext()

  const currentIdx = (models.task.tasks || [])?.findIndex(
    (t) => t._id === currentTask._id
  )

  const scopeTasks = useMemo(
    () =>
      pinCategory &&
      models.task.tasks?.filter((t) => t.category._id === pinCategory),
    [pinCategory, models.task.tasks]
  )

  const scopeIdx = useMemo(
    () =>
      (scopeTasks as ITask[] | null)?.findIndex(
        (t) => t._id === currentTask._id
      ) || 0,
    [scopeTasks, currentTask]
  )

  const nextSwapHandler = () => {
    const next = scopeTasks
      ? scopeTasks[scopeIdx + 1]
      : (models.task.tasks || [])[currentIdx + 1]

    if (!next) return
    models.task.swap({ _id: currentTask._id, _id2: next._id })
  }

  const prevSwapHandler = () => {
    const prev = scopeTasks
      ? scopeTasks[scopeIdx - 1]
      : (models.task.tasks || [])[currentIdx - 1]

    if (!prev) return
    models.task.swap({ _id: currentTask._id, _id2: prev._id })
  }

  const topSwapHandler = () => {
    if (!models.task.tasks) return
    if (currentIdx === 0) return

    const arr: number[] = [0]
    models.task.tasks?.map((t) => arr.push(t.order))

    models.task.update({
      _id: currentTask._id,
      title: currentTask.title,
      description: currentTask.description || "",
      checked: currentTask.checked,
      category: currentTask.category._id,
      categoryColor: currentTask.category.color,
      order: Math.max(...arr) + 1,
    })
  }

  const downSwapHandler = () => {
    if (!models.task.tasks) return
    if (currentIdx === models.task.tasks.length - 1) return

    const arr: number[] = [0]
    models.task.tasks?.map((t) => arr.push(t.order))

    models.task.update({
      _id: currentTask._id,
      title: currentTask.title,
      description: currentTask.description || "",
      checked: currentTask.checked,
      category: currentTask.category._id,
      categoryColor: currentTask.category.color,
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
