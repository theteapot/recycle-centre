import { ScrollView, View, Text } from "react-native";
import React from "react";
import { TouchableHighlight } from "react-native";
import { colors } from "../../styles";

function renderButtons(buttons, direction, onPress, style) {
  return buttons.map(({ label, value, pressed }, index) => (
    <TouchableHighlight
      onPress={() => {}}
      underlayColor={colors.primaryLight}
      style={{
        ...style,
        flexGrow: direction === "horizontal" ? 1 : 0,
        width: direction === "vertical" ? 200 : "auto",
        height: 40,
        justifyContent: "center",
        borderTopLeftRadius: index === 0 ? 5 : 0,
        borderBottomLeftRadius:
          (direction === "horizontal" && index === 0) ||
          (direction === "vertical" && index === buttons.length - 1)
            ? 5
            : 0,
        borderTopRightRadius:
          (direction === "horizontal" && index === buttons.length - 1) ||
          (direction === "vertical" && index === 0)
            ? 5
            : 0,
        borderBottomRightRadius: index === buttons.length - 1 ? 5 : 0,

        borderRightWidth:
          index !== buttons.length - 1 && direction === "horizontal" ? 1 : 0,
        borderBottomWidth:
          index !== buttons.length - 1 && direction === "vertical" ? 1 : 0,
        borderColor: colors.primaryDark,

        backgroundColor: pressed ? colors.primaryDark : colors.primary
      }}
      onPressOut={() => onPress(index)}
    >
      <Text
        style={{
          fontWeight: "bold",
          color: pressed ? colors.secondaryText : colors.primaryText,
          textAlign: "center"
        }}
      >
        {label}
      </Text>
    </TouchableHighlight>
  ));
}

export default function() {
  return (
    <View
      style={{
        padding: 10,
        flexDirection: this.props.direction === "horizontal" ? "row" : "column"
      }}
    >
      {renderButtons(
        this.props.buttons,
        this.props.direction,
        this._pressButton,
        this.props.style
      )}
    </View>
  );
}
