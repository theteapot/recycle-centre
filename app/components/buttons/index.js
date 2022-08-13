import React, { Component } from "react";
import view from "./view";
import PropTypes from "prop-types";

export default class Button extends Component {
  constructor(props) {
    super(props);
    this._pressButton = this._pressButton.bind(this);
    this.state = {
      buttonIsSelected: false,
      buttons: this.props.buttons
    };
  }


  _pressButton(index) {
    this.props.onChange(index);
  }

  render() {
    return view.apply(this);
  }
}

Button.propTypes = {
  value: PropTypes.string,
  buttons: PropTypes.array.isRequired,
  multiSelect: PropTypes.bool,
  direction: PropTypes.oneOf(["horizontal", "vertical"]),
  onChange: PropTypes.func.isRequired,
  style: PropTypes.object
};

Button.defaultProps = {
  direction: "horizontal",
  multiSelect: false
};
