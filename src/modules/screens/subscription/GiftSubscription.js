import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  Share,
  StatusBar,
} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import { useNavigation } from '@react-navigation/native';

import colors from '../../../helpers/colors';
import { hp, wp } from '../../../helpers/scaler';

const giftSubImage = require('../../../assets/images/gift-subscription.png');

export const GiftSubscription = ({ route }) => {
  const params = route.params;
  const navigation = useNavigation();

  console.log('GiftSubscription', params);

  // const dt = {
  //   celeb_username: 'cheese',
  //   gift_code: 'DnCrTkJDsUpsI2G',
  //   subscription_count: 1,
  // };

  const share = async () => {
    try {
      const result = await Share.share({
        message: params?.gift_code,
      });
      if (result.action === Share.sharedAction) {
        if (result.activityType) {
          // shared with activity type of result.activityType
        } else {
          // shared
        }
      } else if (result.action === Share.dismissedAction) {
        // dismissed
      }
    } catch (error) {
      // alert(error.message);
    }
  };

  return (
    <>
      <StatusBar backgroundColor={colors.green} barStyle="light-content" />
      <View style={styles.container}>
        <View>
          <Image source={giftSubImage} style={styles.image} />

          <View style={{ marginTop: 10, width: '90%', alignSelf: 'center' }}>
            <Text style={styles.headerText}>
              share this code with your friend so they can get a one month free
              subscription to the celebrity.
            </Text>
          </View>
        </View>

        <View style={{ width: '100%' }}>
          <Text style={styles.copyTitle}>Share Your Code</Text>

          <View
            style={{
              flexDirection: 'row',
              backgroundColor: 'rgba(196, 196, 196, 0.3)',
              width: '100%',
              height: hp(48),
              borderRadius: 10,
              alignItems: 'center',
            }}
          >
            <View style={{ flex: 1, paddingLeft: 15 }}>
              <Text style={{ fontSize: wp(14), color: 'white' }}>
                {params?.gift_code}
              </Text>
            </View>
            <TouchableOpacity
              onPress={share}
              style={{
                width: wp(48),
                height: hp(48),
                borderRadius: 10,
                backgroundColor: 'white',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <Icon name="link-2" color={colors.green} size={wp(20)} />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.green,
    flex: 1,
    padding: 15,
    alignItems: 'center',
    justifyContent: 'space-evenly',
  },
  image: {
    width: wp(121),
    height: hp(125),
    resizeMode: 'contain',
    alignSelf: 'center',
  },
  headerText: {
    color: 'white',
    fontSize: wp(14),
    textAlign: 'center',
  },
  copyTitle: {
    fontSize: wp(12),
    color: 'white',
    marginBottom: 5,
  },
});
