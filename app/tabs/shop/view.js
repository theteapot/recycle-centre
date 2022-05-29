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

export default function () {
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
          onSubmitEditing={(value) => this.setState({ paymentAmount: value })}
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
            this.state.selectedProduct === "" || this.state.paymentAmount === ""
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
