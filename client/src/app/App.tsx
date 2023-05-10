import { BrowserRouter, Route, Routes } from "react-router-dom"
import { ReactQueryDevtools } from "@tanstack/react-query-devtools"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"

import { Dashboard, Login, Registraion } from "../pages"
import { Drawer, Navbar } from "../widgets"
import { AuthProvider, ThemeProvider } from "../entities"
import { Layout } from "../shared"

const client = new QueryClient()

function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <QueryClientProvider client={client}>
          <BrowserRouter>
            <Routes>
              <Route
                path="/"
                element={
                  <Layout drawer={<Drawer />} navbar={<Navbar />}>
                    <Dashboard />
                  </Layout>
                }
              />
              <Route path="/login" element={<Login />} />
              <Route path="/registration" element={<Registraion />} />
            </Routes>
          </BrowserRouter>
          <ReactQueryDevtools initialIsOpen={false} />
        </QueryClientProvider>
      </AuthProvider>
    </ThemeProvider>
  )
}

export default App
