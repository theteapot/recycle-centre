import { TextInput, KeyboardAvoidingView, View, Text } from "react-native";
import React from "react";
import { colors } from "../../styles";
import InputParent from "../input-parent";

export default function () {
  return (
    <InputParent label={this.props.label}>
      <TextInput
        multiline={this.props.multiline}
        numberOfLines={this.props.numberOfLines}
        placeholder={this.props.placeholder}
        placeholderTextColor={colors.disabled}
        keyboardType={this.props.keyboardType}
        value={this.props.value}
        style={{
          width: "68%",
          fontSize: 18,
          textAlign: "center",
        }}
        onSubmitEditing={() => this.props.onSubmit(this.props.value)}
        returnKeyType="done"
        onChangeText={this.props.onChangeText}
      />
    </InputParent>
  );
}
