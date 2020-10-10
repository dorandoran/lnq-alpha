import mongoose from 'mongoose'
const { Schema } = mongoose

const inviteSchema = new Schema({
  id: {
    type: String,
    unique: true,
    required: true,
    default: () => new mongoose.Types.ObjectId()
  },
  recipientId: String,
  senderId: String,
  eventId: String,
  message: String,
  answer: String,
  updated_at: { type: Date, default: Date.now },
  created_at: { type: Date, default: Date.now }
})

mongoose.model('invites', inviteSchema)
