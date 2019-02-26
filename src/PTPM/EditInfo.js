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


export default class ChiTiet extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name:null,
            price:null,
            amount:null,
            NSX:null,
            guarantee:null,
            description:null


        }
        this.itemRef = database;
    }
    update(){
        let uid=firebaseApp.auth().currentUser.uid
        const id=this.props.navigation.getParam('key','');
        firebaseApp.database().ref('/Product/'+uid).child(id).update({
           TenSP:this.state.name,
           Gia:this.state.price,
           SoLuong:this.state.amount,
           NSX:this.state.NSX,
           BaoHanh:this.state.guarantee,
           MoTa: this.state.description
        }).then((response)=>{
            Alert.alert(
                'Thông báo',
                'Cập nhật thông tin thành công!',
                [

                    { text: 'OK', onPress: () => this.props.navigation.navigate('EditInfo') },
                ],
                { cancelable: false } //day la gi
            )
            //
            ;
            // this.props.navigation.navigate('UserInfoOrder')

        }).catch(error=>console.log(error))

    }
    static navigationOptions = ({ navigation }) => {
        return {
            header: null
        }
    }

    changeName(value){
        this.setState({
            name:value
        })
    }
    changePrice(value){
        this.setState({
            price:value
        })
    }
    changeAmount(value){
        this.setState({
            amount:value
        })
    }
    changeNSX(value){
        this.setState({
            NSX:value
        })
    }
    changeGuarantee(value){
        this.setState({
            guarantee:value
        })
    }
    changeDesciption(value){
        this.setState({
            description:value
        })
    }
    render() {
        //const images = this.props.navigation.getParam('link', 'NO');
        const name=this.props.navigation.getParam('TenSP',"");
        const price=this.props.navigation.getParam('Gia',"");
        const typeOfProduct=this.props.navigation.getParam('LoaiSP',"");
        const amount=this.props.navigation.getParam('SoLuong','');
        const NSX=this.props.navigation.getParam('NSX','');
        const guarantee=this.props.navigation.getParam('BaoHanh','');
        const trademark =this.props.navigation.getParam('ThuongHieu','');
        const seller=this.props.navigation.getParam('TenShop','');
        const email=this.props.navigation.getParam('Email','');
        const link=this.props.navigation.getParam('Link','');
        const link1=this.props.navigation.getParam('Link1','');
        const link2=this.props.navigation.getParam('Link2','');
        const link3=this.props.navigation.getParam('Link3','');
        const description=this.props.navigation.getParam('MoTa','')



        return (
            <View style={{ flex: 1 }}>
                <View style={{ flex: 1 / 11, backgroundColor: '#55acee' }}>
                    <View style={{ flexDirection: 'row', flex: 1, marginTop: 5, justifyContent: 'center', alignItems: 'center' }}>
                        <View style={{ flex: 1 / 8, justifyContent: 'center', alignItems: 'center', }}>
                            <TouchableOpacity onPress={() => this.props.navigation.pop()}>
                                <Image source={{ uri: "https://png.icons8.com/ios/2x/left.png" }} style={{ margin: 5, width: 25, height: 25 }} />
                            </TouchableOpacity>
                        </View>


                        <View style={{ flex: 6 / 8,  justifyContent: 'center', alignItems: 'center' }}>
                            <Text style={{ fontSize: 18, color: 'white', height: 30 }}>{name}</Text>
                        </View>

                        <View style={{ flex: 1 / 8, justifyContent: 'center', alignItems: 'center', }}>
                            <TouchableOpacity onPress={() => this.props.navigation.navigate('Basket')}>
                                <Image source={{ uri: "https://png.icons8.com/android/2x/shopping-cart.png" }} style={{ width: 20, height: 20 }} />
                            </TouchableOpacity>
                        </View>
                    </View>

                </View>

                <View style={{ flex: 9 / 11, justifyContent: 'center', alignItems: 'center' }}>
                    <ScrollView style={{ width, height }} >
                        <View style={{ height: height / 3, marginTop: 5, marginBottom: 5 }}>
                            <ScrollView horizontal={true}>
                                <Image style={{ width: width / 2, height: height / 3, marginLeft: 5 }} source={{ uri: link1}} />
                                <Image style={{ width: width / 2, height: height / 3, marginLeft: 5 }} source={{ uri: link2}} />
                                <Image style={{ width: width / 2, height: height / 3, marginLeft: 5 }} source={{ uri: link3 }} />
                                <Image style={{ width: width / 2, height: height / 3, marginLeft: 5 }} source={{ uri: link}} />
                            </ScrollView>
                        </View>

                        <View style={{ backgroundColor: 'white', height: 75, margin: 5, flexDirection: 'column' }}>
                            <TouchableOpacity onPress={() => { [this.props.navigation.navigate('BanHang', { search: this.state.idNguoiBan, TenShop: this.state.TenShop })] }}>

                                <View style={{ flexDirection: 'row' }}>
                                    <View style={{ width: 80, height: 80, justifyContent: 'center', alignItems: 'center' }}>
                                        <Image source={{ uri: this.state.AvataNguoiBan }} style={{ margin: 5, width: 40, height: 40, borderRadius: 13 }} />
                                    </View>
                                    <View style={{ flexDirection: 'column', margin: 5 }}>
                                        <Text style={{ color: '#363636', fontSize: 15, marginTop: 5, marginLeft: 5 }}>{seller}</Text>
                                        <Text style={{ color: '#363636', fontSize: 13, marginTop: 5, marginLeft: 5 }}> ( {email} ) </Text>
                                    </View>

                                </View>
                            </TouchableOpacity>
                        </View>
                        <View style={{ height: 35 }}>
                            <Text style={{ color: 'black', fontSize: 18, fontWeight: 'cover', marginTop: 5, marginLeft: 5 }}> THÔNG TIN SẢN PHẨM</Text>
                        </View>

                        <View style={{ backgroundColor: 'white', margin: 5 }}>
                            <View style={{ height: 35, flexDirection: 'row', borderTopColor: 'grey', borderTopWidth: 1, borderLeftColor: 'grey', borderLeftWidth: 1, borderRightColor: 'grey', borderRightWidth: 1, borderBottomColor: 'grey', borderBottomWidth: 1, marginLeft: 5, marginTop: 5, marginRight:5 }} >
                                <View style={{ flex: 2 / 5, backgroundColor: '#f5f5f5' }}>
                                    <Text style={{ color: 'black', fontSize: 13, marginTop: 5, marginLeft: 5 }}>Tên sản phẩm</Text>
                                </View>

                                <View style={{ flex: 3 / 5, borderLeftColor: 'grey', borderLeftWidth: 1, flexDirection: 'column' }}>
                                    <TextInput numberOfLines={1} style={{ flex: 1, color: '#363636', fontSize: 13, marginTop: 5, marginLeft: 5 , paddingTop:0}} defaultValue={name}
                                               onChangeText={(value)=>{this.changeName(value)}} value={this.state.name}/>
                                </View>
                            </View>

                            <View style={{ borderLeftColor: 'grey', borderLeftWidth: 1, borderRightColor: 'grey', borderRightWidth: 1, borderBottomColor: 'grey', borderBottomWidth: 1, marginLeft: 5, marginRight: 5, height: 35, flexDirection: 'row' }} >
                                <View style={{ flex: 2 / 5, backgroundColor: '#f5f5f5' }}>
                                    <Text style={{ color: 'black', fontSize: 13, marginTop: 5, marginLeft: 5 }}>Giá sản phẩm</Text>
                                </View>

                                <View style={{ flex: 3 / 5, borderLeftColor: 'grey', borderLeftWidth: 1, flexDirection: 'column' }}>
                                    <TextInput numberOfLines={1} style={{ flex: 1, color: '#363636', fontSize: 13, marginTop: 5, marginLeft: 5, paddingTop:0 }} defaultValue={price}
                                               onChangeText={(value)=>{this.changePrice(value)}} value={this.state.price}/>
                                </View>
                            </View>

                            <View style={{ borderLeftColor: 'grey', borderLeftWidth: 1, borderRightColor: 'grey', borderRightWidth: 1, borderBottomColor: 'grey', borderBottomWidth: 1, marginLeft: 5, marginRight: 5 ,height: 35, flexDirection: 'row' }} >
                                <View style={{ flex: 2 / 5, backgroundColor: '#f5f5f5' }}>
                                    <Text style={{ color: 'black', fontSize: 13, marginTop: 5, marginLeft: 5 }}>Loại sản phẩm</Text>
                                </View>

                                <View style={{ flex: 3 / 5, borderLeftColor: 'grey', borderLeftWidth: 1, flexDirection: 'column' }}>
                                    <Text numberOfLines={1} style={{ flex: 1, color: '#363636', fontSize: 13, marginTop: 5, marginLeft: 5, paddingTop:0 }}>{typeOfProduct}</Text>
                                </View>
                            </View>

                            <View style={{ height: 35, flexDirection: 'row', borderLeftColor: 'grey', borderLeftWidth: 1, borderRightColor: 'grey', borderRightWidth: 1, borderBottomColor: 'grey', borderBottomWidth: 1, marginLeft: 5, marginRight: 5 }} >
                                <View style={{ flex: 2 / 5, backgroundColor: '#f5f5f5' }}>
                                    <Text style={{ color: 'black', fontSize: 13, marginTop: 5, marginLeft: 5 }}>Số lượng</Text>
                                </View>

                                <View style={{ flex: 3 / 5, borderLeftColor: 'grey', borderLeftWidth: 1, flexDirection: 'column' }}>
                                    <TextInput numberOfLines={1} style={{ flex: 1, color: '#363636', fontSize: 13, marginTop: 5, marginLeft: 5, paddingTop:0 }} defaultValue={amount}
                                               onChangeText={(value)=>{this.changeAmount(value)}} value={this.state.amount}/>
                                </View>
                            </View>

                            <View style={{ height: 35, flexDirection: 'row', borderLeftColor: 'grey', borderLeftWidth: 1, borderRightColor: 'grey', borderRightWidth: 1, borderBottomColor: 'grey', borderBottomWidth: 1, marginLeft: 5, marginRight: 5 }} >
                                <View style={{ flex: 2 / 5, backgroundColor: '#f5f5f5' }}>
                                    <Text style={{ color: 'black', fontSize: 13, marginTop: 5, marginLeft: 5 }}>NSX</Text>
                                </View>

                                <View style={{ flex: 3 / 5, borderLeftColor: 'grey', borderLeftWidth: 1, flexDirection: 'column' }}>
                                    <TextInput numberOfLines={1} style={{ flex: 1, color: '#363636', fontSize: 13, marginTop: 5, marginLeft: 5, paddingTop:0 }} defaultValue={NSX}
                                               onChangeText={(value)=>{this.changeNSX(value)}} value={this.state.NSX}/>
                                </View>
                            </View>

                            <View style={{ borderLeftColor: 'grey', borderLeftWidth: 1, borderRightColor: 'grey', borderRightWidth: 1, borderBottomColor: 'grey', borderBottomWidth: 1, marginLeft: 5, marginRight: 5, height: 35, flexDirection: 'row'}} >
                                <View style={{ flex: 2 / 5, backgroundColor: '#f5f5f5' }}>
                                    <Text style={{ color: 'black', fontSize: 13, marginTop: 5, marginLeft: 5 }}>Bảo hành</Text>
                                </View>

                                <View style={{ flex: 3 / 5, borderLeftColor: 'grey', borderLeftWidth: 1, flexDirection: 'column' }}>
                                    <TextInput numberOfLines={1} style={{ flex: 1, color: '#363636', fontSize: 13, marginTop: 5, marginLeft: 5, paddingTop:0  }} defaultValue={guarantee}
                                               onChangeText={(value)=>{this.changeGuarantee(value)}} value={this.state.guarantee}/>
                                </View>
                            </View>

                            <View style={{ marginBottom: 5, height: 35, flexDirection: 'row', borderLeftColor: 'grey', borderLeftWidth: 1, borderRightColor: 'grey', borderRightWidth: 1, borderBottomColor: 'grey', borderBottomWidth: 1, marginLeft: 5, marginRight: 5 }} >
                                <View style={{ flex: 2 / 5, backgroundColor: '#f5f5f5' }}>
                                    <Text style={{ color: 'black', fontSize: 13, marginTop: 5, marginLeft: 5 }}>Thương hiệu</Text>
                                </View>

                                <View style={{ flex: 3 / 5, borderLeftColor: 'grey', borderLeftWidth: 1, flexDirection: 'column' }}>
                                    <Text numberOfLines={1} style={{ flex: 1, color: '#363636', fontSize: 13, marginTop: 5, marginLeft: 5, paddingTop:0 }}>{trademark}</Text>
                                </View>
                            </View>
                            <View style={{ margin: 5 }}>
                                <TextInput style={{ backgroundColor:'silver', fontSize: 13,color:'black' }} defaultValue={{description}} placeholder={"Mô tả sản phẩm"} multiline={true}  onChangeText={(value)=>{this.changeDesciption(value)}} value={this.state.description}/>
                            </View>
                        </View>



                    </ScrollView>

                </View>
                <View style={{flex:1/11}}>
                    <TouchableOpacity style={{flex:1,backgroundColor:'red'}} onPress={()=>{this.update()}}>
                        <View style={{flex:1,alignItems:'center',justifyContent:'center'}}>
                            <Text style={{fontSize:18,color:'white'}}>CẬP NHẬT</Text>
                        </View>
                    </TouchableOpacity>
                </View>
            </View>

        )
    }

}