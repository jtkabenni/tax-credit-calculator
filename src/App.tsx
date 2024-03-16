import React, { useState } from "react";
import EstimateCreditForm from "./EstimateCreditForm";
import "./App.css";
import ConfirmEligibility from "./ConfirmEligibility";

function App() {
  const [isEligible, setIsEligible] = useState(false);

  function handleEligibleStatus(isEligible: boolean) {
    setIsEligible(isEligible);
  }

  return (
    <div className="flex flex-col w-full justify-center my-8">
      <h1 className="text-3xl font-bold text-center text-blue-600">
        Get your R&D credit estimate
      </h1>
      <ConfirmEligibility handleEligibleStatus={handleEligibleStatus} />
      {isEligible ? (
        <EstimateCreditForm />
      ) : (
        <div className="m-auto w-1/2">
          <i>
            You must meet all the criteria above to be be eligible for the R&D
            credit
          </i>
        </div>
      )}
    </div>
  );
}

export default App;
