import React from "react";
import { shallow, mount } from "enzyme";

import Offers from "pages/offers/offers";

describe("<Offers />", () => {
  const props = {
    isLoggedIn: true,
  };

  it("renders Offers component without crashing", () => {
    const wrapper = shallow(<Offers {...props} />);
    expect(wrapper).toBeTruthy();
  });

  it("contains all button divs and shows modal on button click", () => {
    const wrapper = mount(<Offers {...props} />);

    const value1 = wrapper.find(".btnv-1").at(0).text();
    const value2 = wrapper.find(".btnv-1").at(1).text();
    const value3 = wrapper.find(".btnv-1").at(2).text();

    wrapper.find(".btnv-1").at(0).simulate("click");
    wrapper.find(".btnv-1").at(1).simulate("click");
    wrapper.find(".btnv-1").at(2).simulate("click");

    expect(value1).toEqual("Save Products");
    expect(value2).toEqual("Save Billing Info");
    expect(value3).toEqual("Download PDF");
  });

  it("accepts isLoggedIn props", () => {
    const wrapper = mount(<Offers {...props} />);
    expect(wrapper.props().isLoggedIn).toEqual(props.isLoggedIn);
  });

  it("Correctly updates the state when getAllItems() is called in componentDidMount", (done) => {
    let resolveGetUsers;

    let getAllItems = function () {
      return new Promise(function (resolve, reject) {
        resolveGetUsers = resolve;
      });
    };

    let wrapper = mount(<Offers getAllItems={getAllItems} {...props} />);

    resolveGetUsers = {
      firstName: "Jane",
      lastName: "Doe",
      address: "Anywhere",
      postalCode: "93830",
      phoneNr: "3883839",
      email: "janedoe@mail.com",
    };

    setImmediate(() => {
      expect(wrapper.update().state().billingInfo).toBeInstanceOf(Object);
      expect(typeof resolveGetUsers).toBe("object");

      done();
    });
  });

  it("should call onProductAmountChange when the button is clicked", () => {
    const wrapper = mount(<Offers {...props} />);

    const instance = wrapper.instance();
    jest.spyOn(instance, "onProductAmountChange");
    wrapper.find(".btn-plus").at(1).simulate("click");
    wrapper.find(".btn-minus").at(1).simulate("click");
    expect(instance.onProductAmountChange).toHaveBeenCalled();
  });

  it("should call the onTextChange()", () => {
    const wrapper = shallow(<Offers {...props} />);

    const value = "name";
    const onTextChange = jest.spyOn(wrapper.instance(), "onTextChange");
    wrapper.instance().onTextChange(value, { target: { value: "new value" } });
    expect(onTextChange).toBeCalled();
  });

  it("should call the saveProducts() and saves propduct", () => {
    const wrapper = mount(<Offers {...props} />);
    const saveProducts = jest.spyOn(wrapper.instance(), "saveProducts");
    wrapper.instance().saveProducts();
    wrapper.find(".btnv-1").at(0).simulate("click");
    expect(saveProducts).toBeCalled();
  });

  it("should call the saveBillingInfo()", () => {
    const wrapper = mount(<Offers {...props} />);

    const saveBillingInfo = jest.spyOn(wrapper.instance(), "saveBillingInfo");
    wrapper.instance().saveBillingInfo();
    wrapper.find(".btnv-1").at(1).simulate("click");
    expect(saveBillingInfo).toBeCalled();
  });
});
