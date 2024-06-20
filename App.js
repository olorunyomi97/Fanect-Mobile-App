/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import 'intl';
import 'intl/locale-data/jsonp/en';
import React, { useState, useEffect } from 'react';
import { NativeBaseProvider, Pressable } from 'native-base';
import SplashScreen from 'react-native-splash-screen';
import { Image, View, Text, StatusBar } from 'react-native';
import { connect, Provider, useDispatch } from 'react-redux';
import { Host } from 'react-native-portalize';

//react nav
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';

//auth
import Login from './src/modules/screens/auth/login';
import ForgotPassword from './src/modules/screens/auth/forgotPassword';
import Terms from './src/modules/screens/static/terms';
import Policy from './src/modules/screens/static/policies';

//celebrity post story
import CelebrityPostStory from './src/modules/screens/celebrity/post/upload';
import StreamAnalytics from './src/modules/screens/celebrity/post/StreamAnalytics';
import AnalyticsPage from './src/modules/screens/celebrity/post/AnalyticsPage';

//style
import Verification from './src/modules/screens/auth/verification';
import ResetPassword from './src/modules/screens/auth/resetPassword';
import Register from './src/modules/screens/auth/register';
import colors from './src/helpers/colors';

//settings
import Settings from './src/modules/screens/settings/settings';
import ChangeEmail from './src/modules/screens/settings/changeEmail';
import VerifyChangeEmail from './src/modules/screens/settings/verifyChangeEmail';
import ChangePassword from './src/modules/screens/settings/changePassword';
import NotificationSettings from './src/modules/screens/settings/notificationSettings';
import Support from './src/modules/screens/settings/support';
import PaymentMethod from './src/modules/screens/settings/paymentMethod';
import AddCard from './src/modules/screens/settings/addCard';

//general
import EditProfile from './src/modules/screens/general/editProfile';

import { navigationRef } from './src/helpers/navigation_helper';
import { CreateContent } from './src/modules/screens/content/CreateContent';
import { AddLocation } from './src/modules/screens/content/AddLocation';
import { AddImage } from './src/modules/screens/content/AddImage';
import {
  PaymentDetail,
  EarningsHistory,
  PaymentResult,
  PaymentScreen,
} from './src/modules/screens/payment';
import { IconContainer } from './src/modules/components';
import Icon from 'react-native-vector-icons/Feather';
import { GiftSubscription } from './src/modules/screens/subscription/GiftSubscription';
import { wp } from './src/helpers/scaler';
import { EditContent } from './src/modules/screens/content/EditContent';
import { AddImageEdit } from './src/modules/screens/content/AddImageEdit';
import { PaymentHistory } from './src/modules/screens/settings/paymentHistory';
import RedeemSubscription from './src/modules/screens/subscription/RedeemSubscription';
// import linking from "./src/helpers/linking"
import PageLoading from './src/modules/partials/loading/pageLoading';
import { GeneralStack } from './src/navigation/GeneralStack';
import { DiscoverStack } from './src/navigation/DiscoverStack';

import linking from './src/navigation/linking';
import PushNotificationIOS from '@react-native-community/push-notification-ios';
import PushNotification from 'react-native-push-notification';
import Firebase from '@react-native-firebase/app';

const App = ({ user_data, is_signed_in }) => {
  const Stack = createStackNavigator();

  useEffect(() => {
    Firebase.initializeApp();
    // SplashScreen.hide();

    PushNotification.configure({
      // (optional) Called when Token is generated (iOS and Android)
      onRegister: function (token) {
        console.log('TOKEN:', token);
      },

      // (required) Called when a remote is received or opened, or local notification is opened
      onNotification: function (notification) {
        console.log('NOTIFICATION:', notification);

        // process the notification

        // (required) Called when a remote is received or opened, or local notification is opened
        notification.finish(PushNotificationIOS.FetchResult.NoData);
      },

      // (optional) Called when Registered Action is pressed and invokeApp is false, if true onNotification will be called (Android)
      onAction: function (notification) {
        console.log('ACTION:', notification.action);
        console.log('NOTIFICATION:', notification);

        // process the action
      },

      // (optional) Called when the user fails to register for remote notifications. Typically occurs when APNS is having issues, or the device is a simulator. (iOS)
      onRegistrationError: function (err) {
        console.error(err.message, err);
      },

      // IOS ONLY (optional): default: all - Permissions to register.
      permissions: {
        alert: true,
        badge: true,
        sound: true,
      },

      // Should the initial notification be popped automatically
      // default: true
      popInitialNotification: true,

      /**
       * (optional) default: true
       * - Specified if permissions (ios) and token (android and ios) will requested or not,
       * - if not, you must call PushNotificationsHandler.requestPermissions() later
       * - if you are not using remote notification or do not have Firebase installed, use this:
       *     requestPermissions: Platform.OS === 'ios'
       */
      requestPermissions: true,
    });
  }, []);

  const PostStoryStack = () => {
    return (
      //auth stack
      <Stack.Navigator
        screenOptions={{ gestureEnabled: false, headerShown: false }}
        initialRouteName="CelebrityPostStory"
      >
        <Stack.Screen
          name="CelebrityPostStory"
          component={CelebrityPostStory}
        />
      </Stack.Navigator>
    );
  };

  const StreamAnalyticsStack = () => {
    return (
      //auth stack
      <Stack.Navigator
        screenOptions={{ gestureEnabled: false, headerShown: false }}
        initialRouteName="StreamAnalytics"
      >
        <Stack.Screen name="StreamAnalytics" component={StreamAnalytics} />
      </Stack.Navigator>
    );
  };

  const AnalyticsPageStack = () => {
    return (
      //auth stack
      <Stack.Navigator
        screenOptions={{ gestureEnabled: false, headerShown: false }}
        initialRouteName="AnalyticsPage"
      >
        <Stack.Screen name="AnalyticsPage" component={AnalyticsPage} />
      </Stack.Navigator>
    );
  };

  const AuthStack = () => {
    return (
      //auth stack
      <Stack.Navigator
        screenOptions={{ gestureEnabled: false, headerShown: false }}
        initialRouteName="Login"
      >
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Register" component={Register} />
        <Stack.Screen name="ForgotPassword" component={ForgotPassword} />
        <Stack.Screen name="Verification" component={Verification} />
        <Stack.Screen name="ResetPassword" component={ResetPassword} />
        <Stack.Screen name="Terms" component={Terms} />
        <Stack.Screen name="Policy" component={Policy} />
        {/* <Stack.Screen name="register" component={Register} />
							<Stack.Screen name="resetPassword" component={ResetPassword} />
							<Stack.Screen name="verification" component={Verification} />
							<Stack.Screen name="authSuccess" component={AuthSuccess} /> */}
      </Stack.Navigator>
    );
  };

  //settings stack
  const SettingsStack = () => {
    return (
      <Stack.Navigator
        initialRouteName={'Settings'}
        screenOptions={{ gestureEnabled: true, headerShown: false }}
      >
        <Stack.Screen
          name="Settings"
          component={Settings}
          options={{ headerShown: false }}
        />
        <Stack.Screen name="ChangeEmail" component={ChangeEmail} />
        <Stack.Screen name="VerifyChangeEmail" component={VerifyChangeEmail} />
        <Stack.Screen name="ChangePassword" component={ChangePassword} />
        <Stack.Screen name="Support" component={Support} />
        <Stack.Screen name="PaymentHistory" component={PaymentHistory} />
        <Stack.Screen name="PaymentMethod" component={PaymentMethod} />
        <Stack.Screen name="AddCard" component={AddCard} />
        <Stack.Screen name="EditProfile" component={EditProfile} />
        {/* <Stack.Screen name="Create Content" component={CreateContent} /> */}
        <Stack.Screen name="Add Location" component={AddLocation} />
        <Stack.Screen name="Add Image" component={AddImage} />
        <Stack.Screen
          name="NotificationSettings"
          component={NotificationSettings}
        />
      </Stack.Navigator>
    );
  };

  const PaymentStack = () => {
    return (
      <Stack.Navigator
        screenOptions={({ navigation, route }) => ({
          headerStyle: { backgroundColor: colors.border_black },
          headerLeft: props => (
            <IconContainer
              style={{ marginLeft: 10 }}
              onPress={() => navigation.goBack()}
            >
              <Icon name="x" size={22} color="white" />
            </IconContainer>
          ),
          headerTitleStyle: {
            color: 'white',
            fontSize: 20,
            fontWeight: 'bold',
          },
        })}
      >
        <Stack.Screen name="Payment" component={PaymentScreen} />
        <Stack.Screen name="PaymentResult" component={PaymentResult} />
        <Stack.Screen
          name="EarningsHistory"
          component={EarningsHistory}
          options={{ headerTitle: 'Earning & Payout History' }}
        />
        <Stack.Screen
          name="PaymentDetail"
          component={PaymentDetail}
          options={{
            headerTitle: 'Details',
            headerTitleAlign: 'center',
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="RedeemSubscription"
          component={RedeemSubscription}
          options={{
            headerTitle: 'Redeem Subscription',
            headerTitleAlign: 'center',
            headerStyle: {
              backgroundColor: 'rgba(31,23,23,1)',
              borderColor: 'rgba(31,23,23,1)',
              borderBottomColor: 'rgba(31,23,23,1)',
            },
          }}
        />
        <Stack.Screen
          name="GiftSubscription"
          component={GiftSubscription}
          options={({ navigation }) => ({
            headerTitle: 'Gift Subscription',
            headerTitleAlign: 'center',
            headerStyle: {
              backgroundColor: colors.green,
              borderColor: colors.green,
            },
            headerLeft: () => (
              <IconContainer
                style={{ marginLeft: 15 }}
                onPress={() => navigation.goBack()}
              >
                <Icon name="arrow-left" color="white" size={wp(20)} />
              </IconContainer>
            ),
          })}
        />
      </Stack.Navigator>
    );
  };

  const EditContentStack = () => {
    return (
      <Stack.Navigator
        screenOptions={({ navigation, route }) => ({
          headerStyle: { backgroundColor: colors.border_black },
          headerLeft: props => (
            <IconContainer
              style={{ marginLeft: 10 }}
              onPress={() => navigation.goBack()}
            >
              <Icon name="x" size={22} color="white" />
            </IconContainer>
          ),
          headerTitleStyle: {
            color: 'white',
            fontSize: 20,
            fontWeight: 'bold',
          },
        })}
      >
        <Stack.Screen
          name="EditContent"
          component={EditContent}
          options={{ headerTitle: 'Edit Content', headerTitleAlign: 'center' }}
        />
        <Stack.Screen
          name="AddImageEdit"
          component={AddImageEdit}
          options={{ headerTitleAlign: 'center' }}
        />
      </Stack.Navigator>
    );
  };

  return (
    <>
      <StatusBar
        backgroundColor={colors.black_opacity}
        barStyle="dark-content"
      />
      <Host>
        <NativeBaseProvider>
          <NavigationContainer linking={linking} ref={navigationRef}>
            <Stack.Navigator
              initialRouteName={'PageLoading'}
              screenOptions={{
                gestureEnabled: false,
                headerShown: false,
              }}
            >
              <Stack.Screen name="PageLoading" component={PageLoading} />
              <Stack.Screen name="General" component={GeneralStack} />

              <Stack.Screen name="DiscoverStack" component={DiscoverStack} />
              <Stack.Screen name="PostStory" component={PostStoryStack} />
              <Stack.Screen
                name="StreamAnalytics"
                component={StreamAnalyticsStack}
              />
              <Stack.Screen
                name="AnalyticsPage"
                component={AnalyticsPageStack}
              />

              <Stack.Screen name="SettingsStack" component={SettingsStack} />

              <Stack.Screen name="PaymentStack" component={PaymentStack} />
              <Stack.Screen
                name="EditContentStack"
                component={EditContentStack}
              />
              <Stack.Screen name="Auth" component={AuthStack} />
            </Stack.Navigator>
          </NavigationContainer>
        </NativeBaseProvider>
      </Host>
    </>
  );
};

const mapStateToProps = state => {
  const { user_data, is_signed_in } = state.Login;
  return { user_data, is_signed_in };
};

export default connect(mapStateToProps)(App);
