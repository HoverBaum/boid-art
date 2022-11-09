import { useEffect, useState } from 'react'

type EventType = 'loading' | 'none' | string

export const useCurrentEvent = () => {
  const [currentEvent, setCurrentEvent] = useState<EventType>('loading')

  useEffect(() => {
    fetch('/api/event')
      .then((res) => res.json())
      .then((res) => {
        setCurrentEvent(res.eventId || 'none')
      })
  })

  return { currentEvent }
}
