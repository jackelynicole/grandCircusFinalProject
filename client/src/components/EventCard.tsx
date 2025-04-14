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
      <div className='event-content'>
        <EventMap location={event.location} />

        <div className='event-details'>
          <h3 className='event-title'>{event.title}</h3>
          <p className='event-date-location'>
            {event.date} — {event.location}
          </p>
          {event.description && (
            <p className='event-description'>{event.description}</p>
          )}
          <div className='event-vote'>
            <span className='vote-label'>VOTE</span>
            <button className='vote-button'>+</button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default EventCard
