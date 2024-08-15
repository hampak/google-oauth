import { KeyRound } from "lucide-react"

function Home() {

  return (
    <div className="w-full h-screen flex items-center justify-center">
      <div className="w-[500px] h-[200px] bg-gray-100 shadow-lg rounded-lg py-10 px-4 flex items-center justify-center flex-col space-y-4">
        <h1 className="text-lg font-bold text-center">Sign in with google</h1>
        <button className="bg-blue-500 text-white p-3 rounded-lg hover:bg-blue-600 transition-all">
          <a href="https://server-production-04d8.up.railway.app/api/auth/google" className="flex">
            <KeyRound className="mr-3" /> Sign in with google
          </a>
        </button>
      </div>
    </div>
  )
}

export default Home
