import { ScrollView, View, Text } from "react-native";
import React from "react";
import { TouchableOpacity } from "react-native";
import { colors } from "../../styles";

function renderButtons(buttons, direction, onPress, style, buttonIsSelected) {
  return buttons.map(
    ({ label, value, pressed }, index) =>
      ((buttonIsSelected && pressed) || !buttonIsSelected) && (
        <TouchableOpacity
          activeOpacity={0.5}
          key={index}
          style={{
            ...style,
            flexGrow: direction === "horizontal" ? 1 : 0,
            // height: 50,
            justifyContent: "center",
            borderTopLeftRadius: index === 0 ? 20 : 0,
            borderBottomLeftRadius:
              (direction === "horizontal" && index === 0) ||
              (direction === "vertical" && index === buttons.length - 1)
                ? 20
                : 0,
            borderTopRightRadius:
              (direction === "horizontal" && index === buttons.length - 1) ||
              (direction === "vertical" && index === 0)
                ? 20
                : 0,
            borderBottomRightRadius: index === buttons.length - 1 ? 20 : 0,

            // borderRightWidth:
            //   index !== buttons.length - 1 && direction === "horizontal"
            //     ? 1
            //     : 0,
            // borderBottomWidth:
            //   index !== buttons.length - 1 && direction === "vertical" ? 1 : 0,
            borderWidth: 1,
            borderColor: colors.primary,

            backgroundColor: pressed ? colors.primary : colors.background,
          }}
          onPressOut={() => onPress(index)}
        >
          <Text
            style={{
              fontWeight: "bold",
              fontSize: 18,
              color: pressed ? colors.background : colors.primary,
              textAlign: "center",
            }}
          >
            {label}
          </Text>
        </TouchableOpacity>
      )
  );
}

export default function () {
  return (
    <View
      style={{
        margin: 10,
        height: 50,
        width: "90%",
        flexDirection: this.props.direction === "horizontal" ? "row" : "column",
      }}
    >
      {renderButtons(
        this.props.buttons,
        this.props.direction,
        this._pressButton,
        this.props.style,
        this.state.buttonIsSelected
      )}
    </View>
  );
}
