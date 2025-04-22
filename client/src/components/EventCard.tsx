import React from "react"
import Event from "../interfaces/Event"
import EventMap from "./EventMap"
import "./EventCard.css"

interface EventCardProps {
  event: Event
}

const EventCard: React.FC<EventCardProps> = ({ event }) => {
  return (
    <div className='event-card'>
      <div className='event-time'>{event.date}</div>
      {event.imageUrl && (
        <img src={event.imageUrl} alt={event.title} className='event-image' />
      )}
      <div className='event-details'>
        <div className='event-title'>{event.title}</div>
        <p className='event-description'>{event.description}</p>=
        <div className='event-map-wrapper'>
          <EventMap location={event.location} />
        </div>
      </div>
    </div>
  )
}

export default EventCard
