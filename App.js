import React from 'react'
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';

import UsersScreen from './screens/UsersScreen';
import FeedsScreen from './screens/FeedsScreen';
import TodosScreen from './screens/TodosScreen';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';

import { store, persistor } from './store/store';

const Tab = createBottomTabNavigator();

const App = () => {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>

        <NavigationContainer>
          <Tab.Navigator
            screenOptions={({ route }) => ({
              tabBarIcon: ({ color, size }) => {
                if (route.name === 'Users') {
                  return <FontAwesome5 name={'users'} size={size} color={color} />;
                } if (route.name === 'Feeds') {
                  return <FontAwesome5 name={'rss-square'} size={size} color={color} />;
                } if (route.name === 'Todos') {
                  return <FontAwesome5 name={'tasks'} size={size} color={color} />;
                }
              },
            })}
            tabBarOptions={{
              activeTintColor: '#008B8B',
              inactiveTintColor: 'gray',
            }}
          >
            <Tab.Screen name="Users" component={UsersScreen} />
            <Tab.Screen name="Feeds" component={FeedsScreen} />
            <Tab.Screen name="Todos" component={TodosScreen} />
          </Tab.Navigator>
        </NavigationContainer>
      </PersistGate>
    </Provider>
  );
};

export default App;
