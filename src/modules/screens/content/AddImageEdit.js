import React, { useState, useLayoutEffect, useEffect } from 'react';
import { View, Text, PermissionsAndroid } from 'react-native';
import CameraRollPicker from 'react-native-camera-roll-picker';
import { Header, Button } from 'react-native-elements';
import FIcon from 'react-native-vector-icons/Feather';

import { wp } from '../../../helpers/scaler';
import colors from '../../../helpers/colors';
import { IconContainer } from '../../components';

export const AddImageEdit = ({ route, navigation }) => {
  const { images, setImage } = route.params;

  const [images2, setImages2] = useState([]);

  console.log('imgs', images);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: () => (
        <Text
          style={{ color: 'white', fontSize: wp(20), fontWeight: 'bold' }}
        >{`${images2.length}/10`}</Text>
      ),
    });
  }, [images]);

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
      <View style={{ flex: 1 }}>
        <View style={{ flex: 1 }}>
          <CameraRollPicker
            callback={setImage}
            groupTypes="All"
            backgroundColor={colors.border_black}
            maximum={10}
            imagesPerRow={2}
            selected={images2}
            assetType="All"
          />
        </View>

        <View style={{ padding: 20 }}>
          <Button
            title="Attach"
            style={{ backgroundColor: colors.green }}
            buttonStyle={{ backgroundColor: colors.green }}
            containerStyle={{ backgroundColor: colors.green, borderRadius: 15 }}
            onPress={() => navigation.goBack()}
          />
        </View>
      </View>
    </View>
  );
};
