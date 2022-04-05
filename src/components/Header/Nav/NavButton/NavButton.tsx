import React, { FC } from "react";

import Button from "@mui/material/Button/Button";

interface INavButton {
  title: string;
  icon: React.ReactNode;
  onClick?: () => void;
}

const NavButton: FC<INavButton> = ({ title, icon: Icon, onClick }) => {
  return (
    <Button
      onClick={onClick}
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
