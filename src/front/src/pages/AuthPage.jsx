import LoginForm from "../components/login/login.jsx"
import logo from '/logo-esquina.png'
import { Telescope, Sparkles } from "lucide-react"

function AuthPage(){
  
  return (
    <>
      <div className="flex gap-3">
        <div className="flex flex-col p-3">
          <div>
            <img src={logo} width={350} alt="" />
          </div>
      
          <div className="mt-10">
            <div className="flex flex-col">
              <p className="mb-3">AstroRadar es tu guía interactiva para descubrir todos los eventos astronomicos visibles desde tu ciudad:</p>
              <div className="mb-5">
                <ul>
                  <li className="flex gap-1 items-center"><Sparkles size={18}/>Elige que quieres ver</li>
                  <li className="flex gap-1 items-center"><Sparkles size={18}/>Recibe sugerencias de miradoras reales</li>
                  <li className="flex gap-1 items-center"><Sparkles size={18}/>Guarda tus fotos y misiones completadas</li>
                  <li className="flex gap-1 items-center"><Sparkles size={18}/>Suma logros y conecta con otros observadores cerca tuyo</li>
                </ul>
              </div>
      
              <div className="mt-15">
                <p className="">Todo lo que necesitas para vivir la astronomia de forma activa simple y personalizada. </p>
                <div className="flex gap-1 mt-5">
                  <Telescope/>
                  <p>Inicia sesion y empiza a mirar el cielo con otros ojos</p>
                </div>
              </div>
    
            </div>
          </div>
        </div>
      
        <LoginForm />
        
      </div>
    </>
  )
}

export default AuthPage