import React, { Component } from "react";
import { View, Text, TouchableHighlight } from "react-native";
import PropTypes from "prop-types";
import { colors } from "../../styles";

export default class AsyncButton extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <TouchableHighlight
        onPress={this.props.onPress}
        underlayColor={colors.secondaryLight}
        style={{
          backgroundColor: colors.secondaryDark,
          padding: 10,
          height: 50,

          justifyContent: "center",
          marginTop: 30,
          width: 150,
          borderRadius: 5
        }}
      >
        <Text
          style={{
            fontWeight: "bold",
            textAlign: "center",
            color: colors.secondaryText
          }}
        >
          {this.props.label}
        </Text>
      </TouchableHighlight>
    );
  }
}

AsyncButton.propTypes = {
  onPress: PropTypes.func.isRequired,
  label: PropTypes.string
};

AsyncButton.defaultProps = {
  label: "Press Me!"
};
