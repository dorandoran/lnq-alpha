export interface IMedia {
  id: string
  ownerId: string
  linkIds: string[]
  uri: string
  created_at: Date
}

export interface IMediaCreate {
  ownerId: string
  linkId?: string
  uri: string
}
