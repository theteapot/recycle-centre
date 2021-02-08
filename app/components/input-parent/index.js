import React, { Component } from "react";
import { Text, View } from "react-native";
import { colors } from "../../styles";

export default class InputParent extends Component {
  // This is for the detailing on many of the input components

  render() {
    return (
      <View
        style={{
          width: "90%",
          display: "flex",
          alignItems: "stretch",
          flexDirection: "row",
          borderWidth: 1,
          borderColor: colors.primary,
          borderRadius: 20,
          margin: 10,
          height: 50,
        }}
      >
        <View
          style={{
            height: "100%",
            backgroundColor: colors.primary,
            borderTopLeftRadius: 20,
            borderBottomLeftRadius: 20,
            display: "flex",
            flexDirection: "row",
            padding: 10,
            alignItems: "center",
            justifyContent: "flex-start",
          }}
        >
          <Text
            style={{
              fontWeight: "bold",
              color: colors.secondaryText,
              textAlign: "center",
              minWidth: 80,
            }}
          >
            {this.props.label}
          </Text>
        </View>
        <View
          style={{
            flexGrow: 2,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          {this.props.children}
        </View>
      </View>
    );
  }
}
