import React, { FC, useEffect, useState } from "react";
import Card from "../Card/Card";
import Error from "../../../Error/Error";

import { Swiper as SwiperComponent, SwiperSlide } from "swiper/react";
import Swiper, { Navigation } from "swiper";

import "swiper/css";
import "swiper/css/navigation";
import "./Board.sass";

import { useFilm } from "../../../../hooks/UseFilm";

import { SliderSettings } from "../../../../theme/theme";
import {
  IGenresProps,
  ITrendFilmResult,
  ITrendFilm,
} from "../../../../types/film";
import ShowMore from "../ShowMore/ShowMore";
import { useMediaQuery, useTheme } from "@mui/material";

interface IBoard {
  title?: string;
  url: string;
  query?: { [key: string]: string };
  genres?: { film?: IGenresProps[]; tv?: IGenresProps[] };
  setModalId: (type: { id?: number; type?: string }) => void;
}
interface IMockData {
  results: undefined[];
}
const mockData: IMockData = { results: Array.from({ length: 20 }) };

const Board: FC<IBoard> = ({ title, url, query, genres, setModalId }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  // Get data
  const [curPage, setPage] = useState("1");
  const [results, setResults] = useState<ITrendFilm[]>([]);

  const [data, err] = useFilm<ITrendFilmResult, { [key: string]: undefined }>(
    url,
    {},
    {
      ...query,
      page: curPage,
    }
  );

  useEffect(() => {
    setResults([]);
    setPage("1");
  }, [query?.query, url]);
  useEffect(() => {
    const res = data.results;
    if (res) {
      setResults((a) => [...a, ...res].filter((a) => !!a));
    }
  }, [data]);
  // Slide changes
  const [view, setView] = useState(7);
  function slideChangeHandler(e: Swiper) {
    const viewSlides =
      SliderSettings.breakpoints[e.currentBreakpoint].slidesPerView +
      e.activeIndex;
    setView(viewSlides);
  }

  const CARDS = (results[0] ? results : mockData.results).map((el, i) => {
    // Get genreTitle
    let genreTitle = "";
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
          rate={el?.vote_average}
          alt={el?.title}
          setModalId={() => setModalId({ id: el?.id, type: el?.media_type })}
        />
      </SwiperSlide>
    );
  });
  return (
    <>
      <section className="board">
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
            {+(data as ITrendFilmResult).total_pages >= +curPage + 1 && (
              <SwiperSlide>
                <ShowMore
                  onClick={() => {
                    setPage((a) => String(+a + 1));
                  }}
                />
              </SwiperSlide>
            )}
            {!isMobile && (
              <>
                <button className="swiper-button-next"></button>
                <button className="swiper-button-prev"></button>
              </>
            )}
          </SwiperComponent>
        </div>
      </section>
      <Error err={err} />
    </>
  );
};

export default Board;
/*
 */
