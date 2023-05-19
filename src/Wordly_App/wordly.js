import "./wordly.css";
import { GrammarlyEditorPlugin } from "@grammarly/editor-sdk-react";
import { useState } from "react";
import SpeechToText from "./speechToText.js";
import Alert from "../Alert";
import {Outlet} from "react-router-dom"
// import Button from './buttonFeature'
// import Dropdown from "./buttonFeature";

function Wordly() {
  const [text, setText] = useState("");
  const [mode, setMode] = useState("lightCol");
  const [bg, setBg] = useState("lightBg");
  const [btnCol, setBtnCol] = useState("lightBtnCol");
  const [alert, setAlert] = useState(null);
  const [btnAlertMsg, setBtnAlertMsg] = useState("Enable Dark Mode");


  const showAlert = (message, type) => {
    if (text.length > 0) {
      setAlert({
        msg: message,
        type: type,
      });
      setTimeout(() => {
        setAlert(null);
      }, 1500);
    }
  };

  const copyText = () => {
    let text = document.getElementById("textarea");
    text.select();
    navigator.clipboard.writeText(text.value);
    showAlert("Copied To Clipboard", "success");
  };
  const clearText = () => {
    let newText = "";
    setText(newText);
    showAlert("Clear Succesfully", "success");
  };
  const handleUpClick = () => {
    let newText = text.toUpperCase();
    setText(newText);
    showAlert("Converted to Uppercase Succesfully", "success");
  };
  const handleLoClick = () => {
    let newText = text.toLowerCase();
    setText(newText);
    showAlert("Converted to Lowercase Succesfully", "success");
  };

  const SpeechToText = () => {
    showAlert("Speech To Text Mode On", "success");
  };


  const handleExtraSpaces = () => {
    let newText = text.split(/[ ]+/);
    setText(newText.join(" "));
    showAlert("Extra Spaces Removed", "success");
  };
  const handleOnChange = (event) => {
    setText(event.target.value);
  };

  const togglemode = () => {
    if (mode === "lightCol") {
      setMode("darkCol");
      setBg("darkBg");
      setBtnCol("darkBtnCol");
      showAlert("Dark Mode has been Enabled", "success");
      setBtnAlertMsg("Disable Dark Mode");
    } else {
      setMode("lightCol");
      setBg("lightBg");
      setBtnCol("lightBtnCol");
      showAlert("Light Mode has been Enabled", "success");
      setBtnAlertMsg("Enable Dark Mode");
    }
  };

  return (
    <>
      <body className={bg}>
      <nav className={mode} togglemode={togglemode}>
          <header className="logo">Wordly</header>
          <ul>
            <div className="form-check form-switch">
              <input
                className="form-check-input"
                onClick={togglemode}
                type="checkbox"
                role="switch"
                id="flexSwitchCheckDefault"
              />
              <label
                className="form-check-label"
                htmlFor="flexSwitchCheckDefault"
              >
                {btnAlertMsg}
              </label>
            </div>
          </ul>
        </nav>
        <Alert alert={alert}></Alert>
        <div className=".body">
          <div className="container">
            <Outlet></Outlet>
            <h2>Wordly App</h2>
            <p>
            Wordly App is an app with grammar detection, word counting, case conversion, and speech-to-text capabilities. Perfect, create, and communicate effortlessly.
            </p>
            <GrammarlyEditorPlugin clientId="client_GeYrqyr2w8aDSQtgQ52rrD">
              <textarea
                id="textarea"
                className="textarea"
                maxLength="1000"
                placeholder="Start Writing Here."
                value={text}
                onChange={handleOnChange}
              ></textarea>
              {/* <Button>
           </Button> */}
              {/* <Dropdown></Dropdown> */}
            </GrammarlyEditorPlugin>
            <div className="buttonStyle">
              <button className={btnCol} onClick={copyText}>
                Copy
              </button>
              {/* <button className={btnCol} onClick={handleExtraSpaces}>
                Remove Spaces
              </button> */}
              <button className={btnCol} onClick={handleUpClick}>
                UPPER CASE
              </button>
              <button className={btnCol} onClick={handleLoClick}>
                lower case
              </button>

              <button className={btnCol} onClick={handleExtraSpaces}>
                Remove Extra Spaces
              </button>

              <a href={`/speechToText/`}> <button className={btnCol} onClick={SpeechToText}>🎙️</button></a>

              <button className={btnCol} onClick={clearText}>
                Clear
              </button>
            </div>
            <div className="counter-container"></div>
            <div className="counter-container">
              <p className="Tchar">
                Total Character : <span id="Total Word">{text.length}</span>
              </p>
              <p>
                Total Word :{" "}
                <span id="remaining-counter">
                  {
                    text.split(/\s+/).filter((element) => {
                      return element.length !== 0;
                    }).length
                  }
                </span>
              </p>
            </div>
          </div>
        </div>
      </body>
    </>
  );
}

export default Wordly;
