import { BrowserRouter, Route, Routes } from "react-router-dom"
import { ReactQueryDevtools } from "@tanstack/react-query-devtools"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"

import { Dashboard, Login, Registraion } from "../pages"
import { AuthProvider, ThemeProvider } from "../entities"

const client = new QueryClient()

function App() {
  return (
    <AuthProvider>
      <ThemeProvider>
        <QueryClientProvider client={client}>
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/login" element={<Login />} />
              <Route path="/registration" element={<Registraion />} />
            </Routes>
          </BrowserRouter>
          <ReactQueryDevtools initialIsOpen={false} />
        </QueryClientProvider>
      </ThemeProvider>
    </AuthProvider>
  )
}

export default App
