import React, { Component } from 'react';
import { createStackNavigator, DrawerNavigator } from 'react-navigation'; // Version can be specified in package.json

import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity, Image
} from 'react-native';
import { TabNavigator, TabBarBottom } from 'react-navigation'; // Version can be specified in package.json
import DetailsScreen from './Details';
import Drawer from './StackTab';
import ChiTiet from './ChiTiet';
import Login from './Login'

const RootStack = createStackNavigator(
    {
        Login: { screen: Login },
        Drawer: { screen: Drawer },
        ChiTiet: { screen: ChiTiet },
    },
    {
        initialRouteName: 'Drawer',
    }
);


export default RootStack;