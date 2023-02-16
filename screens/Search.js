import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Image, ScrollView, StyleSheet, Alert } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import Ionicons from 'react-native-vector-icons/Ionicons'
import Feather from 'react-native-vector-icons/Feather'
import Entypo from 'react-native-vector-icons/Entypo';
import axios from 'axios';
import Loader from '../Components/Loader';

export default function Search({navigation}) {
        const [currentTemp, setCurrentTemp] = useState('');
        const [currentWind, setCurrentWind] = useState('');
        const [currentHumidity, setCurrentHumidity] = useState('');
        const [description, setDescription] = useState('');
        const [chancesOfRain, setChanceOfRain] = useState('');
        const [city,setCity] = useState('')
        const [country, setCountry] = useState('');
        const [day, setDay] = useState('');
        const [date, setDate] = useState('');
        const [month, setMonth] = useState('');
        const [icon, setIcon] = useState('');
        const [inputCity,setInputCity] = useState('');
        const [waiting,setWaiting] = useState(false);
        const [visibility,setVisibility] = useState(false)

        const getWeather = () => {
            setWaiting(true)
            const city = 'Lahore';
            const lat = '31.561920';
            const lon = '74.348083'
            const apiKey = 'c2356a5bb8124c69961161330231502'
            axios.get(`https://api.weatherapi.com/v1/forecast.json?key=${apiKey}&q=${inputCity}&days=1&aqi=no&alerts=yes`)
                .then(response => {
                    setCurrentTemp(response.data.current.feelslike_c);
                    setCurrentWind(response.data.current.wind_kph);
                    setDescription(response.data.current.condition.text);
                    setCurrentHumidity(response.data.current.humidity);
                    setCountry(response.data.location.country);
                    setCity(response.data.location.name);
                    const icon = response.data.current.condition.icon;
                    const actualIcon = `https:${icon}`
                    setIcon(actualIcon);
                    setChanceOfRain(response.data.forecast.forecastday[0].day.daily_chance_of_rain)
                    const dateTimeString = response.data.current.last_updated;
                    const date1 = new Date(dateTimeString);
                    const month1 = date1.toLocaleString('en-us', { month: 'long' });
                    const dayOfMonth = date1.toLocaleString('en-us', { day: 'numeric' });
                    const weekdays = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
                    const dayOfWeek = weekdays[date1.getDay()];
                    setDate(dayOfMonth)
                    setDay(dayOfWeek);
                    setMonth(month1);
                    setWaiting(false)
                    setVisibility(true)
    
                })
                .catch(error => {
                    console.log('first')
                    console.log(error);
                    setWaiting(false)
                    setVisibility(false)
                    Alert.alert('Incorrect input','Kindly enter correct name of city');
                });
        }
    


    return (
        <LinearGradient colors={['#220c5e', '#0f2b63', '#04134a']} style={{ flex: 1, }} start={{ x: 0, y: 0 }} >
            <ScrollView style={{ flex: 1, }}>
                <TouchableOpacity
                    onPress={()=>{navigation.navigate('Main')}}
                    style={{ position: 'absolute', top: 50, left: 23, }}
                >
                    <Entypo name='chevron-thin-left' size={25} color='white' />
                </TouchableOpacity>
                <View style={{ flex: 0.2, paddingTop: 100, }}>
                    <View style={{ marginHorizontal: 30, height: 60, flexDirection: 'row', backgroundColor: 'white', borderRadius: 10 }}>
                        <View style={{ flex: 0.85 }}>
                            <TextInput onChangeText={(text)=>{setInputCity(text)}} placeholder='Enter City' style={{ height: 60, paddingLeft: 10, fontSize: 18 }} />
                        </View>
                        <TouchableOpacity onPress={()=>{getWeather()}} style={{ flex: 0.15, justifyContent: 'center', alignItems: 'center' }}>
                            <MaterialCommunityIcons name='target' size={30} />
                        </TouchableOpacity>
                    </View>
                </View>

                {waiting &&<Loader width={200} height={200} loader={require('../assets/images/loaderr.json')} />}
                {visibility==true&&!waiting&&
                <View style={{ flex: 0.6, height: 580}}>
                    <View style={{ flex: 0.15, justifyContent: 'center', alignItems: 'center', marginTop: 50 }}>

                        <View style={{ flex: 0.5, alignItems: 'center', justifyContent: 'center', flexDirection: 'row' }}>
                            <Ionicons name='location-outline' style={{ marginTop: 3 }} size={25} color='white' />
                            <Text style={{ fontSize: 28, color: 'white' }}>{city},{country}</Text>
                        </View>
                        <View style={{ flex: 0.5, justifyContent: 'center', alignItems: 'center', }}>
                            <Text style={styles.text}>{day}, {date} {month}</Text>
                        </View>
                    </View>

                    <View style={{ flex: 0.85, }}>
                        <View style={{ flex: 0.4, marginTop: 20, justifyContent: 'center', alignItems: 'center' }}>
                            {icon==''?
                            <Image source={require('../assets/images/cloud-sun.png')} style={{ width: 220, height: 200 }} />
                            :
                             <Image  source={{uri:icon}} style={{ width: 220, height: 200 }} />
                            }

                            {/* defaultSource={require('../assets/images/cloud-sun.png')} */}
                        </View>

                        <View style={{ flex: 0.2, marginTop: 30, paddingBottom: 10, justifyContent: 'center', alignItems: 'center', borderBottomColor: 'white', borderBottomWidth: 0.8, marginHorizontal: 30 }}>
                            <Text style={{ fontSize: 40, color: 'white', fontWeight: 'bold' }}>{currentTemp}°C</Text>
                            <Text style={{ fontSize: 18, color: 'white' }}>{description}</Text>

                        </View>
                        <View style={{ flex: 0.25, flexDirection: 'row', justifyContent: 'center', marginBottom: 10 }}>
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
                </View>
                }
            </ScrollView>
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
})