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
// import { SERVER } from "../../constants";
const SERVER = process.env.REACT_APP_SERVER;
import FullscreenLoader from "../../components/fullscreen-loader";
import { colors } from "../../styles";
import Order from "./order";
import { DialogComponent, DialogContent } from "react-native-dialog-component";
import Header from "../../components/header";
import ModalPicker from "react-native-modal-selector";
import style from "react-native-modal-selector/style";
import GenericPicker from "../../components/generic-picker";
import { productTypes } from "./productsBySupplier.json";

export default class Recycle extends Component {
  constructor(props) {
    super(props);

    // Apply numeric keys to items for picker elements to use
    this.productTypes = productTypes.map((product, key) => {
      return {
        ...product,
        key,
        subMenu: {
          items: product.subMenu.items.map((subProduct, key) => {
            return { ...subProduct, key };
          }),
        },
      };
    });

    this.state = {
      paymentType: "cash",
      selectedProduct: "",
      selectedSubProduct: "",
      selectedKey: "",
      selectedSubKey: "",
      productQuantity: 1,
      paymentAmount: 0,
      loading: false,
      statusText: "",
      order: [],
    };

    this.addToOrder = this.addToOrder.bind(this);
    this.submitOrder = this.submitOrder.bind(this);
    this.removeFromOrder = this.removeFromOrder.bind(this);
    this.setSelectedValue = this.setSelectedValue.bind(this);
    this.setSelectedSubValue = this.setSelectedSubValue.bind(this);
    this.showDialog = this.showDialog.bind(this);
    this.renderSubPicker = this.renderSubPicker.bind(this);
  }

  setSelectedValue(value) {
    this.setState({
      selectedProduct: value.value,
      selectedKey: value.key,
      paymentAmount: value.defaultPrice,
    });
  }

  setSelectedSubValue(value, index) {
    // Used for selecting sub items of products
    this.setState({
      selectedSubProduct: value.value,
      selectedSubKey: value.key,
      paymentAmount: value.defaultPrice,
    });
  }

  async submitOrder() {
    let { order } = this.state;

    try {
      this.setState({ loading: true });
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
    const {
      selectedProduct,
      paymentAmount,
      productQuantity,
      selectedSubProduct,
    } = this.state;

    let product;
    if (selectedSubProduct === "") {
      product = this.productTypes.find(
        ({ value }) => value === selectedProduct
      );
    } else {
      product = this.productTypes
        .find(({ value }) => value === selectedProduct)
        .subMenu.items.find(({ value }) => value === selectedSubProduct);
    }

    this.setState({
      selectedSubProduct: "",
      selectedProduct: "",
      selectedKey: "",
      selectedSubKey: "",
      paymentAmount: "",
      productQuantity: 1,
      order: [
        ...this.state.order,
        { ...product, paymentAmount, productQuantity },
      ],
    });
  }

  removeFromOrder(index) {
    this.state.order.splice(index, 1);
    this.setState({ order: this.state.order });
  }

  showDialog() {
    this.dialogComponent.show();
  }

  renderSubPicker() {
    let { selectedProduct } = this.state;
    let selectedProductType = this.productTypes.find(
      ({ value }) => value == selectedProduct
    );
    if (selectedProduct === "" || !selectedProductType) {
      return null;
    } else if (selectedProductType.subMenu.items.length === 0) {
      return null;
    } else {
      return null;
    }
  }

  render() {
    return (
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <View
          behavior="height"
          enabled
          style={{
            alignItems: "center",
            flexGrow: 1,
            paddingTop: 20,
            paddingBottom: 20,
          }}
        >
          {this.state.loading && <FullscreenLoader />}

          <Header label="SHOP" />
          {/* Product Picker */}
          <GenericPicker
            data={this.productTypes}
            initValue="Select a product type"
            onChange={(value) => this.setSelectedValue(value)}
            selectedKey={this.state.selectedKey}
            label={"PRODUCT"}
          />
          {/* Picker for sub items */}
          {this.state.selectedProduct !== "" &&
            this.productTypes[this.state.selectedKey].subMenu.items.length >
              0 && (
              <GenericPicker
                data={this.productTypes[this.state.selectedKey].subMenu.items}
                onChange={
                  (value, index) => this.setSelectedSubValue(value, index)
                  // this.setSelectedValue(value, index)
                }
                selectedKey={this.state.selectedSubKey}
                initValue={"Select sub-product"}
                label={"SUB-PRODUCT:"}
              />
            )}

          {/* Quantity Picker */}

          <Input
            label="QTY"
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
            onChangeText={(value) => this.setState({ productQuantity: value })}
            onSubmit={(value) =>
              this.setState({ productQuantity: this.state.productQuantity })
            }
          ></Input>

          <Input
            label="PRICE"
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
            onChangeText={(value) => this.setState({ paymentAmount: value })}
            placeholder="Enter price per unit ($) *"
            onSubmitEditing={(value) =>
              this.setState({ paymentAmount: this.state.paymentAmount })
            }
          />

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
        </View>
      </ScrollView>
    );
  }
}
