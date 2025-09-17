import { useEffect, useState } from 'react'
import './CosmoDashboard.css'
import cosmo from './assets/cosmo-dashboard.png'
import cosmoStep1 from './assets/cosmo-step1.png'
import cosmoStep2 from './assets/cosmo-tip2.png'
import cosmoError from './assets/cosmo-explota.gif'
import { cosmoStep2TipCall, cosmoStep1TipCall, cosmoTipCall } from '../../../servicios/cosmo-service'
import LoaderMini from '../../loaders/LoaderMini.jsx'

function CosmoDashboard({scene, eventoAstronomico}){
  const [cosmoTip, setCosmoTip] = useState(null)

  useEffect(() => {
    const selectCosmoPrompt = () => {
      const getDataFromAPI = async () => {

        const tip = scene === "dashboard" 
          ? await cosmoTipCall()
          : scene === "step1" 
            ? await cosmoStep1TipCall(eventoAstronomico)
            : scene === "step2"
              ? await cosmoStep2TipCall()
              : "Me he roto!"

        setCosmoTip(tip)
      }
      return getDataFromAPI()
    }
    selectCosmoPrompt()
  }, [])

  return(
    <div className={`flex flex-col justify-center items-start h-70 w-70 overflow-hidden absolute ${scene === "dashboard" 
      ? "cosmo-component" 
      : scene === "step1" 
        ? "cosmo-step1"
        : scene === "step2"
          ? "cosmo-step2"
          : "cosmo-component"}`}>
      <div className='flex items-center justify-center rounded-t-2xl rounded-s-2xl w-8/9 p-3 h-20 max-h-20 ms-1 relative cosmoMessage'>
        {cosmoTip ? <p className='text-xs text-center'>{cosmoTip}</p> : <LoaderMini />}
        <p className='text-xs absolute opacity-20 ai-alert'>AI generated</p>
      </div>
      <div className='flex items-end justify-end w-full'>
        <img 
          src={
            scene === "dashboard" 
              ? cosmo 
              : scene === "step1" 
                ? cosmoStep1
                : scene === "step2"
                  ? cosmoStep2
                  : cosmoError}
          width={150} 
          alt="cosmo-bot" 
        />
      </div>
    </div>
  )
}

export default CosmoDashboard