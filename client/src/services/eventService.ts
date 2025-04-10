import axios from "axios"
import Event from "../interfaces/Event"

const baseUrl = "http://localhost:3000/api/events"

// GET ALL
export const getEvents = async (): Promise<Event[]> =>
  (await axios.get(baseUrl)).data
