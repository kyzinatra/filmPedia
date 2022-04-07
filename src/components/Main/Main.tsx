import React, { FC, useEffect, useRef, useState } from "react";
import { useFilm } from "../../hooks/UseFilm";
import { IGenresProps } from "../../types/film";
import "./Main.sass";
import Error from "../Error/Error";
import Board from "./UI/Board/Board";
import CardDetail from "./UI/CardDetail/CardDetail";
import Search from "../Header/Nav/Search/Search";
import Slide from "@mui/material/Slide/Slide";
import useScrollTrigger from "@mui/material/useScrollTrigger/useScrollTrigger";

interface IMain {
  isSearchOpen: boolean;
}

const Main: FC<IMain> = ({ isSearchOpen }) => {
  type modalInfo = { id?: number; type?: string };
  const [modalInfo, setModalInfo] = useState<modalInfo>({});

  // get Genres
  type genresRq = { genres: IGenresProps[] };
  const [fiimGenres, err1] = useFilm<genresRq, null>("/genre/movie/list", null);
  const [tvGenres, err2] = useFilm<genresRq, null>("/genre/tv/list", null);
  const genres = { film: fiimGenres?.genres, tv: tvGenres?.genres };
  const scroll = useScrollTrigger();

  const setModalProp = (info: { id?: number; type?: string }) => {
    setModalInfo(info);
    window.history.pushState(info, "openModal", "/");
  };

  // history
  useEffect(() => {
    const historyHandler = (e: PopStateEvent) => {
      setModalInfo({ id: e.state?.id || null, type: e.state?.type || "movie" });
    };
    window.history.pushState({}, "noModal", "/");
    window.addEventListener("popstate", historyHandler);
    return () => window.removeEventListener("popstate", historyHandler);
  }, []);

  // Search
  const [searchQuery, setSearchQuery] = useState("");
  const searchRef = useRef(null);
  useEffect(() => {
    if (searchRef.current)
      (searchRef.current as HTMLElement).querySelector("input")?.focus();
  }, [isSearchOpen]);

  return (
    <main className="main">
      <Slide in={isSearchOpen || !scroll} ref={searchRef} appear={false}>
        <Search
          className="main__search"
          setQuery={(str: string) => setSearchQuery(str)}
        />
      </Slide>

      <Board
        genres={genres}
        title="Searching:"
        url={searchQuery ? "/search/movie" : "/trending/all/day"}
        query={{ query: searchQuery, include_adult: "true" }}
        setModalId={setModalProp}
      />
      <Board
        genres={genres}
        title="Recommendation for you:"
        url="/tv/60574/recommendations"
        setModalId={setModalProp}
      />
      <Board
        genres={genres}
        title="TV trends:"
        url="/trending/tv/week"
        setModalId={setModalProp}
      />
      <Board
        genres={genres}
        title="Movies trends:"
        url="/trending/movie/week"
        setModalId={setModalProp}
      />
      <Error err={err1} />
      <Error err={err2} />
      {modalInfo.id && (
        <CardDetail
          resetId={() => setModalInfo({})}
          id={modalInfo.id}
          type={modalInfo.type}
        />
      )}
    </main>
  );
};

export default Main;
