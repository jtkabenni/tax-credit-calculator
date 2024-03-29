import React, { useState, useEffect } from "react";
import EstimateCreditForm from "./components/EstimateCreditForm";
import "./App.css";
import ConfirmEligibility from "./components/ConfirmEligibility";

function App() {
  // retrieve stored isEligible and isSubmitted data
  const storedIsEligible = window.localStorage.getItem("isEligible");
  const storedIsSubmitted = window.localStorage.getItem("isSubmitted");

  // set initial isEligible and isSubmitted state based on local storage
  const initialIsEligibleState = storedIsEligible
    ? JSON.parse(storedIsEligible)
    : false;
  const initialIsSubmittedState = storedIsSubmitted
    ? JSON.parse(storedIsSubmitted)
    : false;

  const [isEligible, setIsEligible] = useState(initialIsEligibleState);
  const [isSubmitted, setSubmitted] = useState(initialIsSubmittedState);
  function handleEligibleStatus(isEligible: boolean) {
    setIsEligible(isEligible);
    setSubmitted(true);
  }

  // storing updates to isEligible and isSubmitted data to local storage
  useEffect(() => {
    window.localStorage.setItem("isEligible", JSON.stringify(isEligible));
  }, [isEligible]);

  useEffect(() => {
    window.localStorage.setItem("isSubmitted", JSON.stringify(isSubmitted));
  }, [isSubmitted]);

  return (
    <div className="flex flex-col w-full justify-center my-8">
      <h1 className="text-3xl font-bold text-center text-blue-600">
        Get your R&D credit estimate
      </h1>
      <ConfirmEligibility handleEligibleStatus={handleEligibleStatus} />
      {isSubmitted && (
        <>
          {isEligible ? (
            <EstimateCreditForm />
          ) : (
            <div
              className="m-auto w-1/2 text-red-500"
              data-testid="eligibility-error"
            >
              <i>
                You must meet all the criteria above to be be eligible for the
                R&D credit
              </i>
            </div>
          )}
        </>
      )}
    </div>
  );
}

export default App;
