import React, { useState } from "react";
import CalculateCreditForm from "./CalculateCreditForm";
import "./App.css";
import ConfirmEligibility from "./ConfirmEligibility";

function App() {
  const [isEligible, setIsEligible] = useState(false);

  function handleEligibleStatus(isEligible: boolean) {
    setIsEligible(isEligible);
  }

  return (
    <div className="App">
      <ConfirmEligibility handleEligibleStatus={handleEligibleStatus} />
      {isEligible && <CalculateCreditForm />}
    </div>
  );
}

export default App;
