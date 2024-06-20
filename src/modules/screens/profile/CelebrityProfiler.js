import React, { useState, useEffect, useMemo } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TextInput,
  FlatList,
  RefreshControl,
  Image,
} from 'react-native';
import { Pressable, Divider } from 'native-base';
import FastImage from 'react-native-fast-image';
import { SafeAreaView } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/Ionicons';
import MIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import Tooltip from 'react-native-walkthrough-tooltip';
import AIcon from 'react-native-vector-icons/AntDesign';
import FIcon from 'react-native-vector-icons/FontAwesome';
import MAicon from 'react-native-vector-icons/MaterialIcons';
import Modal from 'react-native-modal';
import FEIcon from 'react-native-vector-icons/Feather';
import { Button } from 'react-native-elements';
import { useSelector, useDispatch } from 'react-redux';

import colors from '../../../helpers/colors';
import { wp } from '../../../helpers/scaler';

import {
  ToolTipButton,
  ToolTipContentContainer,
  IconContainer,
} from '../../components';
import { logoutUser } from '../../../store/actions';
import { getUserContent } from '../../../store/getUserContent/actions';
import Post from '../../components/Post';
import Spinner from 'react-native-loading-spinner-overlay';
import { setSubscriptionPrice } from '../../../store/subscriptionPrice/actions';
import { clearAsync } from '../../../helpers/jwt-token-access/accessToken';
import { getUserProfile } from '../../../store/profile/actions';

const Seperator = () => <View style={styles.statSeperator} />;

const ContentSeperator = () => <View style={styles.contentSeperator} />;

const Stat = ({ icon, label, value }) => {
  return (
    <View style={styles.mainStatContainer}>
      <MIcon name={icon} color={colors.green} size={15} />
      <Text style={styles.statLabel}>{`${value} ${label}`}</Text>
    </View>
  );
};

export const CelebrityProfiler = props => {
  const { navigation, celebrity } = props;
  const [showTP, setShowTP] = useState(false);
  const { user_data } = useSelector(state => state.Login);
  const [subPriceModal, setSubPriceModal] = useState(false);
  const { userContent, loading: gettingUserContent } = useSelector(
    state => state.UserContent,
  );

  const { loading: deletingContent } = useSelector(
    state => state.DeleteContent,
  );
  const { loading: settingSubPrice } = useSelector(
    state => state.SetSubscriptionPrice,
  );
  const [subPrice, setSubPrice] = useState(user_data.user?.base_price || 0);

  const dispatch = useDispatch();

  const userId = useMemo(() => user_data?.user._id, [user_data]);

  const { avatar, username, subscriptions, _id, bio } = user_data.user;
  console.log(user_data)

  const closeTP = () => {
    setShowTP(false);
  };

  const _getUserContent = () => dispatch(getUserContent(userId));

  useEffect(() => {
    _getUserContent();
  }, []);

  // useEffect(() => {
  //   dispatch(logoutUser());
  // }, []);

  const _setSubPrice = () => {
    dispatch(
      setSubscriptionPrice(
        {
          amount: subPrice,
        },
        ssbm,
      ),
    );
  };

  const _handleLogout = () => {
    //remove the user login and user data account credentials
    dispatch(logoutUser());
    clearAsync();
    navigation.navigate('Auth', {
      screen: 'Login',
    });
  };

  const ssbm = () => setSubPriceModal(false);

  const ToolTipContent = () => {
    return (
      <ToolTipContentContainer>
        <ToolTipButton
          icon={<AIcon name="edit" color={colors.green} size={wp(14)} />}
          label="Edit Profile"
          onPress={() => {
            closeTP();
            navigation.navigate('SettingsStack', { screen: 'EditProfile' });
          }}
        />
        <ToolTipButton
          icon={<FIcon name="dollar" color={colors.green} size={wp(14)} />}
          label="Subscription Price"
          onPress={() => {
            closeTP();
            setSubPriceModal(true);
          }}
        />
        <ToolTipButton
          icon={<FIcon name="money" color={colors.green} size={wp(14)} />}
          label="Redeem Subscription"
          onPress={() => {
            closeTP();
            navigation.navigate('PaymentStack', {
              screen: 'RedeemSubscription',
            });
          }}
        />
        <ToolTipButton
          icon={<Icon name="wallet" color={colors.green} size={wp(14)} />}
          label="Earnings & Payout History"
          onPress={() => {
            closeTP();
            navigation.navigate('PaymentStack', { screen: 'EarningsHistory' });
          }}
        />
        <ToolTipButton
          icon={<MAicon name="analytics" color={colors.green} size={wp(14)} />}
          label="Analytics"
          onPress={() => {
            closeTP();
            navigation.navigate('AnalyticsPage', { screen: 'AnalyticsPage' });
          }}
        />
        <ToolTipButton
          icon={<Icon name="settings" color={colors.green} size={wp(14)} />}
          label="Settings"
          onPress={() => {
            closeTP();
            navigation.navigate('SettingsStack', { screen: 'Settings' });
          }}
        />
        {/* <ToolTipButton
          icon={<MAicon name="logout" color={colors.red} size={wp(14)} />}
          label="Logout"
          danger
          onPress={() => {
            closeTP();
            navigation.navigate('Auth', { screen: 'Login' });
            dispatch(logoutUser());
          }}
        /> */}
        <ToolTipButton
          icon={<MAicon name="logout" color={colors.red} size={wp(14)} />}
          label="Logout"
          danger
          // onPress={() => {
          //   closeTP();
          //   _handleLogout();
          // }}
          onPress={() => {
            closeTP();
            dispatch(logoutUser());
            clearAsync();
            navigation.navigate('Auth', { screen: 'Login' });
          }}
        />
        {/* <Pressable onPress={() => handleLogout()}>
          <View
            style={{
              display: 'flex',
              flexDirection: 'row',
            }}
          >
            <Image
              source={require('../../../assets/icons/Logout.png')}
              style={{
                width: 15,
                height: 15,
                marginRight: 8,
                marginTop: 2,
              }}
            />
            <Text
              style={[
                styles.text_16,
                {
                  fontWeight: 'bold',
                  color: colors.red,
                },
              ]}
            >
              Logout
            </Text>
          </View>
        </Pressable> */}
      </ToolTipContentContainer>
    );
  };

  return (
    <>
      <Spinner isVisible={deletingContent} />
      <SafeAreaView
        style={{ flex: 1, flexGrow: 1, backgroundColor: colors.bg_black }}
      >
        <ScrollView
          style={{ backgroundColor: colors.bg_black, flexGrow: 1 }}
          contentContainerStyle={styles.container}
          // onRefresh={() => dispatch(getUserContent(userId))}
          refreshControl={
            <RefreshControl
              refreshing={gettingUserContent}
              onRefresh={() => {
                dispatch(getUserContent(userId));
                dispatch(getUserProfile());
              }}
            />
          }
        >
          <View style={[styles.segmentContainer]}>
            <View style={{ alignSelf: 'flex-end' }}>
              <Tooltip
                isVisible={showTP}
                content={<ToolTipContent />}
                placement="bottom"
                onClose={() => setShowTP(!showTP)}
                contentStyle={{
                  backgroundColor: colors.bg_black,
                  shadowColor: 'rgba(255, 255, 255, 0.17)',
                  shadowOffset: {
                    width: 0,
                    height: 4,
                  },
                  shadowOpacity: 0.3,
                  shadowRadius: 4.65,

                  elevation: 8,
                }}
              >
                <IconContainer onPress={() => setShowTP(!showTP)}>
                  <Icon
                    name="ellipsis-vertical-sharp"
                    color="white"
                    size={30}
                  />
                </IconContainer>
              </Tooltip>
            </View>

            <View
              style={{
                marginTop: -10,
                alignSelf: 'center',
                alignItems: 'center',
              }}
            >
              <FastImage source={{ uri: avatar }} style={styles.profilePic} />
            </View>
          </View>

          {/* <Text style={styles.username}>{username}</Text> */}

          <View style={styles.statContainer}>
            <Stat
              icon="newspaper-variant"
              value={userContent?.length}
              label="Contents"
            />
            <Seperator />
            <Stat 
              icon="youtube-subscription" 
              value={subscriptions?.length}
              label="Subscribers" 
            />
          </View>

          <View style={styles.segmentContainer}>
            {/* <Text style={styles.bioText}>
              {bio}
            </Text> */}

            <ContentSeperator />
          </View>

          <View
            style={{
              flex: 1,
              width: '100%',
              padding: 15,
              marginTop: 10,
            }}
          >
            <FlatList
              scrollEnabled={false}
              // style={{ flex: 1 }}
              data={userContent}
              renderItem={({ item }) => <Post post={item} forUser />}
              ItemSeparatorComponent={() => (
                <View style={{ marginVertical: 10 }} />
              )}
            />
          </View>
        </ScrollView>
      </SafeAreaView>

      <Modal isVisible={subPriceModal}>
        <View style={styles.setPriceModalContainer}>
          <View style={styles.modalHeaderContainer}>
            <Text style={styles.modalHeader}>Subscription Page</Text>
            <IconContainer onPress={() => setSubPriceModal(false)}>
              <FEIcon name="x" color="white" size={wp(20)} />
            </IconContainer>
          </View>

          <View style={{ marginVertical: 30 }}>
            <Text style={styles.inputTitle}>Update Subscription Price</Text>
            <TextInput
              style={styles.modalInput}
              placeholder="Price"
              placeholderTextColor={colors.purple}
              defaultValue={String(subPrice)}
              value={String(subPrice)}
              onChangeText={text => setSubPrice(Number(text))}
              keyboardType="number-pad"
            />
          </View>

          <Button
            title="Update"
            containerStyle={{ borderRadius: 15 }}
            loading={settingSubPrice}
            buttonStyle={{ backgroundColor: colors.green, padding: 15 }}
            onPress={_setSubPrice}
          />
        </View>
      </Modal>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    // backgroundColor: colors.bg_black,
    alignItems: 'center',
    // flex: 1,
    paddingVertical: 10,
    flexGrow: 1,
  },
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 10,
  },
  profilePic: {
    width: 120,
    height: 120,
    borderRadius: 75,
  },
  username: {
    textAlign: 'center',
    color: colors.text_white,
    fontWeight: 'bold',
    fontSize: wp(22),
    paddingVertical: 10,
  },
  statContainer: {
    width: '100%',
    // position: 'absolute',
    backgroundColor: colors.border_black,
    // paddingHorizontal: 50,
    paddingVertical: 10,
    flexDirection: 'row',
    // alignItems: 'center',
    justifyContent: 'space-evenly',
  },
  mainStatContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '40%',
    // backgroundColor: 'red',
    justifyContent: 'center',
  },
  statSeperator: {
    borderLeftWidth: 1,
    borderColor: colors.ash,
    height: '100%',
    alignSelf: 'center',
  },
  statLabel: {
    color: colors.ash,
    fontSize: wp(14),
    marginLeft: 10,
    // textAlign: 'center',
  },
  bioText: {
    color: colors.purple,
    textAlign: 'center',
    fontSize: wp(15),
    marginTop: 10,
    marginBottom: 20,
  },
  contentSeperator: {
    borderBottomWidth: 3,
    borderColor: colors.border_black,
    alignSelf: 'center',
    width: '100%',
  },
  segmentContainer: { padding: 15, width: '100%' },
  setPriceModalContainer: {
    backgroundColor: colors.grey,
    padding: 15,
    borderRadius: 15,
  },
  modalHeaderContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  modalHeader: {
    color: 'white',
    fontSize: wp(20),
  },
  inputTitle: {
    color: 'white',
    fontSize: wp(16),
  },
  modalInput: {
    borderColor: colors.bg_grey,
    borderWidth: 1,
    borderRadius: 15,
    paddingLeft: 10,
    color: colors.text_white,
    marginVertical: 10,
    paddingVertical: 10,
  },
});
