import { MouseEventHandler } from "react"
import { useAuthContext } from "../../entities"
import { useModalContext } from "../../shared"

const Logout = () => {
  const { logout } = useAuthContext()
  const { setModalChild } = useModalContext()

  const logoutHandler: MouseEventHandler<HTMLAnchorElement> = (e) => {
    e.preventDefault()
    setModalChild(<></>)
    logout()
  }

  return <a onClick={logoutHandler}>Logout</a>
}

export default Logout
