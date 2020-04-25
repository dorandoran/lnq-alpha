/**
 * Google Cloud Function Endpoints
 *
 * BE VERY CAREFUL WHEN CHANGING ANYTHING IN HERE AND DEPLOYING!
 *
 * FIREBASE-CLI WILL ASK YOU IF YOU WANT TO DELETE FUNCTIONS WHEN A DEPLOYED
 * CLOUD FUNCTION IS COMMENTED OUT/DELETED. CHOOSE YOUR DECISION WISELY!
 *
 *  When developing backend, create a new endpoint and only deploy that function
 *  Step 1: Create new endpoint
 *  exports.[ENDPOINT NAME] = functions.https.onRequest( CODE HERE )
 *
 *  Step 2: Only deploy test function
 *  firebase deploy --only functions:[ENDPOINT NAME]
 *
 *  Step 3: Change client to point at test endpoint (dev.js => GRAPHQL_ENDPOINT)
 *
 *  Step 4: Profit.
 *
 *  Example: exports.test = functions.https.onRequest()
 */
const functions = require('firebase-functions')

const ApolloServer = require('./gql/server')
const Ingest = require('./indexing/ingest')
const Database = require('./databases/functions')

// GraphQL Endpoint
exports.app = functions.https.onRequest(ApolloServer)

/** Data Consistency Functions */

// Media Cleanup - Deletes Media attached to just-deleted Events
exports.cleanupMedia = Database.cleanupMedia
// User Cleanup - Deletes Users from authentication if deleted from firestore
exports.cleanupUser = Database.cleanupUser

/** Indexing */

// Index janky html page
exports.indexing = functions.https.onRequest(Ingest.indexing)
// Index Action - Delete all Algolia indices and reindex
exports.indexAll = functions.https.onRequest(Ingest.indexAll)
// Update index to match store
exports.updateUserIndex = Ingest.updateEventIndex
exports.updateEventIndex = Ingest.updateUserIndex
