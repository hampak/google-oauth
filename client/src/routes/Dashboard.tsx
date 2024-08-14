import { useAuth } from "../components/AuthProvider"


const Dashboard = () => {

  // const navigate = useNavigate()

  // useEffect(() => {
  //   const verifyAuth = async () => {
  //     const isAuthenticated = await checkAuthStatus();
  //     if (!isAuthenticated) {
  //       navigate("/")
  //     }
  //   }

  //   verifyAuth()
  // }, [navigate])

  const { isLoading, user } = useAuth()

  if (isLoading) {
    return <div>Loading...</div>
  }

  if (!user) {
    return <div>You need to be logged in!</div>
  }

  // const { data, isPending } = useQuery<User>({
  //   queryKey: ["user"],
  //   queryFn: async () => {
  //     const response = await fetch("/api/user/profile", {
  //       method: "GET",
  //       credentials: "include"
  //     })

  //     if (!response.ok) {
  //       throw new Error("Network response was not ok")
  //     }

  //     const data = await response.json()
  //     console.log(data)
  //     return data
  //   }
  // })

  return (
    <div className="w-full h-screen flex items-center justify-center">
      <div>
        <p>{user.id}</p>
        <p>{user.username}</p>
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