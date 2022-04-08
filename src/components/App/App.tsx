import React, { FC, Profiler, StrictMode, useState } from "react";
import "./App.sass";

import ThemeProvider from "@mui/material/styles/ThemeProvider";
import theme from "../../theme/theme";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Header from "../Header/Header";
import Main from "../Main/Main";
import Settings from "../Settings/Settings";
import Auth from "../Auth/Auth";
import Chat from "../Chat/Chat";
import Favorite from "../Favorite/Favorite";
import Footer from "../Footer/Footer";
import useMediaQuery from "@mui/material/useMediaQuery/useMediaQuery";
import useTheme from "@mui/material/styles/useTheme";

const App: FC = () => {
  const themeHook = useTheme();
  const isMobile = useMediaQuery(themeHook.breakpoints.down("sm"));
  const [isSearchClicked, setClicked] = useState(false);
  function ClickHandler() {
    setClicked((a) => !a);
  }

  return (
    <StrictMode>
      {/* <Profiler id="PROFILER" onRender={(...a) => console.log(a)}> */}
      <BrowserRouter>
        <ThemeProvider theme={theme}>
          <Header isAuth ClickHandler={ClickHandler} />
          <div
            style={{
              marginLeft: isMobile ? "0" : "120px",
              marginTop: isMobile ? "55px" : "0",
            }}
          >
            <Routes>
              <Route
                path="/"
                element={<Main isSearchOpen={isSearchClicked} />}
              />
              <Route path="/settings" element={<Settings />} />
              <Route path="/auth" element={<Auth />} />
              <Route path="/chat" element={<Chat />} />
              <Route path="/favorite" element={<Favorite />} />
            </Routes>
            <Footer />
          </div>
        </ThemeProvider>
      </BrowserRouter>
      {/* </Profiler> */}
    </StrictMode>
  );
};

export default App;
