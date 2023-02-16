import React from 'react';
import {View, Text} from 'react-native';

export default function Search({navigation}){
    return(
        <View style={{flex:1,backgroundColor:'slateblue',justifyContent:'center',alignItems:'center'}}>
            <Text style={{fontSize:24,color:'white'}}>Search Screen</Text>
        </View>
    )
}