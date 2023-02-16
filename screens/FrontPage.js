import React, { useState } from 'react'
import { View, Text, StatusBar, TouchableOpacity, Image } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { getCurrentWeather } from '../Components/GettingWeather';

export default function FrontPage({navigation}) {
    const [data, getWeather] = getCurrentWeather('')


    return (
        <LinearGradient colors={['#220c5e', '#0f2b63', '#04134a']} style={{ flex: 1, alignItems: 'center' }} start={{ x: 0, y: 0 }} >
            <View style={{ flex: 1, }}>
                <StatusBar barStyle="dark-content" hidden={false} backgroundColor="transparent" translucent={true} />

                <View style={{ flex: 0.55, justifyContent: 'center', alignItems: 'center' }}>
                    <Image source={require('../assets/images/cloud-sun.png')} style={{ width: 240, height: 160, marginTop: 90 }} />
                </View>
                <View style={{ flex: 0.45, justifyContent: 'center', alignItems: 'center' }}>
                    <Text style={{ fontSize: 30, textAlign: 'center', color: 'white', fontWeight: 'bold', marginHorizontal: 30 }}>Explore To Get Weather Updates</Text>
                    <Text style={{ fontSize: 16, color: 'lightgrey', textAlign: 'center', marginHorizontal: 40, marginVertical: 10 }}>Checkout the weather in your area so you can make your plans accordingly.</Text>
                    <LinearGradient colors={['#4c669f', '#0f2b63',]} style={{ width: 220, height: 70, borderRadius: 20, marginTop: 40, alignItems: 'center' }} start={{ x: 0, y: 0 }}>
                        <TouchableOpacity onPress={()=>{navigation.navigate('Main') }} style={{ width: '100%', height: '100%', padding: 20, borderRadius: 20, justifyContent: 'center', alignItems: 'center', }}>
                            <Text style={{ fontSize: 24, color: 'white', fontWeight: 'bold' }}>Get started</Text>
                        </TouchableOpacity>
                    </LinearGradient>
                </View>
            </View>
        </LinearGradient>
    )
}