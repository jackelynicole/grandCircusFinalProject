import { User, onAuthStateChanged } from "firebase/auth"
import AuthContext from "./AuthContext"
import { useState, useEffect, ReactNode, FC } from "react"
import { auth } from "../firebaseConfig"

interface Props {
  children: ReactNode
}
const AuthProvider: FC<Props> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null)
  const [token, setToken] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState<boolean>(true)

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, async currentUser => {
      setUser(currentUser)
      if (currentUser) {
        const idToken = await currentUser.getIdToken()
        setToken(idToken)
      } else {
        setToken(null)
      }
      setIsLoading(false)
    })
    return () => unsub()
  })

  return (
    <AuthContext.Provider value={{ user, token, isLoading }}>
      {children}
    </AuthContext.Provider>
  )
}
export default AuthProvider
