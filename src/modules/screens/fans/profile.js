/* eslint-disable react-native/no-inline-styles */
import React, { useEffect, useState, useCallback, useRef } from 'react';
import {
  View,
  Text,
  Image,
  ScrollView,
  RefreshControl,
  SafeAreaView,
} from 'react-native';
import { Avatar } from 'react-native-elements';
import Spinner from 'react-native-spinkit';
import { Pressable, Divider } from 'native-base';
import { connect, useSelector, useDispatch } from 'react-redux'; //Redux
import Icon from 'react-native-vector-icons/Ionicons';
import FIcon from 'react-native-vector-icons/FontAwesome';

//styles
import styles from '../../../assets/styles/styles';
import colors from '../../../helpers/colors';
import Tooltip from 'react-native-walkthrough-tooltip';
import {
  ToolTipButton,
  ToolTipContentContainer,
  IconContainer,
} from '../../components';
import FastImage from 'react-native-fast-image';

//redux
import { getUserSubscriptions } from '../../../store/profile/actions';
import PageLoading from '../../partials/loading/pageLoading';
import Subscribers from './subscribers';
import { readData } from '../../../helpers/async_storage_helper';
import { logoutUser } from '../../../store/actions';
import { wp } from '../../../helpers/scaler';
import MAicon from 'react-native-vector-icons/MaterialIcons';
import { clearAsync } from '../../../helpers/jwt-token-access/accessToken';
import { getUserProfile } from '../../../store/profile/actions';

const Profile = props => {
  const { subscriptions, navigation } = props;

  const { user_data } = useSelector(state => state.Login);
  const [showTP, setShowTP] = useState(false);
  const [page_loading, set_page_loading] = useState(false);
  const { userContent, loading: gettingUserContent } = useSelector(
    state => state.UserContent,
  );

  const dispatch = useDispatch();

  const tooltipRef = useRef(<Tooltip />);

  const _handleLogout = () => {
    //remove the user login and user data account credentials
    dispatch(logoutUser());
    clearAsync();
    navigation.navigate('Auth', {
      screen: 'Login',
    });
  };

  // const _getUserContent = () => dispatch(getUserContent(userId));

  const closeTP = () => {
    setShowTP(false);
  };

  useEffect(() => {
    props.getUserSubscriptions();
    set_page_loading(false);
  }, [getUserSubscriptions]);

  // useEffect(() => {
  //     getCurrentUser();
  // }, []);

  // const onRefresh = useCallback(() => {
  //   // set_refreshing(true);
  //   getCurrentUser();
  // }, []);

  // useEffect(() => {
  //   props.getUserSubscriptions();
  //   set_page_loading(false);
  // }, [getUserSubscriptions]);

  // useEffect(() => {
  //     getCurrentUser();
  // }, []);

  // const getCurrentUser = async () => {
  //     const auth_user = await readData('auth_user');
  //     set_current_user(auth_user.user);
  // };

  const ToolTipContent = () => {
    return (
      <ToolTipContentContainer>
        <ToolTipButton
          icon={<Icon name="settings" color={colors.green} size={wp(14)} />}
          label="Settings"
          onPress={() => {
            closeTP();
            navigation.navigate('SettingsStack', { screen: 'Settings' });
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
          icon={<MAicon name="logout" color={colors.red} size={wp(14)} />}
          label="Logout"
          danger
          onPress={() => {
            closeTP();
            _handleLogout();
          }}
        />
      </ToolTipContentContainer>
    );
  };

  return (
    <>
      <View style={styles.body}>
        {user_data == {} || !user_data ? (
          <PageLoading type={'9CubeGrid'} />
        ) : (
          <>
            <SafeAreaView style={styles.body}>
              <ScrollView
                style={{
                  backgroundColor: colors.bg_black,
                  flexGrow: 1,
                }}
                contentContainerStyle={styles.container}
                // onRefresh={() => dispatch(getUserContent(userId))}
                refreshControl={
                  <RefreshControl
                    refreshing={gettingUserContent}
                    onRefresh={() => dispatch(getUserProfile())}
                  />
                }
              >
                <View>
                  <View style={[{ marginTop: 5, width: '100%' }]}>
                    <View
                      style={{
                        display: 'flex',
                      }}
                    >
                      <View
                        style={{
                          display: 'flex',
                          flexDirection: 'row',
                          justifyContent: 'flex-end',
                          alignContent: 'flex-end',
                          alignItems: 'flex-end',
                        }}
                      >
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
                            alignContent: 'flex-end',
                            shadowOpacity: 0.3,
                            shadowRadius: 4.65,
                            elevation: 8,
                          }}
                        >
                          <IconContainer
                            style={{ width: '100%' }}
                            onPress={() => setShowTP(!showTP)}
                          >
                            <Icon
                              name="ellipsis-vertical-sharp"
                              color="white"
                              size={30}
                            />
                          </IconContainer>
                        </Tooltip>
                      </View>
                    </View>
                    <View
                      style={{
                        marginTop: -25,
                        alignSelf: 'center',
                        alignItems: 'center',
                      }}
                    >
                      <FastImage
                        source={{ uri: user_data.user.avatar }}
                        style={{
                          width: 120,
                          height: 120,
                          borderRadius: 74,
                        }}
                      />
                    </View>

                    <View style={[]}>
                      <Text
                        style={[
                          styles.text_22,
                          {
                            fontWeight: 'bold',
                            marginRight: 'auto',
                            marginLeft: 'auto',
                            marginBottom: 15,
                          },
                        ]}
                      >
                        {user_data.user.username}
                        {'   '}
                        <Pressable
                          onPress={() => {
                            props.navigation.navigate('SettingsStack', {
                              screen: 'EditProfile',
                              params: {
                                user: user_data.user,
                              },
                            });
                          }}
                        >
                          <Image
                            source={require('../../../assets/icons/Write.png')}
                            style={{
                              width: 24,
                              height: 24,
                            }}
                          />
                        </Pressable>
                      </Text>
                      <Divider
                        style={{
                          width: '30%',
                          marginRight: 'auto',
                          marginLeft: 'auto',
                          borderWidth: 2,
                          borderColor: colors.white,
                          borderRadius: 10,
                          opacity: 0.1,
                        }}
                      />
                    </View>

                    <View style={{ marginTop: 30 }}>
                      <View>
                        <Text
                          style={[
                            styles.text_16,
                            {
                              fontWeight: 'bold',
                              marginBottom: 25,
                            },
                          ]}
                        >
                          {`${subscriptions.length} Subscription(s)`}
                        </Text>
                      </View>
                      <Subscribers subscriptions={subscriptions} />
                    </View>
                  </View>
                </View>
              </ScrollView>
            </SafeAreaView>
          </>
        )}
      </View>
    </>
  );
};

const mapStateToProps = state => {
  const { error, loading, subscriptions, subscriptions_loading } =
    state.Profile;
  const { user_data } = state.Login;
  return { error, loading, subscriptions, subscriptions_loading, user_data };
};

export default connect(mapStateToProps, { getUserSubscriptions, logoutUser })(
  Profile,
);
