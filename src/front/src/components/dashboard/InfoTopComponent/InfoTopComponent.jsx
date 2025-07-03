import './InfoTopComponent.css'

function InfoTopComponent(){

  return(
    <div className='flex items-center justify-between rounded-xl p-2 mb-1 w-7/9 info-component-container'>
      <div className='flex ms-5 gap-10'>
        <p>📍 Alberic, Valencia</p>
        <p>🌡️ 50ºC a la sombra</p>
      </div>
      <p>Astrofrikis activos: 50</p>
    </div>
  )
}

export default InfoTopComponent