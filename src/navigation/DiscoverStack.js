import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import Discover from '../modules/screens/general/discover';
import DiscoverCelebrityProfile from '../modules/screens/general/discover/celebrityProfile';
import PromptSubscription from '../modules/screens/general/discover/subscriptions/promptSubscription';

export const DiscoverStack = () => {
  const Stack = createStackNavigator();
  return (
    <Stack.Navigator
      initialRouteName={'Discover'}
      screenOptions={{ gestureEnabled: true, headerShown: false }}
    >
      <Stack.Screen name="Discover" component={Discover} />
      <Stack.Screen
        name="CelebrityProfile"
        component={DiscoverCelebrityProfile}
      />
      <Stack.Screen name="PromptSubscription" component={PromptSubscription} />
    </Stack.Navigator>
  );
};
