import axios from "axios"
import dotenv from "dotenv"
import Event from "../interfaces/Event"

dotenv.config()

const SERP_API_KEY = process.env.SERP_API_KEY
const BASE_URL = "https://serpapi.com/search"

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
    const response = await axios.get(BASE_URL, {
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
