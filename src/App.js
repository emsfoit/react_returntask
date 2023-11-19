import * as React from "react";
import { useSelector } from "react-redux";
import "./App.css";
import Step1 from "./componenets/Return/Form/Step1";
import Step2 from "./componenets/Return/Form/Step2";
import Step3 from "./componenets/Return/Form/Step3";

function App() {
  const step = useSelector((state) => state.return.step);
  return (
    <div className="App">
      {/* center */}
      <h1 style={{ textAlign: "center" }}>Return Form</h1>
      <div style={{ display: "flex", justifyContent: "center" }}>
        <div style={{ maxWidth: "500px" }}>
          {step === 1 && <Step1 />}
          {step === 2 && <Step2 />}
          {step === 3 && <Step3 />}
          {step === 4 && <div> Thank you for your return request</div>}
        </div>
      </div>
    </div>
  );
}

export default App;
