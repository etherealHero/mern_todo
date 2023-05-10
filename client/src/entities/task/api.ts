import type { ITask } from "./model"
import { API_URL } from "../../shared"
import { useAuthContext } from ".."

export const useTaskApi = () => {
  const { token } = useAuthContext()

  const getTasks = () => {
    return fetch(`${API_URL}/task`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then((data) => data)
  }

  interface newTask {
    title: string
    category: string
    categoryColor: string
    order: number
    description?: string
  }

  const postTask = (newTask: newTask): Promise<ITask> => {
    return fetch(`${API_URL}/task/create`, {
      method: "POST",
      body: JSON.stringify(newTask),
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    }).then((res) => res.json())
  }

  const removeTask = (id: string) => {
    return fetch(`${API_URL}/task/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then((data) => data)
  }

  interface patchedTask {
    title: string
    description: string
    _id: string
    _id2?: string
    categoryColor: string
    category: string
    order: number
    checked: boolean
  }

  const patchTast = (task: patchedTask) => {
    return fetch(`${API_URL}/task`, {
      method: "PUT",
      body: JSON.stringify(task),
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    })
  }

  const swapTask = (opt: { _id: string; _id2: string }) => {
    return fetch(`${API_URL}/task/swap`, {
      method: "PUT",
      body: JSON.stringify(opt),
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    })
  }

  return {
    getTasks,
    postTask,
    removeTask,
    patchTast,
    swapTask,
  }
}
