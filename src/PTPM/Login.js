import React, { Component } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, Alert, Image, ImageBackground, Dimensions, TouchableWithoutFeedback } from 'react-native';
import { firebaseApp } from './firebase';
const { width, height } = Dimensions.get('window');
import dismissKeyboard from 'react-native/Libraries/Utilities/dismissKeyboard';


 class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: null,
            password: null,

        };
     }
     static navigationOptions = ({ navigation }) => {
         return {
             header: null
         }
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
                this.props.navigation.navigate('DanhMucSanPham')


            })
            .catch(function (error) {
                console.log(error);

                Alert.alert(
                    'Thông báo',
                    'Đăng nhập thất bại!',
                    [

                        { text: 'OK', onPress: () => console.log('OK Pressed') },
                    ],
                    { cancelable: false } //day la gi
                )
            });
        //this.reset();


    }
    Register() {
        this.props.navigation.navigate('Register');
    }
    Reset() {
        this.props.navigation.navigate('ForgotPass');
    }
 

    render() {
        // const { form, fieldStyles, loginButtonArea, registerButtonArea, errorMessage, welcome, container } = styles;
        return (
            <View style={{ flex: 1, backgroundColor: '#3399ff' }}>
                <View style={{ flex: 0.4, justifyContent: 'center', alignItems: 'flex-end', flexDirection: 'row' }}>
                    <Image source={{ uri: "https://img.icons8.com/color/1600/wolfram-alpha.png" }} style={{ width: width / 2.5, height: width / 2.5 }} />
                    <Text style={{ marginLeft: 20, color: 'white', fontSize: 30, fontWeight: 'bold', marginBottom:100 }}>Welcome</Text>
                </View>
                
                <View style={{ flex: 0.2, alignItems: 'center' }}>
                    <TextInput placeholder={'Username'} style={{ height: height / 16, width: width * 3 / 4, fontSize: 17, backgroundColor: 'white', borderRadius: 30, paddingLeft:40 }}
                        onChangeText={(value) => this.setUser(value)} value={this.state.email} underlineColorAndroid='transparent'
 />
                    <TextInput placeholder={'Password'} style={{ height: height / 16, width: width * 3 / 4, fontSize: 17, backgroundColor: 'white', borderRadius: 30, marginTop: 30, paddingLeft: 40 }}
                        secureTextEntry={true}
                        value={this.state.password}
                        onChangeText={(value) => this.setPass(value)} underlineColorAndroid='transparent'
 />
                </View>
                <View style={{ flex: 0.3, flexDirection: 'column' }}>
                    <View style={{ alignItems: 'flex-end'}}>
                        <TouchableOpacity style={{ justifyContent:'center', marginRight: 50, }}
                            onPress={() => { this.Reset() }}>
                                <Text style={{ fontSize: 15, fontWeight: 'cover', color: 'white' }}>Forgot password?</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={{ alignItems: 'center', marginTop: 20 }}>
                        
                        <TouchableOpacity
                            style={{ height: height / 16, width: width * 2 / 4, backgroundColor: '#00405d',  borderRadius: 30 }}
                            onPress={() => this.Login()}>
                            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                                <Text style={{ color: 'white', fontWeight: 'cover', fontSize:20 }}>LOGIN</Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                    <View style={{ marginTop: 20,}}>
                        <TouchableOpacity
                            style={{ alignItems: 'center' }}
                                          onPress={() => this.Register()}
                        >
                                <Text style={{ color: 'white', fontWeight: 'cover', fontSize: 15 }}>Creat new account</Text>
                        </TouchableOpacity>
                        
                    </View>


                </View>
                
                    
            </View>
        );
    }
}

export default Login;

const styles = StyleSheet.create({
    form: {
        justifyContent: 'center',
        alignItems: 'center',
        paddingBottom: 10,
        width: 200,
    },
    fieldStyles: {
        height: 40,
       // color: MKColor.Orange,
        width: 200,
    },
    loginButtonArea: {
        marginTop: 20,
    },
    registerButtonArea: {
        marginTOp: 20,
    },
    registerButtonArea: {
        marginTop: 20
    },
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5FCFF',
    },
    errorMessage: {
        marginTop: 15,
        fontSize: 15,
        color: 'red',
        alignSelf: 'center'
    },
    icon: {
        width: 20,
        height: 20
    },
});
