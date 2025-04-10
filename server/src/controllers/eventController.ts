import { Request, Response } from "express"
import { fetchEvents } from "../services/eventService"

export const getEvents = async (req: Request, res: Response): Promise<void> => {
  try {
    const location = (req.query.location as string) || "Detroit, MI"
    const distance = parseInt(req.query.distance as string) || 25

    const events = await fetchEvents(location, distance)
    res.status(200).json(events)
  } catch (error) {
    console.error("Error in getEvents controller:", error)
    res.status(500).json({
      message: "Failed to fetch events",
      error: error instanceof Error ? error.message : "Unknown error"
    })
  }
}
