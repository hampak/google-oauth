export const checkAuthStatus = async () => {
  try {
    const response = await fetch("/api/auth/check-auth", {
      credentials: "include"
    })

    if (response.ok) {
      return true
    } else {
      return false
    }
  } catch (error) {
    console.error('Error checking authentication status:', error);
    return false;
  }
}

// import { useQuery } from "@tanstack/react-query"
// import { User } from "../types/User"
// import { useNavigate } from "react-router-dom"


// export function useCheckAuthStatus() {
//   const navigate = useNavigate()
//   return useQuery<User | null>({
//     queryKey: ["user"],
//     queryFn: async () => {
//       const response = await fetch("/api/auth/check-auth", {
//         credentials: "include",
//       })

//       if (!response.ok) {
//         navigate("/")
//         throw new Error("Network response was not ok")
//       }
//       if (response === null) {
//         navigate("/")
//       }
//       const data = await response.json()
//       return data
//     },
//     refetchOnWindowFocus: false
//   })
// }