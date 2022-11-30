import 'react-native-gesture-handler'
import React, { useState, useRef, useEffect } from 'react';
import { Dimensions } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { PersistGate } from 'redux-persist/integration/react';
import Snackbar from 'react-native-snackbar';
import { store, persistor } from './src/store/store';
import SplashScreen from 'react-native-splash-screen';

// onboarding 
import Login from './src/screens/Login';
import Welcome from './src/screens/welcome';

// home 
import Home from './src/screens/Home';
import CustomDrawerContent from './src/navigation/SideMenu';
import { Provider, useSelector } from 'react-redux';
import { navigationRef } from './RootNavigation';
import Signup from './src/screens/Signup';
import CustomerSignup from './src/screens/CustomerSignup';
import VenderSignup from './src/screens/VenderSignup';
import EditProfile from './src/screens/EditProfile';
import OrderDetails from './src/screens/OrderDetails';
import AddOrder from './src/screens/AddOrder';
import EditOrder from './src/screens/EditOrder';
import Checkout from './src/screens/CheckOut';
import CompleteOrder from './src/screens/CompleteOrder';
import DeliveryStatus from './src/screens/DeliveryStatus';
import PastOrders from './src/screens/PastOrders';
import ImagesGallery from './src/screens/ImagesGallery';
import Message from './src/screens/Message';
import MessagesList from './src/screens/MessageList';

const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();
const { width } = Dimensions.get('screen');

export default () => {

  useEffect(() => {
    SplashScreen.hide();
  }, []);
  
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
          screenOptions={{
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
          <Drawer.Screen name="Home" component={Home}  options={{ headerShown: false }} />
          <Drawer.Screen name="EditProfile" component={EditProfile} options={{ headerShown: false }} />
          <Drawer.Screen name="PastOrders" component={PastOrders} options={{ headerShown: false }} />

          <Stack.Screen name="OrderDetails" component={OrderDetails} options={{manimationEnabled: false, headerShown: false}} />
          <Stack.Screen name="AddOrder" component={AddOrder} options={{manimationEnabled: false, headerShown: false}} />
          <Stack.Screen name="EditOrder" component={EditOrder} options={{manimationEnabled: false, headerShown: false}} />
          <Stack.Screen name="Checkout" component={Checkout} options={{manimationEnabled: false, headerShown: false}} />
          <Stack.Screen name="CompleteOrder" component={CompleteOrder} options={{manimationEnabled: false, headerShown: false}} />
          <Drawer.Screen name="DeliveryStatus" component={DeliveryStatus} options={{manimationEnabled: false, headerShown: false}} />
          <Stack.Screen name="Message" component={Message} options={{manimationEnabled: false, headerShown: false}} />
          <Stack.Screen name="MessageList" component={MessagesList} options={{manimationEnabled: false, headerShown: false}} />
        </Drawer.Navigator>

      </>
    );
  }

  function CustomerStack() {
    return (
      <Stack.Navigator>
        <Stack.Screen name="Homes" component={AppStack} options={{headerShown: false, manimationEnabled: false}} />
      </Stack.Navigator>
    )
  }

  function VenderStack() {
    return (
      <Stack.Navigator>
        <Stack.Screen name="Homes" component={AppStack} options={{headerShown: false, animationEnabled: false }} />
        <Stack.Screen name="ImagesGallery" component={ImagesGallery} options={{manimationEnabled: false, headerShown: false}} />
      </Stack.Navigator>
    )
  }

  function HomeStack() {
    const userType = useSelector(state => state.user.isLoggedIn)
    
    if (userType && userType.type == 'CUSTOMER') {
      return <CustomerStack />
    } else {
      return <VenderStack />
    } 
  }

  function OnboardingStack() {
    return (
      <Stack.Navigator initialRouteName="Welcome" >
        <Stack.Screen name="Welcome" component={Welcome} options={{headerShown: false, animationEnabled: false, headerShown: false }}/>
        <Stack.Screen name="Login" component={Login} options={{headerShown: false, animationEnabled: false, headerShown: false }}/>
        <Stack.Screen name="Signup" component={Signup} options={{headerShown: false, animationEnabled: false, headerShown: false }}/>
        <Stack.Screen name="CustomerSignup" component={CustomerSignup} options={{headerShown: false, animationEnabled: false, headerShown: false }}/>
        <Stack.Screen name="VenderSignup" component={VenderSignup} options={{headerShown: false, animationEnabled: false, headerShown: false }}/>
      </Stack.Navigator>
    )
  }

  const MainStack = () => {

    const loggedIn = useSelector(state => state.user.isLoggedIn)

    if (loggedIn && loggedIn.token) {
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

