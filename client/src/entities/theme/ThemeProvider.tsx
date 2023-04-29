import { createContext, ReactNode, useContext } from "react"
import useTheme from "./useTheme"
import { Loader } from "../../shared"

interface IThemeProps {
  theme: string
  setTheme: (theme: string) => void
  themeIsDark: boolean
  light: string
  dark: string
  themes: string[]
  ready: boolean
}

const ThemeContext = createContext<IThemeProps>({
  theme: "dark",
  setTheme: () => {},
  themeIsDark: true,
  light: "light",
  dark: "dark",
  themes: ["light", "dark"],
  ready: false,
})

export const useThemeContext = () => useContext(ThemeContext)

const ThemeProvider = ({ children }: { children: ReactNode }) => {
  const props = useTheme()

  if (!props.ready) return <Loader />

  return (
    <ThemeContext.Provider value={{ ...props }}>
      {children}
    </ThemeContext.Provider>
  )
}

export default ThemeProvider
