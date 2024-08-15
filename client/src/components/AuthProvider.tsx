// import { createContext, useContext, useEffect, useState } from "react";
// import { useQuery } from "@tanstack/react-query";
// import axios from "axios";

// interface User {
//   id: string;
//   username: string
// }

// interface AuthContextType {
//   user: User | null;
//   isLoading: boolean
// }

// export const AuthContext = createContext<AuthContextType | undefined>(undefined)

// export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
//   const [user, setUser] = useState<User | null>(null)

//   const { data, isLoading, isError } = useQuery({
//     queryKey: ["auth"],
//     queryFn: async () => {
//       const response = await axios.get("/api/auth/check-auth")
//       return response.data
//     },
//     retry: false
//   })


//   useEffect(() => {
//     if (data) {
//       setUser(data)
//     } else if (isError) {
//       setUser(null)
//     }
//   }, [data, isError])


//   console.log(user)

//   return (
//     <AuthContext.Provider value={{ user, isLoading }}>
//       {children}
//     </AuthContext.Provider>
//   )
// }

// export const useAuth = () => {
//   const context = useContext(AuthContext)
//   if (context === undefined) {
//     throw new Error("useAuth must be used within an AuthProvider")
//   }

//   return context
// }

import { createContext, PropsWithChildren, useContext, useEffect, useState } from "react";

import { User } from "../types/User"

const AuthContext = createContext<{ user: User | null; loading: boolean } | undefined>(undefined)

type AuthProviderProps = PropsWithChildren & {
  isSignedIn?: boolean
}

export default function AuthProvider({
  children,
  // isSignedIn,
}: AuthProviderProps) {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const response = await fetch("/api/auth/check-auth", {
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