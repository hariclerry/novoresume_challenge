import React, { Component } from 'react';
import { toast } from 'react-toastify';

import { registerUser } from '../../calls/calls';
import './registration-form.scss';
import TextInput from '../text_input/text-input';

export default class RegistrationForm extends Component {
    state = { userInfo: { firstName: '', lastName: '', email: '', password: '' } };

    onTextChange = (field, event) => {
        this.setState({
            ...this.state,
            userInfo: {
                ...this.state.userInfo,
                [field]: event.target.value
            }
        });
    };

    register = () => {
        const { email, password } = this.state.userInfo;
        if (email.length === 0 || password.length === 0) {
            toast.warn('Email and Password are mandatory');
        } else {
            registerUser(this.state.userInfo)
                .then(response => {
                    if (response.status === 200) {
                        toast.success('User Registered Successfully');
                        this.props.hideModal();
                    }
                })
                .catch(error => {
                    if (error.response.status === 409) {
                        toast.warn('Email exists, please choose another one');
                    } else toast.error('There was an error. Please try again');
                });
        }
    };
    render() {
        const { showModal } = this.props;
        const { firstName, lastName, email, password } = this.state.userInfo;
        return (
            <div className="form" id="registrationForm">
                <h3>Register</h3>
                <TextInput
                    id="firstName"
                    type="text"
                    label="First Name"
                    onChange={event => this.onTextChange('firstName', event)}
                    value={firstName}
                />
                <TextInput
                    id="lastName"
                    type="text"
                    label="Last Name"
                    onChange={event => this.onTextChange('lastName', event)}
                    value={lastName}
                />
                <TextInput id="email" type="email" label="Email" onChange={event => this.onTextChange('email', event)} value={email} />
                <TextInput
                    id="password"
                    type="text"
                    label="Password"
                    onChange={event => this.onTextChange('password', event)}
                    value={password}
                />
                <div className="btnv-1" onClick={this.register}>
                    <span>Register</span>
                </div>
                <div className="link" onClick={() => showModal('login')}>
                    Already have an account? Sign In
                </div>
            </div>
        );
    }
}
