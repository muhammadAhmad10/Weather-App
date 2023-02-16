import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack';
import FrontPage from './screens/FrontPage';
import Main from './screens/Main';
import Search from './screens/Search';
import LinearGradient from 'react-native-linear-gradient';


export default function App() {
    const Stack = createStackNavigator();
    return (
        

        <NavigationContainer>
            <LinearGradient 
            colors={['#220c5e', '#0f2b63', 'red']} 
            style={{ flex: 1, }} start={{ x: 0, y: 0 }} 
        >
            <Stack.Navigator
                
                screenOptions={{headerBackgroundContainerStyle:{backgroundColor:'transparent'}}}
            >
                <Stack.Screen name='FrontPage' component={FrontPage} options={{headerShown:false}} />
                <Stack.Screen name='Main' component={Main}  options={{headerShown:false}} />
                <Stack.Screen name='Search' component={Search}  options={{headerShown:false}} />
            </Stack.Navigator>
            </LinearGradient>

        </NavigationContainer>
    )
}