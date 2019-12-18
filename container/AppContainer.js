import React, { Component } from "react";
import { View, Text, StyleSheet, KeyboardAvoidingView, ScrollView } from "react-native";
import Button from "../components/button";
import Input from "../components/input";
import TextInput from '../components/text-input'
import AsyncButton from "../components/async-button";
import { SERVER } from "../constants";
import FullscreenLoader from "../components/fullscreen-loader";
import { colors } from "../styles";

export default class AppContainer extends Component {
  constructor(props) {
    super(props);

    this.paymentTypeButtons = [
      { label: "CASH", value: "cash", pressed: true },
      { label: "EFTPOS", value: "EFTPOS", pressed: false }
    ];

    this.productTypeButtons = [
      { label: "CARDBOARD", value: "CARDBOARD" },
      { label: "POLY", value: "POLY" },
      { label: "E-WASTE", value: "E-WASTE" },
      { label: "BATTERIES", value: "BATTERIES" },
      { label: "FOAM", value: "FOAM" },
      { label: "PLASTIC FILM", value: "PLASTIC FILM" },
      { label: "PLASTIC MIXED", value: "PLASTIC MIXED" },
      { label: "BIOCHAR", value: "BIOCHAR" },
      { label: "BOKASHI", value: "BOKASHI" },
      { label: "FOODSCRAPS", value: "FOODSCRAPS" },
      { label: "CARDS", value: "CARDS" }

    ];

    this.state = {
      paymentType: "cash",
      productType: "",
      paymentAmount: "",
      comment: "",
      loading: false,
      statusText: "",
      paymentTypeButtons: this.paymentTypeButtons,
      productTypeButtons: this.productTypeButtons
    };
  }

  render() {
    return (
      <ScrollView>

        <KeyboardAvoidingView
          behavior="height"
          enabled
          style={{
            justifyContent: "flex-end",
            alignItems: "center",
            flex: 1,
            paddingTop: 20
          }}
        >
          {this.state.loading && <FullscreenLoader />}
          <Button
            style={{ zIndex: 1 }}
            direction="horizontal"
            buttons={this.state.paymentTypeButtons}
            onChange={index => {
              let newPaymentTypeButtons = this.state.paymentTypeButtons.map(
                (button, i) => {
                  if (i === index) return { ...button, pressed: !button.pressed };
                  return { ...button, pressed: false };
                }
              );
              this.setState({
                paymentTypeButtons: newPaymentTypeButtons,
                paymentType: this.state.paymentTypeButtons[index].value
              });
            }}
          />

          <Button
            value={this.state.productType}
            style={{ zIndex: 1 }}
            direction="vertical"
            buttons={this.state.productTypeButtons}
            onChange={index => {
              let newProductTypeButtons = this.state.productTypeButtons.map(
                (button, i) => {
                  if (i === index) return { ...button, pressed: !button.pressed };
                  return { ...button, pressed: false };
                }
              );
              this.setState({
                productTypeButtons: newProductTypeButtons,
                paymentType: this.state.productTypeButtons[index].value
              });
            }}
          />
          <TextInput placeholder={"Enter comment"} value={this.state.comment} onChangeText={comment => this.setState({ comment })} multiline numberOfLines={3} onSubmit={comment => this.setState({ comment })} />
          <Input
            keyboardType="decimal-pad"
            value={this.state.paymentAmount}
            onChangeText={value => this.setState({ paymentAmount: value })}
            placeholder="Enter amount *"
            onSubmit={async value => {
              const { paymentAmount, paymentType, productType, comment } = this.state;
              this.setState({ paymentAmount: value, loading: true });

              try {
                await fetch(`${SERVER}/payments`, {
                  method: "POST",
                  headers: { "content-type": "application/json" },
                  body: JSON.stringify({
                    paymentType,
                    paymentAmount,
                    productType,
                    comment
                  })
                });
                this.setState({
                  loading: false,
                  errorUploading: false,
                  statusText: "Upload successful",
                  paymentAmount: "",
                  comment: "",
                  // paymentType: "",
                  // productType: "",
                  productTypeButtons: this.productTypeButtons,
                  paymentTypeButtons: this.paymentTypeButtons
                });
              } catch (error) {
                this.setState({
                  loading: false,
                  errorUploading: true,
                  statusText: "Upload unsuccessful"
                });
              }
            }}
          />
          <Text
            style={{
              paddingTop: 10,
              fontStyle: "italic",
              color: this.state.errorUploading
                ? colors.primaryError
                : colors.primary
            }}
          >
            {this.state.statusText}
          </Text>
          <View style={{ flex: 1 }} />
        </KeyboardAvoidingView>
      </ScrollView>

    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "flex-end"
  }
});
