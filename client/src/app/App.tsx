import { BrowserRouter, Route, Routes } from "react-router-dom"
import { Dashboard, Login, Registraion } from "../pages"
import { Drawer, Navbar } from "../widgets"
import { AuthProvider, ThemeProvider } from "../entities"
import { Layout } from "../shared"

import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
const queryClient = new QueryClient()

function App() {
  return (
    <AuthProvider>
      <ThemeProvider>
        <QueryClientProvider client={queryClient}>
          <BrowserRouter>
            <Layout drawer={<Drawer />} navbar={<Navbar />}>
              <Routes>
                <Route path="/" element={<Dashboard />} />
                <Route path="/login" element={<Login />} />
                <Route path="/registration" element={<Registraion />} />
              </Routes>
            </Layout>
          </BrowserRouter>
        </QueryClientProvider>
      </ThemeProvider>
    </AuthProvider>
  )
}

export default App
