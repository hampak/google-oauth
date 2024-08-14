import { createContext, useContext, useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

interface User {
  id: string;
  username: string
}

interface AuthContextType {
  user: User | null;
  isLoading: boolean
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined)

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null)

  const { data, isLoading, isError } = useQuery({
    queryKey: ["auth"],
    queryFn: async () => {
      const response = await axios.get("/api/auth/check-auth")
      return response.data
    },
    retry: false
  })


  useEffect(() => {
    if (data) {
      setUser(data)
    } else if (isError) {
      setUser(null)
    }
  }, [data, isError])


  console.log(user)

  return (
    <AuthContext.Provider value={{ user, isLoading }}>
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