import Lottie from 'lottie-react-native';
import { View, Dimensions } from 'react-native';
export default Loader = (props) => {
    return(
        <View style = {{flex: 1, justifyContent: 'center', height: Dimensions.get('window').height, alignItems: 'center',justifyContent:'flex-start',marginTop:200}}>
        <View style={{width: props.width, height: props.height}}>
            <Lottie source={props.loader} autoPlay loop />
            {/* <Lottie source={require('./assets/loader.json')} autoPlay loop /> */}
          </View>
          </View>
    )
}