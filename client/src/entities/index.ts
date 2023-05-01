import { AuthProvider, useAuthContext } from "./auth"
import { Category, useCategoryQuery, ICategory } from "./category"
import { Task, ITask, useTaskQuery } from "./task"
import { ThemeProvider, useThemeContext } from "./theme"

export type { ITask, ICategory }
export {
  useAuthContext,
  AuthProvider,
  ThemeProvider,
  useThemeContext,
  Task,
  useTaskQuery,
  Category,
  useCategoryQuery,
}
