import './App.css'
import { Outlet } from 'react-router'
import Logotipo from "./components/dashboard/logotipo/Logotipo.jsx";

function App() {

  return (
    <>
      <Logotipo />
      <div className='min-h-dvh flex flex-col justify-center items-center gap-1'> 
        <Outlet /> 
      </div>
    </>
  )
}

export default App
