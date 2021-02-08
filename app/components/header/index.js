import React, { Component } from "react";
import { Text, View } from "react-native";
import PropTypes from "prop-types";
import { colors } from "../../styles";

export default class Header extends Component {
  render() {
    return (
      <View
        style={{
          width: "80%",
          paddingTop: 10,
          borderBottomColor: colors.secondary,
          borderBottomWidth: 1,
          ...this.props.style,
        }}
      >
        <Text
          style={{
            fontSize: 25,
            textAlign: "left",
            color: colors.secondary,
          }}
        >
          {this.props.label}
        </Text>
      </View>
    );
  }
}

Header.propTypes = {
  label: PropTypes.string,
  style: PropTypes.object,
};
