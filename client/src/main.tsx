import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'

import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import AuthProvider from './components/AuthProvider.tsx'
import ProtectedRoute from './components/ProtectedRoute.tsx'
import Dashboard from './routes/Dashboard.tsx'
import Home from './routes/Home.tsx'

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <ProtectedRoute>
        <Home />
      </ProtectedRoute>
    )
  },
  {
    path: "/dashboard",
    element: (
      <ProtectedRoute>
        <Dashboard />
      </ProtectedRoute >
    )
  }
])

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <AuthProvider >
      <RouterProvider router={router} />
    </AuthProvider>
  </StrictMode>,
)