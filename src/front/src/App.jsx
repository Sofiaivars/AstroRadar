import './App.css'
import { Outlet } from 'react-router'
import Logotipo from "./components/dashboard/logotipo/Logotipo.jsx";
import AstroRadarFooter from './components/AstroRadarFooter.jsx';

function App() {

  return (
    <>
      <Logotipo />
      <div className='min-h-dvh flex flex-col justify-center items-center gap-1'> 
        <Outlet /> 
        <AstroRadarFooter />
      </div>
    </>
  )
}

export default App
