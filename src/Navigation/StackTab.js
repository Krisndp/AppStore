import React, { Component } from 'react';
import { createStackNavigator, DrawerNavigator } from 'react-navigation'; // Version can be specified in package.json

import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity, Image
} from 'react-native';
import Login from './Login';
import { TabNavigator, TabBarBottom } from 'react-navigation'; // Version can be specified in package.json
import DetailsScreen from './Details';
import DrawerScreen from './DrawerScreen'

const StackTab = TabNavigator(
    {
        Home: {
            screen: DetailsScreen
        },
        Details: {
            screen: Login
        }
    },
    {
        tabBarComponent: TabBarBottom,
        tabBarPosition: 'top',
        tabBarOptions: {
            activeTintColor: 'tomato',
            inactiveTintColor: 'gray',

        },
        animationEnabled: false,
        swipeEnabled: false,
    }
);

export default Drawer = DrawerNavigator({
    Tabs: {
        screen: StackTab
    }
}, {
        contentComponent: props => <DrawerScreen {...props} />
    });