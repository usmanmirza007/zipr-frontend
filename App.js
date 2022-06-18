import 'react-native-gesture-handler'
import React, { useState, useRef, useEffect } from 'react';
import { Dimensions } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { PersistGate } from 'redux-persist/integration/react';
import Snackbar from 'react-native-snackbar';
import { store, persistor } from './src/store/store';

// onboarding 
import Login from './src/screens/Login';
import Welcome from './src/screens/welcome';

// home 
import Home from './src/screens/Home';
import Profile from './src/screens/Profile';
import CustomDrawerContent from './src/navigation/SideMenu';
import { Provider, useSelector } from 'react-redux';
import { navigationRef } from './RootNavigation';

const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();
const { width } = Dimensions.get('screen');

export default () => {


  function AppStack() {
    return (
      <>
        <Drawer.Navigator
          style={{ flex: 1 }}
          drawerContent={(props) => <CustomDrawerContent {...props} />}
          drawerStyle={{
            backgroundColor: 'white',
            width: width * 0.8,
          }}
          drawerContentOptions={{
            activeTintcolor: 'white',
            inactiveTintColor: '#000',
            activeBackgroundColor: 'transparent',
            itemStyle: {
              width: width * 0.75,
              backgroundColor: 'transparent',
              paddingVertical: 16,
              paddingHorizonal: 12,
              justifyContent: 'center',
              alignContent: 'center',
              alignItems: 'center',
              overflow: 'hidden',
            },
            labelStyle: {
              fontSize: 18,
              marginLeft: 12,
              fontWeight: 'normal',
            },
          }}
          initialRouteName="Home"
        >
          <Drawer.Screen name="Home" component={Home} />
          <Drawer.Screen name="Profile" component={Profile} />
        </Drawer.Navigator>

      </>
    );
  }


  function CustomerStack() {
    return (
      <Stack.Navigator headerMode="none">
        <Stack.Screen name="Home" component={AppStack} options={{manimationEnabled: false}} />
      </Stack.Navigator>
    )
  }

  function VenderStack() {
    return (
      <Stack.Navigator headerMode="none">
        <Stack.Screen name="Home" component={AppStack} options={{animationEnabled: false }} />
      </Stack.Navigator>
    )
  }

  function HomeStack() {

    const userType = useSelector(state => state.user.userType)
    if (userType == 'CUSTOMER') {
      return <CustomerStack />
    } else if(userType == 'VENDER') {
      return <VenderStack />
    } 
  }

  function OnboardingStack() {
    return (
      <Stack.Navigator headerMode="none" initialRouteName="Welcome" >
        <Stack.Screen name="Welcome" component={Welcome} options={{ animationEnabled: false, headerShown: false }}/>
        <Stack.Screen name="Login" component={Login} options={{ animationEnabled: false, headerShown: false }}/>
      </Stack.Navigator>
    )
  }

  const MainStack = () => {

    const loggedIn = useSelector(state => state.user.isLoggedIn)
    if (loggedIn) {
      return <HomeStack />
    } else {
      return <OnboardingStack />
    }

  }

  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <NavigationContainer ref={navigationRef}>
          <MainStack />
        </NavigationContainer>
      </PersistGate>
    </Provider>
  );
}

