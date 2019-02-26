import React, { Component } from 'react';
import { TouchableOpacity, Text, View, Image, FlatList, Alert } from 'react-native';
import { MHDonHang, MHDiaChi } from './tenManHinh'
import { firebaseApp } from './firebase';
const database = firebaseApp.database();

import Header from './Header';

class FlatListItem extends Component {

    constructor(props) {
        super(props);
        this.state={
            uid : firebaseApp.auth().currentUser.uid,
        }
    }

    onPressXoa = (item) => {
        const uid = firebaseApp.auth().currentUser.uid;
        Alert.alert(
            'Thông báo',
            'Bạn chắc chắn muốn xoá địa chỉ này?',
            [

                { text: 'OK', onPress: () => { [firebaseApp.database().ref('DiaChi').child(`${uid}`).child(item.key).remove(), this.props.navigation.navigate('MHListDiaChi')] } },
                { text: 'Cancel', onPress: () => { } },
            ],
            { cancelable: false }
        )
    }

    render() {
        return (
            <TouchableOpacity
                onPress={this.props.onPressChon}
                style={{
                    height: 90,
                    backgroundColor: 'white',
                    marginRight: 5, marginLeft: 5, marginBottom: 5, padding: 5,
                    borderRadius: 5
                }}>

                <View style={{ flexDirection: 'row', flex: 1, }}>

                    <View style={{ flexDirection: 'column', flex: 0.9, }}>

                        <Text style={{ flex: 0.3, marginLeft: 5, fontWeight: 'bold' }}>
                            {this.props.item.HoTen}
                        </Text>

                        <Text style={{ flex: 0.25, marginLeft: 5 }}>
                            {this.props.item.SoDienThoai}
                        </Text>

                        <Text style={{ flex: 0.25, marginLeft: 5 }}>
                            {this.props.item.DiaChiCuThe}
                        </Text>

                        <Text style={{ flex: 0.25, marginLeft: 5 }}>
                            {this.props.item.Xa}, {this.props.item.Huyen}, {this.props.item.Tinh}
                        </Text>
                    </View>

                    <TouchableOpacity style={{ flex: 0.05, marginRight: 10 }}
                        onPress={this.props.onPressSua}>
                        <Image style={{ height: 18, width: 18 }}
                            source={{ uri: "https://img.icons8.com/ios/2x/edit-filled.png"}}></Image>
                    </TouchableOpacity>

                    <TouchableOpacity style={{ flex: 0.05, alignItems: 'flex-end', marginRight: 1 }}
                        onPress={() => { this.onPressXoa(this.props.item) }}>
                        <Image style={{ height: 20, width: 20 }}
                            source={{ uri:"https://img.icons8.com/ios/1600/trash.png"}}></Image>
                    </TouchableOpacity>
                </View>

            </TouchableOpacity>
        );
    }
}

export default class ListDiaChi extends Component {
    constructor(props) {
        super(props);
        this.state = {
            ListDiaChi: [],

        };
    }

    componentDidMount() {
        const uid = firebaseApp.auth().currentUser.uid;

        firebaseApp.database().ref('DiaChi').child(`${uid}`).on('value', (childs) => {
            const ListDiaChi = [];
            childs.forEach((doc) => {
                ListDiaChi.push({
                    key: doc.key,
                    HoTen: doc.toJSON().HoTen,
                    SoDienThoai: doc.toJSON().SoDienThoai,
                    Xa: doc.toJSON().Xa,
                    Huyen: doc.toJSON().Huyen,
                    Tinh: doc.toJSON().Tinh,
                    DiaChiCuThe: doc.toJSON().DiaChiCuThe,
                })
            });

            this.setState({
                ListDiaChi: ListDiaChi
            });
        });
    }

    render() {
        return (
            <View style={{ backgroundColor: 'gainsboro', flex: 1 }}>

                <Header TenMH='DANH SÁCH ĐỊA CHỈ'
                    navigate={() => this.props.navigation.pop()}></Header>

                <Text style={{ margin: 5, marginTop: 10, color: 'black', }}>Thông tin giao hàng</Text>

                <TouchableOpacity style={{
                    height: 30, flexDirection: 'row',
                    borderRadius: 3, margin: 5,
                    backgroundColor: 'white',
                }}
                    onPress={() => {
                        this.props.navigation.navigate(MHDiaChi, 'new');
                    }}>
                    <Image source={{ uri:"https://img.icons8.com/ios/2x/plus.png"}}
                        style={{ margin: 3, height: 25, width: 25 }}></Image>

                    <Text style={{ margin: 6, }}> Thêm địa chỉ mới</Text>

                </TouchableOpacity>

                <FlatList
                    data={this.state.ListDiaChi}
                    renderItem={({ item, index }) => {
                        return (
                            <FlatListItem item={item}
                                index={index}
                                parentFlatList={this}
                                onPressSua={() => {
                                    this.props.navigation.navigate(MHDiaChi, item.key)
                                }}
                                onPressChon={() => {

                                    this.props.navigation.state.params.onUpdateState({
                                        HoTen: item.HoTen,
                                        SoDienThoai: item.SoDienThoai,
                                        Xa: item.Xa,
                                        Huyen: item.Huyen,
                                        Tinh: item.Tinh,
                                        DiaChiCuThe: item.DiaChiCuThe
                                    })
                                    this.props.navigation.navigate(MHDonHang, item)
                                }}>

                            </FlatListItem>);
                    }}>
                </FlatList>
            </View>
        );
    }
}