import React, { Component } from 'react';
import { View, Text, FlatList, Image, TouchableOpacity, TextInput } from 'react-native';
import { firebaseApp } from './firebase';

export default class UserInfoOrder extends Component {
    constructor() {
        super();
        this.state = {
            data: null
        }
    }
    componentDidMount() {
        this.setState({
            uid: null
        })

        // var uid=firebaseApp.auth().currentUser.uid;
        //console.log(uid)
        this.listenForItem();

    }
    listenForItem() {
        // console.log(uid)
        var uid = firebaseApp.auth().currentUser.uid;
        firebaseApp.database().ref('/ThongBao/' + uid).once('value').then((snapshot) => {
            this.setState({
                stores: snapshot.val()
            })
            console.warn(this.state.stores)
            let items = [];
            snapshot.forEach((child) => {
                //console.warn(child);
                items.push({
                    id: child.key,
                    name: child.val().DiaChi.HoTen,
                    date: child.val().Ngay
                });
            }
            )

            this.setState({
                data: items
            })
            console.log(this.state.data)
        })
    }

    render() {
        return (
            <View style={{ flex: 1, backgroundColor: 'silver' }}>
                <FlatList
                    data={this.state.data}
                    renderItem={({ item, index }) => {
                        return (
                            <FlatListItem item={item} index={index} change={
                                () => {
                                    this.props.navigation.navigate('Detail', item.id);
                                }}>
                            </FlatListItem>
                        );

                    }} />

            </View>
        );
    }
}
class FlatListItem extends Component {
    componentDidMount() {
        console.log(this.props.item)
    }
    render() {
        return (
            <View style={{ flex: 1, marginTop: 10 }}>
                <TouchableOpacity
                    onPress={() => { this.props.change() }}
                    style={{
                        height: 90,
                        backgroundColor: 'white',
                        marginRight: 5, marginLeft: 5, marginBottom: 5, padding: 5,
                        borderRadius: 5
                    }}>

                    <View style={{ flexDirection: 'row', flex: 1, }}>

                        <View style={{ flex: 1, justifyContent: 'center' }}>

                            <Text style={{ marginLeft: 5, fontWeight: 'bold' }}>
                                Mã đơn hàng:{this.props.item.id}
                            </Text>
                            <Text style={{ marginLeft: 5 }}>{this.props.item.name} đã mua hàng của bạn</Text>
                            <Text style={{ marginLeft: 5 }}>Ngày mua: {this.props.item.date}</Text>


                        </View>

                        <View style={{
                            flex: 0.1, justifyContent: 'center',
                            alignItems: 'flex-end', marginRight: 5
                        }}>
                            <Image style={{ height: 20, width: 20 }}
                                source={{ uri: "https://img.icons8.com/ios/2x/forward-filled.png" }}></Image>
                        </View>
                    </View>

                </TouchableOpacity>
            </View>
        );

    }
}
