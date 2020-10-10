export interface IMedia {
  id: string
  ownerId: string
  linkIds: string[]
  uri: string
  created_at: FirebaseFirestore.Timestamp
}

export interface IMediaCreate {
  ownerId: string
  linkId?: string
  uri: string
}

export interface IMediaDelete {
  id: string
  linkId: string
  bucket: string
}

export interface IStorageResponse {
  completed: boolean
  error: string
}
