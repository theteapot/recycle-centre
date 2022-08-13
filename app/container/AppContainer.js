import React from "react";
import { colors } from "../styles";
import { createAppContainer } from "react-navigation";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import RecycleScreen from "../tabs/recycle";
import ShopScreen from "../tabs/shop";
import HistoryScreen from "../tabs/history";
import Ionicons from "react-native-vector-icons/Ionicons";

// https://github.com/oblador/react-native-vector-icons

const Tab = createBottomTabNavigator();

function AppContainer() {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarActiveTintColor: colors.secondary,
        headerShown: false,
      }}
    >
      <Tab.Screen
        name="Recycle"
        component={RecycleScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Ionicons
              name="ios-information-circle-outline"
              color={color}
              size={size}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Shop"
        component={ShopScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="ios-list" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="History"
        component={HistoryScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="ios-time" color={color} size={size} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}

export default AppContainer;
