import { MouseEventHandler } from "react"
import { useAuthContext } from "../../entities"
import { useModalContext } from "../../shared"
import { useNavigate } from "react-router-dom"

const Logout = () => {
  const { logout } = useAuthContext()
  const { setModalChild } = useModalContext()
  const navigate = useNavigate()

  const logoutHandler: MouseEventHandler<HTMLAnchorElement> = (e) => {
    e.preventDefault()
    setModalChild(<></>)
    logout()
    navigate("/login")
  }

  return <a onClick={logoutHandler}>Logout</a>
}

export default Logout
