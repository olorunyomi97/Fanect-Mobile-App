import React from 'react';
import { View, Text, ScrollView, StyleSheet, StatusBar } from 'react-native';
import colors from '../../../helpers/colors';
import { IconContainer } from '../../components';
import Icon from 'react-native-vector-icons/AntDesign';
import FastImage from 'react-native-fast-image';
import SIcon from 'react-native-vector-icons/SimpleLineIcons';
import { hp, wp } from '../../../helpers/scaler';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ProfileStatContainer } from '../../components/ProfileStatContainer';
import Tooltip from 'react-native-walkthrough-tooltip';
import OIcon from 'react-native-vector-icons/Octicons';

export const ViewProfileScreen = ({ route, navigation }) => {
  const profile = route.params?.celebrity;

  const { avatar, username } = profile;

  return (
    <>
      <StatusBar backgroundColor={colors.bg_black} />
      <SafeAreaView style={{ flex: 1 }}>
        <ScrollView style={styles.container}>
          <View style={styles.headerContainer}>
            <IconContainer
              style={styles.iconContainer}
              onPress={() => navigation.goBack()}
            >
              <Icon name="arrowleft" color="white" size={wp(22)} />
            </IconContainer>
            <View>
              <FastImage source={{ uri: avatar }} style={styles.profilePic} />
              <Text style={styles.profileName}>{username}</Text>
            </View>
            <IconContainer style={styles.iconContainer}>
              <SIcon name="options-vertical" color="white" size={wp(22)} />
            </IconContainer>
          </View>

          <ProfileStatContainer />

          {profile?.bio ? (
            <Text style={styles.bioText}>{profile?.bio}</Text>
          ) : null}

          <View style={{ padding: 15 }}>
            <View style={styles.contentSeperator} />

            <View style={styles.contentHeaderContainer}>
              <Text style={styles.contentText}>Content</Text>

              <IconContainer style={styles.iconContainer}>
                <OIcon name="settings" color="white" size={wp(18)} />
              </IconContainer>
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.bg_black,
  },
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 15,
  },
  profilePic: {
    width: 148,
    height: 148,
    borderRadius: 74,
    resizeMode: 'cover',
  },
  iconContainer: {
    width: wp(40),
    height: hp(40),
    padding: 5,
  },
  profileName: {
    color: colors.text_white,
    fontSize: wp(22),
    textAlign: 'center',
    fontWeight: 'bold',
    marginVertical: 10,
  },
  bioText: {
    fontSize: wp(15),
    marginVertical: 10,
    textAlign: 'center',
    color: colors.text_white,
    textAlign: 'center',
  },
  contentSeperator: {
    borderTopWidth: 2,
    borderColor: colors.border_black,
    marginVertical: 10,
  },
  contentHeaderContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  contentText: {
    color: colors.text_white,
    fontSize: wp(16),
    fontWeight: 'bold',
  },
});
