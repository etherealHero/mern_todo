import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { useTaskApi } from "./api"

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

  useQuery<ITask[]>({
    queryKey: ["tasks"],
    queryFn: getTasks,
  })

  const queryClient = useQueryClient()
  const tasks = queryClient.getQueryData<ITask[]>(["tasks"])

  const { mutate: create } = useMutation({
    mutationFn: postTask,
    onMutate: async (vars) => {
      await queryClient.cancelQueries(["tasks"])

      const optimisticTask: ITask = {
        _id: "_",
        title: vars.title,
        owner: "_",
        category: {
          _id: vars.category,
          color: "accent",
        },
        order: vars.order,
        checked: false,
        description: vars.description,
      }

      const prevTasks = queryClient.getQueryData<ITask[]>(["tasks"])

      queryClient.setQueryData<ITask[]>(["tasks"], (oldTasks) => [
        optimisticTask,
        ...(oldTasks || []),
      ])

      return { prevTasks }
    },
    onError: (_, __, ctx) => {
      queryClient.setQueryData(["tasks"], ctx?.prevTasks)
    },
    onSettled: () => {
      queryClient.invalidateQueries(["tasks"])
    },
    retry: 3,
  })

  const { mutate: update } = useMutation({
    mutationFn: patchTast,
    onMutate: async (vars) => {
      await queryClient.cancelQueries(["tasks"])

      const prevTasks = queryClient.getQueryData<ITask[]>(["tasks"])

      const updatedTask = prevTasks?.find((t) => t._id === vars._id)

      const optimisticTask: ITask = {
        ...(updatedTask as ITask),
        _id: vars._id,
        title: vars.title,
        description: vars.description,
        category: {
          _id: vars.category,
          color: "accent",
        },
        order: vars.order,
        checked: vars.checked,
      }

      queryClient.setQueryData<ITask[]>(
        ["tasks"],
        (oldTasks) =>
          oldTasks?.map((t) => (t._id === vars._id ? optimisticTask : t)) || []
      )

      return { prevTasks }
    },
    onError: (_, __, ctx) => {
      queryClient.setQueryData(["tasks"], ctx?.prevTasks)
    },
    retry: 3,
  })

  const { mutate: swap } = useMutation({
    mutationFn: swapTask,
    onMutate: async (vars) => {
      await queryClient.cancelQueries(["tasks"])

      const prevTasks = queryClient.getQueryData<ITask[]>(["tasks"])

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
        ["tasks"],
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
      queryClient.setQueryData(["tasks"], ctx?.prevTasks)
    },
    retry: 3,
  })

  const { mutate: remove } = useMutation({
    mutationFn: removeTask,
    onMutate: async (id) => {
      await queryClient.cancelQueries(["tasks"])

      const prevTasks = queryClient.getQueryData<ITask[]>(["tasks"])

      queryClient.setQueryData<ITask[]>(
        ["tasks"],
        (oldTasks) => oldTasks?.filter((t) => t._id !== id) || []
      )

      return { prevTasks }
    },
    onError: (_, __, ctx) => {
      queryClient.setQueryData(["tasks"], ctx?.prevTasks)
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
  }
}
