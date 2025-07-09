function EventCard({eventImg, eventName, eventCategory, eventStart, eventEnd, eventVisibility, eventMoon}){

  const handleClick = () => {
    const data = {
      event: eventName,
      category: eventCategory,
      startDate: eventStart,
      endDate: eventEnd,
      image: eventImg,
      moon: eventMoon,
      visibility: eventVisibility
    }
    return console.log(data)
  }

  return(
    <div className="flex rounded-2xl w-full items-center gap-3 bg-purple-300 borde-con-degradado">
      <div className="flex w-50 max-h-33 rounded-l-2xl overflow-hidden">
        <img src={eventImg} alt={eventCategory} className="w-full h-full object-cover" />
      </div>
      <div className="flex flex-col w-1/5 gap-3">
        <p>{eventName}</p>
        <p>
          {new Date(eventStart).toLocaleDateString('en-GB', {
            day: '2-digit',
            month: 'short',
            year: 'numeric',
          })}
        </p>
        <p>
          {new Date(eventEnd).toLocaleDateString('en-GB', {
            day: '2-digit',
            month: 'short',
            year: 'numeric',
          })}
        </p>
      </div>
      <div className="flex flex-col gap-3 w-2/5 me-3">
        <p>{eventVisibility}</p>
        <p>{`Luna ${eventMoon}`}</p>
      </div>
      <div className="flex justify-end items-end w-1/5 me-3">
        <button className="bg-purple-700 hover:bg-purple-300 p-2 rounded-2xl borde-con-degradado" onClick={handleClick}>
          Guardar evento
        </button>
      </div>
    </div>
  )
}

export default EventCard