import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {useSelector} from 'react-redux';
import NavigationsStrings from '../constants/strings/NavigationsStrings';
import LoginScreen from './screens/authentication/LoginScreen';
import SignupScreen from './screens/authentication/SignupScreen';
import HomeScreen from './screens/HomeScreen';
import OnboardingSwiper from './screens/onboarding/OnboardingSwiper';
import {Image, StyleSheet} from 'react-native';
import BottomTabStackNavigator from './BottomTabStackNavigator';
import ProductScreen from './screens/ProductScreen';

export default StackNavigator = () => {
  const Stack = createStackNavigator();
  const BottomTab = createBottomTabNavigator();

  const isAuthenticated = useSelector(
    state => state.authentication.isAuthenticated,
  );

  const AuthenticatedStack = () => (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen
        name={'BottomStackNavigator'}
        component={BottomTabStackNavigator}
      />
      <Stack.Screen
        name={NavigationsStrings.ProductScreen}
        component={ProductScreen}
      />
    </Stack.Navigator>
  );
  const UnauthenticatedStack = () => (
    <Stack.Navigator
      screenOptions={{headerShown: false}}
      initialRouteName={NavigationsStrings.OnboardingSwiper}>
      <Stack.Screen
        name={NavigationsStrings.OnboardingSwiper}
        component={OnboardingSwiper}
      />
      <Stack.Screen
        name={NavigationsStrings.LoginScreen}
        component={LoginScreen}
      />
      <Stack.Screen
        name={NavigationsStrings.SignupScreen}
        component={SignupScreen}
      />
    </Stack.Navigator>
  );

  return (
    <NavigationContainer>
      {isAuthenticated ? <AuthenticatedStack /> : <UnauthenticatedStack />}
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({
  tabIcon: {
    // backgroundColor: 'red',
    height: '75%',
    width: '35%',
  },
});
