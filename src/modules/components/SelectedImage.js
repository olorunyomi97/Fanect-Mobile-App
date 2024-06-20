import React from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/Feather';

import { hp, wp } from '../../helpers/scaler';
import colors from '../../helpers/colors';
import FastImage from 'react-native-fast-image';

export const SelectedImage = ({ image, onDelete }) => {
  const isLocal = typeof image === 'object';

  return (
    <View style={styles.container}>
      {isLocal ? (
        <FastImage source={image} style={styles.image} />
      ) : (
        <FastImage source={{ uri: image }} style={styles.image} />
      )}
      <View style={styles.editContainer}>
        <TouchableOpacity
          onPress={() => {
            onDelete(isLocal ? image : image);
          }}
          style={styles.iconContainer}
        >
          <Icon name="x" color="white" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: wp(171),
    height: hp(186),
    borderRadius: 15,
    overflow: 'hidden',
  },
  image: {
    width: '100%',
    height: '100%',
    borderRadius: 15,
    marginLeft: 10,
    zIndex: 1,
    elevation: 1,
  },
  editContainer: {
    zIndex: 1,
    elevation: 1,
    position: 'absolute',
    width: '100%',
    height: '100%',
  },
  iconContainer: {
    padding: 5,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.green,
    position: 'absolute',
    top: 10,
    right: 10,
    borderRadius: 5,
  },
});
