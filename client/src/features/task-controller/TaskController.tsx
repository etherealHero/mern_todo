import { FC, useEffect, useState } from "react"
import { Icon, useModalContext, useOutside } from "../../shared"
import Remove from "./Remove"
import { EditTask } from ".."
import Move from "./Move"
import { UseMutateFunction } from "@tanstack/react-query"
import { ITask } from "../../entities"

type Props = {
  id: string
  mutate: {
    swap: UseMutateFunction<
      Response,
      unknown,
      {
        _id: string
        _id2: string
      },
      {
        prevTasks: ITask[] | undefined
      }
    >
    remove: UseMutateFunction<
      any,
      unknown,
      string,
      {
        prevTasks: ITask[] | undefined
      }
    >
    update: UseMutateFunction<
      Response,
      unknown,
      any,
      {
        prevTasks: ITask[] | undefined
      }
    >
  }
}

const TaskController: FC<Props> = ({ id, mutate }) => {
  const { isShow, setIsShow, ref, toggler } = useOutside(false)
  const [isMove, setIsMove] = useState<boolean>(false)

  const { setModalChild } = useModalContext()

  const modalHandler = () =>
    setModalChild(<EditTask id={id} update={mutate.update} />)

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
          {isMove && <Move id={id} swap={mutate.swap} update={mutate.update} />}
          <li>
            <label onClick={modalHandler} htmlFor="my-modal" className="px-2">
              <Icon type="edit" />
              Изменить
            </label>
          </li>
          <Remove id={id} remove={mutate.remove} />
        </ul>
      )}
    </div>
  )
}

export default TaskController
