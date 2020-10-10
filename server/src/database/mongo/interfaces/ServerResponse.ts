import mongoose from 'mongoose'

interface ServerResponse {
  completed: Boolean
  error: string
  data: mongoose.Document | null
}

export interface ISaveResponse extends ServerResponse {}
