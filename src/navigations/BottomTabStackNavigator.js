import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {useSelector} from 'react-redux';
import NavigationsStrings from '../constants/strings/NavigationsStrings';
import LoginScreen from './screens/authentication/LoginScreen';
import SignupScreen from './screens/authentication/SignupScreen';
import HomeScreen from './screens/HomeScreen';
import OnboardingSwiper from './screens/onboarding/OnboardingSwiper';
import ImageStrings from '../constants/strings/ImageStrings';
import {Image, StyleSheet} from 'react-native';
import CartScreen from './screens/cartScreen/CartScreen';

export default BottomTabStackNavigator = () => {
  const BottomTab = createBottomTabNavigator();
  return (
    <BottomTab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          // backgroundColor: 'red',
          height: Platform.OS == 'android' ? '10%' : '12%',
        },
        tabBarItemStyle: {
          // backgroundColor: 'yellow',
          // alignSelf: 'center',
          // justifyContent: 'center',
        },
      }}
      initialRouteName={NavigationsStrings.CartScreen}>
      <BottomTab.Screen
        name={NavigationsStrings.HomeScreen}
        component={HomeScreen}
        options={{
          tabBarShowLabel: false,
          tabBarIcon: ({focused}) => (
            <Image
              resizeMode="contain"
              style={styles.tabIcon}
              source={
                focused
                  ? ImageStrings.iconImages.homeSelected
                  : ImageStrings.iconImages.home
              }
            />
          ),
        }}
      />
      <BottomTab.Screen
        name={NavigationsStrings.HomeScreen + '1'}
        component={HomeScreen}
        options={{
          tabBarShowLabel: false,
          tabBarIcon: ({focused}) => (
            <Image
              resizeMode="contain"
              style={styles.tabIcon}
              source={
                focused
                  ? ImageStrings.iconImages.categoriesSelected
                  : ImageStrings.iconImages.categories
              }
            />
          ),
        }}
      />
      <BottomTab.Screen
        name={NavigationsStrings.CartScreen}
        component={CartScreen}
        options={{
          tabBarShowLabel: false,
          tabBarIcon: () => (
            <Image
              resizeMode="contain"
              style={[styles.tabIcon, {height: '85%', width: '60%'}]}
              source={ImageStrings.iconImages.cart}
            />
          ),
        }}
      />
      <BottomTab.Screen
        name={NavigationsStrings.HomeScreen + '22'}
        component={HomeScreen}
        options={{
          tabBarShowLabel: false,
          tabBarIcon: ({focused}) => (
            <Image
              resizeMode="contain"
              style={styles.tabIcon}
              source={
                focused
                  ? ImageStrings.iconImages.favoritesSelected
                  : ImageStrings.iconImages.favorites
              }
            />
          ),
        }}
      />
      <BottomTab.Screen
        name={NavigationsStrings.HomeScreen + '23'}
        component={HomeScreen}
        options={{
          tabBarShowLabel: false,
          tabBarIcon: ({focused}) => (
            <Image
              resizeMode="contain"
              style={styles.tabIcon}
              source={
                focused
                  ? ImageStrings.iconImages.userSelected
                  : ImageStrings.iconImages.user
              }
            />
          ),
        }}
      />
    </BottomTab.Navigator>
  );
};
const styles = StyleSheet.create({
  tabIcon: {
    // backgroundColor: 'red',
    height: '75%',
    width: '35%',
  },
});
