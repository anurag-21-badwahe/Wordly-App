import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
// import App from './App';
import Wordly from "./Wordly_App/wordly";
import SpeechToText from "./Wordly_App/speechToText";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Wordly></Wordly>,
  },
  {
    path: "/speechToText/",
    element: <SpeechToText/>,
  }
]);
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
