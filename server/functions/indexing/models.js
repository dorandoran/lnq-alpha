/**
 * NOTE: Not being used but still debating if we might use this...
 * Leaving the file for now.
 */
const user = data => {
  return {
    objectID: data.id,
    name: data.name,
    username: data.username,
    email: data.email
  }
}

const event = data => {
  return {
    objectID: data.id,
    name: data.name,
    date: data.date,
    description: data.description,
    isPrivate: data.isPrivate,
    location: data.location,
    ownerId: data.ownerId,
    type: data.type,
    avatarId: data.avatarId
  }
}

module.exports = {
  user,
  event
}
