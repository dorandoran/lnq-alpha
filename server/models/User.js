const mongoose = require('mongoose')
const { Schema } = mongoose

const userSchema = new Schema({
  id: String,
  username: String,
  firstName: String,
  lastName: String,
  email: String,
  dob: Date,
  description: String,
  avatarUrl: String,
  website: String,
  new: Boolean,
  numEvents: Number
  numFollowers: Number,
  numFollowing: Number,
  categories: [String],
  allowFollowers: Boolean,
  created_at: { type: Date, default: Date.now }
})

mongoose.model('users', userSchema)
