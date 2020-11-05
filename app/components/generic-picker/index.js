import React, { Component } from "react";
import ModalPicker from "react-native-modal-selector";
import {
  View,
  Text,
  StyleSheet,
  KeyboardAvoidingView,
  ScrollView,
  Picker,
  Modal,
} from "react-native";
import PropTypes from "prop-types";
import { colors } from "../../styles";
import InputParent from "../input-parent";

export default class GenericPicker extends Component {
  render() {
    return (
      <InputParent label={this.props.label}>
        <ModalPicker
          optionStyle={{
            backgroundColor: colors.primary,
          }}
          optionTextStyle={{
            color: "white",
            textTransform: "uppercase",
          }}
          sectionStyle={{
            backgroundColor: colors.primary,
          }}
          cancelStyle={{
            backgroundColor: colors.primary,
            borderRadius: 5,
          }}
          cancelTextStyle={{
            textTransform: "uppercase",
            color: "white",
          }}
          selectStyle={{ borderWidth: 0 }}
          selectedKey={this.props.selectedKey}
          style={{
            borderWidth: 0,
            flexGrow: "2",
            justifyContent: "center",
          }}
          data={this.props.data}
          initValue={this.props.initValue}
          initValueTextStyle={{
            color: colors.disabled,
          }}
          onChange={this.props.onChange}
        />
      </InputParent>
    );
  }
}

GenericPicker.propTypes = {
  data: PropTypes.array,
  onChange: PropTypes.func,
  selectedKey: PropTypes.string,
  initValue: PropTypes.string,
  label: PropTypes.string,
};
