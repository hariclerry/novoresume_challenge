import React from "react";
import { shallow, mount } from "enzyme";

import Home from "pages/home/home";

describe("<Home />", () => {
  const props = {
    showModal: jest.fn(),
  };
  it("renders Home component without crashing", () => {
    const wrapper = shallow(<Home {...props} />);
    expect(wrapper).toBeTruthy();
  });

  it("contains button div and shows modal on button click", () => {
    const wrapper = mount(<Home {...props} />);
    
    const value = wrapper.find(".btnv-1").at(0).text();
    wrapper.find(".btnv-1").at(0).simulate("click");
    expect(value).toEqual("Register Today");
  });

  it("accepts showModal props", () => {
    const wrapper = mount(<Home {...props} />);
    expect(wrapper.props().showModal).toEqual(props.showModal);
  });
});
