import { useQuery } from "@tanstack/react-query"
import { useEffect, useState } from "react"

const Dashboard = () => {

  // const [user, setUser] = useState()


  // useEffect(() => {
  //   const fetchUser = async () => {
  //     const response = await fetch("/api/user/profile")
  //     if (!response.ok) {
  //       throw new Error("Network response was not ok");
  //     }
  //     const data = await response.json()
  //     setUser(data.username)
  //   }

  //   fetchUser()
  // }, [])

  const { data, isPending } = useQuery({
    queryKey: ["user"],
    queryFn: async () => {
      const response = await fetch("/api/user/profile", {
        method: "GET",
        credentials: "include"
      })
      const data = await response.json()
      console.log(data)
      return data
    }
  })

  if (isPending || !data) {
    return "loading..."
  }

  return (
    <div className="w-full h-screen flex items-center justify-center">
      <div>
        {/* <p className="text-lg font-semibold mb-3">Hi, {user}</p> */}
        {/* <div>{data}</div> */}
        <button className="p-3 bg-black text-white rounded-lg hover:bg-gray-700 transition-all">
          <a href="/api/auth/logout">
            Logout
          </a>
        </button>
      </div>
    </div>
  )
}

export default Dashboard