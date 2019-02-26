import React, { Component } from 'react';
import { ScrollView, TextInput, Text, View, Image, StyleSheet, Dimensions, TouchableOpacity, Alert, Platform, TouchableHighlight, ImageBackground, TouchableWithoutFeedback } from 'react-native';
import { firebaseApp } from './firebase';
import RNFetchBlob from 'react-native-fetch-blob';
const database = firebaseApp.database();
const storage = firebaseApp.storage();
const fs = RNFetchBlob.fs;
const Blob = RNFetchBlob.polyfill.Blob;
var ImagePicker = require('react-native-image-picker');
const { width, height } = Dimensions.get('window');
var options = {
    title: "Get Image",
    customButtons: [
        {
            name: 'field',
            title: 'Get photo from field'
        },
    ],
}
window.XMLHttpRequest = RNFetchBlob.polyfill.XMLHttpRequest;
window.Blob = Blob;

//import dismissKeyboard from 'react-native/Libraries/Utilities/dismissKeyboard';
const uploadImage = (uri, mime = 'img/jpg') => {
    return new Promise((resolve, reject) => {
        const uploadUri = uri;
        if (Platform.OS === 'ios') {
            uploadUri.replace('file://', '')
        }
        const sessionID = new Date().getTime();
        let uploadBlob = null;
        const imageRef = storage.ref('TTCN_Image').child(`${sessionID}.jpg`)
        fs.readFile(uploadUri, 'base64')
            .then((data) => {
                return Blob.build(data, { type: `${mime};BASE64` })
            })
            .then((blob) => {
                uploadBlob = blob
                return imageRef.put(blob, { contentType: mime })
            })
            .then(() => {
                uploadBlob.close()
                imageRef.getDownloadURL().then(url => {
                    console.log("metvl" + url);
                    return resolve(url);
                })
            })

            .catch((error) => {
                reject(error)
            })


    })
}
export default class TTCN extends Component {
    constructor(props) {
        super(props)
        this.state = {
            // font:'',
            name: '',
            sex: '',
            dateOfBirth: '',
            address: '',
            phoneNumber: '',
            email: firebaseApp.auth().currentUser.email,
            avata: '',
            source: '',
            touched: {
                name: false,
                sex: false,
                dateOfBirth: false,
                address: false,
                phoneNumber: false,
                email: false,

            }
        }
    }
    pickImage() {

        //this.setState({ avata: '' })
        ImagePicker.showImagePicker(options, (response) => {

            if (response.didCancel) {

            }
            else if (response.error) {

            }
            else if (response.customButton) {

            }
            else {
                uploadImage(response.uri)
                    .then(url => this.setState({ source: url }))
                    .catch(error => console.log(error))

            }
        });

    }








    validate(name, sex, dateOfBirth, address, phoneNumber, email) {
        // true means invalid, so our conditions got reversed
        return {
            name: name.length === 0,
            sex: sex.length === 0,
            dateOfBirth: dateOfBirth.length === 0,
            address: address.length === 0,
            phoneNumber: phoneNumber.length === 0,
            email: email.length === 0,
            avata: this.state.avata
        };
    }

    handleBlur = (field) => (evt) => {
        this.setState({
            touched: { ...this.state.touched, [field]: true },
        });
    }
    setInfo(value, info) {

        this.setState({
            [info]: value
        })
        console.log(this.state.name);
    };
    update() {
        var user = firebaseApp.auth().currentUser;//Lấy thông tin về user đang đăng nhập
        console.log(this.state.source);
        var uid = user.uid
        firebaseApp.database().ref('User').child(`${uid}`).child('TTCN').set({//Nếu dùng push thì sẽ sinh ra một trường ngẫu nhiên trong uid
            Name: this.state.name,
            Sex: this.state.sex,
            DateOfBirth: this.state.dateOfBirth,
            Address: this.state.address,
            PhoneNumber: this.state.phoneNumber,
            Email: this.state.email,
            avata: this.state.source
        }).then((uri) => {

            Alert.alert(
                'Thông báo',
                'Cập nhật thông tin thành công!',
                [
                    {
                        text: 'OK', onPress: () => {

                            this.props.navigation.navigate('TTCN')
                        }
                    },
                ],
                { cancelable: false }
            )

        }).catch(error => console.log(error))

    }
    componentWillMount() {

        var uid = firebaseApp.auth().currentUser.uid;//Lấy thông tin về user đang đăng nhập
        var recentPostsRef = firebaseApp.database().ref('User/' + uid + '/TTCN/');
        recentPostsRef.once('value').then(snapshot => {
            // snapshot.val() is the dictionary with all your keys/values from the '/store' path
            this.setState({
                name: snapshot.val().Name,
                sex: snapshot.val().Sex,
                dateOfBirth: snapshot.val().DateOfBirth,
                address: snapshot.val().Address,
                phoneNumber: snapshot.val().PhoneNumber,
                email: snapshot.val().Email,
                avata: snapshot.val().avata,
                source: snapshot.val().avata
            })
            console.log("hihi" + snapshot.val().avata);
            console.log("hihi" + snapshot.val().Name);

        })

        // var recentPostsRef = firebaseApp.database().ref('User/' + uid);
        // recentPostsRef.once('value').then(snapshot => {
        //     // snapshot.val() is the dictionary with all your keys/values from the '/store' path

        //     this.setState({

        //         avata: snapshot.val().avata,
        //         font: snapshot.val().font,
        //     })
        // })
    }
    static navigationOptions = ({ navigation }) => {
        return {
            header: null
        }
    }

    render() {
        const errors = this.validate(this.state.name, this.state.sex, this.state.dateOfBirth, this.state.address,
            this.state.phoneNumber, this.state.email);
        const isDisabled = Object.keys(errors).some(x => errors[x]);
        const shouldMarkError = (field) => {
            const hasError = errors[field];
            const shouldShow = this.state.touched[field];

            return hasError ? shouldShow : false;

        };
        let img1 = this.state.avata == null ? { uri: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQbAUeSXZiwmIOO0R7NO4qz__aUJzZwmEiwY8HZWyQrsuPT9WBb" } : { uri: this.state.source };
        console.log(img1.uri);
        return (
            <View style={{ flex: 1, flexDirection: 'column' }}>
                <ScrollView>
                <View style={{ flex: 1 / 12, backgroundColor: '#43d854' }}>



                        <View style={{ flexDirection: 'row', flex: 1, marginTop: 5, justifyContent: 'center', alignItems: 'center' }}>
                        <View style={{ flex: 1 / 8, justifyContent: 'center', alignItems: 'center', }}>
                            <TouchableOpacity onPress={() => this.props.navigation.navigate('User')}>
                                <Image source={{ uri: "https://png.icons8.com/ios/2x/left.png" }} style={{ margin: 5, width: 25, height: 25 }} />
                            </TouchableOpacity>
                        </View>
                            <View style={{ flex: 7 / 8, justifyContent: 'center', alignItems: 'center' }}>
                                <Text style={{ fontSize: 18, color: 'white', height: 50, marginTop:10 }}>THÔNG TIN CÁ NHÂN</Text>
                        </View>


                    </View>

                </View>
                <View style={{ flex: 11 / 12 }}>

                    <ImageBackground
                        style={{ width, height: height / 4 }}
                        source={{ uri: "https://cancuongthinhphat.vn/images/unnamed.jpg" }}
                    >
                        <View style={{ flexDirection: 'row', height: height / 30, marginTop: 10 }}>

                        </View>

                        <View style={{ flex: 1, flexDirection: 'row' }}>
                                <TouchableOpacity onPress={(event) => { this.pickImage() }}>
                                    <View style={{ width: width / 5, height: width / 5, borderRadius: width / 10, borderColor: "green", borderWidth: 1, marginLeft: 10, justifyContent: 'center', alignItems:'center' }}>

                                    <Image style={{ width: width / 5, height: width / 5, borderRadius: width / 10 }}
                                        source={{ uri: img1.uri }} />
                                </View>
                            </TouchableOpacity>

                            <View style={{ flex: 0.75, margin: 10, justifyContent: 'center' }}>
                                <Text style={{ color: 'black', fontSize: 18 }}> {this.state.name}</Text>
                            </View>
                        </View>



                    </ImageBackground>


                    <View style={{ flex: 17.6, alignItems: 'center', marginTop: 15 }}>

                        <TextInput placeholder={'Họ và tên'} style={[(shouldMarkError('name') ? styles.error : styles.input)]} value={this.state.name}
                            onChangeText={(value) => { this.setInfo(value, 'name') }}
                            onBlur={this.handleBlur('name')} underlineColorAndroid='transparent' />
                        <TextInput placeholder={'Giới tính'} style={[(shouldMarkError('sex') ? styles.error : styles.input)]} value={this.state.sex}
                            onChangeText={(value) => { this.setInfo(value, 'sex') }}
                            onBlur={this.handleBlur('sex')} underlineColorAndroid='transparent' />
                        <TextInput placeholder={'Ngày sinh'} style={[(shouldMarkError('dateOfBirth') ? styles.error : styles.input)]} value={this.state.dateOfBirth}
                            onChangeText={(value) => { this.setInfo(value, 'dateOfBirth') }}
                            onBlur={this.handleBlur('dateOfBirth')} underlineColorAndroid='transparent' />
                        <TextInput placeholder={'Địa chỉ'} style={[(shouldMarkError('address') ? styles.error : styles.input)]} value={this.state.address}
                            onChangeText={(value) => { this.setInfo(value, 'address') }}
                            onBlur={this.handleBlur('address')} underlineColorAndroid='transparent' />
                        <TextInput placeholder={'Số điện thoại'} style={[(shouldMarkError('phoneNumber') ? styles.error : styles.input)]} value={this.state.phoneNumber}
                            onChangeText={(value) => { this.setInfo(value, 'phoneNumber') }}
                            onBlur={this.handleBlur('phoneNumber')} underlineColorAndroid='transparent' />
                        <TextInput placeholder={'Email'} style={[(shouldMarkError('email') ? styles.error : styles.input)]} value={this.state.email}
                            onChangeText={(value) => { this.setInfo(value, 'email') }}
                            onBlur={this.handleBlur('email')} underlineColorAndroid='transparent' />
                        <TouchableOpacity style={styles.touchableopacity} onPress={(event) => {
                            this.update(this.state.name, this.state.sex, this.state.dateOfBirth, this.state.address,
                                this.state.phoneNumber, this.state.email, this.state.avata)
                        }}>
                            <View style={styles.buttonLoginView}>
                                <Text style={styles.buttonText}>CẬP NHẬT</Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                    </View>
                </ScrollView>
            </View>

        );
    }
}
const styles = StyleSheet.create({
    error: {
        height: 40,
        width: 300,

        borderColor: 'red',
        borderWidth: 2,

        borderRadius: 15,
        paddingHorizontal: 10,
        fontSize: 15,
        marginVertical: 5,
    },
    background: {
        flex: 1,
        backgroundColor: '#455a64'
    },
    logoView: {
        flex: 4,

        justifyContent: 'center',
        alignItems: 'center'
    },
    logo: {
        width: 80,
        height: 80,
        resizeMode: 'contain'
    },
    nameOfApp: {
        color: 'white',
        fontSize: 13,
        padding: 10
    },
    loginInputView: {
        flex: 4,
        alignItems: 'center'
    },
    input: {
        height: 45,
        width: 350,
        backgroundColor: 'white',
        borderRadius: 15,
        paddingHorizontal: 8,
        fontSize: 15,
        marginVertical: 10,
    },
    input2: {
        height: 40,
        width: 300,
        backgroundColor: 'rgba(255,255,255,0.3)',
        borderRadius: 15,
        paddingHorizontal: 10,
        fontSize: 16,
        color: 'white',
        marginVertical: 15
    },
    registerView: {
        flex: 2,
        alignItems: 'center'
    },
    textregister: {
        color: 'white',
        fontSize: 15
    },
    loginText: {
        color: 'white',
        fontSize: 25,
        fontWeight: 'bold'
    },
    touchableopacity: {
        backgroundColor: '#4169E1',
        height: 50,
        width: 350,
        borderRadius: 25,
        paddingHorizontal: 16,
        marginVertical: 10

    },
    touchableopacity2: {
        backgroundColor: '#1c313a',
        height: 40,
        width: 350,
        borderRadius: 25,
        paddingHorizontal: 16,
        marginVertical: 10

    },
    buttonText: {
        fontSize: 20,
        color: 'white', marginTop:10
    },
    buttonLoginView: {
        justifyContent: 'center',
        alignItems: 'center',
        

    },
    Viewss: {
        flex: 1,

    },
    ss: {
        height: 50,
        width: 50,
        resizeMode: 'contain'
    },
    dendo: {
        height: 80,
        width: 80,
        resizeMode: 'center'
    },
    button: {
        backgroundColor: '#455a64',
        borderRadius: 10,
        padding: 5,
        marginBottom: 10,
        shadowColor: '#303838',
        shadowOffset: { width: 0, height: 5 },
        shadowRadius: 30,
        shadowOpacity: 0.35,
        height: 80,
        width: 80
    },
    row: {
        flex: 17 / 3,
        flexDirection: 'row',
        justifyContent: 'center',


        marginBottom: 0,
        marginTop: 0
    },

    headerMain: {
        flex: 1,

    },
    touch: {
        padding: 15,
        alignItems: 'center',
    },
    Touchable: {
        height: 50,
        width: 350,
        backgroundColor: '#455a64'

    },
    TouchableView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    }



})
