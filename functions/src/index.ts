import * as functions from 'firebase-functions'
import Server from './server'
import {
  deleteMediaFromEvents,
  deleteMediaFromStorage,
  deleteUserFromAuth
} from './actions/consistency'
import { indexAll, updateUserIndex, updateEventIndex } from './actions/algolia'
import { automaticallyAllowFollowers } from './actions/automatedTasks'
// import { search } from './actions/search'

exports.app = functions.https.onRequest(Server)

/** Firebase Consistency Functions */
exports.deleteMediaFromEvents = deleteMediaFromEvents
exports.deleteMediaFromStorage = deleteMediaFromStorage
exports.deleteUserFromAuth = deleteUserFromAuth

/** Algolia Consistency Functions */
exports.indexAll = functions.https.onRequest(indexAll)
exports.updateUserIndex = updateUserIndex
exports.updateEventIndex = updateEventIndex

/** Automated User Tasks */
exports.allowFollowers = automaticallyAllowFollowers

/** Search Functions */
// exports.search = functions.https.onRequest(search)
