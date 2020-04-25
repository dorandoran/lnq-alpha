const user = data => {
  const additionalAttr = {
    objectID: data.id, // Algolia search id key
    created_at_timestamp: data.created_at.seconds, // Turn firebase Timestamp to seconds
    created_at: data.created_at.toDate(), // Turn firebase Timestamp to Date
    dob_timestamp: data.dob.seconds,
    dob: data.dob.toDate()
  }

  return Object.assign(data, additionalAttr)
}

const event = data => {
  const additionalAttr = {
    objectID: data.id, // Algolia search id key
    created_at_timestamp: data.created_at.seconds,
    created_at: data.created_at.toDate(),
    date_timestamp: data.date.seconds,
    date: data.date.toDate()
  }

  return Object.assign(data, additionalAttr)
}

module.exports = {
  user,
  event
}
