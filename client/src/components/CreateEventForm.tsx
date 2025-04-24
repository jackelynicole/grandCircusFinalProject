import { useState } from "react"
import { createEvent } from "../services/eventService"
import Event from "../interfaces/Event"
import "./CreateEventForm.css"
const emptyEvent: Event = {
  title: "",
  description: "",
  date: "",
  location: "",
  imageUrl: "",
  url: ""
}
const CreateEventForm = () => {
  const [formData, setFormData] = useState<Event>(emptyEvent)
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      await createEvent(formData)
      alert("Event created!")
      setFormData(emptyEvent)
    } catch (error) {
      console.error("Error creating event:", error)
      alert("Failed to create event.")
    }
  }
  return (
    <form onSubmit={handleSubmit} className='create-event-form'>
      <h3>Create Local Event</h3>
      <input
        name='title'
        placeholder='Title'
        value={formData.title}
        onChange={handleChange}
        required
      />
      <input
        name='date'
        placeholder='Date'
        value={formData.date}
        onChange={handleChange}
        required
      />
      <input
        name='location'
        placeholder='Location'
        value={formData.location}
        onChange={handleChange}
        required
      />
      <textarea
        name='description'
        placeholder='Description'
        value={formData.description}
        onChange={handleChange}
      />
      <input
        name='imageUrl'
        placeholder='Image URL'
        value={formData.imageUrl}
        onChange={handleChange}
      />
      <input
        name='url'
        placeholder='Event URL'
        value={formData.url}
        onChange={handleChange}
      />
      <button type='submit'>Save Event</button>
    </form>
  )
}
export default CreateEventForm
