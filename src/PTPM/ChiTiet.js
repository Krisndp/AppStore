import React, { Component } from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    Image,
    Platform,
    Button, ImageBackground, Dimensions,
    View, TouchableOpacity, TextInput, FlatList, ScrollView, TouchableHighlight, Alert
} from 'react-native';
import { firebaseApp } from './firebase';
const database = firebaseApp.database();
const { width, height } = Dimensions.get('window');
import { formatNumber } from './Ref'


export default class ChiTiet extends Component {
    constructor(props) {
        super(props);
        this.state = {
            SoLuongMua: 1,

            idNguoiBan: this.props.navigation.getParam('idNguoiBan'),
            key: this.props.navigation.getParam('key'),
        }
        this.itemRef = database;
    }
    componentDidMount() {
        const uid = firebaseApp.auth().currentUser.uid;//Lấy thông tin về user đang đăng nhập
        const recentPostsRef = firebaseApp.database().ref('User/' + uid + '/TTCN/');
        recentPostsRef.once('value').then(snapshot => {
            // snapshot.val() is the dictionary with all your keys/values from the '/store' path

            this.setState({
                hoten: snapshot.val().Name,
                gt: snapshot.val().Sex,
                diachi: snapshot.val().Address,
                sdt: snapshot.val().PhoneNumber,
                email: snapshot.val().Email,
                avata: snapshot.val().avata,
            })
        })

        var PostsRef = firebaseApp.database().ref('Product/' + this.state.idNguoiBan + '/' + this.state.key);
        console.log('Product/' + this.state.idNguoiBan + this.state.key)
        PostsRef.once('value').then(snapshot => {
            this.setState({
                key: snapshot.key,
                Link: snapshot.val().Link,
                Link1: snapshot.val().Link1,
                Link2: snapshot.val().Link2,
                Link3: snapshot.val().Link3,
                SoLuong: snapshot.val().SoLuong,
                ThuongHieu: snapshot.val().ThuongHieu,
                TenSP: snapshot.val().TenSP,
                BaoHanh: snapshot.val().BaoHanh,
                NSX: snapshot.val().NSX,
                LoaiSP: snapshot.val().LoaiSP,
                Gia:  snapshot.val().Gia,
                MoTa: snapshot.val().MoTa,
                TenShop: snapshot.val().TenShop,
                Email: snapshot.val().Email,
                idNguoiBan: snapshot.val().idNguoiBan,
                AvataNguoiBan: snapshot.val().AvataNguoiBan,
                NgayBan: snapshot.val().NgayBan,
                DanhMucSanPham: snapshot.val().DanhMucSanPham,
            })

        })
    }
    componentWillMount() {
      
    }
    
    
    ThemGH() {

        const uid = firebaseApp.auth().currentUser.uid;
        if (this.state.SoLuong == 0) {
            Alert.alert(
                'Thông báo',
                'Sản phẩm đã hết hàng!',
                [

                    { text: 'OK', onPress: () => console.log('OK Pressed') },
                    
                ],
                { cancelable: false }
            )
        } else {
            this.itemRef.ref('GioHang').child(`${uid}`).child(this.props.navigation.getParam('key')).set({
                Link: this.state.Link,
                SoLuongMua: parseInt(this.state.SoLuongMua),
                TenSP: this.state.TenSP,
                Gia: this.state.Gia,
                TenShop: this.state.TenShop,
                AvataNguoiBan: this.state.AvataNguoiBan,
                key: this.props.navigation.getParam('key'),
                LoaiSP: this.state.LoaiSP,
                idNguoiBan: this.props.navigation.getParam('idNguoiBan'),
            });

            Alert.alert(
                'Thông báo',
                'Đã thêm vào giỏ hàng!',
                [

                    { text: 'OK', onPress: () => console.log('OK Pressed') },
                    { text: 'Xem giỏ hàng', onPress: () => this.props.navigation.navigate('Basket') }
                ],
                { cancelable: false }
            )
        }
    }
    MuaNgay() {

        const uid = firebaseApp.auth().currentUser.uid;
        if (this.state.SoLuong == 0) {
            Alert.alert(
                'Thông báo',
                'Sản phẩm đã hết hàng!',
                [

                    { text: 'OK', onPress: () => console.log('OK Pressed') },

                ],
                { cancelable: false }
            )
        } else {
            this.itemRef.ref('GioHang').child(`${uid}`).child(this.props.navigation.getParam('key')).set({
                Link: this.state.Link,
                SoLuongMua: this.state.SoLuongMua,
                TenSP: this.state.TenSP,
                Gia: this.state.Gia,
                TenShop: this.state.TenShop,
                AvataNguoiBan: this.state.AvataNguoiBan,
                key: this.props.navigation.getParam('key'),
                LoaiSP: this.state.LoaiSP,
                idNguoiBan: this.props.navigation.getParam('idNguoiBan'),
            });         
        }
    }
    static navigationOptions = ({ navigation }) => {
        return {
            header: null
        }
    }
    Up() {
        if (this.state.SoLuongMua >= this.state.SoLuong) {
            Alert.alert(
                'Thông báo',
                'Số lượng sản phẩm không đủ!',
                [

                    { text: 'OK', onPress: () => console.log('OK') },
                ],
                { cancelable: false } //day la gi
            )
        } else {
            SoLuongMua = this.state.SoLuongMua + 1;
            this.setState({ SoLuongMua: SoLuongMua})
        }
    }
    Down() {
        if (this.state.SoLuongMua <= 1) {
            Alert.alert(
                'Thông báo',
                'Bạn phải mua ít nhất 1 sản phẩm!',
                [

                    { text: 'OK', onPress: () => console.log('OK') },
                ],
                { cancelable: false } //day la gi
            )
        } else {
            SoLuongMua = this.state.SoLuongMua - 1;
            this.setState({ SoLuongMua: SoLuongMua })
        }
    }
    Footer() {
        let uid = firebaseApp.auth().currentUser.uid;
        if (uid == this.state.idNguoiBan) {
            return (
                <View style={{ flex: 1 / 11, flexDirection: 'row' }}>
                    <View style={{ backgroundColor: '#43d854', flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                        <Text style={{ color: 'white', fontSize: 18 }} onPress={() => {
                            this.props.navigation.navigate('EditInfo', {
                                Link: this.state.Link,
                                Link1: this.state.Link1,
                                Link2: this.state.Link2,
                                Link3: this.state.Link3,
                                SoLuong: this.state.SoLuong,
                                TenSP: this.state.TenSP,
                                ThuongHieu: this.state.ThuongHieu,
                                BaoHanh: this.state.BaoHanh,
                                NSX: this.state.NSX,
                                LoaiSP: this.state.LoaiSP,
                                Gia: this.state.Gia,
                                MoTa: this.state.MoTa,
                                key: this.state.key,
                                Email: this.state.Email,
                                idNguoiBan: this.state.idNguoiBan,
                                TenShop: this.state.TenShop,
                                AvataNguoiBan: this.state.AvataNguoiBan,
                                NgayBan: this.state.NgayBan,
                                DanhMucSanPham: this.state.DanhMucSanPham,
                            })
                        }}>Sửa</Text>
                    </View>
                </View>
                );
        } else {
            return (
                <View style={{ flex: 1 / 11, flexDirection: 'row' }}>
                    <View style={{ backgroundColor: '#43d854', flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                        <Text style={{ color: 'white', fontSize: 18 }} onPress={() => this.ThemGH()}>Thêm vào giỏ hàng</Text>
                    </View>

                    <View style={{ backgroundColor: '#dc4e41', flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                        <Text style={{ color: 'white', fontSize: 18 }} onPress={() => [this.MuaNgay(), this.props.navigation.push('Basket')]}>Mua ngay</Text>
                    </View>
                </View>
                );
        }
    }
    render() {
        //const images = this.props.navigation.getParam('link', 'NO');
        return (
            <View style={{ flex: 1, flexDirection:'column' }}>
                <View style={{ flex: 1 / 11, backgroundColor:'#55acee' }}>
                    


                    <View style={{ flexDirection: 'row', flex: 1, marginTop: 5, justifyContent: 'center', alignItems: 'center' }}>
                            <View style={{ flex: 1 / 8, justifyContent: 'center', alignItems: 'center', }}>
                                <TouchableOpacity onPress={() => this.props.navigation.pop()}>
                                    <Image source={{ uri: "https://png.icons8.com/ios/2x/left.png" }} style={{ margin: 5, width: 20, height: 20 }} />
                                </TouchableOpacity>
                            </View>


                            <View style={{ flex: 6 / 8, justifyContent: 'center', alignItems: 'center' }}>
                                <Text numberOfLines={1} style={{ flex: 1, fontSize: 18, color: 'white', height: 35, marginTop:5 }}>{this.state.TenSP}</Text>
                            </View>

                            <View style={{ flex: 1 / 8, justifyContent: 'center', alignItems: 'center', }}>
                                <TouchableOpacity onPress={() => this.props.navigation.navigate('Basket')}>
                                    <Image source={{ uri: "https://png.icons8.com/android/2x/shopping-cart.png" }} style={{ width: 20, height: 20, marginRight:5 }} />
                                </TouchableOpacity>
                            </View>
                        </View>
                    
                </View>

                <View style={{ flex: 9 / 11, justifyContent: 'center', alignItems: 'center', width, height }}>
                    <ScrollView contentContainerStyle={{ width,}}>
                        <View style={{ height: height / 3, marginTop: 5, marginBottom: 5 }}>
                            <ScrollView horizontal={true}>
                                <Image style={{ width: width / 2, height: height / 3, marginLeft: 5 }} source={{ uri: this.state.Link1 }} />
                                <Image style={{ width: width / 2, height: height / 3, marginLeft: 5 }} source={{ uri: this.state.Link2 }} />
                                <Image style={{ width: width / 2, height: height / 3, marginLeft: 5 }} source={{ uri: this.state.Link3 }} />
                                <Image style={{ width: width / 2, height: height / 3, marginLeft: 5 }} source={{ uri: this.state.Link }} />
                            </ScrollView>
                        </View>

                        <View style={{ backgroundColor: 'white', height: 75, margin: 5, flexDirection: 'column' }}>
                            <TouchableOpacity onPress={() => { [this.props.navigation.navigate('BanHang', { search: this.state.idNguoiBan, TenShop: this.state.TenShop })] }}>

                                        <View style={{ flexDirection: 'row' }}>

                                    <View style={{ width: 80, height: 80, justifyContent: 'center', alignItems: 'center' }}>
                                        <Image source={{ uri: this.state.AvataNguoiBan }} style={{ margin: 5, width: 40, height: 40, borderRadius: 20 }} />
                                                </View>
                                                 <View style={{ flexDirection: 'column', margin: 5 }}>
                                                        <Text style={{ color: '#363636', fontSize: 18, marginTop: 5, marginLeft: 5 }}>{this.state.TenShop}</Text>
                                                        <Text style={{ color: '#363636', fontSize: 13, marginTop: 5, marginLeft: 5 }}> ( {this.state.Email} ) </Text>
                                                  </View>

                                        </View>
                                    </TouchableOpacity>

                       </View>

                        <View style={{ height: 35 }}>
                                <Text style={{ color: 'black', fontSize: 18, fontWeight: 'cover', marginTop: 5, marginLeft: 5 }}> THÔNG TIN SẢN PHẨM</Text>
                    </View>

                    <View style={{ backgroundColor: 'white',  margin: 5}}>
                        

                            <View style={{ margin: 5 }}>
                                <Text style={{ color: '#363636', fontSize: 13 }}>{this.state.MoTa}</Text>
                            </View>

                            <View style={{ height: 35, flexDirection: 'row', borderTopColor: 'grey', borderTopWidth: 1, borderLeftColor: 'grey', borderLeftWidth: 1, borderRightColor: 'grey', borderRightWidth: 1, borderBottomColor: 'grey', borderBottomWidth: 1, marginLeft: 5, marginTop: 5, marginRight:5 }} >
                                <View style={{ flex: 2 / 5, backgroundColor: '#f5f5f5' }}>
                                    <Text style={{ color: 'black', fontSize: 13, marginTop: 5, marginLeft: 5 }}>Tên sản phẩm</Text>
                                </View>

                                <View style={{ flex: 3 / 5, borderLeftColor: 'grey', borderLeftWidth: 1, flexDirection: 'column' }}>
                                    <Text numberOfLines={1} style={{ flex: 1, color: '#363636', fontSize: 13, marginTop: 5, marginLeft: 5 }}>{this.state.TenSP}</Text>
                                </View>
                            </View>

                           <View style={{ borderLeftColor: 'grey', borderLeftWidth: 1, borderRightColor: 'grey', borderRightWidth: 1, borderBottomColor: 'grey', borderBottomWidth: 1, marginLeft: 5, marginRight: 5, height: 35, flexDirection: 'row' }} >
                                <View style={{ flex: 2 / 5, backgroundColor: '#f5f5f5' }}>
                                    <Text style={{ color: 'black', fontSize: 13, marginTop: 5, marginLeft: 5 }}>Giá sản phẩm</Text>
                                </View>

                                <View style={{ flex: 3 / 5, borderLeftColor: 'grey', borderLeftWidth: 1, flexDirection: 'column' }}>
                                    <Text numberOfLines={1} style={{ flex: 1, color: '#363636', fontSize: 13, marginTop: 5, marginLeft: 5 }}>{this.state.Gia}</Text>
                                </View>
                           </View>

                           <View style={{ borderLeftColor: 'grey', borderLeftWidth: 1, borderRightColor: 'grey', borderRightWidth: 1, borderBottomColor: 'grey', borderBottomWidth: 1, marginLeft: 5, marginRight: 5 ,height: 35, flexDirection: 'row' }} >
                                <View style={{ flex: 2 / 5, backgroundColor: '#f5f5f5' }}>
                                    <Text style={{ color: 'black', fontSize: 13, marginTop: 5, marginLeft: 5 }}>Loại sản phẩm</Text>
                                </View>

                                <View style={{ flex: 3 / 5, borderLeftColor: 'grey', borderLeftWidth: 1, flexDirection: 'column' }}>
                                    <Text numberOfLines={1} style={{ flex: 1, color: '#363636', fontSize: 13, marginTop: 5, marginLeft: 5 }}>{this.state.LoaiSP}</Text>
                                </View>
                           </View>

                            <View style={{ height: 35, flexDirection: 'row', borderLeftColor: 'grey', borderLeftWidth: 1, borderRightColor: 'grey', borderRightWidth: 1, borderBottomColor: 'grey', borderBottomWidth: 1, marginLeft: 5, marginRight: 5 }} >
                                <View style={{ flex: 2 / 5, backgroundColor: '#f5f5f5' }}>
                                    <Text style={{ color: 'black', fontSize: 13, marginTop: 5, marginLeft: 5 }}>Số lượng</Text>
                                </View>

                                <View style={{ flex: 3 / 5, borderLeftColor: 'grey', borderLeftWidth: 1, flexDirection: 'column' }}>
                                    <Text numberOfLines={1} style={{ flex: 1, color: '#363636', fontSize: 13, marginTop: 5, marginLeft: 5 }}>{this.state.SoLuong}</Text>
                                </View>
                            </View>

                            <View style={{ height: 35, flexDirection: 'row', borderLeftColor: 'grey', borderLeftWidth: 1, borderRightColor: 'grey', borderRightWidth: 1, borderBottomColor: 'grey', borderBottomWidth: 1, marginLeft: 5, marginRight: 5 }} >
                                <View style={{ flex: 2 / 5, backgroundColor: '#f5f5f5' }}>
                                    <Text style={{ color: 'black', fontSize: 13, marginTop: 5, marginLeft: 5 }}>NSX</Text>
                                </View>

                                <View style={{ flex: 3 / 5, borderLeftColor: 'grey', borderLeftWidth: 1, flexDirection: 'column' }}>
                                    <Text numberOfLines={1} style={{ flex: 1, color: '#363636', fontSize: 13, marginTop: 5, marginLeft: 5 }}>{this.state.NSX}</Text>
                                </View>
                            </View>

                            <View style={{ borderLeftColor: 'grey', borderLeftWidth: 1, borderRightColor: 'grey', borderRightWidth: 1, borderBottomColor: 'grey', borderBottomWidth: 1, marginLeft: 5, marginRight: 5, height: 35, flexDirection: 'row'}} >
                                <View style={{ flex: 2 / 5, backgroundColor: '#f5f5f5' }}>
                                    <Text style={{ color: 'black', fontSize: 13, marginTop: 5, marginLeft: 5 }}>Bảo hành</Text>
                                </View>

                                <View style={{ flex: 3 / 5, borderLeftColor: 'grey', borderLeftWidth: 1, flexDirection: 'column' }}>
                                    <Text numberOfLines={1} style={{ flex: 1, color: '#363636', fontSize: 13, marginTop: 5, marginLeft: 5 }}>{this.state.BaoHanh}</Text>
                                </View>
                           </View>

                            <View style={{ marginBottom: 5, height: 35, flexDirection: 'row', borderLeftColor: 'grey', borderLeftWidth: 1, borderRightColor: 'grey', borderRightWidth: 1, borderBottomColor: 'grey', borderBottomWidth: 1, marginLeft: 5, marginRight: 5 }} >
                                <View style={{ flex: 2 / 5, backgroundColor: '#f5f5f5' }}>
                                    <Text style={{ color: 'black', fontSize: 13, marginTop: 5, marginLeft: 5 }}>Thương hiệu</Text>
                                </View>

                                <View style={{ flex: 3 / 5, borderLeftColor: 'grey', borderLeftWidth: 1, flexDirection: 'column' }}>
                                    <Text numberOfLines={1} style={{ flex: 1, color: '#363636', fontSize: 13, marginTop: 5, marginLeft: 5 }}>{this.state.ThuongHieu}</Text>
                                </View>
                            </View>

                            <View style={{ margin: 5, flexDirection: 'row',}}>
                                <View style={{ flex: 3 / 5 }}>
                                    <Text style={{ color: 'black', fontSize: 18, marginTop: 5, marginLeft: 5 }}> Số lượng mua</Text>
                                </View>
                                <View style={{ flex: 2 / 5, flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
                                    <TouchableOpacity style={{ flex: 1 / 6, borderColor: 'black', borderWidth: 1, alignItems: 'center', justifyContent: 'center' }} onPress={()=> this.Down()}>
                                        <Text style={{ fontSize: 15, color: 'black' }}>-</Text>
                                    </TouchableOpacity>

                                    <View style={{ flex: 1 / 3, height: 40, borderColor: 'black', borderWidth: 1, alignItems: 'center', justifyContent: 'center' }}>
                                        <TextInput style={{ fontSize: 15, color: 'black',}}
                                            onChangeText={(SoLuongMua) => this.setState({ SoLuongMua })}
                                            value={`${this.state.SoLuongMua}`}
                                            underlineColorAndroid='transparent'
                                            multiline={true} />
                                    </View>

                                    <TouchableOpacity style={{ flex: 1 / 6, borderColor: 'black', borderWidth: 1, alignItems: 'center', justifyContent: 'center' }} onPress={() => this.Up()}>
                                        <Text style={{ fontSize: 15, color: 'black' }}>+</Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </View>

                        <View style={{ backgroundColor: 'white', height: 40, margin: 5, flexDirection: 'row' }}>
                            <View style={{ flex: 2, flexDirection: 'column', alignItems: 'flex-start', justifyContent: 'center' }}>
                                <Text style={{ color: 'black', fontSize: 15, marginLeft:10 }}>Đánh giá bình luận</Text>
                            </View>
                            <View style={{ flex: 1, flexDirection: 'column', alignItems: 'flex-end', justifyContent: 'center' }}>
                                <Text style={{ color: 'red', fontSize: 15, marginRight:10 }} onPress={() => this.props.navigation.navigate('DanhGia',
                                        { key: this.props.navigation.getParam('key') })}>Xem tất cả ></Text>
                                </View>
                            </View>
                       </ScrollView>
                     </View>            
                    {this.Footer()}
              </View>  
            
            )
    }

}