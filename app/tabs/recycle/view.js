import React, { Component } from "react";
import { View, Text, KeyboardAvoidingView, ScrollView } from "react-native";
import Button from "../../components/buttons";
import Input from "../../components/input";
import TextInput from "../../components/text-input";
import AsyncButton from "../../components/async-button";
import { colors } from "../../styles";
import GenericPicker from "../../components/generic-picker";
import Header from "../../components/header";
import { SERVER } from "../../constants";

export default function () {
  return (
    <ScrollView>
      <KeyboardAvoidingView
        behavior="height"
        enabled
        style={{
          justifyContent: "flex-end",
          alignItems: "center",
          flex: 1,
          paddingTop: 20,
        }}
      >
        <Header label={`RECYCLING`} />
        <Text>{SERVER}</Text>
        <Button
          style={{ zIndex: 1 }}
          direction="horizontal"
          buttons={this.state.paymentTypeButtons}
          onChange={(index) => {
            let newPaymentTypeButtons = this.state.paymentTypeButtons.map(
              (button, i) => {
                if (i === index) return { ...button, pressed: !button.pressed };
                return { ...button, pressed: false };
              }
            );
            this.setState({
              paymentTypeButtons: newPaymentTypeButtons,
              paymentType: this.state.paymentTypeButtons[index].value,
            });
          }}
        />

        <GenericPicker
          data={this.state.productTypeButtons}
          label="RECYCLING"
          initValue="Pick recycling product"
          onChange={(value) => this.setSelectedValue(value)}
        />

        <TextInput
          label="COMMENT"
          placeholder={"Enter comment"}
          value={this.state.comment}
          onChangeText={(comment) => {
            this.setState({ comment });
          }}
          multiline
          numberOfLines={5}
          onSubmit={(comment) => {
            this.setState({ comment });
          }}
        />
        <Input
          keyboardType="decimal-pad"
          label="PRICE"
          value={this.state.paymentAmount}
          onChangeText={(value) => {
            this.setState({ paymentAmount: value });
          }}
          onSubmitEditing={(value) => {
            this.setState({ paymentAmount: value });
          }}
          placeholder="Enter amount *"
        />
        <AsyncButton label="DONE" onPress={this.submitRecycle} />
        <Text
          style={{
            paddingTop: 10,
            fontStyle: "italic",
            color: this.state.errorUploading
              ? colors.primaryError
              : colors.primary,
          }}
        >
          {this.state.statusText}
        </Text>
        <View style={{ flex: 1 }} />
      </KeyboardAvoidingView>
    </ScrollView>
  );
}
