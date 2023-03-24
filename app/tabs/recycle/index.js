import { Component } from "react";
import { SERVER } from "../../constants";

// const SERVER = process.env.REACT_APP_SERVER;
import view from "./view";

export default class Recycle extends Component {
  constructor(props) {
    super(props);

    this.paymentTypeButtons = [
      { label: "CASH", value: "cash"},
      { label: "EFTPOS", value: "EFTPOS"},
    ];

    let index = 0;
    this.productTypeButtons = [
      { key: index++, label: "CARDBOARD", value: "CARDBOARD" },
      { key: index++, label: "POLY", value: "POLY" },
      { key: index++, label: "E-WASTE", value: "E-WASTE" },
      { key: index++, label: "BATTERIES", value: "BATTERIES" },
      { key: index++, label: "FOAM", value: "FOAM" },
      { key: index++, label: "PLASTIC FILM", value: "PLASTIC FILM" },
      { key: index++, label: "PLASTIC MIXED", value: "PLASTIC MIXED" },
      { key: index++, label: "BIOCHAR", value: "BIOCHAR" },
      { key: index++, label: "BOKASHI", value: "BOKASHI" },
      { key: index++, label: "FOODSCRAPS", value: "FOODSCRAPS" },
      { key: index++, label: "CARDS", value: "CARDS" },
      { key: index++, label: "SOFT PLASTIC", value: "SOFT PLASTIC" },
      { key: index++, label: "HARD PLASTIC", value: "HARD PLASTIC" },
      { key: index++, label: "LIGHTBULBS", value: "LIGHTBULBS" },
    ];

    this.state = {
      paymentType: "cash",
      productType: "",
      paymentAmount: "",
      comment: "",
      statusText: "",
      paymentTypeButtons: this.paymentTypeButtons,
      productTypeButtons: this.productTypeButtons,
    };

    this.setSelectedValue = this.setSelectedValue.bind(this);
    this.submitRecycle = this.submitRecycle.bind(this);
    this.validateForm = this.validateForm.bind(this);
  }

  setSelectedValue(value) {
    this.setState({ productType: value.value });
  }

  validateForm() {
    let { productType, paymentAmount, comment, paymentType } = this.state;
    let status = [];

    if (productType == "") {
      status.push("Select a product");
    }
    if (paymentAmount == "") {
      status.push("Enter a payment amount");
    }
    if (paymentType == "") {
      status.push("Select a payment type");
    }

    return status;
  }

  async submitRecycle(value) {
    let status = this.validateForm();
    if (status.length > 0) {
      this.setState({ errorUploading: true, statusText: status.join(", ") });
      return;
    }

    this.setState({ paymentAmount: value });

    const { paymentAmount, paymentType, productType, comment } = this.state;

    try {
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
        errorUploading: false,
        statusText: "Upload successful",
        paymentAmount: "",
        comment: "",
        // paymentType: "",
        // productType: "",
        productTypeButtons: this.productTypeButtons,
        paymentTypeButtons: this.paymentTypeButtons,
      });
    } catch (error) {
      this.setState({
        errorUploading: true,
        statusText: `Upload unsuccessful ${JSON.stringify(error)}`,
      });
    }
  }

  render() {
    return view.apply(this);
  }
}
