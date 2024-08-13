import { useEffect, useState } from "react"

const Dashboard = () => {

  const [user, setUser] = useState()


  useEffect(() => {
    const fetchUser = async () => {
      const response = await fetch("/api/user/profile")
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json()
      setUser(data.username)
    }

    fetchUser()
  }, [])

  return (
    <div className="w-full h-screen flex items-center justify-center">
      <div>
        <p className="text-lg font-semibold mb-3">Hi, {user}</p>
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