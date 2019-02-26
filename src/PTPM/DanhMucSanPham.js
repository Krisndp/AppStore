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
    FlatList, ImageBackground, Dimensions, ScrollView, Alert
} from 'react-native';
import { firebaseApp } from './firebase';
const database = firebaseApp.database();
const { width, height } = Dimensions.get('window');
import { formatNumber } from './Ref'



export default class DanhMucSanPham extends Component {
    constructor(props) {
        super(props);
        this.itemRef = database;
        this.state = {

        }
    }
    componentWillMount() {
        this.listenForItems(this.itemRef);

        // this.state.item.map((item) => this.listenForItems(this.itemRef))
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
    
    static navigationOptions = ({ navigation }) => {
        return {
            header: null
        }
    }
    
    listenForItems(itemRef) {
        this.setState({
            item: []
        })

        var item = [];

        this.itemRef.ref('Product').on('child_added', (dataSnapshot) => {
            dataSnapshot.forEach((child) => {
                item.push({

                    key: child.key,
                    Link: child.val().Link,
                    Link1: child.val().Link1,
                    Link2: child.val().Link2,
                    Link3: child.val().Link3,
                    SoLuong: child.val().SoLuong,
                    ThuongHieu: child.val().ThuongHieu,
                    TenSP: child.val().TenSP,
                    BaoHanh: child.val().BaoHanh,
                    NSX: child.val().NSX,
                    LoaiSP: child.val().LoaiSP,
                    Gia: formatNumber(child.val().Gia),
                    MoTa: child.val().MoTa,
                    TenShop: child.val().TenShop,
                    Email: child.val().Email,
                    idNguoiBan: child.val().idNguoiBan,
                    AvataNguoiBan: child.val().AvataNguoiBan,
                    NgayBan: child.val().NgayBan,
                    DanhMucSanPham: child.val().DanhMucSanPham,
                });
                this.setState({ item: item, value: item });
            });

        })
    }

    render() {
        return ( 
            <View style={{ flex: 1, }}>
                <View style={{ flex: 0.1, marginBottom: 20, justifyContent: 'center', alignItems: 'center', }}>
                    <ImageBackground style={{ height: height / 8, width, flex: 1, justifyContent: 'center', alignItems: 'center', flexDirection: 'row', }} source={{ uri: "https://cancuongthinhphat.vn/images/unnamed.jpg" }}>
                        <View style={{ marginTop:20, flex: 1, justifyContent: 'center', alignItems: 'center', flexDirection: 'row', }}>
                                <View style={{ flex: 0.1, justifyContent: 'center', alignItems: 'center', marginLeft: 10 }}>
                                    <TouchableOpacity onPress={() => this.props.navigation.navigate('Loc')}>
                                    <Image source={{ uri: "https://img.icons8.com/ios/1600/filter.png" }} style={{ width: 20, height: 20 }} />
                                    </TouchableOpacity>
                                </View>
                    
                                <View style={{ flex: 0.7, justifyContent: 'center', alignItems: 'center',}}>
                                    <TextInput style={{ backgroundColor: '#f5f5f5', fontSize: 13, color: 'black', width: width * 5 / 8 - 10, height: 35, margin: 5, paddingLeft: 20, paddingBottom:8 }}
                                        onChangeText={(e) => { [this.Search(e),] }}
                                        underlineColorAndroid='transparent'
                                        placeholder='Tìm kiếm sản phẩm '
                                    />

                                </View>

                                <View style={{ flex: 0.1, justifyContent: 'center', alignItems: 'center', }}>
                                    <TouchableOpacity onPress={() => this.props.navigation.navigate('User')}>
                                        <Image source={{ uri: "https://img.icons8.com/ios/2x/user.png" }} style={{ margin: 5, width: 20, height: 20 }} />
                                    </TouchableOpacity>
                                </View>

                                <View style={{ flex: 0.1, justifyContent: 'center', alignItems: 'center', marginLeft:10 }}>
                                    <TouchableOpacity onPress={() => this.props.navigation.navigate('Basket')}>
                                        <Image source={{ uri: "https://img.icons8.com/ios/2x/shopping-cart.png" }} style={{ width: 20, height: 20 }} />
                                    </TouchableOpacity>
                                </View>
                            </View>
                    </ImageBackground>
                </View>
                <View style={{ flex: 0.19, flexDirection: 'row', margin: 5, marginTop:10 }}>
                        <ScrollView horizontal={true}>
                            
                        <View style={{ flexDirection: 'column', margin: 5, width: width / 4, backgroundColor: 'white', }}>
                                <TouchableOpacity style={{ flex: 1 }} onPress={() => this.props.navigation.navigate('Brand', { search: 'điện tử' })}>
                                    <View style={{ alignItems: 'center', justifyContent: 'center' }}>
                                            <Image style={{ width: width / 6, height: width / 6, margin: 5 }} source={{ uri: "http://i1.topgia.vn/img/15971/tivi-lg-47ln5400-47-inches-1.jpg" }} />
                                    </View>
                                    <View style={{ alignItems: 'center', justifyContent: 'center' }}>
                                        <Text style={{ color: 'black', fontSize: 15, fontWeight: '100', margin: 5}}> Điện tử </Text>
                                    </View>
                                </TouchableOpacity>
                            </View>
                        <View style={{ flexDirection: 'column', margin: 5, width: width / 4, backgroundColor: 'white', }}>
                            <TouchableOpacity style={{ flex: 1 }} onPress={() => this.props.navigation.navigate('Brand', { search: 'Thời trang' })}>
                                    <View style={{ alignItems: 'center', justifyContent: 'center' }}>
                                        <Image style={{ width: width / 6, height: width / 6, margin: 5 }} source={{ uri: "https://hstatic.net/579/1000029579/1/2016/6-25/kb097-ao-khoac-nam-kaki-head-kem-1m4g3-fd6tnl_simg_d0daf0_800x1200_max_master.jpg" }} />
                                    </View>
                                    <View style={{ alignItems: 'center', justifyContent: 'center' }}>
                                        <Text style={{ color: 'black', fontSize: 15, fontWeight: '100', margin: 5 }}> Thời trang </Text>
                                    </View>
                                </TouchableOpacity>
                            </View>
                        <View style={{ flexDirection: 'column', margin: 5, width: width / 4, backgroundColor: 'white', }}>
                                <TouchableOpacity style={{ flex: 1 }} onPress={() => this.props.navigation.navigate('Brand', { search: 'Đời sống' })}>
                                    <View style={{ alignItems: 'center', justifyContent: 'center' }}>
                                        <Image style={{ width: width / 6, height: width / 6, margin: 5 }} source={{ uri: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSFmIqbdMY4PA1LgJpKbbPSwbbyILnixhf5ntzLDiUcoEoKUYMe3g" }} />
                                    </View>
                                    <View style={{ alignItems: 'center', justifyContent: 'center' }}>
                                        <Text style={{ color: 'black', fontSize: 15, fontWeight: '100', margin: 5 }}> Đời sống </Text>
                                    </View>
                                </TouchableOpacity>
                          </View>
                            
                        <View style={{ flexDirection: 'column', margin: 5, width: width / 4, backgroundColor: 'white', }}>
                                 <TouchableOpacity style={{ flex: 1 }} onPress={() => this.props.navigation.navigate('Brand', { search: 'Du lịch' })}>
                                    <View style={{ alignItems: 'center', justifyContent: 'center' }}>
                                        <Image style={{ width: width / 6, height: width / 6, margin: 5 }} source={{ uri: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRxTEQgE09sLaD1v5BYbBvjrAAyDxz4DgCJqNMZhRGpxXrH1ZJTgw" }} />
                                    </View>
                                    <View style={{ alignItems: 'center', justifyContent: 'center' }}>
                                        <Text style={{ color: 'black', fontSize: 15, fontWeight: '100', margin: 5 }}> Du lịch </Text>
                                    </View>
                                </TouchableOpacity>
                            </View>

                        <View style={{ flexDirection: 'column', margin: 5, width: width / 4, backgroundColor: 'white', }}>
                            <TouchableOpacity style={{ flex: 1 }} onPress={() => this.props.navigation.navigate('Brand', { search: 'Đồ chơi' })}>
                                <View style={{ alignItems: 'center', justifyContent: 'center' }}>
                                    <Image style={{ width: width / 6, height: width / 6, margin: 5 }} source={{ uri: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQB0EqZk6v48wSiQRss_tQKNirVwSpu27oRLIY0yQRCDIdDlgthhg" }} />
                                </View>
                                <View style={{ alignItems: 'center', justifyContent: 'center' }}>
                                    <Text style={{ color: 'black', fontSize: 15, fontWeight: '100', margin: 5 }}> Đồ chơi </Text>
                                </View>
                            </TouchableOpacity>
                        </View>


                        <View style={{ flexDirection: 'column', margin: 5, width: width / 4, backgroundColor: 'white', }}>
                            <TouchableOpacity style={{ flex: 1 }} onPress={() => this.props.navigation.navigate('Brand', { search: 'Nhà sách' })}>
                                <View style={{ alignItems: 'center', justifyContent: 'center' }}>
                                    <Image style={{ width: width / 6, height: width / 6, margin: 5 }} source={{ uri: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTTMeHd3hzqOYZGAnrPvzPmH_XPq20TsdkE2oCM8Nz-7r2T2hpB" }} />
                                </View>
                                <View style={{ alignItems: 'center', justifyContent: 'center' }}>
                                    <Text style={{ color: 'black', fontSize: 15, fontWeight: '100', margin: 5 }}> Nhà sách</Text>
                                </View>
                            </TouchableOpacity>
                        </View>

                        <View style={{ flexDirection: 'column', margin: 5, width: width / 4, backgroundColor: 'white', }}>
                            <TouchableOpacity style={{ flex: 1 }} onPress={() => this.props.navigation.navigate('Brand', { search: 'Tạp hóa' })}>
                                <View style={{ alignItems: 'center', justifyContent: 'center' }}>
                                    <Image style={{ width: width / 6, height: width / 6, margin: 5 }} source={{ uri: "http://winwinshop88.com/ProductImage/Hop%20qua%20nho_avatar.jpg" }} />
                                </View>
                                <View style={{ alignItems: 'center', justifyContent: 'center' }}>
                                    <Text style={{ color: 'black', fontSize: 15, fontWeight: '100', margin: 5 }}> Tạp hóa</Text>
                                </View>
                            </TouchableOpacity>
                        </View>

                        <View style={{ flexDirection: 'column', margin: 5, width: width / 4, backgroundColor: 'white', }}>
                            <TouchableOpacity style={{ flex: 1 }} onPress={() => this.props.navigation.navigate('Brand', { search: 'Thể thao' })}>
                                <View style={{ alignItems: 'center', justifyContent: 'center' }}>
                                    <Image style={{ width: width / 6, height: width / 6, margin: 5 }} source={{ uri: "https://vn-live-03.slatic.net/original/0c316745a8505f372f3b432be9afd418.jpg" }} />
                                </View>
                                <View style={{ alignItems: 'center', justifyContent: 'center' }}>
                                    <Text style={{ color: 'black', fontSize: 15, fontWeight: '100', margin: 5 }}> Thể thao </Text>
                                </View>
                            </TouchableOpacity>
                        </View>

                      
                    </ScrollView>
                </View>

                <View style={{ flex: 0.71, marginTop: 10 }}>
                    <ScrollView contentContainerStyle={{ flex:1 }}>

                        <FlatList
                            numColumns={2}
                            data={this.state.item}
                            renderItem={({ item }) =>
                                <View style={{ backgroundColor: 'white', justifyContent: 'center', alignItems: 'center', margin: 5, width: width / 2 - 10, height: 2 * height / 5, flexDirection: 'column' }}>
                                    <TouchableOpacity style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }} onPress={() => {
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
                                            DanhMucSanPham: item.DanhMucSanPham,
                                        })
                                    }} >
                                        <Image
                                            style={{ width: width / 2 - 20, height: height * 3 / 10 }}
                                            source={{ uri: item.Link }}
                                        />
                                        <Text numberOfLines={1} style={{ flex: 1, color: 'black', fontSize: 20, marginTop: 10 }}> {item.TenSP}</Text>
                                        <Text numberOfLines={1} style={{ flex: 1, color: 'red', fontSize: 15, marginTop: 5 }}> {item.Gia} VNĐ</Text>
                                    </TouchableOpacity>

                                </View>
                            } />
                    </ScrollView>
                </View>
                </View>
        )
    }
}
