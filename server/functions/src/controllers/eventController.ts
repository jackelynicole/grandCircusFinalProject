import HTTPHandler from "../interfaces/HTTPHandler"
import { getEvents as getEventsFromService } from "../services/eventService"
import EventModel from "../models/eventModel"

export const getEvents: HTTPHandler = async (req, res) => {
  try {
    const location = (req.query.location as string) || "Detroit, MI"
    const distance = parseInt(req.query.distance as string) || 25

    const localEvents = await EventModel.find()
    const externalEvents = await getEventsFromService(location, distance)

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

export const createEvent: HTTPHandler = async (req, res) => {
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
