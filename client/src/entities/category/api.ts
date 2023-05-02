import type { ICategory } from "./model"
import { API_URL } from "../../shared"
import { useAuth } from "../auth/useAuth"

export const useCategoryApi = () => {
  const { token } = useAuth()

  const getCategories = () => {
    return fetch(`${API_URL}/category`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then((data) => data)
  }

  interface newCategry {
    title: string
    color: string
    order: number
  }

  const postCategory = (newCategry: newCategry): Promise<ICategory> => {
    return fetch(`${API_URL}/category/create`, {
      method: "POST",
      body: JSON.stringify(newCategry),
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    }).then((res) => res.json())
  }

  const removeCategory = (id: string) => {
    return fetch(`${API_URL}/category/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then((data) => data)
  }

  interface patchedCategory {
    _id: string
    title: string
    color: string
    order: number
  }

  const patchCategory = (category: patchedCategory) => {
    return fetch(`${API_URL}/category`, {
      method: "PUT",
      body: JSON.stringify(category),
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    })
  }

  const swapCategory = (opt: { _id: string; _id2: string }) => {
    return fetch(`${API_URL}/category/swap`, {
      method: "PUT",
      body: JSON.stringify(opt),
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    })
  }

  return {
    getCategories,
    postCategory,
    removeCategory,
    patchCategory,
    swapCategory,
  }
}
