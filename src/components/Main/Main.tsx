import useTheme from "@mui/material/styles/useTheme";
import useMediaQuery from "@mui/material/useMediaQuery/useMediaQuery";
import React, { FC } from "react";
import "./Main.sass";

interface IMain {}

const Main: FC<IMain> = ({}) => {
  const theme = useTheme();
  const mediaSize = useMediaQuery(theme.breakpoints.down("sm"));
  return (
    <div className="main" style={{ marginLeft: mediaSize ? "0" : "130px" }}>
      Lorem ipsum dolor sit, amet consectetur adipisicing elit. Amet eveniet
      velit debitis, harum recusandae autem qui atque natus cum sit labore
      facilis repudiandae ut sequi, aliquid sint molestiae rem rerum. Lorem
      ipsum dolor sit, amet consectetur adipisicing elit. Amet eveniet velit
      debitis, harum recusandae autem qui atque natus cum sit labore facilis
      repudiandae ut sequi, aliquid sint molestiae rem rerum. Lorem ipsum dolor
      sit, amet consectetur adipisicing elit. Amet eveniet velit debitis, harum
      recusandae autem qui atque natus cum sit labore facilis repudiandae ut
      sequi, aliquid sint molestiae rem rerum. Lorem ipsum dolor sit, amet
      consectetur adipisicing elit. Amet eveniet velit debitis, harum recusandae
      autem qui atque natus cum sit labore facilis repudiandae ut sequi, aliquid
      sint molestiae rem rerum. Lorem ipsum dolor sit, amet consectetur
      adipisicing elit. Amet eveniet velit debitis, harum recusandae autem qui
      atque natus cum sit labore facilis repudiandae ut sequi, aliquid sint
      molestiae rem rerum. Lorem ipsum dolor sit, amet consectetur adipisicing
      elit. Amet eveniet velit debitis, harum recusandae autem qui atque natus
      cum sit labore facilis repudiandae ut sequi, aliquid sint molestiae rem
      rerum. Lorem ipsum dolor sit, amet consectetur adipisicing elit. Amet
      eveniet velit debitis, harum recusandae autem qui atque natus cum sit
      labore facilis repudiandae ut sequi, aliquid sint molestiae rem rerum.
      Lorem ipsum dolor sit, amet consectetur adipisicing elit. Amet eveniet
      velit debitis, harum recusandae autem qui atque natus cum sit labore
      facilis repudiandae ut sequi, aliquid sint molestiae rem rerum. Lorem
      ipsum dolor sit, amet consectetur adipisicing elit. Amet eveniet velit
      debitis, harum recusandae autem qui atque natus cum sit labore facilis
      repudiandae ut sequi, aliquid sint molestiae rem rerum. Lorem ipsum dolor
      sit, amet consectetur adipisicing elit. Amet eveniet velit debitis, harum
      recusandae autem qui atque natus cum sit labore facilis repudiandae ut
      sequi, aliquid sint molestiae rem rerum. Lorem ipsum dolor sit, amet
      consectetur adipisicing elit. Amet eveniet velit debitis, harum recusandae
      autem qui atque natus cum sit labore facilis repudiandae ut sequi, aliquid
      sint molestiae rem rerum.
    </div>
  );
};

export default Main;
