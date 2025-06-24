import { useEffect, useState } from "react"

function LoginForm({handleClick}){
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")

  const handleInputChange = (event) => {
    const { id, value } = event.target

    if(id === "login-username") { return setUsername(value) }
    if(id === "login-password") { return setPassword(value) }
  }

  useEffect(() => {
    console.log({username, password});
  }, [username, password])

  return (
    <div className="flex flex-col bg-gray-800 p-4 rounded-2xl gap-3">
      <input type="text" name="username" className="bg-gray-400 p-2 rounded-2xl" id="login-username" placeholder="Nombre de usuario" value={username} onChange={handleInputChange}/>
      <input type="password" name="pass" className="bg-gray-400 p-2 rounded-2xl" id="login-password" placeholder="Password" value={password} onChange={handleInputChange}/>
      <button className="bg-gray-400 p-2 rounded-2xl hover:bg-amber-500" onClick={() => handleClick(username, password)}>Enviar</button>
    </div>
  )
}

export default LoginForm