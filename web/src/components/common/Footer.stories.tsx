import React from 'react'
import { Story, Meta } from '@storybook/react'

import { Footer, FooterProps } from './Footer'

export default {
  component: Footer,
  title: 'common/Footer'
} as Meta

const Template: Story<FooterProps> = args => <Footer {...args} />

export const Default = Template.bind({})
Default.args = {}
