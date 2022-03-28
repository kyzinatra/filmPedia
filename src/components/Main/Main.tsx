import useTheme from "@mui/material/styles/useTheme";
import useMediaQuery from "@mui/material/useMediaQuery/useMediaQuery";
import React, { FC } from "react";
import "./Main.sass";
import Board from "./UI/Board/Board";

interface IMain {}

const Main: FC<IMain> = ({}) => {
  const theme = useTheme();
  const mediaSize = useMediaQuery(theme.breakpoints.down("sm"));
  return (
    <div className="main" style={{ marginLeft: mediaSize ? "0" : "130px" }}>
      <Board title="Recommendation for you" url="/APIURL" query={""} />
    </div>
  );
};

export default Main;
