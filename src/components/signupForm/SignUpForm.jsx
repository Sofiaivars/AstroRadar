import { useState } from "react"
import { useNavigate } from "react-router"
import { userSignUp } from "@services/authService"
import SignUpButton from "@components/signupForm/SignUpButton"
import { Eye, EyeClosed } from "lucide-react";

function SignUpForm(){
  const [signUpData, setSignUpData] = useState({
    name: "",
    lastname: "",
    username: "",
    password: "",
    image: "",
    email: "",
    city: "",
    country: "",
  })
  const [errorAtSignUp, setErrorAtSignUp] = useState("")
  const [inputPassType, setInputPassType] = useState("password")

  const navigate = useNavigate()

  const handleClick = async () => {
    try{
      const hasData = Object.values(signUpData).every(value => value.trim() !== "")
      if(hasData){
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if(emailRegex.test(signUpData.email)){
          await userSignUp(signUpData)
          return navigate('/')
        }else{
          // console.log("Formato de email incorrecto")
          setErrorAtSignUp(true)
        }
      }else{
        setErrorAtSignUp(true)
      }
    }catch(error){
      console.log(`Error de registro: ${error}`)
      setErrorAtSignUp(true)
    }
  }

  const handlePasswordInput = () => {
    if(inputPassType === "password"){ return setInputPassType("text") }
    return setInputPassType("password")
  }

  return(
    <div className="flex flex-col gap-3 p-3 rounded-2xl min-w-85 borde-con-degradado justify-between shadow-lg shadow-purple-300">
      <div className="flex flex-col w-full gap-1">
        <input type="text" name="username" className={`p-2 rounded-2xl ${errorAtSignUp ? "border-1 border-red-400" : ""} signup-inputs`} placeholder="Nombre de usuario" value={signUpData.username} onChange={(e) => setSignUpData({...signUpData, username: e.target.value})}/>
        <div className="flex items-center w-full relative">
          <input type={inputPassType} name="pass" className={`p-2 rounded-2xl ${errorAtSignUp ? "border-1 border-red-400" : ""} w-full signup-inputs`} placeholder="Contraseña" value={signUpData.password} onChange={(e) => setSignUpData({...signUpData, password: e.target.value})}/>
          <button className="absolute right-0 me-3 cursor-pointer" onClick={handlePasswordInput}>
            {inputPassType === "password" ? <Eye /> : <EyeClosed />}
          </button>
        </div>
        <input type="email" name="email" className={`p-2 rounded-2xl ${errorAtSignUp ? "border-1 border-red-400" : ""} signup-inputs`} placeholder="hola@test.com" value={signUpData.email} onChange={(e) => setSignUpData({...signUpData, email: e.target.value})}/>
        <input type="text" name="image" className={`p-2 rounded-2xl ${errorAtSignUp ? "border-1 border-red-400" : ""} signup-inputs`} placeholder="URL de imagen" value={signUpData.image} onChange={(e) => setSignUpData({...signUpData, image: e.target.value})}/>
        <input type="text" name="name" className={`p-2 rounded-2xl ${errorAtSignUp ? "border-1 border-red-400" : ""} signup-inputs`} placeholder="Nombre" value={signUpData.name} onChange={(e) => setSignUpData({...signUpData, name: e.target.value})}/>
        <input type="text" name="lastname" className={`p-2 rounded-2xl ${errorAtSignUp ? "border-1 border-red-400" : ""} signup-inputs`} placeholder="Apellidos" value={signUpData.lastname} onChange={(e) => setSignUpData({...signUpData, lastname: e.target.value})}/>
        <input type="text" name="city" className={`p-2 rounded-2xl ${errorAtSignUp ? "border-1 border-red-400" : ""} signup-inputs`} placeholder="Ciudad" value={signUpData.city} onChange={(e) => setSignUpData({...signUpData, city: e.target.value})}/>
        <input type="text" name="country" className={`p-2 rounded-2xl ${errorAtSignUp ? "border-1 border-red-400" : ""} signup-inputs`} placeholder="País" value={signUpData.country} onChange={(e) => setSignUpData({...signUpData, country: e.target.value})}/>
      </div>
      <p className={`text-sm text-red-400 ${errorAtSignUp ? "" : "hidden"}`}>Rellena todos los campos e incluye un email válido</p>
      <button className="text-sm cursor-pointer hover:text-purple-500 self-end" onClick={() => navigate('/')}>Ya tengo una cuenta</button>
      <SignUpButton buttonTxt={"Registrarme!"} handleClick={handleClick}/>
      <hr />
      <p className="text-center text-sm">O regístrate con:</p>
      <div className='flex justify-center gap-3 w-full social-login'>
        <button className="hover:scale-120 transition-transform duration-300 cursor-pointer social google">
          <img src="https://w7.pngwing.com/pngs/989/129/png-transparent-google-logo-google-search-meng-meng-company-text-logo.png" alt="Google" style={{ borderRadius: "50%" }} className="w-10 h-10" />
        </button>
        <button className="hover:scale-120 transition-transform duration-300 cursor-pointer social facebook">
          <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/05/Facebook_Logo_%282019%29.png/1024px-Facebook_Logo_%282019%29.png" alt="Facebook" style={{ borderRadius: "50%" }} className="w-10 h-10" />
        </button>
        <button className="hover:scale-120 transition-transform duration-300 cursor-pointer social github">
          <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcThdZlszhihSfJBfoXkpJtOvDk9p_sskS4rSQ&s" alt="Github" style={{ borderRadius: "50%" }} className="w-10 h-10" />
        </button>
      </div>
    </div>
  )
}

export default SignUpForm