import { ChangeEventHandler, FC } from "react"

import { checkboxVariants } from "./lib"
import { useModelsContext } from "../../shared/layout/Layout"

const TaskToggle: FC<{ id: string }> = ({ id }) => {
  const models = useModelsContext()
  const currentTask = models.task.tasks?.find((t) => t._id === id)
  if (!currentTask) return <></>

  const changeHandler: ChangeEventHandler<HTMLInputElement> = () => {
    models.task.update({
      _id: currentTask._id,
      title: currentTask.title,
      description: currentTask.description || "",
      category: currentTask.category._id,
      categoryColor: currentTask.category.color,
      order: currentTask.order,
      checked: !currentTask.checked,
    })
  }

  return (
    <input
      type="checkbox"
      className={`checkbox rounded-full border-[1px] ${
        checkboxVariants[currentTask.category.color]
      }`}
      checked={currentTask.checked}
      onChange={changeHandler}
    />
  )
}

export default TaskToggle
