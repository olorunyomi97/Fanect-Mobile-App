import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  Image,
  ScrollView,
  RefreshControl,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
  FlatList,
} from 'react-native';

import { Pressable, Divider } from 'native-base';
import TimeAgo from 'react-native-timeago';
import { useNavigation } from '@react-navigation/core';

//styles
import styles from '../../../../assets/styles/styles';
import colors from '../../../../helpers/colors';
//partials
import SecondaryHeader from '../../../partials/header/secondaryHeader';

//redux
import { getNotification } from '../../../../store/notification/actions';
import { connect } from 'react-redux';
import dayjs from 'dayjs';

const Notifications = props => {
  const { getNotification, notification, loading } = props;

  const navigation = useNavigation();

  useEffect(() => {
    getNotification();
  }, []);

  return (
    <View style={styles.body}>
      <SecondaryHeader title="Notifications" />
      <ScrollView
        style={{
          backgroundColor: colors.bg_black,
          // flexGrow: 1,
          paddingBottom: 50,
        }}
        // onRefresh={() => dispatch(getUserContent(userId))}
        refreshControl={
          <RefreshControl
            refreshing={loading}
            onRefresh={() => {
              getNotification();
            }}
          />
        }
      >
        <View style={[styles.container, { marginTop: 27 }]}>
          {/* <Text
            style={[styles.text_16, { marginBottom: 10, fontWeight: '700' }]}
          >
            Today
          </Text> */}

          <View
            style={{
              paddingVertical: 15,
              paddingHorizontal: 15,
              backgroundColor: colors.border_black,
              borderRadius: 16,
            }}
          >
            {notification.map(data => {
              {
                /* each notification */
              }
              return (
                <View style={{ marginBottom: 10 }}>
                  <View
                    style={{
                      display: 'flex',
                      flexDirection: 'row',
                      marginBottom: 10,
                    }}
                  >
                    <Image
                      source={{ uri: data.user_details?.username_avatar }}
                      style={{
                        width: 50,
                        height: 50,
                        borderRadius: 50,
                      }}
                    />
                    <View
                      style={{
                        justifyContent: 'center',
                      }}
                    >
                      <View
                        style={{
                          display: 'flex',
                          flexDirection: 'row',
                        }}
                      >
                        <Pressable
                          onPress={() => {
                            navigation.navigate('Discover', {
                              screen: 'CelebrityProfile',
                              params: {
                                celebrity_id: data.user_details.username_id,
                                new_click: true,
                              },
                            });
                          }}
                        >
                          <Text style={[styles.text_16, { paddingLeft: 15 }]}>
                            {data.user_details.username}{' '}
                          </Text>
                        </Pressable>
                        <Text
                          style={[
                            styles.text_16,
                            {
                              fontWeight: '600',
                              marginBottom: 8,
                              paddingRight: 15,
                              color: colors.text_grey,
                            },
                          ]}
                        >
                          {data.message}
                        </Text>
                      </View>
                      <Text
                        style={[
                          styles.text_14,
                          {
                            color: colors.ash,
                            opacity: 0.4,
                            paddingHorizontal: 15,
                          },
                        ]}
                      >
                        {/* <TimeAgo
                          time={data.createdAt}
                          locale="en-US"
                          timeStyle="twitter"
                        /> */}
                        {dayjs(data.createdAt).fromNow()}
                      </Text>
                    </View>
                  </View>
                  <Divider bg={'rgba(255, 255, 255, 0.1)'} />
                </View>
              );
            })}
          </View>

          {/* 
          <View>
            <View
              style={{
                display: 'flex',
                flexDirection: 'row',
                marginBottom: 10,
              }}
            >
              <Image
                source={require('../../../../assets/images/Wizkid.png')}
                style={{
                  width: 50,
                  height: 50,
                  borderRadius: 50,
                }}
              />
              <View
                style={{
                  justifyContent: 'center',
                }}
              >
                <Text
                  style={[
                    styles.text_16,
                    {
                      fontWeight: '600',
                      marginBottom: 8,
                      paddingHorizontal: 8,
                      color: colors.text_grey,
                    },
                  ]}
                >
                  <Text style={[styles.text_16]}>tiwa-savage99</Text> have
                  uploaded a new content
                </Text>
                <Text
                  style={[
                    styles.text_14,
                    { color: colors.ash, opacity: 0.4, paddingHorizontal: 8 },
                  ]}
                >
                  3 hours ago
                </Text>
              </View>
            </View>
          </View>
        </View> */}
        </View>
      </ScrollView>
    </View>
  );
};

const mapStateToProps = state => {
  const { loading, notification } = state.Notification;
  return { loading, notification };
};

export default connect(mapStateToProps, { getNotification })(Notifications);
