import React, { Component } from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    Image,
    Platform,
    Button,
    View,
    TouchableOpacity,
    TextInput,
    FlatList, ImageBackground, Dimensions
} from 'react-native';
import { firebaseApp } from './firebase';
const database = firebaseApp.database();
const { width, height } = Dimensions.get('window');


export default class ThongBao extends Component {
    constructor(props) {
        super(props);
        this.itemRef = database;
        this.state = {
            link: '',
            hoten: '',

        }
    }
    componentDidMount() {
        const uid = firebaseApp.auth().currentUser.uid;
        const recentPostsRef = firebaseApp.database().ref('User/' + uid + '/TTCN/');
        recentPostsRef.once('value').then(snapshot => {
            // snapshot.val() is the dictionary with all your keys/values from the '/store' path

            this.setState({
                hoten: snapshot.val().Name,
                gt: snapshot.val().Sex,
                diachi: snapshot.val().Address,
                sdt: snapshot.val().PhoneNumber,
                email: snapshot.val().Email,
            })
        });
        this.listenForItems(this.itemRef);
    }
    listenForItems(itemRef) {
        var item = [];
        const uid = firebaseApp.auth().currentUser.uid;
        this.itemRef.ref('DonHangDenShop').child(`${uid}`).on('child_added', (dataSnapshot) => {
            item.push({
                DiaChi: dataSnapshot.val().DiaChi,
                Email: dataSnapshot.val().Email,
                GiaSP: dataSnapshot.val().GiaSP,
                HoTen: dataSnapshot.val().HoTen,
                key: dataSnapshot.key,
                SDT: dataSnapshot.val().SDT,
                TenSP: dataSnapshot.val().TenSP,
                link: dataSnapshot.val().Link,
                GioiTinh: dataSnapshot.val().GioiTinh,
                avataNM: dataSnapshot.val().avataNM,
                avatashop: dataSnapshot.val().avatashop,
                nameshop: dataSnapshot.val().nameshop,
                date: dataSnapshot.val().date,
                time: dataSnapshot.val().time,
                uid: dataSnapshot.val().uid,
            });
            this.setState({ item })
        })

    }
    static navigationOptions = ({ navigation }) => {
        return {
            header: null
        }
    }
    render() {
        return (
            <View style={{ flex: 1, }}>
                <View style={{ flex: 1 / 11, backgroundColor: '#55acee' }}>



                    <View style={{ flexDirection: 'row', height: 80, marginTop: 5, justifyContent: 'center', alignItems: 'center' }}>
                        <View style={{ flex: 1 / 8, justifyContent: 'center', alignItems: 'center', }}>
                            <TouchableOpacity onPress={() => this.props.navigation.navigate('User')}>
                                <Image source={{ uri: "https://png.icons8.com/ios/2x/left.png" }} style={{ margin: 10, width: 40, height: 40 }} />
                            </TouchableOpacity>
                        </View>


                        <View style={{ flex: 6 / 8, justifyContent: 'center', alignItems: 'center' }}>
                            <Text style={{ fontSize: 30, color: 'white', height: 50 }}>DON HANG CUA KHACH</Text>
                        </View>

                        <View style={{ flex: 1 / 8, justifyContent: 'center', alignItems: 'center', }}>
                            <TouchableOpacity onPress={() => this.props.navigation.navigate('Basket')}>
                                <Image source={{ uri: "https://png.icons8.com/android/2x/shopping-cart.png" }} style={{ width: 30, height: 30 }} />
                            </TouchableOpacity>
                        </View>
                    </View>

                </View>
                <View style={{ flex: 10 / 11 }}>
                    <FlatList
                        data={this.state.item}
                        renderItem={({ item }) =>
                            <View style={{ flexDirection: 'column', marginTop: 20, backgroundColor: 'white' }}>
                                <View style={{ backgroundColor: 'white', flexDirection: 'row', borderBottomColor: 'grey', borderBottomWidth: 1 }} >
                                    <View style={{ marginLeft: 20, marginTop: 10, marginBottom: 5 }}>
                                        <Image source={{ uri: item.avataNM }} style={{ width: 40, height: 40, borderRadius:20 }} />
                                    </View>
                                    <View style={{ marginLeft: 10, flexDirection: 'column', alignItems: 'center' }}>
                                        <Text style={{ color: 'black', fontSize: 25, fontWeight: 'cover', marginTop: 5, marginRight: 5 }}>{item.HoTen}</Text>
                                    </View>
                                </View>

                                <TouchableOpacity onPress={() => this.props.navigation.navigate('CTDH', {
                                    DiaChi: item.DiaChi,
                                    Email: item.Email,
                                    GiaSP: item.GiaSP,
                                    HoTen: item.HoTen,
                                    key: item.key,
                                    SDT: item.SDT,
                                    TenSP: item.TenSP,
                                    link: item.link,
                                    GioiTinh: item.GioiTinh,
                                    avataNM: item.avataNM,
                                    avatashop: item.avatashop,
                                    nameshop: item.nameshop,
                                    date: item.date,
                                    time: item.time,
                                    uid: item.uid,
                                })}>
                                <View style={{ flexDirection: 'row', borderBottomColor: 'grey', borderBottomWidth: 1 }}>
                                    <View style={{ margin: 10, width: 110, height: 110 }}>
                                        <Image source={{ uri: item.link }} style={{ width: 100, height: 100, }} />
                                    </View>
                                    <View style={{ flexDirection: 'column', width: width - 130 }}>
                                        <View style={{ flexDirection: 'column', marginTop: 5, marginLeft: 10 }}>
                                            <Text style={{ fontSize: 25, color: 'black', marginTop: 5 }}>Ten san pham: {item.TenSP} </Text>
                                            <View style={{ marginTop: 5, flexDirection: 'row' }}>
                                                <Text style={{ color: '#808080', fontSize: 25 }}>Gia tien:</Text>
                                                <Text style={{ color: '#ef4056', fontSize: 25, marginLeft: 5 }}> {item.GiaSP}</Text>
                                            </View>
                                        </View>

                                    </View>
                                </View>

                                <View style={{ backgroundColor: 'white', flexDirection: 'row', borderBottomColor: 'grey', borderBottomWidth: 1, marginTop: 5}} >
                                    <View style={{ flex: 1 }}>
                                        <Text style={{ color: 'black', fontSize: 25, fontWeight: 'cover', marginTop: 5, marginLeft: 5 }}>Thoi gian mua hang</Text>
                                    </View>
                                    <View style={{ flex: 1, flexDirection: 'column', alignItems: 'flex-end' }}>
                                        <Text style={{ color: 'black', fontSize: 20, fontWeight: 'cover', marginTop: 5, marginRight: 5 }}>{item.time}</Text>
                                    </View>
                                </View>

                                <View style={{ backgroundColor: 'white', flexDirection: 'row', borderBottomColor: 'grey', borderBottomWidth: 1, marginTop: 5 }} >
                                    <View style={{ flex: 1 }}>
                                        <Text style={{ color: 'black', fontSize: 25, fontWeight: 'cover', marginTop: 5, marginLeft: 5 }}>Ngay mua hang</Text>
                                    </View>
                                    <View style={{ flex: 1, flexDirection: 'column', alignItems: 'flex-end' }}>
                                        <Text style={{ color: 'black', fontSize: 20, fontWeight: 'cover', marginTop: 5, marginRight: 5 }}>{item.date}</Text>
                                    </View>
                                    </View>
                                </TouchableOpacity>
                            </View>
                        } />



                </View>
            </View>
        )
    }
}
