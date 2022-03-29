import React, { FC } from "react";

import Button from "@mui/material/Button/Button";

interface INavButton {
  title: string;
  icon: React.ReactNode;
}

const NavButton: FC<INavButton> = ({ title, icon: Icon }) => {
  return (
    <Button
      sx={{
        "backgroundColor": "#092A37",
        "color": "white",
        "width": "85px",
        "height": "85px",
        "display": "flex",
        "flexDirection": "column",
        "textTransform": "none",
        "borderRadius": 0,
        "&:hover": {
          backgroundColor: "#0d394a",
        },
      }}
    >
      <div>{Icon}</div>
      <span className="navButton__title">{title}</span>
    </Button>
  );
};

export default NavButton;
