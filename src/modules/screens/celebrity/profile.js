/* eslint-disable no-undef */
import React, { useEffect, useState, useCallback } from 'react';
import { View, Text, ScrollView, RefreshControl, Image } from 'react-native';
import { Avatar } from 'react-native-elements';
import { Pressable, Popover, Divider, useToast } from 'native-base';
import { connect } from 'react-redux'; //Redux
//redux
import { useSelector } from 'react-redux';
import PageLoading from '../../partials/loading/pageLoading';
import { currUser } from '../../../helpers/jwt-token-access/accessToken';
import { logoutUser } from '../../../store/actions';
import { clearAsync } from '../../../helpers/jwt-token-access/accessToken';
//import { logout } from '../../../redux/general/auth/authActions';
//import { getProfile } from '../../../redux/general/profile/profileActions';
//styles
import styles from '../../../assets/styles/styles';
import colors from '../../../helpers/colors';
import Tooltip from '../../components/tooltip';

const Post = props => {
  return (
    <View
      style={{
        backgroundColor: colors.border_black,
        borderRadius: 20,
        paddingVertical: 16,
      }}
    >
      <View
        style={{
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
          paddingHorizontal: 16,
        }}
      >
        <Avatar
          style={{ width: 40, height: 40, marginRight: 12 }}
          rounded
          source={require('../../../assets/images/Wizkid.png')}
        />
        <View>
          <Text style={[styles.text_14, { marginBottom: 8 }]}>
            tiwa-savage99
          </Text>
          <Text
            style={[
              styles.text_12,
              {
                marginBottom: 8,
                color: colors.white,
                opacity: 0.5,
              },
            ]}
          >
            20 min ago
          </Text>
        </View>

        <Image
          source={require('../../../assets/icons/Dots.png')}
          style={{
            width: 5.5,
            height: 25,
            marginLeft: 'auto',
          }}
        />
      </View>
      <View style={{ marginTop: 16, marginBottom: 22 }}>
        <Image
          source={require('../../../assets/images/User.png')}
          style={{ width: '100%', height: 144, resizeMode: 'cover' }}
        />
      </View>
    </View>
  );
};

const CelebrityProfile = props => {
  const { navigation } = props;
  const [refreshing, set_refreshing] = useState(false);
  const [popover_open, set_popover_open] = useState(true);
  const [page_loading, set_page_loading] = useState(true);
  const user_data = currUser();
  console.log(user_data);

  const onRefresh = useCallback(() => {
    set_refreshing(true);
    // dispatch(getUserDetails('customer'))
    //   .then(data => {
    //     setUser(data);
    //     set_refreshing(false);
    //   })
    //   .catch(e => {
    //     alert(e);
    //   });
  }, []);

  // useEffect(() => {});

  const handleLogout = () => {
    props.logoutUser(props.navigation);
    clearAsync();
    props.navigation.navigate('Auth');
  };

  return (
    <View style={styles.body}>
      {page_loading || user_data == {} || !user_data ? (
        <PageLoading type={'9CubeGrid'} />
      ) : (
        <ScrollView
          showsVerticalScrollIndicator={false}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
        >
          <View style={[styles.container, styles.safe_area_margin]}>
            <View
              style={{
                display: 'flex',
                flexDirection: 'row',
                flex: 1,
              }}
            >
              <View
                style={{
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginLeft: 'auto',
                  flex: 0.99,
                }}
              >
                <Avatar
                  style={styles.profile_image}
                  size="xlarge"
                  rounded
                  source={{
                    uri: user_data.avatar
                      ? user_data.avatar
                      : `https://ui-avatars.com/api/?name=${user_data.username}&size=292&rounded=true`,
                  }}
                />
              </View>
              <Pressable
                style={{
                  marginLeft: 'auto',
                  // flex: 1,
                }}
              >
                <Tooltip
                  // ref={tooltipRef}
                  toggleOnPress={true}
                  tooltip_elements={
                    <>
                      <View style={{ marginRight: 'auto' }}>
                        <Pressable
                          onPress={() => {
                            //   console.log(tooltipRef);
                            //   console.log(tooltipRef);
                            //   tooltipRef.current.toggleTooltip();
                            set_popover_open(false);
                            props.navigation.navigate('SettingsStack', {
                              screen: 'Settings',
                              params: {
                                user: user_data,
                              },
                            });
                          }}
                        >
                          <View
                            style={{
                              display: 'flex',
                              flexDirection: 'row',
                              marginBottom: 15,
                            }}
                          >
                            <Image
                              source={require('../../../assets/icons/Setting.png')}
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
                                },
                              ]}
                            >
                              Settings
                            </Text>
                          </View>
                        </Pressable>
                        <Pressable onPress={() => handleLogout()}>
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
                        </Pressable>
                      </View>
                    </>
                  }
                  trigger={
                    <View
                      style={{
                        backgroundColor: colors.bg_grey_opacity,
                        paddingHorizontal: 15,
                        paddingVertical: 8,
                        borderRadius: 12,
                      }}
                    >
                      <Image
                        source={require('../../../assets/icons/Dots.png')}
                        style={{
                          width: 5.5,
                          height: 25,
                        }}
                      />
                    </View>
                  }
                />
              </Pressable>
            </View>

            <View style={[]}>
              <Text
                style={[
                  styles.text_22,
                  {
                    fontWeight: 'bold',
                    textAlign: 'center',
                    marginVertical: 13,
                  },
                ]}
              >
                Dowson_john9{'   '}
              </Text>
            </View>
          </View>

          <View
            style={{
              display: 'flex',
              flexDirection: 'row',
              backgroundColor: colors.ash_dark_opacity,
              paddingVertical: 9,

              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <Text style={[styles.text_14, { color: colors.ash_dark }]}>
              <Image
                source={require('../../../assets/icons/Subscribe.png')}
                style={{
                  width: 14,
                  height: 12,
                }}
              />{' '}
              30 Subscribers
            </Text>
            <Divider
              orientation="vertical"
              size={3}
              style={{
                marginHorizontal: 20,
                borderWidth: 0.5,
                borderColor: colors.white,
                borderRadius: 10,
                opacity: 0.5,
              }}
            />
            <Text style={[styles.text_14, { color: colors.ash_dark }]}>
              <Image
                source={require('../../../assets/icons/Videos.png')}
                style={{
                  width: 14,
                  height: 12,
                }}
              />{' '}
              2500 Posts
            </Text>
          </View>

          <View style={styles.container}>
            <Text
              style={[
                styles.text_16,
                {
                  color: colors.text_grey,
                  textAlign: 'center',
                  marginVertical: 18,
                },
              ]}
            >
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean
              euismod bibendum laoreet.
            </Text>
            <Divider
              style={{
                marginRight: 'auto',
                marginLeft: 'auto',
                borderWidth: 2,
                borderColor: colors.white,
                borderRadius: 10,
                opacity: 0.1,
              }}
            />
            <View style={{ marginTop: 11 }}>
              <View
                style={{
                  display: 'flex',
                  flexDirection: 'row',
                  alignItems: 'center',
                  marginBottom: 8,
                }}
              >
                <Text style={[styles.text_16, { fontWeight: 'bold' }]}>
                  Content
                </Text>
                <View
                  style={{
                    backgroundColor: colors.bg_grey_opacity,
                    padding: 8,
                    borderRadius: 12,
                    marginLeft: 'auto',
                  }}
                >
                  <Tooltip
                    trigger={
                      <Image
                        source={require('../../../assets/icons/Datepicker.png')}
                        style={{
                          width: 15,
                          height: 15,
                        }}
                      />
                    }
                    tooltip_elements={
                      <Text>
                        Lorem backgroundColor: colors.bg_grey_opacity, padding:
                        8, borderRadius: 12, marginLeft: 'auto',{' '}
                      </Text>
                    }
                  />
                </View>
              </View>

              <Post />
            </View>
          </View>
        </ScrollView>
      )}
    </View>
  );
};

// export default CelebrityProfile;

// export default connect({ logoutUser })(
// 	CelebrityProfile,
// );

const mapStateToProps = state => {
  const { error, loading } = state.Profile;
  const { user_data } = state.Login;
  return { error, loading, user_data };
};

export default connect(mapStateToProps, { logoutUser })(CelebrityProfile);
