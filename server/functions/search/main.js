/* eslint-disable consistent-return */
const SearchIndex = require('../services/algolia')
const Follow = require('../databases/store/follow')

const base = ({ bucket, query, filters, page }) => {
  const index = SearchIndex[bucket]

  return index
    .search(query, { filters, page })
    .then(({ hits }) => {
      return hits
    })
    .catch(e => console.log(e))
}

const user = async ({ userId, query, page, following = [] }) => {
  const index = SearchIndex.users

  // Create Filter increasing score by following
  let filters = `NOT id:${userId}`
  if (following.length) {
    filters += ` OR (id:${following.join('<score=3> OR id:')}<score=3>)`
  }

  // return search
  return index
    .search(query, { filters, page })
    .then(({ hits }) => {
      const newHits = hits.map(hit => {
        hit.isFollowing = following.includes(hit.id)
        return hit
      })
      return newHits
    })
    .catch(e => console.log(e))
}

module.exports = { base, user }
