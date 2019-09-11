import { TextInput, KeyboardAvoidingView } from "react-native";
import React from "react";
import { colors } from "../../styles";

export default function() {
  return (
    <TextInput
      placeholder={this.props.placeholder}
      placeholderTextColor={colors.primaryText}
      keyboardType={this.props.keyboardType}
      value={this.props.value}
      style={{
        fontStyle: "italic",
        width: 200,
        marginTop: 10,
        borderRadius: 5,
        textAlign: "center",
        borderBottomWidth: 1,
        borderBottomColor: colors.primaryDark
      }}
      onSubmitEditing={() => this.props.onSubmit(this.props.value)}
      returnKeyType="done"
      onChangeText={value => this.props.onChangeText(value)}
    />
  );
}
