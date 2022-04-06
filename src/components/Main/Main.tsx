import React, { FC, useEffect, useState } from "react";
import { useFilm } from "../../hooks/UseFilm";
import { IGenresProps } from "../../types/film";
import "./Main.sass";
import Error from "../Error/Error";
import Board from "./UI/Board/Board";
import CardDetail from "./UI/CardDetail/CardDetail";
import Search from "../Header/Nav/Search/Search";
import Slide from "@mui/material/Slide/Slide";
import useScrollTrigger from "@mui/material/useScrollTrigger/useScrollTrigger";

import { useAuth } from "../../hooks/UseAuth";
import { signOut } from "firebase/auth";
interface IMain {
  isSearchOpen: boolean;
}

const Main: FC<IMain> = ({ isSearchOpen }) => {
  const createUser = useAuth((auth, user) => {
    console.log(auth, user);
    if (user) {
      signOut(auth);
    }
  });
  useEffect(() => {
    if (createUser) createUser();
  }, [createUser]);

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
  const historyHandler = (e: PopStateEvent) => {
    setModalInfo({ id: e.state?.id || null, type: e.state?.type || "movie" });
  };
  // history
  useEffect(() => {
    window.history.pushState({}, "noModal", "/");
    window.addEventListener("popstate", (e) => historyHandler(e));
  }, []);

  // Search
  const [searchQuery, setSearchQuery] = useState("");
  return (
    <main className="main">
      <Slide in={isSearchOpen || !scroll} appear={false}>
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
        url="/trending/all/week"
        setModalId={setModalProp}
      />
      <Board
        genres={genres}
        title="Recommendation for you:"
        url="/trending/tv/week"
        setModalId={setModalProp}
      />
      <Board
        genres={genres}
        title="Recommendation for you:"
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
