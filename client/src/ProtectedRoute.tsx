import { Navigate, Outlet } from "react-router-dom"
import AuthContext from "./contexts/AuthContext"
import { useContext } from "react"

const ProtectedRoute = () => {
  const { user, isLoading } = useContext(AuthContext)
  if (isLoading) return <p>Loading...</p>
  return user ? <Outlet /> : <Navigate to='/' replace />
}
export default ProtectedRoute
