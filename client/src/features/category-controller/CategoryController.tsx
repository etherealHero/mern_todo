import { FC, useEffect, useState } from "react"
import { Icon, useModalContext, useOutside } from "../../shared"
import Remove from "./Remove"
import { EditCategory } from ".."
import Move from "./Move"

type Props = {
  id: string
}

const CategoryController: FC<Props> = ({ id }) => {
  const { isShow, setIsShow, ref, toggler } = useOutside(false)
  const [isMove, setIsMove] = useState<boolean>(false)

  const { setModalChild } = useModalContext()
  const modalHandler = () => setModalChild(<EditCategory id={id} />)

  useEffect(() => setIsMove(false), [isShow])

  return (
    <div
      className={`dropdown text-base-content absolute z-10 right-1
      dropdown-left top-1.5
        ${isShow ? "dropdown-open" : ""}`}
    >
      <label
        className="btn btn-ghost btn-sm px-1"
        onClick={() => setIsShow(!isShow)}
        ref={toggler}
      >
        <Icon type="threedots-row" />
      </label>
      {isShow && (
        <ul
          ref={ref}
          className={`dropdown-content menu menu-compact p-2 shadow
           bg-base-100 rounded-box w-max mr-1`}
        >
          <li>
            <a className="px-2" onClick={() => setIsMove(!isMove)}>
              <Icon type="move-row" />
              Переместить
            </a>
          </li>
          {isMove && <Move id={id} />}
          <li className="mb-3 relative after:content['*'] after:w-full after:h-[1px] after:bg-base-content/20 after:absolute after:-bottom-[7px]">
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

export default CategoryController
