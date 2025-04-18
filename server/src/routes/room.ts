import { connectToDatabase } from "../config/db";


const express = require('express');
const router = express.Router();
const Room = require('../models/Room');
const generateRoomCode = require('../utils/generateRoomCode');

router.post('/create-room', async (req, res) => {
  const db = await connectToDatabase()
  const roomsCollection = db.collection('rooms')
  const { nickname } = req.body;
  const code = generateRoomCode();
  const newRoom = await Room.create({
    code,
    participants: [{ nickname, isHost: true }],
    createdAt: new Date()
  });
  await roomsCollection.insertOne({
    code,
    participants: [{  nickname, isHost: true}],
    createdAt: new Date()
  })
  res.json({ roomCode: code });
});

router.post('/join-room', async (req, res) => {
  const { code, nickname } = req.body;
  const room = await Room.findOne({ code });

  if (!room) return res.status(404).json({ error: 'Room not found' });
  if (room.participants.some(p => p.nickname === nickname))
    return res.status(400).json({ error: 'Nickname already taken' });

  room.participants.push({ nickname, isHost: false });
  await room.save();

  res.json({ roomCode: code });
});

module.exports = router;
