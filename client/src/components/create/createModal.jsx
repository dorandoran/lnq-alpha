import React, { Fragment, useState, useEffect } from 'react'
import PropTypes from 'prop-types'

import { theme } from '@util'
import {
  View,
  StyleSheet,
  TextInput,
  Text,
  TouchableOpacity
} from 'react-native'
import Modal from 'react-native-modal'
import { Icon } from 'react-native-elements'
import { LocationAutoComplete, KeyboardDismiss } from '@common'
import { SCREEN_HEIGHT } from '@util'

const CreateModal = ({ modalValue, clearValue, detail, handleChange }) => {
  const [tempVar, setTempVar] = useState(detail || null)

  useEffect(() => {
    if (modalValue && detail) setTempVar(detail)
    return () => {
      setTempVar(null)
    }
  }, [modalValue])

  const handleSelect = value => {
    setTempVar(value)
  }

  const handleClose = () => {
    setTempVar(null)
    clearValue()
  }

  const handleSave = () => {
    if (tempVar) handleChange(tempVar)
    handleClose()
  }

  const isDisabled = () => {
    return !tempVar || tempVar === detail
  }

  if (!modalValue) return null
  const { label, value } = modalValue

  return (
    <Modal isVisible={!!value}>
      <KeyboardDismiss>
        <View style={styles.modalView}>
          <View style={styles.header}>
            <TouchableOpacity onPress={handleClose}>
              <Icon
                type='ionicon'
                name='md-close'
                color={theme.color.tertiary}
              />
            </TouchableOpacity>
            <Text style={styles.label}>{label}</Text>
            <TouchableOpacity disabled={isDisabled()} onPress={handleSave}>
              <Icon
                type='ionicon'
                name='md-checkmark'
                color={isDisabled() ? theme.color.error : theme.color.success}
              />
            </TouchableOpacity>
          </View>

          {value === 'location' && (
            <Fragment>
              <Text style={[styles.text, styles.location]}>
                {detail?.text || 'None'}
              </Text>
              <LocationAutoComplete handleSelect={handleSelect} />
            </Fragment>
          )}

          {value === 'description' && (
            <View style={styles.descriptionContainer}>
              <TextInput
                placeholder='Enter a description...'
                placeholderTextColor={theme.color.accent}
                style={styles.inputContainer}
                onChangeText={text => setTempVar(text)}
                value={tempVar}
                maxLength={300}
                multiline
                numberOfLines={5}
              />
            </View>
          )}
        </View>
      </KeyboardDismiss>
    </Modal>
  )
}

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    marginBottom: '1%',
    width: '100%',
    justifyContent: 'space-around'
  },
  location: {
    marginBottom: '4%',
    fontSize: 16,
    fontStyle: 'italic',
    color: theme.color.tertiary,
    flexWrap: 'wrap'
  },
  modalView: {
    margin: '1%',
    backgroundColor: theme.color.accent,
    height: SCREEN_HEIGHT / 2.5,
    borderRadius: 25,
    padding: '4%',
    alignItems: 'center'
  },
  label: {
    color: theme.color.tertiary,
    fontWeight: 'bold',
    fontSize: 18
  },
  inputContainer: {
    textAlignVertical: 'top',
    height: SCREEN_HEIGHT / 4,
    color: theme.color.tertiary,
    fontSize: 18,
    backgroundColor: theme.color.background,
    borderRadius: 5,
    padding: '5%',
    marginLeft: '5%',
    marginRight: '5%',
    borderBottomWidth: 0
  },
  descriptionContainer: {
    flex: 1,
    width: '100%',
    justifyContent: 'center',
    marginTop: SCREEN_HEIGHT / 20
  }
})

CreateModal.propTypes = {
  modalValue: PropTypes.object,
  clearValue: PropTypes.func,
  detail: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
  handleChange: PropTypes.func
}

export default CreateModal
