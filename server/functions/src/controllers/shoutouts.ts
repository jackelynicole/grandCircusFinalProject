import Shoutout from "../models/Shoutout"
import HTTPHandler from "../interfaces/HTTPHandler"

// CREATE

export const postShoutout: HTTPHandler = async (
	req,
	res
) => {
	try {
		const shoutout = new Shoutout(req.body)
		await shoutout.save()
		res.status(201).send(shoutout)
	} catch (e: any) {
		res.status(403).send("Invalid Request")
	}
}

// READ

export const getShoutouts: HTTPHandler = async (
	req,
	res
) => {
	try {
		const shoutouts = await Shoutout.find()
		res.status(200).send(shoutouts)
	} catch (e: any) {
		res.status(500).send("Internal Server Error")
	}
}

// READ ONE

export const getShoutout: HTTPHandler = async (
	req,
	res
) => {
	try {
		const shoutout = await Shoutout.findById(
			req.params.id
		)
		res.status(200).send(shoutout)
	} catch (e: any) {
		res.status(404).send("Shouout not found")
	}
}

// UPDATE

export const putShoutout: HTTPHandler = async (
	req,
	res
) => {
	try {
		const shoutout = await Shoutout.findByIdAndUpdate(
			req.params.id,
			req.body,
			{ new: true }
		)
		if (!shoutout) throw new Error()
		await shoutout.save()
		res.status(200).send(shoutout)
	} catch (e: any) {
		res.status(404).send("Shouout not found")
	}
}

// DESTROY

export const deleteShoutout: HTTPHandler = async (
	req,
	res
) => {
	try {
		await Shoutout.findByIdAndDelete(req.params.id)
		res.status(204).send()
	} catch (e: any) {
		res.status(404).send("Shouout not found")
	}
}
