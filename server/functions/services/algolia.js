const algoliasearch = require('algoliasearch')
const config = require('../config/credentials.json')

const client = algoliasearch(config.algolia.api_key, config.algolia.admin_key)

module.exports = {
  users: client.initIndex('users'),
  events: client.initIndex('events')
}
