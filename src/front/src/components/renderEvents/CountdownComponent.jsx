import { useEffect, useState } from "react"
import NumberFlow from "@number-flow/react"

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
          <div className="flex flex-row items-center">
            <div className="min-w-5">
              <NumberFlow value={timer.days} format={{ minimumIntegerDigits: 3 }}/> 
            </div> 
            <p>D</p>
          </div>
          <div className="flex flex-row items-center">
            <div className="min-w-5">
              <NumberFlow value={timer.hours} format={{ minimumIntegerDigits: 2 }}/> 
            </div>
            <p>H</p>
          </div>
          <div className="flex flex-row items-center">
            <div className="min-w-5">
              <NumberFlow value={timer.minutes} format={{ minimumIntegerDigits: 2 }}/> 
            </div>
            <p>M</p>
          </div>
          <div className="flex flex-row items-center">
            <div className="min-w-5">
              <NumberFlow value={timer.seconds} format={{ minimumIntegerDigits: 2 }}/> 
            </div>
            <p>S</p>
          </div>
        </>
        )
      : <p>Cerrado!</p>}
      
    </div>
  )
}

export default CountdownComponent