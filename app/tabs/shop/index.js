import React, { Component } from "react";
import {
  View,
  Text,
  StyleSheet,
  KeyboardAvoidingView,
  ScrollView,
  Picker,
  Modal,
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
import ModalPicker from "react-native-modal-selector";
import style from "react-native-modal-selector/style";

export default class Recycle extends Component {
  constructor(props) {
    super(props);

    this.paymentTypeButtons = [
      { label: "CASH", value: "cash", pressed: true },
      { label: "EFTPOS", value: "EFTPOS", pressed: false },
    ];

    let index = 0;
    this.productTypes = [
      // {
      //   key: index++,
      //   label: "Select a product",
      //   value: "",
      //   defaultPrice: "",
      // },
      {
        key: index++,
        label: "Biochar (bucket)",
        value: "BIOCHAR_BKT",
        defaultPrice: "",
      },
      {
        key: index++,
        label: "Biochar (1L volume)",
        value: "BIOCHAR_VOL",
        defaultPrice: "",
      },
      {
        key: index++,
        label: "Community Crafts",
        value: "COMM_CRAFT",
        defaultPrice: "",
      },
      {
        key: index++,
        label: "Tag 'N Test",
        value: "TAG_TEST",
        defaultPrice: "",
      },
      {
        key: index++,
        label: "Mulch bucket swap",
        value: "MLCH_BKT_SWP",
        defaultPrice: "3",
      },
      {
        key: index++,
        label: "Battery Buckets",
        value: "BATT_BKT",
        defaultPrice: "13",
      },
      {
        key: index++,
        label: "Battery Weight",
        value: "BATT_WGT",
        defaultPrice: "",
      },
      {
        key: index++,
        label: "Plant Sales",
        value: "PLANT_SALE",
        defaultPrice: "",
      },
      { key: index++, label: "Refillery", value: "REFILL", defaultPrice: "" },
      {
        key: index++,
        label: "Toki Straws",
        value: "TOKI_STRAWS",
        defaultPrice: "",
      },
      {
        key: index++,
        label: "Reusable bags or picnic kits",
        value: "REUSE_BAG_PICNIC",
        defaultPrice: "",
      },
      {
        key: index++,
        label: "Coastal Cabin Products",
        value: "COASTAL_CABIN",
        defaultPrice: "",
      },
      {
        key: index++,
        label: "Items for sale",
        value: "ITEMS_FOR_SALE",
        defaultPrice: "",
      },
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
    this.submitOrder = this.submitOrder.bind(this);
    this.removeFromOrder = this.removeFromOrder.bind(this);
    this.setSelectedValue = this.setSelectedValue.bind(this);
    this.showDialog = this.showDialog.bind(this);
  }

  setSelectedValue(value) {
    this.setState({
      selectedProduct: value.value,
      selectedKey: value.key,
      paymentAmount: value.defaultPrice,
    });
  }

  async submitOrder() {
    let { order } = this.state;

    try {
      let response = await fetch(`${SERVER}/payments/shop`, {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({
          order,
        }),
      });

      this.setState({
        loading: false,
        errorUploading: false,
        statusText: "Upload successful",
        paymentAmount: "",
        selectedProduct: "",
        productQuantity: 1,
        order: [],
      });
    } catch (error) {
      this.setState({ errorUploading: true });
    }
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
      selectedKey: "",
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
              <ModalPicker
                optionStyle={{
                  backgroundColor: colors.primary,
                }}
                optionTextStyle={{
                  color: "white",
                  textTransform: "uppercase",
                }}
                sectionStyle={{
                  backgroundColor: colors.primary,
                }}
                cancelStyle={{
                  backgroundColor: colors.primary,
                  borderRadius: 5,
                }}
                cancelTextStyle={{
                  textTransform: "uppercase",
                  color: "white",
                }}
                selectStyle={{ borderWidth: 0 }}
                selectedKey={this.state.selectedKey}
                style={{ borderWidth: 0 }}
                data={this.productTypes}
                initValue="Select a product type"
                onChange={(value) => this.setSelectedValue(value)}
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
                placeholder="Enter price per unit ($) *"
                onSubmit={(value) =>
                  this.setState({ paymentAmount: this.state.paymentAmount })
                }
              />
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

          {/* Order table */}
          <Order
            order={this.state.order}
            showDialog={this.showDialog}
            removeFromOrder={this.removeFromOrder}
          />

          <AsyncButton
            disabled={this.state.order.length === 0}
            label="SUBMIT"
            onPress={this.submitOrder}
          ></AsyncButton>
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
          <View style={{ flex: 1 }} />
        </KeyboardAvoidingView>
      </ScrollView>
    );
  }
}
