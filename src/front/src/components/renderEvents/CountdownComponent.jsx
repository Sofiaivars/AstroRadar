import { useEffect, useState } from "react"

function CountdownComponent({ eventStart }){
  const [timer, setTimer] = useState({days: 0, hours: 0, minutes: 0, seconds: 0})

  useEffect(() => {
    const deadlineTime = new Date(eventStart)

    deadlineTime.setDate(deadlineTime.getDate())
    const deadline = deadlineTime.getTime()
    
    const updateCountdown = () => {
      if(countdownInterval !== null){
        const now = new Date().getTime()
        const timeToLive = deadline - now

        const days = Math.floor(timeToLive / (1000 * 60 * 60 * 24))
        const hours = Math.floor((timeToLive % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
        const minutes = Math.floor((timeToLive % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((timeToLive % (1000 * 60)) / 1000);

        if(timeToLive < 0){
          countdownInterval && clearInterval(countdownInterval)
          return setTimer(null)
        }
        setTimer({days, hours, minutes, seconds})
      }
    }

    let countdownInterval = null
    updateCountdown()
    countdownInterval = setInterval(updateCountdown, 1000)
  }, [])

  return(
    <div className="flex flex-row gap-3">
      {timer
      ? (
        <>
          <p>{timer.days} D</p>
          <p>{timer.hours} H</p>
          <p>{timer.minutes} M</p>
          <p>{timer.seconds} S</p>
        </>
        )
      : <p>Cerrado!</p>}
      
    </div>
  )
}

export default CountdownComponent