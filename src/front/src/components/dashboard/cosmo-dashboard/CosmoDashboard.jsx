import './CosmoDashboard.css'
import cosmo from './assets/cosmo-dashboard.png'

function CosmoDashboard(){

  return(
    <div className='flex flex-col justify-center items-center h-70 border-2 rounded-2xl w-70 relative overflow-hidden'>
      <div className='flex items-center justify-center bg-sky-950 rounded-2xl w-8/9 p-3 h-20 max-h-20 cosmoMessage'>
        <p className='break-all'>Hola soy cosmo!</p>
      </div>
      <div className='flex items-end justify-end w-full'>
        <img src={cosmo} width={150} alt="cosmo-bot" />
      </div>
    </div>
  )
}

export default CosmoDashboard