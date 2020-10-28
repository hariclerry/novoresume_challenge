import React, { Component } from 'react';
import PropTypes from "prop-types";

import ModalInner from './modal-inner';
import './modal.scss';
export default class Modal extends Component {
    render() {
        const { handleClose, show, children } = this.props;
        const showHideClassName = show !== 'none' ? 'modal display-block' : 'modal display-none';

        return (
            <div className={showHideClassName}>
                <ModalInner handleClose={handleClose}>
                    <section className="modal-main">{children}</section>
                </ModalInner>
            </div>
        );
    }
}

Modal.propTypes = {
  handleClose: PropTypes.func.isRequired,
  show: PropTypes.string.isRequired,
  children: PropTypes.element,
};
