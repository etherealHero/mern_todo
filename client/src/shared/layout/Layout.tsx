import {
  Dispatch,
  FC,
  ReactNode,
  SetStateAction,
  createContext,
  useContext,
  useState,
} from "react"
import { Modal, ModalContext } from "./Modal"
import { useModel } from "../../pages/lib"
import { useAuthContext } from "../../entities"
import { Navigate } from "react-router-dom"

interface ILayout {
  children: ReactNode
  drawer: ReactNode
  navbar: ReactNode
}

interface ICategoryContext {
  pinCategory: string | null
  setPinCategory: Dispatch<SetStateAction<string | null>>
}

export const CategoryContext = createContext<ICategoryContext>({
  pinCategory: "",
  setPinCategory: () => {},
})

const ModelsContext = createContext<ReturnType<typeof useModel>>(
  {} as ReturnType<typeof useModel>
)

export const useModelsContext = () => useContext(ModelsContext)

export const useCategoryContext = () => useContext(CategoryContext)

const Layout: FC<ILayout> = ({ children, drawer, navbar }) => {
  const [modalChild, setModalChild] = useState<ReactNode | null>(null)
  const [pinCategory, setPinCategory] = useState<string | null>(null)

  const { token } = useAuthContext()

  if (!token) {
    return <Navigate to="/login" />
  }

  const model = useModel()

  return (
    <ModelsContext.Provider value={model}>
      <ModalContext.Provider value={{ modalChild, setModalChild }}>
        <CategoryContext.Provider value={{ pinCategory, setPinCategory }}>
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
        </CategoryContext.Provider>
      </ModalContext.Provider>
    </ModelsContext.Provider>
  )
}

export default Layout
