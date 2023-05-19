import "./buttonFeature.css";
import { useState } from "react";

const Button = () => {
  const [featureBtn, setFeatureBtn] = useState(false);
  const showDropDown = () => {
    setFeatureBtn(true);
  };

  const HideDropDown = () => {
    setFeatureBtn(false);
  };

  return (
    <div className="btnFtr">
      <div
        className="Feature"
        onMouseEnter={showDropDown}
        onMouseLeave={HideDropDown}
      >
        <button>
        New Features
        </button>
        {featureBtn? (<ul onMouseEnter={showDropDown}>
          <li>Convert To UpperCase</li> 
          <li>Convert To LowerCase</li>
          <li>Remove Extraspaces</li>
        </ul>):null}
        </div>
    </div>
  );
};
export default Button;

