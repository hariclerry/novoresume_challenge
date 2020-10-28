import React, { Component, Fragment } from "react";
import { toast } from "react-toastify";
import PropTypes from "prop-types";

import {
  generatePdf,
} from "Api/calls";


export default class PdfGenerator extends Component {
    generateOffer = () => {
      const { selectedSavedProducts, products, billingInfo } = this.props;
      const {
        firstName,
        lastName,
        address,
        postalCode,
        phoneNr,
        email,
      } = billingInfo;

      let totalPrice = 0;
      const getSelectedProducts = selectedSavedProducts.map((prod) => {
        const results = products.find((x) => x.title === prod.title);
        totalPrice = totalPrice + results.price * results.quantity;
        return results;
      });

      // This would look neat if placed in a file but not sure how to go about it.
      //The posibble solutions tried didn't work though.
      const html = `<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8" />
  <title>PDF Offer Template</title>
  <style>
    .offer-pdf {
      margin: auto;
      padding: 30px;
      font-size: 18px;
      line-height: 24px;
      font-family: "Helvetica Neue", "Helvetica";
      color: #313b47;
    }

    .sub-header {
      background-color: #f5f5f5;
      padding: 15px;
      border-radius: 10px;
      font-size: 1.4rem;
      font-weight: 700;
    }

    .details {
      font-size: 1rem;
      font-weight: 700;
    }

    .name {
      padding-left: 35px;
    }

    .billing-info {
      display: inline-block;
      padding: 20px 40px 5px 15px;
      width: 250px;
    }

    .address {
      padding-right: 50px;
    }

    .billing {
      display: block;
      margin-bottom: 1em;
    }

    .sub-header span:nth-child(2) {
      float: right;
    }

    .product {
      font-family: arial;
      text-align: left;
      margin-top: 35px;
      margin-bottom: 35px;
    }

    .product-ui {
      list-style: none;
      overflow: auto;
      padding-left: 0;
    }

    .product-li  {
      display: inline-block;
      line-height: 33px;
      margin-bottom: 20px;
      width: 400px;
    }

    .quantity {
      color: #6A6AC4;
      font-weight: 700;
      font-size: 1.2em;
      padding-right: 10px;
    }
  </style>
</head>
<body>
  <div class="offer-pdf">
    <div class="sub-header">Billing Information</div>
    <div class="billing">
      <div class="billing-info">
        <span class="details">First Name</span>
        <span class="details">Last Name</span>
        <p><span>${firstName}</span> <span class="name">${lastName}</span></p>
      </div>
      <div class="billing-info">
        <span class="details">Email</span>
        <p>${email}</p>
      </div>
      <div class="billing-info address">
        <span class="details">Billing Address</span>
        <p>${address}</p>
      </div>
      <div class="billing-info">
        <span class="details">Telephone Number</span>
        <p>${phoneNr}</p>
      </div>
      <div class="billing-info">
        <span class="details">Postal code</span>
        <p>${postalCode}</p>
      </div>
    </div>
    <div class="sub-header">Products</div>
    <div class="product">
    <ul class="product-ui">
      ${getSelectedProducts.map((data) => {
        return `
          <li class="product-li">
          <span>
          <h4>${data.title}</h4>
          <p> <span class="quantity">${data.quantity}x</span> <span>$${data.price}</span> </p>
          </span>
        </li>`;
      })}
      </ul>
    </div>
    <div class="sub-header sub-header-total">
      <span> Total</span>
      <span id="total">$${totalPrice.toFixed(2)}</span>
    </div>
  </div>

</body>

</html>`;
      const userId = localStorage.getItem("userId");

      try {
        if (
          (selectedSavedProducts.length === 0 && firstName === "") ||
          lastName === "" ||
          address === "" ||
          postalCode === "" ||
          phoneNr === "" ||
          email === ""
        ) {
          toast.warn("Please add billing info and products, then try again");
        } else {
          generatePdf(userId, html);
        }
      } catch (error) {
        toast.error("There was an error. Please try again");
      }
    };
  render() {
    return (
      <Fragment>
        <div className="header-wrapper">
          <h3 className="text-white">Step 3: Generate Offer</h3>
          <div className="btnv-1" onClick={this.generateOffer}>
            <span>Download PDF</span>
          </div>
        </div>
      </Fragment>
    );
  }
}

PdfGenerator.propTypes = {
  selectedSavedProducts: PropTypes.array.isRequired,
  products: PropTypes.array.isRequired,
  billingInfo: PropTypes.object.isRequired,
};

