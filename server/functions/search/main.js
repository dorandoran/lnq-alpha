const SearchIndex = require('../services/algolia')

const base = ({ bucket, query, filters, page }) => {
  const index = SearchIndex[bucket]

  return index
    .search(query, { filters, page })
    .then(({ hits }) => {
      console.log('hits ', hits)
      return hits
    })
    .catch(e => console.log(e))
}

module.exports = { base }
