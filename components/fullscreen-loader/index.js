import React, { Component } from "react";
import { View, Text } from "react-native";
import view from "./view";

export default class FullscreenLoader extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return view.apply(this);
  }
}
