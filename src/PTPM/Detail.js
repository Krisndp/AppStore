import React, {Component} from 'react';
import {View, Text,FlatList,Image,TouchableOpacity,TextInput,Alert,ActivityIndicator}from 'react-native';
import { firebaseApp } from './firebase';


export  default class Detail extends Component{

    componentWillMount() {
        // this.setState({
        //     uid:firebaseApp.auth().currentUser.uid
        // })
        var uid=firebaseApp.auth().currentUser.uid;
        this.listenForItem(uid);

    }
    constructor(){
        super();
        this.state={
            data:null,
            total:0,
            uid:null
        }
    }
    listenForItem(uid) {
        // let data=firebaseApp.database().ref('Basket/1');
        // console.warn(data)
        var keyThongBao = this.props.navigation.state.params;
        firebaseApp.database().ref('/ThongBao/' + uid + "/" + keyThongBao).once('value').then((child) => {

            this.setState({
                id: child.key,
                price: child.val().SanPham.Gia,
                link: child.val().SanPham.Link,
                message: child.val().SanPham.LoiNhan,
                amount: child.val().SanPham.SoLuongMua,
                name: child.val().SanPham.TenSP,
                nameOfSeller: child.val().TenShop,
                total: child.val().SanPham.ThanhTien,
                keySP: child.val().SanPham.keySanPham,
                DiaChiCuThe: child.val().DiaChi.DiaChiCuThe,
                Xa: child.val().DiaChi.Xa,
                Huyen: child.val().DiaChi.Huyen,
                Tinh: child.val().DiaChi.Tinh,
                HoTen: child.val().DiaChi.HoTen,
                SoDienThoai: child.val().DiaChi.SoDienThoai,
                LoiNhan: child.val().SanPham.LoiNhan,
            })
            //console.warn(child);

        })
    }

    render() {
        return (
            <View style={{ flex: 1, backgroundColor: 'silver' }}>
                <View
                    style={{
                        height: 90,
                        backgroundColor: 'white',
                        marginRight: 5, marginLeft: 5, marginTop: 10, padding: 5,
                        borderRadius: 5, marginBottom: 10,
                    }}>

                    <View style={{ flexDirection: 'row', flex: 1, marginTop: 10 }}>

                        <View style={{ flexDirection: 'column', flex: 0.9, }}>

                            <Text style={{ flex: 0.3, marginLeft: 5, fontWeight: 'bold' }}>
                                {this.state.HoTen}
                            </Text>

                            <Text style={{ flex: 0.25, marginLeft: 5 }}>
                                {this.state.SoDienThoai}
                            </Text>

                            <Text style={{ flex: 0.25, marginLeft: 5 }}>
                                {this.state.DiaChiCuThe}
                            </Text>

                            <Text style={{ flex: 0.25, marginLeft: 5 }}>
                                {this.state.Xa}, {this.state.Huyen}, {this.state.Tinh}
                            </Text>
                        </View>
                    </View>

                </View>


                <View style={{ margin: 5, borderRadius: 5, backgroundColor: 'white' }}>

                    <View style={{ height: 1, backgroundColor: 'silver' }}>
                    </View>

                    <View style={{ flexDirection: 'row', padding: 5, }}>
                        <Image style={{
                            height: 70, width: 70
                        }}
                            source={{ uri: this.state.link }}>
                        </Image>

                        <View style={{ flex: 1, flexDirection: 'column' }}>
                            <Text style={{ marginLeft: 5, flex: 0.9, fontSize: 18 }}>
                                {this.state.name}
                            </Text>

                            <Text style={{ marginLeft: 5, fontWeight: 'bold', fontSize: 16 }}>
                                Giá: {String(this.state.price).replace(/(?:(^\d{1,3})(?=(?:\d{3})*$)|(\d{3}))(?!$)/mg, '$1$2.')} VNĐ
                        </Text>
                        </View>
                        <View style={{ flex: 0.5, justifyContent: 'center', alignItems: 'center' }}>
                            <Text style={{ fontSize: 16, fontWeight: 'bold' }}>x {this.state.amount}</Text>
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
                                {String(this.state.total).replace(/(?:(^\d{1,3})(?=(?:\d{3})*$)|(\d{3}))(?!$)/mg, '$1$2.')} VNĐ
                        </Text>
                        </View>

                    </View>

                    <View style={{ height: 1, backgroundColor: 'silver' }}>
                    </View>


                </View>

                <View style={{ height: 100, margin: 5, alignItems: 'center', flexDirection: 'row', backgroundColor: 'white', borderRadius: 5 }}>
                    <Text>Lời nhắn: {this.state.LoiNhan}</Text>
                </View>
            </View>
        );
    }
}
