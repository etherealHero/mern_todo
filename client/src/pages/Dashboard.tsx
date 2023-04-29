import { Navigate } from "react-router-dom"
import { Navbar } from "../widgets"
import { ThemeChanger } from "../features"
import { useAuthContext } from "../entities"

const Dashboard = () => {
  const { token } = useAuthContext()

  if (!token) {
    return <Navigate to="/login" />
  }

  return (
    <div className="max-w-2xl w-full mx-auto">
      <Navbar />
      <div className="flex flex-col gap-y-4 max-w-xs mb-4">
        <button className="btn btn-accent">Accent</button>
        <button className="btn btn-secondary">Secondary</button>
        <button className="btn">Base</button>
      </div>
      <ThemeChanger />
      <br />
    </div>
  )
}

export default Dashboard
