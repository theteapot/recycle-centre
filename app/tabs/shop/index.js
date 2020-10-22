import React, { Component } from "react";
import {
  View,
  Text,
  StyleSheet,
  KeyboardAvoidingView,
  ScrollView,
  Picker,
} from "react-native";
import Buttons from "../../components/buttons";
import Button from "../../components/button";
import Input from "../../components/input";
import TextInput from "../../components/text-input";
import AsyncButton from "../../components/async-button";
import { SERVER } from "../../constants";
import FullscreenLoader from "../../components/fullscreen-loader";
import { colors } from "../../styles";
import Order from "./order";
import { DialogComponent, DialogContent } from "react-native-dialog-component";
import Header from "../../components/header";

export default class Recycle extends Component {
  constructor(props) {
    super(props);

    this.paymentTypeButtons = [
      { label: "CASH", value: "cash", pressed: true },
      { label: "EFTPOS", value: "EFTPOS", pressed: false },
    ];

    this.productTypes = [
      {
        label: "Select a product",
        value: "",
      },
      { label: "Biochar (bucket)", value: "BIOCHAR_BKT" },
      {
        label: "Biochar (1L volume)",
        value: "BIOCHAR_VOL",
      },
      { label: "Community Crafts", value: "COMM_CRAFT" },
      { label: "Tag 'N Test", value: "TAG_TEST" },
      { label: "Mulch bucket swap", value: "MLCH_BKT_SWP" },
      { label: "Battery Buckets", value: "BATT_BKT" },
      { label: "Battery Weight", value: "BATT_WGT" },
      { label: "Plant Sales", value: "PLANT_SALE" },
      { label: "Refillery", value: "REFILL" },
      { label: "Toki Straws", value: "TOKI_STRAWS" },
      {
        label: "Reusable bags or picnic kits",
        value: "REUSE_BAG_PICNIC",
      },
      {
        label: "Coastal Cabin Products",
        value: "COASTAL_CABIN",
      },
      { label: "Items for sale", value: "ITEMS_FOR_SALE" },
    ];

    this.state = {
      paymentType: "cash",
      selectedProduct: "",
      productQuantity: 1,
      paymentAmount: "",
      loading: false,
      statusText: "",
      order: [],
    };

    this.addToOrder = this.addToOrder.bind(this);
    this.removeFromOrder = this.removeFromOrder.bind(this);
    this.setSelectedValue = this.setSelectedValue.bind(this);
    this.setPaymentAmount = this.setPaymentAmount.bind(this);
    this.showDialog = this.showDialog.bind(this);
  }

  setSelectedValue(value) {
    console.log(value);
    this.setState({ selectedProduct: value });
  }

  async submitOrder(order) {
    await fetch(`${SERVER}/payments`, {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({
        paymentType,
        paymentAmount,
        productType,
        comment,
      }),
    });
    this.setState({
      loading: false,
      errorUploading: false,
      statusText: "Upload successful",
      paymentAmount: "",
      comment: "",

      productTypeButtons: this.productTypeButtons,
      paymentTypeButtons: this.paymentTypeButtons,
    });
  }

  setPaymentAmount(value) {
    console.log(value);
  }

  addToOrder() {
    // Get the values of the current item from state
    // Then set the payment amount back to 0
    const { selectedProduct, paymentAmount, productQuantity } = this.state;
    const product = this.productTypes.find(
      ({ value }) => value === selectedProduct
    );
    this.setState({
      order: [
        ...this.state.order,
        { ...product, paymentAmount, productQuantity },
      ],
      selectedProduct: "",
      paymentAmount: "",
      productQuantity: 1,
    });
  }

  removeFromOrder(index) {
    this.state.order.splice(index, 1);
    this.setState({ order: this.state.order });
  }

  showDialog() {
    this.dialogComponent.show();
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
            paddingTop: 20,
          }}
        >
          {this.state.loading && <FullscreenLoader />}

          <Header label="SHOP" />

          {/* Product Picker */}

          <View
            style={{
              width: "80%",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              flexDirection: "row",
            }}
          >
            <Text style={{ fontWeight: "bold", color: colors.secondary }}>
              PRODUCT:
            </Text>
            <View
              style={{
                borderBottomColor: colors.secondary,
                borderBottomWidth: 1,
                width: "76%",
              }}
            >
              <Picker
                selectedValue={this.state.selectedProduct}
                style={{
                  height: 50,
                  width: "100%",
                }}
                onValueChange={(value, itemIndex) =>
                  this.setSelectedValue(value)
                }
              >
                {this.productTypes.map(({ label, value }) => (
                  <Picker.Item label={label} value={value} />
                ))}
              </Picker>
            </View>
          </View>

          {/* Price input */}
          <View
            style={{
              width: "80%",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              flexDirection: "row",
              paddingTop: 10,
            }}
          >
            <Text
              style={{
                fontWeight: "bold",
                color: colors.secondary,
              }}
            >
              PRICE:
            </Text>
            <View
              style={{
                width: "76%",
                borderBottomWidth: 1,
              }}
            >
              <Input
                style={{
                  fontStyle: "normal",
                  width: "76%",
                  fontSize: 16,
                  textAlign: "left",
                  borderBottomWidth: 0,
                  marginTop: 0,
                  paddingLeft: 7,
                }}
                width="78%"
                keyboardType="decimal-pad"
                value={this.state.paymentAmount}
                onChangeText={(value) =>
                  this.setState({ paymentAmount: value })
                }
                placeholder="Enter amount ($) *"
                onSubmit={(value) => this.addToOrder()}
              />
            </View>
          </View>

          {/* Quantity Picker */}
          <View
            style={{
              width: "80%",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              flexDirection: "row",
              paddingTop: 10,
            }}
          >
            <Text
              style={{
                fontWeight: "bold",
                color: colors.secondary,
              }}
            >
              QTY:
            </Text>
            <View
              style={{
                width: "76%",
                borderBottomWidth: 1,
              }}
            >
              <Input
                style={{
                  fontStyle: "normal",
                  width: "76%",
                  fontSize: 16,
                  textAlign: "left",
                  borderBottomWidth: 0,
                  marginTop: 0,
                  paddingLeft: 7,
                }}
                keyboardType="decimal-pad"
                placeholder="Default (1)"
                value={this.state.productQuantity}
                onChangeText={(value) =>
                  this.setState({ productQuantity: value })
                }
                onSubmit={(value) =>
                  this.setState({ productQuantity: this.state.productQuantity })
                }
              ></Input>
            </View>
          </View>

          {/* Add item to order */}
          <AsyncButton
            buttonStyle={{
              width: 250,
            }}
            label={(() => {
              if (this.state.selectedProduct === "") {
                return "SELECT A PRODUCT";
              } else if (this.state.paymentAmount === "") {
                return "ENTER PRICE GREATER THAN 0";
              } else {
                return "ADD ITEM";
              }
            })()}
            disabled={
              this.state.selectedProduct === "" ||
              this.state.paymentAmount === ""
            }
            onPress={() => this.addToOrder()}
          />

          {/* Text for error reporting */}
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

          {/* Order table */}
          <Order
            order={this.state.order}
            showDialog={this.showDialog}
            removeFromOrder={this.removeFromOrder}
          />

          <AsyncButton
            disabled={this.state.order.length === 0}
            label="SUBMIT"
          ></AsyncButton>
          <View style={{ flex: 1 }} />
        </KeyboardAvoidingView>
      </ScrollView>
    );
  }
}
