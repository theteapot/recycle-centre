import React, { Component } from "react";
import { View, Text, StyleSheet, KeyboardAvoidingView, ScrollView, Picker } from "react-native";
import Button from "../components/button";
import Input from "../components/input";
import TextInput from '../components/text-input'
import AsyncButton from "../components/async-button";
import { SERVER } from "../constants";
import FullscreenLoader from "../components/fullscreen-loader";
import { colors } from "../styles";

export default class Recycle extends Component {
    constructor(props) {
      super(props);
  
      this.paymentTypeButtons = [
        { label: "CASH", value: "cash", pressed: true },
        { label: "EFTPOS", value: "EFTPOS", pressed: false }
      ];
  
      this.productTypes = [
        { label: "Biochar (bucket)", value: "BIOCHAR_BKT" },
        { label: "Biochar (1L volume)", value: "BIOCHAR_VOL" },
        { label: "Community Crafts", value: "COMM_CRAFT" },
        { label: "Tag 'N Test", value: "TAG_TEST" },
        { label: "Mulch bucket swap", value: "MLCH_BKT_SWP" },
        { label: "Battery Buckets", value: "BATT_BKT" },
        { label: "Plant Sales", value: "PLANT_SALE" },
        { label: "Refillery", value: "REFILL" },
        { label: "Toki Straws", value: "TOKI_STRAWS" },
        { label: "Reusable bags or picnic kits", value: "REUSE_BAG_PICNIC" },
        { label: "Coastal Cabin Products", value: "COASTAL_CABIN" },
        { label: "Items for sale", value: "ITEMS_FOR_SALE" }
  
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

      this.setSelectedValue = this.setSelectedValue.bind(this)
    }

    setSelectedValue(value) {
        this.setState({productType: value})
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
           
            <Picker
                selectedValue={this.state.productType}
                style={{ height: 50, width: 150 }}
                onValueChange={(value, itemIndex) => this.setSelectedValue(value)}
            >
                {this.productTypes.map(({label, value}) => (
                    <Picker.Item label={label} value={value} />
                ))}
                
            </Picker>

            <Input
              keyboardType="decimal-pad"
              value={this.state.paymentAmount}
              onChangeText={value => this.setState({ paymentAmount: value })}
              placeholder="Enter amount *"
              onSubmit={async value => {
                this.setState({ paymentAmount: value, loading: true });
  
                const { paymentAmount, paymentType, productType, comment } = this.state;
  
                // try {
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
                // } catch (error) {
                //   this.setState({
                //     loading: false,
                //     errorUploading: true,
                //     statusText: `Upload unsuccessful ${JSON.stringify(error)}`
                //   });
                // }
                // }
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
  