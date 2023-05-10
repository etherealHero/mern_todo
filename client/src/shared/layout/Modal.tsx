import {
  ChangeEventHandler,
  Dispatch,
  ReactNode,
  SetStateAction,
  createContext,
  useContext,
} from "react"

interface IModalContext {
  modalChild: ReactNode | null
  setModalChild: Dispatch<SetStateAction<ReactNode>>
}

export const ModalContext = createContext<IModalContext>({
  modalChild: <></>,
  setModalChild: () => {},
})

export const useModalContext = () => useContext(ModalContext)

export const Modal = ({ modalChild }: { modalChild: ReactNode }) => {
  const { setModalChild } = useModalContext()

  const changeHandler: ChangeEventHandler<HTMLInputElement> = (e) => {
    if (!e.target.checked) setModalChild(null)
  }

  return (
    <>
      <input
        type="checkbox"
        id="my-modal"
        className="modal-toggle"
        onChange={changeHandler}
      />
      <div className="modal">
        <div className="modal-box">{modalChild}</div>
      </div>
    </>
  )
}
