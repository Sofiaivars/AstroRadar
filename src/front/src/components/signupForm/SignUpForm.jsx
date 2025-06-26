import { useState } from "react"
import { useNavigate } from "react-router"

function SignUpForm({handleClick}){
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [email, setEmail] = useState("")
  const [name, setName] = useState("")
  const [lastname, setLastname] = useState("")
  const [city, setCity] = useState("")
  const [country, setCountry] = useState("")

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

  return(
    <div className="flex flex-col bg-gray-800 p-4 rounded-2xl gap-3">
      <input type="text" name="username" className="bg-gray-400 p-2 rounded-2xl" id="signup-username" placeholder="Nombre de usuario" value={username} onChange={handleInputChange}/>
      <input type="password" name="pass" className="bg-gray-400 p-2 rounded-2xl" id="signup-password" placeholder="Contraseña" value={password} onChange={handleInputChange}/>
      <input type="email" name="email" className="bg-gray-400 p-2 rounded-2xl" id="signup-email" placeholder="hola@test.com" value={email} onChange={handleInputChange}/>
      <input type="text" name="name" className="bg-gray-400 p-2 rounded-2xl" id="signup-name" placeholder="Nombre" value={name} onChange={handleInputChange}/>
      <input type="text" name="lastname" className="bg-gray-400 p-2 rounded-2xl" id="signup-lastname" placeholder="Apellidos" value={lastname} onChange={handleInputChange}/>
      <input type="text" name="city" className="bg-gray-400 p-2 rounded-2xl" id="signup-city" placeholder="Ciudad" value={city} onChange={handleInputChange}/>
      <input type="text" name="country" className="bg-gray-400 p-2 rounded-2xl" id="signup-country" placeholder="País" value={country} onChange={handleInputChange}/>
      <button 
        className="bg-gray-400 p-2 rounded-2xl hover:bg-amber-500" 
        onClick={() => handleClick(username, password, email, name, lastname, city, country)}>
          Enviar
      </button>
      <button className="bg-amber-900 hover:bg-amber-300 text-white rounded-3xl p-2" onClick={() => navigate('/')}>Ya tengo una cuenta</button>
    </div>
  )
}

export default SignUpForm