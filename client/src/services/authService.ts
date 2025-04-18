import axios from "axios"
import { auth } from "../firebaseConfig"

const baseUrl = import.meta.env.VITE_API_BASE_URL + "/secret"

export const getSecret = async (): Promise<any> => {
  const user = auth.currentUser
  if (!user) throw new Error("Not Logged In")
  const token = await user.getIdToken()
  return (
    await axios.get(baseUrl, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
  ).data
}
