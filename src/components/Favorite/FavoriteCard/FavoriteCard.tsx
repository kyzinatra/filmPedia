import React, { FC, useState } from "react";
import { IMoveDetail, ITVDetail } from "../../../types/film";
import Error from "../../Error/Error";
import { useFilm } from "../../../hooks/UseFilm";
import Card from "../../Main/UI/Card/Card";

interface IFavoriteCard {
  id?: string | null;
  type?: string | null;
  setModalInfo: () => void;
}

const FavoriteCard: FC<IFavoriteCard> = ({ id, type, setModalInfo }) => {
  const [data, err] = useFilm<IMoveDetail & ITVDetail, IMoveDetail & ITVDetail>(
    `/${type || "movie"}/${id}`,
    {},
    { language: "eu-US" }
  );
  return (
    <>
      <div>
        {data && (
          <Card
            setModalId={setModalInfo}
            image={data.poster_path || ""}
            alt={data.title || data.name}
            isView
            genre={data.genres?.[0].name}
            title={data.title || data.name}
            rate={Math.round((data.vote_average || 0) * 10) / 10}
          />
        )}
      </div>
      <Error err={err} />
    </>
  );
};

export default FavoriteCard;
/*
interface ICard {
  image?: string;
  alt?: string;
  title?: string;
  isView?: boolean;
  genre?: string;
  isMock?: boolean;
  rate?: number;
  setModalId: () => void;
}
*/
