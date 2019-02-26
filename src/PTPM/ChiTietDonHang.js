import React, { Component } from 'react';
import { TouchableOpacity, Text, View, Image, FlatList, TextInput } from 'react-native';
import Header from './Header';
import { firebaseApp } from './firebase';
const database = firebaseApp.database();

class FlatListItem extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <View style={{ margin: 5, borderRadius: 3, backgroundColor: 'white' }}>
                <View style={{
                    flexDirection: 'row', padding: 5
                }}>
                    <Image style={{
                        height: 30, width: 30
                    }}
                        source={{ uri: this.props.item.AvataNguoiBan }}>
                    </Image>
                    <Text style={{
                        fontWeight: 'bold',
                        marginLeft: 5, marginTop: 5
                    }}>
                        {this.props.item.TenShop}
                    </Text>

                </View>
                <View style={{ height: 1, backgroundColor: 'silver' }}>
                </View>

                <View style={{ flexDirection: 'row', padding: 5, }}>
                    <Image style={{
                        height: 70, width: 70
                    }}
                        source={{ uri: this.props.item.Link }}>
                    </Image>

                    <View style={{ flex: 0.85, flexDirection: 'column' }}>
                        <Text style={{ marginLeft: 5, flex: 0.9 }}>
                            {this.props.item.TenSP}
                        </Text>

                        <Text style={{ marginLeft: 5, fontWeight: 'bold' }}>
                            {this.props.item.Gia} đ
                        </Text>
                    </View>

                    <View style={{ flex: 0.15, alignItems: 'flex-end' }}>
                        <Text style={{ fontWeight: 'bold' }}>x {this.props.item.SoLuongMua}</Text>
                    </View>
                </View>

                <View style={{ height: 1, backgroundColor: 'silver' }}>
                </View>

                <View style={{ flexDirection: 'row' }}>
                    <View style={{ flex: 0.5, }}>
                        <Text style={{
                            margin: 5,
                        }}>
                            Thành tiền
                        </Text>
                    </View>

                    <View style={{ flex: 0.5, alignItems: 'flex-end' }}>
                        <Text style={{
                            margin: 5, color: 'red'
                        }}>
                            {this.props.item.ThanhTien} đ
                        </Text>
                    </View>

                </View>

                <View style={{ height: 1, backgroundColor: 'silver' }}>
                </View>
            </View>
        );
    }
}

export default class ChiTietDonHang extends Component {
    constructor(props) {
        super(props);
        this.state = ({
            HoTen: '',
            SoDienThoai: '',
            Xa: '',
            Huyen: '',
            Tinh: '',
            DiaChiCuThe: '',

            Ngay: '',
            SanPham: [],
            TongTien: 0,
        })
    }

    componentDidMount() {
        var keyFromLichSuMuaHang = this.props.navigation.state.params;
        const uid = firebaseApp.auth().currentUser.uid;
        firebaseApp.database().ref('DonHang').child(uid).child(keyFromLichSuMuaHang).on('value', (childs) => {
            const HoTen = childs.val().DiaChi.HoTen;
            const SoDienThoai = childs.val().DiaChi.SoDienThoai;
            const Xa = childs.val().DiaChi.Xa;
            const Huyen = childs.val().DiaChi.Huyen;
            const Tinh = childs.val().DiaChi.Tinh;
            const DiaChiCuThe = childs.val().DiaChi.DiaChiCuThe;
            const Ngay = childs.val().Ngay;
            const TongTien = childs.val().TongTien;

            this.setState({
                HoTen: HoTen,
                SoDienThoai: SoDienThoai,
                Xa: Xa,
                Huyen: Huyen,
                Tinh: Tinh,
                DiaChiCuThe: DiaChiCuThe,

                Ngay: Ngay,
                TongTien: TongTien,
            })
        });
        firebaseApp.database().ref('DonHang').child(uid).child(keyFromLichSuMuaHang).child('SanPham').on('value', (childs) => {
            const SanPham = [];
            childs.forEach((doc) => {
                SanPham.push({
                    key: doc.key,
                    AvataNguoiBan: doc.toJSON().AvataNguoiBan,
                    Gia: doc.toJSON().Gia,
                    Link: doc.toJSON().Link,
                    SoLuongMua: doc.toJSON().SoLuongMua,
                    TenSP: doc.toJSON().TenSP,
                    TenShop: doc.toJSON().TenShop,
                    ThanhTien: doc.toJSON().ThanhTien,
                })
            });
            this.setState({
                SanPham: SanPham,
            });

        });
    }

    render() {
        return (
            <View style={{ backgroundColor: 'gainsboro', flex: 1 }}
            >
                <Header TenMH='CHI TIẾT ĐƠN HÀNG'
                    navigate={() => this.props.navigation.pop()}></Header>

                <Text style={{ margin: 5, color: 'black', }}>Chi tiết đơn hàng</Text>

                <View
                    style={{
                        height: 90,
                        backgroundColor: 'white',
                        marginRight: 5, marginLeft: 5, marginBottom: 5, padding: 5,
                        borderRadius: 5
                    }}>

                    <View style={{ flexDirection: 'column', flex: 1, }}>

                        <Text style={{ flex: 0.25, marginLeft: 5, fontWeight: 'bold' }}>
                            {this.state.HoTen}
                        </Text>

                        <Text style={{ flex: 0.25, marginLeft: 5 }}>
                            {this.state.SoDienThoai}
                        </Text>

                        <Text style={{ flex: 0.25, marginLeft: 5 }}>
                            {this.state.DiaChiCuThe}
                        </Text>
                        <Text style={{ flex: 0.25, marginLeft: 5 }}>
                            {this.state.Xa} - {this.state.Huyen} - {this.state.Tinh}
                        </Text>
                    </View>

                </View>


                <FlatList
                    ref={"flatList"}
                    data={this.state.SanPham}
                    renderItem={({ item, index }) => {
                        return (
                            <FlatListItem item={item}
                                index={index}
                                parentFlatList={this}>

                            </FlatListItem>);
                    }}>
                </FlatList>

                <View style={{ height: 50, flexDirection: 'row', backgroundColor: 'white', }}>
                    <View style={{ flex: 0.5 }}>
                        <Text style={{ flex: 0.4, marginLeft: 5, marginEnd: 5, color: 'black' }}>
                            Tổng tiền
                        </Text>

                        <Text style={{
                            flex: 0.6,
                            fontWeight: 'bold', fontSize: 20,
                            marginLeft: 5, color: 'red'
                        }}>
                            {this.state.TongTien} đ
                        </Text>
                    </View>

                    <View style={{ flex: 0.5, alignItems: 'flex-end', justifyContent: 'center' }}>
                        <Text style={{ flex: 0.4, marginRight: 5, marginEnd: 5, color: 'black' }}>
                            Ngày mua hàng
                        </Text>

                        <Text style={{
                            flex: 0.6,
                            fontSize: 20,
                            marginRight: 5,
                        }}>
                            {this.state.Ngay}
                        </Text>
                    </View>

                </View>
            </View>
        );
    }
}