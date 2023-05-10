import { useAuthContext } from "../entities"
import { Logout, ThemeToggle } from "../features"

const Navbar = () => {
  const { token } = useAuthContext()

  return (
    // <div className="navbar bg-base-300 text-base-content">
    <div className="navbar p-0">
      <div className="flex-1">
        <label htmlFor="my-drawer" className="btn btn-square btn-ghost">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            className="inline-block w-8 h-8 stroke-current"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M4 6h16M4 12h16M4 18h16"
            ></path>
          </svg>
        </label>
      </div>
      <div className="flex-none">
        <ThemeToggle />
        {token && (
          <div className="dropdown dropdown-end">
            <label
              tabIndex={0}
              className="btn btn-ghost btn-circle avatar placeholder"
            >
              <div className="bg-neutral-focus text-neutral-content rounded-full w-12">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="26"
                  height="26"
                  fill="currentColor"
                  viewBox="0 0 16 16"
                >
                  <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6Zm2-3a2 2 0 1 1-4 0 2 2 0 0 1 4 0Zm4 8c0 1-1 1-1 1H3s-1 0-1-1 1-4 6-4 6 3 6 4Zm-1-.004c-.001-.246-.154-.986-.832-1.664C11.516 10.68 10.289 10 8 10c-2.29 0-3.516.68-4.168 1.332-.678.678-.83 1.418-.832 1.664h10Z" />
                </svg>
              </div>
            </label>
            <ul
              tabIndex={0}
              className="menu menu-compact  dropdown-content mt-3 p-2 shadow bg-base-100 text-base-content rounded-box w-48"
            >
              {/* <li>
                <a className="justify-between" onClick={() => navigate("/")}>
                  Dashboard
                  <span className="badge">New</span>
                </a>
              </li> */}
              <li>
                <Logout />
              </li>
            </ul>
          </div>
        )}
      </div>
    </div>
  )
}

export default Navbar
