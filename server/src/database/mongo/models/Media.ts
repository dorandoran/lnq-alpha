import mongoose from 'mongoose'
const { Schema } = mongoose

const mediaSchema = new Schema({
  id: {
    type: String,
    unique: true,
    required: true,
    default: () => new mongoose.Types.ObjectId()
  },
  ownerId: String,
  linkIds: [String],
  uri: String,
  created_at: { type: Date, default: Date.now }
})

mongoose.model('media', mediaSchema)
