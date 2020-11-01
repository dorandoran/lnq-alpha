import React from 'react'
import PropTypes from 'prop-types'

import useNotification from '@hooks/useNotification'
import useCreateMedia from '@graphql/media/useCreateMedia'
import ActionSelectMedia from '@components/create/utilComponents/actionSelectMedia'

import { theme, CAMERA_SELECTION, BUCKET } from '@util'
import { StyleSheet, View, Text } from 'react-native'
import { Image } from 'react-native-elements'
import { DialogConfirmActions, Loading } from '@common'

const AddMediaModal = ({ event, modalActions }) => {
  const [media, setMedia] = React.useState(null)
  const { throwSuccess } = useNotification()
  const [addMedia, loading] = useCreateMedia({
    onCompleted: () => {
      modalActions.cancelModal()
      throwSuccess('Media successfully added.')
    }
  })

  if (loading) return <Loading backgroundColor='transparent' />

  const handleConfirm = () => {
    if (media.file) {
      addMedia({
        linkId: event.id,
        type: BUCKET.USER,
        image: media.file
      })
    }
  }

  const handleImageSelected = image => {
    setMedia(image)
  }

  return (
    <View style={styles.container}>
      <View style={styles.titleContainer}>
        <Text style={styles.title}>Select Media to Add</Text>
      </View>
      <View style={styles.padding}>
        {media ? (
          <Image
            source={{ uri: media.uri }}
            style={styles.image}
            borderRadius={25}
          />
        ) : (
          <View style={[styles.image, styles.actionContainer]}>
            <ActionSelectMedia
              type={CAMERA_SELECTION}
              color={theme.color.tertiary}
              backgroundColor={theme.color.shadow}
              onComplete={handleImageSelected}
            />
            <ActionSelectMedia
              color={theme.color.tertiary}
              backgroundColor={theme.color.shadow}
              onComplete={handleImageSelected}
            />
          </View>
        )}
      </View>
      <DialogConfirmActions
        disableConfirm={!media}
        handleClose={modalActions.cancelModal}
        handleConfirm={handleConfirm}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    alignSelf: 'center',
    alignItems: 'center',
    width: '90%',
    backgroundColor: theme.color.accent,
    borderRadius: 25,
    paddingHorizontal: '3%'
  },
  titleContainer: {
    paddingBottom: '5%',
    paddingTop: '10%'
  },
  actionContainer: {
    flexDirection: 'row',
    borderWidth: 1,
    borderColor: theme.color.tertiary,
    borderRadius: 25
  },
  padding: {
    padding: '5%'
  },
  image: {
    width: 200,
    height: 200,
    justifyContent: 'space-evenly',
    alignItems: 'center'
  },
  title: {
    fontWeight: 'bold',
    color: theme.color.tertiary,
    fontSize: 18
  }
})

AddMediaModal.propTypes = {
  event: PropTypes.object,
  modalActions: PropTypes.object
}

export default AddMediaModal
