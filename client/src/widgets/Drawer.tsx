import { ThemeChanger } from "../features"

const Drawer = () => {
  return (
    <ul className="menu p-4 pt-20 w-80 bg-base-100 text-base-content">
      {/* SIDEBAR */}

      {/* <li>
        <a>Главная</a>
      </li> */}

      <li>
        <ThemeChanger />
      </li>
    </ul>
  )
}

export default Drawer
