import mongoose from 'mongoose'
const { Schema } = mongoose

const eventSchema = new Schema({
  id: {
    type: String,
    unique: true,
    required: true,
    default: () => new mongoose.Types.ObjectId()
  },
  ownerId: String,
  avatarId: String,
  name: String,
  type: String,
  date: Date,
  location: {
    latitude: Number,
    longitude: Number,
    text: String
  },
  website: String,
  description: String,
  likes: [String],
  plusOne: Boolean,
  isPrivate: Boolean,
  created_at: { type: Date, default: Date.now }
})

mongoose.model('events', eventSchema)
