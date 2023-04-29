import { FormEventHandler, useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { useAuthContext } from "../entities"
import { API_URL } from "../shared"

const Registraion = () => {
  const [form, setForm] = useState<[string, string]>(["", ""])
  const { login } = useAuthContext()
  const navigate = useNavigate()

  const handleSubmit: FormEventHandler = async (e) => {
    e.preventDefault()

    const res = await fetch(`${API_URL}/auth/registration`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email: form[0], password: form[1] }),
    })

    const data = await res.json()

    console.log(data)

    if (res.ok) {
      const res = await fetch(`${API_URL}/auth/login`, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email: form[0], password: form[1] }),
      })

      const { token } = await res.json()

      login(token)
      navigate("/")
    }
  }

  return (
    <div className="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100 mx-auto mt-16">
      <div className="card-body">
        <h2 className="text-center">Sign up</h2>
        <form onSubmit={(e) => handleSubmit(e)}>
          <div className="form-control">
            <label className="label">
              <span className="label-text">Email</span>
            </label>
            <input
              required
              type="email"
              placeholder="example@mail.com"
              className="input input-bordered placeholder:text-base-content/50 placeholder:italic"
              value={form[0]}
              onChange={(e) => setForm([e.target.value, form[1]])}
            />
          </div>
          <div className="form-control">
            <label className="label">
              <span className="label-text">Password</span>
            </label>
            <input
              required
              type="password"
              placeholder="password"
              className="input input-bordered placeholder:text-base-content/50 placeholder:italic"
              value={form[1]}
              onChange={(e) => setForm([form[0], e.target.value])}
            />
            <label className="label">
              <Link to="/login" className="label-text-alt link link-hover">
                Already have an account?{" "}
                <span className="text-info">Login here</span>
              </Link>
            </label>
          </div>
          <div className="form-control mt-6">
            <input type="submit" className="btn btn-primary" value="Join" />
          </div>
        </form>
      </div>
    </div>
  )
}

export default Registraion
