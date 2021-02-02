import * as React from "react";
import {createStackNavigator} from 'react-navigation-stack';
import DonateScreen from '../screens/bookDonateScreen';
import ReceiverDetailScreen from '../screens/receiverDetailScreen';

export const AppStackNavigator =createStackNavigator({
    DonateBooks:{
        screen:DonateScreen,
        navigationOptions:{
            headerShown:false
        }
    },
    ReceiverDetail:{
        screen:ReceiverDetailScreen,
        navigationOptions:{
            headerShown:false
        }
    },
},
{
    initialRouteName:"DonateBooks"
}
)