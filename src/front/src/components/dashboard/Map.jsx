const Map = () => {
    return (<>
    <div className="relative p-[3px] rounded-xl bg-gradient-to-r from-[#a3cfff] to-[#e0f0ff] w-[700px] h-[400px] overflow-hidden">
  <img
    src="https://bufferwall.com/download/B20190923T000000374_1200x600.jpg"
    alt="mapa"
    className="w-full h-full object-cover rounded-[10px]"
  />

  <button className="absolute bottom-8 right-6 text-sm rounded-md whitespace-nowrap px-[2px] py-[2px] bg-gradient-to-r from-[#22d3ee] to-[var(--astroradar-purple)] min-w-[120px]">
    <span className="block px-5 py-2 bg-[var(--components-background)] text-[var(--astroradar-white)] rounded-md text-center">
      Explorar
    </span>
  </button>
  <div className="absolute bottom-8 left-6 p-[2px] rounded-md border-2 border-sky-500 max-w-[280px]">
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