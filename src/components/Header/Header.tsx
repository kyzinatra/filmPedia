import { Toolbar, AppBar, IconButton, Button, Typography} from "@mui/material";
import MenuIcon from '@mui/icons-material/Menu';
import React, {FC } from "react";

const Header: FC = () => {
  return <>
      <AppBar position="sticky">
      <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            News
          </Typography>
          <Button color="inherit">Login</Button>
        </Toolbar>
      </AppBar>
      <Toolbar />
  </>;
}

export default Header;