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
    <div>
      <h1>Calculate your R&D credit estimate</h1>
      <h2>
        First, confirm your research and development activity is eligible for
        the R&D credit
      </h2>
      <div>
        <label>
          <input
            type="checkbox"
            name="businessComponent"
            checked={eligibilityCheckboxes.businessComponent}
            onChange={handleCheckboxChange}
          />
          Permitted purpose
        </label>
        <Tooltip
          text="Activity is is related to creating a new or improving an existing
        business component"
        ></Tooltip>
      </div>
      <div>
        <label>
          <input
            type="checkbox"
            name="technicalUncertainty"
            checked={eligibilityCheckboxes.technicalUncertainty}
            onChange={handleCheckboxChange}
          />
          Elimination of uncertainty
        </label>
        <Tooltip
          text="The activity is aimed at addressing technological or scientific
        uncertainties through experimentation and innovation."
        ></Tooltip>
      </div>
      <div>
        <label>
          <input
            type="checkbox"
            name="processOrExperimentation"
            checked={eligibilityCheckboxes.processOrExperimentation}
            onChange={handleCheckboxChange}
          />
          Process of experimentation
        </label>
        <Tooltip
          text="The Activity involves a process by which you tested alternatives and
        resolved the uncertainty above."
        ></Tooltip>
      </div>
      <div>
        <label>
          <input
            type="checkbox"
            name="scientificPrinciples"
            checked={eligibilityCheckboxes.scientificPrinciples}
            onChange={handleCheckboxChange}
          />
          Technological in nature
        </label>
        <Tooltip
          text="The activity relies on the principles of physical, biological, or
        computer science or engineering."
        ></Tooltip>
      </div>
    </div>
  );
}
