import React, { Component } from "react";
import { View, Text, StyleSheet, KeyboardAvoidingView, ScrollView } from "react-native";
import Button from "../components/button";
import Input from "../components/input";
import TextInput from '../components/text-input'
import AsyncButton from "../components/async-button";
import { SERVER } from "../constants";
import FullscreenLoader from "../components/fullscreen-loader";
import { colors } from "../styles";
import { createAppContainer } from 'react-navigation';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import RecycleScreen from '../tabs/recycle'
import ShopScreen from '../tabs/shop'

const TabNavigator = createBottomTabNavigator({
  Recycle: RecycleScreen,
  Shop: ShopScreen
})

export default createAppContainer(TabNavigator)

