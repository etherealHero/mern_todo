import { FC, MouseEventHandler } from "react"
import { Icon, useCategoryContext } from "../../shared"
import { useModelsContext } from "../../shared/layout/Layout"
import { useQueryClient } from "@tanstack/react-query"
import { ITask } from "../../entities"

type Props = {
  id: string
}

const Remove: FC<Props> = ({ id }) => {
  const { pinCategory, setPinCategory } = useCategoryContext()

  const models = useModelsContext()

  const queryClient = useQueryClient()

  const removeTasksByCategoryId = (id: string) => {
    queryClient.setQueryData<ITask[]>(models.task.queryKey, (tasks) =>
      (tasks || []).filter((t) => {
        if (t.category._id === id) {
          models.task.remove(t._id)
          return false
        }
        return true
      })
    )
  }

  const removeHandler: MouseEventHandler<HTMLAnchorElement> = () => {
    if (pinCategory === id) setPinCategory(null)

    removeTasksByCategoryId(id)
    models.category.remove(id)
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
