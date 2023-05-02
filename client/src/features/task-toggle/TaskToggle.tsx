import { ChangeEventHandler, FC } from "react"
import { useTaskQuery } from "../../entities"

import { checkboxVariants } from "./lib"

const TaskToggle: FC<{ id: string }> = ({ id }) => {
  const { task, update } = useTaskQuery(id)

  const changeHandler: ChangeEventHandler<HTMLInputElement> = () => {
    update({
      _id: task._id,
      title: task.title,
      description: task.description || "",
      category: task.category._id,
      categoryColor: task.category.color,
      order: task.order,
      checked: !task.checked,
    })
  }

  return (
    <input
      type="checkbox"
      className={`checkbox rounded-full ${
        checkboxVariants[task.category.color]
      }`}
      checked={task.checked}
      onChange={changeHandler}
    />
  )
}

export default TaskToggle
