import { User } from "firebase/auth"
import { createContext } from "react"

interface ContextType {
	user: User | null
	token: string | null
	isLoading: boolean
}

const AuthContext = createContext<ContextType>({
	user: null,
	token: null,
	isLoading: true
})
export default AuthContext
