import React, { Component } from "react";
import {
  Text,
  View,
  KeyboardAvoidingView,
  ScrollView,
  RefreshControl,
} from "react-native";
import Header from "../../components/header";
import OrderBox from "./order-box";

import { SERVER } from "../../constants";

// const SERVER = process.env.REACT_APP_SERVER;

export default class History extends Component {
  constructor(props) {
    super(props);

    this.state = {
      orders: [],
      refreshing: false,
    };

    this.getOrders = this.getOrders.bind(this);
  }

  async getOrders(time) {
    let orders = await (await fetch(`${SERVER}/history`)).json();
    orders = orders.reverse();
    this.setState({ orders });
  }

  componentDidMount() {
    this.getOrders();
  }

  render() {
    return (
      <ScrollView
        refreshControl={
          <RefreshControl
            refreshing={this.state.refreshing}
            onRefresh={() => this.getOrders()}
          />
        }
      >
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
          <Header label="HISTORY" style={{ marginBottom: 10 }} />
          {this.state.orders.map(
            ({
              _id,
              productType,
              paymentType,
              paymentAmount,
              comment,
              timestamp,
            }) => (
              <OrderBox
                key={_id}
                productType={productType}
                paymentAmount={paymentAmount}
                paymentType={paymentType}
                comment={comment}
                timestamp={timestamp}
              />
            )
          )}
        </KeyboardAvoidingView>
      </ScrollView>
    );
  }
}
