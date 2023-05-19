import "./wordly.css";
import { GrammarlyEditorPlugin } from "@grammarly/editor-sdk-react";
import { useState } from "react";
import Alert from "../Alert";
import SpeechRecognition, {
    useSpeechRecognition,
  } from "react-speech-recognition";
// import Button from './buttonFeature'
// import Dropdown from "./buttonFeature";

function SpeechToText() {

  // const [text, setText] = useState("");
  // const text = 0;
  const [mode, setMode] = useState("lightCol");
  const [bg, setBg] = useState("lightBg");
  const [btnCol, setBtnCol] = useState("lightBtnCol");
  const [alert, setAlert] = useState(null);
  const [btnAlertMsg, setBtnAlertMsg] = useState("Enable Dark Mode");

  const showAlert = (message, type) => {
    // if (text.length > 0) {
      setAlert({
        msg: message,
        type: type,
      });
      setTimeout(() => {
        setAlert(null);
      }, 1500);
    
  };


  const clearText = () => {
   resetTranscript();
   showAlert("Text Cleared","success");
  };
  // const handleUpClick = () => {
  //   let newText = text.toUpperCase();
  //   setText(newText);
  //   showAlert("Converted to Uppercase Succesfully", "success");
  // };
  // const handleLoClick = () => {
  //   let newText = text.toLowerCase();
  //   setText(newText);
  //   showAlert("Converted to Lowercase Succesfully", "success");
  // };

  const stopListening = () => {
    SpeechRecognition.stopListening();
    showAlert("Listening Stop", "success");
  };

  const startListening = () => {
    SpeechRecognition.startListening({ continuous: true,language:'en-IN' })
    showAlert("Listening Mode On", "success");
  };
  // const handleOnChange = (event) => {
  //   setText(event.target.value);
  // };

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

  const { transcript, browserSupportsSpeechRecognition,resetTranscript} = useSpeechRecognition();
  if (!browserSupportsSpeechRecognition) {
    return <span>Your Brower doen't Support this feature</span>;
}

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
          <h2>Speech To Text Converter</h2>
            <p>
            Wordly App is an app that helps you write better English. It's like having a personal editor in your pocket.
            </p>
            <GrammarlyEditorPlugin clientId="client_GeYrqyr2w8aDSQtgQ52rrD">
      
            <div className="main-content">
                    {transcript}
                </div>
              {/* <Button>
           </Button> */}
              {/* <Dropdown></Dropdown> */}
            </GrammarlyEditorPlugin>
            <div className="buttonStyle">
              
            <button className={btnCol} onClick={startListening}>
                Start Listening
              </button>
              <button className={btnCol} onClick={stopListening}>
                Stop Listening
              </button>
              {/* <button className={btnCol} onClick={handleUpClick}>
                UPPER CASE
              </button>
              <button className={btnCol} onClick={handleLoClick}>
                lower case
              </button> */}
              <button className={btnCol} onClick={clearText}>
                Clear
              </button>
            </div>
          </div>
        </div>
      </body>
    </>
  );
}

export default SpeechToText;
