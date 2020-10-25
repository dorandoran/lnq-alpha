import React from 'react'
import PropTypes from 'prop-types'
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete'

import { StyleSheet } from 'react-native'
import { theme } from '@util'
import config from '@config'

const LocationAutoComplete = ({ handleSelect }) => {
  return (
    <GooglePlacesAutocomplete
      placeholder='Search'
      minLength={2}
      enablePoweredByContainer={false}
      returnKeyType='search'
      listViewDisplayed='false'
      fetchDetails={true}
      renderDescription={row => row.description}
      onPress={(_, details = null) => {
        const location = {
          id: details?.place_id,
          latitude: details?.geometry?.location.lat,
          longitude: details?.geometry?.location.lng,
          text: details?.formatted_address
        }
        handleSelect(location)
      }}
      getDefaultValue={() => ''}
      query={{
        key: config.GOOGLE.PLACES_API_KEY,
        language: 'en',
        types: 'address',
        components: 'country:us'
      }}
      styles={{ ...styles }}
      currentLocation={true}
      currentLocationLabel='Current location'
      nearbyPlacesAPI='GooglePlacesSearch'
      GooglePlacesDetailsQuery={{ fields: ['formatted_address', 'geometry'] }}
      debounce={500}
    />
  )
}

const styles = StyleSheet.create({
  textInputContainer: {
    alignSelf: 'center',
    alignItems: 'center',
    backgroundColor: theme.color.background,
    borderRadius: 25,
    borderBottomWidth: 0,
    borderTopWidth: 0
  },
  listView: {
    backgroundColor: theme.color.accent
  },
  row: {
    padding: 0,
    alignItems: 'center'
  },
  textInput: {
    borderRadius: 25,
    backgroundColor: theme.color.background,
    color: theme.color.tertiary,
    fontSize: 18,
    margin: 0,
    marginBottom: 5,
    paddingHorizontal: '3%',
    height: 40
  },
  description: {
    fontWeight: 'bold',
    color: theme.color.tertiary,
    backgroundColor: theme.color.accent
  },
  predefinedPlacesDescription: {
    color: '#1faadb'
  },
  poweredContainer: {
    backgroundColor: theme.color.accent
  }
})

LocationAutoComplete.propTypes = {
  handleSelect: PropTypes.func.isRequired
}

export default LocationAutoComplete
