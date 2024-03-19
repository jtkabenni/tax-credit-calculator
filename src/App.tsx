import React, { useState } from "react";
import EstimateCreditForm from "./components/EstimateCreditForm";
import "./App.css";
import ConfirmEligibility from "./components/ConfirmEligibility";

function App() {
  const [isEligible, setIsEligible] = useState(false);
  const [isSubmitted, setSubmitted] = useState(false);
  function handleEligibleStatus(isEligible: boolean) {
    setIsEligible(isEligible);
    setSubmitted(true);
  }

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
            <div className="m-auto w-1/2 text-red-500">
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
