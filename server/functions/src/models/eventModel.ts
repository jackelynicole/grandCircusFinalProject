import { Schema, model } from "mongoose"

//
// NOTE: Use this model for storing any Serp API info to MongoDB
//

const EventSchema = new Schema(
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

const Event = model("Event", EventSchema)

export default Event
