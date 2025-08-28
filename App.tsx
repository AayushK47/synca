import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { StatusBar } from 'expo-status-bar';
import FocusedScreen from './src/screens/FocusedScreen';
import BacklogScreen from './src/screens/BacklogScreen';
import GoalsScreen from './src/screens/GoalsScreen';
import ProgressScreen from './src/screens/ProgressScreen';
import CustomTabBar from './src/components/CustomTabBar';

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <StatusBar style="auto" />
      <Tab.Navigator
        tabBar={props => <CustomTabBar {...props} />}
        screenOptions={{
          headerShown: false,
        }}
      >
        <Tab.Screen
          name="Focused"
          component={FocusedScreen}
          options={{
            title: 'Focused',
          }}
        />
        <Tab.Screen
          name="Backlogs"
          component={BacklogScreen}
          options={{
            title: 'Backlogs',
          }}
        />
        <Tab.Screen
          name="Goals"
          component={GoalsScreen}
          options={{
            title: 'Goals',
          }}
        />
        <Tab.Screen
          name="Progress"
          component={ProgressScreen}
          options={{
            title: 'Progress',
          }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
