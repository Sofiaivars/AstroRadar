function RankingCard({position, name, lastName, country, city, achievements, image}){

  return(
    <div className="flex items-center rounded-3xl w-full p-1 gap-3 ranking-card">
      <div className="rounded-full border-gray-50 border-3 aspect-square overflow-hidden ms-3 ranking-card-avatar">
        <img src={image} width="50" alt="Avatar"/>
      </div>
      <div className="font-bold ranking-card-rank">#{position}</div>
      <div className="flex flex-col ms-3 ranking-card-info">
        <p className="text-lg font-bold ranking-card-name">{`${name} ${lastName}`}</p>
        <p className="text-xs ranking-card-location">{`${city}, ${country}`} | {achievements} Logros</p>
      </div>
    </div>
  )
}

export default RankingCard