import axios from "axios";

const url = `https://www.eventbriteapi.com/v3/users/me/?token=${process.env.VITE_EVENTBRITE_API_KEY}`