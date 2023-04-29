import { BrowserRouter, Route, Routes } from "react-router-dom"
import { Dashboard, Login, Registraion } from "../pages"
import { AuthProvider } from "../entities"
import ThemeProvider from "../entities/theme/ThemeProvider"

function App() {
  return (
    <AuthProvider>
      <ThemeProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/login" element={<Login />} />
            <Route path="/registration" element={<Registraion />} />
          </Routes>
        </BrowserRouter>
      </ThemeProvider>
    </AuthProvider>
  )
}

export default App
