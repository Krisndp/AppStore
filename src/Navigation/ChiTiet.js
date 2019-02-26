import React, { Component } from 'react';
import { View, Image, Text, StyleSheet, ImageBackground, TouchableHighlight, ScrollView, FlatList } from 'react-native';
import axios from 'axios';


class ChiTiet extends Component {

    constructor(props) {
        super(props);
        this.state = {
            variants: []
        }



    }
  
    static navigationOptions = {
        title: 'Chi Tiêt Sản Phẩm ',
        headerStyle: {
            flexDirection: 'column',
            alighItem: 'center',
            backgroundColor: '#F5F5F5',
        },
        headerTintColor: 'black',
        headerTitleStyle: {
            flexDirection: 'column',
            alighItem: 'center',
            fontWeight: 'bold',
        },
        headerRight: (
            <Text style={{ color: 'blue', fontSize: 40, paddingBottom: 20, marginRight: 10 }}>...</Text>
        ),
    }

    componentDidMount() {
        const variants = this.props.navigation.getParam('variants', 'No-name');
        this.setState({ variants }); 
    }
    APIcall() {

        axios({
            method: 'post',
            url: 'https://hihung-mm.mysapo.vn/admin/products.json',
            data: {
                name: 'Fred',
                lastName: 'Flintstone'
            }
        });
           
    }
    

    render() {
       // const Author = this.props.navigation.getParam('Author', 'No-name');
        //const images = this.props.navigation.getParam('images', 'NO');
        //const id = this.props.navigation.getParam('id', 'No-name');
       //    const category = this.props.navigation.getParam('category', 'No-name');
      //  const category_code = this.props.navigation.getParam('category_code', 'No-name');
      //  const category_id = this.props.navigation.getParam('category_id', 'No-name');
     //   const name = this.props.navigation.getParam('name', 'No-name');
     //   const description = this.props.navigation.getParam('description', 'No-name');
        
        //  const variants = this.props.navigation.getParam('variants');
        //this.setState({ products });

        return (

            <View style={{ flex: 1, backgroundColor: '#F5F5F5', flexDirection: 'column' }}>
                <View style={{ height: 40 }}>
                    <Text style={{ color: 'black', fontSize: 15, fontWeight: 'cover', marginTop: 10, marginLeft: 5 }}> THONG TIN </Text>
                </View>

                <View style={{ height: 40, backgroundColor: 'white', flexDirection: 'row', borderBottomColor: 'grey', borderBottomWidth: 0.4 }} >
                    <View style={{ flex: 1 }}>
                        <Text style={{ color: 'black', fontSize: 15, fontWeight: 'cover', marginTop: 5, marginLeft: 5 }}>Ten san pham</Text>
                    </View>
                    <View style={{ flex: 1, flexDirection: 'column', alignItems: 'flex-end' }}>
                        <Text style={{ color: 'black', fontSize: 15, fontWeight: 'cover', marginTop: 5, marginRight: 5 }}>{this.props.navigation.getParam('category', 'No-name')}</Text>
                    </View>
                </View>
                <View style={{ height: 40, backgroundColor: 'white', flexDirection: 'row', borderBottomColor: 'grey', borderBottomWidth:0.4 }} >
                    <View style={{ flex: 1 }} >
                        <Text style={{ color: 'black', fontSize: 15, fontWeight: 'cover', marginTop: 5, marginLeft: 5 }}>Loai:</Text>
                    </View>
                    <View style={{ flex: 1, flexDirection: 'column', alignItems: 'flex-end' }}>
                        <Text style={{ color: 'black', fontSize: 15, fontWeight: 'cover', marginTop: 5, marginRight: 5}}></Text>
                    </View>
                </View>
                <View style={{ height: 40, backgroundColor: 'white', flexDirection: 'row', borderBottomColor: 'grey', borderBottomWidth: 0.4 }} >
                    <View style={{ flex: 1 }} >
                        <Text style={{ color: 'black', fontSize: 15, fontWeight: 'cover', marginTop: 5, marginLeft: 5 }}>Nhan Hieu:</Text>
                    </View>
                    <View style={{ flex: 1, flexDirection: 'column', alignItems: 'flex-end' }}>
                        <Text style={{ color: 'black', fontSize: 15, fontWeight: 'cover', marginTop: 5, marginRight: 5 }}></Text>
                    </View>
                </View>
                <View style={{ height: 40, backgroundColor: 'white', flexDirection: 'row', borderBottomColor: 'grey', borderBottomWidth: 0.4 }} >
                    <View style={{ flex: 1 }} >
                        <Text style={{ color: 'black', fontSize: 15, fontWeight: 'cover', marginTop: 5, marginLeft: 5 }}>The:</Text>
                    </View>
                    <View style={{ flex: 1, flexDirection: 'column', alignItems: 'flex-end' }}>
                        <Text style={{ color: 'black', fontSize: 15, fontWeight: 'cover', marginTop: 5, marginRight: 5 }}></Text>
                    </View>
                </View>
                <View style={{ height: 40, backgroundColor: 'white', flexDirection: 'row', borderBottomColor: 'grey', borderBottomWidth: 0.4 }} >
                    <View style={{ flex: 1 }} >
                        <Text style={{ color: 'black', fontSize: 15, fontWeight: 'cover', marginTop: 5, marginLeft: 5 }}>Trang Thai:</Text>
                    </View>
                    <View style={{ flex: 1, flexDirection: 'column', alignItems: 'flex-end' }}>
                        <Text style={{ color: 'black', fontSize: 15, fontWeight: 'cover', marginTop: 5, marginRight: 5 }}></Text>
                    </View>
                </View>
                <View style={{ height: 40 }}>
                    <Text style={{ color: 'black', fontSize: 15, fontWeight: 'cover', marginTop: 10 }}> PHIEN BAN SAN PHAM </Text>
                </View>
                <View style={{ flexDirection: 'row', height: 60, backgroundColor:'white' }}>
                    <View style={{ flex: 1, borderColor: 'red' }}>
                        <TouchableHighlight style={{ alignItems: 'center', borderRadius: 5, height: 40, justifyContent: 'center', marginTop: 5, marginLeft:5, marginRight: 5, marginBottom: 5, borderColor:'#6495ED', borderWidth:0.5}}>
                            <Text
                                style={{ color: '#6495ED', fontSize: 15 }}
                                //onPress={() => this.props.navigation.push('Home')}
                                onPress={() =>  this.APIcall() }
                            >
                                Thêm phiên bản 
                            </Text>
                        </TouchableHighlight>
                    </View> 
                    <View style={{ flex: 1 }}>
                        <TouchableHighlight style={{ alignItems: 'center', borderRadius: 5, height: 40, justifyContent: 'center', marginTop: 5, marginleft: 5, marginRight: 5, marginBottom: 5, borderColor: '#6495ED', borderWidth: 0.5}}>
                            <Text
                                style={{ color: '#6495ED', fontSize: 15 }}
                            //onPress={() => this.props.navigation.push('Home')}
                            >
                                Thêm combo
                            </Text>
                        </TouchableHighlight>
                    </View>
                </View>
                <FlatList
                    contentContainerStyle={{ paddingBottom: 50 }}
                    data={this.state.variants}
                    keyExtractor={item => `${item.id}`}
                    renderItem={({ item }) =>
                        <View style={{ marginTop: 5, backgroundColor: 'white', flexDirection: 'row' }}>
                            <View style={{ flex: 1 / 6 }}>
                               
                                <ImageBackground
                                    source={{ uri: "" }}
                                    style={{
                                        width: 50,
                                        height: 50,
                                        marginBottom: 5,
                                        marginLeft: 5,
                                        marginRight: 5,
                                        marginTop: 5
                                    }}
                                />
                               
                            </View>
                            <View style={{ flexDirection: 'column', flex: 3 / 6, marginTop: 5 }}>
                                <Text style={{ fontSize: 15, color: 'black' }}>{item.id} </Text>
                                <Text style={{ color: '#808080', fontSize: 15, }}>{item.name}</Text>
                            </View>
                            <View style={{ flexDirection: 'column', alignItems: 'flex-end', flex: 2 / 6, marginRight: 5, marginTop: 5 }}>
                                <Text style={{ fontSize: 15, color: 'black' }}> {item.id}</Text>
                            </View>
                        </View> }/>
                </View>
        );
	}
};

export default ChiTiet;
