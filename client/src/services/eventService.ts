import axios from "axios"
import Event from "../interfaces/Event"

//const baseUrl = "http://localhost:3000/api/events"
const baseUrl = import.meta.env.VITE_API_URL

// GET ALL
export const getEvents = async (): Promise<Event[]> =>
  (await axios.get(baseUrl + "/events")).data

// POST
export const createEvent = async (eventData: Event): Promise<Event> =>
  (await axios.post(baseUrl + "/events", eventData)).data
