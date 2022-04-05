import React, { FC, StrictMode, useEffect, useState } from "react";
import "./App.sass";

import Header from "../Header/Header";
import Main from "../Main/Main";
import ThemeProvider from "@mui/material/styles/ThemeProvider";
import theme from "../../theme/theme";
import { BrowserRouter, Routes, Route } from "react-router-dom";

const App: FC = () => {
  const [isSearchClicked, setClicked] = useState(false);
  function ClickHandler() {
    setClicked((a) => !a);
  }

  return (
    <StrictMode>
      <BrowserRouter>
        <ThemeProvider theme={theme}>
          <div style={{ height: "200vh" }}>
            <Header isAuth ClickHandler={ClickHandler} />
            <Routes>
              <Route
                path="/"
                element={<Main isSearchOpen={isSearchClicked} />}
              />
            </Routes>
          </div>
        </ThemeProvider>
      </BrowserRouter>
    </StrictMode>
  );
};

export default App;
