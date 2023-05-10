import { Navigate } from "react-router-dom"
import { createContext } from "react"

import { Categories, Tasks, Drawer, Navbar } from "../widgets"
import { useAuthContext } from "../entities"
import { Layout } from "../shared"

import { useModel } from "./lib"

export const ModelsContext = createContext<ReturnType<typeof useModel>>(
  {} as ReturnType<typeof useModel>
)

const Dashboard = () => {
  const { token } = useAuthContext()

  if (!token) {
    return <Navigate to="/login" />
  }
  // const [_, invalidateQueryChache] = useState(false)

  // const queryClient = useQueryClient()
  // const { queryKey, remove: removeTask } = useTaskQuery()

  // const removeTasksByCategory = (id: string) => {
  //   invalidateQueryChache(true)
  //   queryClient.setQueryData<ITask[]>(queryKey, (tasks) =>
  //     (tasks || []).filter((t) => {
  //       if (t.category._id === id) {
  //         removeTask(t._id)
  //         return false
  //       }
  //       return true
  //     })
  //   )
  //   invalidateQueryChache(false)
  // }

  // const updateCategoryColor = (_id: string, color: string) => {
  //   invalidateQueryChache(true)
  //   queryClient.setQueryData<ITask[]>(queryKey, (tasks) =>
  //     (tasks || []).map((t) => {
  //       if (t.category._id === _id)
  //         return {
  //           ...t,
  //           category: {
  //             _id: _id,
  //             color,
  //           },
  //         }

  //       return t
  //     })
  //   )
  //   invalidateQueryChache(false)
  // }

  // const { tasks, create: createTask } = useTaskQuery()

  // interface newTask {
  //   title: string
  //   category: string
  //   categoryColor: string
  //   order: number
  //   description?: string
  // }

  // const create = ({ ...args }: newTask) => {
  //   invalidateQueryChache(true)
  //   createTask(args)
  //   invalidateQueryChache(false)
  // }

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
