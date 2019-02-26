import React, { Component } from 'react';
import { TouchableOpacity, Text, View, Image, FlatList, TextInput } from 'react-native';
import { firebaseApp } from './firebase';
const database = firebaseApp.database();
import { MHChiTietDonHang } from './tenManHinh'

import Header from './Header';

export default class LichSuMuaHang extends Component {
    constructor(props) {
        super(props);
        this.state = ({
            DonHang: [],
        })
    }

    navigate = (sc, p) => { this.props.navigation.navigate(sc, p) }

    componentDidMount() {
        const uid = firebaseApp.auth().currentUser.uid;
        firebaseApp.database().ref('DonHang').child(`${uid}`).on('value', (childs) => {
            const DonHang = [];
            childs.forEach((doc) => {
                DonHang.push({
                    key: doc.key,
                    Ngay: doc.toJSON().Ngay,
                    TongTien: doc.toJSON().TongTien
                })
            });

            this.setState({
                DonHang: DonHang.sort(function (a, b) {
                    if (a.key < b.key) {
                        return 1;
                    } else if (a.key > b.key) {
                        return -1;
                    } else {
                        return 0;
                    }
                })
            })
        })
    }

    render() {
        return (
            <View style={{ flex: 1 }}>

                <Header TenMH='LỊCH SỬ MUA HÀNG'
                    navigate={() => this.props.navigation.navigate('User')}></Header>
                <Text style={{ margin: 5 }}>
                    Danh sách đơn hàng
                </Text>

                <View style={{ height: 1, backgroundColor: 'gray', margin: 5 }}></View>

                <FlatList data={this.state.DonHang}
                    renderItem={({ item, index }) => {
                        return (
                            <View>
                                <TouchableOpacity style={{ margin: 5, flexDirection: 'row' }}
                                    onPress={() => {
                                        this.navigate(MHChiTietDonHang, item.key);
                                    }}>
                                    <View style={{ flex: 0.9 }}>
                                        <Text style={{ fontWeight: 'bold' }}>Đơn hàng {index + 1}</Text>

                                        <Text style={{}}>Ngày mua hàng: {item.Ngay}</Text>

                                        <Text style={{}}>Tổng số tiền: {item.TongTien} đ</Text>

                                    </View>

                                    <View style={{
                                        flex: 0.1, justifyContent: 'center',
                                        alignItems: 'flex-end', marginRight: 5
                                    }}>
                                        <Image style={{ height: 15 }}
                                            source={{ uri:"https://img.icons8.com/ios/2x/forward-filled.png"}}></Image>
                                    </View>


                                </TouchableOpacity>

                                <View style={{
                                    height: 1, backgroundColor: 'gray',
                                    marginRight: 5, marginLeft: 5
                                }}></View>
                            </View>
                        );
                    }}>

                </FlatList>

            </View>

        );
    }
}
