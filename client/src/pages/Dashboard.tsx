import { Navigate } from "react-router-dom"
import { Categories, Drawer, Navbar, Tasks } from "../widgets"
import { useAuthContext } from "../entities"
import { LayoutProvider } from "../shared"

const Dashboard = () => {
  const { token } = useAuthContext()

  if (!token) {
    return <Navigate to="/login" />
  }

  return (
    <LayoutProvider drawer={<Drawer />}>
      <div className="max-w-2xl w-full mx-auto">
        <Navbar />
        <Categories />
        <Tasks />
      </div>
    </LayoutProvider>
  )
}

export default Dashboard
