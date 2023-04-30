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

  const addTaskL = useMutation({
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
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["tasks"] })
    },
  })

  const { mutate: swap, isLoading: isSwapping } = useMutation({
    mutationFn: swapTask,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["tasks"] })
    },
  })

  const { mutate: remove } = useMutation({
    mutationFn: removeTask,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["tasks"] })
    },
  })

  const { mutate: create } = useMutation({
    mutationFn: postTask,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["tasks"] })
    },
  })

  return {
    tasks,
    task: tasks?.find((t) => t._id === id) || noop,
    update,
    remove,
    create,
    swap,
    isSwapping,
    addTaskL,
  }
}
