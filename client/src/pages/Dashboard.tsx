import { Categories, Tasks, Drawer, Navbar } from "../widgets"
import { Layout } from "../shared"

const Dashboard = () => {
  return (
    <Layout drawer={<Drawer />} navbar={<Navbar />}>
      <div className="max-w-2xl w-full mx-auto">
        <Categories />
        <Tasks />
      </div>
    </Layout>
  )
}

export default Dashboard
