import { Component } from "react";
import { SERVER } from "../../constants";

// const SERVER = process.env.REACT_APP_SERVER;
import view from "./view";

export default class Recycle extends Component {
  constructor(props) {
    super(props);

    this.paymentTypeButtons = [
      { label: "CASH", value: "cash", pressed: true },
      { label: "EFTPOS", value: "EFTPOS", pressed: false },
    ];

    this.productTypeButtons = [];

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

  async componentDidMount() {
    let { recycleProducts } = await (
      await fetch(`${SERVER}/products/recycling`)
    ).json();
    recycleProducts = recycleProducts.map((obj, i) => ({ ...obj, key: i }));
    this.setState({ productTypeButtons: recycleProducts });
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
