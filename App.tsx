import 'react-native-gesture-handler';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import HomeView from './components/views/HomeView';
import BuildingView from './components/views/building/BuildingView';
import PartView from './components/views/part/PartView';
import ErrorView from './components/views/ErrorView';

const Stack = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Home"
          component={HomeView}
          options={{
            headerShown: false
          }}
        />
        <Stack.Screen
          name='Building'
          component={BuildingView}
        />
        <Stack.Screen
          name='Part'
          component={PartView}
        />
        <Stack.Screen
          name='Error'
          options={{
            headerShown: false
          }}
          component={ErrorView}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};
export default App;