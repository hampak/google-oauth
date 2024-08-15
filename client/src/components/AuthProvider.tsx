import { createContext, PropsWithChildren, useContext, useEffect, useState } from "react";

import { User } from "../types/User"

const AuthContext = createContext<{ user: User | null; loading: boolean } | undefined>(undefined)

type AuthProviderProps = PropsWithChildren & {
  isSignedIn?: boolean
}

export default function AuthProvider({
  children,
}: AuthProviderProps) {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const response = await fetch("https://server-production-04d8.up.railway.app/api/auth/check-auth", {
          credentials: "include"
        })

        // console.log(await response.json())

        if (response.ok) {
          const data = await response.json()
          // console.log(data)
          setUser(data)
        } else {
          setUser(null)
        }
      } catch (error) {
        console.error("Error checking authentication status - try logging in or refresh the page", error)
      } finally {
        setLoading(false)
      }
    }

    checkAuth()
  }, [])

  return (
    <AuthContext.Provider value={{ user, loading }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => {
  const context = useContext(AuthContext)

  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }

  return context
}