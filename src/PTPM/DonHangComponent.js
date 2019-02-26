import React, { Component } from 'react';
import { TouchableOpacity, Text, View, Image, FlatList, TextInput, Alert } from 'react-native';
import { MHListDiaChi } from './tenManHinh'
import { firebaseApp } from './firebase';
const database = firebaseApp.database();

import {  formatNumber } from './Ref'
import Header from './Header';

class FlatListItem extends Component {
    constructor(props) {
        super(props);
        this.state = {
            LoiNhan: "",
        };
    }

    render() {
        const Gia = formatNumber(this.props.item.Gia);
        const ThanhTien = formatNumber(this.props.item.ThanhTien);

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
                            {Gia} đ
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
                            {ThanhTien} đ
                        </Text>
                    </View>

                </View>

                <View style={{ height: 1, backgroundColor: 'silver' }}>
                </View>

                <TextInput style={{ padding: 3 }}
                    placeholder='Lời nhắn cho cửa hàng...'
                    onChangeText={
                        (text) => {
                            this.setState({LoiNhan: text})

                            this.props.setLoiNhan(text);
                        }
                    }
                    value={this.state.LoiNhan} />
            </View>
        );
    }
}

export default class DonHangComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            HoTen: 'Vui lòng chọn địa chỉ giao hàng',
            SoDienThoai: '',
            Xa: '',
            Huyen: '',
            Tinh: '',
            DiaChiCuThe: '',
            SanPham: [],
            TongTien: 0,

            SoLuongHienTai: 0,
        };
    }

    navigate = (sc) => { this.props.navigation.navigate(sc) }

    componentDidMount = () => {
        const uid = firebaseApp.auth().currentUser.uid;
        firebaseApp.database().ref('DiaChi').child(`${uid}`).limitToFirst(1).once('value', (childs) => {

            if (childs.exists()) {
                childs.forEach((doc) => {
                    this.setState({
                        HoTen: doc.val().HoTen,
                        SoDienThoai: doc.val().SoDienThoai,
                        Xa: doc.val().Xa,
                        Huyen: doc.val().Huyen,
                        Tinh: doc.val().Tinh,
                        DiaChiCuThe: doc.val().DiaChiCuThe,
                    })
                })
            }
        });

        firebaseApp.database().ref('GioHang').child(`${uid}`).on('value', (childs) => {

            const GioHang = [];
            var TongTien = 0;
            childs.forEach((doc) => {
                GioHang.push({
                    key: doc.key,
                    AvataNguoiBan: doc.toJSON().AvataNguoiBan,
                    TenShop: doc.toJSON().TenShop,
                    Link: doc.toJSON().Link,
                    TenSP: doc.toJSON().TenSP,
                    Gia: doc.toJSON().Gia,
                    SoLuongMua: doc.toJSON().SoLuongMua,
                    idNguoiBan: doc.toJSON().idNguoiBan,

                    LoiNhan: "",
                    ThanhTien: doc.toJSON().Gia * doc.toJSON().SoLuongMua,
                })

                TongTien += doc.toJSON().Gia * doc.toJSON().SoLuongMua
            });

            this.setState({
                SanPham: GioHang,
                TongTien: TongTien
            });
        });
        console.log(this.state.uid)
    }

    onPressThongTinNhanHang = () => {
        this.props.navigation.navigate(MHListDiaChi, { onUpdateState: this.onUpdateState })
    }

    onUpdateState = data => {
        this.setState(data);
    };

    onPressDatHang = () => {
        if (this.state.SoDienThoai.trim() == '') {
            Alert.alert(
                'Thông báo',
                'Vui lòng thêm địa chỉ',
                [

                    { text: 'OK', onPress: () => console.log('OK') },
                ],
                { cancelable: false } //day la gi
            )
        } else {
            var today = new Date();
            var Ngay = today.getDate() + "/" + parseInt(today.getMonth() + 1) + "/" + today.getFullYear();
            const uid = firebaseApp.auth().currentUser.uid;
            //Push len DonHang
            var linkDonHang = firebaseApp.database().ref('DonHang').child(uid).push({
                DiaChi: {
                    HoTen: this.state.HoTen,
                    SoDienThoai: this.state.SoDienThoai,
                    Xa: this.state.Xa,
                    Huyen: this.state.Huyen,
                    Tinh: this.state.HoTen,
                    DiaChiCuThe: this.state.Tinh,
                },
                Ngay: Ngay,

                TongTien: this.state.TongTien
            });

            var keyDonHang = linkDonHang.key;

            this.state.SanPham.map((item) => {
                const uid = firebaseApp.auth().currentUser.uid;
                //Push danh sach san pham
                firebaseApp.database().ref('DonHang').child(`${uid}`).child(keyDonHang).child('SanPham').child(item.key).set({
                    AvataNguoiBan: item.AvataNguoiBan,
                    Gia: item.Gia,
                    Link: item.Link,
                    SoLuongMua: item.SoLuongMua,
                    TenShop: item.TenShop,
                    TenSP: item.TenSP,
                    ThanhTien: item.ThanhTien,
                    LoiNhan: item.LoiNhan,
                    idNguoiBan: item.idNguoiBan,
                })

                //Tru so luong san pham
                firebaseApp.database().ref('Product').child(item.idNguoiBan).child(item.key).once('value', (childs) => {
                    const SoLuongHienTai = childs.val().SoLuong;

                    this.setState({
                        SoLuongHienTai: SoLuongHienTai,
                    },

                        () => firebaseApp.database().ref('Product').child(item.idNguoiBan).child(item.key).update({
                            SoLuong: this.state.SoLuongHienTai - item.SoLuongMua,
                        })
                    );
                });

                //Push thong bao den Nguoi ban
                var linkThongBao = firebaseApp.database().ref('ThongBao').child(item.idNguoiBan).push(({
                    DiaChi: {
                        HoTen: this.state.HoTen,
                        SoDienThoai: this.state.SoDienThoai,
                        Xa: this.state.Xa,
                        Huyen: this.state.Huyen,
                        Tinh: this.state.HoTen,
                        DiaChiCuThe: this.state.Tinh,
                    },
                    Ngay: Ngay,
                    idNguoiMua: uid,
                }));
                var keyThongBao = linkThongBao.key;

                firebaseApp.database().ref('ThongBao').child(item.idNguoiBan).child(keyThongBao).child('SanPham').set({
                    keySanPham: item.key,
                    Gia: item.Gia,
                    Link: item.Link,
                    SoLuongMua: item.SoLuongMua,
                    TenShop: item.TenShop,
                    TenSP: item.TenSP,
                    ThanhTien: item.ThanhTien,
                    LoiNhan: item.LoiNhan,
                })
            });

            firebaseApp.database().ref('GioHang').child(uid).remove();
            Alert.alert(
                'Thông báo',
                'Đặt hàng thành công!',
                [

                    { text: 'OK', onPress: () => this.props.navigation.navigate('MHLichSuMuaHang') },
                ],
                { cancelable: false } //day la gi
            )
        }
    }

    render() {
        const TongTien = formatNumber(this.state.TongTien);

        return (
            <View style={{ backgroundColor: 'gainsboro', flex: 1 }}
            >
                <Header TenMH = 'ĐƠN HÀNG'
                        navigate = {()=>this.props.navigation.pop()}></Header>

                <Text style={{ margin: 5, color: 'black', }}>Thông tin giao hàng</Text>

                <TouchableOpacity
                    onPress={() => { this.onPressThongTinNhanHang() }}
                    style={{
                        height: 90,
                        backgroundColor: 'white',
                        marginRight: 5, marginLeft: 5, marginBottom: 5, padding: 5,
                        borderRadius: 5
                    }}>

                    <View style={{ flexDirection: 'row', flex: 1, }}>

                        <View style={{ flexDirection: 'column', flex: 0.9, }}>

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

                        <View style={{
                            flex: 0.1, justifyContent: 'center',
                            alignItems: 'flex-end', marginRight: 5
                        }}>
                            <Image style={{ height: 15 }}
                                source={{ uri:"https://img.icons8.com/ios/2x/forward-filled.png"}}></Image>
                        </View>
                    </View>

                </TouchableOpacity>


                <FlatList
                    ref={"flatList"}
                    data={this.state.SanPham}
                    renderItem={({ item, index }) => {
                        return (
                            <FlatListItem item={item}
                                index={index}
                                parentFlatList={this}
                                setLoiNhan={(LoiNhan) => {
                                    this.state.SanPham[index].LoiNhan = LoiNhan;
                                }}>

                            </FlatListItem>);
                    }}>
                </FlatList>

                <View style={{ height: 50, flexDirection: 'row', backgroundColor: 'white', }}>
                    <View style={{ flex: 0.7 }}>
                        <Text style={{ flex: 0.4, marginLeft: 5, marginEnd: 5, color: 'black' }}>
                            Tổng tiền
                        </Text>

                        <Text style={{
                            flex: 0.6,
                            fontWeight: 'bold', fontSize: 20,
                            marginLeft: 5, color: 'red'
                        }}>
                            {TongTien} đ
                        </Text>
                    </View>

                    <TouchableOpacity style={{
                        flex: 0.3, margin: 5, borderRadius: 5,
                        backgroundColor: 'dodgerblue',
                        justifyContent: 'center',
                        alignItems: 'center'
                    }}
                        onPress={() => { this.onPressDatHang() }}>
                        <Text style={{ color: 'white', fontWeight: 'bold' }}>ĐẶT HÀNG</Text>
                    </TouchableOpacity>

                </View>
            </View>
        );
    }
}