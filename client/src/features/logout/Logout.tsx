import { MouseEventHandler } from "react"
import { useAuthContext } from "../../entities"

const Logout = () => {
  const { logout } = useAuthContext()

  const logoutHandler: MouseEventHandler<HTMLAnchorElement> = (e) => {
    e.preventDefault()
    logout()
  }

  return <a onClick={logoutHandler}>Logout</a>
}

export default Logout
