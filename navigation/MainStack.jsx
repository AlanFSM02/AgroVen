import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/Ionicons';
import Home from '../screens/Home';
import Plants from '../screens/Plants';
import Login from '../screens/Login';
import Register from '../screens/Register';
import Gardens from '../screens/Gardens';

import { View, StyleSheet } from 'react-native';

const Tab = createBottomTabNavigator();

function MainStack() {
    return (
        <Tab.Navigator
            initialRouteName="Home"
            screenOptions={({ route}) => ({
                tabBarIcon: ({ focused, color, size }) => {
                    let iconName;

                    if (route.name === 'Home') {
                        iconName = focused ? 'home' : 'home-outline';
                    } else if (route.name === 'Login') {
                        iconName = focused ? 'log-in' : 'log-in-outline';
                    } else if (route.name === 'Plants') {
                        iconName = focused ? 'leaf' : 'leaf-outline';
                    } else if (route.name === 'Register') {
                        iconName = focused ? 'person-add' : 'person-add-outline';
                    } else if (route.name === 'Gardens') {
                        iconName = focused ? 'flower' : 'flower-outline';
                    }

                    return <Icon name={iconName} size={size} color={color} />;
                },
                tabBarActiveTintColor: '#98BD87',
                tabBarInactiveTintColor: '#808080',
                tabBarShowLabel: false, // Nombres desactivados
                tabBarStyle: styles.tabBar,
                tabBarHideOnKeyboard:true,
            })}
        >
            <Tab.Screen name="Home" component={Home} options={{
               
               headerShown: false
           }} />
            <Tab.Screen name="Login" component={Login} options={{
               
                headerShown: false
            }} />
            <Tab.Screen name="Register" component={Register} options={{
               
               headerShown: false
           }} />
            <Tab.Screen name="Plants" component={Plants} options={{
               
               headerShown: false
           }} />
            <Tab.Screen name="Gardens" component={Gardens} options={{
               
               headerShown: false
           }} />
        </Tab.Navigator>
    );
}

export default function Navigation() {
    return (
        <NavigationContainer>
            <MainStack />
        </NavigationContainer>
    );
}

const styles = StyleSheet.create({
    tabBar: {
        position: 'absolute',
        bottom: 20,
        left: 20,
        right: 20,
        borderRadius: 20,
        height: 60,
        backgroundColor: 'white',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 10,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.5,
        elevation: 5,
    },
});
