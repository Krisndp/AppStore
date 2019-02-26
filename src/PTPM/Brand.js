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


export default class Brand extends Component {
    constructor(props) {
        super(props);
        this.itemRef = database;
        this.state = {
            Email:'',
            uid: firebaseApp.auth().currentUser.uid,
            param: this.props.navigation.getParam('search')
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
            this.SearchDMSP();

        })
    }

    static navigationOptions = ({ navigation }) => {
        return {
            header: null
        }
    }
    componentWillMount() {
        this.SearchDMSP();

    }
    async SearchDMSP() {
        await this.setState({
            text: this.props.navigation.getParam('search')
        });
        let text = this.state.text.toLowerCase();
        console.log(text);
        let list = this.state.value;
        let filterSearch = list.filter((data) => {
            return data.TenSP.toLowerCase().match(text) || data.DanhMucSanPham.toLowerCase().match(text) || data.ThuongHieu.toLowerCase().match(text) || data.LoaiSP.toLowerCase().match(text);
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


                        <View style={{ flex: 6 / 8, justifyContent: 'center', alignItems: 'center' }}>
                            <TextInput style={{ backgroundColor: '#f5f5f5', fontSize: 15, color: 'black', width: width * 5 / 8 - 10, height: 35, margin: 5, paddingLeft: 5, paddingBottom: 8 }}
                                onChangeText={(e) => { [this.Search(e), this.setState({ param: e })] }}
                                underlineColorAndroid='transparent'
                                placeholder='Tìm kiếm sản phẩm '
                                value={this.state.param}
                            />
                        </View>

                        <View style={{ flex: 1 / 8, justifyContent: 'center', alignItems: 'center', marginRight:5 }}>
                            <TouchableOpacity onPress={() => this.props.navigation.navigate('Loc')}>
                                <Image source={{ uri: "https://img.icons8.com/ios/1600/filter.png" }} style={{ width: 20, height: 20 }} />
                            </TouchableOpacity>
                        </View>
                    </View>

                </View>
                <View style={{ flex: 10 / 11, marginTop: 10 }}>
                   
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
                                    <Text numberOfLines={1} style={{ flex: 1, color: 'black', fontSize: 20, marginTop: 5 }}> {item.TenSP}</Text>
                                    <Text numberOfLines={1} style={{ flex: 1,  color: 'red', fontSize: 15, marginTop: 5 }}> {item.Gia} VNĐ</Text>
                                </TouchableOpacity>

                            </View>
                        } />
                </View>
            </View>
        )
    }
}
