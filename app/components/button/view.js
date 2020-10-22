import { ScrollView, View, Text } from "react-native";
import React from "react";
import { TouchableOpacity } from "react-native";
import { colors } from "../../styles";


export default function () {
  let label = this.props.label || "Press Me"
  return (
    <View
      style={{
        padding: 10,
        width: "100%",
      }}
    >

      <TouchableOpacity>
        <Text
          style={{
            fontWeight: "bold",
            fontSize: 18,
            color: colors.primaryText,
            textAlign: "center"
          }}
        >
          {label}
        </Text>
      </TouchableOpacity>
    </View>

  )
}
