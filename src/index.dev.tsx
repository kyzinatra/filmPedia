import React from "react";
import ReactDOM from "react-dom";
import App from "./components/App/App";
import "./sass/main.sass";
console.log("DEVMODE");

import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { FIREBASE_CONFIG } from "./ts/API";

const app = initializeApp(FIREBASE_CONFIG);
const auth = getAuth(app);
ReactDOM.render(<App />, document.getElementById("root"));
