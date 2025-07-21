import { useEffect, useState } from "react"
import LoginButton from "./LoginButton"
import { useNavigate } from "react-router"
import { login } from "../../servicios/login-service"
import { Eye, EyeClosed } from "lucide-react";

function LoginForm(){
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [errorAtLogin, setErrorAtLogin] = useState(false)
  const [inputPassType, setInputPassType] = useState("password")
  const navigate = useNavigate()

  const handleInputChange = (event) => {
    const { id, value } = event.target

    if(id === "login-username") { return setUsername(value) }
    if(id === "login-password") { return setPassword(value) }
  }

  const handleClick = async (username, password) => {
    if( !username || !password) {
      setErrorAtLogin(true)
      return
    }
  
    try{
      const dataFromLogin = await login(username, password)
      console.log(dataFromLogin)
      navigate('/dashboard')
    }catch(error){
      setErrorAtLogin(true)
      console.log(`Error en el login => ${error}`)
    }
  }

  const handlePasswordInput = () => {
    if(inputPassType === "password"){ return setInputPassType("text") }
    return setInputPassType("password")
  }

  return (
    <>
      <div className="flex flex-col p-3 rounded-2xl borde-con-degradado justify-between shadow-lg shadow-purple-300 login-card">
        <h1 className="text-center text-xl mb-5 subtitle">¡Nos alegra volverte a ver!</h1>
        <div className="flex flex-col gap-3">
          <input type="text" className={`p-2 rounded-2xl ${errorAtLogin ? "border-1 border-red-400" : ""} login-inputs`} id="login-username" placeholder="Nombre de usuario" value={username} onChange={handleInputChange} />
          <div className="flex w-full items-center relative">
            <input type={inputPassType} className={`p-2 rounded-2xl ${errorAtLogin ? "border-1 border-red-400" : ""} w-full login-inputs`} id="login-password" placeholder="Password" value={password} onChange={handleInputChange}/>
            <button className="absolute right-0 me-3 cursor-pointer" onClick={handlePasswordInput}>
              {inputPassType === "password" ? <Eye /> : <EyeClosed />}
            </button>
          </div>
          <div className='flex gap-1 options'>
            <input type="checkbox" id="recordar-pass"/>
            <label className="" for="recordar-pass">Recordar</label>
          </div>
          <p className={`text-xs text-center text-red-400 ${errorAtLogin ? "" : "hidden"}`}>nombre de usuario y/o contraseña incorrectos</p>
          <LoginButton handleClick={() => handleClick(username, password)}/>
          <div className="flex justify-between">
            <a href="#" className='hover:text-purple-500 text-sm forgot'>Olvidaste la contraseña?</a>
            <button className="hover:text-purple-500 text-sm cursor-pointer" onClick={() => navigate('/signup')}>No tengo cuenta</button>
          </div>
        </div>
          
        <div className="flex flex-col justify-center items-center gap-3">
          <div className='divider'>
            <span>Or</span>
          </div>
          <div className='flex gap-3 social-login'>
            <button className="hover:scale-120 transition-transform duration-300 cursor-pointer social google">
              <img src="https://w7.pngwing.com/pngs/989/129/png-transparent-google-logo-google-search-meng-meng-company-text-logo.png" alt="Google" style={{ borderRadius: "50%" }} className="w-15 h-15" />
            </button>
            <button className="hover:scale-120 transition-transform duration-300 cursor-pointer social facebook">
              <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/05/Facebook_Logo_%282019%29.png/1024px-Facebook_Logo_%282019%29.png" alt="Facebook" style={{ borderRadius: "50%" }} className="w-15 h-15" />
            </button>
            <button className="hover:scale-120 transition-transform duration-300 cursor-pointer social github">
              <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcThdZlszhihSfJBfoXkpJtOvDk9p_sskS4rSQ&s" alt="Github" style={{ borderRadius: "50%" }} className="w-15 h-15" />
            </button>
          </div>
        
          <p style={{ textAlign: 'center' }}>No tienes una cuenta? <a href='#'></a></p>
        
          <div className='flex gap-3 text-sm footer-links'>
            <a href="#" className="hover:text-purple-500">Terms & Conditions</a>
            <a href="#" className="hover:text-purple-500">Support</a>
            <a href="#" className="hover:text-purple-500">Customer Care</a>
          </div>
        </div>
        
  
      </div>
    </>
  )
}

export default LoginForm