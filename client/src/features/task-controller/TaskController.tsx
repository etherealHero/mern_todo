import { FC, useEffect, useState } from "react"
import { Icon, useModalContext, useOutside } from "../../shared"
import Remove from "./Remove"
import { EditTask } from ".."
import Move from "./Move"

const TaskController: FC<{ id: string }> = ({ id }) => {
  const { isShow, setIsShow, ref, toggler } = useOutside(false)
  const [isMove, setIsMove] = useState<boolean>(false)

  const { setModalChild } = useModalContext()

  const modalHandler = () => setModalChild(<EditTask id={id} />)

  useEffect(() => setIsMove(false), [isShow])

  return (
    <div
      className={`dropdown text-base-content absolute z-10 right-1
      dropdown-left top-1/2 -translate-y-1/2
        ${isShow ? "dropdown-open" : ""}`}
    >
      <label
        className="btn btn-ghost btn-sm px-1"
        onClick={() => setIsShow(!isShow)}
        ref={toggler}
      >
        <Icon type="threedots-col" />
      </label>
      {isShow && (
        <ul
          ref={ref}
          className={`dropdown-content menu menu-compact p-2 shadow
           bg-base-100 rounded-box w-48 mr-1`}
        >
          <li>
            <a className="px-2" onClick={() => setIsMove(!isMove)}>
              <Icon type="move-col" />
              Переместить
            </a>
          </li>
          {isMove && <Move id={id} />}
          <li>
            <label onClick={modalHandler} htmlFor="my-modal" className="px-2">
              <Icon type="edit" />
              Изменить
            </label>
          </li>
          <Remove id={id} />
        </ul>
      )}
    </div>
  )
}

export default TaskController
