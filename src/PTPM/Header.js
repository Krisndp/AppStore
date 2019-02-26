import React, { Component } from 'react';
import { TouchableOpacity, Text, View, Image, Dimensions } from 'react-native';
const { width, height } = Dimensions.get('window');

export default class Header extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <View style={{
                backgroundColor: 'dodgerblue',
                height: height/11 , flexDirection: 'row',
            }}>

                <TouchableOpacity style={{ flex: 0.1, justifyContent: 'center', alignItems:'center' }}
                    onPress={
                        this.props.navigate
                    }>
                    <Image style={{ height: 30, width: 30, marginLeft: 5, marginTop: 5, marginTop:10 }}
                        source={{ uri:"https://png.icons8.com/ios/2x/left.png"}}>

                    </Image>
                </TouchableOpacity>


                <View style={{ flex: 0.9, alignItems: 'center', justifyContent: 'center' }}>
                    <Text style={{
                        fontSize: 16, color: 'white',
                        
                    }}>
                        {this.props.TenMH}
                </Text>
                </View>
            </View>
        );
    }
}