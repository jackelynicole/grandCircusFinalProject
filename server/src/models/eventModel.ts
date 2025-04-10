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
