import React from "react";
import { render, fireEvent } from "@testing-library/react";
import ConfirmEligibility from "./ConfirmEligibility";
import App from "../App";

test("renders without crashing", () => {
  render(<ConfirmEligibility handleEligibleStatus={() => {}} />);
});

test("if elements appear on screen", () => {
  const mockHandleEligibleStatus = jest.fn();
  const { getByText, getByTestId } = render(
    <ConfirmEligibility handleEligibleStatus={mockHandleEligibleStatus} />
  );
  expect(getByText("Confirm eligibility")).toBeInTheDocument();
  expect(getByText("Check eligibility")).toBeInTheDocument();
  expect(getByTestId("businessComponent-checkbox")).toBeInTheDocument();
  expect(getByTestId("technicalUncertainty-checkbox")).toBeInTheDocument();
  expect(getByTestId("processOfExperimentation-checkbox")).toBeInTheDocument();
  expect(getByTestId("scientificPrinciples-checkbox")).toBeInTheDocument();
});

test("if handleEligibleStatus is called when clicking Check Eligibility button", () => {
  const mockHandleEligibleStatus = jest.fn();
  const { getByTestId } = render(
    <ConfirmEligibility handleEligibleStatus={mockHandleEligibleStatus} />
  );
  fireEvent.click(getByTestId("checkEligibility-button"));
  expect(mockHandleEligibleStatus).toHaveBeenCalled();
});

test("if selecting all eligibility checkboxes displays calculator", () => {
  const { getByText, getByTestId } = render(<App />);

  fireEvent.click(getByTestId("businessComponent-checkbox"));
  fireEvent.click(getByTestId("technicalUncertainty-checkbox"));
  fireEvent.click(getByTestId("processOfExperimentation-checkbox"));
  fireEvent.click(getByTestId("scientificPrinciples-checkbox"));

  fireEvent.click(getByTestId("checkEligibility-button"));
  expect(getByText("Previous years QREs")).toBeInTheDocument();
});

test("if not selecting all eligibility checkboxes displays ineligibility message", () => {
  const { queryByText, getByTestId } = render(<App />);
  fireEvent.click(getByTestId("businessComponent-checkbox"));
  fireEvent.click(getByTestId("technicalUncertainty-checkbox"));
  fireEvent.click(getByTestId("checkEligibility-button"));

  expect(queryByText("Previous years QREs")).not.toBeInTheDocument();
  expect(getByTestId("eligibility-error")).toBeInTheDocument();
});
