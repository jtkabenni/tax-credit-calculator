import React from "react";
import { render, fireEvent } from "@testing-library/react";
import EstimateCreditForm from "./EstimateCreditForm";

test("renders without crashing", () => {
  render(<EstimateCreditForm />);
});

test("if elements appear on screen", () => {
  const { getByText } = render(<EstimateCreditForm />);
  expect(getByText("Previous years QREs")).toBeInTheDocument();
  expect(getByText("This year's QREs")).toBeInTheDocument();
});

test("if submitting empty form displays 'previous years qre` error message", () => {
  const { getByTestId, queryByTestId } = render(<EstimateCreditForm />);
  fireEvent.click(getByTestId("get-estimate-button"));
  expect(getByTestId("prev-years-error")).toBeInTheDocument();

  expect(queryByTestId("credit-estimation-message")).not.toBeInTheDocument();
});

test("submitting form after opting out of previous years qre displays credit estimate message", () => {
  const { getByTestId, queryByTestId } = render(<EstimateCreditForm />);
  fireEvent.click(getByTestId("isFirstYear-checkbox"));
  fireEvent.click(getByTestId("get-estimate-button"));
  expect(queryByTestId("credit-estimation-message")).toBeInTheDocument();
});
