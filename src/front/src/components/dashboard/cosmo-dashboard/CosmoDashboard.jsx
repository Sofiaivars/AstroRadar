import { useEffect, useState } from 'react'
import './CosmoDashboard.css'
import cosmo from './assets/cosmo-dashboard.png'
import { cosmoTipCall } from '../../../servicios/cosmo-service'
import LoaderMini from '../../loaders/loaderMini'

function CosmoDashboard(){
  const [cosmoTip, setCosmoTip] = useState(null)

  useEffect(() => {
    const getDataFromAPI = async () => {
      const tip = await cosmoTipCall()
      setCosmoTip(tip)
    }
    getDataFromAPI()
  }, [])

  return(
    <div className='flex flex-col justify-center items-start h-70 w-70 relative overflow-hidden'>
      <div className='flex items-center justify-center rounded-t-2xl rounded-s-2xl w-8/9 p-3 h-20 max-h-20 ms-1 relative cosmoMessage'>
        {cosmoTip ? <p className='text-xs text-center'>{cosmoTip}</p> : <LoaderMini />}
        <p className='text-xs absolute opacity-20 ai-alert'>AI generated</p>
      </div>
      <div className='flex items-end justify-end w-full'>
        <img src={cosmo} width={150} alt="cosmo-bot" />
      </div>
    </div>
  )
}

export default CosmoDashboard