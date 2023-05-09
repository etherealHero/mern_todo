import { useCategoryQuery, useTaskQuery } from "../entities"

export const useModel = () => {
  const taskModel = useTaskQuery()
  const categoryModel = useCategoryQuery()

  return { task: taskModel, category: categoryModel }
}
