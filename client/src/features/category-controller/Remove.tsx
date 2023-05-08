import { FC, MouseEventHandler } from "react"
import { Icon, useCategoryContext } from "../../shared"

type Props = {
  id: string
  mutate: {
    remove: any
    removeTasks: any
  }
}

const Remove: FC<Props> = ({ id, mutate }) => {
  const { pinCategory, setPinCategory } = useCategoryContext()

  const removeHandler: MouseEventHandler<HTMLAnchorElement> = () => {
    if (pinCategory === id) setPinCategory(null)

    mutate.removeTasks(id)
    mutate.remove(id)
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
