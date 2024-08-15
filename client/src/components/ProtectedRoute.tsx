import { PropsWithChildren, useEffect } from "react";
import { useNavigate } from "react-router-dom"

import { useAuth } from "./AuthProvider";

type ProtectedRouteProps = PropsWithChildren

export default function ProtectedRoute({
  children
}: ProtectedRouteProps) {
  const { user, loading } = useAuth()
  const navigate = useNavigate();

  useEffect(() => {

    if (!loading) {
      if (user === null) {
        navigate("/", { replace: true })
      }

      if (user) {
        navigate("/dashboard", { replace: true })
      }
    }
  }, [navigate, user, loading])

  if (loading) return null

  return children
}