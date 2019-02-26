import React from 'react';
import { ScrollView, TouchableOpacity, FlatList, View, Picker, Item, Text, StyleSheet, TextInput, ImageBackground, Image, TouchableHighlight, ListView } from 'react-native';
import { createStackNavigator } from 'react-navigation'; // Version can be specified in package.json
import dismissKeyboard from 'react-native/Libraries/Utilities/dismissKeyboard';
//import { Ionicons } from '@expo/vector-icons'; // Version can be specified in package.json
import { TabNavigator, TabBarBottom } from 'react-navigation'; // Version can be specified in package.json
import { DrawerActions } from 'react-navigation';
import axios from 'axios';

//const axios = require('axios');

class DetailsScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            text:''
        }



    }

    componentDidMount() {
        this.APIcall();
    }

    static navigationOptions = {
            
        headerMode: 'none',
            navigationOptions: {
            headerVisible: false,
        },
    

        tabBarIcon: ({ tintColor }) => (
            <Image
                source={{ uri: 'https://cdn4.iconfinder.com/data/icons/ios7-essence/22/circle_more_detail-512.png' }}
                style={[style.icon, { tintColor: tintColor }]}

            />

        ),
    }

    APIcall() {
        axios({
            method: 'get',
            url: 'https://hihung-mm.mysapo.vn/admin/products.json',
            data: null,
            headers: {
                "X-Sapo-SessionId": "77f71b9c905ea73ddad74e511607321f"
            },
            params: {
                query: this.state.text
            }
        })
            .then(response => {
                const products = response.data.products;
                this.setState({ products });
                console.log(products);
                
            })
            .catch(function (error) {
                console.log(error);
            })
    }

    render() {

       

        return (

            <View style={{flexDirection: 'column',backgroundColor: '#ffffff'}}>
                <View style={{ flexDirection: 'row', backgroundColor: '#FFFFFF',}}>
                    <Text
                        onPress={()=>this.props.navigation.openDrawer()}
                        style={{
                            color: 'blue',
                            fontSize: 25,
                            marginBottom: 15,
                            marginLeft: 5,
                            marginRight: 10,
                        }}
                    >||||</Text>

                    <TextInput
                        autoCapitalize='characters'
                        underlineColorAndroid='transparent'
                        style={{
                            backgroundColor: '#F5F5F5',
                            height: 35,
                            width: 310,
                            fontSize: 15,
                            justifyContent: 'center',
                            borderRadius: 5,
                            color: 'red',
                            paddingBottom: 5,
                            paddingLeft: 130
                        }}
                        placeholder="Tim Kiem"
                        onChangeText={(text) => {
                            this.setState({ text },
                            () => { this.APIcall(); })}
                        }
                    />


                    <Text
                        style={{
                            color: 'blue',
                            fontSize: 35,
                            marginTop: -5,
                            marginLeft: 10,
                        }}
                    >+</Text>

                </View>
                
                    <FlatList
                    contentContainerStyle={{ paddingBottom: 50 }}
                    data={this.state.products}
                        renderItem={({ item }) =>

                            <TouchableOpacity onPress={() => this.props.navigation.navigate('ChiTiet', {
                                images: item.images[0],
                                id: item.id,
                                category: item.category,
                                category_code: item.category_code,
                                category_id: item.category_id,
                                name: item.name,
                                description: item.description,
                                variants: item.variants,
                                products: item,
                             }
                           )}>

                                <View style={{
                                    flexDirection: 'row',
                                    borderBottomColor: 'grey',
                                    borderBottomWidth: 0.25,
                                }}>
                                    <View>
                                        <ImageBackground
                                            source={{ uri: item.images[0].full_path }}
                                            style={{width: 100, height: 100, marginBottom: 7.5,marginLeft: 7.5,marginRight: 7.5,marginTop: 7.5}}/>
                                    </View>
                                    <View style={{
                                        flexDirection: 'column',
                                        marginTop:20
                                    }}>

                                        <View style={{ flexDirection: 'row' }}>
                                            <Text style={{
                                                fontSize:15,
                                                color: '#808080'
                                            }}>Category: </Text>
                                            <Text
                                                style={{
                                                    color: 'black',
                                                    fontSize: 15,
                                                   // marginTop: 2.5
                                                }}
                                            >{item.category}</Text>

                                        </View>

                                        <View style={{ flexDirection: 'row' }}>
                                            <Text style={{color: '#808080'}}>ID: </Text>
                                            <Text style={{color: '#4169E1'}}>{item.id}</Text>
                                        </View>

                                        <View style={{ flexDirection: 'row', marginRight: 5 }}>
                                            <Text style={{color: '#808080'}}>Name: </Text>
                                            <Text style={{marginBottom: 2.5,color: '#808080'}}>{item.name}</Text>
                                        </View>

                                        <View style={{ flexDirection: 'row', marginRight: 5 }}>
                                            <Text style={{ color: '#808080' }}>{item.variants.length} </Text>
                                            <Text style={{ marginBottom: 2.5, color: '#808080' }}>phien ban</Text>
                                        </View>
                                    </View>
                                </View> 
                            </TouchableOpacity>
                            }
                    />
                    
                
            </View>
        );
    }
}

export default DetailsScreen;

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

/*
  <ListView
                        dataSource={this.state.dataSource}
                        renderRow={this.renderList}
                    />
                    */