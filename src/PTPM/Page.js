import React, { Component } from 'react';
import { createStackNavigator, createDrawerNavigator } from 'react-navigation'; // Version can be specified in package.json

import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity, Image
} from 'react-native';
import Login from './Login';
import { TabNavigator, TabBarBottom } from 'react-navigation'; // Version can be specified in package.json
import Register from './Register';
import User from './User';
import DanhMucSanPham from './DanhMucSanPham'
import TTCN from './TTCN';
import MuaHang from './MuaHang';
import ThongBao from './ThongBao';
import BanHang from './BanHang';
import DangHang from './DangHang';
import Brand from './Brand';
import ChiTiet from './ChiTiet';
import DanhGia from './DanhGia';
import Basket from './basket';
import DonHangComponent from './DonHangComponent';
import ListDiaChi from './ListDiaChi';
import DiaChi from './DiaChi';
import LichSuMuaHang from './LichSuaMuaHang';
import ChiTietDonHang from './ChiTietDonHang';
import Loc from './Loc';
import Detail from './Detail';
import UserInfoOrder from './UserInfoOrder';
import EditInfo from './EditInfo'
const RootStack = createStackNavigator(
    {
        Login: { screen: Login },
        Register: { screen: Register },
        User: { screen: User },
        DanhMucSanPham: { screen: DanhMucSanPham },
        TTCN: { screen: TTCN },
        MuaHang: { screen: MuaHang },
        ThongBao: { screen: ThongBao },
        BanHang: { screen: BanHang },
        DangHang: { screen: DangHang },
        Brand: { screen: Brand },
        ChiTiet: { screen: ChiTiet },
        DanhGia: { screen: DanhGia },
        Basket: { screen: Basket },
        MHDonHang: {
            screen: DonHangComponent,
            navigationOptions: {
                header:null
            }
        },
        MHListDiaChi: {
            screen: ListDiaChi,
            navigationOptions: {
                header: null
            }
        },
        MHDiaChi: {
            screen: DiaChi,
            navigationOptions: {
                header: null
            }
        },
        MHLichSuMuaHang: {
            screen: LichSuMuaHang,
            navigationOptions: {
                header: null
            }
        },
        MHChiTietDonHang: {
            screen: ChiTietDonHang,
            navigationOptions: {
                header: null
            }
        },
        Loc: {
            screen: Loc,
            navigationOptions: {
                header: null
            }
        },
        UserInfoOrder: {
            screen: UserInfoOrder,
        },
        EditInfo: {
            screen: EditInfo
        },
        Detail: {
            screen: Detail
        }

    },
    {
        initialRouteName: 'Login',
    },
);




export default RootStack;