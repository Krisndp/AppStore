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
    FlatList, ImageBackground, Dimensions, ScrollView, ViewPagerAndroid
} from 'react-native';
import { firebaseApp } from './firebase';
const database = firebaseApp.database();
const { width, height } = Dimensions.get('window');

export default class User extends Component {
    constructor(props) {
        super(props);
        this.itemRef = database;
        this.state = {
            name: '',
            avata: '',
            sex: '',
            dateOfBirth: '',
            address:'',
            phoneNumber: '',
            email: '',
            uid: firebaseApp.auth().currentUser.uid,
        }
    }
    componentDidMount() {
         var uid = firebaseApp.auth().currentUser.uid;//Lấy thông tin về user đang đăng nhập
        var recentPostsRef = firebaseApp.database().ref('User/' + uid);
        recentPostsRef.once('value').then(snapshot => {
            // snapshot.val() is the dictionary with all your keys/values from the '/store' path

            this.setState({
            })
        })
        
        var Ref = firebaseApp.database().ref('User/' + uid + '/TTCN/');
        Ref.once('value').then(snapshot => {
            // snapshot.val() is the dictionary with all your keys/values from the '/store' path

            this.setState({
                name: snapshot.val().Name,
                sex: snapshot.val().Sex,
                dateOfBirth: snapshot.val().DateOfBirth,
                address: snapshot.val().Address,
                phoneNumber: snapshot.val().PhoneNumber,
                email: snapshot.val().Email,
                avata: snapshot.val().avata,


            })
        })
    }
    componentWillMount() {
        var uid = firebaseApp.auth().currentUser.uid;//Lấy thông tin về user đang đăng nhập

    }
    DX() {
        firebaseApp.auth().signOut()
            .then(() => {
                this.props.navigation.navigate('Login')


            })
            .catch(function (error) {
                console.log(error);
            });

    }
    
    static navigationOptions = ({ navigation }) => {
        return {
            header: null
        }
    }

    render() {
        return (
            <View style={{ flex: 1, }}>
                
                <View style={{ flex: 10 / 11, marginTop: 5 }}>
                    <TouchableOpacity style={{ flex:1 }} onPress={() => this.props.navigation.push('TTCN')}>
                        <ImageBackground
                                style={{ width, height: height / 4 }}
                            source={{ uri: "https://cancuongthinhphat.vn/images/unnamed.jpg" }}
                            >
                        
                                     <View style={{ flexDirection: 'row', height: height/16, marginTop: 20 }}>
                                <View style={{ flex: 1 / 8, justifyContent: 'center', alignItems: 'center', }}>
                                    <TouchableOpacity onPress={() => this.props.navigation.push('DanhMucSanPham')}>
                                                <Image source={{ uri: "https://png.icons8.com/ios/2x/left.png" }} style={{ margin: 10, width: 30, height: 30 }} />
                                            </TouchableOpacity>
                                        </View>


                                        <View style={{ flex: 7 / 8, justifyContent: 'center', alignItems: 'center' }}>
                                        </View>
                                    </View>

                                    <View style={{ flex: 1, flexDirection: 'row' }}>
                                    <View style={{ flex:0.25, margin:20 }}>
                                        <Image style={{ width: width / 5, height: width / 5, borderRadius: width / 10 }}
                                            source={{ uri: this.state.avata }} />
                                    </View>
                                    <View style={{ flex: 0.75, margin: 20, justifyContent:'center' }}>
                                        <Text style={{ color: 'black', fontSize:18 }}> {this.state.name}</Text>
                                    </View>
                                    </View>
                    
                   

                        </ImageBackground>
                    </TouchableOpacity>
                    <View style={{ flex: 2, flexDirection: 'column' }}>
                        <View style={{ flex: 1, flexDirection: 'row' }}>
                            <View style={{ flex: 1, margin: 5, backgroundColor: '#FFFF66', flexDirection: 'column' }}>
                                <TouchableOpacity style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }} onPress={() => this.props.navigation.navigate('TTCN')}>
                                    <Image style={{ width: width / 3, height: width / 3 }} source={{ uri: "https://img.icons8.com/ios/2x/gender-neutral-user.png" }} />
                                    <Text style={{ color: 'black', fontSize: 15 }}>Hồ sơ cá nhân</Text>
                                </TouchableOpacity>
                            </View>
                            <View style={{ flex: 1, margin: 5, backgroundColor: '#97FFFF', flexDirection: 'column' }}>
                                <TouchableOpacity style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }} onPress={() => this.props.navigation.navigate('MHLichSuMuaHang')}>
                                    <Image style={{ width: width / 3, height: width / 3 }} source={{ uri: "https://img.icons8.com/ios/1600/todo-list.png" }} />
                                    <Text style={{ color: 'black', fontSize: 15 }}>Lịch sử mua hàng</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                        <View style={{ flex: 1, flexDirection: 'row' }}>
                            <View style={{ flex: 1, margin: 5, backgroundColor: '#FFE4B5', flexDirection: 'column' }}>
                                <TouchableOpacity style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }} onPress={() => this.props.navigation.navigate('BanHang', { search: this.state.uid, TenShop: this.state.name })}>
                                    <Image style={{ width: width / 3, height: width / 3 }} source={{ uri: "https://img.icons8.com/ios/2x/sell.png" }} />
                                    <Text style={{ color: 'black', fontSize: 15 }}>Bán hàng</Text>
                                </TouchableOpacity>
                            </View>
                            <View style={{ flex: 1, margin: 5, backgroundColor: '#FFF0F5', flexDirection: 'column' }}>
                                <TouchableOpacity style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }} onPress={() => this.props.navigation.navigate('UserInfoOrder')}>
                                    <Image style={{ width: width / 3, height: width / 3 }} source={{ uri: "https://img.icons8.com/ios/1600/alarm.png" }} />
                                    <Text style={{ color: 'black', fontSize: 15 }}>Thông báo</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                    
                </View>
                <View style={{ flex: 1 / 11 }}>
                    <TouchableOpacity style={{ backgroundColor: '#dc4e41', alignItems: 'center', justifyContent: 'center', flex: 1 }}>
                        <Text style={{ color: 'white', fontSize: 18 }} onPress={() => { this.DX() }}> ĐĂNG XUẤT </Text>
                    </TouchableOpacity>
                </View>
            </View>
        )
    }
}
