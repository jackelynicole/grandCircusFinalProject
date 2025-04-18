import HTTPHandler from "../interfaces/HTTPHandler"
import { getEvents as getEventsFromService } from "../services/eventService"

export const getEvents: HTTPHandler = async (req, res) => {
  try {
    const location = (req.query.location as string) || "Detroit, MI"
    const distance = parseInt(req.query.distance as string) || 25

    const events = await getEventsFromService(location, distance)

    // events.sort((a, b) => (a.date < b.date ? -1 : 1))
    res.status(200).json(events)
  } catch (error) {
    console.error("Error in getEvents controller:", error)
    res.status(500).json({
      message: "Failed to fetch events",
      error: error instanceof Error ? error.message : "Unknown error"
    })
  }
}
