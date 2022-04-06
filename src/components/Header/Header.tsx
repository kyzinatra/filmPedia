import React, { FC, useState, useEffect } from "react";

import SearchIcon from "@mui/icons-material/Search";
import FavoriteIcon from "@mui/icons-material/Favorite";
import MenuIcon from "@mui/icons-material/Menu";

import ChatIcon from "@mui/icons-material/Chat";
import SettingsIcon from "@mui/icons-material/Settings";
import IconButton from "@mui/material/IconButton/IconButton";
import "./Header.sass";

import Avatar from "./Nav/Avatar/Avatar";
import NavButton from "./Nav/NavButton/NavButton";
import Slide from "@mui/material/Slide/Slide";
import Fade from "@mui/material/Fade/Fade";
import Box from "@mui/material/Box/Box";

import useMediaQuery from "@mui/material/useMediaQuery";
import useTheme from "@mui/material/styles/useTheme";
import ClickAwayListener from "@mui/base/ClickAwayListener/ClickAwayListener";

interface IHeader {
  isAuth?: boolean;
  ClickHandler: () => void;
}

const Header: FC<IHeader> = ({ isAuth, ClickHandler }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const [isHeaderOpen, setHeaderOpen] = useState(false);

  const StyledSearchIcon = <SearchIcon sx={{ fontSize: "1.7rem" }} />;
  const StyledFavoriteIcon = <FavoriteIcon sx={{ fontSize: "1.7rem" }} />;
  const StyledChatIcon = <ChatIcon sx={{ fontSize: "1.7rem" }} />;
  const StyledSettingsIcon = <SettingsIcon sx={{ fontSize: "1.7rem" }} />;

  function handleClickAway(event: MouseEvent | TouchEvent): void {
    const element = event.target;
    if (element instanceof Element) {
      const isNav = element.closest("#headerNav");
      if (isMobile && isHeaderOpen && !isNav) setHeaderOpen((a) => !a);
    }
  }

  useEffect(() => {
    if (isMobile) setHeaderOpen(false);
    else setHeaderOpen(true);
  }, [isMobile]);

  return (
    <>
      <Box id="headerNav" component="header">
        <ClickAwayListener onClickAway={handleClickAway}>
          <Slide in={isHeaderOpen} direction="right" appear={false}>
            <nav className="header__wrapper">
              <Box className="header">
                <div className="header__profile">
                  <Avatar title="Jonh" />
                </div>
                <div className="header__nav">
                  <NavButton
                    title="Search"
                    onClick={ClickHandler}
                    icon={StyledSearchIcon}
                  />
                  <NavButton title="Favorite" icon={StyledFavoriteIcon} />
                  <NavButton title="Chat" icon={StyledChatIcon} />
                  <NavButton title="Settings" icon={StyledSettingsIcon} />
                </div>
              </Box>
            </nav>
          </Slide>
        </ClickAwayListener>
        <Fade in={!isHeaderOpen}>
          <header className="header__mobile">
            <IconButton
              aria-label="open menu"
              onClick={() => isMobile && setHeaderOpen((a) => !a)}
            >
              <MenuIcon sx={{ fontSize: "3rem", color: "white" }} />
            </IconButton>
          </header>
        </Fade>
      </Box>
    </>
  );
};

export default Header;
