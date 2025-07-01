import { useEffect, useState } from "react"
import { getUserInfo } from "../../servicios/login-service"
import { useNavigate } from "react-router"
import { Helix } from 'ldrs/react'
import 'ldrs/react/Helix.css'
import EventoDestacado from "./EventoDestacado"
import Map from "./Map"

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


  



  if(Object.keys(userData).length === 0){
    return(
      <div className="flex flex-col gap-3 bg-gray-900 text-white rounded-3xl p-3">
        <Helix
          size="60"
          speed="1.3"
          color="#ffffff"
        />
        <button onClick={() => navigate('/')}>🏠</button>
      </div>
    )
  }
 
  return (
    <>
      <div className="flex flex-col gap-3 bg-gray-900 text-white rounded-3xl p-3">
        <h1>Nombre de usuario: {userData.username || "⚠️"}</h1>
        <h2>User id: {userData.id || "⚠️"}</h2>
        <h2>Nombre: {userData.name || "⚠️"}</h2>
        <h2>Apellidos: {userData.lastname || "⚠️"}</h2>
        <h2>Email: {userData.email || "⚠️"}</h2>
        <h2>Ciudad: {userData.city || "⚠️"}</h2>
        <h2>País: {userData.country || "⚠️"}</h2>
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