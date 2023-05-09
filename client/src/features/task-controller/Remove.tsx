import { FC, MouseEventHandler, useContext } from "react"

import { Icon } from "../../shared"
import { ModelsContext } from "../../pages/Dashboard"

const Remove: FC<{ id: string }> = ({ id }) => {
  const models = useContext(ModelsContext)

  const removeHandler: MouseEventHandler<HTMLAnchorElement> = () => {
    models.task.remove(id)
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
