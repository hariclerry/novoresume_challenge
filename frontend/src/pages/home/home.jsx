import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";

import Cards from "components/cards/cards";
import { blogs, portofolio } from "Api/mock-data/mock";
import "./home.scss";
export default class Home extends Component {
  render() {
    const { showModal } = this.props;
    return (
      <Fragment>
        <section id="main-header">
          <div className="flex-row container">
            <div className="header-mid">
              <h1 className="header-text1">
                A better, faster and smarter way of building your offers.
              </h1>
              <p className="header-text2">
                Increase revenue and outshine competition. All for the price of
                a coffee.
              </p>
              <span>
                <div className="btnv-1" onClick={showModal}>
                  Register Today
                </div>
              </span>
            </div>
            <div className="header-img">
              <img
                src={`${process.env.PUBLIC_URL}/images/background/header.png`}
                alt="logo"
              />
            </div>
          </div>
        </section>
        <Cards items={portofolio} showModal={showModal} />
        <Cards items={blogs} isBlog />
      </Fragment>
    );
  }
}

Home.propTypes = {
  showModal: PropTypes.func.isRequired,
};
