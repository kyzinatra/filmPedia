import Skeleton from "@mui/material/Skeleton/Skeleton";
import React, { FC } from "react";
import { useFilm } from "../../../../hooks/UseFilm";
import { FilmPosterWidth } from "../../../../ts/FilmSizes";
import { ITrendFilmResponse } from "../../../../types/film";
import Card from "../Card/Card";
import "./Board.sass";
interface IBoard {
  title?: string;
  url?: string;
  query?: string;
}
interface IMockData {
  results: undefined[];
}
const mockData: IMockData = { results: Array.from({ length: 20 }) };

const Board: FC<IBoard> = ({ title, url, query }) => {
  let data = useFilm("/trending/movie/week", {
    page: "1",
  }) as ITrendFilmResponse | null | IMockData;
  if (!data) data = mockData;

  return (
    <div className="board">
      <h2 className="board__title">{title}</h2>
      <div className="board__body">
        {data.results.map((el, i) => {
          if (i > 6) return;
          if (el) {
            return <Card image={el.poster_path} alt={el.title} />;
          }
          return (
            <Skeleton
              variant="rectangular"
              width={FilmPosterWidth}
              sx={{ bgcolor: "#012a33" }}
              height={Math.round(FilmPosterWidth * Math.sqrt(2))}
            />
          );
        })}
      </div>
    </div>
  );
};

export default Board;
