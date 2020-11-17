import React, { Component } from "react";
import { Text, View, TouchableHighlight } from "react-native";
import PropTypes from "prop-types";
import { DialogComponent } from "react-native-dialog-component";
import { colors } from "../../styles";

export default class Order extends Component {
  constructor(props) {
    super(props);

    this.state = {};

    this.renderOrderLine = this.renderOrderLine.bind(this);
  }

  renderOrderLine({ value, label, paymentAmount, productQuantity }, index) {
    return (
      <TouchableHighlight
        key={index}
        index={index}
        style={{
          borderBottomWidth: 1,
          paddingTop: 10,
          paddingBottom: 10,
          paddingLeft: 10,
          paddingRight: 10,
          borderBottomColor: "black",
        }}
        underlayColor="red"
        onPress={() => this.props.removeFromOrder(index)}
      >
        <View
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "flex-end",
          }}
        >
          <Text>{label}</Text>
          <Text>{productQuantity}</Text>
          <Text>${(+paymentAmount).toFixed(2)}</Text>
        </View>
      </TouchableHighlight>
    );
  }

  render() {
    return (
      <View style={{ width: "85%", paddingTop: 20 }}>
        <View
          style={{
            borderBottomWidth: 1,
            borderBottomColor: colors.secondary,
          }}
        >
          <Text
            style={{
              fontWeight: "bold",
              color: colors.secondary,
              paddingLeft: 10,
              paddingBottom: 4,
            }}
          >
            ORDER
          </Text>
        </View>
        {this.props.order.map((order, index) =>
          this.renderOrderLine(order, index)
        )}
        <Text
          style={{
            textAlign: "right",
            paddingRight: 10,
            paddingTop: 10,
            fontWeight: "bold",
          }}
        >
          Total:{" $"}
          {this.props.order
            .reduce(
              (prev, curr) =>
                (prev += +curr.paymentAmount * +curr.productQuantity),
              0
            )
            .toFixed(2)}
        </Text>
      </View>
    );
  }
}

Order.propTypes = {
  order: PropTypes.array,
  showDialog: PropTypes.func,
  removeFromOrder: PropTypes.func,
};

Order.defaultProps = {
  order: [],
};
