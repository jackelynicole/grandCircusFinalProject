import Events from "./components/Events"
import RoomForm from "./components/RoomForm"

function App() {
  const handleRoomSuccess = (roomCode: string, nickname: string) => {
    console.log('Joined room:' , roomCode, 'as', nickname)
  }
  return (
    <>
      <h1 style={{ marginLeft: "10px" }}>What's The Move</h1>
      <RoomForm onSuccess={handleRoomSuccess}/>
    </>
  )
}

export default App
