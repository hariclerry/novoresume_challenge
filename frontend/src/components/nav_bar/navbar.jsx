import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import PropTypes from "prop-types";

import './navbar.scss';

class Navbar extends Component {
    logOut = () => {
        localStorage.clear();
        this.props.setIsLoggedIn(false);
    };

    render() {
        const { showModal, isLoggedIn } = this.props;
        return (
            <nav>
                <div className="flex-row container">
                    <a href="/" className="logo">
                        <img src={`${process.env.PUBLIC_URL}/images/icons/logo.png`} alt="logo"  />
                    </a>
                    {!isLoggedIn ? (
                        <ul>
                            <li className="btnv-1" onClick={() => showModal('registration')}>
                                <span>Register</span>
                            </li>
                            <li className="btnv-2" onClick={() => showModal('login')}>
                                <span>Sign In</span>
                            </li>
                        </ul>
                    ) : (
                        <ul>
                            <li className="btnv-2" onClick={this.logOut}>
                                <span>Log Out</span>
                            </li>
                        </ul>
                    )}
                </div>
            </nav>
        );
    }
}

Navbar.propTypes = {
  showModal: PropTypes.func.isRequired,
  setIsLoggedIn: PropTypes.func.isRequired,
  isLoggedIn: PropTypes.bool.isRequired,
};

export default withRouter(Navbar);
