import React from 'react'
import { Story, Meta } from '@storybook/react'

import { SearchResults, SearchResultsProps } from './SearchResults'

export default {
  component: SearchResults,
  title: 'search/SearchResults'
} as Meta

const Template: Story<SearchResultsProps> = args => <SearchResults {...args} />

export const Default = Template.bind({})
Default.args = {
  data: [
    {
      name: 'Test 1',
      url: 'www.test1.com',
      date: '2021-09-29T22:30:00Z',
      img:
        'https://images.unsplash.com/photo-1619525837382-c7015c20e565?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1600&q=80'
    },
    {
      name: 'Test 2',
      url: 'www.test2.com',
      date: '2021-02-28T21:01:08.918608Z',
      img:
        'https://images.unsplash.com/photo-1619299805149-43ddccdc3430?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1575&q=80'
    },
    {
      name: 'Test 3',
      url: 'www.test3.com',
      date: '2019-10-10T14:00:00Z',
      img:
        'https://images.unsplash.com/photo-1595101805915-963ec7b9b45a?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1268&q=80'
    },
    {
      name: 'Test 4',
      url: 'www.test4.com',
      date: '2019-11-15T03:00:00Z',
      img:
        'https://images.unsplash.com/photo-1568160103848-d58542d2322b?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1266&q=80'
    },
    {
      name: 'Test 5',
      url: 'www.test5.com',
      date: '2019-10-09T13:00:00Z',
      img:
        'https://images.unsplash.com/photo-1619340207451-b8dee65a7546?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80'
    }
  ]
}
