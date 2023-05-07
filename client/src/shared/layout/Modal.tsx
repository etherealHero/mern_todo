import {
  Dispatch,
  ReactNode,
  SetStateAction,
  createContext,
  useContext,
} from "react"

interface IModalContext {
  modalChild: ReactNode
  setModalChild: Dispatch<SetStateAction<ReactNode>>
}

export const ModalContext = createContext<IModalContext>({
  modalChild: <></>,
  setModalChild: () => {},
})

export const useModalContext = () => useContext(ModalContext)

export const Modal = ({ modalChild }: { modalChild: ReactNode }) => {
  return (
    <>
      <input type="checkbox" id="my-modal" className="modal-toggle" />
      <div className="modal">
        <div className="modal-box">{modalChild}</div>
      </div>
    </>
  )
}
