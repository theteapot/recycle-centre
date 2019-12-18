import { TextInput, KeyboardAvoidingView } from "react-native";
import React from "react";
import { colors } from "../../styles";

export default function () {
    return (
        <TextInput
            multiline={this.props.multiline}
            numberOfLines={this.props.numberOfLines}
            placeholder={this.props.placeholder}
            placeholderTextColor={colors.primaryText}
            keyboardType={this.props.keyboardType}
            value={this.props.value}
            style={{
                fontStyle: "italic",
                width: "90%",
                marginTop: 10,
                marginBottom: 30,
                padding: 10,
                fontSize: 18,
                borderRadius: 5,
                textAlign: "left",
                borderBottomWidth: 1,
                borderBottomColor: colors.primaryDark,
                borderRadius: 5
            }}
            onSubmitEditing={() => this.props.onSubmit(this.props.value)}
            returnKeyType="done"
            onChangeText={value => this.props.onChangeText(value)}
        />
    );
}
