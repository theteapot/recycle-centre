import React, { Component } from "react";
import view from "./view";
import PropTypes from "prop-types";

export default class Button extends Component {
  constructor(props) {
    super(props);
    this._pressButton = this._pressButton.bind(this);
    this.state = {
      buttons: this.props.buttons
    };
  }

  _pressButton(index) {
    // Marks a button as pressed, optionally unmarks others
    // this.setState({
    //   buttons: this.state.buttons.map((value, i) => {
    //     if (i === index) {
    //       return { ...value, pressed: true };
    //     } else if (!this.props.multiSelect) {
    //       return { ...value, pressed: false };
    //     }
    //   })
    // });
    // this.props.onChange(
    //   this.state.buttons.filter(({ pressed }) => pressed === true)
    // );
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
