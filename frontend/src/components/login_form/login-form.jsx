import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { toast } from 'react-toastify';
import PropTypes from "prop-types";

import { loginUser } from '../../Api/calls';
import './login-form.scss';

import TextInput from '../text_input/text-input';

class LoginForm extends Component {
    state = { email: '', password: '' };

    onTextChange = (field, event) => {
        this.setState({ [field]: event.target.value });
    };

    login = () => {
        const { email, password } = this.state;
        if (email.length === 0 || password.length === 0) {
            toast.warn('Please enter your credentials');
        } else {
            loginUser(this.state)
                .then(response => {
                    if (response.status === 200) {
                        localStorage.setItem('token', response.data.token);
                        if (response.data.userId)
                          localStorage.setItem("userId", response.data.userId);
                        this.props.setIsLoggedIn('token' in localStorage && localStorage.token !== 'undefined');
                        this.props.hideModal();
                        this.props.history.push('/offers');
                    }
                })
                .catch(error => {
                    console.log('errorrr', JSON.stringify(error));
                    if (error.response.status === 401) {
                        toast.warn('Invalid Credentials');
                    } else if (error.response.status === 404) {
                        toast.warn('User does not exist');
                    } else toast.error('There was an error. Please try again');
                });
        }
    };

    render() {
        const { email, password } = this.state;
        const { showModal } = this.props;
        return (
            <div className="form" id="login-form">
                <h3>Login</h3>
                <TextInput id="email" type="email" label="Email" onChange={event => this.onTextChange('email', event)} value={email} />
                <TextInput
                    id="password"
                    type="password"
                    label="Password"
                    onChange={event => this.onTextChange('password', event)}
                    value={password}
                />
                <div className="btnv-1" onClick={this.login}>
                    <span>Login</span>
                </div>
                <div className="link" onClick={() => showModal('registration')}>
                    Don’t have an account? Register Now
                </div>
            </div>
        );
    }
}

LoginForm.propTypes = {
  setIsLoggedIn: PropTypes.func.isRequired,
  hideModal: PropTypes.func.isRequired,
  showModal: PropTypes.func.isRequired,
};

export default withRouter(LoginForm);
