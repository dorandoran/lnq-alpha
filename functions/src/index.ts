import * as functions from 'firebase-functions'
import {
  deleteMediaFromEvents,
  deleteMediaFromStorage,
  deleteUserFromAuth
} from './actions/consistency'
import { indexAll, updateUserIndex, updateEventIndex } from './actions/search'

/** Firebase Consistency Functions */
exports.deleteMediaFromEvents = deleteMediaFromEvents
exports.deleteMediaFromStorage = deleteMediaFromStorage
exports.deleteUserFromAuth = deleteUserFromAuth

/** Algolia Consistency Functions */
exports.indexAll = functions.https.onRequest(indexAll)
exports.updateUserIndex = updateUserIndex
exports.updateEventIndex = updateEventIndex
