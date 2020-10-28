import React from "react";
import { shallow, mount } from "enzyme";

import Cards from "components/cards/cards";

describe("<Cards />", () => {
  const props = {
    items: [
      {
        image: "/img1.png",
        title: "Item1",
        description: "You are probably familiar with free merchandise ",
        link: "/blogs",
      },
    ],

    isBlog: false,
    showModal: jest.fn(),
  };
  it("renders Cards component without crashing", () => {
    const wrapper = shallow(<Cards {...props} />);
    expect(wrapper).toBeTruthy();
  });

  it("contains button div and shows modal on button click", () => {
    const wrapper = mount(<Cards {...props} />);

    const value = wrapper.find(".wrk").text();
    wrapper.find(".wrk").simulate("click");
    expect(value).toEqual("Try It Out Today");
  });

  it("accepts showModal props", () => {
    const wrapper = mount(<Cards {...props} />);
    expect(wrapper.props().showModal).toEqual(props.showModal);
  });
});
