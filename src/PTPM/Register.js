import React, { Component } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, Alert, Image, TouchableWithoutFeedback, ImageBackground, Dimensions } from 'react-native';
//import { MKTextField, MKColor, MKButton } from 'react-native-material-kit';
//import Loader from './Loader';
//import firebase from 'firebase';
import { firebaseApp } from './firebase';
import dismissKeyboard from 'react-native/Libraries/Utilities/dismissKeyboard';
const { width, height } = Dimensions.get('window');

const styles = StyleSheet.create({
    error: {
        height: 60,
        width: 450,
        fontSize: 25,
        borderColor: 'red',
        borderWidth: 2,
        backgroundColor: 'white',
    },
    style1: {
        height: 60, width: 450, fontSize: 25, marginVertical: 5
    },
    form: {
        justifyContent: 'center',
        alignItems: 'center',
        paddingBottom: 10,
        width: 200,
    },
    fieldStyles: {
        height: 40,
        //color: MKColor.Orange,
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
        fontSize: 25,
        color: 'red',
        alignSelf: 'center'
    },
});

 class Register extends Component {
    state = {
        email: '',
        password: '',
        retypePassword: '',
        touched: {
            email: false,
            password: false,
            retypePassword: false,
        }
    };

    //
    // setUser(value){
    //     this.setState({
    //         email:value
    //     })
    // }
    // setPass(value){
    //     this.setState({
    //         password:value
    //     })
    // }
    // setRetypePass(value){
    //     this.setState({
    //         retypePassword:value
    //     })
    // }
    handleEmailChange(evt) {
        this.setState({ email: evt });
    }

    handlePasswordChange(evt) {
        this.setState({ password: evt });
    }
    handlereTypePasswordChange(evt) {
        this.setState({ retypePassword: evt });
    }
    handleBlur = (field) => (evt) => {
        this.setState({
            touched: { ...this.state.touched, [field]: true },
        });
    }
    validate(email, password, retypePassword) {
        // true means invalid, so our conditions got reversed
        return {
            email: email.length === 0,
            password: password.length === 0,
            retypePassword: retypePassword.length === 0
        };
     }
     static navigationOptions = ({ navigation }) => {
         return {
             header: null
         }
     }
    // canBeSubmitted() {
    //     const errors = validate(this.state.email, this.state.password,this.state.retypePassword);
    //     const isDisabled = Object.keys(errors).some(x => errors[x]);
    //     return !isDisabled;
    // }
    // handleSubmit = (evt) => {
    //     if (!this.canBeSubmitted()) {
    //         evt.preventDefault();
    //         return;
    //     }
    //     const { email, password,retypePassword } = this.state;
    //     // alert(Signed up with email: ${email} password: ${password});
    // }
    handleBlur = (field) => (evt) => {
        this.setState({
            touched: { ...this.state.touched, [field]: true },
        });//
    }
    Register() {
        firebaseApp.auth().createUserWithEmailAndPassword(this.state.email, this.state.password)
            .then(() => {
                Alert.alert(
                    'Thông báo',
                    'Đăng kí thành công!',
                    [

                        { text: 'OK', onPress: () => { this.props.navigation.navigate('Login') }},
                    ],
                    { cancelable: false }
                )
            })
            .catch(function (error) {
                console.log(error)
                Alert.alert(
                    'Thông báo',
                    'Đăng kí thất bại!',
                    [

                        { text: 'OK', onPress: () => console.log('OK Pressed') },
                    ],
                    { cancelable: false }
                )

            });
        this.setState({
            email: '',
            password: '',
            retypePassword: ''
        })
    }

    render() {
        const errors = this.validate(this.state.email, this.state.password, this.state.retypePassword);
        const isDisabled = Object.keys(errors).some(x => errors[x]);
        const shouldMarkError = (field) => {
            const hasError = errors[field];
            const shouldShow = this.state.touched[field];

            return hasError ? shouldShow : false;
            //What
        };
        // const { form, fieldStyles, loginButtonArea, registerButtonArea, errorMessage, welcome, container } = styles;
        return (
            <View style={{ flex: 1, backgroundColor: '#3399ff' }}>
                <View style={{ flex: 1 / 11,  }}>



                    <View style={{ flexDirection: 'row', height: 80, marginTop: 5, justifyContent: 'center', alignItems: 'center' }}>
                        <View style={{ flex: 1 / 8, justifyContent: 'center', alignItems: 'center', }}>
                            <TouchableOpacity onPress={() => this.props.navigation.pop()}>
                                <Image source={{ uri: "https://png.icons8.com/ios/2x/left.png" }} style={{ margin: 10, width: 40, height: 40 }} />
                            </TouchableOpacity>
                        </View>


                        <View style={{ flex: 7 / 8, justifyContent: 'center', alignItems: 'center' }}>
                            <Text style={{ fontSize: 30, color: 'black', height: 50 }}></Text>
                        </View>


                    </View>

                </View>
                <View style={{ flex: 10 / 11 }}>

                    <View style={{ flex: 1, justifyContent: 'flex-end', alignItems: 'center', marginBottom:30 }}>
                        <Text style={{ fontSize: 40, fontWeight: 'bold', color: '#000000', paddingBottom: 10 }}>Create an account</Text>
                        <View style={{ height: 60, width: 450, fontSize: 25, backgroundColor: 'white', borderRadius: 30, marginTop:30 }}>
                            <TextInput 
                                style={[(shouldMarkError('email') ? styles.error : styles.style1)]}
                                placeholder={'E-mail'} value={this.state.email}
                                onChangeText={(value) => this.handleEmailChange(value)}//handleEmailChange(evt)
                                onBlur={this.handleBlur('email')}
                                underlineColorAndroid='transparent'/>
                        </View>
                        <View style={{ height: 60, width: 450, fontSize: 25, backgroundColor: 'white', borderRadius: 30, marginTop: 30  }}>
                            <TextInput
                            style={[(shouldMarkError('password') ? styles.error : styles.style1)]}
                            placeholder={'Password'} secureTextEntry={true}
                            value={this.state.password} onChangeText={(value) => this.handlePasswordChange(value)}
                                onBlur={this.handleBlur('password')}
                                underlineColorAndroid='transparent'/>
                        </View>
                        <View style={{ height: 60, width: 450, fontSize: 25, backgroundColor: 'white', borderRadius: 30,marginTop: 30  }}>
                            <TextInput
                                    style={[(shouldMarkError('retypePassword') ? styles.error : styles.style1)]} 
                                placeholder={'Retype Password'} secureTextEntry={true}
                                value={this.state.retypePassword} onChangeText={(value) => this.handlereTypePasswordChange(value)}
                                onBlur={this.handleBlur('retypePassword')}
                                underlineColorAndroid='transparent'/>
                        </View>

                </View>
                <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'center', alignItems: 'flex-start' }}>

                    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', marginTop: 30 }}>
                        <TouchableOpacity
                            disabled={isDisabled}
                                style={{ height: 60, width: 250, backgroundColor: '#00405d', marginBottom: 10, borderRadius: 30 }}
                            onPress={() => this.Register()}>
                                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                                    <Text style={{ color: 'white', fontWeight: 'bold', fontSize: 25 }}>CONFIRM</Text>
                            </View>
                        </TouchableOpacity>
                    </View>


                    </View>
                </View>
            </View>
        );
    }
}
export default Register;