import React from 'react'
import { Story, Meta } from '@storybook/react'

import { SearchBar, SearchBarProps } from './SearchBar'

export default {
  component: SearchBar,
  title: 'search/SearchBar'
} as Meta

const Template: Story<SearchBarProps> = args => <SearchBar {...args} />

export const Default = Template.bind({})
Default.args = {
  placeholder: 'Search',
  value: ''
}
