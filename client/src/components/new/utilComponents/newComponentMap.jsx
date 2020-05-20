import React from 'react'

import Avatar from '@components/new/newAvatar'
import UserInformation from '@components/new/newUserInformation'
import Categories from '@components/new/newCategories'
import Suggested from '@components/new/newSuggested'
import Friends from '@components/new/newFriends'

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
  },
  2: {
    componentName: 'categories',
    header: 'Arrange your categories',
    body: 'Arrange categories according to your interest'
  },
  3: {
    componentName: 'suggested',
    header: 'Suggested for you',
    // eslint-disable-next-line quotes
    body: "Here are some profiles we think you'll love"
  },
  4: {
    componentName: 'friends',
    header: 'Search for friends',
    body: ''
  }
}

const NewComponentMap = ({
  userId,
  nextPressed,
  goNext,
  index,
  onFocus,
  resetPressed
}) => {
  const map = [
    {
      index: 0,
      component: function Component() {
        return (
          <Avatar
            key={componentMap[this.index]}
            userId={userId}
            nextPressed={nextPressed}
            goNext={goNext}
            resetPressed={resetPressed}
          />
        )
      }
    },
    {
      index: 1,
      component: function Component() {
        return (
          <UserInformation
            key={componentMap[this.index]}
            userId={userId}
            nextPressed={nextPressed}
            goNext={goNext}
            onFocus={onFocus}
            resetPressed={resetPressed}
          />
        )
      }
    },
    {
      index: 2,
      component: function Component() {
        return (
          <Categories
            key={componentMap[this.index]}
            userId={userId}
            nextPressed={nextPressed}
            goNext={goNext}
          />
        )
      }
    },
    {
      index: 3,
      component: function Component() {
        return (
          <Suggested
            key={componentMap[this.index]}
            userId={userId}
            nextPressed={nextPressed}
            goNext={goNext}
          />
        )
      }
    },
    {
      index: 4,
      component: function Component() {
        return (
          <Friends
            key={componentMap[this.index]}
            userId={userId}
            nextPressed={nextPressed}
            goNext={goNext}
          />
        )
      }
    }
  ]

  return map[index].component() || null
}

export default NewComponentMap
