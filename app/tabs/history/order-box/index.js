import React, { Component } from "react";
import { Text, View, RefreshControl } from "react-native";
import PropTypes from "prop-types";
import { colors } from "../../../styles";

export default class OrderBox extends Component {
  formatDateString(date) {
    date = new Date(date);
    return `${date.toLocaleTimeString()} ${date.toDateString()}`;
  }

  render() {
    const {
      productType,
      paymentType,
      paymentAmount,
      comment,
      timestamp,
    } = this.props;

    return (
      <View
        style={{
          borderBottomColor: colors.primaryDark,
          borderBottomWidth: 2,
          paddingBottom: 10,
        }}
      >
        <View style={{ display: "flex", flexDirection: "row" }}>
          <Text
            style={{
              fontSize: 12,
              backgroundColor: colors.white,
              color: colors.primaryDark,
              paddingTop: 5,
              borderBottomLeftRadius: 5,
              borderBottomRightRadius: 5,
              paddingLeft: 2,
              paddingRight: 2,
            }}
          >
            {this.formatDateString(timestamp)}
          </Text>
        </View>

        <View
          style={{
            display: "flex",
            width: 260,
            flexDirection: "row",
            justifyContent: "space-between",
          }}
        >
          <Text style={{ fontWeight: "bold", color: colors.primaryDark }}>
            {productType}
          </Text>
          <Text style={{ textTransform: "uppercase" }}>
            {paymentType}{" "}
            <Text style={{ fontWeight: "bold" }}>
              ${parseFloat(paymentAmount).toFixed(2)}
            </Text>
          </Text>
        </View>
        <Text style={{ fontStyle: "italic" }}>{comment}</Text>
      </View>
    );
  }
}

OrderBox.propTypes = {
  productType: PropTypes.string,
  paymentType: PropTypes.string,
  paymentAmount: PropTypes.string,
  comment: PropTypes.string,
  timestamp: PropTypes.string,
};
