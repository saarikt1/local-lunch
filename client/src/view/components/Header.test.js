import React from "react";
import { render } from "@testing-library/react";
import Header from "./Header";

describe("<Header />", () => {
  it("renders header text", () => {
    const { getByText } = render(<Header />);
    expect(getByText("Lunch Near Me")).toBeInTheDocument();
  });
});
