import React, { useState, useEffect } from "react";

interface ConfirmEligibilityProps {
  handleEligibleStatus: (isEligible: boolean) => void;
}

export default function ConfirmEligibility({
  handleEligibleStatus,
}: ConfirmEligibilityProps) {
  // retrieve stored checkbox data
  const storedEligibilityCheckboxesData = window.localStorage.getItem(
    "eligibilityCheckboxes"
  );
  // set initial checkbox state based on local storage
  const initialEligibilityCheckboxesState = storedEligibilityCheckboxesData
    ? JSON.parse(storedEligibilityCheckboxesData)
    : {
        businessComponent: false,
        technicalUncertainty: false,
        processOfExperimentation: false,
        scientificPrinciples: false,
      };

  const [eligibilityCheckboxes, setEligibilityCheckboxes] = useState(
    initialEligibilityCheckboxesState
  );

  // storing updates to checkboxes to local storage
  useEffect(() => {
    window.localStorage.setItem(
      "eligibilityCheckboxes",
      JSON.stringify(eligibilityCheckboxes)
    );
  }, [eligibilityCheckboxes]);

  const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = event.target;
    setEligibilityCheckboxes(
      (prevState: typeof initialEligibilityCheckboxesState) => ({
        ...prevState,
        [name]: checked,
      })
    );
  };

  function checkEligibility() {
    const isEligible = Object.values(eligibilityCheckboxes).every(Boolean);
    handleEligibleStatus(isEligible);
  }

  return (
    <div className="m-auto py-4 w-1/2">
      <h3 className="text-xl font-semibold text-blue-600 mt-3 mb-2">
        Confirm eligibility
      </h3>
      <p>
        <i>
          Please select all the options that are consistent with the R&D
          activity at your company.
        </i>
      </p>
      <h2></h2>
      <div className="py-1">
        <label className="">
          <input
            type="checkbox"
            name="businessComponent"
            checked={eligibilityCheckboxes.businessComponent}
            onChange={handleCheckboxChange}
            data-testid="businessComponent-checkbox"
          />
          <span className="px-1">
            <b>The activity has a permitted purpose</b> - The activity
            contributes to developing or improving the functionality, quality,
            reliability or performance of a business component.
          </span>
        </label>
      </div>
      <div className="py-1">
        <label>
          <input
            type="checkbox"
            name="technicalUncertainty"
            checked={eligibilityCheckboxes.technicalUncertainty}
            onChange={handleCheckboxChange}
            data-testid="technicalUncertainty-checkbox"
          />
          <span className="px-1">
            <b>The activity aimed to eliminate uncertainty</b> - The activity is
            aimed at addressing technological or scientific uncertainties
            through experimentation and innovation.
          </span>
        </label>
      </div>
      <div className="py-1">
        <label>
          <input
            type="checkbox"
            name="processOfExperimentation"
            checked={eligibilityCheckboxes.processOfExperimentation}
            onChange={handleCheckboxChange}
            data-testid="processOfExperimentation-checkbox"
          />
          <span className="px-1">
            <b>My company went through a process of experimentation</b> - The
            activity involves a systematic process to identify and evaluate
            different alternatives to achieve the intended result.
          </span>
        </label>
      </div>
      <div className="py-1">
        <label>
          <input
            type="checkbox"
            name="scientificPrinciples"
            checked={eligibilityCheckboxes.scientificPrinciples}
            onChange={handleCheckboxChange}
            data-testid="scientificPrinciples-checkbox"
          />
          <span className="px-1">
            <b>The activity was scientific in nature</b> - The activity relies
            on the principles of engineering, physics, chemistry, computer
            science, or other scientific disciplines.
          </span>
        </label>
      </div>
      <button
        onClick={checkEligibility}
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 mt-2 rounded focus:outline-none focus:shadow-outline "
        data-testid="checkEligibility-button"
      >
        Check eligibility
      </button>
    </div>
  );
}
