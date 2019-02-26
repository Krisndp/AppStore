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
    FlatList, Dimensions, ImageBackground, ScrollView, KeyboardAvoidingView
} from 'react-native';
import { firebaseApp } from './firebase';
const { width, height } = Dimensions.get('window');

const database = firebaseApp.database();

export default class DanhGia extends Component {
    constructor(props) {
        super(props);
        this.itemRef = database;
        this.state = {
            Nhanxet: [],
            email: firebaseApp.auth().currentUser.email,
            hoten: '',
            avata: '',

        }
    }
    static navigationOptions = ({ navigation }) => {
        return {
            header: null
        }
    }
    componentDidMount() {
        this.listenForItems(this.itemRef);
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
        
    }
    listenForItems(itemRef) {
        var item = [];

        this.itemRef.ref('DanhGia').child( this.props.navigation.getParam('key')).on('child_added', (dataSnapshot) => {
            item.push({
                nhanxet: dataSnapshot.val().nhanxet,
                key: dataSnapshot.key,
                email: dataSnapshot.val().email,
                hoten: dataSnapshot.val().hoten,
                avata: dataSnapshot.val().avata
            });
            this.setState({ item })
        })

    }

    Nhanxet() {
        

        this.itemRef.ref('DanhGia').child(this.props.navigation.getParam('key')).push({
                nhanxet: this.state.nhanxet,
                email: this.state.email,
                hoten: this.state.hoten,
                avata: this.state.avata
            });
            this.setState({ nhanxet: '' }, () => { this.listenForItems(this.itemRef); })
    }
    render() {
        return (

            <View style={{ flex: 1, }}>
                <View style={{ flex: 1 / 11, backgroundColor: '#1ab7ea' }}>



                    <View style={{ flexDirection: 'row', flex:1, marginTop: 5, justifyContent: 'center', alignItems: 'center' }}>
                        <View style={{ flex: 1 / 8, justifyContent: 'center', alignItems: 'center', }}>
                            <TouchableOpacity onPress={() => this.props.navigation.pop()}>
                                <Image source={{ uri: "https://png.icons8.com/ios/2x/left.png" }} style={{ margin: 5, width: 25, height: 25 }} />
                            </TouchableOpacity>
                        </View>


                        <View style={{ flex: 6 / 8, justifyContent: 'center', alignItems: 'center' }}>
                            <Text style={{ fontSize: 18, color: 'black',}}>Đánh giá sản phẩm</Text>
                        </View>

                        <View style={{ flex: 1 / 8, justifyContent: 'center', alignItems: 'center', }}>
                            <TouchableOpacity onPress={() => this.props.navigation.navigate('Basket')}>
                                <Image source={{ uri: "https://png.icons8.com/android/2x/shopping-cart.png" }} style={{ width: 20, height: 20 }} />
                            </TouchableOpacity>
                        </View>
                    </View>

                </View>


                <View style={{ flex: 8 / 11}}>
                    <FlatList
                        data={this.state.item}
                        renderItem={({ item }) =>
                            <View style={{ flexDirection: 'row', backgroundColor: 'white', marginBottom: 5, marginTop: 5 }}>
                                <View style={{}}>
                                    <Image source={{ uri: item.avata }} style={{ margin: 5, width: 30, height: 30, marginRight: 15, borderRadius: 15 }} />
                                </View>
                                <View style={{ flexDirection: 'column', margin: 5, marginLeft:5 }}>
                                    <Text style={{ fontSize: 15, color: 'red', marginTop: 5, }}>{item.hoten} </Text>
                                    <Text style={{ fontSize: 15, color: 'black', marginTop: 5, marginLeft: 5 }}>{item.nhanxet} </Text>
                                </View>
                            </View>

                        } />
                </View>

                <View style={{ flexDirection: 'column', justifyContent: 'center', alignItems: 'center', flex: 2 / 11, }}>
                    <View style={{ flex: 1, backgroundColor: 'white' }}>
                        <TextInput style={{ width, height: height / 11, borderColor: 'green', borderWidth: 2, color: 'black', fontSize: 15 }}
                            onChangeText={(nhanxet) => this.setState({ nhanxet })}
                            underlineColorAndroid='transparent'
                            value={this.state.nhanxet}
                            placeholder='Viết đánh giá'
                            multiline={true}
                            disableFullscreenUI={true}

                    />
                    </View>
                    <View style={{ marginTop: 5, justifyContent: 'center', alignItems: 'center', width, backgroundColor: '#ed812b', flex:1 }}>
                            <Text style={{ color: 'black', fontSize: 18, }} onPress={() => this.Nhanxet()}>Đánh giá bình luận</Text>

                        </View>
                        </View>

                </View>
        )
    }
}
