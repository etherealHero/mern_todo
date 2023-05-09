import { FC, MouseEventHandler, useContext } from "react"
import { Icon, useCategoryContext } from "../../shared"
import { ModelsContext } from "../../pages/Dashboard"

type Props = {
  id: string
}

const Remove: FC<Props> = ({ id }) => {
  const { pinCategory, setPinCategory } = useCategoryContext()

  const models = useContext(ModelsContext)

  const removeHandler: MouseEventHandler<HTMLAnchorElement> = () => {
    if (pinCategory === id) setPinCategory(null)

    // mutate.removeTasks(id)
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
