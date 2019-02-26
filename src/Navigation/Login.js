import React from 'react';
import { TouchableWithoutFeedback, View, Picker, Item, Text, StyleSheet, TextInput, ImageBackground, Image, TouchableHighlight, ListView, Alert } from 'react-native';
import { createStackNavigator } from 'react-navigation'; // Version can be specified in package.json
import dismissKeyboard from 'react-native/Libraries/Utilities/dismissKeyboard';
//import { Ionicons } from '@expo/vector-icons'; // Version can be specified in package.json
import { TabNavigator, TabBarBottom } from 'react-navigation'; // Version can be specified in package.json
import DetailsScreen from './Details';





class Login extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            text: '',
            email: null,
            password: null,
        };

    }

    reset() {
        this.setState({
            email: '',
            password: ''
        })
    }

    setUser(value) {
        this.setState({
            email: value
        })
    }
    setPass(value) {
        this.setState({
            password: value
        })
    }
    Login() {
        firebaseApp.auth().signInWithEmailAndPassword(this.state.email, this.state.password)
            .then(() => {
                // this.reset();
                Alert.alert(
                    'Thông báo',
                    'Đăng nhập thành công!',
                    [

                        { text: 'OK', onPress: () => this.props.navigation.navigate('Drawer') },
                    ],
                    { cancelable: false } //day la gi
                )


            })
            .catch(function (error) {
                console.log(error);

                Alert.alert(
                    'Thông báo',
                    'Đăng nhập thất bại!',
                    [

                        { text: 'OK', onPress: () => console.log('OK Pressed') },
                    ],
                    { cancelable: false }
                )

            });
        this.reset();


    }
    Register() {
        this.props.navigation.navigate('Register');
    }
    Reset() {
        this.props.navigation.navigate('ChiTiet');
    }
    Qmk() {
        alert = 'Quen mat Khau'
    }
    dn() {

    }
    static navigationOptions = {

        tabBarIcon: ({ tintColor }) => (
            <Image
                source={{ uri: 'http://cdn.onlinewebfonts.com/svg/img_191915.png' }}
                style={[style.icon, { tintColor: tintColor }]}

            />

        ),
    }

    
    render() {
        return (
            <TouchableWithoutFeedback style={{ flex: 1 }} onPress={dismissKeyboard}>
                <View style={style.v1}>

                    <View style={style.v2}>
                        <Text style={style.t2}> Sapo </Text>
                        <Text style={style.t3}>Phần mềm quản lý bán hàng dễ sử dụng nhất</Text>
                    </View>

                    <View style={style.v3}>

                        <View style={{
                            flexDirection: 'row',
                            alignItems: 'flex-start',
                            backgroundColor: 'white',
                            width: 340,
                            height: 45,
                            borderTopRightRadius: 5,
                            borderTopLeftRadius: 5,
                            borderBottomColor: '#91B0BF',
                            borderBottomWidth: 0.25,
                        }}>
                            <Image
                                style={{
                                    width: 20,
                                    height: 20,
                                    marginLeft: 10,
                                    marginRight: 10,
                                    marginTop: 10,
                                    marginBottom: 10,

                                }}
                                source={{ uri: 'https://cdn5.vectorstock.com/i/thumb-large/93/09/flat-home-icon-house-sign-web-internet-button-vector-13229309.jpg' }}
                            />
                            <TextInput
                                autoCapitalize='characters'
                                underlineColorAndroid='transparent'
                                style={{
                                    backgroundColor: 'white',
                                    width: 155,
                                    height: 44,
                                    fontSize: 15,
                                    alignItems: 'center',
                                    paddingBottom: 5
                                }}
                                placeholder="Dia Chi Cua Hang"
                                onChangeText={(text) => this.setState({ text })}
                                >
                            </TextInput>

                            <Picker style={{
                                backgroundColor: '#FFFFF',
                                width: 125,
                                height: 44,
                                marginRight: 40,
                                color: 'blue'

                            }}>

                                <Picker.Item value={".mysapo.vn"} label={".mysapo.vn"} />
                                <Picker.Item value={".mysapo.vn"} label={".mysapo.vn"} />
                                <Picker.Item value={".mysapo.vn"} label={".mysapo.vn"} />

                            </Picker>

                        </View>

                        <View style={{
                            flexDirection: 'row',
                            alignItems: 'flex-start',
                            backgroundColor: 'white',
                            width: 340,
                            height: 40,
                            borderBottomColor: '#91B0BF',
                            borderBottomWidth: 0.25,

                        }}>
                            <Image
                                style={{
                                    width: 20,
                                    height: 20,
                                    marginLeft: 10,
                                    marginRight: 10,
                                    marginTop: 10,
                                    marginBottom: 10,
                                }}
                                source={{ uri: 'http://www.iosicongallery.com/icons/cloudmagic-email-2015-06-12/512.png' }}
                            />
                            <TextInput
                                underlineColorAndroid='transparent'
                                autoCapitalize='characters'
                                style={style.ti1}
                                placeholder="Email"
                                onChangeText={(value) => this.setUser(value)} value={this.state.email}
                                >
                            </TextInput>
                        </View>

                        <View style={{
                            flexDirection: 'row',
                            alignItems: 'flex-start',
                            backgroundColor: 'white',
                            width: 340,
                            height: 40,
                            borderBottomRightRadius: 5,
                            borderBottomLeftRadius: 5,

                        }}>
                            <Image
                                style={{
                                    marginLeft: 10,
                                    marginRight: 10,
                                    marginTop: 10,
                                    marginBottom: 10,
                                    width: 20,
                                    height: 20,

                                }}
                                source={{ uri: 'https://d2gg9evh47fn9z.cloudfront.net/800px_COLOURBOX6440868.jpg' }}
                            />
                            <TextInput
                                underlineColorAndroid='transparent'
                                autoCapitalize='sentences'
                                style={{
                                    backgroundColor: 'white',
                                    width: 300,
                                    height: 40,
                                    marginRight: 40,
                                    fontSize: 15,
                                    alignItems: 'center',
                                    borderBottomRightRadius: 5,
                                }}
                                placeholder="Mat Khau"
                                secureTextEntry={true}
                                value={this.state.password}
                                onChangeText={(value) => this.setPass(value)}>
                            </TextInput>
                        </View>

                    </View>

                    <View style={{
                        flexDirection: 'row',
                        justifyContent: 'flex-end',
                        marginRight: 30,
                    }}>
                        <Text style={style.qmk} onPress={() => this.Reset()}>Quen mat khau?</Text>
                    </View>

                    <View style={{
                        flexDirection: 'column',
                        alignItems: 'center',
                        marginTop: 10,
                    }}>
                        <TouchableHighlight
                            style={style.button}
                            onPress={() => this.Login()}
                        >
                            <Text
                                style={{ color: 'white', fontSize: 20 }}
                            //onPress={() => this.props.navigation.push('Home')}
                            >
                                Đăng nhập
                        </Text>
                        </TouchableHighlight>

                    </View>

                    <View style={{
                        flexDirection: 'column',
                        alignItems: 'center',
                        marginTop: 10,
                    }}>
                        <Text
                            onPress={() => this.Register()}
                            style={{
                                color: '#51A9FF',
                                fontSize: 15,
                            }}
                        >Tao tai khoan moi.</Text>
                    </View>


                    <View style={style.v4}>
                        <View style={{
                            flexDirection: 'row',
                            justifyContent: 'flex-end',
                        }}
                        >

                        </View>

                    </View>


                </View>
            </TouchableWithoutFeedback>
        );
    }
}
export default Login;

var style = StyleSheet.create({
    v1: {
        flex: 1,
        backgroundColor: '#225486',
        opacity: 50,



    },
    v2: {
        flex: 1 / 2,
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'flex-end',

    },
    button: {
        alignItems: 'center',
        backgroundColor: '#51A9FF',
        borderRadius: 25,
        height: 40,
        width: 200,
        justifyContent: 'center'
    },
    v3: {
        //flex: 1,
        alignItems: 'center',
        flexDirection: 'column',


    },
    v4: {
        //flex: 1,
        flexDirection: 'column',


    },
    t1: {
        color: 'black',
        fontSize: 10,
    },
    t2: {
        color: 'white',
        fontSize: 60,
    },
    t3: {
        color: 'white',
        fontSize: 15,
        marginBottom: 10,
    },
    ti1: {
        backgroundColor: 'white',
        width: 300,
        height: 39,
        marginRight: 40,
        fontSize: 15,
        alignItems: 'center',


    },
    v31: {
        flex: 1
    },
    i1: {
        width: 30,
        height: 30,

    },
    qmk: {
        color: '#51A9FF',
        fontSize: 15,
        marginTop: 10,
    },
    icon: {
        width: 20,
        height: 20
    }
    
})