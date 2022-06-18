import React, { Component } from "react";
import { View, Text, ScrollView } from "react-native";
import Input from "../../components/input";
import AsyncButton from "../../components/async-button";
// const SERVER = process.env.REACT_APP_SERVER;
import { SERVER } from "../../constants";

import { colors } from "../../styles";
import Order from "./order";
import Header from "../../components/header";
import GenericPicker from "../../components/generic-picker";
import { productTypes } from "./productsBySupplier.json";
import view from "./view";

export default class Shop extends Component {
  constructor(props) {
    super(props);

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
      productTypes: [],
    };

    this.addToOrder = this.addToOrder.bind(this);
    this.submitOrder = this.submitOrder.bind(this);
    this.removeFromOrder = this.removeFromOrder.bind(this);
    this.setSelectedValue = this.setSelectedValue.bind(this);
    this.setSelectedSubValue = this.setSelectedSubValue.bind(this);
    this.showDialog = this.showDialog.bind(this);
    this.renderSubPicker = this.renderSubPicker.bind(this);
  }

  async componentDidMount() {
    let { productTypes } = await (
      await fetch(`${SERVER}/products/shop`)
    ).json();
    // Apply numeric keys to items for picker elements to use
    productTypes = productTypes.map((product, key) => {
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
    this.setState({ productTypes });
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
      product = this.state.productTypes.find(
        ({ value }) => value === selectedProduct
      );
    } else {
      product = this.state.productTypes
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
    let selectedProductType = this.state.productTypes.find(
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
    console.log(this.state.productTypes);
    return view.apply(this);
  }
}
