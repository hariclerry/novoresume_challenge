import React, { Component } from 'react';

import './product.scss';

export default class Product extends Component {
    increaseAmount = () => {
        this.props.onProductAmountChange(this.props.product.title, this.props.product.quantity + 1);
    };
    decreaseAmount = () => {
        this.props.onProductAmountChange(this.props.product.title, this.props.product.quantity - 1);
    };

    render() {
        const { imageNumber, product } = this.props;

        return (
            <div className="product">
                <div className="flex-row">
                    <img src={`${process.env.PUBLIC_URL}/images/items/${imageNumber}.png`} alt="" className="product-image" />
                    <div className="column">
                        <span className="product-price">${product && product.price}</span>
                        <div className="product-amount">
                            <span className="btn btn-minus" onClick={product && product.quantity > 0 ? this.decreaseAmount : undefined}>
                                -
                            </span>
                            <span className="product-amount-number">{product && product.quantity}</span>
                            <span className="btn btn-plus" onClick={this.increaseAmount}>
                                +
                            </span>
                        </div>
                    </div>
                </div>
                <h3 className="product-name">{product && product.title}</h3>
                <span className="product-subtitle">{product && product.subtitle}</span>
                <span className="product-description">{product && product.description}</span>
            </div>
        );
    }
}
