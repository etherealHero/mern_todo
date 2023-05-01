import { Navigate } from "react-router-dom"
import { Categories, Tasks } from "../widgets"
import { useAuthContext } from "../entities"

const Dashboard = () => {
  const { token } = useAuthContext()

  if (!token) {
    return <Navigate to="/login" />
  }

  return (
    <div className="max-w-2xl w-full mx-auto">
      <Categories />
      <Tasks />
    </div>
  )
}

export default Dashboard
