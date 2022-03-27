import React, { FC, useRef, useState } from "react";

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

interface IHeader {
  isAuth?: boolean;
}

const Header: FC<IHeader> = ({ isAuth }) => {
  const StyledSearchIcon = <SearchIcon sx={{ fontSize: "1.7rem" }} />;
  const StyledFavoriteIcon = <FavoriteIcon sx={{ fontSize: "1.7rem" }} />;
  const StyledRestoreIcon = <RestoreIcon sx={{ fontSize: "1.7rem" }} />;
  const StyledSettingsIcon = <SettingsIcon sx={{ fontSize: "1.7rem" }} />;
  const [isOpen, setOpen] = useState(true);

  return (
    <>
      <Slide in={isOpen} direction="right" appear={false}>
        <header className="header__wrapper">
          <div className="header">
            <div className="header__profile">
              <Avatar title="Jonh" />
            </div>
            <div className="header__nav">
              <NavButton title="Search" icon={StyledSearchIcon} />
              <NavButton title="Search" icon={StyledFavoriteIcon} />
              <NavButton title="Search" icon={StyledRestoreIcon} />
              <NavButton title="Search" icon={StyledSettingsIcon} />
            </div>
            <div className="header__hide">
              <Button
                variant="text"
                sx={{ color: "white" }}
                onClick={() => setOpen((a) => !a)}
              >
                Hide
              </Button>
            </div>
          </div>
        </header>
      </Slide>
      <Fade in={!isOpen}>
        <header className="header__mobile">
          <IconButton aria-label="open menu" onClick={() => setOpen((a) => !a)}>
            <MenuIcon sx={{ fontSize: "2rem", color: "black" }} />
          </IconButton>
        </header>
      </Fade>
    </>
  );
};

export default Header;
