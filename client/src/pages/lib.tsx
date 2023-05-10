import { useCategoryQuery, useTaskQuery } from "../entities"

export const useModel = () => {
  const categoryModel = useCategoryQuery()
  const taskModel = useTaskQuery(!!categoryModel.isLoading)

  return { task: taskModel, category: categoryModel }
}
