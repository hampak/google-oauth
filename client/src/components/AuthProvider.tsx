import { createContext, PropsWithChildren, useContext, useState } from "react";

import { User } from "../types/User";

const AuthContext = createContext<User | null>(null)

type AuthProviderProps = PropsWithChildren & {
  isSignedIn?: boolean
}

export default function AuthProvider({
  children,
  isSignedIn
}: AuthProviderProps) {
  const [user] = useState<User | null>(isSignedIn ? { id: 1, name: "Bob" } : null)
  // const [user] = useState<User | null>({ id: 1, name: "Bob" })

  return (
    <AuthContext.Provider value={user}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => {
  const context = useContext(AuthContext)

  if (context === undefined) {
    throw new Error("useAuth must be within an AuthProvider")
  }

  return context
}