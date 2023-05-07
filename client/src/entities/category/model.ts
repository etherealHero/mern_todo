import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { useCategoryApi } from "./api"
import { useAuthContext } from ".."

export interface ICategory {
  _id: string
  title: string
  color: string
  order: number
  owner: string
}

const noop: ICategory = {
  _id: "",
  title: "",
  color: "",
  order: 0,
  owner: "",
}

export const useCategoryQuery = (id?: string) => {
  const {
    getCategories,
    patchCategory,
    removeCategory,
    postCategory,
    swapCategory,
  } = useCategoryApi()

  const { token } = useAuthContext()
  const queryKey = ["categories", token]

  const { isLoading } = useQuery<ICategory[]>({
    queryKey: queryKey,
    queryFn: getCategories,
    staleTime: Infinity,
    cacheTime: Infinity,
  })

  const queryClient = useQueryClient()
  const categories = queryClient.getQueryData<ICategory[]>(queryKey)

  const { mutate: create } = useMutation({
    mutationFn: postCategory,
    onMutate: async (vars) => {
      await queryClient.cancelQueries(queryKey)

      const optimisticCategory: ICategory = {
        _id: "_",
        title: vars.title.trim(),
        color: vars.color,
        order: vars.order,
        owner: "_",
      }

      const prevCategories = queryClient.getQueryData<ICategory[]>(queryKey)

      queryClient.setQueryData<ICategory[]>(queryKey, (oldCategories) => [
        optimisticCategory,
        ...(oldCategories || []),
      ])

      return { prevCategories }
    },
    onError: (_, __, ctx) => {
      queryClient.setQueryData(queryKey, ctx?.prevCategories)
    },
    onSettled: () => {
      queryClient.invalidateQueries(queryKey)
    },
    retry: 3,
  })

  const { mutate: update } = useMutation({
    mutationFn: patchCategory,
    onMutate: async (vars) => {
      await queryClient.cancelQueries(queryKey)

      const prevCategories = queryClient.getQueryData<ICategory[]>(queryKey)

      const updatedCategory = prevCategories?.find((c) => c._id === vars._id)

      const optimisticCategory: ICategory = {
        ...(updatedCategory as ICategory),
        _id: vars._id,
        title: vars.title.trim(),
        color: vars.color,
        order: vars.order,
      }

      queryClient.setQueryData<ICategory[]>(
        queryKey,
        (oldCategories) =>
          oldCategories?.map((c) =>
            c._id === vars._id ? optimisticCategory : c
          ) || []
      )

      return { prevCategories }
    },
    onError: (_, __, ctx) => {
      queryClient.setQueryData(queryKey, ctx?.prevCategories)
    },
    retry: 3,
  })

  const { mutate: swap } = useMutation({
    mutationFn: swapCategory,
    onMutate: async (vars) => {
      await queryClient.cancelQueries(queryKey)

      const prevCategories = queryClient.getQueryData<ICategory[]>(queryKey)

      const updatedCategory = prevCategories?.find((c) => c._id === vars._id)
      const updatedCategory2 = prevCategories?.find((c) => c._id === vars._id2)

      const optimisticCategory: ICategory = {
        ...(updatedCategory as ICategory),
        order: (updatedCategory2 as ICategory).order,
      }

      const optimisticCategory2: ICategory = {
        ...(updatedCategory2 as ICategory),
        order: (updatedCategory as ICategory).order,
      }

      queryClient.setQueryData<ICategory[]>(
        queryKey,
        (oldCategories) =>
          oldCategories?.map((c) => {
            if (c._id === vars._id) return optimisticCategory2
            if (c._id === vars._id2) return optimisticCategory
            return c
          }) || []
      )

      return { prevCategories }
    },
    onError: (_, __, ctx) => {
      queryClient.setQueryData(queryKey, ctx?.prevCategories)
    },
    retry: 3,
  })

  const { mutate: remove } = useMutation({
    mutationFn: removeCategory,
    onMutate: async (id) => {
      await queryClient.cancelQueries(queryKey)

      const prevCategories = queryClient.getQueryData<ICategory[]>(queryKey)

      queryClient.setQueryData<ICategory[]>(
        queryKey,
        (oldCategories) => oldCategories?.filter((c) => c._id !== id) || []
      )

      return { prevCategories }
    },
    onError: (_, __, ctx) => {
      queryClient.setQueryData(queryKey, ctx?.prevCategories)
    },
    retry: 3,
  })

  return {
    categories,
    category: categories?.find((c) => c._id === id) || noop,
    update,
    remove,
    swap,
    create,
    queryKey,
    isLoading,
  }
}
