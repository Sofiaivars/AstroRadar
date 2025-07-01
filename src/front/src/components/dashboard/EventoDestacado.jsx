const EventoDestacado = () => {

    return (<>
    <div className="p-[3px] rounded-xl bg-gradient-to-r from-[#22d3ee] to-[var(--astroradar-purple)] w-[700px] h-[140px]">
      <div className="flex w-full h-full  bg-[var(--components-background)] rounded-xl overflow-hidden text-[var(--astroradar-white)]">
        
        
        <div className="w-[30%] h-full">
          <img
            src="https://cloudfront-us-east-1.images.arcpublishing.com/infobae/D3OR62KRQC5GAB32WYNEVGWHCM.jpg" 
            alt="Lluvia de meteoros"
            className="w-full h-full object-cover"
          />
        </div>

        {/* Contenido central */}
        <div className="flex flex-col justify-start px-4 py-3 w-[50%]">
          <h3 className="text-lg font-semibold mb-1">Lluvia de meteoros</h3>
          <p className="text-xs mb-1 mt-3">
            No te pierdas la última lluvia de perseidas este viernes!
          </p>
          <p className="text-xs mt-3">
            Visión: Cielo despejado. No necesitas ir lejos.
          </p>
        </div>

        
        <div className="flex flex-col justify-between items-end pr-4 py-3 w-[20%]">
          <p className="text-sm font-bold text-[var(--astroradar-white)] whitespace-nowrap">
            en 48hs 37min
          </p>
          <button className="text-sm rounded-md whitespace-nowrap relative px-[1px] py-[1px] bg-gradient-to-r from-[#22d3ee] to-[var(--astroradar-purple)] boton">
            <span className="block px-3 py-1 bg-[var(--components-background)] text-[var(--astroradar-white)] rounded-md">
              Comenzar misión
            </span>
          </button>
        </div>
      </div>
    </div>


    </>)

}

export default EventoDestacado