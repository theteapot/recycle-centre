import React from "react";
import { colors } from "../styles";
import { createAppContainer } from "react-navigation";
import { createBottomTabNavigator } from "react-navigation-tabs";
import RecycleScreen from "../tabs/recycle";
import ShopScreen from "../tabs/shop";
import HistoryScreen from "../tabs/history";
import Ionicons from "react-native-vector-icons/Ionicons";

// https://github.com/oblador/react-native-vector-icons

const TabNavigator = createBottomTabNavigator(
  {
    Recycle: RecycleScreen,
    Shop: ShopScreen,
    History: HistoryScreen,
  },
  {
    defaultNavigationOptions: ({ navigation }) => ({
      tabBarIcon: ({ focused, horizontal, tintColor }) => {
        const { routeName } = navigation.state;
        let IconComponent = Ionicons;
        let iconName;
        if (routeName === "Recycle") {
          iconName = focused
            ? "ios-information-circle"
            : "ios-information-circle-outline";
        } else if (routeName === "Shop") {
          iconName = focused ? "ios-list-box" : "ios-list";
        } else if (routeName === "History") {
          iconName = "ios-time";
        }

        return <IconComponent name={iconName} size={25} color={tintColor} />;
      },
    }),
    tabBarOptions: {
      activeBackgroundColor: colors.background,
      inactiveBackgroundColor: colors.background,
      activeTintColor: colors.secondary,
      inactiveTintColor: colors.disabled,
    },
  }
);

export default createAppContainer(TabNavigator);
