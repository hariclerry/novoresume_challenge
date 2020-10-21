import React, { Component, Fragment } from 'react';

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
export default onClickOutside(ModalInner, clickOutsideConfig);
