import { useEffect, useState } from "react"
import { getUserInfo } from "../../servicios/login-service"
import { useNavigate } from "react-router"

function DashboardMain(){
  const [userData, getUserData] = useState({})

  const navigate = useNavigate()

  const handleClick = () => {
    localStorage.removeItem("jwt-token")
    navigate('/')
  }

  const JWTToken = localStorage.getItem("jwt-token")

  useEffect(() => {
    const getUserDataFromDatabase = async () => {
      const data = await getUserInfo()
      return getUserData(data)
    }

    getUserDataFromDatabase()
  }, [])

  useEffect(() => {
    console.log(`user-data: ${JSON.stringify(userData)}`)
  }, [userData])
 
  return (
    <>
      <div className="flex flex-col gap-3 bg-gray-900 text-white rounded-3xl p-3">
        <h1>Nombre de usuario: {userData.username || "⚠️"}</h1>
        <h2>User id: {userData.id || "⚠️"}</h2>
        <p>TOKEN: </p>
        <p className="w-200 overflow-y-auto">{JWTToken}</p>
        <button className="bg-purple-900 hover:bg-purple-300 text-white rounded-3xl p-2" onClick={handleClick}>
          Cerrar Sesión
        </button>
      </div>
    </>
  )
}

export default DashboardMain