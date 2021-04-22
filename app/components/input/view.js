import { TextInput, KeyboardAvoidingView, View, Text } from "react-native";
import React from "react";
import { colors } from "../../styles";
import InputParent from "../input-parent";

export default function () {
  return (
    <InputParent label={this.props.label}>
      <TextInput
        placeholder={this.state.placeholder}
        placeholderTextColor={colors.disabled}
        keyboardType={this.props.keyboardType}
        value={this.props.value}
        style={{
          color: colors.disabled,
          width: 250,
          flexGrow: 2,
          fontSize: 18,
          borderRadius: 5,
          textAlign: "center",
          ...this.props.style,
        }}
        onSubmitEditing={this.props.onSubmitEditing}
        returnKeyType="Done"
        onChangeText={(value) => {
          this.props.onChangeText(value);
        }}
      />
    </InputParent>
  );
}
