import SignUpForm from "../components/signupForm/SignUpForm"
import { useNavigate } from "react-router"
import { signUp } from "../servicios/login-service.js"

function SignUpPage(){
  const navigate = useNavigate()

  const handleClick = async (username, password, email, name, lastname, city, country) => {
    try{
      if(username || password || email || name || lastname || city || country){
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if(emailRegex.test(email)){
          await signUp(username, password, email, name, lastname, city, country)
          return navigate('/')
        }else{
          alert("Formato de email incorrecto")
        }
      }else{
        alert("Rellena todos los campos!")
      }
    }catch(error){
      console.log(`Error de registro: ${error}`)
    }
    
  }

  return(
    <SignUpForm handleClick={handleClick}/>
  )
}

export default SignUpPage