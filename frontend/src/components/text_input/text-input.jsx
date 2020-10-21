import React, { Component } from 'react';

import './text-input.scss';

export default class TextInput extends Component {
    render() {
        const { label, id, type, mandatory, onChange, value } = this.props;

        return (
            <div className="text-input">
                <label htmlFor={id}>
                    {label} {mandatory ? <span className="text-red">*</span> : undefined}
                </label>
                <input type={type} id={id} defaultValue={value} onChange={onChange} />
            </div>
        );
    }
}
