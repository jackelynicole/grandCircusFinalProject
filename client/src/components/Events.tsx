import Event from "../interfaces/Event"
import { useState, useEffect } from "react"
import { getEvents } from "../services/eventService"
import EventCard from "./EventCard"

const Events = () => {
  const [events, setEvents] = useState<Event[]>([])

  useEffect(() => {
    console.log("here")
    getEvents().then(es => setEvents(es))
  }, [])

  return (
    <div>
      <h2 style={{ marginLeft: "15px" }}>Local Events</h2>
      <div className='events-container'>
        {events.map((event, index) => (
          <EventCard key={index} event={event} />
        ))}
      </div>
    </div>
  )
}

export default Events
