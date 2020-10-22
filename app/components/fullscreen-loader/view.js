import { ScrollView, View, Text, ActivityIndicator } from "react-native";
import React from "react";
import { TouchableHighlight } from "react-native";
import { colors } from "../../styles";

export default function() {
  return (
    <View
      style={{
        position: "absolute",
        height: "100%",
        zIndex: 2,
        opacity: 0.8,
        width: "100%",
        backgroundColor: colors.secondaryDark,
        padding: 10,
        justifyContent: "center",
        flexDirection: this.props.direction === "horizontal" ? "row" : "column"
      }}
    >
      <ActivityIndicator size="large" color={colors.secondaryText} />
    </View>
  );
}
