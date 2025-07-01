import './CosmoDashboard.css'
import cosmo from './assets/cosmo-dashboard.png'

function CosmoDashboard(){

  return(
    <div className='flex justify-end items-end h-70 border-2 rounded-2xl w-70 relative overflow-hidden'>
      <div className='flex items-center justify-center bg-sky-950 rounded-2xl w-8/9 absolute p-3 h-20 max-h-20 cosmoMessage'>
        <p className='break-all'>Hola soy cosmo!</p>
      </div>
      <img src={cosmo} width={150} alt="cosmo-bot" />
    </div>
  )
}

export default CosmoDashboard