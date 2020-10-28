import React, { Fragment } from "react";
import PropTypes from "prop-types";

import "./cards.scss";

const Cards = ({ items, isBlog, showModal }) => {
  const subTitle = !isBlog ? "What do we do?" : "Recent blog posts";
  return (
    <Fragment>
      <section id={`${isBlog ? "blog-posts" : "what-we-do"}`}>
        <div className="container">
          <h3 className={` ${isBlog ? "card-subtitle-blog" : "card-subtitle"}`}>
            {isBlog  ? <img
              src={`${process.env.PUBLIC_URL}/images/icons/pointer2.png`}
              alt="pointer symbol"
            /> :  <img
              src={`${process.env.PUBLIC_URL}/images/icons/pointer3.png`}
              alt="pointer symbol"
            />}
           {" "}
            {subTitle}
          </h3>
          <div className="flex-row">
            {items.map((item, index) => (
              <div className="display-card" key={index}>
                <div className={`${isBlog ? "card-img-blog" : "card-img"}`}>
                  <img src={item.image} alt={subTitle} className="landscape" />
                </div>
                <div
                  className={`card-title ${isBlog ? "card-title-blog" : ""}`}
                >
                  {item.title}
                </div>
                <div
                  className={`card-description ${
                    isBlog ? "card-description-blog" : ""
                  }`}
                >
                  {item.description}
                </div>
                {isBlog && <a href={item.link}>Read More... </a>}
              </div>
            ))}
          </div>
          {!isBlog && (
            <div className="work-button">
              <div className="btnv-1 wrk" onClick={showModal}>
                Try It Out Today
              </div>
            </div>
          )}
        </div>
      </section>
    </Fragment>
  );
};

Cards.propTypes = {
  isBlog: PropTypes.bool,
  showModal: PropTypes.func,
  items: PropTypes.array.isRequired,
};

export default Cards;
