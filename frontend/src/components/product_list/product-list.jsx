import React, { Component } from 'react';
import Product from '../product/product';

import './product-list.scss';
export default class ProductList extends Component {
    render() {
        const { products, onProductAmountChange, saveProducts } = this.props;
        return (
            <section id="selectProducts">
                <div className="header-wrapper">
                    <h3 className="text-white">Step 1: Select Products</h3>
                    <div className="btnv-1" onClick={saveProducts}>
                        <span>Save Products</span>
                    </div>
                </div>
                <div className="product-list">
                    {products.map((product, index) => (
                        <Product
                            product={product}
                            key={`index-${index + 1}`}
                            imageNumber={index + 1}
                            onProductAmountChange={onProductAmountChange}
                        />
                    ))}
                </div>
            </section>
        );
    }
}
