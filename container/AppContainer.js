import React, { Component } from "react";
import { View, Text, StyleSheet, KeyboardAvoidingView } from "react-native";
import Button from "../components/button";
import Input from "../components/input";
import AsyncButton from "../components/async-button";
import { SERVER } from "../constants";
import FullscreenLoader from "../components/fullscreen-loader";
import { colors } from "../styles";

export default class AppContainer extends Component {
  constructor(props) {
    super(props);

    this.paymentTypeButtons = [
      { label: "CASH", value: "cash", pressed: true }
      //   { label: "EFTPOS", value: "EFTPOS", pressed: false }
    ];

    this.productTypeButtons = [
      { label: "CARDBOARD", value: "CARDBOARD" },
      { label: "POLY", value: "POLY" },
      { label: "E-WASTE", value: "E-WASTE" },
      { label: "BATTERIES", value: "BATTERIES" },
      { label: "FOAM", value: "FOAM" },
      { label: "PLASTIC FILM", value: "PLASTIC FILM" },
      { label: "PLASTIC MIXED", value: "PLASTIC MIXED" }
    ];

    this.state = {
      paymentType: "cash",
      productType: "",
      paymentAmount: "",
      loading: false,
      statusText: "",
      paymentTypeButtons: this.paymentTypeButtons,
      productTypeButtons: this.productTypeButtons
    };
  }

  render() {
    return (
      <KeyboardAvoidingView behavior="padding" enabled style={styles.container}>
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
        <Input
          keyboardType="decimal-pad"
          value={this.state.paymentAmount}
          onChangeText={value => this.setState({ paymentAmount: value })}
          placeholder="Enter amount"
          onSubmit={async value => {
            const { paymentAmount, paymentType, productType } = this.state;
            this.setState({ paymentAmount: value, loading: true });
            await fetch(`${SERVER}/payments`, {
              method: "POST",
              headers: { "content-type": "application/json" },
              body: JSON.stringify({ paymentType, paymentAmount, productType })
            });
            this.setState({
              loading: false,
              statusText: "Upload successful",
              paymentAmount: "",
              paymentType: "",
              productType: "",
              productTypeButtons: this.productTypeButtons,
              paymentTypeButtons: this.paymentTypeButtons
            });
          }}
        />
        <Text
          style={{ paddingTop: 10, fontStyle: "italic", color: colors.primary }}
        >
          {this.state.statusText}
        </Text>
      </KeyboardAvoidingView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center"
  }
});
