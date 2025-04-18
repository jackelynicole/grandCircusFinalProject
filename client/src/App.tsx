import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
// import ShoutoutList from "./ShoutoutList"
import Events from "./components/Events"
import Login from "./Login"
import ProtectedRoute from "./ProtectedRoute"

const App = () => (
  <>
    <h1 style={{ marginLeft: "10px" }}>What's The Move</h1>
    <Router>
      <Routes>
        <Route path='/' element={<Login />} />
        <Route element={<ProtectedRoute />}>
          <Route path='/events' element={<Events />} />
        </Route>
      </Routes>
    </Router>
  </>
)
export default App

/*
import Events from "./components/Events"
function App() {
  return (
    <>
      <h1 style={{ marginLeft: "10px" }}>What's The Move</h1>
      <Events />
    </>
  )
}

export default App
*/
