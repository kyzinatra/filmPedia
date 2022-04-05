import React, { FC, StrictMode, useState } from "react";
import "./App.sass";

import ThemeProvider from "@mui/material/styles/ThemeProvider";
import theme from "../../theme/theme";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Header from "../Header/Header";
import Main from "../Main/Main";
import Settings from "../Settings/Settings";
import Registration from "../Registration/Registration";
import Chat from "../Chat/Chat";
import Favorite from "../Favorite/Favorite";
import Footer from "../Footer/Footer";

const App: FC = () => {
  const [isSearchClicked, setClicked] = useState(false);
  function ClickHandler() {
    setClicked((a) => !a);
  }

  return (
    <StrictMode>
      <BrowserRouter>
        <ThemeProvider theme={theme}>
          <Header isAuth ClickHandler={ClickHandler} />
          <Routes>
            <Route path="/" element={<Main isSearchOpen={isSearchClicked} />} />
            <Route path="/settings" element={<Settings />} />
            <Route path="/registration" element={<Registration />} />
            <Route path="/chat" element={<Chat />} />
            <Route path="/favorite" element={<Favorite />} />
          </Routes>
          <Footer />
        </ThemeProvider>
      </BrowserRouter>
    </StrictMode>
  );
};

export default App;
