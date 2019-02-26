import React from 'react';
import { View, Text, Button } from 'react-native';

export default class DrawerScreen extends React.Component {

  render() {
    return (
      <View>
        <Text>
          I am here !
        </Text>

        <Button 
          title='Hello Bro !'
        />

        <View style={{ height: 100, backgroundColor: 'red' }}>
        </View>
      </View>
    );
  }
}