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

/**
 * LISTENER-TRIGGER FUNCTIONS
 */

// GraphQL Endpoint
exports.app = functions.https.onRequest(ApolloServer)

// Media Cleanup - Deletes Media attached to just-deleted Events
exports.cleanupMedia = Database.cleanupMedia

// Update index to match store
exports.updateUserIndex = Ingest.updateEventIndex
exports.updateEventIndex = Ingest.updateUserIndex

/**
 * ACTION-TRIGGER FUNCTIONS
 */

// Index data into Algolia
exports.indexing = functions.https.onRequest(Ingest.indexing)
exports.indexAll = functions.https.onRequest(Ingest.indexAll)
