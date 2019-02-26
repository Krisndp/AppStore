import React, { Component } from 'react';
import { TouchableOpacity, Text, View, TextInput, ScrollView, Alert } from 'react-native';
import { firebaseApp } from './firebase';
const database = firebaseApp.database();
import Header from './Header';

export default class DiaChi extends Component {
    constructor(props){
        super(props);
        this.state=({
            HoTen: '',
            SoDienThoai: '',
            Tinh: '',
            Huyen: '',
            Xa: '',
            DiaChiCuThe: ''
        })
    }

    componentDidMount(){
        var keyFromListDiaChi = this.props.navigation.state.params;
        const uid = firebaseApp.auth().currentUser.uid;
        if(keyFromListDiaChi != 'new'){
            firebaseApp.database().ref('DiaChi').child(`${uid}`).child(keyFromListDiaChi).on('value', (data)=>{
                if(data.exists()){
                    this.setState({
                        HoTen: data.val().HoTen,
                        SoDienThoai: data.val().SoDienThoai,
                        Tinh: data.val().Tinh,
                        Huyen: data.val().Huyen,
                        Xa: data.val().Xa,
                        DiaChiCuThe: data.val().DiaChiCuThe,
                    })
                }
            })
        }
    }

    onPressCapNhat(){
        if (this.state.HoTen.trim() === '' || this.state.SoDienThoai.trim() === '' ||
            this.state.Tinh.trim() === '' || this.state.Huyen.trim() === '' ||
            this.state.Xa.trim() === '' || this.state.DiaChiCuThe.trim() === '') {
            Alert.alert('Thông báo', 'Vui lòng nhập đầy đủ các trường thông tin!');
            return;
        }

        var keyFromListDiaChi = this.props.navigation.state.params;
        const uid = firebaseApp.auth().currentUser.uid;
        if(keyFromListDiaChi == 'new'){
            firebaseApp.database().ref('DiaChi').child(`${uid}`).push({
                HoTen: this.state.HoTen,
                SoDienThoai: this.state.SoDienThoai,
                Tinh: this.state.Tinh,
                Huyen: this.state.Huyen,
                Xa: this.state.Xa,
                DiaChiCuThe: this.state.DiaChiCuThe,
            })

            this.props.navigation.pop();
        }else{
            firebaseApp.database().ref('DiaChi').child(`${uid}`).child(keyFromListDiaChi).update({
                HoTen: this.state.HoTen,
                SoDienThoai: this.state.SoDienThoai,
                Tinh: this.state.Tinh,
                Huyen: this.state.Huyen,
                Xa: this.state.Xa,
                DiaChiCuThe: this.state.DiaChiCuThe,
            })

            this.props.navigation.pop();
        }
    }

    onPressHuy(){
        this.props.navigation.pop();
    }

    render(){
        
        return(
            <View style={{flex: 1}}>
                <ScrollView style={{ flex: 0.98}}
                    scrollEnabled>
                    <Header TenMH='THÔNG TIN GIAO HÀNG'
                            navigate={() => this.props.navigation.pop()}></Header>

                    <Text style={{marginLeft: 5, marginTop: 10, 
                                    fontSize: 12}}>
                        Họ và tên
                    </Text>

                    <TextInput style={{borderColor: 'gray', borderRadius: 5,
                                        borderWidth: 1, margin: 5, padding: 3,
                                        paddingLeft: 10,                                    
                                        }}
                                placeholder = 'Tên khách hàng'
                                onChangeText={
                                    (text) => {
                                        this.setState({ HoTen: text });
                                    }
                                }
                                value={this.state.HoTen} />

                    <Text style={{marginLeft: 5, fontSize: 12}}>
                        Điện thoại
                    </Text>

                    <TextInput style={{borderColor: 'gray', borderRadius: 5,
                                        borderWidth: 1, margin: 5, padding: 3,
                                        paddingLeft: 10,                                    
                                        }}
                                placeholder = 'Nhập số điện thoại'
                                keyboardType = 'number-pad'
                                onChangeText={
                                    (text) => {
                                        this.setState({ SoDienThoai: text });
                                    }
                                }
                                value={this.state.SoDienThoai}/>          
                    
                    <Text style={{marginLeft: 5, fontSize: 12
                                    }}>
                        Tỉnh/Thành phố
                    </Text>

                    <TextInput style={{borderColor: 'gray', borderRadius: 5,
                                        borderWidth: 1, margin: 5, padding: 3,
                                        paddingLeft: 10,                                    
                                        }}
                                placeholder = 'Tên tỉnh/thành phố'
                                onChangeText={
                                    (text) => {
                                        this.setState({ Tinh: text });
                                    }
                                }
                                value={this.state.Tinh}/>

                    <Text style={{marginLeft: 5, fontSize: 12
                                    }}>
                        Quận/Huyện
                    </Text>

                    <TextInput style={{borderColor: 'gray', borderRadius: 5,
                                        borderWidth: 1, margin: 5, padding: 3,
                                        paddingLeft: 10,                                    
                                        }}
                                placeholder = 'Tên quận/huyện'
                                onChangeText={
                                    (text) => {
                                        this.setState({ Huyen: text });
                                    }
                                }
                                value={this.state.Huyen}/>

                    <Text style={{marginLeft: 5, fontSize: 12
                                    }}>
                        Xã/phường
                    </Text>

                    
                    <TextInput style={{borderColor: 'gray', borderRadius: 5,
                                        borderWidth: 1, margin: 5, padding: 3,
                                        paddingLeft: 10,                                    
                                        }}
                                placeholder = 'Tên xã/phường'
                                onChangeText={
                                    (text) => {
                                        this.setState({ Xa: text });
                                    }
                                }
                                value={this.state.Xa}/>

                    <Text style={{marginLeft: 5, fontSize: 12
                                    }}>
                        Địa chỉ
                    </Text>

                    <TextInput style={{borderColor: 'gray', borderRadius: 5,
                                        borderWidth: 1, margin: 5, padding: 3,
                                        paddingLeft: 10, height: 60                                   
                                        }}
                                placeholder = 'Địa chỉ giao hàng'
                                multiline
                                onChangeText={
                                    (text) => {
                                        this.setState({ DiaChiCuThe: text });
                                    }
                                }
                                value={this.state.DiaChiCuThe}/>
                    
                </ScrollView>

                <View style={{ height: 50, flexDirection: 'row'}}>

                    <TouchableOpacity style={{flex: 0.5, margin: 5, borderRadius: 5,
                                                borderColor: 'dodgerblue', borderWidth: 1,
                                                justifyContent: 'center', 
                                                alignItems: 'center'}}
                                    onPress={()=>this.onPressHuy()}>
                        <Text style={{color: 'dodgerblue', fontWeight: 'bold'}}>HUỶ BỎ</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={{flex: 0.5, margin: 5, borderRadius: 5,
                                                backgroundColor: 'dodgerblue', 
                                                justifyContent: 'center', 
                                                alignItems: 'center'}}
                                    onPress={()=>this.onPressCapNhat()}>
                        <Text style={{color: 'white', fontWeight: 'bold'}}>CẬP NHẬT</Text>
                    </TouchableOpacity>
                </View>
            </View>
        );
    }
}