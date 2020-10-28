import React, { Component, Fragment } from 'react';
import PropTypes from "prop-types";

import onClickOutside from 'react-onclickoutside';

class ModalInner extends Component {
    handleClickOutsideModal = event => {
        this.props.handleClose();
    };
    render() {
        const { children } = this.props;

        return <Fragment>{children}</Fragment>;
    }
}
var clickOutsideConfig = {
    handleClickOutside: instance => {
        return instance.handleClickOutsideModal;
    }
};

ModalInner.propTypes = {
  handleClose: PropTypes.func.isRequired,
  children: PropTypes.element,
};
export default onClickOutside(ModalInner, clickOutsideConfig);
