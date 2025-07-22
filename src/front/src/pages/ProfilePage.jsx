import { useEffect, useState } from 'react'
import './ProfilePage.css'
import useGlobalReducer from '../hooks/useGlobalReducer'
import { useNavigate } from 'react-router'
import { Eye, EyeClosed } from 'lucide-react'
import { changePassword } from '../servicios/login-service'

function ProfilePage(){
  const [profileData, setProfileData] = useState(null)
  const [inputPassType, setInputPassType] = useState("password")
  const [newPassValue, setNewPassValue] = useState(null)
  const [oldPassValue, setOldPassValue] = useState(null)
  const [errorOnPassword, setErrorOnPassword] = useState(false)
  const [passSuccess, setPassSuccess] = useState(false)
  const [isLoaded, setIsLoaded] = useState(false)

  const { store } = useGlobalReducer()
  const navigate = useNavigate()

  const handleInputType = () => {
    if(inputPassType === "password"){ return setInputPassType("text") }
    return setInputPassType("password")
  }

  const handleChange = (event) => {
    const { id, value } = event.target
    if(id === "profileOldPass") { return setOldPassValue(value) }
    if(id === "profileNewPass") { return setNewPassValue(value) }
  }

  const handleClick = async () => {
    console.log("hola")
    if(oldPassValue && newPassValue){
      try {
        await changePassword(oldPassValue, newPassValue)
        setErrorOnPassword(false)
        setNewPassValue("")
        setOldPassValue("")
        setPassSuccess(true)
      } catch (error) {
        console.error(`Error al cambiar la contraseña: ${error}`)
        setErrorOnPassword(true)
        setPassSuccess(false)
      }
    }else{
      console.log("Rellena todos los campos")
      setErrorOnPassword(true)
      setPassSuccess(false)
    }
  }

  useEffect(() => {
    if(!profileData && store.userData){
      setProfileData(store.userData)
      setIsLoaded(true)
    }
  }, [profileData, store.userData])

  useEffect(() => {
    if(store.userData === null){
      navigate('/dashboard')
    }
  }, [store.userData, navigate])

  return(
    <div className='flex flex-col items-center justify-center gap-3 w-full h-full rounded-2xl p-5 overflow-hidden borde-con-degradado'>
      {isLoaded && profileData
        ? (<>
            <div className='flex flex-row items-center w-3/5 justify-between gap-1'>
              <div className='flex flex-row items-center gap-3 userInfo'>
                <div className='rounded-full overflow-hidden w-40 aspect-square borde-con-degradado'>
                  <img src={profileData.image} className='w-full h-full object-cover' alt={"user profile image"} />
                </div>
                <div className='flex flex-col gap-2'>
                  <p className='text-xl font-semibold'>@{profileData.username}</p>
                  <div className='flex flex-row gap-1'>
                    <p>{profileData.name}</p>
                    <p>{profileData.lastname}</p>
                  </div>
                  <p>{profileData.email}</p>
                  <p>{profileData.city}, {profileData.country}</p>
                </div>
              </div>
              <div className='flex flex-col items-center w-60 gap-1 rounded-2xl relative'>
                <p className={`text-xs text-green-300 absolute -top-5 ${passSuccess ? "" : "hidden"}`} >Contraseña cambiada con éxito</p>
                <input type={inputPassType} className={`rounded-2xl w-full p-1 ${errorOnPassword ? "border-1 border-red-400" : "borde-con-degradado"}`} placeholder='contraseña anterior' id="profileOldPass" onChange={handleChange} value={oldPassValue}/>
                <input type={inputPassType} className={`rounded-2xl w-full p-1 ${errorOnPassword ? "border-1 border-red-400" : "borde-con-degradado"}`} placeholder='nueva contraseña' id="profileNewPass" onChange={handleChange} value={newPassValue}/>
                <button className='rounded-2xl p-1 w-full hover:bg-purple-600 cursor-pointer borde-con-degradado' onClick={handleClick}>Cambiar contraseña</button>
                <button className='cursor-pointer opacity-70 me-1 right-1 top-11 absolute' onClick={handleInputType}>{inputPassType === "password" ? <Eye/> : <EyeClosed/>}</button>
              </div>
            </div>
          </>)
        : "Cargando perfil..."}
    </div>
  )
}

export default ProfilePage