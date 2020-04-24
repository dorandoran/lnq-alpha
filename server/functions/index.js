/**
 * Google Cloud Function Endpoints
 *
 * BE VERY CAREFUL WHEN CHANGING ANYTHING IN HERE AND DEPLOYING!
 *
 * FIREBASE-CLI WILL ASK YOU IF YOU WANT TO DELETE FUNCTIONS WHEN A DEPLOYED
 * CLOUD FUNCTION IS COMMENTED OUT/DELETED. CHOOSE YOUR DECISION WISELY!
 *
 */
const functions = require('firebase-functions')
const apolloServer = require('./gql/server')

const Media = require('./databases/store/media')

// GraphQL Endpoint
exports.app = functions.https.onRequest(apolloServer)

// Media Cleanup - Deletes Media attached to just-deleted Events
exports.cleanupMedia = functions.firestore
  .document('events/{eventId}')
  .onDelete(async snap => {
    const event = snap.data()
    await Media.deleteFromStore({ id: event.avatarId })
  })

/*  When developing backend, create a new endpoint and only deploy that function
    Step 1: Create new endpoint
    exports.[ENDPOINT NAME] = functions.https.onRequest( CODE HERE )

    Step 2: Only deploy test function
    firebase deploy --only functions:[ENDPOINT NAME]

    Step 3: Change client to point at test endpoint (dev.js => GRAPHQL_ENDPOINT)

    Step 4: Profit.
*/

// exports.test = functions.https.onRequest()
