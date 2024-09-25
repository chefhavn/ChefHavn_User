import React from 'react';
import { Image, StyleSheet, View } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from '../screens/HomeScreen/HomeScreen';
import MyOrderScreen from '../screens/MyOrderScreen/MyOrderScreen';
import ProfileScreen from '../screens/ProfileScreen/ProfileScreen';
import Help from '../screens/SettingScreen/Help';
import Colors from '../utils/Colors';

const Tab = createBottomTabNavigator();

const TabBarIcon = ({ source, focused }) => {
  return (
    <View style={styles.iconContainer}>
      <Image
        source={source}
        style={[styles.icon, focused ? styles.activeIcon : styles.inactiveIcon]}
      />
    </View>
  );
};

const HomeTabNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarShowLabel: false,
        tabBarStyle: styles.tabBar,
        tabBarIconStyle: {
          justifyContent: 'center',
          alignItems: 'center',
        },
      }}
    >
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          tabBarIcon: ({ focused }) => (
            <TabBarIcon
              source={require('../assets/images/home.png')}
              focused={focused}
            />
          ),
        }}
      />
      <Tab.Screen
        name="My Orders"
        component={MyOrderScreen}
        options={{
          tabBarIcon: ({ focused }) => (
            <TabBarIcon
              source={require('../assets/images/myorder_white.png')}
              focused={focused}
            />
          ),
          headerShown: false,
        }}
      />
      <Tab.Screen
        name="Help"
        component={Help}
        options={{
          tabBarIcon: ({ focused }) => (
            <TabBarIcon
              source={require('../assets/images/help-white.png')}
              focused={focused}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          tabBarIcon: ({ focused }) => (
            <TabBarIcon
              source={require('../assets/images/profile.png')}
              focused={focused}
            />
          ),
        }}
      />

    </Tab.Navigator>
  );
};

const styles = StyleSheet.create({
  tabBar: {
    position: 'absolute',
    bottom: 20,
    left: 10,
    right: 10,
    elevation: 5,
    backgroundColor: Colors.PRIMARY,
    borderRadius: 50,
    height: 85,
    justifyContent: 'center',
    alignItems: 'center',
    paddingLeft: 20,
    paddingRight: 20
  },
  iconContainer: {
    justifyContent: 'space-around',
    alignItems: 'center',
    height: '100%',
  },
  icon: {
    width: 35,
    height: 35,
    margin: 0,
    padding: 0,
  },
  activeIcon: {
    tintColor: Colors.ACTIVE,
  },
  inactiveIcon: {
    tintColor: Colors.INACTIVE,
  },
});

export default HomeTabNavigator;
