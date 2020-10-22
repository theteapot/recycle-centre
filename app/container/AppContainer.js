import React, { Component } from "react";
import {
  View,
  Text,
  StyleSheet,
  KeyboardAvoidingView,
  ScrollView,
} from "react-native";
import Button from "../components/buttons";
import Input from "../components/input";
import TextInput from "../components/text-input";
import AsyncButton from "../components/async-button";
import { SERVER } from "../constants";
import FullscreenLoader from "../components/fullscreen-loader";
import { colors } from "../styles";
import { createAppContainer } from "react-navigation";
import { createBottomTabNavigator } from "react-navigation-tabs";
import RecycleScreen from "../tabs/recycle";
import ShopScreen from "../tabs/shop";
import Ionicons from "react-native-vector-icons/Ionicons";

const TabNavigator = createBottomTabNavigator(
  {
    Recycle: RecycleScreen,
    Shop: ShopScreen,
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
        }

        // You can return any component that you like here!
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
