import React, { FC, StrictMode, useState } from "react";
import "./App.sass";

import Header from "../Header/Header";
import Main from "../Main/Main";
import ThemeProvider from "@mui/material/styles/ThemeProvider";
import theme from "../../theme/theme";

const App: FC = () => {
  return (
    <StrictMode>
      <ThemeProvider theme={theme}>
        <div style={{ height: "200vh" }}>
          <Header isAuth />
          <Main />
        </div>
      </ThemeProvider>
    </StrictMode>
  );
};

export default App;
