import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { useTaskApi } from "./api"
import { useAuthContext } from ".."
import { useCallback, useMemo } from "react"

export interface ITask {
  _id: string
  title: string
  description?: string
  owner: string
  order: number
  checked: boolean
  category: {
    _id: string
    color: string
  }
  __v?: 0
}

const noop: ITask = {
  _id: "",
  title: "",
  owner: "",
  category: {
    _id: "",
    color: "secondary",
  },
  order: 0,
  checked: false,
  __v: 0,
  description: "",
}

export const useTaskQuery = (id?: string) => {
  const { getTasks, patchTast, removeTask, postTask, swapTask } = useTaskApi()

  const { token } = useAuthContext()
  const queryKey = ["tasks", token]

  const { isLoading } = useQuery<ITask[]>({
    queryKey,
    queryFn: getTasks,
  })

  const queryClient = useQueryClient()
  const tasks = queryClient.getQueryData<ITask[]>(queryKey)

  const { mutate: create } = useMutation({
    mutationFn: postTask,
    onMutate: async (vars) => {
      await queryClient.cancelQueries(queryKey)

      const optimisticTask: ITask = {
        _id: "_",
        title: vars.title.trim(),
        owner: "_",
        category: {
          _id: vars.category,
          color: vars.categoryColor,
        },
        order: vars.order,
        checked: false,
        description: vars.description?.trim(),
      }

      const prevTasks = queryClient.getQueryData<ITask[]>(queryKey)

      queryClient.setQueryData<ITask[]>(queryKey, (oldTasks) => [
        optimisticTask,
        ...(oldTasks || []),
      ])

      return { prevTasks }
    },
    onError: (_, __, ctx) => {
      queryClient.setQueryData(queryKey, ctx?.prevTasks)
    },
    onSettled: () => {
      queryClient.invalidateQueries(queryKey)
    },
    retry: 3,
  })

  const { mutate: update } = useMutation({
    mutationFn: patchTast,
    onMutate: async (vars) => {
      await queryClient.cancelQueries(queryKey)

      const prevTasks = queryClient.getQueryData<ITask[]>(queryKey)

      const updatedTask = prevTasks?.find((t) => t._id === vars._id)

      const optimisticTask: ITask = {
        ...(updatedTask as ITask),
        _id: vars._id,
        title: vars.title.trim(),
        description: vars.description.trim(),
        category: {
          _id: vars.category,
          color: vars.categoryColor,
        },
        order: vars.order,
        checked: vars.checked,
      }

      queryClient.setQueryData<ITask[]>(
        queryKey,
        (oldTasks) =>
          oldTasks
            ?.map((t) => (t._id === vars._id ? optimisticTask : t))
            .sort((t1, t2) => (t1.order > t2.order ? -1 : 1)) || []
      )

      return { prevTasks }
    },
    onError: (_, __, ctx) => {
      queryClient.setQueryData(queryKey, ctx?.prevTasks)
    },
    retry: 3,
  })

  const { mutate: swap } = useMutation({
    mutationFn: swapTask,
    onMutate: async (vars) => {
      await queryClient.cancelQueries(queryKey)

      const prevTasks = queryClient.getQueryData<ITask[]>(queryKey)

      const updatedTask = prevTasks?.find((t) => t._id === vars._id)
      const updatedTask2 = prevTasks?.find((t) => t._id === vars._id2)

      const optimisticTask: ITask = {
        ...(updatedTask as ITask),
        order: (updatedTask2 as ITask).order,
      }

      const optimisticTask2: ITask = {
        ...(updatedTask2 as ITask),
        order: (updatedTask as ITask).order,
      }

      queryClient.setQueryData<ITask[]>(
        queryKey,
        (oldTasks) =>
          oldTasks?.map((t) => {
            if (t._id === vars._id) return optimisticTask2
            if (t._id === vars._id2) return optimisticTask
            return t
          }) || []
      )

      return { prevTasks }
    },
    onError: (_, __, ctx) => {
      queryClient.setQueryData(queryKey, ctx?.prevTasks)
    },
    retry: 3,
  })

  const { mutate: remove } = useMutation({
    mutationFn: removeTask,
    onMutate: async (id) => {
      await queryClient.cancelQueries(queryKey)

      const prevTasks = queryClient.getQueryData<ITask[]>(queryKey)

      queryClient.setQueryData<ITask[]>(
        queryKey,
        (oldTasks) => oldTasks?.filter((t) => t._id !== id) || []
      )

      return { prevTasks }
    },
    onError: (_, __, ctx) => {
      queryClient.setQueryData(queryKey, ctx?.prevTasks)
    },
    retry: 3,
  })

  return {
    tasks,
    task: tasks?.find((t) => t._id === id) || noop,
    update,
    remove,
    swap,
    create,
    queryKey,
    isLoading,
  }
}
