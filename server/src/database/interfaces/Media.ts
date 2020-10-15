import { createReadStream } from 'fs'
import { EBuckets } from '.'

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
  bucket: EBuckets
  image: IFile
}

export interface IMediaRemove {
  id: string
  linkId: string
  bucket: EBuckets
  force?: boolean
}

export interface IMediaRemoveFromStorage {
  id: string
  bucket: EBuckets
}

export interface IMediaFindByLinkId {
  id: string
  avatarId?: string
}

export interface IStorageResponse {
  completed: boolean
  error: string
}

export interface IFile {
  filename: string
  mimetype: string
  encoding: string
  createReadStream: typeof createReadStream
}
