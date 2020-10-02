const mongoose = require('mongoose')
const User = mongoose.model('users')

const saveToDb = ({ id, firstName, lastName, email }) => {
  const newUser = {
    id,
    firstName,
    lastName,
    email,
    new: true,
    allowFollowers: true
  }

  return User.findOne({ id })
    .then(user => {
      const response = {
        completed: true,
        error: 'None'
      }

      if (user) {
        response.completed = false
        response.data = user
        response.error = 'User already exists.'
        return response
      }

      new User(newUser).save().then(savedUser => {
        response.data = savedUser
        console.log(response.data)
        return response
      })
    })
    .catch(e => {
      console.log(e)
      return null
    })
}

const findById = ({ id }) => {
  return User.findOne({ id })
    .then(user => {
      if (user) return user
      return null
    })
    .catch(e => {
      console.log(e)
      return null
    })
}

const update = ({ id, updates }) => {
  return User.findOneAndUpdate({ id }, { update: updates }).then(user => {
    if (user) return user
    return null
  }).catch(e => {
    console.log(e)
    return null
  })
}

module.exports = {
  saveToDb,
  findById,
  update
}
