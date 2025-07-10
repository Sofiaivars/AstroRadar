const EventoDestacado = () => {

    return (<>
    <div className="p-[3px] rounded-xl w-full h-[140px]">
      <div className="flex w-full h-full bg-[var(--components-background)] rounded-xl overflow-hidden text-[var(--astroradar-white)] borde-con-degradado">
        
        
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
          <button
              
              className="
    group
    rounded-[12px]
    p-[1.5px]
    text-white
    text-sm
    h-10
    w-40
    font-medium
    transition
    duration-300
    flex
    items-center
    justify-center
    hover:shadow-2xl
    hover:shadow-purple-600/30
  "
              style={{
                backgroundImage:
                  "linear-gradient(var(--components-background), var(--components-background)), " +
                  "linear-gradient(to right, #a855f7, #d946ef, #22d3ee)", //bordeeeeeeeee
                backgroundOrigin: "border-box",
                backgroundClip: "padding-box, border-box",
                border: "2px solid transparent",
              }}
            >
              <div
                className="
      rounded-[12px]
      w-full
      h-full
      flex
      items-center
      justify-center
      transition
      duration-300
      ease-in-out
      group-hover:bg-gradient-to-br
      group-hover:from-gray-700
      group-hover:to-gray-900
    "
                style={{
                  backgroundColor: "var(--components-background)",
                }}
              >
                Comenzar misión
              </div>
            </button>
        </div>
      </div>
    </div>


    </>)

}

export default EventoDestacado