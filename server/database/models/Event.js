const mongoose = require('mongoose')
const { Schema } = mongoose

const eventSchema = new Schema({
  id: String,
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
