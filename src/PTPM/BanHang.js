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
import { createStackNavigator } from 'react-navigation';
import { firebaseApp } from './firebase';
const database = firebaseApp.database();
const { width, height } = Dimensions.get('window');
import { formatNumber } from './Ref'


export default class BanHang extends Component {
    constructor(props) {
        super(props);
        this.itemRef = database;
        this.state = {
            Email: firebaseApp.auth().currentUser.email,
            uid : firebaseApp.auth().currentUser.uid,
       }
    }
    componentDidMount() {
        this.listenForItems(this.itemRef);
        // this.state.item.map((item) => this.listenForItems(this.itemRef))
    }
    listenForItems(itemRef) {
        this.setState({
            item: []
        })

        var item = [];
        const uid = firebaseApp.auth().currentUser.uid;

            this.itemRef.ref('Product/').child(this.props.navigation.getParam('search')).on('child_added', (dataSnapshot) => {
                item.push({
                    key: dataSnapshot.key,
                    Link: dataSnapshot.val().Link,
                    Link1: dataSnapshot.val().Link1,
                    Link2: dataSnapshot.val().Link2,
                    Link3: dataSnapshot.val().Link3,
                    SoLuong: dataSnapshot.val().SoLuong,
                    ThuongHieu: dataSnapshot.val().ThuongHieu,
                    TenSP: dataSnapshot.val().TenSP,
                    BaoHanh: dataSnapshot.val().BaoHanh,
                    NSX: dataSnapshot.val().NSX,
                    LoaiSP: dataSnapshot.val().LoaiSP,
                    Gia: formatNumber(dataSnapshot.val().Gia),
                    MoTa: dataSnapshot.val().MoTa,
                    TenShop: dataSnapshot.val().TenShop,
                    Email: dataSnapshot.val().Email,
                    idNguoiBan: dataSnapshot.val().idNguoiBan,
                    AvataNguoiBan: dataSnapshot.val().AvataNguoiBan,
                    NgayBan: dataSnapshot.val().NgayBan,
                    DanhMucSanPham: dataSnapshot.val().DanhMucSanPham,


                });
                this.setState({ item: item, value: item });
            });
        
    }
    static navigationOptions = ({ navigation }) => {
        return {
            header: null
        }
    }
    componentWillMount() {
    }
    
    async SearchDMSP() {
        await this.setState({
            text: this.props.navigation.getParam('search')
        });
        let text = this.state.text.toLowerCase();
        console.log(text);
        let list = this.state.value;
        let filterSearch = list.filter((data) => {
            return data.TenSP.toLowerCase().match(text) || data.DanhMucSanPham.toLowerCase().match(text) || data.ThuongHieu.toLowerCase().match(text) || data.LoaiSP.toLowerCase().match(text) || data.idNguoiBan.toLowerCase().match(text);
        })
        console.log(filterSearch);
        if (text === '' || text === null) {
            this.setState({ item: this.state.value });
            this.listenForItems(this.itemRef)
        } else if (!Array.isArray(filterSearch) && !filterSearch.length) {
            this.setState({ noData: true, });
        } else if (Array.isArray(filterSearch)) {
            this.setState({ noData: false, item: filterSearch });
        }
    }
    async Search(e) {
        await this.setState({
            text: e
        });
        let text = this.state.text.toLowerCase();
        console.log(text);
        let list = this.state.value;
        let filterSearch = list.filter((data) => {
            return data.TenSP.toLowerCase().match(text) || data.DanhMucSanPham.toLowerCase().match(text) || data.ThuongHieu.toLowerCase().match(text) || data.LoaiSP.toLowerCase().match(text);
        })
        console.log(filterSearch);
        if (text === '' || text === null) {
            this.setState({ item: this.state.value })
        } else if (!Array.isArray(filterSearch) && !filterSearch.length) {
            this.setState({ noData: true, })
        } else if (Array.isArray(filterSearch)) {
            this.setState({ noData: false, item: filterSearch })
        }
    }
    DangSP() {
        const uid = firebaseApp.auth().currentUser.uid;

        if (uid !== this.props.navigation.getParam('search')) {
            return (
                <View style={{}}/>
                );
        } else {
            return (
                <View style={{ height: 40, marginTop: 5, marginBottom: 5, backgroundColor: 'white' }}>
                    <TouchableOpacity style={{ flexDirection: 'row', flex: 1 }} onPress={() => this.props.navigation.navigate('DangHang')}>

                        <View style={{ flex: 1 / 8, justifyContent: 'center', alignItems: 'center', }}>

                            <Image source={{ uri: "https://img.icons8.com/windows/2x/plus.png" }} style={{ margin: 10, width: 25, height: 25 }} />

                        </View>

                            <View style={{ flex: 6 / 8, justifyContent: 'center', alignItems: 'center', margin: 5 }}>
                                <Text style={{ fontSize: 18, color: 'red' }} >Đăng sản phẩm mới</Text>
                            </View>

                        <View style={{ flex: 1 / 8, justifyContent: 'center', alignItems: 'center', }}>
                            <Image source={{ uri: "https://img.icons8.com/ios/2x/more-than.png" }} style={{ width: 25, height: 25 }} />
                        </View>
                    </TouchableOpacity>

                </View>
                
                )
        }
    }

    render() {
        return (
            <View style={{ flex: 1, }}>
                <View style={{ flex: 1 / 11, backgroundColor: '#55acee' }}>



                    <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center', flex:1 }}>
                        <View style={{ flex: 1 / 8, justifyContent: 'center', alignItems: 'center', }}>
                            <TouchableOpacity onPress={() => this.props.navigation.navigate('DanhMucSanPham')}>
                                <Image source={{ uri: "https://png.icons8.com/ios/2x/left.png" }} style={{ margin: 5, width: 25, height: 25 }} />
                            </TouchableOpacity>
                        </View>


                        <View style={{ flex: 6 / 8, justifyContent: 'center', alignItems: 'center', marginTop: 5 }}>
                            <TextInput style={{ backgroundColor: '#f5f5f5', fontSize: 13, color: 'black', width: width * 5 / 8 - 5, height: 35, margin: 5, paddingLeft: 5, paddingBottom:8 }}
                                    onChangeText={(e) => { [this.Search(e),] }}
                                    underlineColorAndroid='transparent'
                                    placeholder='Tìm kiếm sản phẩm trong Shop'
                            />
                        </View>

                        <View style={{ flex: 1 / 8, justifyContent: 'center', alignItems: 'center', }}>
                            <TouchableOpacity onPress={() => this.props.navigation.navigate('Basket')}>
                                <Image source={{ uri: "https://png.icons8.com/android/2x/shopping-cart.png" }} style={{ width: 20, height: 20 }} />
                            </TouchableOpacity>
                        </View>
                    </View>

                </View>
                <View style={{ flex: 10 / 11 }}>
                    {this.DangSP()}
                    <View style={{ flexDirection: 'row' }}>
                        <Text style={{ color: 'black', fontSize: 20, margin: 5 }}>Sản phẩm của </Text>
                        <Text style={{ color: 'red', fontSize: 20, margin: 5 }}>{this.props.navigation.getParam('TenShop')} </Text>
                    </View>
                    <FlatList
                        numColumns={2}
                        data={this.state.item}
                        renderItem={({ item }) =>
                            <View style={{ backgroundColor: 'white', justifyContent: 'center', alignItems: 'center', margin: 5, width: width / 2 - 10, height: 2 * height / 4, flexDirection: 'column' }}>
                                <TouchableOpacity style={{ width: width / 2 - 10, height: 2 * height / 4, justifyContent: 'center', alignItems: 'center' }} onPress={() => {
                                    this.props.navigation.navigate('ChiTiet', {
                                        Link: item.Link,
                                        Link1: item.Link1,
                                        Link2: item.Link2,
                                        Link3: item.Link3,
                                        SoLuong: item.SoLuong,
                                        TenSP: item.TenSP,
                                        ThuongHieu: item.ThuongHieu,
                                        BaoHanh: item.BaoHanh,
                                        NSX: item.NSX,
                                        LoaiSP: item.LoaiSP,
                                        Gia: item.Gia,
                                        MoTa: item.MoTa,
                                        key: item.key,
                                        Email: item.Email,
                                        idNguoiBan: item.idNguoiBan,
                                        TenShop: item.TenShop,
                                        AvataNguoiBan: item.AvataNguoiBan,
                                        NgayBan: item.NgayBan,
                                        DanhMucSanPham: item.DanhMucSanPham
                                    })
                                }} >
                                    <Image
                                        style={{ width: width / 2 - 20, height: height * 3 / 10, marginTop: 10 }}
                                        source={{ uri: item.Link }}
                                    />
                                    <Text numberOfLines={1} style={{ flex: 1, color: 'black', fontSize: 20, marginTop: 5 }}> {item.TenSP}</Text>
                                    <Text numberOfLines={1} style={{ flex: 1, color: 'red', fontSize: 15, marginTop: 5 }}> {item.Gia}</Text>
                                </TouchableOpacity>
                                
                            </View>
                        } />
                </View>
            </View>
        )
    }
}
