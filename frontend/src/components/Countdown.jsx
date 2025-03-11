import React, { useState, useEffect } from 'react'

function Countdown() {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  })
  const [isExpired, setIsExpired] = useState(false)

  useEffect(() => {
    const countdownDate = new Date("June 15, 2023 00:00:00").getTime()

    const updateCountdown = () => {
      const now = new Date().getTime()
      const distance = countdownDate - now

      if (distance < 0) {
        setIsExpired(true)
        return
      }

      setTimeLeft({
        days: Math.floor(distance / (1000 * 60 * 60 * 24)),
        hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
        minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
        seconds: Math.floor((distance % (1000 * 60)) / 1000),
      })
    }

    // Update immediately and then every second
    updateCountdown()
    const interval = setInterval(updateCountdown, 1000)

    return () => clearInterval(interval)
  }, [])

  if (isExpired) {
    return (
      <div className="bg-blue-600 text-white py-16">
        <div className="container mx-auto text-center">
          <h2 className="text-3xl font-bold mb-4">Spoural Games 2023 Has Begun!</h2>
          <p className="text-xl">Check out the ongoing events and results.</p>
        </div>
      </div>
    )
  }

  return (
    <div className="bg-blue-600 text-white py-16">
      <div className="container mx-auto text-center">
        <h2 className="text-3xl font-bold mb-8">Countdown to Spoural Games 2023</h2>
        <div className="flex justify-center space-x-8">
          {Object.entries(timeLeft).map(([unit, value]) => (
            <div key={unit} className="text-center">
              <div className="text-4xl font-bold mb-2">{value.toString().padStart(2, '0')}</div>
              <div className="text-xl">{unit.charAt(0).toUpperCase() + unit.slice(1)}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Countdown
