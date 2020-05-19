import React from 'react'
import Avatar from '@components/new/newAvatar'
import UserInformation from '@components/new/newUserInformation'

export const componentMap = {
  0: {
    componentName: 'avatar',
    header: 'Choose a profile photo',
    body: 'Choose your favorite selfie, make it fun!'
  },
  1: {
    componentName: 'information',
    header: 'Describe yourself',
    body: 'Tell us all what makes you unique'
  }
}

const NewComponentMap = ({ userId, nextPressed, goNext, index, onFocus }) => {
  const map = [
    {
      index: 0,
      component: function Component() {
        return (
          <Avatar
            key={this.index}
            userId={userId}
            nextPressed={nextPressed}
            goNext={goNext}
          />
        )
      }
    },
    {
      index: 1,
      component: function Component() {
        return (
          <UserInformation
            key={this.index}
            userId={userId}
            nextPressed={nextPressed}
            goNext={goNext}
            onFocus={onFocus}
          />
        )
      }
    }
  ]

  return map[index].component() || null
}

export default NewComponentMap
