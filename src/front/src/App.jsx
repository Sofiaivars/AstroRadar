import './App.css'
import { Outlet } from 'react-router'

function App() {

  return (
    <>
      <div className='min-h-dvh flex flex-col justify-center items-center gap-1'> 
        <Outlet /> 
      </div>
    </>
  )
}

export default App
