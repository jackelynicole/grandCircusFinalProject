import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
// import ShoutoutList from "./ShoutoutList"
import Events from "./components/Events"
import CreateEventForm from "./components/CreateEventForm"
import Login from "./Login"
import ProtectedRoute from "./ProtectedRoute"

const App = () => (
  <>
    <h1 style={{ marginLeft: "10px" }}>What's The Move</h1>
    <Router>
      <Routes>
        <Route path='/' element={<Login />} />
        <Route element={<ProtectedRoute />}>
          <Route
            path='/events'
            element={
              <>
                <Events />
                <CreateEventForm />
              </>
            }
          />
        </Route>
      </Routes>
    </Router>
  </>
)

export default App
