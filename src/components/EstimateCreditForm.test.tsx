import React from "react";
import { render, screen } from "@testing-library/react";
import EstimateCreditForm from "./EstimateCreditForm";

test("renders without crashing", () => {
  render(<EstimateCreditForm />);
});
