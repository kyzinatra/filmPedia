import React, { FC, useRef, useState, Dispatch, useEffect } from "react";

import SearchIcon from "@mui/icons-material/Search";
import FavoriteIcon from "@mui/icons-material/Favorite";
import MenuIcon from "@mui/icons-material/Menu";
import RestoreIcon from "@mui/icons-material/Restore";
import SettingsIcon from "@mui/icons-material/Settings";
import IconButton from "@mui/material/IconButton/IconButton";
import "./Header.sass";

import Avatar from "../Nav/Avatar/Avatar";
import NavButton from "../Nav/NavButton/NavButton";
import Slide from "@mui/material/Slide/Slide";
import Button from "@mui/material/Button/Button";
import Fade from "@mui/material/Fade/Fade";
import Box from "@mui/material/Box/Box";

import useMediaQuery from "@mui/material/useMediaQuery";
import useTheme from "@mui/material/styles/useTheme";
import ClickAwayListener from "@mui/base/ClickAwayListener/ClickAwayListener";

interface IHeader {
  isAuth?: boolean;
}

const Header: FC<IHeader> = ({ isAuth }) => {
  const theme = useTheme();
  const mediaSize = useMediaQuery(theme.breakpoints.down("sm"));
  const [isHeaderOpen, setHeaderOpen] = useState(false);

  const StyledSearchIcon = <SearchIcon sx={{ fontSize: "1.7rem" }} />;
  const StyledFavoriteIcon = <FavoriteIcon sx={{ fontSize: "1.7rem" }} />;
  const StyledRestoreIcon = <RestoreIcon sx={{ fontSize: "1.7rem" }} />;
  const StyledSettingsIcon = <SettingsIcon sx={{ fontSize: "1.7rem" }} />;

  function handleClickAway(event: MouseEvent | TouchEvent): void {
    const element = event.target;
    if (element instanceof Element) {
      const isNav = element.closest("#headerNav");
      if (mediaSize && isHeaderOpen && !isNav) setHeaderOpen((a) => !a);
    }
  }

  useEffect(() => {
    if (mediaSize) setHeaderOpen(false);
    else setHeaderOpen(true);
  }, [mediaSize]);

  return (
    <Box id="headerNav">
      <ClickAwayListener onClickAway={handleClickAway}>
        <Slide in={isHeaderOpen} direction="right" appear={false}>
          <header className="header__wrapper">
            <Box className="header">
              <div className="header__profile">
                <Avatar title="Jonh" />
              </div>
              <div className="header__nav">
                <NavButton title="Search" icon={StyledSearchIcon} />
                <NavButton title="Favorite" icon={StyledFavoriteIcon} />
                <NavButton title="History" icon={StyledRestoreIcon} />
                <NavButton title="Settings" icon={StyledSettingsIcon} />
              </div>
            </Box>
          </header>
        </Slide>
      </ClickAwayListener>
      <Fade in={!isHeaderOpen}>
        <header className="header__mobile">
          <IconButton
            aria-label="open menu"
            onClick={() => setHeaderOpen((a) => !a)}
          >
            <MenuIcon sx={{ fontSize: "3rem", color: "black" }} />
          </IconButton>
        </header>
      </Fade>
    </Box>
  );
};

export default Header;
