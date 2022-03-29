import useTheme from "@mui/material/styles/useTheme";
import useMediaQuery from "@mui/material/useMediaQuery/useMediaQuery";
import React, { FC } from "react";
import { useFilm } from "../../hooks/UseFilm";
import { IGenresProps } from "../../types/film";
import "./Main.sass";
import Error from "../Error/Error";
import Board from "./UI/Board/Board";
interface IMain {}

const Main: FC<IMain> = ({}) => {
  const theme = useTheme();
  const mediaSize = useMediaQuery(theme.breakpoints.down("sm"));

  // get Genres
  type genresRq = { genres: IGenresProps[] };
  const [fiimGenres, err1] = useFilm<genresRq, null>("/genre/movie/list", null);
  const [tvGenres, err2] = useFilm<genresRq, null>("/genre/tv/list", null);

  const genres = { film: fiimGenres?.genres, tv: tvGenres?.genres };
  return (
    <div className="main" style={{ marginLeft: mediaSize ? "0" : "120px" }}>
      <Board
        genres={genres}
        title="Recommendation for you:"
        url="/trending/all/week"
      />
      <Board
        genres={genres}
        title="Searching:"
        url="/search/movie"
        query={{ query: "Aas", include_adult: "false" }}
      />
      {/* <Board title="Recommendation for you:" id="2" url="/APIURL" query={""} />
      <Board title="Recommendation for you:" id="3" url="/APIURL" query={""} />
      <Board title="Recommendation for you:" id="4" url="/APIURL" query={""} />
      <Board title="Recommendation for you:" id="5" url="/APIURL" query={""} /> */}
      <Error err={err1} />
      <Error err={err2} />
    </div>
  );
};

export default Main;
