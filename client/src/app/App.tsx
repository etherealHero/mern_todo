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
    <AuthProvider>
      <ThemeProvider>
        <QueryClientProvider client={client}>
          <BrowserRouter>
            <Layout drawer={<Drawer />} navbar={<Navbar />}>
              <Routes>
                <Route path="/" element={<Dashboard />} />
                <Route path="/login" element={<Login />} />
                <Route path="/registration" element={<Registraion />} />
              </Routes>
            </Layout>
          </BrowserRouter>
          <ReactQueryDevtools initialIsOpen={false} />
        </QueryClientProvider>
      </ThemeProvider>
    </AuthProvider>
  )
}

export default App
