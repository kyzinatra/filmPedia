import React, { FC, StrictMode } from "react";
import "./App.sass";

import Header from "../Header/Header";
import Main from "../Main/Main";

const App: FC = () => {
  return (
    <StrictMode>
      <div style={{ height: "200vh" }}>
        <Header isAuth />
        <Main />
      </div>
    </StrictMode>
  );
};

export default App;
