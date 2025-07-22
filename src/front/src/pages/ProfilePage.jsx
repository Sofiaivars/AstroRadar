import { useEffect, useState } from 'react'
import './ProfilePage.css'
import useGlobalReducer from '../hooks/useGlobalReducer'
import { useNavigate } from 'react-router'
import { Eye, EyeClosed } from 'lucide-react'

function ProfilePage(){
  const [profileData, setProfileData] = useState(null)
  const [inputPassType, setInputPassType] = useState("password")
  const [newPassValue, setNewPassValue] = useState(null)
  const [oldPassValue, setOldPassValue] = useState(null)
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
  }

  useEffect(() => {
    if(!profileData){
      setProfileData(store.userData)
      setIsLoaded(true)
    }
  }, [])

  useEffect(() => {
    console.log(newPassValue)
    console.log(oldPassValue)
  }, [newPassValue, oldPassValue])

  return(
    <div className='flex flex-col items-center justify-center gap-3 w-full h-full rounded-2xl p-3 overflow-hidden borde-con-degradado'>
      {isLoaded
        ? (<>
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
            <div className='flex flex-row items-center gap-1 rounded-2xl p-2 relative'>
              <input type={inputPassType} className='rounded-2xl p-1 borde-con-degradado' placeholder='contraseña anterior' id="profileOldPass" onChange={handleChange}/>
              <input type={inputPassType} className='rounded-2xl p-1 borde-con-degradado' placeholder='nueva contraseña' id="profileNewPass" onChange={handleChange}/>
              <button className='rounded-2xl p-1 hover:bg-purple-600 cursor-pointer borde-con-degradado' onClick={handleClick}>Cambiar contraseña</button>
              <button className='absolute cursor-pointer right-46 opacity-50' onClick={handleInputType}>{inputPassType === "password" ? <Eye/> : <EyeClosed/>}</button>
            </div>
          </>)
        : "Cargando perfil..."}
    </div>
  )
}

export default ProfilePage