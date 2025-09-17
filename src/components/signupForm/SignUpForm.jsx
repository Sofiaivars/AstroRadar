import { useEffect, useState } from "react"
import { useNavigate } from "react-router"
import { signUp } from "../../servicios/login-service"
import CloudinarySignUpUploadWidget from "../cloudinary-components/CloudinarySignUpUploadWidget"
import SignUpButton from "./SignUpButton"
import { Eye, EyeClosed } from "lucide-react";

function SignUpForm(){
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [email, setEmail] = useState("")
  const [name, setName] = useState("")
  const [lastname, setLastname] = useState("")
  const [city, setCity] = useState("")
  const [country, setCountry] = useState("")
  const [userImage, setUserImage] = useState("")
  const [errorAtSignUp, setErrorAtSignUp] = useState("")
  const [inputPassType, setInputPassType] = useState("password")

  const navigate = useNavigate()

  const handleInputChange = (event) => {
    const {id, value} = event.target

    if(id === "signup-username"){ return setUsername(value)}
    if(id === "signup-password"){ return setPassword(value)}
    if(id === "signup-email"){ return setEmail(value)}
    if(id === "signup-name"){ return setName(value)}
    if(id === "signup-lastname"){ return setLastname(value)}
    if(id === "signup-city"){ return setCity(value)}
    if(id === "signup-country"){ return setCountry(value)}
  }

  const handleClick = async () => {
    try{
      if(username || password || email || name || lastname || city || country || userImage){
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if(emailRegex.test(email)){
          await signUp(username, password, name, lastname, email, city, country, userImage)
          return navigate('/')
        }else{
          console.log("Formato de email incorrecto")
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

  // Configuration
  const cloudName = import.meta.env.VITE_CLOUDINARY_CLOUDNAME;
  const uploadPreset = import.meta.env.VITE_CLOUDINARY_SIGNUP_PRESET;

  // State
  const [publicId, setPublicId] = useState('');

  // Upload Widget Configuration
  const uwConfig = {
    cloudName,
    uploadPreset,
    sources: ['local', 'camera'],
    styles:{
      palette: {
          window: "#8e4990",
          windowBorder: "#b8b8b8",
          tabIcon: "#1e2939",
          menuIcons: "#5A616A",
          textDark: "#f7f7f7",
          textLight: "#FFFFFF",
          link: "#66798f",
          action: "#FF620C",
          inactiveTabIcon: "#2c486d",
          error: "#F44235",
          inProgress: "#d970ff",
          complete: "#3cceec",
          sourceBg: "#1e2939"
      },
      fonts: {
        default: {
          active: true
        }
      }
    },
    multiple: false,
    clientAllowedFormats: ['jpg', 'jpeg', 'png', 'webp', 'heic', 'heif', 'bmp', 'tiff'],
  };

  useEffect(() => {
    console.log(userImage)
  }, [userImage])

  return(
    <div className="flex flex-col gap-3 p-3 rounded-2xl min-w-85 borde-con-degradado justify-between shadow-lg shadow-purple-300">
      <div className="flex flex-col w-full gap-1">
        <input type="text" name="username" className={`p-2 rounded-2xl ${errorAtSignUp ? "border-1 border-red-400" : ""} signup-inputs`} id="signup-username" placeholder="Nombre de usuario" value={username} onChange={handleInputChange}/>
        <div className="flex items-center w-full relative">
          <input type={inputPassType} name="pass" className={`p-2 rounded-2xl ${errorAtSignUp ? "border-1 border-red-400" : ""} w-full signup-inputs`} id="signup-password" placeholder="Contraseña" value={password} onChange={handleInputChange}/>
          <button className="absolute right-0 me-3 cursor-pointer" onClick={handlePasswordInput}>
            {inputPassType === "password" ? <Eye /> : <EyeClosed />}
          </button>
        </div>
        <input type="email" name="email" className={`p-2 rounded-2xl ${errorAtSignUp ? "border-1 border-red-400" : ""} signup-inputs`} id="signup-email" placeholder="hola@test.com" value={email} onChange={handleInputChange}/>
        <input type="text" name="name" className={`p-2 rounded-2xl ${errorAtSignUp ? "border-1 border-red-400" : ""} signup-inputs`} id="signup-name" placeholder="Nombre" value={name} onChange={handleInputChange}/>
        <input type="text" name="lastname" className={`p-2 rounded-2xl ${errorAtSignUp ? "border-1 border-red-400" : ""} signup-inputs`} id="signup-lastname" placeholder="Apellidos" value={lastname} onChange={handleInputChange}/>
        <input type="text" name="city" className={`p-2 rounded-2xl ${errorAtSignUp ? "border-1 border-red-400" : ""} signup-inputs`} id="signup-city" placeholder="Ciudad" value={city} onChange={handleInputChange}/>
        <input type="text" name="country" className={`p-2 rounded-2xl ${errorAtSignUp ? "border-1 border-red-400" : ""} signup-inputs`} id="signup-country" placeholder="País" value={country} onChange={handleInputChange}/>
        {!userImage 
          ? <CloudinarySignUpUploadWidget uwConfig={uwConfig} setPublicId={setPublicId} setUserImage={setUserImage}/> 
          : <button className="text-sm text-center text-purple-300">Imagen seleccionada!</button>}
      </div>
      <p className={`text-sm text-red-400 ${errorAtSignUp ? "" : "hidden"}`}>Rellena todos los campos e incluye un email válido</p>
      <button className="text-sm cursor-pointer hover:text-purple-500 self-end" onClick={() => navigate('/')}>Ya tengo una cuenta</button>
      {/* onClick={() => handleClick(username, password, email, name, lastname, city, country, userImage)} */}
      <SignUpButton buttonTxt={"Registrarme!"} handleClick={() => handleClick(username, password, email, name, lastname, city, country, userImage)}/>
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