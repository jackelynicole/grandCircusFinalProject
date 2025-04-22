// client/src/components/CreateEventForm.tsx
import { useState } from "react"
import { createEvent } from "../services/eventService"
import Event from "../interfaces/Event"
const emptyEvent: Event = {
title: "",
description: "",
date: "",
location: "",
imageUrl: "",
url: ""
}
const CreateEventForm = () => {
const [formData, setFormData] = useState<Event>(emptyEvent)
const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
const { name, value } = e.target
setFormData(prev => ({ ...prev, [name]: value }))
}
const handleSubmit = async (e: React.FormEvent) => {
e.preventDefault()
try {
await createEvent(formData)
alert("Event created!")
setFormData(emptyEvent)
} catch (error) {
console.error("Error creating event:", error)
alert("Failed to create event.")
}
}
return (

  <form onSubmit={handleSubmit} style={{ margin: "15px" }}>
   <h3>Create Local Event</h3>
   <input name="title" placeholder="Title" value={formData.title} onChange={handleChange} required />
   <input name="date" placeholder="Date" value={formData.date} onChange={handleChange} required />
   <input name="location" placeholder="Location" value={formData.location} onChange={handleChange} required />
   <textarea name="description" placeholder="Description" value={formData.description} onChange={handleChange} />
   <input name="imageUrl" placeholder="Image URL" value={formData.imageUrl} onChange={handleChange} />
   <input name="url" placeholder="Event URL" value={formData.url} onChange={handleChange} />
   <button type="submit">Save Event</button>
  </form>
 )
}
export default CreateEventForm

// client/src/components/EventCard.css
.event-card {
background: #fff;
border-radius: 20px;
box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
overflow: hidden;
width: 100%;
max-width: 320px;
margin: 12px auto;
display: flex;
flex-direction: column;
text-align: center;
}
.event-time {
font-weight: bold;
font-size: 1.2rem;
padding: 12px 0 0;
color: #000;
}
.event-image {
width: 100%;
height: 160px;
object-fit: cover;
/_ border-top-left-radius: 20px;
border-top-right-radius: 20px; _/
}
.event-details {
padding: 0 16px 16px;
}
.event-title {
font-weight: 600;
font-size: 1.1rem;
margin: 8px 0 4px;
}
.event-description {
font-size: 0.9rem;
color: #444;
line-height: 1.4;
display: -webkit-box;
-webkit-line-clamp: 3;
-webkit-box-orient: vertical;
overflow: hidden;
text-overflow: ellipsis;
}
/_ .events-container {
display: grid;
grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
gap: 20px;
padding: 16px;
} _/

// client/src/components/EventCard.tsx
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
    <p className='event-description'>{event.description}</p>
=
    <div className='event-map-wrapper'>
     <EventMap location={event.location} />
    </div>
   </div>
  </div>
 )
}
export default EventCard

// client/src/components/EventMap.css
.event-map-container {
position: relative;
height: 120px;
width: 100%;
border-radius: 8px;
overflow: hidden;
margin: 0 0 12px 16px;
box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
float: right;
}

.event-map {
height: 100%;
width: 100%;
}

.event-map-overlay {
position: absolute;
top: 0;
left: 0;
right: 0;
background-color: rgba(63, 81, 181, 0.7);
padding: 6px 8px;
text-align: center;
}

.event-map-overlay p {
margin: 0;
white-space: nowrap;
overflow: hidden;
text-overflow: ellipsis;
color: white;
font-size: 0.75rem;
font-weight: bold;
}

// client/src/components/EventMap.tsx
import { useRef, useEffect } from "react"
import mapboxgl from "mapbox-gl"
import "mapbox-gl/dist/mapbox-gl.css"
import "./EventMap.css"

interface EventMapProps {
location: string
}

const EventMap: React.FC<EventMapProps> = ({ location }) => {
const mapRef = useRef<mapboxgl.Map | null>(null)
const mapContainerRef = useRef<HTMLDivElement>(null)

const getVenueName = (location: string) => {
const commaIndex = location.indexOf(",")
const dashIndex = location.indexOf("-")

    if (commaIndex > 0) {
      return location.substring(0, commaIndex).trim()
    } else if (dashIndex > 0) {
      return location.substring(0, dashIndex).trim()
    } else {
      return location.length > 20 ? location.substring(0, 20) + "..." : location
    }

}

useEffect(() => {
if (!mapContainerRef.current) return
mapboxgl.accessToken =
"pk.eyJ1IjoibGlnaHRuaW5nc3ByZWUiLCJhIjoiY205YzB0NnhlMG52ejJrcTJseWxhcXZhZiJ9.VFBHYF5wcCBw35HASKi_eA"
const detroitCoordinates: [number, number] = [-83.0458, 42.3314]

    mapRef.current = new mapboxgl.Map({
      container: mapContainerRef.current,
      style: "mapbox://styles/mapbox/streets-v11",
      center: detroitCoordinates,
      zoom: 12,
      dragPan: false,
      scrollZoom: false,
      interactive: false
    })

    return () => {
      if (mapRef.current) {
        mapRef.current.remove()
      }
    }

}, [location])

return (

<div className='event-map-container'>
<div className='event-map' ref={mapContainerRef}></div>
<div className='event-map-overlay'>
<p>{getVenueName(location)}</p>
</div>
</div>
)
}

export default EventMap

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
   <div className="events-container" style={{
    display: "grid",
    gridTemplateColumns: "repeat(2, minmax(140px, 1fr))",
    gap: "16px",
    padding: "16px",
    justifyItems: "center"
   }}>
    {events.map((event, index) => (
     <EventCard key={index} event={event} />
    ))}
  </div>
  </div>
 )
}
export default Events

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
        }} >
{events.map((event, index) => (
<EventCard key={index} event={event} />
))}
</div>
</div>
)
}

export default Events

// client/src/interfaces/Event.ts
export default interface Event {
title: string
description: string
date: string
location: string
imageUrl: string
url: string
ticketInfo?: any[]
venue?: any
}

// client/src/services/eventService.ts
import axios from "axios"
import Event from "../interfaces/Event"
const baseUrl = "http://localhost:3000/api/events"
// GET ALL
export const getEvents = async (): Promise<Event[]> =>
(await axios.get(baseUrl)).data
export const createEvent = async (eventData: Event): Promise<Event> =>
(await axios.post(baseUrl, eventData)).data

// client/src/App.tsx
import Events from "./components/Events"
import CreateEventForm from "./components/CreateEventForm"
function App() {
return (
<>

   <h1 style={{ marginLeft: "10px" }}>What's The Move</h1>
   <CreateEventForm />
   <Events />
  </>
 )
}
export default App

// client/src/index.css
:root {
font-family: system-ui, Avenir, Helvetica, Arial, sans-serif;
line-height: 1.5;
font-weight: 400;
color-scheme: light dark;
color: rgba(255, 255, 255, 0.87);
background-color: #242424;
font-synthesis: none;
text-rendering: optimizeLegibility;
-webkit-font-smoothing: antialiased;
-moz-osx-font-smoothing: grayscale;
}
a {
font-weight: 500;
color: #646CFF;
text-decoration: inherit;
}
a:hover {
color: #535BF2;
}
body {
margin: 0;
display: flex;
place-items: center;
min-width: 320px;
min-height: 100vh;
}
h1 {
font-size: 3.2em;
line-height: 1.1;
}
button {
border-radius: 8px;
border: 1px solid transparent;
padding: 0.6em 1.2em;
font-size: 1em;
font-weight: 500;
font-family: inherit;
background-color: #1A1A1A;
cursor: pointer;
transition: border-color 0.25s;
}
button:hover {
border-color: #646CFF;
}
button:focus,
button:focus-visible {
outline: 4px auto -webkit-focus-ring-color;
}
@media (prefers-color-scheme: light) {
:root {
color: #213547;
background-color: #FFFFFF;
}
a:hover {
color: #747BFF;
}
button {
background-color: #F9F9F9;
}
}

// client/src/index.css
:root {
font-family: system-ui, Avenir, Helvetica, Arial, sans-serif;
line-height: 1.5;
font-weight: 400;
color-scheme: light dark;
color: rgba(255, 255, 255, 0.87);
background-color: #242424;
font-synthesis: none;
text-rendering: optimizeLegibility;
-webkit-font-smoothing: antialiased;
-moz-osx-font-smoothing: grayscale;
}
a {
font-weight: 500;
color: #646CFF;
text-decoration: inherit;
}
a:hover {
color: #535BF2;
}
body {
margin: 0;
display: flex;
place-items: center;
min-width: 320px;
min-height: 100vh;
}
h1 {
font-size: 3.2em;
line-height: 1.1;
}
button {
border-radius: 8px;
border: 1px solid transparent;
padding: 0.6em 1.2em;
font-size: 1em;
font-weight: 500;
font-family: inherit;
background-color: #1A1A1A;
cursor: pointer;
transition: border-color 0.25s;
}
button:hover {
border-color: #646CFF;
}
button:focus,
button:focus-visible {
outline: 4px auto -webkit-focus-ring-color;
}
@media (prefers-color-scheme: light) {
:root {
color: #213547;
background-color: #FFFFFF;
}
a:hover {
color: #747BFF;
}
button {
background-color: #F9F9F9;
}
}

// client/src/main.tsx
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
createRoot(document.getElementById('root')!).render(
<StrictMode>
<App />
</StrictMode>,
)

// client/index.html

<!doctype html>
<html lang="en">
 <head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>What's the move?</title>
 </head>
 <body>
  <div id="root"></div>
  <script type="module" src="/src/main.tsx"></script>
 </body>
</html>

// server/src/controllers/eventController.ts

import { Request, Response } from "express"
import { fetchEvents } from "../services/eventService"
import EventModel from "../models/eventModel"
export const getEvents = async (req: Request, res: Response): Promise<void> => {
try {
const location = (req.query.location as string) || "Detroit, MI"
const distance = parseInt(req.query.distance as string) || 25
const localEvents = await EventModel.find()
const externalEvents = await fetchEvents(location, distance)
const combinedEvents = [...localEvents, ...externalEvents]
res.status(200).json(combinedEvents)
} catch (error) {
console.error("Error in getEvents controller:", error)
res.status(500).json({
message: "Failed to fetch events",
error: error instanceof Error ? error.message : "Unknown error"
})
}
}
export const createEvent = async (req: Request, res: Response): Promise<void> => {
try {
const newEvent = new EventModel(req.body)
const savedEvent = await newEvent.save()
res.status(201).json(savedEvent)
} catch (error) {
console.error("Error in createEvent controller:", error)
res.status(500).json({
message: "Failed to create event",
error: error instanceof Error ? error.message : "Unknown error"
})
}
}

// server/src/interfaces/Event.ts
export default interface Event {
title: string
description: string
date: string
location: string
imageUrl: string
url: string
ticketInfo?: any[]
venue?: any
}

// server/src/models/eventModel.ts
import mongoose from "mongoose"
const EventSchema = new mongoose.Schema(
{
title: {
type: String,
required: true
},
description: {
type: String,
required: false
},
date: {
type: String,
required: true
},
location: {
type: String,
required: true
},
imageUrl: {
type: String,
required: false
},
url: {
type: String,
required: false
},
ticketInfo: {
type: Array,
required: false
},
venue: {
type: Object,
required: false
}
},
{ timestamps: true }
)
const Event = mongoose.model("Event", EventSchema)
export default Event

// server/src/routes/eventRoutes.ts
import express, { Router } from "express"
import { getEvents, createEvent } from "../controllers/eventController"
const router: Router = express.Router()
router.get("/", getEvents)
router.post("/", createEvent)
export default router

// server/src/services/eventService.ts
import axios from "axios"
import dotenv from "dotenv"
import Event from "../interfaces/Event"
dotenv.config()
const SERP\*API_KEY = process.env.SERP_API_KEY
const baseUrl = "https://serpapi.com/search"
let eventsCache: Event[] | null = null
export const fetchEvents = async (
location: string = "Detroit, MI",
distance: number = 25
): Promise<Event[]> => {
if (eventsCache) {
console.log("Using cached events data")
return eventsCache
}
try {
console.log("Fetching events from Serp API")
const response = await axios.get(baseUrl, {
params: {
engine: "google_events",
q: `events within ${distance} miles of ${location}`,
location: location,
google_domain: "google.com",
api_key: SERP_API_KEY,
htichips: "date:this_week"
}
})
const serpEvents = response.data.events_results || []
const mappedEvents: Event[] = serpEvents.map((event: any) => {
let eventDate = ""
if (event.date) {
if (typeof event.date === "string") {
eventDate = event.date
} else if (event.date.when) {
eventDate = event.date.when
} else if (event.date.start_date) {
eventDate = event.date.start_date
}
}
let location = ""
if (Array.isArray(event.address) && event.address.length > 0) {
location = event.address.join(", ")
} else if (event.venue && event.venue.name) {
location = event.venue.name
}
return {
title: event.title,
description: event.description || "",
date: eventDate,
location: location,
imageUrl: event.thumbnail || event.image || "",
url: event.link || "",
ticketInfo: event.ticket_info || [],
venue: event.venue || null
}
})
// Save to in-memory cache
eventsCache = mappedEvents
return mappedEvents
} catch (error) {
console.error("Error fetching events from Serp API:", error)
throw error
}
}

// server/src/index.ts
import express, { json } from "express"
import mongoose from "mongoose"
import cors from "cors"
import dotenv from "dotenv"
import eventRoutes from "./routes/eventRoutes"
// CONFIGURATIONS
dotenv.config()
const app = express()
app.use(cors())
app.use(json())
// ROUTES
/\*
app.use("/", (req, res) => {
res.send("hello, world!")
})
\_/
app.use("/api/events", eventRoutes)
app.get("/", (req, res) => {
res.send("API is running")
})
// DATABASE CONNECTION
const PORT = process.env.PORT || 3000
const MONGO_URL = process.env.MONGO_URL || ""
mongoose.set("strictQuery", false)
mongoose
.connect(MONGO_URL)
.then(() => {
app.listen(PORT, () => console.log(`Connected at PORT:${PORT}`))
})
.catch(err => console.log(`${err}, did not connect!`))
