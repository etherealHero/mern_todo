import { FC, MouseEventHandler } from "react"
import { Icon, useCategoryContext } from "../../shared"
import { ITask, useCategoryQuery, useTaskQuery } from "../../entities"
import { useQueryClient } from "@tanstack/react-query"

const Remove: FC<{ id: string }> = ({ id }) => {
  const { remove } = useCategoryQuery(id)
  const { remove: removeTask, queryKey } = useTaskQuery()
  const queryClient = useQueryClient()
  const { pinCategory, setPinCategory } = useCategoryContext()

  const removeHandler: MouseEventHandler<HTMLAnchorElement> = () => {
    queryClient.setQueryData<ITask[]>(queryKey, (tasks) =>
      (tasks || []).filter((t) => {
        if (t.category._id === id) {
          removeTask(t._id)
          return false
        }
        return true
      })
    )

    if (pinCategory === id) setPinCategory(null)

    remove(id)
  }

  return (
    <li>
      <a
        className="btn-error btn-outline font-bold px-2"
        onClick={removeHandler}
      >
        <Icon type="remove" />
        Удалить
      </a>
    </li>
  )
}

export default Remove
