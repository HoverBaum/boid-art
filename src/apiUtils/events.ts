type EventType = {
  start: number
  end: number
  id: string
}

const events: EventType[] = [
  {
    start: 1668092400,
    end: 1668135600,
    id: 'StartUpAndBoids',
  },
  {
    start: 0,
    end: 1668092400,
    id: 'TestEvent',
  },
  {
    start: 1668171706,
    end: 1668196931,
    id: 'BoidArt',
  },
]

export const currentEventId = (): string | undefined => {
  if (process.env.DEV_EVENT_ID) return process.env.DEV_EVENT_ID
  const now = Math.floor(Date.now() / 1000)
  return events.find((event) => event.start <= now && event.end >= now)?.id
}
