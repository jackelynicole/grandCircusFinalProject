import Event from "../interfaces/Event"
import { useState, useEffect } from "react"
import { getEvents } from "../services/eventService"

const EventsTest = () => {
  const [events, setEvents] = useState<Event[]>([])

  useEffect(() => {
    getEvents().then(es => setEvents(es))
  }, [])

  return (
    <div>
      <h2>Event Test Output</h2>
      <ul>
        {events.map((event, index) => (
          <li key={index}>
            <h4>{event.title}</h4>
            <p>
              {event.date} — {event.location}
            </p>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default EventsTest
