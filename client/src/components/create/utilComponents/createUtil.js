import dayjs from 'dayjs'
import { DATE_FORMAT, TIME_FORMAT } from '@util'

export const SCREEN = {
  DETAILS: 'Create Details',
  INVITES: 'Create Invites'
}

export const inputMap = [
  {
    label: 'Event Name',
    value: 'name'
  },
  {
    label: 'Event Type',
    value: 'type'
  },
  {
    label: 'Location',
    value: 'location'
  },
  {
    label: 'Date and Time',
    value: 'date',
    disabled: true
  },
  {
    label: 'Website',
    value: 'url',
    keyboardType: 'email-address'
  },
  {
    label: 'Description',
    value: 'description'
  },
  { label: 'Plus One', value: 'plusOne' },
  { label: 'Private', value: 'isPrivate' }
]

export const updateDateTime = ({ newDT, oldDT, mode }) => {
  let newDateTime = null
  if (mode === 'date') {
    const newDate = dayjs(newDT).format(DATE_FORMAT)
    const time = dayjs(oldDT).format(TIME_FORMAT)
    newDateTime = dayjs(`${newDate} ${time}`).toDate()
  }
  if (mode === 'time') {
    const _date = dayjs(oldDT).format(DATE_FORMAT)
    const newTime = dayjs(newDT).format(TIME_FORMAT)
    newDateTime = dayjs(`${_date} ${newTime}`).toDate()
  }

  return newDateTime
}
