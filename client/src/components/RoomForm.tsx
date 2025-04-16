import React, { useState } from "react";
import { createRoom, joinRoom } from "../services/roomService";

const RoomForm = ({ onSuccess }) => {
    const [nickname, setNickname] = useState('')
    const [roomCode, setRoomCode] = useState('')

    const handleCreate = async () => {
        const response = await createRoom(nickname)
        onSuccess(response.roomCode, nickname)
    }

    const handleJoin = async () => {
        const response = await joinRoom(roomCode, nickname)
        onSuccess(response.roomCode, nickname)
    }

    return (
        <div>
            <h2>Create or Join a Room</h2>
            <input placeholder="Nickname" value={nickname} onChange={e => setNickname(e.target.value)}/>
            <input placeholder="Room Code" value={roomCode} onChange={e => setRoomCode(e.target.value)}/>
            <button onClick={handleJoin}>Join Room</button>
            <button onClick={handleCreate}>Create Room</button>
        </div>
    )
}

export default RoomForm