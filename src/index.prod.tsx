
import React from "react";
import ReactDOM from "react-dom"
import App from "./components/App/App";
console.log("PRODMODE")
ReactDOM.hydrate(<App/>, document.getElementById("root"))