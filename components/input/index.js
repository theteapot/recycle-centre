import React, { Component } from "react";
import { View, Text } from "react-native";
import view from "./view";

export default class Input extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return view.apply(this);
  }
}
