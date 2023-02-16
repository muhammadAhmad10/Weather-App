import React from 'react'
import { useState, useEffect } from 'react'
import axios from 'axios'

export const getCurrentWeather = (initialValue) => {
    const [currentTemp, setCurrentTemp] = useState(initialValue);
    const [currentWind, setCurrentWind] = useState(initialValue);
    const [currentHumidity, setCurrentHumidity] = useState(initialValue);
    const [description, setDescription] = useState(initialValue);
    const [chancesOfRain, setChanceOfRain] = useState(initialValue);
    const [city,setCity] = useState(initialValue)
    const [country, setCountry] = useState(initialValue);
    const [day, setDay] = useState(initialValue);
    const [date, setDate] = useState(initialValue);
    const [month, setMonth] = useState(initialValue);
    const [icon, setIcon] = useState(initialValue);
    const getWeather = () => {
        const city = 'Lahore';
        const lat = '31.561920';
        const lon = '74.348083'
        const apiKey = 'c2356a5bb8124c69961161330231502'
        axios.get(`https://api.weatherapi.com/v1/forecast.json?key=${apiKey}&q=${lat},${lon}&days=1&aqi=no&alerts=yes`)
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
                setMonth(month1)


            })
            .catch(error => {
                console.log('first')
                console.log(error);
            });
    }
    return [currentTemp, currentWind, currentHumidity, description, chancesOfRain,city, country, day, date, month, icon, getWeather];
}


export const getTodayWeather = (initialValue) => {
    const [todayTemp, setTodayTemp] = useState([]);

    const todayWeather = () => {
        const lat = '31.561920';
        const lon = '74.348083'
        const apiKey = 'c2356a5bb8124c69961161330231502'
        axios.get(`https://api.weatherapi.com/v1/forecast.json?key=${apiKey}&q=${lat},${lon}&hours=24&aqi=no&alerts=no`)
            .then(response => {
                const hourlyData = response.data.forecast.forecastday[0].hour;
                const currentTime = new Date();
                const arr = [];
                hourlyData.forEach((hour) => {
                    const time = new Date(hour.time);
                    const icon = hour.condition.icon;
                    const temperature = hour.temp_c;
                    const actualIcon = `https:${icon}`;
                    if (time > currentTime && time <= new Date(currentTime.getTime() + 7 * 60 * 60 * 1000)) {
                        const time1 = time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: true });
                        arr.push({ time: time1, temperature: temperature, icon: actualIcon });
                    }
                });
                setTodayTemp(arr)
            })
            .catch(error => {
                console.log('first')
                console.log(error);
            });
    }
    return [todayTemp, todayWeather];
}

export const getWeeklyWeather = (initialValue) => {
    const [weeklyData,setWeeklyData] = useState(initialValue)
    const weeklyWeather = () => {
        const lat = '31.561920';
        const lon = '74.348083'
        const apiKey = 'c2356a5bb8124c69961161330231502';
        axios.get(`https://api.weatherapi.com/v1/forecast.json?key=${apiKey}&q=${lat},${lon}&days=7&aqi=no&alerts=no`)
            .then(response => {
                const forecastData = response.data.forecast.forecastday;
                const arr = [];
                forecastData.forEach((forecast) => {
                    const date = forecast.date;
                    const icon = forecast.day.condition.icon;
                    const temperature = forecast.day.avgtemp_c;
                    const actualIcon = `https:${icon}`

                    arr.push({date:date,icon:actualIcon,temperature:temperature});
                });
                setWeeklyData(arr)
            })
            .catch(error => {
                console.log('first')
                console.log(error);
            });
            
    }
    return [weeklyData,weeklyWeather]
}


//api to get the weather by city name
//https://api.openweathermap.org/data/2.5/weather?q=New York&appid=02fc3d913852a81a0e90571751377cde

//api to get the weather by lat and long
//https://api.openweathermap.org/data/2.5/weather?lat=40.7128&lon=-74.0060&exclude=minutely,hourly,daily,alerts&appid={}

//api to get the weather of next 7 days
//https://api.openweathermap.org/data/2.5/onecall?lat=40.7128&lon=-74.0060&exclude=current,minutely,hourly,alerts&appid={API key}


//api to get weather of next days
//https://api.open-meteo.com/v1/forecast?latitude=52.52&longitude=13.41&future_days=10&hourly=temperature_2m,relativehumidity_2m,windspeed_10m

//api to get current days weather --all hours
//https://api.open-meteo.com/v1/forecast?latitude=52.52&longitude=13.41&current_weather=true&hourly=temperature_2m,relativehumidity_2m,windspeed_10m