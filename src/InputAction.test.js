import React from "react";
import { render, fireEvent } from "@testing-library/react";

import InputAction from "./InputAction";

describe("InputAction", () => {
  const props = {
    identifier: "example",
    inputProps: {
      onChange: jest.fn()
    },
    required: false,
    text: "Your Age:",
    value: ""
  };
  test("calls handler function on change", () => {
    const { getByLabelText } = render(<InputAction {...props} />);
    const input = getByLabelText("Your Age:");
    getByLabelText("Your Age:");
    fireEvent.change(input, {
      target: { value: "28" }
    });
    expect(props.inputProps.onChange).toBeCalled();
  });
});
