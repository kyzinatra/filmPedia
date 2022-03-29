import React, { FC, useEffect, useState } from "react";
import Card from "../Card/Card";
import Error from "../../../Error/Error";
import Skeleton from "@mui/material/Skeleton/Skeleton";

import {
  Swiper as SwiperComponent,
  SwiperSlide,
  useSwiper,
} from "swiper/react";
import Swiper, { Navigation } from "swiper";

import "swiper/css";
import "swiper/css/navigation";
import "./Board.sass";

import { useFilm } from "../../../../hooks/UseFilm";
import useTheme from "@mui/system/useTheme";

import { FilmPosterWidth } from "../../../../ts/FilmSizes";
import { SliderSettings } from "../../../../theme/theme";
import { IGenresProps, ITrendFilmResponse } from "../../../../types/film";
import Snackbar from "@mui/material/Snackbar/Snackbar";
import Alert from "@mui/material/Alert/Alert";

interface IBoard {
  title?: string;
  url: string;
  query?: { [key: string]: string };
  genres?: { film?: IGenresProps[]; tv?: IGenresProps[] };
}
interface IMockData {
  results: undefined[];
}
const mockData: IMockData = { results: Array.from({ length: 20 }) };

const Board: FC<IBoard> = ({ title, url, query, genres }) => {
  // Get data
  let [data, err] = useFilm<ITrendFilmResponse, IMockData>(url, mockData, {
    ...query,
    page: "1",
  });

  // Slide changes
  const swiperHook = useSwiper();
  const [view, setView] = useState(7);
  function slideChangeHandler(e: Swiper) {
    const viewSlides =
      SliderSettings.breakpoints[e.currentBreakpoint].slidesPerView +
      e.activeIndex;
    setView(viewSlides);
  }

  const CARDS = data.results.map((el, i) => {
    // Get genreTitle
    let genreTitle = "";
    console.log(genres);
    if (el?.genre_ids?.[0] && genres?.film && genres.tv) {
      if (el.media_type == "tv")
        genreTitle =
          genres.tv.find((a) => a.id == String(el.genre_ids?.[0]))?.name || "";
      else
        genreTitle =
          genres.film.find((a) => a.id == String(el.genre_ids?.[0]))?.name ||
          "";
    }
    return (
      <SwiperSlide key={el?.id || i}>
        <Card
          image={el?.poster_path}
          title={el?.title || el?.name}
          genre={genreTitle}
          isView={i < view}
          isMock={!el}
          alt={el?.title}
        />
      </SwiperSlide>
    );
  });

  return (
    <>
      <div className="board">
        <h2 className="board__title">{title}</h2>
        <div className="board__body">
          <SwiperComponent
            breakpoints={SliderSettings.breakpoints}
            onSlideChange={slideChangeHandler}
            modules={[Navigation]}
            navigation={{
              nextEl: ".swiper-button-next",
              prevEl: ".swiper-button-prev",
            }}
          >
            {CARDS}
            <SwiperSlide>
              <div className="card">Hi</div>
            </SwiperSlide>
            <button
              className="swiper-button-next"
              onClick={() => swiperHook.slideNext()}
            ></button>
            <button
              className="swiper-button-prev"
              onClick={() => swiperHook.slidePrev()}
            ></button>
          </SwiperComponent>
        </div>
      </div>
      <Error err={err} />
    </>
  );
};

export default Board;
