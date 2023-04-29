import { FC, MouseEventHandler } from "react"
import { Icon } from "../../shared"
import { useTaskQuery } from "../../entities"

const Remove: FC<{ id: string }> = ({ id }) => {
  const { remove } = useTaskQuery(id)

  const removeHandler: MouseEventHandler<HTMLAnchorElement> = () => {
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
