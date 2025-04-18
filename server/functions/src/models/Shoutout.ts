import { Schema, model } from "mongoose"

const ShoutoutSchema = new Schema(
	{
		to: { type: String, required: true },
		from: { type: String, required: true },
		text: { type: String, required: true }
	},
	{ timestamps: true }
)

const Shoutout = model("Shoutout", ShoutoutSchema)

export default Shoutout
