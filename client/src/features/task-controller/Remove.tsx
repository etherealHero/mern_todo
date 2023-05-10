import { FC, MouseEventHandler } from "react"

import { Icon } from "../../shared"
import { useModelsContext } from "../../shared/layout/Layout"

const Remove: FC<{ id: string }> = ({ id }) => {
  const models = useModelsContext()

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
