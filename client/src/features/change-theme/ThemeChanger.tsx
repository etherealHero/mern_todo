import { ChangeEventHandler } from "react"
import { useThemeContext } from "../../entities"

const ThemeChanger = () => {
  const { setTheme, themes, theme } = useThemeContext()

  const changeHandler: ChangeEventHandler<HTMLSelectElement> = (e) => {
    const theme = e.target.options[e.target.selectedIndex].value

    setTheme(theme)
  }

  return (
    <select
      className="select select-bordered"
      onChange={changeHandler}
      value={theme}
    >
      {themes.map((theme) => (
        <option key={theme} value={theme}>
          {theme}
        </option>
      ))}
    </select>
  )
}

export default ThemeChanger
