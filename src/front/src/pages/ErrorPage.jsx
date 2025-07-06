import './ErrorPage.css'
import hansTriangle from './assets/giferrorpage.gif'
import { TriangleAlert  } from "lucide-react";
import { useNavigate } from "react-router"

function ErrorPage() {
  const navigate = useNavigate()

  return(
    <div className='flex justify-center items-center'>
      <img src={hansTriangle} alt="" />
      <div className='flex flex-col'>
        <h1 className='text-4xl'>Error 404</h1>
        <div className='flex items-center gap-5 text-2xl'>
          <p>Te perdiste en el espacio</p>
          <TriangleAlert />
        </div>
        <button class="ui-btn rounded-2xl" onClick={() => navigate("/dashboard")}>
          <span>
            Inicio
          </span>
        </button>
      </div>
    </div>
  )
}

export default ErrorPage