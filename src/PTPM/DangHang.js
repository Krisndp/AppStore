import React, { Component } from 'react';
import {
    Picker, View, Text, TouchableWithoutFeedback, TouchableOpacity, Image, ActivityIndicator,
    Platform, TextInput, ImageBackground, Dimensions, ScrollView, Alert
} from 'react-native';
import { firebaseApp } from './firebase';
import RNFetchBlob from 'react-native-fetch-blob';
const storage = firebaseApp.storage();
const Blob = RNFetchBlob.polyfill.Blob;
const fs = RNFetchBlob.fs;
import dismissKeyboard from 'react-native/Libraries/Utilities/dismissKeyboard';
const database = firebaseApp.database();
const { width, height } = Dimensions.get('window');



var ImagePicker = require('react-native-image-picker');

// More info on all the options is below in the README...just some common use cases shown here
var options = {
    title: 'Select Avatar',
    customButtons: [
        { name: 'fb', title: 'Choose Photo from Facebook' },
    ],
    storageOptions: {
        skipBackup: true,
        path: 'images'
    }
};

window.XMLHttpRequest = RNFetchBlob.polyfill.XMLHttpRequest;
window.Blob = Blob;


const uploadImage = (uri, mime = 'img/jpg') => {
    return new Promise((resolve, rejects) => {
        const uploadUri = Platform.OS === 'ios' ? uri.replace('file://', '') : uri;
        const sessionId = new Date().getTime();
        let uploadBlob = null;
        const imageRef = storage.ref('picture').child(`${sessionId}.jpg`);

        fs.readFile(uploadUri, 'base64')
            .then((data) => {
                return Blob.build(data, { type: `${mime};BASE64` });
            })
            .then((blob) => {
                uploadBlob = blob
                return imageRef.put(blob, { contentType: mime })
            })
            .then(() => {
                uploadBlob.close()
                return imageRef.getDownloadURL()
            })
            .then((url) => {
                resolve(url)
            })
            .catch((error) => {
                rejects(error)
            })
    })
}


export default class DangHang extends Component {
    constructor(props) {
        super(props);
        this.itemRef = database;
        this.state = {
            TenSP: '',
            Gia: '',
            SoLuong: '',
            LoaiSP: '',
            NgayBan: '',
            NSX:'',
            ThuongHieu: '',
            BaoHanh: '',
            Email: firebaseApp.auth().currentUser.email,
            TenShop: '',
            MoTa: '',
            uid: firebaseApp.auth().currentUser.uid,
            avataSource1: '',
            avataSource2: '',
            avataSource3: '',
            avataSource: '',
            avata: '',
            avatarSource: [],
            source: [],
            dmsp: 'Thiết bị điện tử',
            firebaseImageUrls: [],

        }
    }
    componentDidMount() {
        this.Clock = setInterval(() => this.GetTime(), 1000);
        this.GetTime();
        var uid = firebaseApp.auth().currentUser.uid;//Lấy thông tin về user đang đăng nhập
        var recentPostsRef = firebaseApp.database().ref('User/' + uid + '/TTCN/');
        recentPostsRef.once('value').then(snapshot => {
            // snapshot.val() is the dictionary with all your keys/values from the '/store' path

            this.setState({
                TenShop: snapshot.val().Name,
                avata: snapshot.val().avata,

            })
        })
        
    }
    static navigationOptions = ({ navigation }) => {
        return {
            header: null
        }
    }

    GetTime() {

        // Creating variables to hold time.
        var date, TimeType, hour, minutes, seconds, fullTime;

        // Creating Date() function object.
        date = new Date();

        // Getting current hour from Date object.
        hour = date.getHours();

        // Checking if the Hour is less than equals to 11 then Set the Time format as AM.
        if (hour <= 11) {

            TimeType = 'AM';

        }
        else {

            // If the Hour is Not less than equals to 11 then Set the Time format as PM.
            TimeType = 'PM';

        }


        // IF current hour is grater than 12 then minus 12 from current hour to make it in 12 Hours Format.
        if (hour > 12) {
            hour = hour - 12;
        }

        // If hour value is 0 then by default set its value to 12, because 24 means 0 in 24 hours time format. 
        if (hour == 0) {
            hour = 12;
        }


        // Getting the current minutes from date object.
        minutes = date.getMinutes();

        // Checking if the minutes value is less then 10 then add 0 before minutes.
        if (minutes < 10) {
            minutes = '0' + minutes.toString();
        }


        //Getting current seconds from date object.
        seconds = date.getSeconds();

        // If seconds value is less than 10 then add 0 before seconds.
        if (seconds < 10) {
            seconds = '0' + seconds.toString();
        }


        // Adding all the variables in fullTime variable.
        fullTime = hour.toString() + ':' + minutes.toString() + ':' + seconds.toString() + ' ' + TimeType.toString();


        // Setting up fullTime variable in State.
        this.setState({

            time: fullTime

        });
        var date = new Date().getDate();
        var month = new Date().getMonth() + 1;
        var year = new Date().getFullYear();

        date = date + '-' + month + '-' + year;
        this.setState({
            date: date

        })
    }
    NhapDL() {

        const user = firebaseApp.auth().currentUser;//Lấy thông tin về user đang đăng nhập
        console.log(user.uid);
        const uid = user.uid;
        var firebaseImageUrls = this.state.firebaseImageUrls;
        firebaseImageUrls.push("");
        firebaseImageUrls.push("");
        firebaseImageUrls.push("");
        firebaseImageUrls.push("");
        this.setState({ firebaseImageUrls: firebaseImageUrls });

        this.itemRef.ref('Product').child(`${uid}`).push({
            Gia: parseInt(this.state.Gia),
            LoaiSP: this.state.LoaiSP,
            SoLuong: parseInt(this.state.SoLuong),
            BaoHanh: this.state.BaoHanh,
            TenSP: this.state.TenSP,
            ThuongHieu: this.state.ThuongHieu,
            NSX: this.state.NSX,
            Link1: this.state.firebaseImageUrls[0],
            Link2: this.state.firebaseImageUrls[1],
            Link3: this.state.firebaseImageUrls[2],
            Link: this.state.firebaseImageUrls[3],
            MoTa: this.state.MoTa,
            Email: this.state.Email,
            TenShop: this.state.TenShop,
            idNguoiBan: this.state.uid,
            AvataNguoiBan: this.state.avata,
            NgayBan: this.state.date,
            DanhMucSanPham: this.state.dmsp
        });

        Alert.alert(
            'Thông báo',
            'Upload thành công!',
            [
                {
                    text: 'OK', onPress: () => {

                        this.props.navigation.push('DangHang')
                    }
                },
            ],
            { cancelable: false }
        )



            this.setState({ Gia: '' }),
            this.setState({ MoTa: '' }),
            this.setState({ LoaiSP: '' }),
            this.setState({ SoLuong: '' }),
            this.setState({ NgayBan: '' }),
            this.setState({ TenSP: '' }),
            this.setState({ ThuongHieu: '' }),
            this.setState({ BaoHanh: '' }),
            this.setState({ Link: null }),
            this.setState({ Link1: null }),
            this.setState({ Link2: null }),
            this.setState({ Link3: null })
            
    }


    pickImage(i) {


        ImagePicker.showImagePicker(options, (response) => {

            if (response.didCancel) {

            }
            else if (response.error) {

            }
            else if (response.customButton) {

            }
            else {
                let array = this.state.source.slice();
                array[i] = response.uri;
                this.setState({
                    source: array,
                    avatarSource: array
                });
                // console.log(this.state.email)


            }
        });

    }
    upload() {
        console.log("Day ne");
        console.log("aa" + this.state.source);
        console.log("bb" + this.state.avatarSource);
        const { avatarSource } = this.state;
        this.state.firebaseImageUrls = [];
        avatarSource.map(uri => {
            this.uploadImageNew(uri)
        })
    };

    uploadImageNew(uri) {
        uploadImage(uri)
            .then(url => {
                console.log("url la:" + url);
                const { avatarSource } = this.state;
                this.state.firebaseImageUrls.push(url);
                console.log("fb ne" + this.state.firebaseImageUrls);
                if (this.state.firebaseImageUrls.length === avatarSource.length) {
                    console.log("hihihi");
                    this.NhapDL();
                }
            });

    }
    
    LoaiSP() {
        let dmsp = this.state.dmsp;
        if (dmsp === 'Thiết bị điện tử') {
            return (
                <Picker style={{
                    flex: 1,
                    color: 'white',
                    fontSize: 15,

                }} selectedValue={this.state.LoaiSP} onValueChange={(value) => this.setState({ LoaiSP: value })}>
                    <Picker.Item value={'Điện thoại'} label={'Điện thoại'} />
                    <Picker.Item value={'Máy tính'} label={'Máy tính'} />
                    <Picker.Item value={'Máy ảnh'} label={'Máy ảnh'} />
                </Picker>
            );
        } else if (dmsp === 'Sức khỏe đời sống') {
            return (
                <Picker style={{
                    flex: 1,
                    color: 'white',
                    fontSize: 15,

                }} selectedValue={this.state.LoaiSP} onValueChange={(value) => this.setState({ LoaiSP: value })}>
                    <Picker.Item value={'Chăn, ga'} label={'Chăn, ga'} />
                    <Picker.Item value={'Tủ, hộp'} label={'Tủ, hộp'} />
                    <Picker.Item value={'Trang trí'} label={'Trang trí'} />
                </Picker>
            );
            console.log(LoaiSP);
        } else if (dmsp === 'Thời trang sắc đẹp') {
            return (
                <Picker style={{
                    flex: 1,
                    color: 'white',
                    fontSize: 15,

                }} selectedValue={this.state.LoaiSP} onValueChange={(value) => this.setState({ LoaiSP: value })}>
                    <Picker.Item value={'Thời trang nam'} label={'Thời trang nam'} />
                    <Picker.Item value={'Thời trang nữ'} label={'Thời trang nữ'} />
                    <Picker.Item value={'Phụ kiện'} label={'Phụ kiện'} />
                </Picker>
            );
        } else if (dmsp === 'Thể thao') {
            return (
                <Picker style={{
                    flex: 1,
                    color: 'white',
                    fontSize: 15,

                }} selectedValue={this.state.LoaiSP} onValueChange={(value) => this.setState({ LoaiSP: value })}>
                    <Picker.Item value={'Vợt'} label={'Vợt'} />
                    <Picker.Item value={'Bóng'} label={'Bóng'} />
                </Picker>
            );
        } else if (dmsp === 'Nhà sách') {
            return (
                <Picker style={{
                    flex: 1,
                    color: 'white',
                    fontSize: 15,

                }} selectedValue={this.state.LoaiSP} onValueChange={(value) => this.setState({ LoaiSP: value })}>
                    <Picker.Item value={'Sách giáo khoa'} label={'Sách giáo khoa'} />
                    <Picker.Item value={'Tiểu thuyết'} label={'Tiểu thuyết'} />
                    <Picker.Item value={'Văn phòng phẩm'} label={'Văn phòng phẩm'} />
                    <Picker.Item value={'Giấy'} label={'Giấy'} />
                </Picker>
            );
        } else if (dmsp === 'Du lịch') {
            return (
                <Picker style={{
                    flex: 1,
                    color: 'white',
                    fontSize: 15,

                }} selectedValue={this.state.LoaiSP} onValueChange={(value) => this.setState({ LoaiSP: value })}>
                    <Picker.Item value={'Dụng cụ'} label={'Dụng cụ'} />
                    <Picker.Item value={'Đồ ăn'} label={'Đồ ăn'} />
                </Picker>
            );
        } else if (dmsp === 'Đồ chơi') {
            return (
                <Picker style={{
                    flex: 1,
                    color: 'white',
                    fontSize: 15,

                }} selectedValue={this.state.LoaiSP} onValueChange={(value) => this.setState({ LoaiSP: value })}>
                    <Picker.Item value={'Đồ chơi trẻ em'} label={'Đồ chơi trẻ em'} />
                    <Picker.Item value={'Đồ chơi điện tử'} label={'Đồ chơi điện tử'} />

                </Picker>
            );
        }else {
            return (
                <View></View>
            );
        }
    }

    render() {
        let img1 = this.state.source[0] == null ? { uri: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQbAUeSXZiwmIOO0R7NO4qz__aUJzZwmEiwY8HZWyQrsuPT9WBb" } : { uri: this.state.source[0] };
        let img2 = this.state.source[1] == null ? { uri: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQbAUeSXZiwmIOO0R7NO4qz__aUJzZwmEiwY8HZWyQrsuPT9WBb" } : { uri: this.state.source[1] };
        let img3 = this.state.source[2] == null ? { uri: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQbAUeSXZiwmIOO0R7NO4qz__aUJzZwmEiwY8HZWyQrsuPT9WBb" } : { uri: this.state.source[2] };
        let img4 = this.state.source[3] == null ? { uri: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQbAUeSXZiwmIOO0R7NO4qz__aUJzZwmEiwY8HZWyQrsuPT9WBb" } : { uri: this.state.source[3] };
        return (
            <View style={{ flex: 1 }}>
                <View style={{ flex: 1 / 11, backgroundColor: '#55acee' }}>
                    <View style={{ flexDirection: 'row', height: 60, marginTop: 5, justifyContent: 'center', alignItems: 'center' }}>
                        <View style={{ flex: 1 / 8, justifyContent: 'center', alignItems: 'center', }}>
                            <TouchableOpacity onPress={() => this.props.navigation.navigate('User')}>
                                <Image source={{ uri: "https://png.icons8.com/ios/2x/left.png" }} style={{ margin: 5, width: 25, height: 25 }} />
                            </TouchableOpacity>
                        </View>


                            <View style={{ flex: 7 / 8, justifyContent: 'center', alignItems: 'center' }}>
                                <Text style={{ fontSize: 18, color: 'white',}}>Đăng sản phẩm mới</Text>
                        </View>


                    </View>

                </View>

                <View style={{ flex: 9 / 11 }}>
                    <ScrollView>
                        <View style={{ backgroundColor: 'white', flexDirection: 'column', marginTop: 5 }}>
                            <View style={{ flexDirection: 'row', height: 155, borderBottomColor: 'black', borderBottomWidth: 1 }}>

                                <ScrollView horizontal={true}>
                                    <TouchableOpacity onPress={(event) => this.pickImage(0)} >
                                        <View style={{ width: 150, height: 150, borderColor: 'green', borderWidth: 1 }}>
                                            <Image style={{ height: 140, width: 140, margin: 5 }} source={ img1 } />
                                        </View>
                                    </TouchableOpacity>
                                    <TouchableOpacity onPress={(event) => this.pickImage(1)} >
                                        <View style={{ width: 150, height: 150, borderColor: 'green', borderWidth: 1 }}>
                                            <Image style={{ height: 140, width: 140, margin: 5 }} source={ img2 } />
                                        </View>
                                    </TouchableOpacity>
                                    <TouchableOpacity onPress={(event) => this.pickImage(2)} >
                                        <View style={{ width: 150, height: 150, borderColor: 'green', borderWidth: 1 }}>
                                            <Image style={{ height: 140, width: 140, margin: 5 }} source={ img3 } />
                                        </View>
                                    </TouchableOpacity>
                                    <TouchableOpacity onPress={(event) => this.pickImage(3)} >
                                        <View style={{ width: 150, height: 150, borderColor: 'green', borderWidth: 1 }}>
                                            <Image style={{ height: 140, width: 140, margin: 5 }} source={ img4 } />
                                        </View>
                                    </TouchableOpacity>
                                </ScrollView>
                            </View>

                            <View>
                                <TextInput style={{ width, borderBottomColor: 'grey', borderBottomWidth: 1, fontSize: 18, color: 'black' }}
                                    onChangeText={(TenSP) => this.setState({ TenSP })}
                                    underlineColorAndroid='transparent'
                                    value={this.state.TenSP}
                                    multiline={true}
                                    placeholder="Tên sản phẩm"


                                />
                                <TextInput style={{ width, borderBottomColor: 'grey', borderBottomWidth: 1, fontSize: 18, color: 'black' }}
                                    onChangeText={(MoTa) => this.setState({ MoTa })}
                                    value={this.state.MoTa}
                                    underlineColorAndroid='transparent'
                                    placeholder="Mô tả"
                                    multiline={true}
                                />
                            </View>
                        
                            <View style={{ flexDirection: 'row', borderColor: 'grey', borderWidth: 1 }}>
                                <View style={{ justifyContent: 'center', alignItems: 'center', flex: 1}}>
                                    <Image source={{ uri: "https://img.icons8.com/color/2x/multiple-choice.png" }} style={{ width: 25, height: 25 }} />
                                </View>
                                <View style={{ flex: 4, alignItem: 'center', justifyContent: 'center' }}>
                                    <Text style={{ color: 'black', fontSize: 15, }}>Danh mục sản phẩm </Text>
                                </View>
                                <View style={{ flex: 5, flexDirection: 'row', alignItem: 'center', justifyContent: 'center', }}>
                                    <View style={{ flex: 5, alignItem: 'center', justifyContent: 'center' }}>
                                        <Text style={{ fontSize: 15, color: 'blue' }}>{this.state.dmsp}</Text>
                                    </View>
                                    <Picker style={{
                                        flex: 1,
                                        color: 'white',
                                        fontSize: 15,

                                    }} selectedValue={this.state.dmsp} onValueChange={(value) => this.setState({ dmsp: value })}>
                                        <Picker.Item value={'Thiết bị điện tử'} label={'Thiết bị điện tử'} />
                                        <Picker.Item value={'Sức khỏe đời sống'} label={'Sức khỏe đời sống'} />
                                        <Picker.Item value={'Thời trang sắc đẹp'} label={'Thời trang sắc đẹp'} />
                                        <Picker.Item value={'Thể thao'} label={'Thể thao'} />
                                        <Picker.Item value={'Du lịch'} label={'Du lịch'} />
                                        <Picker.Item value={'Nhà sách'} label={'Nhà sách'} />
                                        <Picker.Item value={'Đồ chơi'} label={'Đồ chơi'} />
                                    </Picker>
                                </View>
                            </View>
                        </View>

                        <View style={{ flexDirection: 'column', marginTop: 20, backgroundColor: 'white' }}>
                            <View style={{ flexDirection: 'row', borderTopColor: 'grey', borderTopWidth: 1 }}>
                                <View style={{ justifyContent: 'center', alignItems: 'center', flex: 1,}}>
                                    <Image source={{ uri: "https://img.icons8.com/color/50/000000/open-box.png" }} style={{ width: 20, height: 20 }} />
                                </View>
                                <View style={{ flex: 3, alignItem: 'center', justifyContent: 'center'}}>
                                    <Text style={{ color: 'black', fontSize: 15,}}>Số lượng</Text>
                                </View>
                                <View style={{ flex:6, alignItem: 'center', justifyContent: 'center'}}>

                                    <TextInput style={{ width, fontSize: 15, color: 'black' }}
                                        onChangeText={(SoLuong) => this.setState({ SoLuong })}
                                        value={this.state.SoLuong}
                                        underlineColorAndroid='transparent'
                                        multiline={true}
                                        
                                        />
                                </View>
                            </View>
                            <View style={{ flexDirection: 'row', borderColor: 'grey', borderWidth: 1 }}>
                                <View style={{ justifyContent: 'center', alignItems: 'center', flex: 1,}}>
                                        <Image source={{ uri: "https://img.icons8.com/color/2x/categorize.png" }} style={{ width: 25, height: 25 }} />
                                </View>
                                <View style={{ flex: 3, alignItem: 'center', justifyContent: 'center' }}>
                                    <Text style={{ color: 'black', fontSize: 15,}}>Loại sản phẩm</Text>
                                </View>
                                <View style={{ flex: 6, flexDirection: 'row', alignItem: 'center', justifyContent: 'center', }}>
                                    <View style={{ flex:2, alignItem: 'center', justifyContent: 'center' }}>
                                        <Text style={{ fontSize: 15, color: 'black' }}>{this.state.LoaiSP}</Text>
                                    </View>
                                    {this.LoaiSP()}
                                </View>
                            </View>

                            <View style={{ flexDirection: 'row', borderBottomColor: 'grey', borderBottomWidth: 1 }}>
                                <View style={{ justifyContent: 'center', alignItems: 'center', flex: 1,}}>
                                    <Image source={{ uri: "https://img.icons8.com/office/50/000000/calendar.png" }} style={{ width: 25, height: 25 }} />
                                </View>
                                <View style={{ flex: 3, alignItem: 'center', justifyContent: 'center' }}>
                                    <Text style={{ color: 'black', fontSize: 15}}> NSX</Text>
                                </View>
                                <View style={{ flex: 6, alignItem: 'center', justifyContent: 'center' }}>

                                    <TextInput style={{ width, fontSize: 15, color: 'black' }}
                                        onChangeText={(NSX) => this.setState({ NSX })}
                                        underlineColorAndroid='transparent'
                                        value={this.state.NSX}
                                        multiline={true}
                                    />
                                </View>
                            </View>
                        </View>



                        <View style={{ flexDirection: 'column', marginTop: 10, backgroundColor: 'white' }}>

                            <View style={{ flexDirection: 'row', borderBottomColor: 'grey', borderBottomWidth: 1 }}>
                                <View style={{ justifyContent: 'center', alignItems: 'center', flex: 1,}}>
                                    <Image source={{ uri: "https://img.icons8.com/color/2x/price-tag-euro.png" }} style={{ width: 25, height: 25 }} />
                                </View>
                                <View style={{ flex: 3, alignItem: 'center', justifyContent: 'center' }}>
                                    <Text style={{ color: 'black', fontSize: 15 }}>Giá</Text>
                                </View>
                                <View style={{ flex: 6, alignItem: 'center', justifyContent: 'center' }}>

                                    <TextInput style={{ width, fontSize: 15, color: 'black' }}
                                        onChangeText={(Gia) => this.setState({ Gia })}
                                    underlineColorAndroid='transparent'
                                        value={this.state.Gia}
                                    multiline={true}
                                    />
                                </View>
                                </View>

                            <View style={{ flexDirection: 'row', borderBottomColor: 'grey', borderBottomWidth: 1 }}>
                                <View style={{ justifyContent: 'center', alignItems: 'center', flex: 1,}}>
                                    <Image source={{ uri: "https://img.icons8.com/color/2x/trademark.png" }} style={{ width: 25, height: 25 }} />
                                </View>
                                <View style={{ flex: 3, alignItem: 'center', justifyContent: 'center' }}>

                                    <Text style={{ color: 'black', fontSize: 15}}>Thương hiệu</Text>
                                </View>
                                <View style={{ flex: 6, alignItem: 'center', justifyContent: 'center' }}>

                                    <TextInput style={{ width, fontSize: 15, color: 'black' }}
                                        onChangeText={(ThuongHieu) => this.setState({ ThuongHieu })}
                                    underlineColorAndroid='transparent'
                                        value={this.state.ThuongHieu}
                                    multiline={true}
                                    />
                                </View>
                                </View>
                            <View style={{ flexDirection: 'row', borderBottomColor: 'grey', borderBottomWidth: 1 }}>
                                <View style={{ justifyContent: 'center', alignItems: 'center', flex: 1,}}>
                                        <Image source={{ uri: "https://img.icons8.com/color/2x/guarantee.png" }} style={{ width: 25, height: 25 }} />
                                </View>
                                <View style={{ flex: 3, alignItem: 'center', justifyContent: 'center'}}>

                                    <Text style={{ color: 'black', fontSize: 15,}}>Bảo hành</Text>
                                </View>
                                <View style={{ flex: 6, alignItem: 'center', justifyContent: 'center' }}>

                                    <TextInput style={{ width, fontSize: 15, color: 'black' }}
                                        onChangeText={(BaoHanh) => this.setState({ BaoHanh })}
                                    underlineColorAndroid='transparent'
                                        value={this.state.BaoHanh}
                                    multiline={true}
                                    />
                                </View>
                            </View>
                        </View>
                    </ScrollView>

                    </View>
                <View style={{ flex: 1 / 11 }}>
                    <TouchableOpacity onPress={() => { this.upload() }} style={{ backgroundColor: '#dc4e41', alignItems: 'center', justifyContent: 'center', flex: 1 }}>
                        <Text style={{ color: 'white', fontSize: 18 }} onPress={() => { this.upload() }}> HOÀN THÀNH </Text>
                    </TouchableOpacity>
                    </View>

            </View>

        )
    }
}

