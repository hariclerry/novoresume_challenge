import React, { Component } from 'react';
import TextInput from '../text_input/text-input';
import './customer-info.scss';

export default class CustomerInfo extends Component {
    render() {
        const { firstName, lastName, email, address, postalCode, phoneNr } = this.props.billingInfo;
        const { onTextChange, saveBillingInfo } = this.props;
        return (
            <section id="addCustomerInfo">
                <div className="header-wrapper">
                    <h3 className="text-white">Step 2: Add Customer Billing Information</h3>
                    <div className="btnv-1" onClick={saveBillingInfo}>
                        <span>Save Billing Info</span>
                    </div>
                </div>
                <div className="form">
                    <TextInput
                        id="firstName"
                        type="text"
                        label="First Name"
                        mandatory
                        onChange={event => onTextChange('firstName', event)}
                        value={firstName}
                    />
                    <TextInput
                        id="lastName"
                        type="text"
                        label="Last Name"
                        mandatory
                        onChange={event => onTextChange('lastName', event)}
                        value={lastName}
                    />
                    <TextInput
                        id="address"
                        type="text"
                        label="Billing Address"
                        mandatory
                        onChange={event => onTextChange('address', event)}
                        value={address}
                    />

                    <TextInput
                        id="postalCode"
                        type="text"
                        label="Postal Code"
                        mandatory
                        onChange={event => onTextChange('postalCode', event)}
                        value={postalCode}
                    />
                    <TextInput
                        id="phoneNr"
                        type="text"
                        label="Telephone Number"
                        mandatory
                        onChange={event => onTextChange('phoneNr', event)}
                        value={phoneNr}
                    />
                    <TextInput
                        id="email"
                        type="email"
                        label="Email"
                        mandatory
                        onChange={event => onTextChange('email', event)}
                        value={email}
                    />
                </div>
            </section>
        );
    }
}
