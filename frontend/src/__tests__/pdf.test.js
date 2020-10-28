import React from "react";
import { shallow } from "enzyme";

import PdfGenerator from "pages/offers/pdf";

describe("<PdfGenerator />", () => {
  const props = {
    selectedSavedProducts: [
      {
        image: "/img1.png",
        title: "Item1",
        description: "You are probably familiar with free merchandise ",
        link: "/blogs",
      },
    ],
    products: [
      {
        image: "/img1.png",
        title: "Item1",
        description: "You are probably familiar with free merchandise ",
        link: "/blogs",
      },
    ],
    billingInfo: {
      firstName: "Jane",
      lastName: "Doe",
      address: "Somewhere",
      postalCode: "38932",
      phoneNr: "939382",
      email: "janedoe@mail.com",
    },
  };

  it("renders PdfGenerator component without crashing", () => {
    const wrapper = shallow(<PdfGenerator {...props} />);
    expect(wrapper).toBeTruthy();
  });

  it("contains button divs and shows modal on button click", () => {
    const wrapper = shallow(<PdfGenerator {...props} />);

    const value3 = wrapper.find(".btnv-1").text();
    wrapper.find(".btnv-1").simulate("click");
    expect(value3).toEqual("Download PDF");
  });

  it("should call the generateOffer()", () => {
    const wrapper = shallow(<PdfGenerator {...props} />);

    const generateOffer = jest.spyOn(wrapper.instance(), "generateOffer");
    wrapper.instance().generateOffer();
    expect(generateOffer).toBeCalled();
  });
});
