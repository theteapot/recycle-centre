import React, { Component } from "react";
import view from "./view";
import PropTypes from "prop-types";

export default class Button extends Component {

    render() {
        return view.apply(this)
    }
}