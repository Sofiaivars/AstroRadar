import MapboxMap from "./mapbox/MapboxMap"

const Map = ({userLocation}) => {
    return (<>
    <div className="relative p-[3px] rounded-xl bg-gradient-to-r from-[var(--astroradar-purple)] to-[#22d3ee] w-[700px] h-[400px] overflow-hidden">
  <MapboxMap userLocation={userLocation}/>

  <button
              
              className="
    absolute bottom-8 right-6          
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
                Explorar
              </div>
            </button>
  <div className="absolute bottom-8 left-6 p-[2px] rounded-md border-2 border-gray-500 max-w-[280px]">
  <div className="bg-white/1 backdrop-blur-xs rounded-md p-4  min-h-[100px] text-[var(--astroradar-white)] text-center">
    <h3 className="text-base font-semibold mb-1">Bases Estelares</h3>
    <p className="text-sm mt-5">
      12 Bases Estelares desbloqueadas
    </p>
  </div>
</div>
</div>

    
    </>)
}

export default Map