import React, { useEffect } from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Image } from 'react-native';
import Home from '../modules/screens/home';
import Discover from '../modules/screens/general/discover';
import Notifications from '../modules/screens/general/notifications/notifications';
import { CelebrityProfiler } from '../modules/screens/profile/CelebrityProfiler';
import Profile from '../modules/screens/fans/profile';
import colors from '../helpers/colors';
import { DiscoverStack } from './DiscoverStack';
import { useSelector } from 'react-redux';
import CelebrityProfile from '../modules/screens/celebrity/profile';

export const GeneralStack = () => {
  const Tab = createBottomTabNavigator();
  const { user_data } = useSelector(state => state.Login);

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === 'Home') {
            iconName = focused
              ? {
                  url: require('../assets/icons/Home-Active.png'),
                  style: 'focused',
                }
              : { url: require('../assets/icons/Home.png') };
          } else if (route.name === 'Notifications') {
            iconName = focused
              ? {
                  url: require('../assets/icons/Notifications-Active.png'),
                  style: 'focused',
                }
              : {
                  url: require('../assets/icons/Notifications.png'),
                };
          } else if (route.name === 'Discover') {
            iconName = focused
              ? {
                  url: require('../assets/icons/Discover-Active.png'),
                  style: 'focused',
                }
              : {
                  url: require('../assets/icons/Discover.png'),
                };
          } else if (route.name === 'Profile') {
            iconName = focused
              ? {
                  url: require('../assets/icons/Profile-Active.png'),
                  style: 'focused',
                }
              : {
                  url: require('../assets/icons/Profile.png'),
                };
          } else if (route.name === 'Post') {
            iconName = focused
              ? {
                  url: require('../assets/icons/Post.png'),
                  style: 'focused',
                }
              : { url: require('../assets/icons/Post.png') };
          }

          // You can return any component that you like here!
          return (
            <Image
              alt="fanect logo"
              source={iconName.url}
              style={
                iconName.style == 'focused'
                  ? {
                      marginBottom: 30,
                      height: 56,
                      width: 56,
                    }
                  : {
                      marginBottom: 3,
                      height: 24,
                      width: 24,
                    }
              }
            />
          );
        },

        tabBarActiveTintColor: colors.green,
        tabBarInactiveTintColor: colors.text_grey,
        tabBarStyle: {
          borderTopColor: colors.bg_black,
          // backgroundColor: 'transparent',
          backgroundColor: colors.transparent_grey,
          position: 'absolute',
        },
        tabBarLabelStyle: {
          fontSize: 12,
          marginBottom: -10,
        },
      })}
    >
      {/* <Tab.Screen name="Home" component={user_is_fan == false ? CelebrityHome : FanHome} />  */}
      <Tab.Screen name="Home" component={Home} />
      <Tab.Screen name="Discover" component={DiscoverStack} />
      {user_data.user?.is_fan == true ? (
        <></>
      ) : (
        <Tab.Screen
          name="Post"
          listeners={({ navigation }) => ({
            tabPress: e => {
              // Prevent default action
              e.preventDefault();
              navigation.navigate('PostStory');
            },
          })}
          component={CelebrityProfile}
        />
      )}
      <Tab.Screen name="Notifications" component={Notifications} />
      <Tab.Screen
        name="Profile"
        component={user_data.user?.is_fan == true ? Profile : CelebrityProfiler}
      />
    </Tab.Navigator>
  );
};
