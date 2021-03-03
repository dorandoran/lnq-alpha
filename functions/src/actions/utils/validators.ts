export function hasOnlyDigits(value: string) {
  state: return /^[0-9]+$/.test(value)
}

export function hasOnlyLetters(value: string) {
  return /^[a-zA-Z]+$/.test(value)
}

export function isUsState(value: string) {
  return (
    US_STATES_LIST.findIndex(
      e =>
        e.state.toLowerCase() === value.toLowerCase() ||
        e.abbreviation.toLowerCase() === value.toLowerCase()
    ) !== -1
  )
}

export function isCity(value: string, idx: number, textArr: string[]) {
  if (value.substr(-1).includes(',')) {
    return true
  }

  if (idx !== textArr.length - 1 && isUsState(textArr[idx + 1])) {
    return true
  }
  return false
}

/**
 * Converts the given enum to a map of the keys to the values.
 * @param enumeration The enum to convert to a map.
 */
export function enumToMap(enumeration: any): Map<string, string> {
  const map = new Map<string, string>()
  for (let key in enumeration) {
    //TypeScript does not allow enum keys to be numeric
    if (!isNaN(Number(key))) continue

    const val = enumeration[key] as string
    //TypeScript does not allow enum value to be null or undefined
    if (val !== undefined && val !== null) map.set(key, val)
  }

  return map
}

export function enumToArray(enumeration: any): Array<string> {
  const map = enumToMap(enumeration)
  return Array.from(map.values())
}

const US_STATES_LIST = [
  { state: 'Alabama', abbreviation: 'AL' },
  { state: 'Alaska', abbreviation: 'AK' },
  { state: 'Arizona', abbreviation: 'AZ' },
  { state: 'Arkansas', abbreviation: 'AR' },
  { state: 'California', abbreviation: 'CA' },
  { state: 'Colorado', abbreviation: 'CO' },
  { state: 'Connecticut', abbreviation: 'CT' },
  { state: 'Delaware', abbreviation: 'DE' },
  { state: 'Florida', abbreviation: 'FL' },
  { state: 'Georgia', abbreviation: 'GA' },
  { state: 'Hawaii', abbreviation: 'HI' },
  { state: 'Idaho', abbreviation: 'ID' },
  { state: 'Illinois', abbreviation: 'IL' },
  { state: 'Indiana', abbreviation: 'IN' },
  { state: 'Iowa', abbreviation: 'IA' },
  { state: 'Kansas', abbreviation: 'KS' },
  { state: 'Kentucky', abbreviation: 'KY' },
  { state: 'Louisiana', abbreviation: 'LA' },
  { state: 'Maine', abbreviation: 'ME' },
  { state: 'Maryland', abbreviation: 'MD' },
  { state: 'Massachusetts', abbreviation: 'MA' },
  { state: 'Michigan', abbreviation: 'MI' },
  { state: 'Minnesota', abbreviation: 'MN' },
  { state: 'Mississippi', abbreviation: 'MS' },
  { state: 'Missouri', abbreviation: 'MO' },
  { state: 'Montana', abbreviation: 'MT' },
  { state: 'Nebraska', abbreviation: 'NE' },
  { state: 'Nevada', abbreviation: 'NV' },
  { state: 'New Hampshire', abbreviation: 'NH' },
  { state: 'New Jersey', abbreviation: 'NJ' },
  { state: 'New Mexico', abbreviation: 'NM' },
  { state: 'New York', abbreviation: 'NY' },
  { state: 'North Carolina', abbreviation: 'NC' },
  { state: 'North Dakota', abbreviation: 'ND' },
  { state: 'Ohio', abbreviation: 'OH' },
  { state: 'Oklahoma', abbreviation: 'OK' },
  { state: 'Oregon', abbreviation: 'OR' },
  { state: 'Pennsylvania', abbreviation: 'PA' },
  { state: 'Rhode Island', abbreviation: 'RI' },
  { state: 'South Carolina', abbreviation: 'SC' },
  { state: 'South Dakota', abbreviation: 'SD' },
  { state: 'Tennessee', abbreviation: 'TN' },
  { state: 'Texas', abbreviation: 'TX' },
  { state: 'Utah', abbreviation: 'UT' },
  { state: 'Vermont', abbreviation: 'VT' },
  { state: 'Virginia', abbreviation: 'VA' },
  { state: 'Washington', abbreviation: 'WA' },
  { state: 'West Virginia', abbreviation: 'WV' },
  { state: 'Wisconsin', abbreviation: 'WI' },
  { state: 'Wyoming', abbreviation: 'WY' }
]
