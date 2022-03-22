
import React from "react";
import ReactDOM from "react-dom"
import App from "./components/App/App";
import "./sass/main.sass"
console.log("PRODMODE")
ReactDOM.hydrate(<App/>, document.getElementById("root"))