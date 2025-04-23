// client/src/components/Events.tsx
import Event from "../interfaces/Event"
import { useState, useEffect } from "react"
import { getEvents } from "../services/eventService"
import EventCard from "./EventCard"

const Events = () => {
  const [events, setEvents] = useState<Event[]>([])
  useEffect(() => {
    getEvents().then(es => setEvents(es))
  }, [])
  return (
    <div>
      <h2 style={{ marginLeft: "15px" }}>Local Events</h2>
      <div
        className='events-container'
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(2, minmax(140px, 1fr))",
          gap: "16px",
          padding: "16px",
          justifyItems: "center"
        }}
      >
        {events.map((event, index) => (
          <EventCard key={index} event={event} />
        ))}
      </div>
    </div>
  )
}

export default Events
