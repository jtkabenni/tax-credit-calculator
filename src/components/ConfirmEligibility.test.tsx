import React from "react";
import { render, screen } from "@testing-library/react";
import ConfirmEligibility from "./ConfirmEligibility";

test("renders without crashing", () => {
  render(<ConfirmEligibility handleEligibleStatus={() => {}} />);
});
