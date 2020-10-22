import { TextInput, KeyboardAvoidingView } from "react-native";
import React from "react";
import { colors } from "../../styles";

export default function () {
  return (
    <TextInput
      placeholder={this.state.placeholder}
      placeholderTextColor={colors.primaryText}
      keyboardType={this.props.keyboardType}
      value={this.props.value}
      style={{
        fontStyle: "italic",
        width: 250,
        marginTop: 10,
        fontSize: 18,
        borderRadius: 5,
        textAlign: "center",
        borderBottomWidth: 1,
        borderBottomColor: colors.primaryDark,
        ...this.props.style,
      }}
      onSubmitEditing={() => this.props.onSubmit(this.props.value)}
      returnKeyType="done"
      onChangeText={(value) => this.props.onChangeText(value)}
    />
  );
}
