const EventoSugerido = () => {

    return(<>
    
    <div className="p-[3px] rounded-xl bg-gradient-to-r from-[var(--astroradar-purple)] to-[#22d3ee] w-[350px] h-70">
      <div className="flex w-full h-full  bg-[var(--components-background)] rounded-xl overflow-hidden text-[var(--astroradar-white)]">
        
        
        <div className="w-[50%] h-full">
          <img
            src="https://media.istockphoto.com/id/452969547/es/foto/superluna-creciente.jpg?s=612x612&w=0&k=20&c=MVgqQ_NR8qC9tevdhq14AF7FkWtLim51Z7kcC-CJOLg=" 
            alt="Evento Sugerido"
            className="w-full h-full object-cover"
          />
        </div>

        {/* Contenido central */}
        <div className="flex flex-col justify-start px-4 py-3 w-[50%]">
            <p className="text-lg mb-1 mt-5">SUGERIDAS</p>
          <p className="text-sm mb-2 mt-5">"SUPERLUNA"</p>
          <p className="text-xs mb-1 mt-5">
            La superluna ocurre cuando la luna llena está en su punto más cercano a la Tierra, luciendo más grande y brillante visualmente.
          </p>
           <button
              
              className="
    btn-sug  
    group
    rounded-[12px]
    p-[1.5px]
    text-white
    text-sm
    h-10
    w-10
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
                <span>&#62;</span>
              </div>
            </button>
        </div>

        
        
      </div>
    </div>
    
    
    </>)
}
export default EventoSugerido