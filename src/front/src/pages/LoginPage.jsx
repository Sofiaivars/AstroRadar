import { useEffect } from "react"
import LoginForm from "../components/login/login"
import { login } from '../servicios/login-service.js'
import { useNavigate } from "react-router"

function LoginPage(){
  const navigate = useNavigate()

  const handleClick = async (username, password) => {
    if( !username || !password) {
      return alert("Rellena todos los campos") 
    }

    try{
      const dataFromLogin = await login(username, password)
      console.log(dataFromLogin)
      navigate('/dashboard')
    }catch(error){
      console.log(`Error en el login => ${error}`)
    }
  }

  const deleteToken = () => {
    localStorage.removeItem("jwt-token")
  }

  useEffect(()=>{
    const tokenData = localStorage.getItem("jwt-token")
    console.log(tokenData)
  }, [])
  
  return (
    <>
      <LoginForm 
        handleClick={handleClick}
      />
      <button className="bg-purple-900 hover:bg-purple-300 text-white rounded-3xl p-2" onClick={deleteToken}>Borrar Token</button>
    </>
  )
}

export default LoginPage