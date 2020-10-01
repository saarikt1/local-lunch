import React from "react";
import { shallow } from "enzyme";
import Header from "./Header";

describe("<Header />", () => {
  it("renders without crashing", () => {
    shallow(<Header />);
  });

  it("renders page header", () => {
    const wrapper = shallow(<Header />);

    expect(wrapper.text().includes("Lunch Near Me")).toBe(true);
  });
});
