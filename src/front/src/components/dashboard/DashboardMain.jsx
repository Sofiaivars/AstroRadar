import { useEffect, useState } from "react"
import { getUserInfo } from "../../servicios/login-service"
import { useNavigate } from "react-router"
import { Helix } from 'ldrs/react'
import 'ldrs/react/Helix.css'
import EventoDestacado from "./EventoDestacado"

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

   <div className="relative p-[3px] rounded-xl bg-gradient-to-r from-[#a3cfff] to-[#e0f0ff] w-[700px] h-[300px] overflow-hidden">
  <img
    src="https://bufferwall.com/download/B20190923T000000374_1200x600.jpg"
    alt="mapa"
    className="w-full h-full object-cover rounded-[10px]"
  />

  <button className="absolute bottom-8 right-6 text-sm rounded-md whitespace-nowrap px-[2px] py-[2px] bg-gradient-to-r from-[var(--astroradar-purple)] to-[#dca2f2] min-w-[120px]">
    <span className="block px-5 py-2 bg-[var(--components-background)] text-[var(--astroradar-white)] rounded-md text-center">
      Explorar
    </span>
  </button>
</div>






    </>
  )
}

export default DashboardMain