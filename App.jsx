import React, {useContext, useEffect, useState} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator, CardStyleInterpolators} from '@react-navigation/stack';
import SplashScreen from './screens/AuthScreen/SplashScreen';
import WelcomeScreen from './screens/AuthScreen/WelcomeScreen';
import AuthScreen from './screens/AuthScreen/AuthScreen';
import OTPScreen from './screens/AuthScreen/OTPScreen';
import {UserContext, UserProvider} from './context/UserContext';
import HomeTabNavigator from './navigation/HomeTabNavigator';
import ReportSafetyIssue from './screens/SettingScreen/ReportSafetyIssue';
import Help from './screens/SettingScreen/Help';
import Privacy from './screens/SettingScreen/Privacy';
import Terms from './screens/SettingScreen/Terms';
import About from './screens/SettingScreen/About';
import EditProfile from './screens/SettingScreen/EditProfile';
import Settings from './screens/SettingScreen/Settings';
import EventDetails from './screens/EventScreen/EventDetails';
import ThankYouScreen from './screens/CheckOutScreen/ThankYouScreen';
import CheckoutScreen from './screens/CheckOutScreen/CheckoutScreen';
import SelectLocation from './screens/MapScreen/SelectLocation';
import MapScreen from './screens/MapScreen/MapScreen';
import ViewOrderScreen from './screens/ViewOrder/ViewOrderScreen';
import {LocationProvider} from './context/LocationContext';
import OrderDetailsScreen from './screens/MyOrderScreen/OrderDetailsScreen';
import BookingScreen from './screens/EventScreen/BookingScreen';
import SavedAddresses from './screens/SettingScreen/SavedAddress';

const Stack = createStackNavigator();

const AppNavigator = () => {
  const {user} = useContext(UserContext);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 3000);
  }, []);

  if (isLoading) {
    return <SplashScreen />;
  }

  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      {user ? (
        <>
          <Stack.Screen name="HomeTab" component={HomeTabNavigator} />
          <Stack.Screen name="Auth" component={AuthScreen} />
          <Stack.Screen
            name="ReportSafetyIssue"
            component={ReportSafetyIssue}
          />
          <Stack.Screen name="Help" component={Help} />
          <Stack.Screen name="Privacy" component={Privacy} />
          <Stack.Screen name="Terms" component={Terms} />
          <Stack.Screen name="About" component={About} />
          <Stack.Screen name="EditProfile" component={EditProfile} />
          <Stack.Screen name="Settings" component={Settings} />
          <Stack.Screen name="EventDetails" component={EventDetails} />
          <Stack.Screen name="ThankYouScreen" component={ThankYouScreen} />
          <Stack.Screen name="CheckoutScreen" component={CheckoutScreen} />
          <Stack.Screen name="SelectLocation" component={SelectLocation} />
          <Stack.Screen name="MapScreen" component={MapScreen} />
          <Stack.Screen name="ViewOrderScreen" component={ViewOrderScreen} />
          <Stack.Screen name="SavedAddresses" component={SavedAddresses} />
          <Stack.Screen
            name="OrderDetailsScreen"
            component={OrderDetailsScreen}
          />
          <Stack.Screen
          name="BookingScreen"
          component={BookingScreen}
          options={{
            title: 'BookingScreen',
            headerShown: false,
            gestureDirection: 'vertical',
            cardStyleInterpolator: CardStyleInterpolators.forVerticalIOS,
          }}
        />
        </>
      ) : (
        <>
          <Stack.Screen name="Welcome" component={WelcomeScreen} />
          <Stack.Screen name="Auth" component={AuthScreen} />
          <Stack.Screen name="OTP" component={OTPScreen} />
        </>
      )}
    </Stack.Navigator>
  );
};

const App = () => {
  return (
    <UserProvider>
      <LocationProvider>
        <NavigationContainer>
          <AppNavigator />
        </NavigationContainer>
      </LocationProvider>
    </UserProvider>
  );
};

export default App;
