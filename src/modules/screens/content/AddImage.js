import React, { useEffect, useState } from 'react';
import { View, StyleSheet, TouchableOpacity, Platform } from 'react-native';
import CameraRollPicker from 'react-native-camera-roll-picker';
import { Button, Header } from 'react-native-elements';
import FIcon from 'react-native-vector-icons/Feather';
import { useDispatch } from 'react-redux';

import colors from '../../../helpers/colors';
import { wp, hp } from '../../../helpers/scaler';
import { addImage } from '../../../store/content/celebrity/actions';

const IconContainer = ({ children, onPress }) => (
  <TouchableOpacity onPress={onPress} style={styles.iconContainer}>
    {children}
  </TouchableOpacity>
);

export const AddImage = ({ navigation }) => {
  const dispatch = useDispatch();

  const [images2, setImages2] = useState([]);

  const _setImage = payload => {
    setImages2([...payload]);
  };

  const attachImage = () => {
    dispatch(addImage(images2));
    navigation.goBack();
  };

  useEffect(() => {
    if (Platform.OS === 'android') {
      (async () => {
        try {
          const granted = await PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
          );
          if (granted === PermissionsAndroid.RESULTS.GRANTED) {
            setRollPermissionExists(true);
          } else {
            setRollPermissionExists(false);
          }
        } catch (err) {
          console.warn(err);
        }
      })();
    }
  }, []);

  return (
    <View style={{ flex: 1, backgroundColor: colors.border_black }}>
      <Header
        containerStyle={{
          backgroundColor: colors.fanectBg,
          elevation: 0,
          shadowOpacity: 0,
          borderBottomWidth: 0,
          borderWidth: 0,
          alignItems: 'center',
          justifyContent: 'center',
        }}
        centerComponent={{
          text: `${images2.length}/10`,
          style: { color: 'white', fontSize: wp(20), fontWeight: 'bold' },
        }}
        leftComponent={
          <IconContainer onPress={() => navigation.goBack()}>
            <FIcon name="x" color="white" size={wp(20)} />
          </IconContainer>
        }
      />
      <View style={{ flex: 1 }}>
        <View style={{ flex: 1 }}>
          <CameraRollPicker
            callback={_setImage}
            groupTypes="All"
            backgroundColor={colors.border_black}
            maximum={10}
            imagesPerRow={2}
            selected={images2}
            assetType="All"
            // selectedMarker={() => <SelectedMarker />}
          />
        </View>

        <View style={{ padding: 20 }}>
          <Button
            title="Attach"
            style={{ backgroundColor: colors.green }}
            buttonStyle={{ backgroundColor: colors.green }}
            containerStyle={{ backgroundColor: colors.green, borderRadius: 15 }}
            onPress={attachImage}
          />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  iconContainer: {
    borderRadius: 12,
    padding: 5,
    backgroundColor: colors.bg_grey_opacity,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
