import { useAuth } from "../components/AuthProvider"


const Dashboard = () => {

  const { user } = useAuth()

  if (!user) return undefined

  return (
    <div className="w-full h-screen flex items-center justify-center flex-col space-y-4">
      <div className="text-center">
        <p>Your google oauth subject ID: {user?.id}</p>
        <p>Your name registered on Google: {user?.username}</p>
      </div>
      <button className="p-3 bg-black text-white rounded-lg hover:bg-gray-700 transition-all">
        <a href="/api/auth/logout">
          Logout
        </a>
      </button>
    </div>
  )
}

export default Dashboard