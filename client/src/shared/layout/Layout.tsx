import { FC, ReactNode, useState } from "react"
import { Modal, ModalContext } from "./ModalContext"

interface ILayout {
  children: ReactNode
  drawer: ReactNode
  navbar: ReactNode
}

const Layout: FC<ILayout> = ({ children, drawer, navbar }) => {
  const [modalChild, setModalChild] = useState<ReactNode>()

  return (
    <ModalContext.Provider value={{ modalChild, setModalChild }}>
      <div className="drawer">
        <input id="my-drawer" type="checkbox" className="drawer-toggle" />
        <div className="drawer-content max-w-2xl w-full mx-auto px-3">
          {/* PAGES & CONTENT */}
          {navbar}
          {children}
        </div>
        <div className="drawer-side">
          <label htmlFor="my-drawer" className="drawer-overlay"></label>
          {drawer}
        </div>
      </div>
      <Modal modalChild={modalChild} />
    </ModalContext.Provider>
  )
}

export default Layout
