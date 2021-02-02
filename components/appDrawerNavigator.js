import * as React from "react";
import { createDrawerNavigator } from "react-navigation-drawer";
import { AppTabNavigator } from "./appTabNavigator";
import CustomSideBarMenu from "./customSideBarMenu";
import SettingScreen from "../screens/settingScreen";
import MyDonations from "../screens/myDonations";
import NotificationScreen from '../screens/notificationScreen';
import MyReceivedBookScreen from '../screens/myReceivedBooksScreen';

export const AppDrawerNavigator = createDrawerNavigator(
  {
    Home: { screen: AppTabNavigator },
    MyDonations: { screen: MyDonations },
    Notifications:{screen:NotificationScreen},
    MyReceivedBooks:{screen:MyReceivedBookScreen},
    Settings: { screen: SettingScreen },
    
  },
  {
    contentComponent: CustomSideBarMenu,
  },
  {
    initialRouteName: "Home",
  }
);
