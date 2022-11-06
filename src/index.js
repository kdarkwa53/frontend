import React from "react";
import ReactDOM from "react-dom";
import "./index.css";

import "@fortawesome/fontawesome-free/css/all.min.css";
import "bootstrap-css-only/css/bootstrap.min.css";
import "mdbreact/dist/css/mdb.css";
import AppWrapped from "./App";
import reportWebVitals from "./reportWebVitals";
// import alanBtn from "@alan-ai/alan-sdk-web";
// Import the functions you need from the SDKs you need



// alanBtn({
//   key: "f306c6965d8ec4ddc7bc0be19bd27e422e956eca572e1d8b807a3e2338fdd0dc/stage",
//   rootEl: document.getElementById("alan-btn")
// });

ReactDOM.render(

  <AppWrapped />,

  document.getElementById("root")
);

// ReactDOM.render(<App />, document.getElementById("root"));

// If you want to start measuring performance in your app, pass a function
// to log results (for exampnle: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
