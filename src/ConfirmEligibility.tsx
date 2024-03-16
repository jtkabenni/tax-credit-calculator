import Tooltip from "./Tooltip";
import React, { useState, useEffect } from "react";

interface ConfirmEligibilityProps {
  handleEligibleStatus: (isEligible: boolean) => void;
}

export default function ConfirmEligibility({
  handleEligibleStatus,
}: ConfirmEligibilityProps) {
  const [eligibilityCheckboxes, setEligibilityCheckboxes] = useState({
    businessComponent: false,
    technicalUncertainty: false,
    processOrExperimentation: false,
    scientificPrinciples: false,
  });

  const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = event.target;
    setEligibilityCheckboxes((prevState) => ({
      ...prevState,
      [name]: checked,
    }));
  };

  useEffect(() => {
    // Calculate isEligible based on checkbox values
    const isEligible = Object.values(eligibilityCheckboxes).every(Boolean);
    handleEligibleStatus(isEligible);
  }, [eligibilityCheckboxes, handleEligibleStatus]);
  return (
    <div className="m-auto py-4 w-1/2">
      <h2>
        First, confirm your company's research and development activity is
        eligible for the R&D credit.
      </h2>
      <div className="py-1">
        <label className="">
          <input
            type="checkbox"
            name="businessComponent"
            checked={eligibilityCheckboxes.businessComponent}
            onChange={handleCheckboxChange}
          />{" "}
          Permitted purpose{" "}
        </label>
        <Tooltip
          text="The activity is related to creating a new or improving an existing
        business component"
        ></Tooltip>
      </div>
      <div className="py-1">
        <label>
          <input
            type="checkbox"
            name="technicalUncertainty"
            checked={eligibilityCheckboxes.technicalUncertainty}
            onChange={handleCheckboxChange}
          />{" "}
          Elimination of uncertainty{" "}
        </label>
        <Tooltip
          text="The activity is aimed at addressing technological or scientific
        uncertainties through experimentation and innovation."
        ></Tooltip>
      </div>
      <div className="py-1">
        <label>
          <input
            type="checkbox"
            name="processOrExperimentation"
            checked={eligibilityCheckboxes.processOrExperimentation}
            onChange={handleCheckboxChange}
          />{" "}
          Process of experimentation{" "}
        </label>
        <Tooltip text="The activity involves a systematic process to identify and evaluate different alternatives to achieve the intended result."></Tooltip>
      </div>
      <div className="py-1">
        <label>
          <input
            type="checkbox"
            name="scientificPrinciples"
            checked={eligibilityCheckboxes.scientificPrinciples}
            onChange={handleCheckboxChange}
          />{" "}
          Technological in nature{" "}
        </label>
        <Tooltip
          text="The activity relies on the principles of engineering, physics, chemistry,
        computer science, or other scientific disciplines."
        ></Tooltip>
      </div>
    </div>
  );
}
