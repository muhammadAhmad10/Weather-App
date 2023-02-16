import React, { useState,useEffect } from 'react'
import { View, Text, StatusBar, StyleSheet, TouchableOpacity, TouchableWithoutFeedback, Image, FlatList } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { getCurrentWeather,getTodayWeather,getWeeklyWeather } from '../Components/GettingWeather';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import Entypo from 'react-native-vector-icons/Entypo';
import Feather from 'react-native-vector-icons/Feather';
import Ionicons from 'react-native-vector-icons/Ionicons'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Geolocation from '@react-native-community/geolocation';


export default function Main({navigation,route}) {
    const [currentTemp,currentWind,currentHumidity,description,chancesOfRain,city,country,day,date,month,icon,getWeather] = getCurrentWeather('');
    const [todayTemp,todayWeather] = getTodayWeather('');
    const [weeklyData, weeklyWeather] = getWeeklyWeather('')
    const [today, setToday] = useState(true);
    const [week, setWeek] = useState(false);

    const img = require('../assets/images/cloud-sun.png');
    const data = today==true?todayTemp:weeklyData;
    const icon1= null?img:icon


    useEffect(()=>{
        getWeather()
        todayWeather()

    },[])


    return (
        <LinearGradient colors={['#220c5e', '#0d224a', '#05113d']} style={{ flex: 1, }} start={{ x: 0, y: 0 }} >
            <StatusBar barStyle="dark-content" hidden={false} backgroundColor="transparent" translucent={true} />

            <View style={{ flex: 1 }}>
                <View style={{ flex: 0.15, justifyContent: 'center', alignItems: 'center', marginTop: 50 }}>
                    <TouchableOpacity
                        onPress={()=>{navigation.navigate('Search')}}
                        style={{position:'absolute',top:-10,right: 20,}}
                    >
                        <Ionicons  name='search' size={25} color='white' />
                    </TouchableOpacity>
                    <View style={{ flex: 0.5, alignItems: 'center', justifyContent: 'center',flexDirection:'row' }}>
                        <Ionicons name='location-outline' style={{marginTop:3}} size={25} color='white' />
                        <Text style={{ fontSize: 28, color: 'white' }}>{city},{country}</Text>
                    </View>
                    <View style={{ flex: 0.5, justifyContent: 'center', alignItems: 'center', marginTop: -10 }}>
                        <Text style={styles.text}>{day}, {date} {month}</Text>
                    </View>
                </View>

                <View style={{ flex: 0.55 }}>
                    <View style={{ flex: 0.4, justifyContent: 'center', alignItems: 'center' }}>
                        {icon==''?
                            <Image  source={require('../assets/images/cloud-sun.png')} style={{ width: 220, height: 200 }} />
                        :
                            <Image  source={{uri:icon}} style={{ width: 220, height: 200 }} />
                        }

                        {/* defaultSource={require('../assets/images/cloud-sun.png')} */}
                    </View>

                    <View style={{ flex: 0.3, justifyContent: 'center', alignItems: 'center' ,borderBottomColor:'white',borderBottomWidth:0.3,marginHorizontal:30}}>
                        <Text style={{ fontSize: 40, color: 'white', fontWeight: 'bold' }}>{currentTemp}°C</Text>
                        <Text style={{ fontSize: 18, color: 'white' }}>{description}</Text>

                    </View>
                    <View style={{ flex: 0.3, flexDirection: 'row', justifyContent: 'center', marginBottom:10}}>
                        <View style={styles.factorsView}>
                            <MaterialCommunityIcons name='weather-windy' color='white' size={25} />
                            <Text style={[styles.text, { marginTop: 13 }]}>{currentWind} KM/H</Text>
                            <Text style={styles.text}>Wind</Text>
                        </View>
                        <View style={styles.factorsView}>
                            <Entypo name='drop' color='white' size={25} />
                            <Text style={[styles.text, { marginTop: 13 }]}>{currentHumidity}%</Text>
                            <Text style={styles.text}>Humidity</Text>
                        </View>
                        <View style={styles.factorsView}>
                            <Feather name='cloud-rain' color='white' size={25} />
                            <Text style={[styles.text, { marginTop: 13 }]}>{chancesOfRain}%</Text>
                            <Text style={styles.text}>Chance of rain</Text>
                        </View>
                    </View>

                </View>

                <LinearGradient
                    colors={['#2e1969', '#0f2b63', '#191f85']}
                    style={{ flex: 0.35, marginTop: 10, borderTopLeftRadius: 40, borderTopRightRadius: 40 }} start={{ x: 0, y: 0 }}
                >
                    <View style={{ flex: 1, borderTopLeftRadius: 40, borderTopRightRadius: 40 }}>

                        <View style={{ flex: 0.25, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-around', borderBottomColor: 'white', borderBottomWidth: 0.4, marginHorizontal: 30 }}>
                            <TouchableWithoutFeedback
                                onPress={() => {
                                    setToday(true);
                                    setWeek(false);
                                    todayWeather();
                                }}
                            >
                                <View>
                                    <Text style={[styles.unSelectedText, today ? styles.selectedText : styles.unSelectedText]}>Today</Text>
                                </View>
                            </TouchableWithoutFeedback>
                            <TouchableWithoutFeedback
                                onPress={() => {
                                    setToday(false);
                                    setWeek(true);
                                    weeklyWeather();
                                }}
                            >
                                <View>
                                    <Text style={[styles.unSelectedText, week ? styles.selectedText : styles.unSelectedText]}>Next 7 Days</Text>
                                </View>
                            </TouchableWithoutFeedback>
                        </View>
                        <View style={{ flex: 0.75, }}>

                            <FlatList
                                data={data}
                                horizontal={true}
                                renderItem={({ item }) => (
                                    <LinearGradient
                                        colors={['#2a126b', '#061e4f', '#0b0f59']}
                                        style={{ flex: 0.35, marginLeft: 15, borderRadius: 30, marginVertical: 20 }} start={{ x: 0, y: 0 }}
                                    >
                                        <View style={{flex:1, width: 135, height: 150, borderRadius: 30, }}>
                                            <View style={{ flex: 0.5, justifyContent: 'center', alignItems: 'flex-end', marginRight: 15 }}>
                                                <Image source={{uri:item.icon}} style={{ width: 70, height: 70 }} />
                                            </View>
                                            <View style={{ flex: 0.5 }}>
                                                {week==false?<Text style={styles.text1}>{item.time}</Text>:<Text style={styles.text1}>{item.date}</Text>}
                                                <Text style={[styles.text2]}>{item.temperature}°C</Text>
                                            </View>
                                        </View>
                                    </LinearGradient>
                                )}
                            />
                        </View>

                    </View>
                </LinearGradient>
            </View>
        </LinearGradient>
    )
}


const styles = StyleSheet.create({
    text: {
        fontSize: 14,
        color: 'white',
        marginVertical: 1
    },
    factorsView: {
        flex: 0.3,
        justifyContent: 'flex-end',
        alignItems: 'center',
        marginHorizontal: 3
    },
    text1: {
        fontSize: 14,
        color: 'white',
        marginLeft: 17
    },
    text2: {
        fontSize: 20,
        color: 'white',
        fontWeight: 'bold',
        marginLeft: 21,
        marginTop: 4
    },
    selectedText: {
        color: 'brown',
        fontSize: 16,
        fontWeight: '600',
        marginVertical: 1
    },
    unSelectedText: {
        fontSize: 16,
        color: 'white',
        fontWeight: '600',
        marginVertical: 1
    }

})