export interface IMedia {
  id: string
  ownerId: string
  linkIds: string[]
  uri: string
  created_at: FirebaseFirestore.Timestamp
}

export interface IAvatar {
  id: string
  uri: string
}

export interface IAvatarInput extends IAvatar {}

export interface IMediaCreate {
  ownerId: string
  linkId?: string
  uri: string
}

export interface IMediaDelete {
  id: string
  linkId: string
  bucket: string
  force?: boolean
}

export interface IMediaFindByLinkId {
  id: string
  avatarId?: string
}

export interface IStorageResponse {
  completed: boolean
  error: string
}
