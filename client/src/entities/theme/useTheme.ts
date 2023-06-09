import { useCallback, useEffect, useState } from "react"
import { config } from "./config"
import { statusBarColor } from "./ui"

const THEME_KEY = "color-theme"

const useTheme = () => {
  const [theme, setTheme] = useState("dark")
  const [themeIsDark, setThemeIsDark] = useState<boolean>(true)
  const [ready, setReady] = useState(false)

  useEffect(() => {
    setThemeHandle(localStorage.getItem(THEME_KEY) || "dark")
    setReady(true)
  }, [setTheme])

  const setThemeHandle = useCallback(
    (theme: string) => {
      localStorage.setItem(THEME_KEY, theme)
      document.documentElement.dataset.theme = theme

      const isDark = !!~config.themes.findIndex(
        (t) => t[0] === theme && t[1] === "dark"
      )

      document
        .querySelector('meta[name="theme-color"]')
        ?.setAttribute("content", statusBarColor[theme])

      document
        .querySelector('meta[name="msapplication-TileColor"]')
        ?.setAttribute("content", statusBarColor[theme])

      setThemeIsDark(isDark)
      setTheme(theme)
    },
    [setTheme]
  )

  return {
    theme,
    setTheme: setThemeHandle,
    themeIsDark,
    light: config.lightTheme,
    dark: config.darkTheme,
    themes: config.themes.map((t) => t[0]),
    ready,
  }
}

export default useTheme
